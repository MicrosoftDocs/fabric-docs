---
title: User data functions activity in Data pipelines
description: Learn how to add a User data functions activity to a pipeline and run it in Fabric.
ms.author: sumuth
author: mksuni
ms.topic: how-to
ms.date: 02/20/2025
---

# Create and run User data functions activity in Data pipelines (Preview)

The Functions activity in Data pipelines for Microsoft Fabric allows you to run User data functions. You can configure the user data function securely and provide the necessary input to the function within the pipeline. 

## Prerequisites

To get started, you must complete the following prerequisites:

- [Sign in with Fabric Account or Sign up for free](../../get-started/fabric-trial.md)
- [Create a workspace](../../get-started/create-workspaces.md)
- [Create a User data function in Fabric](./create-user-data-functions-in-portal.md)

## Add a Functions activity to a pipeline with UI

To use a Functions activity in a pipeline, complete the following steps:

### Create the activity

1. Create a new pipeline in your workspace.
2. Search for Functions in the pipeline **Activities** pane, and select it to add it to the pipeline canvas.
3. Select the new **Functions** activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\Add-Functions-activity-in-pipelines.png" alt-text="Screenshot showing how to find functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\Add-Functions-activity-in-pipelines.png":::

### Functions activity settings
There are two settings for Functions activity. They are:
- In the **General** tab, you can provide a name for the activity, retry configuration and whether you're passing secure input or output.

   :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\activity-general-settings.png" alt-text="Screenshot showing general settings for functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\activity-general-settings.png":::


- In **Settings** tab, then you can choose **User data functions** as the **Type** of Functions activity. Select Workspace, User data functions item, function name and provide the input parameters to your selected function.

   :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\user-data-functions-activity-settings.png" alt-text="Screenshot showing settings for functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\user-data-functions-activity-settings.png":::

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

## Related content
1. [How to use Data pipelines parameters](../../data-factory/parameters.md) to pass data to Functions activity 

2. [Understanding data pipelines run concept](../../data-factory/pipeline-runs.md)

3. [How to monitor pipeline runs](../../data-factory/monitor-pipeline-runs.md)
