---
title: Azure Databricks activity
description: Learn how to add an Azure Databricks activity to a pipeline and use it to connect to an Azure Databricks job and successfully run it.
ms.reviewer: abnarain, noelleli
ms.topic: how-to
ms.date: 09/08/2026
ms.custom: pipelines
---

# Transform data by running an Azure Databricks activity

The Azure Databricks activity in Fabric Data Factory allows you to orchestrate the following Azure Databricks jobs:

- Notebook
- Jar
- Python
- Job

This article provides a step-by-step walkthrough that describes how to create an Azure Databricks activity using the Data Factory interface.

## Prerequisites

To get started, you must complete the following prerequisites:

[!INCLUDE[basic-prerequisites](includes/basic-prerequisites.md)]

## Configuring an Azure Databricks activity

To use an Azure Databricks activity in a pipeline, complete the following steps:

1. Create a new pipeline in your workspace.
1. Select **Add pipeline activity** and search for Azure Databricks.

    :::image type="content" source="media/azure-databricks-activity/pick-databricks-activity.png" alt-text="Screenshot of the Fabric pipelines landing page and Azure Databricks activity highlighted.":::

1. Alternately, you can search for Azure Databricks in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

    :::image type="content" source="media/azure-databricks-activity/pick-databricks-activity-from-pane.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Azure Databricks activity highlighted.":::

1. Select the new Azure Databricks activity on the canvas if it isn’t already selected.

    :::image type="content" source="media/azure-databricks-activity/databricks-activity-general.png" alt-text="Screenshot showing the General settings tab of the Azure Databricks activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Configuring clusters

1. Select the **Cluster** tab. Then you can choose an existing or create a new **Azure Databricks connection**, and then pick a **new job cluster**, an **existing interactive cluster**, or an **existing instance pool**.
1. Depending on what you pick for the cluster, fill out the corresponding fields as presented.
    - Under **new job cluster** and **existing instance pool**, you also have the ability to configure the number of **workers** and enable **spot instances**.
1. You can also specify other cluster settings, such as **Cluster policy**, **Spark configuration**, **Spark environment variables**, and **custom tags**, as required for the cluster you're connecting to. **Databricks init scripts** and **Cluster Log destination path** can also be added under the additional cluster settings.

    > [!NOTE]
    > All advanced cluster properties and dynamic expressions supported in the Azure Data Factory Azure Databricks linked service are now also supported in the Azure Databricks activity in Microsoft Fabric under the 'Additional cluster configuration' section in the UI. As these properties are now included within the activity UI, they can be used with an expression (dynamic content) without the need for the Advanced JSON specification.

    :::image type="content" source="media/azure-databricks-activity/databricks-activity-cluster.png" alt-text="Screenshot showing the Cluster settings tab of the Azure Databricks activity.":::

1. The Azure Databricks Activity now also supports **Cluster Policy and Unity Catalog support**.
    - Under advanced settings, you can choose the **Cluster Policy** so you can specify which cluster configurations are permitted.
    - Also, under advanced settings, you can configure the **Unity Catalog Access Mode** for added security. The available [access mode types](/azure/databricks/compute/access-mode-limitations) are:
      - **Single User Access Mode** This mode is designed for scenarios where each cluster is used by a single user. It ensures that the data access within the cluster is restricted to that user only. This mode is useful for tasks that require isolation and individual data handling.
      - **Shared Access Mode** In this mode, multiple users can access the same cluster. It combines Unity Catalog's data governance with the legacy table access control lists (ACLs). This mode allows for collaborative data access while maintaining governance and security protocols. However, it has certain limitations, such as not supporting Databricks Runtime ML, Spark-submit jobs, and specific Spark APIs and UDFs.
      - **No Access Mode** This mode disables interaction with the Unity Catalog, meaning clusters don't have access to data managed by Unity Catalog. This mode is useful for workloads that don't require Unity Catalog’s governance features.

    :::image type="content" source="media/azure-databricks-activity/databricks-activity-policy-uc-support.png" alt-text="Screenshot showing the policy ID and Unity Catalog support under Cluster settings tab of the Azure Databricks activity.":::

