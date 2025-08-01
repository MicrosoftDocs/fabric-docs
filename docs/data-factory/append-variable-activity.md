---
title: Append variable activity
description: Learn how to set the Append Variable activity to add a value to an existing array variable defined in Fabric pipeline.
ms.reviewer: whhender
ms.author: makromer
author: kromerm
ms.topic: how-to
ms.custom: pipelines
ms.date: 12/18/2024
---

# Use the Append Variable activity in Fabric

Use the **Append Variable** activity to add a value to an existing array variable defined in a Fabric pipeline.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.

## Add an Append Variable activity to a pipeline with UI

To use an **Append Variable** activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Before you use the **Append Variable** activity, you need an array type variable in your pipeline. First select the pipeline canvas background, so the pipeline settings appear on the lower part of the screen. There, select the **Variables** tab, and then select **+ New**, to add a variable of Array type.

   :::image type="content" source="media/append-variable-activity/add-append-variable-activity.png" alt-text="Screenshot showing the creation of a new array type variable to a pipeline.":::

1. Now that you have an array type variable in your pipeline, search for **Append Variable** in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. You may need to expand the list of available activities using the dropdown **+** button at the far right of the toolbar.

   :::image type="content" source="media/append-variable-activity/add-append-variable-activity.png" alt-text="Screenshot of the Fabric UI with the Activities pane and &quot;Append Variable&quot; activity highlighted.":::

1. Select the new activity on the canvas if it isn't already selected.

   :::image type="content" source="media/append-variable-activity/append-variable-general-settings.png" alt-text="Screenshot showing the General settings tab of the &quot;Append Variable&quot; activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Append variable settings

Select the **Settings** tab, then use the **Name** dropdown to select your previously created array type variable. You can also use the **+ New** button to create a new variable in the pipeline directly if you didn't create one previously. Provide data to be appended to the array variable. You can use dynamic expressions here or directly enter data, of which the type is always string.

:::image type="content" source="media/append-variable-activity/configure-append-variable-settings.png" alt-text="Screenshot showing the &quot;Append Variable&quot; activity settings tab, highlighting the tab.":::

## Save and run or schedule the pipeline

Although **Append Variable** is typically used with other activities, it can be run directly as is. To run the example pipeline here, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline.  Select **Run** to run it directly, or **Schedule** to schedule it.  You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
