---
title: Spark Compute for Data Engineering and Science in Fabric
description: Learn about the starter pools, custom spark pools, and pool configurations for data engineering and science experiences in Fabric
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.custom: build-2023
ms.date: 02/24/2023
---
# What is Spark compute in Microsoft Fabric?

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Microsoft Fabric Data Engineering and Data Science experiences operate on a fully managed Spark compute platform. This platform is designed to deliver unparalleled speed and efficiency. With starter pools, you can expect rapid spark session initialization, typically within 5 to 10 seconds. It eliminates the need for manual setup. Furthermore, you also get the flexibility to customize Spark pools according to the specific data engineering and data science requirements. It enables an optimized and tailored analytics experience.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Starter pools

Starter pools are a fast and easy way to use Spark on the Microsoft Fabric platform within seconds. You can use Spark sessions right away, instead of waiting for Spark to set up the nodes for you. This helps you do more with data and get insights quicker.

:::image type="content" source="media\spark-compute\starter-pool-configuration.png" alt-text="Image showing starter pool configuration":::

Starter pools have Spark clusters that are always on and ready for your requests. They use medium nodes that will dynamically scale-up based on your Spark job needs.  

:::image type="content" source="media\spark-compute\starter-pool-high-level.png" alt-text="Image showing high-level design of starter pools.":::

Starter pools also have default settings that let you install libraries quickly without slowing down the session start time. However, if you want to use extra custom Spark properties or libraries from your workspace or capacity settings, it may take longer for Spark to get the nodes for you. You only pay for starter pools when you are using Spark sessions to run queries. You don't pay for the time when Spark is keeping the nodes ready for you.

## Spark pools

A Spark pool is a way of telling Spark what kind of resources you need for your data analysis tasks. You can give your Spark pool a name, and choose how many and how big the nodes (the machines that do the work) are. You can also tell Spark how to adjust the number of nodes depending on how much work you have. Creating a Spark pool is free; you only pay when you run a Spark job on the pool, and then Spark will set up the nodes for you.

If you don't use your Spark pool for 2 minutes after your job is done, Spark will automatically delete it. This is called the "time to live" property, and you can change it if you want. If you are a workspace admin, you can also create custom Spark pools for your workspace, and make them the default option for other users. This way, you can save time and avoid setting up a new Spark pool every time you run a notebook or a Spark job. Custom Spark pools take about 3 minutes to start, because Spark has to get the nodes from Azure.

The size and number of nodes you can have in your custom Spark pool depends on how much capacity you have in your Microsoft Fabric capacity. This is a measure of how much computing power you can use in Azure. One way to think of it is that two Spark VCores (a unit of computing power for Spark) equals one capacity unit. For example, if you have a Fabric capacity SKU F64, that means you have 64 capacity units, which is equivalent to 128 Spark VCores. You can use these Spark VCores to create nodes of different sizes for your custom Spark pool, as long as the total number of Spark VCores does not exceed 128.

Possible custom pool configurations for F64 based on the above example

|Fabric Capacity SKU| Capacity Units|Spark VCores|Node Size|Max Number of Nodes|
|:-----:|:-----:|:------:|:-----:|:-----:|
|F64 |64|128|Small|32|
|F64 |64|128|Medium|16|
|F64 |64|128|Large|8|
|F64 |64|128|X-Large|4|
|F64 |64|128|XX-Large|2|

> [!NOTE]
> To create custom pools, you should have the **admin** permissions for the workspace. And the Microsoft Fabric capacity admin should have granted permissions to allow workspace admins to size their custom spark pools. To learn more, see [Get Started with Custom Spark Pools in Fabric](create-custom-spark-pools.md)

## Nodes

Apache Spark pool instance consists of one head node and two or more worker nodes with a minimum of three nodes in a Spark instance. The head node runs extra management services such as Livy, Yarn Resource Manager, Zookeeper, and the Spark driver. All nodes run services such as Node Agent and Yarn Node Manager. All worker nodes run the Spark Executor service.

## Node sizes

A Spark pool can be defined with node sizes that range from a small compute node with 4 vCore and 32 GB of memory to a large compute node with 64 vCore and 512 GB of memory per node. Node sizes can be altered after pool creation although the active session would have to be restarted.

|Size| vCore|Memory|
|:-----:|:-----:|:------:|
|Small |4|32 GB|
|Medium |8|64 GB|
|Large |16|128 GB|
|X-Large |32|256 GB|
|XX-Large |64|512 GB|

## Autoscale

Autoscale for Apache Spark pools allows automatic scale up and down of compute resources based on the amount of activity. When the autoscale feature is enabled, you set the minimum, and maximum number of nodes to scale. When the autoscale feature is disabled, the number of nodes set remains fixed. This setting can be altered after pool creation although the instance may need to be restarted.

## Dynamic allocation

Dynamic allocation allows the spark application to request more executors if the tasks exceed the load that current executors can bear. It also releases the executors when the jobs are completed and if the spark application is moving to idle state. Enterprise users often find it hard to tune the executor configurations. Because they're vastly different across different stages of a Spark Job execution process. These are also dependent on the volume of data processed which changes from time to time. Users can enable dynamic allocation of executors option as part of the pool configuration, which would enable automatic allocation of executors to the spark application based on the nodes available in the Spark pool.

When dynamic allocation option is enabled, for every spark application submitted. The system reserves executors during the job submission step based on the maximum nodes, which were specified by the user to support successful auto scale scenarios.

## Next steps

* [Get Started with Data Engineering/Science Admin Settings for your Fabric Capacity](capacity-settings-overview.md)
* [Get Started with Data Engineering/Science Admin Settings for your Fabric Workspace](workspace-admin-settings.md)
