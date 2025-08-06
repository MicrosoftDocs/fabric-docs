---
title: Copy Job Activity in Data Factory Pipelines
description: Set up and configure the Copy Job activity in Data Factory pipelines for flexible data movement and incremental copy. Learn more and get started today.
author: whhender
ms.author: whhender
ms.reviewer: whhender
ms.date: 08/06/2025
ms.topic: how-to
ai-usage: ai-assisted
---

# Copy job activity in Data Factory pipelines

> [!NOTE]
> This feature is in [preview](/fabric/fundamentals/preview).

The Copy job activity runs a Copy job directly inside a pipeline. This means you can manage data movement alongside other tasks like transformations and notifications—all in one place.

Copy jobs move data from your source to your destination with flexibility and ease. You can use full copy or incremental copy behaviors. To learn more about Copy job functionality, see [What is Copy job in Data Factory](/fabric/data-factory/what-is-copy-job).

## What you can do with the Copy Job activity

- Select an existing Copy Job from your workspace
- Create a new Copy Job if one doesn’t exist
- Monitor the job’s progress and status
- Chain with [other activities](/fabric/data-factory/activity-overview) in your pipeline

## Prerequisites

To get started, you'll need:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](https://azure.microsoft.com/free/).
- A Microsoft Fabric enabled workspace.

## Add a Copy job activity to your pipeline

Here's how to set up your Copy job activity.

1. Create a pipeline, and add a Copy job activity.

   :::image type="content" source="media/copy-job-activity/copy-job-activity-setup.png" alt-text="Screenshot of pipeline canvas with the activities window open and the Copy job activity selected.":::

1. Set up the connection to sign in to your workspace that has the Copy job you want to use in the pipeline.

1. Select the workspace and Copy job item to orchestrate in your pipeline. If you don't have a Copy job item, create one by selecting the **+ New** button in the Copy job settings within the activity.

   :::image type="content" source="media/copy-job-activity/copy-job-settings-panel.png" alt-text="Screenshot of pipeline settings showing Copy Job item selected and '+ New' button visible for creating a new Copy Job item.":::

Now you can use the Copy job item in your pipeline to move your data!

## Known limitations

- Drop any known limitations here as we head to PuPr

## Related content

- [How to create a Copy job in Data Factory](/fabric/data-factory/create-copy-job)
- [How to monitor a Copy job in Data Factory](/fabric/data-factory/monitor-copy-job)
- [How to monitor pipeline runs](/fabric/data-factory/monitor-pipeline-runs)
- [Connector overview](/fabric/data-factory/connector-overview)
