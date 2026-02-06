---
title: Apache Spark compute for Data Engineering and Data Science
description: Learn about the starter pools, custom Apache Spark pools, and pool configurations for data Engineering and Science experiences in Fabric.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 07/03/2025
---
# What is Apache Spark compute in Microsoft Fabric?

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric Data Engineering and Data Science experiences operate on a fully managed Apache Spark compute platform. This platform is designed to deliver unparalleled speed and efficiency. With starter pools, you can expect rapid Apache Spark session initialization, typically within 5 to 10 seconds, with no need for manual setup. You also get the flexibility to customize Apache Spark pools according to your specific data engineering and data science requirements. The platform enables an optimized and tailored analytics experience. In short a starter pool is a quick way to use pre-configured Spark, while a Spark pool offers customization and flexibility.

:::image type="content" source="media/spark-compute/spark-compute-overview.png" alt-text="Image of a Spark compute platform with starter pools and custom Spark pools." lightbox="media/spark-compute/spark-compute-overview.png":::

## Starter pools

Starter pools are a fast and easy way to use Spark on the Microsoft Fabric platform within seconds. You can use Spark sessions right away, instead of waiting for Spark to set up the nodes for you, which helps you do more with data and get insights quicker.

:::image type="content" source="media/spark-compute/starter-pool-configuration.png" alt-text="Image of a table showing starter pool configuration." lightbox="media/spark-compute/starter-pool-configuration.png":::

Starter pools have Apache Spark clusters with sessions that are always on and ready for your requests. They use medium nodes that dynamically scale up based on your Spark job needs.

:::image type="content" source="media/spark-compute/starter-pool.png" alt-text="Diagram showing the high-level design of starter pools." lightbox="media/spark-compute/starter-pool.png":::

When you use a Starter Pool **without any extra library dependencies or custom Spark properties**, your session typically starts in **5 to 10 seconds**. This fast startup is possible because the cluster is already running and doesn't require  provisioning time.

> [!NOTE]
> Starter pools are only supported for Medium Node sizes, and selecting any other node sizes, or customizing compute configurations will result in on-demand session start experience which could take from 2 - 5 minutes

However, there are several scenarios where your session might take longer to start:

1. **You have custom libraries or Spark properties**  
   If you've configured libraries or custom settings in your environment, Spark has to personalize the session once it's created. This process can add around **30 seconds to 5 minutes** to your startup time, depending on the number and size of your library dependencies.

2. **Starter Pools in your region are fully used**  
   In rare cases, a region's Starter Pools might be temporarily exhausted due to high traffic. When that happens, Fabric spins up a **new cluster** to accommodate your request, which takes about **2 to 5 minutes**. Once the new cluster is available, your session starts. If you also have custom libraries to install, you need to add the additional **30 seconds to 5 minutes** required for personalization.

3. **Advanced networking or security features (Private Links or Managed VNets)**  
   When your workspace has networking features such as **Tenant Private Links** or **Managed VNets**, Starter Pools aren't supported. In this situation, Fabric must create a cluster on demand, which adds **2 to 5 minutes** to your session start time. If you also have library dependencies, that personalization step can again add another **30 seconds to 5 minutes**.

Here are a few example scenarios to illustrate potential start times:

| Scenario                                           | Typical Startup Time                                     |
|----------------------------------------------------|----------------------------------------------------------|
| **Default settings, no libraries**                 | 5 – 10 seconds                                           |
| **Default settings + library dependencies**        | 5 – 10 seconds + 30 seconds – 5 min (for library setup)           |
| **High traffic in region, no libraries**           | 2 – 5 minutes                                            |
| **High traffic + library dependencies**            | 2 – 5 minutes + 30 seconds – 5 min (for libraries)                |
| **Network security (Private Links/VNet), no libraries**  | 2 – 5 minutes                                            |
| **Network security + library dependencies**        | 2 – 5 minutes + 30 seconds – 5 min (for libraries)                |


When it comes to billing and capacity consumption, you're charged for the capacity consumption when you start executing your notebook or Apache Spark job definition. You aren't charged for the time the clusters are idle in the pool.

:::image type="content" source="media/spark-compute/starter-pool-billing-states-high-level.png" alt-text="Diagram showing the high-level stages in billing of starter pools." lightbox="media/spark-compute/starter-pool-billing-states-high-level.png":::

For example, if you submit a notebook job to a starter pool, you're billed only for the time period where the notebook session is active. The billed time doesn't include the idle time or the time taken to personalize the session with the Spark context. To learn more, see how to [configurestarter pools in Fabric](configure-starter-pools.md).

## Spark pools

A Spark pool is a way of telling Spark what kind of resources you need for your data analysis tasks. You can give your Spark pool a name, and choose how many and how large the nodes (the machines that do the work) are. You can also tell Spark how to adjust the number of nodes depending on how much work you have. Creating a Spark pool is free; you only pay when you run a Spark job on the pool, and then Spark sets up the nodes for you.

If you don't use your Spark pool for 2 minutes after your session expires, your Spark pool will be deallocated. This default session expiration time period is set to 20 minutes, and you can change it if you want. If you're a workspace admin, you can also create custom Spark pools for your workspace, and make them the default option for other users. This way, you can save time and avoid setting up a new Spark pool every time you run a notebook or a Spark job. Custom Spark pools take about three minutes to start, because Spark must get the nodes from Azure.

