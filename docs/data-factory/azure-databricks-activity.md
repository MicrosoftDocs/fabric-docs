---
title: Azure Databricks activity
description: Learn how to add an Azure Databricks activity to a pipeline and use it to connect to an Azure Databricks job and successfully run it.
ms.reviewer: abnarain
ms.author: sbahadur
author: shaween18
ms.topic: how-to
ms.date: 11/16/2023
---

# Transform data by running an Azure Databricks activity

The Azure Databricks activity in Data Factory for Microsoft Fabric allows you to orchestrate the following Azure Databricks jobs:

- Notebook
- Jar
- Python

This article provides a step-by-step walkthrough that describes how to create an Azure Databricks activity using the Data Factory interface.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Configuring an Azure Databricks activity

To use an Azure Databricks activity in a pipeline, complete the following steps:

### Configuring connection

1. Create a new pipeline in your workspace.
1. Click on add a pipeline activity and search for Azure Databricks.

    :::image type="content" source="media/azure-databricks-activity/pick-databricks-activity.png" alt-text="Screenshot of the Fabric Data pipelines landing page and Azure Databricks activity highlighted.":::

1. Alternately, you can search for Azure Databricks in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

    :::image type="content" source="media/azure-databricks-activity/pick-databricks-activity-from-pane.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Azure Databricks activity highlighted.":::

1. Select the new Azure Databricks activity on the canvas if it isn’t already selected.

    :::image type="content" source="media/azure-databricks-activity/databricks-activity-general.png" alt-text="Screenshot showing the General settings tab of the Azure Databricks activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Configuring clusters

1. Select the **Cluster** tab. Then you can choose an existing or create a new **Azure Databricks connection**, and then pick a **new job cluster**, an **existing interactive cluster**, or an **existing instance pool**.
1. Depending on what you pick for the cluster, fill out the corresponding fields as presented.
    1. Under **new job cluster** and **existing instance pool**, you also have the ability to configure the number of **workers** and enable **spot instances**.
1. You can also specify additional cluster settings, such as **Cluster policy**, **Spark configuration**, **Spark environment variables**, and **custom tags**, as required for the cluster you are connecting to. **Databricks init scripts** and **Cluster Log destination path** can also be added under the additional cluster settings.

    > [!NOTE]
    > All advanced cluster properties and dynamic expressions supported in the Azure Data Factory Azure Databricks linked service are now also supported in the Azure Databricks activity in Microsoft Fabric under the ‘Additional cluster configuration’ section in the UI. As these properties are now included within the activity UI, they can be easily used with an expression (dynamic content) without the need for the Advanced JSON specification in the Azure Data Factory Azure Databricks linked service.

    :::image type="content" source="media/azure-databricks-activity/databricks-activity-cluster.png" alt-text="Screenshot showing the Cluster settings tab of the Azure Databricks activity.":::

### Configuring settings

Selecting the **Settings** tab, you can choose between 3 options which **Azure Databricks type** you would like to orchestrate.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-settings.png" alt-text="Screenshot showing the Settings tab of the Azure Databricks activity.":::

#### Orchestrating the Notebook type in Azure Databricks activity:

1. Under the **Settings** tab, you can choose the **Notebook** radio button to run a Notebook. You will need to specify the notebook path to be executed on Azure Databricks, optional base parameters to be passed to the notebook, and any additional libraries to be installed on the cluster to execute the job.

    :::image type="content" source="media/azure-databricks-activity/databricks-activity-notebook.png" alt-text="Screenshot showing the Notebooks type of the Azure Databricks activity.":::

#### Orchestrating the Jar type in Azure Databricks activity:

1. Under the **Settings** tab, you can choose the **Jar** radio button to run a Jar. You will need to specify the class name to be executed on Azure Databricks, optional base parameters to be passed to the Jar, and any additional libraries to be installed on the cluster to execute the job.

    :::image type="content" source="media/azure-databricks-activity/databricks-activity-jar.png" alt-text="Screenshot showing the Jar type of the Azure Databricks activity.":::

#### Orchestrating the Python type in Azure Databricks activity:

1. Under the **Settings** tab, you can choose the **Python** radio button to run a Python file. You will need to specify the path within Azure Databricks to a Python file to be executed, optional base parameters to be passed, and any additional libraries to be installed on the cluster to execute the job.

    :::image type="content" source="media/azure-databricks-activity/databricks-activity-python.png" alt-text="Screenshot showing the Python type of the Azure Databricks activity.":::

## Supported Libraries for the Azure Databricks activity

In the above Databricks activity definition, you can specify these library types: *jar*, *egg*, *whl*, *maven*, *pypi*, *cran*.

For more information, see the [Databricks documentation](/azure/databricks/dev-tools/api/latest/libraries#managedlibrarieslibrary) for library types.

## Passing parameters between Azure Databricks activity and pipelines

You can pass parameters to notebooks using *baseParameters* property in databricks activity.

In certain cases, you might require to pass back certain values from notebook back to the service, which can be used for control flow (conditional checks) in the service or be consumed by downstream activities (size limit is 2 MB).

1. In your notebook, for example, you may call [dbutils.notebook.exit("returnValue")](/azure/databricks/notebooks/notebook-workflows#notebook-workflows-exit) and corresponding "returnValue" will be returned to the service.

1. You can consume the output in the service by using expression such as `@{activity('databricks activity name').output.runOutput}`.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-base-parameters.png" alt-text="Screenshot showing how to pass base parameters in the Azure Databricks activity.":::

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/azure-databricks-activity/databricks-activity-save-and-run.png" alt-text="Screenshot showing how to save and run the pipeline.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)