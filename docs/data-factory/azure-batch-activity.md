---
title: Azure Batch activity
description: Learn how to add an Azure Batch activity to a pipeline and use it to connect to an Azure Batch instance and run a command.
ms.reviewer: xupxhou
ms.author: abnarain
author: nabhishek
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Azure Batch activity to run a command on an Azure Batch instance

The Azure Batch activity in Data Factory for Microsoft Fabric allows you to run a command against an Azure Batch instance.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add an Azure Batch activity to a pipeline with UI

To use an Azure Batch activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for Azure Batch in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   > [!NOTE]
   > You may need to expand the menu and scroll down to see the Azure Batch activity as highlighted in the following screenshot.

   :::image type="content" source="media/azure-batch-activity/add-azure-batch-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Azure Batch activity highlighted.":::

1. Select the new Azure Batch activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/azure-batch-activity/azure-batch-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Azure Batch activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Azure Batch activity settings

Select the **Settings** tab, then you can choose an existing or create a new **Azure Batch connection**, provide a **Command** to be executed, and a **Resource connection** to a storage account. You can also specify a specific **Folder path** within the storage account and a **Retention time in days** for data to be retained there, as well as add extended properties of your own.

:::image type="content" source="media/azure-batch-activity/azure-batch-activity-settings.png" alt-text="Screenshot showing the Settings tab of the Azure Batch activity.":::

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
