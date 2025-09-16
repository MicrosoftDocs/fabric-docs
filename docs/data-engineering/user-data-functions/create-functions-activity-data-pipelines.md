---
title: User data functions activity in data pipelines
description: Learn how to add user data functions activity to a data pipeline and run it in Fabric.
ms.author: sumuth
author: mksuni
ms.topic: how-to
ms.date: 03/31/2025
---

# Create and run user data functions activity in data pipelines

The functions activity in data pipelines for Microsoft Fabric allows you to run user data functions items. You can configure the user data functions item securely and provide the necessary input within the pipeline.

## Prerequisites

To get started, you must complete the following prerequisites:

- [Sign in with a Fabric Account or sign up for free](../../get-started/fabric-trial.md).
- [Create a workspace](../../get-started/create-workspaces.md).
- [Create a user data functions item in Fabric](./create-user-data-functions-portal.md).

## Add user data functions activity to a pipeline

To use user data functions activity in a pipeline, complete the following steps:

### Create the activity

- Create a new pipeline in your workspace.
- Search for `Functions` in the pipeline's **Activities** pane, then select the found result to add it to the pipeline canvas.
- Select the new **Functions** activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\add-function-activity-in-pipelines.png" alt-text="Screenshot showing how to find functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\add-function-activity-in-pipelines.png":::

### Functions activity settings

The Functions activity has two settings:

- On the **General** tab, you can enter a name for the activity, set the retry configuration, and specify whether you're passing secure input or output.

   :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\activity-general-settings.png" alt-text="Screenshot showing general settings for functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\activity-general-settings.png":::

- On the **Settings** tab, you can then choose **UserDataFunctions** as the **Type** of functions activity. Select the workspace, user data functions item, and function name, then provide the input parameters for your selected function.

   :::image type="content" source="..\media\user-data-functions-activity-in-pipelines\user-data-functions-activity-settings.png" alt-text="Screenshot showing settings for functions activity." lightbox="..\media\user-data-functions-activity-in-pipelines\user-data-functions-activity-settings.png":::

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the **Home** tab at the top of the pipeline editor, then select **Save** to save your pipeline. Select **Run** to run it directly, or choose **Schedule** to schedule it. You can also view the run history here or configure other settings.

## Related content

- [Learn about the User data functions programming model](./python-programming-model.md)
- [Use parameters in pipelines for Data Factory in Fabric](../../data-factory/parameters.md)
- [Understand the data pipeline run concept](../../data-factory/pipeline-runs.md)
- [How to monitor pipeline runs in Microsoft Fabric](../../data-factory/monitor-pipeline-runs.md)
