---
title: Orchestrate Azure Databricks job with Data workflows
description: Learn to run Azure Databricks job with Data workflows
ms.reviewer: abnarain
ms.author: abnarain
author: abnarain
ms.topic: tutorial
ms.date: 04/15/2023
---

# Tutorial: Orchestrate Azure Databricks ETL job with Data workflows

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

This tutorial outlines the integration of Azure Databricks and Data workflows (powered by Apache Airfow) for orchestrating data pipelines. Job orchestration is crucial for managing complex workflows, ensuring data accuracy, and optimizing processing efficiency. Azure Databricks is a powerful analytics platform built on the top of Apache Spark, while Apache Airflow offers robust workflow management capabilities. Combining these tools enables seamless coordination of tasks, from data ingestion to transformation and analysis. The Apache Airflow Azure Databricks connection lets you take advantage of the optimized Spark engine offered by Azure Databricks with the scheduling features of Apache Airflow.

In this tutorial, you'll build an Apache Airflow DAG to trigger the Azure Databricks job with the Data workflows.

## Prerequisites

To get started, you must complete the following prerequisites:

- Enable Apache Airflow in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand "Users can create and use Apache Airflow projects (preview)" section.

  2. Click Apply.

  :::image type="content" source="media/data-workflows/enable-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant." lightbox="media/data-workflows/enable-tenant.png":::

- [Create the "Data workflows" in the workspace.](../data-factory/create-data-workflows.md)

- [Create a basic ETL pipeline with Databricks](https://docs.databricks.com/en/getting-started/data-pipeline-get-started.html)

## Add Apache Airflow requirement

1. Navigate to "Settings" and select "Environment Configuration".

2. Under "Apache Airflow Requirements", include "[apache-airflow-providers-databricks](https://airflow.apache.org/docs/apache-airflow-providers-databricks/stable/index.html)".

3. Click "Apply," to save the changes.

   :::image type="content" source="media/data-workflows/add-airflow-requirement.png" alt-text="Screenshot to Add Airflow requirement.":::

## Create an Azure Databricks personal access token for Apache Airflow connection

1. In your Azure Databricks workspace, click your Azure Databricks username in the top bar, and then select Settings from the drop down.
2. Click Developer.
3. Next to Access tokens, click Manage.
4. Click Generate new token.
5. (Optional) Enter a comment that helps you to identify this token in the future, and change the token’s default lifetime of 90 days. To create a token with no lifetime (not recommended), leave the Lifetime (days) box empty (blank).
6. Click Generate.
7. Copy the displayed token to a secure location, and then click Done.

## Create an Apache Airflow connection to connect with Azure Databricks workspace

When you install "apache-airflow-providers-databricks" as a requirement in Data workflows environment, a default connection for Azure Databricks is configured by default in Apache Airflow Connections list. Update the connection to connect to your workspace using the personal access token you created above:

1. Click on the "View Airflow connections" to see list of all the connections configured.

   :::image type="content" source="media/data-workflows/view-apache-airflow-connection.png" alt-text="Screenshot to view Apache Airflow connection.":::

2. Under Conn ID, locate databricks_default and click the Edit record button.

3. Replace the value in the Host field with the workspace instance name of your Azure Databricks deployment, for example, https://adb-123456789.cloud.databricks.com.

4. In the Password field, enter your Azure Databricks personal access token.

5. Click Save.

## Create Apache Airflow DAG

1. Start by selecting the "New DAG File" card. Then, assign a name to the file and click the "Create".

2. Once created, you'll be presented with a boilerplate DAG code. Edit the file to include the provided contents. Update the `job_id` argument with with the Azure Databricks Job Id.

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

3. Click on "Save," to save the file.

   :::image type="content" source="media/data-workflows/click-on-save-icon.png" alt-text="Screenshot presents how to save DAG file in Microsoft Fabric.":::

## Monitor the Data workflow DAG and run it from Apache Airflow UI.

1. After saving, the DAG files are automatically loaded into the Apache Airflow UI. To monitor them, click on the "Monitor in Apache Airflow" button.

   :::image type="content" source="media/data-workflows/monitor-dag.png" alt-text="Screenshot to monitor the Airflow DAG.":::

   :::image type="content" source="media/data-workflows/loaded-adf-dag.png" alt-text="Screenshot to load Airflow DAG.":::

## Related Content

- Quickstart: [Create a Data workflows](../data-factory/create-data-workflows.md).
