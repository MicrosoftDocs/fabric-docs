---
title: Functions activity
description: Learn how to add a Functions activity to a pipeline and use it to run Azure Functions.
ms.reviewer: xupxhou
ms.author: abnarain
author: nabhishek
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Functions activity to run Azure Functions

The Functions activity in Data Factory for Microsoft Fabric allows you to run Azure Functions.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a Functions activity to a pipeline with UI

To use a Functions activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for Functions in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   > [!NOTE]
   > You may need to expand the menu and scroll down to see the Functions activity as highlighted in the following screenshot.

   :::image type="content" source="media/functions-activity/add-functions-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Functions activity highlighted.":::

1. Select the new Functions activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/functions-activity/functions-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Functions activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Functions activity settings

Select the **Settings** tab, then you can choose an existing or create a new **Azure Function connection**, provide a **Function relative URL** that points to the relative path to the Azure App function within the Azure Function connection, and an HTTP **Method** to be submitted to the URL. You can also specify as many additional **Headers** as required for the function you are executing.

:::image type="content" source="media/functions-activity/functions-activity-settings.png" alt-text="Screenshot showing the Settings tab of the Functions activity.":::

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
