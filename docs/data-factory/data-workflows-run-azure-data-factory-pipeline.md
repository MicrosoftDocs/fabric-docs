---
title: Orchestrate Azure Data Factory Pipeline with Data workflows
description: Learn to run data factory pipeline in Data workflows.
ms.reviewer: abnarain
ms.author: abnarain
author: abnarain
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 04/15/2023
---

# Tutorial: Orchestrate an Azure Data Factory (ADF) Pipeline with data workflows

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

In this tutorial, you'll build an Apache Airflow DAG to orchestrate the ADF pipeline with the Data workflows.

## Prerequisites

To get started, you must complete the following prerequisites:

- Enable Data workflows in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand "Users can create and use Data workflows (preview)" section.

  2. Click Apply.

  :::image type="content" source="media/data-workflows/enable-data-workflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant." lightbox="media/data-workflows/enable-data-workflow-tenant.png":::

- [Create the "Data workflows" in the workspace.](../data-factory/create-data-workflows.md).

- [Create the data pipeline in Azure Data Factory](/azure/data-factory/tutorial-copy-data-portal).

- [Create the Service Principal](/entra/identity-platform/howto-create-service-principal-portal).

- To run Azure Data Factory (ADF) pipeline, you add the service principal as a `contributor` to the ADF instance where you're running the pipeline.

## Add Apache Airflow requirement

1. Navigate to "Settings" and select "Environment Configuration".

2. Under "Apache Airflow Requirements", include "apache-airflow-providers-microsoft-azure".

3. Click "Apply," to save the changes.

   :::image type="content" source="media/data-workflows/add-airflow-requirement.png" lightbox="media/data-workflows/add-airflow-requirement.png" alt-text="Screenshot to Add Airflow requirement.":::

## Create Apache Airflow DAG

1. Start by selecting the "New DAG File" card. Then, assign a name to the file and click the "Create" button.

   :::image type="content" source="media/data-workflows/adf-name-file.png" lightbox="media/data-workflows/adf-name-file.png" alt-text="Screenshot to name the DAG file." :::

2. Once created, you'll be presented with a boilerplate DAG code. Edit the file to include the provided contents. Update the **pipeline_name** argument with the name of your ADF pipeline.

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
    )

    run_adf_pipeline
```

3. Click on "Save," to save the file.

   :::image type="content" source="media/data-workflows/click-on-save-icon.png" lightbox="media/data-workflows/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

## Create an Apache Airflow connection to connect with Azure Data Factory

1. Click on the "View Airflow connections" to see list of all the connections configured and to set up a new one.

   :::image type="content" source="media/data-workflows/view-apache-airflow-connection.png" lightbox="media/data-workflows/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Click on ‘+’ -> Select Connection type: Azure Data Factory -> Fill out the fields: Connection ID, Client ID, Secret, Tenant ID, Subscription ID, Resource group name, Factory name.

3. Click "Save" button.

## Monitor the Data workflow DAG and run it from Apache Airflow UI

The saved dag files are loaded in the Apache Airflow UI. You can monitor them by clicking on "Monitor in Apache Airflow" button.

:::image type="content" source="media/data-workflows/monitor-directed-acyclic-graph.png" lightbox="media/data-workflows/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::
:::image type="content" source="media/data-workflows/loaded-adf-directed-acyclic-graph.png" lightbox="media/data-workflows/loaded-adf-directed-acyclic-graph.png" alt-text="Screenshot to load Airflow DAG.":::

## Related Content

Quickstart: [Create a Data workflow](../data-factory/create-data-workflows.md)
