---
title: Dataflow activity
description: Learn how to add a Dataflow activity to a pipeline and use it to run a Dataflow Gen2.
ms.reviewer: xupxhou
ms.author: jburchel
author: jonburchel
ms.topic: how-to
ms.date: 12/07/2023
---

# Use the Dataflow activity to run a Dataflow Gen2

The Dataflow activity in Data Factory for Microsoft Fabric allows you to run a Dataflow Gen2.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a Dataflow activity to a pipeline with UI

To use a Dataflow activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for Dataflow in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/dataflow-activity/add-dataflow-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Dataflow activity highlighted.":::

1. Select the new Dataflow activity on the canvas if it isn't already selected.

   :::image type="content" source="media/dataflow-activity/dataflow-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Dataflow activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Dataflow activity settings

Select the **Settings** tab, then select an existing workspace and dataflow to run. The notification option is disabled for now, but the feature is coming soon.

   :::image type="content" source="media/dataflow-activity/dataflow-settings.png" alt-text="Screenshot showing the Dataflow activity Settings tab, and highlighting the tab.":::

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
