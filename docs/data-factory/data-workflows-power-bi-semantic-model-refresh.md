---
title: Refresh Power BI semantic model with Data workflows
description: Learn to refresh Power BI semantic model with Data workflows.
ms.reviewer: abnarain
ms.author: abnarain
author: abnarain
ms.topic: tutorial
ms.date: 04/15/2023
---

# Tutorial: Refresh Power BI semantic model with Data workflows

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

This tutorial outlines the integration of Azure Databricks and Data workflows (powered by Apache Airflow) for orchestrating data pipelines. Job orchestration is crucial for managing complex workflows, ensuring data accuracy, and optimizing processing efficiency. Azure Databricks is a powerful analytics platform built on the top of Apache Spark, while Apache Airflow offers robust workflow management capabilities. Combining these tools enables seamless coordination of tasks, from data ingestion to transformation and analysis. The Apache Airflow Azure Databricks connection lets you take advantage of the optimized Spark engine offered by Azure Databricks with the scheduling features of Apache Airflow.

In this tutorial, you'll learn how to build an Apache Airflow DAG to trigger the Power BI semantic model refresh from Data Workflows.

## Prerequisites

To get started, you must complete the following prerequisites:

- Enable Data workflows in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand "Users can create and use Data workflows (preview)" section.

  2. Select Apply.

  :::image type="content" source="media/data-workflows/enable-dataworkflow-tenant.png" lightbox="media/data-workflows/enable-dataworkflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

- You must have an Admin account of Power BI.

- Create the [Service Principal](/entra/identity-platform/howto-create-service-principal-portal). You need to add your service principal as the Contributor in your Power BI workspace.

- [Create the "Data workflows" in the workspace.](../data-factory/create-data-workflows.md)

- [Create a semantic model in Power BI](https://docs.databricks.com/en/getting-started/data-pipeline-get-started.html)

## Add Apache Airflow requirement

1. Navigate to "Settings" and select "Environment Configuration".

2. Under "Apache Airflow Requirements", include "[airflow-powerbi-plugin](https://pypi.org/project/airflow-powerbi-plugin/)".

3. Select "Apply," to save the changes.

   :::image type="content" source="media/data-workflows/databricks-add-requirement.png" lightbox="media/data-workflows/databricks-add-requirement.png" alt-text="Screenshot to Add Airflow requirement.":::

## Create an Apache Airflow connection to connect with Power BI workspace

1. Select on the "View Airflow connections" to see a list of all the connections are configured.

   :::image type="content" source="media/data-workflows/view-apache-airflow-connection.png" lightbox="media/data-workflows/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Add the new connection. You may use `Generic` connection type. Store the following fields:
    * <strong>Connection ID:</strong> The Connection ID.
    * <strong>Connection Type:</strong>Generic
    * <strong>Login:</strong>The Client ID of your service principal.
    * <strong>Password:</strong>The Client secret of your service principal.
    * <strong>Extra:</strong>{"tenantId": The Tenant ID of your service principal.}

3. Select Save.

## Create Apache Airflow DAG

1. Start by selecting the "New DAG File" card. Then, assign a name to the file and select the "Create".

1. Once created, you're presented with a boilerplate DAG code. Edit the file to include the provided contents. Update the `dataset_id` and `workspace_id` argument with the Power BI semantic model ID and workspace ID respectively.

```python
from datetime import datetime
# The DAG object
from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow_powerbi_plugin.operators.powerbi import PowerBIDatasetRefreshOperator

with DAG(
        dag_id='refresh_dataset_powerbi',
        schedule_interval=None,
        start_date=datetime(2023, 8, 7),
        catchup=False,
        concurrency=20,
) as dag:

    # [START howto_operator_powerbi_refresh_dataset]
    dataset_refresh = PowerBIDatasetRefreshOperator(
        powerbi_conn_id= "powerbi_default",
        task_id="sync_dataset_refresh",
        dataset_id="<dataset_id>,
        group_id="<workspace_id>",
    )
    # [END howto_operator_powerbi_refresh_dataset]

    dataset_refresh

```

1. Select on "Save," to save the file.

   :::image type="content" source="media/data-workflows/click-on-save-icon.png" lightbox="media/data-workflows/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

## Create a plugin file for Power BI (Optional)

If you wish to enable an external monitoring link to Power BI from the Airflow UI, follow these steps:

1. Create a new file under the 'plugins' folder.

2. Paste the contents provided below into the file.

```python
from airflow.plugins_manager import AirflowPlugin

from airflow_powerbi_plugin.hooks.powerbi import PowerBIHook
from airflow_powerbi_plugin.operators.powerbi import PowerBILink

# Defining the plugin class
class AirflowExtraLinkPlugin(AirflowPlugin):
    """
    PowerBI plugin.
    """

    name = "powerbi_plugin"
    operator_extra_links = [
        PowerBILink(),
    ]
    hooks= [
        PowerBIHook,
    ]
```

3. Upon completion, you will observe the DAG loaded with the external monitoring link to the Power BI semantic model refresh.

## Monitor the Data workflow DAG and run it from Apache Airflow UI

After you click on save, files are automatically loaded into the Apache Airflow UI. To monitor them, select on the "Monitor in Apache Airflow" button.

:::image type="content" source="media/data-workflows/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::

## Related Content

[Quickstart: Create a Data workflows](../data-factory/create-data-workflows.md)
