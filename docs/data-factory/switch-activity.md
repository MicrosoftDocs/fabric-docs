---
title: Switch activity
description: Learn how to add a Switch activity to a pipeline and use it to look up data from a data source.
author: chez-charlie
ms.author: chez
ms.reviewer: jburchel
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Switch activity to conditionally branch execution in a pipeline

The Switch activity in Microsoft Fabric provides the same functionality that a switch statement provides in programming languages. It evaluates a set of activities corresponding to a case that matches the condition evaluation.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add a lookup activity to a pipeline with UI

To use a Switch activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for the Switch activity in the pipeline **Activities** toolbar, and select it to add it to the pipeline canvas. You may need to expand the list of activities using the **+** button since there are more activities available than will typically fit in the space for the toolbar.

   :::image type="content" source="media/switch-activity/add-switch-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Switch activity highlighted.":::

1. Select the new Switch activity on the canvas if it isn't already selected.

   :::image type="content" source="media/switch-activity/switch-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Switch activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Activities settings

Select the **Activities** tab, and you will see the **Default** case already added to the list of cases. 

The **Expression** clause is where you provide an expression to be evaluated and compared to the **Case** options, and supports dynamic content that allows you to use parameters, system variables, functions, and local variables from your project to compare against the various cases. 

You can use the pencil icon to the right of each case on the **Activities** tab to configure the activities that will execute when that case matches the **Expression**. You can use the **+ Add case** button to add new cases besides the default that executes if no other case matches the **Expression** result. You can also add cases and activities directly on the Switch activity interface on the pipeline canvas itself by selecting the **+** button to add a case, or the pencil icon beside the listed cases to configure activities for each case.

:::image type="content" source="media/switch-activity/configure-activities-cases.png" alt-text="Screenshot showing the Lookup activity settings tab highlighting the tab, and where to choose a new connection.":::

### Configuring case activities

When you edit the activities for a case by selecting the pencil icon beside it, either in the **Activities** settings pane, or directly on the Switch activity interface on the pipeline canvas, you will see the case's activities editor. This is similar to the pipeline editor, but specific to the selected case. You can add any number of activities, just like with a pipeline, and these will be executed when the selected case matches the **Expression** for the Switch activity. In this example, a Copy activity was added to the default case, and will execute whenever none of the other cases match the **Expression** defined in the Switch activity.

:::image type="content" source="media/switch-activity/case-activities-editor.png" alt-text="Screenshot showing the case activities editor pane for the default case with a sample Copy activity added to it.":::

Notice the pipeline and case in the top left corner of the activities editor for the case. When you finish configuring the case's activities, you can select the pipeline name link there to navigate back to the main pipeline editor again.

## Save and run or schedule the pipeline

Switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline.  Select **Run** to run it directly, or **Schedule** to schedule it.  You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
