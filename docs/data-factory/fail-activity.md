---
title: Fail activity
description: Learn how to add a Fail activity to cause pipeline execution to fail with a customized error message and error code.
ms.reviewer: xupxhou
ms.author: jburchel
author: jonburchel
ms.topic: how-to
ms.date: 12/11/2023
---

# Use the Fail activity to cause pipeline execution to fail with a customized error message and error code

You might occasionally want to throw an error in a pipeline intentionally. A [Lookup activity](lookup-activity.md) might return no matching data, or a [Script activity](script-activity.md) might finish with an internal error. Whatever the reason might be, now you can use a Fail activity in a pipeline and customize both its error message and error code.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a Fail activity to a pipeline with UI

To use a Fail activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for the Fail activity in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. It might be necessary to expand the activities list on the far right side of the pane, or the Outlook icon can be compressed without labeling text beneath it, as shown in this image, depending on the window width of your browser.

   :::image type="content" source="media/fail-activity/add-fail-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Fail activity highlighted.":::

1. Select the new Fail activity on the canvas if it isn't already selected.

   :::image type="content" source="media/fail-activity/fail-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Fail activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Fail activity settings

Select the **Settings** tab and provide a custom error message and error code you would like the pipeline to report when the activity is invoked.

   :::image type="content" source="media/fail-activity/fail-settings.png" alt-text="Screenshot showing the Fail activity Settings tab, and highlighting the tab.":::

## Save and run or schedule the pipeline

The Fail activity is typically used with other activities. After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
