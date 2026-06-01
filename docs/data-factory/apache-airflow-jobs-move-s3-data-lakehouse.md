---
title: "Tutorial: Move data from Amazon S3 to a Microsoft Fabric Lakehouse using Apache Airflow"
description: Build an Apache Airflow DAG that triggers a Fabric Copy Job to move large datasets from Amazon S3 to a Microsoft Fabric Lakehouse without routing data through Airflow workers.
author: makromer
ms.author: makromer
ms.topic: tutorial
ms.date: 06/01/2026
ms.service: microsoft-fabric
ms.subservice: data-factory
ms.custom: build-2026
ai-usage: ai-assisted
---

# Tutorial: Move data from Amazon S3 to a Microsoft Fabric Lakehouse using Apache Airflow

In this tutorial, you build an Apache Airflow directed acyclic graph (DAG) that orchestrates large-scale data movement from Amazon S3 to a Microsoft Fabric Lakehouse. Instead of pulling data through Airflow workers, which fails at terabyte scale due to memory limits and throughput constraints—the DAG triggers a Fabric Copy Job and polls for completion. The Copy Job handles all data movement using Fabric's cloud-scale engine.

In this tutorial, you learn how to:

> [!div class="checklist"]
> * Create a Fabric Copy Job that reads from Amazon S3 and writes to a Lakehouse
> * Build an Airflow DAG that submits the Copy Job and waits for completion
> * Configure the DAG for daily scheduling
> * Apply partitioning patterns to handle terabyte-scale datasets

## Prerequisites

