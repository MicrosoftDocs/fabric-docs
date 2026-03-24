---
title: Switch activity
description: Learn how to add a switch activity to a pipeline and use it to evaluate a set of activities corresponding to a case that matches the condition evaluation.
ms.reviewer: makromer
ms.topic: how-to
ms.custom: pipelines
ms.date: 03/24/2026
ai-usage: ai-assisted
---

# Use the switch activity to conditionally branch execution in a pipeline

The switch activity in Microsoft Fabric works like a switch statement in a programming language. It evaluates an expression, matches the result to a case, and runs the activities in that case.

## Prerequisites

Before you begin, complete these prerequisites:

[!INCLUDE[basic-prerequisites](includes/basic-prerequisites.md)]

## Add a switch activity to a pipeline in the UI

To add a switch activity, complete these steps:

1. [Create the switch activity](#create-the-switch-activity)
1. [Set the evaluation expression and cases for the switch activity](#set-the-evaluation-expression-and-cases-for-the-switch-activity)
1. [Configure the case activities](#configure-the-case-activities)

### Create the switch activity

1. Create a new pipeline in your workspace.
1. In the pipeline **Activities** toolbar, search for **Switch**, and then select it to add it to the canvas. If you don't see it, select **+** to expand the activities list.

   :::image type="content" source="media/switch-activity/add-switch-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and switch activity highlighted.":::

1. Select the new switch activity on the canvas if it isn't already selected.

   :::image type="content" source="media/switch-activity/switch-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the switch activity.":::

For details on the **General** tab, see [**General** settings](activity-overview.md#general-settings).

### Set the evaluation expression and cases for the switch activity

Select the **Activities** tab. The **Default** case is already in the cases list.

In **Expression**, enter the value that the switch activity should evaluate. You can use dynamic content such as parameters, system variables, functions, and local variables.

For information about our expression language and supported functions, see [the expression language overview](expression-language.md).

To configure what each case runs:

1. On the **Activities** tab, select the pencil icon next to a case.
1. Add the activities that should run when that case matches **Expression**.
1. To add more cases, select **+ Add case**.

You can also add cases and configure activities from the switch activity card on the pipeline canvas by selecting **+** or the pencil icon next to each case.

:::image type="content" source="media/switch-activity/configure-activities-cases.png" alt-text="Screenshot showing the switch activity settings tab highlighting the tab, and where to choose a new connection.":::

### Configure the case activities

When you select the pencil icon for a case, Fabric opens the case activities editor. This editor looks like the pipeline editor, but it only applies to the selected case.

Add the activities you want to run for that case. In this example, the **Default** case contains a Copy activity. Fabric runs that Copy activity when no other case matches the **Expression** result.

:::image type="content" source="media/switch-activity/case-activities-editor.png" alt-text="Screenshot showing the case activities editor pane for the default case with a sample Copy activity added to it.":::

In the top-left corner of the case activities editor, you can see the current pipeline and case. When you're done, select the pipeline name to return to the main pipeline editor.

## Save and run or schedule the pipeline

[!INCLUDE[save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

## Basic example

This example routes data processing based on a pipeline parameter named `v_string_input`.

Our switch activity `ROYGBIV switch` evaluates the value of `v_string_input` and runs the activities in the case that matches that value. If there's no match, it runs no activity, as the **Default** case is empty.

There are seven cases in this example, one for each color (red, orange, yellow, green, blue, indigo, violet). Each case contains a single **Set variable activity** that sets the value of `v_output` to the name of the color in that case. The **Expression** is a simple intake of the input parameter `v_string_input`, in this instance `@pipeline().parameters.v_string_input`, but it could be any expression that evaluates to a value.

:::image type="content" source="media/switch-activity/set-variable-activities.jpg" alt-text="Screenshot showing sample Set variable activities used to prepare values before switch evaluation.":::

When we run the pipeline, we input a value for the `v_string_input`. If we input "blue", the switch activity evaluates that expression, matches it to the "Blue" case, and runs the activity in that case, which sets `v_output` to "Blue". If we input "lime", there's no matching case, so the switch activity runs the **Default** case, which does nothing.

:::image type="content" source="media/switch-activity/run-pipeline-input.jpg" alt-text="Screenshot showing pipeline run input with parameter values used by the switch expression. The input is 'blue' in this example.":::

After a successful run of the pipeline with "blue" as the input, we can see in the output of the **Set variable activity** in the "Blue" case that `v_output` was set to "Blue", confirming that the switch activity evaluated the expression and ran the correct case.

:::image type="content" source="media/switch-activity/pipeline-run-example.png" alt-text="Screenshot showing a successful pipeline run example after switch case evaluation, showing that the correct (blue) activity was run after an input of blue.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
