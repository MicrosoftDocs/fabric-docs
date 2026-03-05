---
title: Create custom Apache Spark pools in Fabric
description: Learn about custom Apache Spark pools and how to configure them from your Fabric workspace settings.
ms.reviewer: saravi
ms.topic: how-to
ms.date: 03/05/2026
ai-usage: ai-assisted
---

# Create custom Spark pools in Microsoft Fabric

Use custom Spark pools to tailor compute for your workloads in Fabric. You can choose node size, configure autoscale behavior, and enable dynamic executor allocation.

Custom pools help you balance performance and cost by letting you set scaling limits that match workload demand.

If you already use starter pools, custom pools are a complementary option when you need more control over sizing and scaling behavior for specific workloads. Use starter pools for fast startup and default settings, and move to custom pools when you need workload-specific compute tuning. To learn more about starter pools, see [Configure starter pools in Fabric](configure-starter-pools.md).

## Prerequisites

To create a custom Spark pool:

- You need the **Admin** role in the workspace.
- A capacity admin must enable **Customized workspace pools** in **Spark Compute** settings for the capacity.

For more information, see [Configure and manage data engineering and data science settings for Fabric capacities](capacity-settings-management.md).

## Create custom Spark pools

To create or manage the Spark pool associated with your workspace:

1. Go to your workspace, and select **Workspace settings**.

   :::image type="content" source="media\configure-starter-pools\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu." lightbox="media\configure-starter-pools\data-engineering-menu.png":::

1. Select the **Data Engineering/Science** option to expand the menu, then select **Spark settings**.

   :::image type="content" source="media/workspace-admin-settings/spark-compute-detail-view.png" alt-text="Screenshot showing Spark Settings detail view." lightbox="media/workspace-admin-settings/spark-compute-detail-view.png" :::

1. Select **New Pool** from the **Default pool for workspace** dropdown to create a new custom Spark pool. You can create multiple custom pools and select any of them as the default pool for your workspace.

1. On the **Create new pool** page, enter a pool name. Select a **Node family** (such as **Memory optimized**) and **Node size** based on workload requirements. For more information about node sizes, see the [Node size options](#node-size-options) section below.

   > [!TIP]
   > Node size is determined by **Capacity Units (CU)**, which represent the compute capacity assigned to each node.

   :::image type="content" source="media\workspace-admin-settings\custom-pool-creation.png" alt-text="Screenshot showing custom pool creation options." lightbox="media/workspace-admin-settings/custom-pool-creation.png":::

1. In the edit view, configure **Autoscale** and **Dynamically allocate executors**.

   :::image type="content" source="media\workspace-admin-settings\custom-pool-auto-scale.png" alt-text="Screenshot showing custom pool creation options for autoscaling and dynamic allocation." lightbox="media/workspace-admin-settings/custom-pool-auto-scale.png":::

   Use the sliders to increase or decrease each setting based on your workload needs.

   - If **Autoscale** is enabled, the pool scales between the configured minimum and maximum node values based on activity.

   - If **Dynamically allocate executors** is enabled, Fabric adjusts executor allocation based on workload demand within the configured bounds.

1. Select **Create**.

Custom pools have a default autopause duration of 2 minutes after inactivity. When autopause is reached, the session expires and the cluster deallocates. Billing applies only while compute is actively used. Custom Spark pools in Microsoft Fabric currently support a maximum node limit of 200, so make sure your minimum and maximum autoscale values remain within this limit.

## Node size options

When you set up a custom Spark pool, you choose from the following node sizes:

| Node size | vCores | Memory (GB) | Description |
|--|--|--|--|
| Small | 4 | 32 | For lightweight development and testing jobs. |
| Medium | 8 | 64 | For general workloads and typical operations. |
| Large | 16 | 128 | For memory-intensive tasks or large data processing jobs. |
| X-Large | 32 | 256 | For the most demanding Spark workloads that need significant resources. |
| XX-Large | 64 | 512 | For the largest Spark workloads that require the highest compute and memory per node. |

## Related content

- Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
- Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
