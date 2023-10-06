---
title: Configure and Manage Starter Pools in Fabric Spark
description: Learn about the customizing Starter Pools from Fabric workspace settings.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: how-to
ms.custom: build-2023
ms.date: 10/05/2023
---
# Configuring Starter Pools in Microsoft Fabric

In this document, we explain how to customize Starter pools in Microsoft Fabric for your analytics workloads. Starter pools are a fast and easy way to use Spark on the Microsoft Fabric platform within seconds. You can use Spark sessions right away, instead of waiting for Spark to set up the nodes for you, which helps you do more with data and get insights quicker.
Starter pools have Spark clusters that are always on and ready for your requests. They use medium sized nodes and can be scaled up based on your workload requirements.

[!INCLUDE [preview-note](../includes/preview-note.md)]

Users can specify the maximum nodes for autoscaling based on the Data Engineering or Data Science workload requirements. Based on the max nodes configured, the system dynamically acquires and retires nodes as the job's compute requirements change, which results in efficient scaling and improved performance. 
Furthermore, users could set the max limit for executors in Starter pools and with Dynamic Allocation enabled, the system adjusts the number of executors depending on the data volume and job-level compute needs. This process enables you to focus on your workloads without worrying about performance optimization and resource management.

> [!NOTE]
> To customize a Starter pool, you need admin access to the workspace.

## Configuring the Starter Pools

To manage the Starter Pool associated with your workspace:

1. Go to your workspace and choose the **Workspace settings**:

   :::image type="content" source="media\workspace-admin-settings\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu.":::

2. Then, select the **Data Engineering/Science** option to expand the menu. Navigate to the **Spark Compute** option from the left-hand menu:

   :::image type="content" source="media/workspace-admin-settings/spark-compute-detail-view.png" alt-text="Screenshot showing Spark Settings detail view." lightbox="media/workspace-admin-settings/spark-compute-detail-view.png" :::

3. Select the **Starter Pool** option.
   
   :::image type="content" source="media\workspace-admin-settings\starter-pool-settings.png" alt-text="Screenshot showing starter pool configuration options.":::

4. You can set the maximum node configuration for your starter pools to an allowed number based on the purchased capacity or reduce the default max node configuration to a smaller value when running smaller workloads.

   :::image type="content" source="media\workspace-admin-settings\starter-pool-max-node.png" alt-text="Screenshot showing starter pool max node and max executor options for autoscaling and dynamic allocation.":::

The following section lists various default configurations and the max node limits supported for Starter pools based on Microsoft Fabric capacity SKUs:

| SKU Name           | Capacity Units | Spark VCores | Node Size | Default Max Nodes | Max Number of Nodes |
|--------------------|----------------|--------------|-----------|--------------------------------|----------------------|
| F2                 | 2              | 4            | Medium    | 1                              | 1                    |
| F4                 | 4              | 8            | Medium    | 1                              | 1                    |
| F8                 | 8              | 16           | Medium    | 2                              | 2                    |
| F16                | 16             | 32           | Medium    | 3                              | 4                    |
| F32                | 32             | 64           | Medium    | 8                              | 8                    |
| F64                | 64             | 128          | Medium    | 10                             | 16                   |
| (Trial Capacity)   | 64             | 128          | Medium    | 10                             | 16                   |
| F128               | 128            | 256          | Medium    | 10                             | 32                   |
| F256               | 256            | 512          | Medium    | 10                             | 64                   |
| F512               | 512            | 1024         | Medium    | 10                             | 128                  |
| F1024              | 1024           | 2048         | Medium    | 10                             | 200                  |
| F2048              | 2048           | 4096         | Medium    | 10                             | 200                  |


## Next steps

* Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
* Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
