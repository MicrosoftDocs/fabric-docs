---
title: Create custom Apache Spark pools in Fabric
description: Learn about custom Apache Spark pools and how to configure them from your Fabric workspace settings.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 09/22/2025
---

# How to create custom Spark pools in Microsoft Fabric

This article shows you how to create custom Apache Spark pools in Microsoft Fabric for your analytics workloads. Apache Spark pools let you create tailored compute environments based on your requirements, so you get optimal performance and resource use.

Specify the minimum and maximum nodes for autoscaling. The system gets and retires nodes as your job's compute needs change, so scaling is efficient and performance improves. Spark pools adjust the number of executors automatically, so you don't need to set them manually. The system changes executor counts based on data volume and job compute needs, so you can focus on your workloads instead of performance tuning and resource management.

> [!TIP]
> When you configure Spark pools, node size is determined by **Capacity Units (CU)**, which represent the compute capacity assigned to each node. For more information about node sizes and CU, see [Node size options](#node-size-options) section in this guide.

## Prerequisites

To create a custom Spark pool, make sure you have admin access to the workspace. The capacity admin enables the **Customized workspace pools** option in the **Spark Compute** section of **Capacity Admin settings**. For more information, see [Spark Compute Settings for Fabric Capacities](capacity-settings-management.md).

## Create custom Spark pools

To create or manage the Spark pool associated with your workspace:

1. Go to your workspace and select **Workspace settings**.

1. Select the **Data Engineering/Science** option to expand the menu, then select **Spark settings**.

   :::image type="content" source="media/workspace-admin-settings/spark-compute-detail-view.png" alt-text="Screenshot showing Spark Settings detail view." lightbox="media/workspace-admin-settings/spark-compute-detail-view.png" :::

1. Select the **New Pool** option. In the **Create Pool** screen, name your Spark pool. Also choose the **Node family**, and select a **Node size** from the available sizes (**Small**, **Medium**, **Large**, **X-Large**, and **XX-Large**) based on compute requirements for your workloads.

   :::image type="content" source="media\workspace-admin-settings\custom-pool-creation.png" alt-text="Screenshot showing custom pool creation options.":::

1. You can set the minimum node configuration for your custom pools to **1**. Because Fabric Spark provides restorable availability for clusters with a single node, you don't have to worry about job failures, loss of session during failures, or over paying on compute for smaller Spark jobs.

1. You can enable or disable autoscaling for your custom Spark pools. When autoscaling is enabled, the pool will dynamically acquire new nodes up to the maximum node limit specified by the user, and then retire them after job execution. This feature ensures better performance by adjusting resources based on the job requirements. You're allowed to size the nodes, which fit within the capacity units purchased as part of the Fabric capacity SKU.

   :::image type="content" source="media\workspace-admin-settings\custom-pool-auto-scale.png" alt-text="Screenshot showing custom pool creation options for autoscaling and dynamic allocation.":::

1. You can adjust the number of executors using a slider. Each executor is a Spark process that runs tasks and holds data in memory. Increasing executors can improve parallelism, but it also increases the size and startup time of the cluster. You can also choose to enable dynamic executor allocation for your Spark pool, which automatically determines the optimal number of executors within the user-specified maximum bound. This feature adjusts the number of executors based on data volume, resulting in improved performance and resource utilization.

These custom pools have a default autopause duration of 2 minutes. Once the autopause duration is reached, the session expires and the clusters are unallocated. You're charged based on the number of nodes and the duration for which the custom Spark pools are used.

## Node size options

When you set up a custom Spark pool, you choose from the following node sizes:

| Node size | Capacity Units (CU) | Memory (GB) | Description |
|--|--|--|--|
| Small | 4 | 32 | For lightweight development and testing jobs. |
| Medium | 8 | 64 | For general workloads and typical operations. |
| Large | 16 | 128 | For memory-intensive tasks or large data processing jobs. |
| X-Large | 32 | 256 | For the most demanding Spark workloads that need significant resources. |

> [!NOTE] 
> A capacity unit (CU) in Microsoft Fabric Spark pools represents the compute capacity assigned to each node, not the actual consumption. Capacity units differ from VCore (Virtual Core), which is used in SQL-based Azure resources. CU is the standard term for Spark pools in Fabric, while VCore is more common for SQL pools. When sizing nodes, use CU to determine the assigned capacity for your Spark workloads.

## Related content

* Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
* Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