You can even create single node Spark pools, by setting the minimum number of nodes to one, so the driver and executor run in a single node that comes with restorable HA and is suited for small workloads.

The size and number of nodes you can have in your custom Spark pool depends on your Microsoft Fabric capacity. Capacity is a measure of how much computing power you can use in Azure. One way to think of it is that two Apache Spark VCores (a unit of computing power for Spark) equals one capacity unit.

> [!NOTE]
> In Apache Spark, users get two Apache Spark VCores for every capacity unit they reserve as part of their SKU.
> One Capacity Unit = Two Spark VCores
> So F64 => 128 Spark Vcores and on which a 3x Burst Multiplier is applied which gives a total of 384 Spark VCores

For example, a Fabric capacity SKU F64 has 64 capacity units, which is equivalent to 384 Spark VCores (64 * 2 * 3X Burst Multiplier). You can use these Spark VCores to create nodes of different sizes for your custom Spark pool, as long as the total number of Spark VCores doesn't exceed 384.

Spark pools are billed like starter pools; you don't pay for the custom Spark pools that you have created unless you have an active Spark session created for running a notebook or Spark job definition. You're only billed for the duration of your job runs. You aren't billed for stages like the cluster creation and deallocation after the job is complete.

:::image type="content" source="media/spark-compute/custom-pool-billing-states-high-level.png" alt-text="Diagram showing the high-level stages in billing of custom pools." lightbox="media/spark-compute/custom-pool-billing-states-high-level.png":::

For example, if you submit a notebook job to a custom Spark pool, you're only charged for the time period when the session is active. The billing for that notebook session stops once the Spark session has stopped or expired. You aren't charged for the time taken to acquire cluster instances from the cloud or for the time taken for initializing the Spark context.

Possible custom pool configurations for F64 based on the previous example. Smaller node sizes have capacity spread across more nodes, so the max number of nodes are higher. Whereas larger nodes are resource-rich, so fewer nodes are needed:

| Fabric capacity SKU | Capacity units | Max Spark VCores with Burst Factor | Node size | Max number of nodes |
|--|--|--|--|--|
| F64 | 64 | 384 | Small | 96 |
| F64 | 64 | 384 | Medium | 48 |
| F64 | 64 | 384 | Large | 24 |
| F64 | 64 | 384 | X-Large | 12 |
| F64 | 64 | 384 | XX-Large | 6 |

> [!NOTE]
> To create custom pools, you need **admin** permissions for the workspace. And the Microsoft Fabric capacity admin must grant permissions to allow workspace admins to size their custom Spark pools. To learn more, see [Get started with custom Spark pools in Fabric.](create-custom-spark-pools.md)

## Nodes

An Apache Spark pool instance consists of one head node and worker nodes, could start a minimum of one node in a Spark instance. The head node runs extra management services such as Livy, Yarn Resource Manager, Zookeeper, and the Apache Spark driver. All nodes run services such as Node Agent and Yarn Node Manager. All worker nodes run the Apache Spark Executor service.

> [!NOTE]
> In Fabric, the ratio of nodes to executors is always 1:1. When you set up a pool, one node is dedicated to the driver, and the remaining nodes are used for the executors. The only exception is in a single-node configuration, where the resources for both the driver and the executor are halved.

## Node sizes

A Spark pool can be defined with node sizes that range from a small compute node (with 4 vCore and 32 GB of memory) to a double extra large compute node (with 64 vCore and 512 GB of memory per node). Node sizes can be altered after pool creation, although the active session would have to be restarted.

| Size | vCore | Memory |
|--|--|--|
| Small | 4 | 32 GB |
| Medium | 8 | 64 GB |
| Large | 16 | 128 GB |
| X-Large | 32 | 256 GB |
| XX-Large | 64 | 512 GB |


> [!NOTE]
>  Node sizes X-Large and XX-Large are only allowed for non-trial Fabric SKUs. 

## Autoscale

Autoscale for Apache Spark pools allows automatic scale up and down of compute resources based on the amount of activity. When you enable the autoscale feature, you set the minimum and maximum number of nodes to scale. When you disable the autoscale feature, the number of nodes set remains fixed. You can alter this setting after pool creation, although you might need to restart the instance.

> [!NOTE]
>  By default, spark.yarn.executor.decommission.enabled is set to true, enabling the automatic shutdown of underutilized nodes to optimize compute efficiency. If less aggressive scaling down is preferred, this configuration can be set to false

## Dynamic allocation

Dynamic allocation allows the Apache Spark application to request more executors if the tasks exceed the load that current executors can bear. It also releases the executors when the jobs are completed, and if the Spark application is moving to idle state. Enterprise users often find it hard to tune the executor configurations because they're vastly different across different stages of a Spark job execution process. These configurations are also dependent on the volume of data processed, which changes from time to time. You can enable dynamic allocation of executors option as part of the pool configuration, which enables automatic allocation of executors to the Spark application based on the nodes available in the Spark pool.

When you enable the dynamic allocation option for every Spark application submitted, the system reserves executors during the job submission step based on the minimum nodes. You specify maximum nodes to support successful automatic scale scenarios.

## Related content

* [Get Started with Data Engineering/Science Admin Settings for your Fabric Capacity](capacity-settings-overview.md)
* [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
