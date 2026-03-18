---
title: Copy Job Activity in Data Factory Pipelines
description: Set up and configure the Copy Job activity in Data Factory pipelines for flexible data movement and incremental copy. Learn more and get started today.
ms.reviewer: yexu
ms.date: 12/31/2025
ms.topic: how-to
ai-usage: ai-assisted
---

# Copy job activity in Data Factory pipelines

The Copy job activity runs a Copy job directly inside a pipeline. This means you can manage data movement alongside other tasks like transformations and notifications—all in one place.

Copy jobs move data from your source to your destination with flexibility and ease. You can use full copy or incremental copy behaviors. To learn more about Copy job functionality, see [What is Copy job in Data Factory](/fabric/data-factory/what-is-copy-job).

## What you can do with the Copy Job activity

- Select an existing Copy Job from your workspace
- Create a new Copy Job if one doesn’t exist
- Monitor the job’s progress and status
- Chain with [other activities](/fabric/data-factory/activity-overview) in your pipeline

## Prerequisites

To get started, you'll need:

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Microsoft Fabric enabled workspace.

## Add a Copy job activity to your pipeline

Here's how to set up your Copy job activity.

1. Create a pipeline, and add a Copy job activity.

   :::image type="content" source="media/copy-job-activity/copy-job-activity-setup.png" alt-text="Screenshot of pipeline canvas with the activities window open and the Copy job activity selected.":::

1. Go to the activity’s **Settings** tab, configure the connection used to access the workspace that contains your Copy job. Under **Connection**, select Browse all to go to Get data page, and select Copy job to creat a connection.

   :::image type="content" source="media/copy-job-activity/copy-job-activity-connection.png" alt-text="Screenshot of select Copy job activity connection.":::

    :::image type="content" source="media/copy-job-activity/copy-job-connection.png" alt-text="Screenshot of select Copy job connection.":::

   In Connect data source page, specify the connection name and choose your preferred data gateway and authentication kind. You can choose one of the following authentication methods:
	- **Organizational account** – Sign in with your organizational account.
	- **Service principal** – Specify your Tenant ID, Service principal client ID, and Service principal Key. 
   - **Workspace identity** – Use the workspace’s managed identity for authentication. For more information, see [Workspace identity](../security/workspace-identity.md).

   :::image type="content" source="media/copy-job-activity/connect-to-copy-job.png" alt-text="Screenshot of connect to Copy job.":::
   
1. Select the workspace and Copy job item to orchestrate in your pipeline. If you don't have a Copy job item, create one by selecting the **+ New** button in the Copy job settings within the activity.

   :::image type="content" source="media/copy-job-activity/copy-job-settings-panel.png" alt-text="Screenshot of pipeline settings showing Copy Job item selected and '+ New' button visible for creating a new Copy Job item.":::

Now you can use the Copy job item in your pipeline to move your data!

## Related content

- [How to create a Copy job in Data Factory](/fabric/data-factory/create-copy-job)
- [How to monitor a Copy job in Data Factory](/fabric/data-factory/monitor-copy-job)
- [How to monitor pipeline runs](/fabric/data-factory/monitor-pipeline-runs)
- [Connector overview](/fabric/data-factory/connector-overview)
