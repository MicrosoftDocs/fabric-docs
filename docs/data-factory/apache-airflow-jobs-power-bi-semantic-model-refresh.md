---
title: Refresh Power BI semantic model with Apache Airflow Job
description: Learn to refresh Power BI semantic model with Apache Airflow Job.
ms.reviewer: abnarain
ms.topic: tutorial
ms.custom: airflows, sfi-image-nochange
ms.date: 12/18/2024
---

# Tutorial: Refresh Power BI Semantic Model with Apache Airflow Job

[!INCLUDE[apache-airflow-note](includes/apache-airflow-note.md)]

In today's data-driven world, maintaining up-to-date and accurate data models is crucial for informed business decisions. As data evolves, it's essential to refresh these models regularly to ensure that reports and dashboards reflect the most current information. Manual refreshes can be time-consuming and prone to errors, which is where Apache Airflow's orchestration, scheduling, and monitoring capabilities come into play. By leveraging Airflow, organizations can automate the refresh process of Power BI semantic models, ensuring timely and accurate data updates with minimal manual intervention.

This article talks about the integration of Apache Airflow with Power BI to automate semantic model refreshes using Data Workflows. It provides a step-by-step guide to setting up the environment, configuring connections, and creating workflows to seamlessly update Power BI semantic models.

## Prerequisites

To get started, you must complete the following prerequisites:

- Your tenant-level admin must enable ["Service principals can call Fabric public APIs"](../admin/service-admin-portal-developer.md#service-principals-can-call-fabric-public-apis):

  1. Go to the Admin Portal of Microsoft Fabric and navigate to Tenant Settings.
  2. Under Developer Settings, expand the "Service principals can call Fabric public APIs" section.
  3. Toggle the "Enabled" button and choose either "The entire organization" or "Specific security groups."
  4. Select Apply.

- Create the [Service Principal](/entra/identity-platform/howto-create-service-principal-portal). You need to add your service principal as the Contributor in your Power BI workspace.

- [Create the "Apache Airflow Job" in the workspace.](../data-factory/create-apache-airflow-jobs.md)

- [Create a semantic model in Power BI](https://docs.databricks.com/en/getting-started/data-pipeline-get-started.html)

## Add Apache Airflow requirement

1. Navigate to "Settings" and select "Environment Configuration".

2. Under "Apache Airflow Requirements", include "[airflow-powerbi-plugin](https://pypi.org/project/airflow-powerbi-plugin/)".

3. Select "Apply," to save the changes.

   :::image type="content" source="media/apache-airflow-jobs/configure-airflow-environment.png" lightbox="media/apache-airflow-jobs/configure-airflow-environment.png" alt-text="Screenshot to Add Airflow requirement.":::

## Create an Apache Airflow connection to connect with Power BI workspace

1. Select on the "View Airflow connections" to see a list of all the connections are configured.

   :::image type="content" source="media/apache-airflow-jobs/view-apache-airflow-connection.png" lightbox="media/apache-airflow-jobs/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Add the new connection. You may use `Generic` connection type. Store the following fields:

   - <strong>Connection ID:</strong> The Connection ID.
   - <strong>Connection Type:</strong>Generic
   - <strong>Login:</strong>The Client ID of your service principal.
   - <strong>Password:</strong>The Client secret of your service principal.
   - <strong>Extra:</strong>{"tenantId": The Tenant ID of your service principal.}

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
