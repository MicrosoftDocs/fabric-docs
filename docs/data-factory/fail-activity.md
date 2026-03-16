---
title: Fail activity
description: Learn how to add a Fail activity to cause pipeline execution to fail with a customized error message and error code.
ms.reviewer: xupxhou
ms.topic: how-to
ms.date: 08/13/2025
ms.custom: pipelines
ai-usage: ai-assisted
---

# Use the Fail activity to cause pipeline execution to fail with a customized error message and error code

You might occasionally want to throw an error in a pipeline intentionally. A [Lookup activity](lookup-activity.md) might return no matching data, or a [Script activity](script-activity.md) might finish with an internal error. Whatever the reason might be, now you can use a Fail activity in a pipeline and customize both its error message and error code.

## When to use the Fail activity

The Fail activity is commonly used in conditional scenarios where you want the pipeline to fail based on specific conditions:

- **Data validation failures**: When data doesn't meet quality standards
- **Business logic violations**: When business rules aren't satisfied
- **Dependency checks**: When required resources or data sources are unavailable
- **Custom error handling**: When you want to provide specific error information instead of generic system errors

The Fail activity is typically connected to other activities using conditional logic (If Condition activity) or placed after activities that might produce error conditions.

## Prerequisites

To get started, you must complete the following prerequisites:

[!INCLUDE[basic-prerequisites](includes/basic-prerequisites.md)]

## Add a Fail activity to a pipeline with UI

To use a Fail activity in a pipeline, complete the following steps:

1. Create a new pipeline in your workspace.
1. Search for the Fail activity in the pipeline **Activities** pane, and select it to add it to the pipeline canvas. It might be necessary to expand the activities list on the far right side of the pane, or the Outlook icon can be compressed without labeling text beneath it, as shown in this image, depending on the window width of your browser.

   :::image type="content" source="media/fail-activity/add-fail-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Fail activity highlighted.":::

1. Select the new Fail activity on the canvas if it isn't already selected.

   :::image type="content" source="media/fail-activity/fail-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Fail activity.":::

    Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

1. Select the **Settings** tab and provide a custom error message and error code you would like the pipeline to report when the activity is invoked. These values will be displayed in the pipeline run history and logs when the Fail activity executes, helping you identify the specific error condition that caused the pipeline to fail.

   :::image type="content" source="media/fail-activity/fail-settings.png" alt-text="Screenshot showing the Fail activity Settings tab, and highlighting the tab.":::

## Save and run or schedule the pipeline

The Fail activity is typically used with other activities, so after you configure any other activities required for your pipeline, complete the following steps:

[!INCLUDE[save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

## Example: Conditional pipeline failure

Here's a common pattern for failing a pipeline based on custom conditions:

1. Use an [If Condition activity](if-condition-activity.md) to evaluate your custom error condition
1. In the **True** branch of the If Condition, add the Fail activity
1. Configure the Fail activity with your custom error message that describes the specific condition that was met
1. In the **False** branch, continue with normal pipeline execution

This pattern allows your pipeline to fail gracefully with meaningful error messages when specific business or data conditions are encountered.

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
