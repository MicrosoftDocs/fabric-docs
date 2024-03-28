---
title: Wait activity
description: The Wait activity for Data Factory pipelines in Microsoft Fabric waits a specified interval before continuing execution.
author: kromerm
ms.author: makromer
ms.reviewer: jburchel
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Wait activity to control execution flow

When you use a Wait activity in a pipeline, the pipeline waits for the specified period of time before continuing with execution of subsequent activities.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a Wait activity to a pipeline with UI

To use a Wait activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for **Wait** in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/wait-activity/add-wait-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Wait activity highlighted.":::

1. Select the new Wait activity on the canvas if it isn't already selected.

   :::image type="content" source="media/wait-activity/wait-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Wait activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Wait activity settings

Select the **Settings** tab of the Wait activity. Specify a number of seconds for execution to wait before continuing. You can directly enter a number, or use a dynamic expression to derive a value from any of the available functions and variables for expressions.

:::image type="content" source="media/wait-activity/wait-activity-settings.png" alt-text="Screenshot showing the Wait activity Settings tab.":::

## Save and run or schedule the pipeline

This example will simply wait the specified period and terminate, although in a real-world setting, you would normally add other activities after or before the Wait activity to achieve a more productive purpose. When your pipeline is finished, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
