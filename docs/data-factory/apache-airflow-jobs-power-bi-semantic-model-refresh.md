---
title: Refresh Power BI semantic model with Apache Airflow Job
description: Learn to refresh Power BI semantic model with Apache Airflow Job.
ms.reviewer: abnarain
ms.topic: tutorial
ms.custom: airflows, sfi-image-nochange
ms.date: 04/24/2026
---

# Tutorial: Refresh Power BI Semantic Model with Apache Airflow Job

[!INCLUDE[apache-airflow-note](includes/apache-airflow-note.md)]

This tutorial shows how to automate Power BI semantic model refreshes using Apache Airflow in Data Factory in Microsoft Fabric. You configure a connection, create a DAG (Directed Acyclic Graph), and schedule automatic refreshes so your reports and dashboards always reflect current data.

## Prerequisites

To get started, you must complete the following prerequisites:

- Your tenant-level admin must enable ["Service principals can call Fabric public APIs"](../admin/service-admin-portal-developer.md#service-principals-can-call-fabric-public-apis):

  1. Go to the Admin Portal of Microsoft Fabric and navigate to Tenant Settings.
  2. Under Developer Settings, expand the "Service principals can call Fabric public APIs" section.
  3. Toggle the "Enabled" button and choose either "The entire organization" or "Specific security groups."
  4. Select Apply.

- Create the [Service Principal](/entra/identity-platform/howto-create-service-principal-portal). You need to add your service principal as the Contributor in your Power BI workspace.

- [Create the "Apache Airflow Job" in the workspace.](../data-factory/create-apache-airflow-jobs.md)

- [Create a semantic model in Power BI](/power-bi/connect-data/service-datasets-create-semantic-models)

## Add Apache Airflow requirement

1. Navigate to "Settings" and select "Environment Configuration".

2. Under "Apache Airflow Requirements", include "[airflow-powerbi-plugin](https://pypi.org/project/airflow-powerbi-plugin/)".

3. Select "Apply," to save the changes.

   :::image type="content" source="media/apache-airflow-jobs/configure-airflow-environment.png" lightbox="media/apache-airflow-jobs/configure-airflow-environment.png" alt-text="Screenshot to Add Airflow requirement.":::

## Create an Apache Airflow connection to Power BI

1. Select **View Airflow connections** to see all configured connections.

   :::image type="content" source="media/apache-airflow-jobs/view-apache-airflow-connection.png" lightbox="media/apache-airflow-jobs/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Add the new connection. You may use `Generic` connection type. Store the following fields:

   - **Connection ID**: The Connection ID.
   - **Connection Type**: Generic
   - **Login**: The Client ID of your service principal.
   - **Password**: The Client secret of your service principal.
   - **Extra**: `{"tenantId": "<your-tenant-id>"}`

3. Select Save.

## Create Apache Airflow DAG

1. Start by selecting the "New DAG File" card. Then, assign a name to the file and select the "Create".

2. Once created, you're presented with a boilerplate DAG code. Edit the file to include the sample DAG. This DAG triggers the Power BI semantic model refresh synchronously. Update the `dataset_id` and `workspace_id` argument with the Power BI semantic model ID and workspace ID respectively.

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
        dataset_id="<dataset_id>",
        group_id="<workspace_id>",
    )
    # [END howto_operator_powerbi_refresh_dataset]

    dataset_refresh

```

3. Select on "Save," to save the file.

   :::image type="content" source="media/apache-airflow-jobs/click-on-save-icon.png" lightbox="media/apache-airflow-jobs/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

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

## Monitor the data workflow DAG and run it from Apache Airflow UI

After you click on save, files are automatically loaded into the Apache Airflow UI. To monitor them, select on the "Monitor in Apache Airflow" button.

:::image type="content" source="media/apache-airflow-jobs/monitor-directed-acyclic-graph.png" alt-text="Screenshot to monitor the Airflow DAG.":::

## Related Content

[Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
