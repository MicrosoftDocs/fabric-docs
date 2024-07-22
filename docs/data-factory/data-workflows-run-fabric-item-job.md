---
title: Run a Microsoft Fabric item job in Apache Airflow DAGs.
description: Learn to trigger Microsoft Fabric job item's run in Apache Airflow DAGs.
ms.reviewer: abnarain
ms.author: abnarain
author: abnarain
ms.topic: tutorial
ms.date: 04/15/2023
---

# Tutorial: Run a Microsoft Fabric Item Job in Apache Airflow DAGs

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

This tutorial provides a detailed guide on integrating Microsoft Fabric items, such as Data Factory Pipelines and Notebooks, within Apache Airflow DAGs. It walks you through how to set up and execute Microsoft Fabric jobs by using Fabric managed storage in Data workflows and the Apache Airflow plugin, applying the power of both platforms to create robust, scalable data workflows.

## Prerequisites

To get started, you must complete the following prerequisites:

- Enable Data workflows in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand 'Users can create and use Data workflows (preview)' section.
  2. Select Apply.
  :::image type="content" source="media/data-workflows/enable-data-workflow-tenant.png" lightbox="media/data-workflows/enable-data-workflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

- [Create a Microsoft Entra ID app](/azure/active-directory/develop/quickstart-register-app) if you don't have one.

- Tenant level admin account must enable the setting 'Allow user consent for apps'. Refer to: [Configure user consent](/entra/identity/enterprise-apps/configure-user-consent?pivots=portal)
  :::image type="content" source="media/data-workflows/user-consent.png" lightbox="media/data-workflows/user-consent.png" alt-text="Screenshot to enable user consent in tenant.":::

- Obtain a refresh token for authentication. Follow the steps in the [Get Refresh Token](/entra/identity-platform/v2-oauth2-auth-code-flow#refresh-the-access-token) section.

- Enable the Triggerers in data workflows to allow the usage of deferrable operators. 

 
## Add Apache Airflow requirement

Create the requirements.txt file in the dags folder with the following content:   
```plaintext
apache-airflow-microsoft-fabric-plugin
```

## Create an Airflow connection for Microsoft Fabric

1. Navigate to "View Airflow connections" to see all configured connections.
   :::image type="content" source="media/data-workflows/view-apache-airflow-connection.png" lightbox="media/data-workflows/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Add a new connection, using the `Generic` connection type. Configure it with:
    * <strong>Connection ID:</strong> Name of the Connection ID.
    * <strong>Connection Type:</strong> Generic
    * <strong>Login:</strong> The Client ID of your service principal.
    * <strong>Password:</strong> The refresh token fetched using Microsoft OAuth 2.0.
    * <strong>Extra:</strong> {"tenantId": The Tenant ID of your service principal.}

3. Select Save.

## Create a DAG to trigger Microsoft Fabric job items

Create a new DAG file in the 'dags' folder in Fabric managed storage with the following content. Update `workspace_id` and `item_id` with the appropriate values for your scenario:

 ```python
  from airflow import DAG
  from apache_airflow_microsoft_fabric_plugin.operators.fabric import FabricRunItemOperator

  with DAG(
      dag_id="Run_Fabric_Item",
      schedule_interval="@daily",
      start_date=datetime(2023, 8, 7),
      catchup=False,
  ) as dag:

      run_pipeline = FabricRunItemOperator(
          task_id="run_fabric_pipeline",
          workspace_id="<workspace_id>",
          item_id="<item_id>",
          fabric_conn_id="fabric_conn_id",
          job_type="Pipeline",
          wait_for_termination=True,
          deferrable=True,
      )

      run_pipeline
```

## Create a plugin file for the custom operator

If you want to include an external monitoring link for Microsoft Fabric item runs, create a plugin file as follows:

Create a new file in the plugins folder with the following content:
```python
   from airflow.plugins_manager import AirflowPlugin

   from apache_airflow_microsoft_fabric_plugin.hooks.fabric import FabricHook
   from apache_airflow_microsoft_fabric_plugin.operators.fabric import FabricRunItemLink

   class AirflowFabricPlugin(AirflowPlugin):
       """
       Microsoft Fabric plugin.
       """

       name = "fabric_plugin"
       operator_extra_links = [FabricRunItemLink()]
       hooks = [
           FabricHook,
       ]
```

## Monitor your DAG

1. Go to the Airflow UI and select the DAG you created.

2. If you add the plugin, you see an external monitoring link. Clicking it navigates you to the item run.
   :::image type="content" source="media/data-workflows/view-apache-airflow-dags-external-link.png" lightbox="media/data-workflows/view-apache-airflow-dags-external-link.png" alt-text="Screenshot to view Apache Airflow DAGs with external link."::: 

3. Xcom Integration: Trigger the DAG to view task outputs in the Xcom tab.
   :::image type="content" source="media/data-workflows/view-apache-airflow-dags-xcom.png" lightbox="media/data-workflows/view-apache-airflow-dags-xcom.png" alt-text="Screenshot to view Apache Airflow DAGs with Xcom tab.":::

## Related Content

[Quickstart: Create a Data workflow](../data-factory/create-data-workflows.md)
[Data workflows workspace settings](../data-factory/data-workflows-workspace-settings.md)