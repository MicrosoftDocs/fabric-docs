---
title: Create custom spark pools in Fabric
description: Learn about the custom spark pools, and how to configure them from Fabric workspace settings.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: how-to
ms.date: 02/24/2023
---
# How to create custom Spark pools in Microsoft Fabric

In this document, we'll explain how to create custom Apache Spark pools in Microsoft Fabric for your analytics workloads. Apache Spark pools enable users to create tailored compute environments based on their specific requirements, ensuring optimal performance and resource utilization.

[!INCLUDE [preview-note](../includes/preview-note.md)]

Users specify the minimum and maximum nodes for autoscaling. Based on which, the system dynamically acquires and retires nodes as the job's compute requirements change. It results in efficient scaling and improved performance. Furthermore, the dynamic allocation of executors in Spark pools alleviates the need for manual executor configuration. Instead, the system adjusts the number of executors depending on the data volume and job-level compute needs. This way, it enables you to focus on your workloads without worrying about performance optimization and resource management.

> [!NOTE]
> To create a custom spark pool, you must have admin access to the workspace. The capacity admin should have enabled the **Customized workspace pools** option in the **Spark Compute** section of **Capacity Admin settings**. To learn more, see [Spark Compute Settings for Fabric Capacities](capacity-settings-management.md).

## Create custom Spark pools

To create or manage the Spark Pool associated with your workspace:

1. Go to your workspace and choose the **Workspace settings**:

   :::image type="content" source="media\workspace-admin-settings\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu.":::

1. Then, select the **Data Engineering/Science** option to expand the menu. Navigate to the **Spark Compute** option from the left-hand menu:

   :::image type="content" source="media/workspace-admin-settings/spark-compute-detail-view.png" alt-text="Screenshot showing Spark Settings detail view." lightbox="media/workspace-admin-settings/spark-compute-detail-view.png" :::

1. Select the **New Pool** option. From the **Create Pool** menu, name your Spark pool. Select the **Node family**, and **Node size** from the available sizes Small, Medium, Large, X-Large and XX-Large based on compute requirements for your workloads.

   :::image type="content" source="media\workspace-admin-settings\custom-pool-creation.png" alt-text="Screenshot showing custom pool creation options.":::

1. You can also set the minimum node configuration for your custom pools to 1. Because the Fabric Spark provides restorable availability for clusters with single node, you do not have to worry about job failures, loss of session during failures, or over paying on compute for smaller spark jobs.

1. You can also enable or disable autoscaling for your custom Spark pools. When autoscaling is enabled, the pool will dynamically acquire new nodes up to the maximum node limit specified by the user, and then retire them after job execution. This feature ensures better performance by adjusting resources based on the job requirements. You are allowed to size the nodes, which fit within the capacity units purchased as part of the Fabric capacity SKU.

   :::image type="content" source="media\workspace-admin-settings\custom-pool-auto-scale.png" alt-text="Screenshot showing custom pool creation options for autoscaling and dynamic allocation.":::

1. You can also choose to enable dynamic executor allocation for your Spark pool, which automatically determines the optimal number of executors within the user-specified maximum bound. This feature adjusts the number of executors based on data volume, resulting in improved performance and resource utilization.

1. These custom pools have a default auto-pause duration of 2 minutes. Once the auto-pause duration is reached, the session expires and the clusters are unallocated. You are charged based on the number of nodes and the duration for which the custom spark pools are used.

## Next steps

* Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
* [Get Started with Data Engineering/Science Admin Settings for your Fabric Workspace](workspace-admin-settings.md)