### Configuring settings

Select the **Settings** tab to configure your connection and choose the Azure Databricks type you want to orchestrate.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-settings.png" alt-text="Screenshot showing the Settings tab of the Azure Databricks activity.":::

#### Configuring connections

To configure a connection, select the dropdown next to **Connection** under the **Settings** tab. 

:::image type="content" source="media/azure-databricks-activity/databricks-activity-connection-selection.png" alt-text="Screenshot showing the Connection dropdown in the Settings tab of the Azure Databricks activity.":::

Select an existing connection or create a new one by selecting **Browse all** to open the Connection configuration pop-up. Select **Azure Databricks workspace** under **New sources**.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-connection-setup.png" alt-text="Screenshot showing the Connection set-up process through the Get data pop-up.":::

Under the Connection settings, set your **URL**, **Connection name**, **Data gateway**, **Authentication kind**, and **Privacy level**. 

:::image type="content" source="media/azure-databricks-activity/databricks-activity-connection-settings.png" alt-text="Screenshot showing the Connection settings to fill out in order to set up a connection.":::

For **Authentication kind**, select from: 
- Personal Access Token (PAT)
- Organizational account
- Service principal
  
:::image type="content" source="media/azure-databricks-activity/databricks-activity-notebook.png" alt-text="Screenshot showing the Authentication kind dropdown selection in the connection configuration process.":::

#### Orchestrating the Notebook type in Azure Databricks activity:

Under the **Settings** tab, you can choose the **Notebook** radio button to run a Notebook. You need to specify the notebook path to be executed on Azure Databricks, optional base parameters to be passed to the notebook, and any extra libraries to be installed on the cluster to execute the job.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-connection-authentication.png" alt-text="Screenshot showing the Notebooks type of the Azure Databricks activity.":::

#### Orchestrating the Jar type in Azure Databricks activity:

Under the **Settings** tab, you can choose the **Jar** radio button to run a Jar. You need to specify the class name to be executed on Azure Databricks, optional base parameters to be passed to the Jar, and any additional libraries to be installed on the cluster to execute the job.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-jar.png" alt-text="Screenshot showing the Jar type of the Azure Databricks activity.":::

#### Orchestrating the Python type in Azure Databricks activity:

Under the **Settings** tab, you can choose the **Python** radio button to run a Python file. You need to specify the path within Azure Databricks to a Python file to be executed, optional base parameters to be passed, and any additional libraries to be installed on the cluster to execute the job.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-python.png" alt-text="Screenshot showing the Python type of the Azure Databricks activity.":::

#### Orchestrating the job type in Azure Databricks activity:

Under the **Settings** tab, you can choose the **Job** radio button to run a Databricks job. You need to specify job using the drop-down to be executed on Azure Databricks and any optional job parameters to be passed. You can run Serverless jobs with this option.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-job.png" alt-text="Screenshot showing the job type of the Azure Databricks activity.":::

## Supported Libraries for the Azure Databricks activity

In the above Databricks activity definition, you can specify these library types: *jar*, *egg*, *whl*, *maven*, *pypi*, *cran*.

For more information, see the [Databricks documentation](/azure/databricks/dev-tools/api/latest/libraries#managedlibrarieslibrary) for library types.

## Passing parameters between Azure Databricks activity and pipelines

You can pass parameters to notebooks using *baseParameters* property in Databricks activity.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-base-parameters.png" alt-text="Screenshot showing how to pass base parameters in the Azure Databricks activity.":::

Sometimes, you may need to return values from a notebook to the service for control flow or use in downstream activities (with a size limit of 2 MB).

1. In your notebook, for example, you may call [dbutils.notebook.exit("returnValue")](/azure/databricks/notebooks/notebook-workflows#notebook-workflows-exit) and the corresponding "returnValue" will be returned to the service.

1. You can consume the output in the service by using an expression such as `@{activity('databricks activity name').output.runOutput}`.

## Save and run or schedule the pipeline

[!INCLUDE[save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
