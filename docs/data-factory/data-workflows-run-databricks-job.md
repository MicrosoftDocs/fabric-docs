---
title: Orchestrate Azure Databricks job with Data workflows
description: Learn to run Azure Databricks job with Data workflows.
ms.reviewer: abnarain
ms.author: abnarain
author: abnarain
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 04/15/2023
---

# Tutorial: Orchestrate Azure Databricks ETL jobs with data workflows

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

This tutorial outlines the integration of Azure Databricks and Data workflows (powered by Apache Airflow) for orchestrating data pipelines. Job orchestration is crucial for managing complex workflows, ensuring data accuracy, and optimizing processing efficiency. Azure Databricks is a powerful analytics platform built on the top of Apache Spark, while Apache Airflow offers robust workflow management capabilities. Combining these tools enables seamless coordination of tasks, from data ingestion to transformation and analysis. The Apache Airflow Azure Databricks connection lets you take advantage of the optimized Spark engine offered by Azure Databricks with the scheduling features of Apache Airflow.

In this tutorial, you build an Apache Airflow DAG to trigger the Azure Databricks job with the Data workflows.

## Prerequisites

To get started, you must complete the following prerequisites:

- Enable Data workflows in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand "Users can create and use Data workflows (preview)" section.

  2. Select Apply.

  :::image type="content" source="media/data-workflows/enable-data-workflow-tenant.png" lightbox="media/data-workflows/enable-data-workflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

- [Create the "Data workflows" in the workspace.](../data-factory/create-data-workflows.md)

- [Create a basic ETL pipeline with Databricks](https://docs.databricks.com/en/getting-started/data-pipeline-get-started.html)

## Add Apache Airflow requirement

1. Navigate to "Settings" and select "Environment Configuration".

2. Under "Apache Airflow Requirements", include "[apache-airflow-providers-databricks](https://airflow.apache.org/docs/apache-airflow-providers-databricks/stable/index.html)".

3. Select "Apply," to save the changes.

   :::image type="content" source="media/data-workflows/databricks-add-requirement.png" lightbox="media/data-workflows/databricks-add-requirement.png" alt-text="Screenshot to Add Airflow requirement.":::

## Create an Azure Databricks personal access token for Apache Airflow connection

1. In your Azure Databricks workspace, select your Azure Databricks username in the top bar, and then select Settings from the drop-down.
2. Select Developer.
3. Next to Access tokens, select Manage.
4. Select Generate new token.
5. (Optional) Enter a comment that helps you to identify this token in the future, and change the token’s default lifetime of 90 days. To create a token with no lifetime (not recommended), leave the Lifetime (days) box empty (blank).
6. Select Generate.
7. Copy the displayed token to a secure location, and then select Done.

## Create an Apache Airflow connection to connect with Azure Databricks workspace

When you install "apache-airflow-providers-databricks" as a requirement in Data workflows environment, a default connection for Azure Databricks is configured by default in Apache Airflow Connections list. Update the connection to connect to your workspace using the personal access token you created previously:

1. Select on the "View Airflow connections" to see a list of all the connections configured.

   :::image type="content" source="media/data-workflows/view-apache-airflow-connection.png" lightbox="media/data-workflows/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Under Conn ID, locate databricks_default and select the Edit record button.

3. Replace the value in the Host field with the workspace instance name of your Azure Databricks deployment, for example, ```https://adb-123456789.cloud.databricks.com```.

4. In the Password field, enter your Azure Databricks personal access token.

5. Select Save.

## Create Apache Airflow DAG

1. Start by selecting the "New DAG File" card. Then, assign a name to the file and select the "Create".

1. Once created, you are presented with a boilerplate DAG code. Edit the file to include the provided contents. Update the `job_id` argument with the Azure Databricks Job ID.

```python
from airflow import DAG
from airflow.providers.databricks.operators.databricks import DatabricksRunNowOperator
from airflow.utils.dates import days_ago

default_args = {
  'owner': 'airflow'
}

with DAG('databricks_dag',
  start_date = days_ago(2),
  schedule_interval = "@hourly",
  default_args = default_args
) as dag:

 transform_data = DatabricksRunNowOperator(
    task_id = 'transform_data',
    databricks_conn_id = 'databricks_default',
    job_id ="<JOB_ID>>"
  )
```

1. Select on "Save," to save the file.

   :::image type="content" source="media/data-workflows/click-on-save-icon.png" lightbox="media/data-workflows/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

## Monitor the Data workflow DAG and run it from Apache Airflow UI

After saving, the DAG files are automatically loaded into the Apache Airflow UI. To monitor them, select on the "Monitor in Apache Airflow" button.

:::image type="content" source="media/data-workflows/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::

## Related Content

[Quickstart: Create a Data workflow](../data-factory/create-data-workflows.md)
