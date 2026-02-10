---
title: Orchestrate Azure Data Factory Pipeline with Apache Airflow Job
description: Learn to run data factory pipeline in Apache Airflow Job.
ms.reviewer: abnarain
ms.topic: tutorial
ms.custom: 
    - pipelines
    - airflows
ms.date: 12/18/2024
---

# Tutorial: Orchestrate an Azure Data Factory (ADF) Pipeline with Apache Airflow Job.

[!INCLUDE[apache-airflow-note](includes/apache-airflow-note.md)]

In this tutorial, you'll build an Apache Airflow DAG to orchestrate the ADF pipeline with the Apache Airflow Job.

## Prerequisites

To get started, you must complete the following prerequisites:

- [Create the "Apache Airflow Job" in the workspace.](../data-factory/create-apache-airflow-jobs.md).

- [Create the pipeline in Azure Data Factory](/azure/data-factory/tutorial-copy-data-portal).

- [Create the Service Principal](/entra/identity-platform/howto-create-service-principal-portal).

- To run Azure Data Factory (ADF) pipeline, you add the service principal as a `contributor` to the ADF instance where you're running the pipeline.

## Add Apache Airflow requirement

1. Navigate to "Settings" and select "Environment Configuration".

2. Under "Apache Airflow Requirements", include "apache-airflow-providers-microsoft-azure".

3. Click "Apply," to save the changes.

   :::image type="content" source="media/apache-airflow-jobs/add-airflow-requirement.png" lightbox="media/apache-airflow-jobs/add-airflow-requirement.png" alt-text="Screenshot to Add Airflow requirement.":::

## Create Apache Airflow DAG

1. Start by selecting the "New DAG File" card. Then, assign a name to the file and click the "Create" button.

   :::image type="content" source="media/apache-airflow-jobs/adf-name-file.png" lightbox="media/apache-airflow-jobs/adf-name-file.png" alt-text="Screenshot to name the DAG file." :::

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

   :::image type="content" source="media/apache-airflow-jobs/click-on-save-icon.png" lightbox="media/apache-airflow-jobs/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

## Create an Apache Airflow connection to connect with Azure Data Factory

1. Click on the "View Airflow connections" to see list of all the connections configured and to set up a new one.

   :::image type="content" source="media/apache-airflow-jobs/view-apache-airflow-connection.png" lightbox="media/apache-airflow-jobs/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Click on ‘+’ -> Select Connection type: Azure Data Factory -> Fill out the fields: Connection ID, Client ID, Secret, Tenant ID, Subscription ID, Resource group name, Factory name.

3. Click "Save" button.

## Monitor the Apache Airflow DAG and run it from Apache Airflow UI

The saved dag files are loaded in the Apache Airflow UI. You can monitor them by clicking on "Monitor in Apache Airflow" button.

:::image type="content" source="media/apache-airflow-jobs/monitor-directed-acyclic-graph.png" lightbox="media/apache-airflow-jobs/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::
:::image type="content" source="media/apache-airflow-jobs/loaded-adf-directed-acyclic-graph.png" lightbox="media/apache-airflow-jobs/loaded-adf-directed-acyclic-graph.png" alt-text="Screenshot to load Airflow DAG.":::

## Related Content

Quickstart: [Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
