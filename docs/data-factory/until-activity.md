---
title: Until activity
description: The Until activity in Data Factory pipelines in Microsoft Fabric executes a set of activities in a loop until the condition associated with the activity evaluates to true or it times out.
author: kromerm
ms.author: makromer
ms.reviewer: jburchel
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Use the Until activity to control execution flow

The Until activity provides the same functionality that a do-until looping structure provides in programming languages. It executes a set of activities in a loop until the condition associated with the activity evaluates to true. If an inner activity fails, the Until activity doesn't stop. You can specify a timeout value for the until activity.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add an Until activity to a pipeline with UI

To use an Until activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
1. Search for **Until** in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/until-activity/add-until-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Until activity highlighted.":::

1. Select the new Until activity on the canvas if it isn't already selected.

   :::image type="content" source="media/until-activity/until-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Until activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Add a pipeline variable

In this simple example, we test the value of a pipeline variable. Select the background of the pipeline editor canvas, then select the **Variables** tab, and add a new integer type variable called _TestVariable_ with the value 0.

:::image type="content" source="media/until-activity/add-pipeline-variable.png" alt-text="Screenshot showing the pipeline Variables tab with a variable added called TestVariable, having its value set to 0.":::

### Until activity settings

1. Select the **Until** activity again on the pipeline canvas, and then select the **Settings** tab. Select the **Expression** field, and then select **Add dynamic content**, and provide the following expression: _@equals(variables('TestVariable'), 1)_.

   :::image type="content" source="media/until-activity/until-expression.png" alt-text="Screenshot showing the expression for the Until activity.":::

1. Select the **Activities** tab and then select the pencil icon to edit/add activities to the Until activity, or select the **+** icon on the Until activity on the pipeline editor canvas. Find the **Set Variable** activity and select it to add it to the list of child activities for the Until activity.

   :::image type="content" source="media/until-activity/set-variable-activity.png" alt-text="Screenshot showing the addition of the Set Variable activity to the Until activity's child activity list.":::

1. Select the newly added Set Variable activity from where it appears within the Until activity's **Activities** pane on the pipeline editor canvas, and then select its **Settings** tab from the activity properties pane. For **Variable type**, select **Pipeline variable**, and then choose your previously created _TestVariable_ from the dropdown list. For this example, provide a **Value** of _1_.

   :::image type="content" source="media/until-activity/set-variable-settings.png" alt-text="Screenshot showing the settings of the Set Variable child activity of the Until activity.":::

## Save and run or schedule the pipeline

Switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings. This simple pipeline will execute the child activity of the Until activity exactly 1 time, changing the pipeline variable value from 0 to 1, after which the Until expression evaluates to true and terminate.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
