---
title: Run Azure Data Factory Pipeline with Data workflows
description: Learn to run data factory pipeline in Data workflows
ms.reviewer: abnarain
ms.author: abnarain
author: abnarain
ms.topic: tutorial
ms.date: 04/15/2023
---

# Tutorial: Run Azure Data Factory Pipeline with Data workflows

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

In this tutorial, you'll build a Directed Acyclic Graph (DAG) in Data workflows that runs the Azure data factory pipeline from the Apache Airflow UI.

## Prerequisites

To get started, you must complete the following prerequisite:

- Enable Apache Airflow in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand "Users can create and use Apache Airflow projects (preview)" section.

  2. Click Apply.

  :::image type="content" source="media/data-workflows/enable-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant." lightbox="media/data-workflows/enable-tenant.png":::

- [Create the "Data Workflow" in the workspace.](../data-factory/create-data-workflows.md)

- [Create the data pipeline in Azure Data Factory.](https://learn.microsoft.com/azure/data-factory/tutorial-copy-data-portal)

- [Create the Service Principal](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal).

- To run Azure Data Factory (ADF) pipeline, you need to grant the Service Principal `Contributor` permission to the ADF instance where you're running the pipeline.

## Create DAG in Data workflows

1. Click on "New DAG file" card -> give the name to the file and Click on "Create" button.

   :::image type="content" source="media/data-workflows/adf-name-file.png" alt-text="Screenshot to name the DAG file." :::

2. A boilerplate DAG code is presented to you. Edit the file with below contents.

```python
from datetime import datetime, timedelta

from airflow.models import DAG
from airflow.providers.microsoft.azure.operators.data_factory import AzureDataFactoryRunPipelineOperator


with DAG(
    dag_id="example_adf_run_pipeline",
    start_date=datetime(2022, 5, 14),
    schedule_interval="@daily",
    catchup=False,
    default_args={
        "retries": 1,
        "retry_delay": timedelta(minutes=3),
        "azure_data_factory_conn_id": "azure_data_factory_conn_id", #This is a connection created on Airflow UI
    },
    default_view="graph",
) as dag:

    run_adf_pipeline = AzureDataFactoryRunPipelineOperator(
        task_id="run_adf_pipeline",
        pipeline_name="<Pipeline Name>",
        parameters={"myParam": "value"},
    )

    run_adf_pipeline
```

3. Click on "Save," icon.

   :::image type="content" source="media/data-workflows/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

## Add Apache Airflow requirement

1. Click on "Settings" Button. Click on "Environment configuration,".

2. Add “apache-airflow-providers-microsoft-azure” under "Airflow requirements."

3. Click "Apply,".

   :::image type="content" source="media/data-workflows/add-airflow-requirement.png" alt-text="Screenshot to Add Airflow requirement.":::

## Create an Apache Airflow connection to connect with Azure Data Factory

1. Click on the "View Airflow connections" to see list of all the connections configured and to set up a new one.

   :::image type="content" source="media/data-workflows/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Click on ‘+’ -> Select Connection type: Azure Data Factory -> Fill out the fields: Connection ID, Client ID, Secret, Tenant ID, Subscription ID, Resource group name, Factory name.

3. Click "Save" button.

## Monitor the Data workflow DAG and trigger it from Apache Airflow UI.

1. The saved dag files are loaded in the Apache Airflow UI. You can monitor them by clicking on "Monitor in Apache Airflow" button.

   :::image type="content" source="media/data-workflows/monitor-dag.png" alt-text="Screenshot to monitor the Airflow DAG.":::

   :::image type="content" source="media/data-workflows/loaded-adf-dag.png" alt-text="Screenshot to load Airflow DAG.":::

## Related Content

- Quickstart: [Create a Data workflows](../data-factory/create-data-workflows.md).
