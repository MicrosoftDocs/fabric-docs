---
title: Configure and manage starter pools in Fabric Spark
description: Learn how to customize starter pools from your Fabric workspace settings for your analytics workloads.
ms.reviewer: saravi
ms.topic: how-to
ms.date: 03/05/2026
ai-usage: ai-assisted
---
# Configure starter pools in Microsoft Fabric

Starter pools provide fast Spark session startup in Fabric. You can start Spark work quickly, instead of waiting for full cluster provisioning on each run.

Starter pools use Medium nodes and support autoscaling based on workload demand. Default and maximum limits depend on your Fabric capacity SKU.

## Prerequisites

To customize a starter pool, you need the **Admin** role in the workspace.

## Understand starter pool settings

In workspace settings, you can configure these starter pool controls:

- **Autoscale**: If enabled, your Apache Spark pool automatically scales up and down based on activity.
- **Dynamically allocate executors**: If enabled, Spark allocates and releases executors based on workload demand.

Both options are enabled by default. Use the sliders to increase or decrease the configured limits for your workload.

## Configure starter pool settings

To manage the starter pool associated with your workspace:

1. Go to your workspace, and select **Workspace settings**.

   :::image type="content" source="media\configure-starter-pools\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu." lightbox="media\configure-starter-pools\data-engineering-menu.png":::

1. Expand **Data Engineering/Science** in the left pane and then select **Spark settings**.

   :::image type="content" source="media/configure-starter-pools/starter-pool-settings.png" alt-text="Screenshot showing starter pool settings." lightbox="media/configure-starter-pools/starter-pool-settings.png":::

1. Select **StarterPool** from the **Default pool for workspace** dropdown to view an overview of the starter pool settings.

1. Select the pencil icon in the **Pool details** section to edit the settings for the starter pool. 
1. In the edit view, configure **Autoscale** and **Dynamically allocate executors**.

   Use the sliders to increase or decrease each setting based on your workload needs.

   :::image type="content" source="media\configure-starter-pools\starter-pool-max-node.png" alt-text="Screenshot showing autoscale and dynamically allocate executors settings with sliders for starter pools." lightbox="media\configure-starter-pools\starter-pool-max-node.png":::

   You can keep the default values or reduce limits for smaller workloads. You can also increase values up to the maximum allowed for your SKU.

1. After making your changes, select **Save** to apply the new settings for the starter pool or select **Discard** to discard your changes. Otherwise, you can select the back arrow to exit without saving or discarding changes.

The following table shows default and maximum starter pool node limits by SKU.

| SKU name | Capacity units | Spark VCores | Node size | Default max nodes | Max number of nodes |
|--|--|--|--|--|--|
| F2 | 2 | 4 | Medium | 1 | 1 |
| F4 | 4 | 8 | Medium | 1 | 1 |
| F8 | 8 | 16 | Medium | 2 | 2 |
| F16 | 16 | 32 | Medium | 3 | 4 |
| F32 | 32 | 64 | Medium | 8 | 8 |
| F64 | 64 | 128 | Medium | 10 | 16 |
| (Trial Capacity) | 64 | 128 | Medium | 10 | 16 |
| F128 | 128 | 256 | Medium | 10 | 32 |
| F256 | 256 | 512 | Medium | 10 | 64 |
| F512 | 512 | 1024 | Medium | 10 | 128 |
| F1024 | 1024 | 2048 | Medium | 10 | 200 |
| F2048 | 2048 | 4096 | Medium | 10 | 200 |

## Related content

- Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