- A Microsoft Fabric workspace with an assigned capacity. Free and Premium Per User (PPU) workspaces don't support Apache Airflow Jobs.
- An Apache Airflow Job item in your Fabric workspace. See [Create an Apache Airflow Job](create-apache-airflow-jobs.md).
- Triggerers enabled in your Airflow Job. In the Airflow Job settings, select **Environment configuration**, then enable **Enable triggers in data workflows**.
- An Amazon S3 bucket with source data and AWS credentials (`s3:GetObject` and `s3:ListBucket` permissions).
- A service principal in Microsoft Entra ID with `Item.Execute.All` and `Item.Read.All` API permissions and contributor access to your Fabric workspace. See [Set up an Apache Airflow connection](apache-airflow-jobs-run-fabric-item-job.md#set-up-apache-airflow-connection) for setup instructions.

> [!NOTE]  
> Apache Airflow Job is powered by [Apache Airflow](https://airflow.apache.org/). Private networks and virtual networks aren't currently supported with Fabric Apache Airflow Jobs.

## Understand the data movement architecture

When moving large datasets with Airflow, avoid writing a Python task that downloads data from S3 into the Airflow worker process and re-uploads it to the Lakehouse. This pattern produces three categories of failure at terabyte scale:

- **Memory exhaustion**: Reading a multi-hundred-gigabyte object into worker RAM causes the pod to exceed its memory limit and get terminated.
- **Throughput bottleneck**: Every byte makes an extra round trip through the worker, constrained to single-threaded throughput.
- **Non-resumable retries**: A failure at 90% completion restarts the entire copy from zero. Airflow's retry mechanism provides no benefit.

In the recommended architecture, Airflow submits the Copy Job and Fabric moves the data. A Fabric Copy Job parallelizes across partitions, handles staging and internal retries, and supports incremental movement and change data capture (CDC). Your Airflow DAG's role is to trigger the job and report completion status, not to touch the bytes.

## Step 1: Create a Copy Job in Fabric

Configure the data source and destination in Fabric before writing any DAG code.

1. In your Fabric workspace, select **+ New item**, then select **Copy Job**.
1. In the Copy Job editor, select **Add a data source**.
1. Select **Amazon S3** as the data source type.
1. Configure the connection with your S3 bucket credentials:
   - **Access Key ID** and **Secret Access Key** for an IAM user.
   - Set **Bucket** and **Path** to the S3 prefix containing your source data.
1. Select **Next**, then configure the destination:
   - Select your Fabric Lakehouse.
   - Select **Files** to land data in the Lakehouse Files section, or **Tables** to write directly as a Delta table.
1. (Optional) To enable incremental movement after the first full load, expand **Advanced settings** and configure a watermark column or enable CDC.
1. Select **Save**.

> [!TIP]  
> A Copy Job configured here can be reused across multiple Airflow DAGs, inside Fabric Pipelines, or scheduled independently without an orchestrator.

## Step 2: Get the workspace and Copy Job IDs

You need these two GUIDs when configuring the DAG.

1. In your Fabric workspace, select **Settings** (the gear icon), then **Workspace settings**.
1. Under **General**, copy the **Workspace ID**.
1. Open the Copy Job. Copy the **Copy Job ID** from the browser URL—it's the GUID immediately following `/copyJobs/`.

## Step 3: Create the Airflow DAG

The `apache-airflow-microsoft-fabric-plugin` is preinstalled in Fabric Apache Airflow Jobs. You don't need to add it to `requirements.txt`.

1. In your Apache Airflow Job, open the **dags** folder in Fabric managed storage.
1. Create a new file named `s3_to_lakehouse.py`.
1. Paste the following code:

```python
from airflow import DAG
from airflow.providers.microsoft.fabric.operators.run_item import MSFabricRunJobOperator
from datetime import datetime

with DAG(
    dag_id="s3_to_fabric_lakehouse",
    start_date=datetime(2026, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:

    copy_s3_to_lakehouse = FabricRunItemOperator(
        task_id="copy_s3_to_lakehouse",
        fabric_conn_id="fabric_conn",
        workspace_id="<your-workspace-id>",
        item_id="<your-copy-job-id>",
        job_type="CopyJob",
        wait_for_termination=True,
        deferrable=True,
    )
```

1. Replace `<your-workspace-id>` and `<your-copy-job-id>` with the values from Step 2.

`wait_for_termination=True` causes the Airflow task to poll Fabric for job status and report success only after the Copy Job finishes. Setting `deferrable=True` releases the worker slot while waiting, which reduces resource consumption.

> [!NOTE]  
> Set `job_type` to `"CopyJob"` when pointing the operator directly at a Copy Job item. Use `"Pipeline"` if you wrapped the Copy Job inside a Fabric Pipeline.

## Step 4: Set up the Fabric Airflow connection

1. In your Airflow Job, select **Home**, then select **Add connection**.
1. Fill in the following fields:
   - **Connection ID**: `fabric_conn`
   - **Description**: Connection for Fabric API access
   - **Endpoint**: `https://api.fabric.microsoft.com`
   - **Tenant ID**: Your Microsoft Entra tenant ID
   - **Client ID**: Your service principal's application (client) ID
   - **Client secret**: Your service principal's client secret
1. Select **Create**.

## Step 5: Run and monitor the DAG

1. In the Airflow UI, select the `s3_to_fabric_lakehouse` DAG.
1. Select **Trigger DAG** to run it manually.
1. Select the running DAG to view task status. The `copy_s3_to_lakehouse` task shows **Running** while the Copy Job executes.
1. To view the Copy Job run directly in Fabric, select the external monitoring link in the task details panel.

When the Copy Job finishes successfully, the Airflow task transitions to **Success**. If it fails, Airflow retries according to the DAG's `retries` setting. The Copy Job's incremental or CDC configuration means subsequent retries don't re-copy data that already moved successfully.

## Scale considerations for large datasets

These patterns help you handle terabyte-scale data movement efficiently. Choose the approach that matches your dataset layout and capacity configuration:

- [Partition by S3 prefix](#partition-by-s3-prefix)
- [Stage as Files before converting to Delta](#stage-as-files-before-converting-to-delta)
- [Schedule during off-peak hours](#schedule-during-off-peak-hours)

### Partition by S3 prefix

Copy Jobs parallelize best when you divide the source into smaller chunks. If your S3 data follows a date layout such as `s3://bucket/year=2026/month=06/day=01/`, configure the Copy Job to read from a specific prefix. Pass a dynamic prefix from Airflow using `job_params`:

```python
copy_s3_to_lakehouse = FabricRunItemOperator(
    task_id="copy_s3_to_lakehouse",
    fabric_conn_id="fabric_conn",
    workspace_id="<your-workspace-id>",
    item_id="<your-copy-job-id>",
    job_type="CopyJob",
    wait_for_termination=True,
    deferrable=True,
    job_params={"s3Prefix": "year=2026/month=06/"},
)
```

> [!NOTE]  
> Fabric scheduled triggers don't support parameter binding for dynamic values. Use `job_params` from your Airflow DAG, or use a **Set Variable** activity inside a Fabric Pipeline with `utcNow()` expressions.

### Stage as Files before converting to Delta

For initial full loads of very large datasets from Amazon S3, land the data as Files in the Fabric Lakehouse rather than writing directly as a Delta table. After the Copy Job completes, add a Fabric Notebook task in the same Airflow DAG to convert the staged files to a Delta table:

```python
from airflow.providers.microsoft.fabric.operators.run_item import MSFabricRunJobOperator

convert_to_delta = MSFabricRunJobOperator(
    task_id="convert_to_delta",
    workspace_id="<your-workspace-id>",
    item_id="<your-notebook-id>",
    job_type="RunNotebook",
    wait_for_termination=True,
)

copy_s3_to_lakehouse >> convert_to_delta
```

### Schedule during off-peak hours

If your Fabric capacity is shared with interactive workloads, schedule the Airflow DAG during off-peak hours using a cron expression:

```python
schedule="0 2 * * *"  # 2:00 AM UTC daily
```

## Clean up resources

If you created a Copy Job and Airflow Job specifically for this tutorial and don't plan to keep them, you can delete both items from your Fabric workspace to stop incurring capacity charges.

## Related content

- [What is a Copy Job?](what-is-copy-job.md)
- [Change data capture in Copy Job](cdc-copy-job.md)
- [Tutorial: Run a Fabric item using Apache Airflow DAGs](apache-airflow-jobs-run-fabric-item-job.md)
- [Apache Airflow Jobs concepts](apache-airflow-jobs-concepts.md)
- [Create an Apache Airflow Job](create-apache-airflow-jobs.md)
