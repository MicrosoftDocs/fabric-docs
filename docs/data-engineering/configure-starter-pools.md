---
title: Configure and manage starter pools in Fabric Spark.
description: Learn how to customize starter pools from your Fabric workspace settings.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/20/2023
---
# Configuring starter pools in Microsoft Fabric

In this article, we explain how to customize starter pools in Microsoft Fabric for your analytics workloads. Starter pools are a fast and easy way to use Spark on the Microsoft Fabric platform within seconds. You can use Spark sessions right away, instead of waiting for Spark to set up the nodes for you, which helps you do more with data and get insights quicker.

Starter pools have Spark clusters that are always on and ready for your requests. They use medium-sized nodes and can be scaled up based on your workload requirements.

You can specify the maximum nodes for autoscaling based on the data engineering or data science workload requirements. Based on the max nodes you configure, the system dynamically acquires and retires nodes as the job's compute requirements change, which results in efficient scaling and improved performance.

You can also set the maximum limit for executors in starter pools and with Dynamic Allocation enabled, the system adjusts the number of executors depending on the data volume and job-level compute needs. This process enables you to focus on your workloads without worrying about performance optimization and resource management.

> [!NOTE]
> To customize a starter pool, you need admin access to the workspace.

## Configure starter pools

To manage the starter pool associated with your workspace:

1. Go to your workspace and choose the **Workspace settings**.

   :::image type="content" source="media\configure-starter-pools\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu." lightbox="media\configure-starter-pools\data-engineering-menu.png":::

1. Then, select the **Data Engineering/Science** option to expand the menu.

   :::image type="content" source="media/configure-starter-pools/spark-compute-detail-view.png" alt-text="Screenshot showing Spark Settings detail view.":::

1. Select the **StarterPool** option.

   :::image type="content" source="media\configure-starter-pools\starter-pool-settings.png" alt-text="Screenshot showing starter pool configuration options.":::

1. You can set the maximum node configuration for your starter pools to an allowed number based on the purchased capacity or reduce the default max node configuration to a smaller value when running smaller workloads.

   :::image type="content" source="media\configure-starter-pools\starter-pool-max-node.png" alt-text="Screenshot showing starter pool max node and max executor options for autoscaling and dynamic allocation.":::

The following section lists various default configurations and the max node limits supported for starter pools based on Microsoft Fabric capacity SKUs:

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

> [!NOTE]
> To customize a starter pool, you need admin access to the workspace.

## Known Issues 

### Slower Session Start Times in Starter Pools with Single Node Configuration

#### Issue Description:
Starter Pools in Microsoft Fabric, primarily utilized for data engineering and science workloads, default to Medium node sizing (8 Spark Cores). Currently, an identified issue arises when the maximum node configuration is limited to a single node. In such cases, the system attempts to accommodate both the driver and executor within this single node Starter Pool, leading to a noticeable delay in session startup times.

#### Impact:
Users may experience a session start delay ranging from 2-3 minutes.

#### Status:
Our team is actively working on resolving this issue. We anticipate a solution to be implemented shortly, which will improve session start times to ~5 seconds in single node Starter Pool configurations.

## Related content

* Learn more from the Apache Spark [public documentation](https://spark.apache.org/docs/latest/configuration.html).
* Get started with [Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md).
