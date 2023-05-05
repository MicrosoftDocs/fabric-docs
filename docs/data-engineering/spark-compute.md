---
title: Spark Compute for Data Engineering and Science in Fabric
description: Learn about the starter pools, custom spark pools, and pool configurations for data engineering and science workloads in Fabric
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 02/24/2023
---
# What is spark compute in Microsoft Fabric?

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-and-ds.md)]

Microsoft Fabric Data Engineering and Data Science workloads operates on a fully managed Spark compute platform. This platform is designed to deliver unparalleled speed and efficiency. With starter pools, you can expect rapid spark session initialization, typically within 5 to 10 seconds. It eliminates the need for manual setup. Furthermore, you also get the flexibility to customize Spark pools according to the specific data engineering and data science requirements. It enables an optimized and tailored analytics experience.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Starter pools

Starter pools are an advanced feature of the Microsoft Fabric platform, it enables users to quickly access Spark sessions within 10-15 seconds. It streamlines your engagement with tasks and promoting increased productivity and expedited time-to-insight. These pools are a key component of Microsoft Fabric Data Engineering and Data Science workloads.

:::image type="content" source="media\spark-compute\starter-pool-configuration.png" alt-text="Image showing starter pool configuration":::

The clusters within starter pools come equipped with an idle Spark session that is ready to be allocated to user-submitted requests. Starter pools are outfitted with medium nodes and incorporate autoscale and dynamic allocation functionalities, allowing the live clusters to seamlessly adapt to Spark job requirements.

:::image type="content" source="media\spark-compute\starter-pool-high-level.png" alt-text="Image showing high-level design of starter pools.":::

Starter pools are pre-configured with default settings and they support inline library installations without impacting the rapid 5 second to 10-second session start experience. However, the extra custom Spark properties or libraries through workspace or capacity settings may result in a 2 minute to 3-minute session start latency for on-demand cluster acquisition. In terms of billing, you are only charged for capacities when Spark sessions are active and executing queries. There are no charges incurred during prewarming periods.

## Spark pools

A Spark pool is a collection of metadata that outlines the compute resource requirements and associated behavior attributes for a Spark instance. These attributes encompass elements such as the name, number of nodes, node size, and scaling behavior. It's important to note that creating a Spark pool doesn't consume any resources or incur costs. Charges only arise when a Spark job is executed on the designated Spark pool, which, causes the Spark instance to be instantiated as needed.

Additionally, the "time to live" property for all custom pool sessions is has a default duration of 2 minutes following the session's conclusion. Workspace admins can create custom spark pools (if they authorized by the capacity admins) and select these pools as the default compute option for a workspace. Once selected as users submit notebook or spark job definitions, the spark sessions are created on-demand and take ~3 minutes. Because it involves acquiring the VM from Azure based on the compute specifications specified by the users unlike the prewarmed starter pools.

Admins can create these custom spark pools and size them based on the cores that's available in their Microsoft Fabric capacity. Each Microsoft Fabric capacity SKU offers a set of capacity units and these capacity units are converted to spark VCores. One Spark VCore = Capacity Units * 2.

For example if you're using a Fabric capacity SKU F64 that offers 64 Compute Units it translates to 128 spark VCores. You would be able to size your custom pool with node sizes and number of nodes not exceeding 128 Spark VCores.

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
