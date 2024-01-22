---
title: If Condition activity
description: Learn how to add an If Condition activity to a pipeline in Data Factory for Microsoft Fabric and use it to execute other activities based on an expression.
author: chez-charlie
ms.author: chez
ms.reviewer: jburchel
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Use the If Condition activity to execute activities based on an expression

The If Condition activity in Data Factory for Microsoft Fabric provides the same functionality that an if statement provides in programming languages. It executes a set of activities when the condition evaluates to true and another set of activities when the condition evaluates to false.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../get-started/fabric-trial.md).
- A workspace is created.

## Add an If Condition activity to a pipeline with UI

To use an If Condition activity in a pipeline, complete the following steps:

### Creating the activity

1. Create a new pipeline in your workspace.
1. Search for If Condition in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.

   :::image type="content" source="media/if-condition-activity/add-if-condition-activity-to-pipeline.png" lightbox="media/if-condition-activity/add-if-condition-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and If Condition activity highlighted.":::

1. Select the new If Condition activity on the canvas if it isn't already selected.

   :::image type="content" source="media/if-condition-activity/if-condition-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the If Condition activity.":::

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### If Condition settings

Select the **Activities** tab and provide a dynamic boolean **Expression** for the If activity. In this simple example, we randomly generate a number between 0 and 1, and return True if the number is greater than or equal to .5, or otherwise False. You can use any of the available functions in the Data Factory [expression language](expression-language.md) or any [parameters](parameters.md) specified in the pipeline.

After providing the expression for the If Condition, selecting the pencil icon beside each case (True/False) allows you to add as many activities as necessary to be conditionally executed whenever the expression evaluates.

:::image type="content" source="media/if-condition-activity/provide-if-condition-expression-and-configure-activities.png" lightbox="media/if-condition-activity/provide-if-condition-expression-and-configure-activities.png" alt-text="Screenshot showing the If Condition Activity settings tab and showing where to provide the Expression and choose Activities for when the expression evaluates to True or False.":::

## Save and run or schedule the pipeline

Switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline.  Select **Run** to run it directly, or **Schedule** to schedule it.  You can also view the run history here or configure other settings.

:::image type="content" source="media/lookup-activity/pipeline-home-tab.png" alt-text="Screenshot showing the Home tab in the pipeline editor with the tab name, Save, Run, and Schedule buttons highlighted.":::

## Related content

- [How to monitor pipeline runs](monitor-pipeline-runs.md)
