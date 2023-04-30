---
title: Spark Compute for Data Engineering/ Science in Fabric
description: Learn about the starter pools, custom spark pools and pool configurations for data engineering/science workloads in fabric
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 02/24/2023
---
# Spark Compute for Data Engineering/Science in Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] Data Engineering and Data Science workloads operates on a fully managed Spark compute platform, designed to deliver unparalleled speed and efficiency. With Starter pools, users can expect rapid spark session initialization, typically within 5 to 10 seconds, eliminating the need for manual setup. Furthermore, users also get the flexibility to customize Spark pools according to their specific data engineering and data science requirements, enabling an optimized and tailored analytics experience.

## Starter Pools

Starter pools, an advanced feature of the [!INCLUDE [product-name](../includes/product-name.md)] platform, enable users to quickly access Spark sessions within 10-15 seconds, streamlining their engagement with tasks and promoting increased productivity as well as expedited time-to-insight. These pools are a key component of [!INCLUDE [product-name](../includes/product-name.md)] Data Engineering and Data Science workloads.

:::image type="content" source="media\spark-compute\starter-pool-configuration.png" alt-text="Image showing starter pool configuration" lightbox="media\spark-compute\starter-pool-configuration.png":::

Managed and prewarmed, the clusters within starter pools come equipped with an idle Spark session, ready to be allocated to user-submitted requests from a [!INCLUDE [product-name](../includes/product-name.md)] workspace. Starter pools are outfitted with Medium nodes and incorporate Auto-scale and Dynamic allocation functionalities, allowing the live clusters to seamlessly adapt to Spark job requirements.

:::image type="content" source="media\spark-compute\starter-pool-high-level.png" alt-text="Image showing high level design of starter pools." lightbox="media\spark-compute\starter-pool-high-level.png":::

Pre-configured with default settings, starter pools support inline library installations after securing the live session without impacting the rapid 5 to 10-second session start experience. However, the adding custom Spark properties or libraries through workspace or capacity settings may result in a 2 to 3-minute session start latency for on-demand cluster acquisition. In terms of billing, users are only charged for capacities when Spark sessions are active and executing queries, while no charges are incurred during prewarming periods.

## Spark Pools

A Spark pool is a collection of metadata that outlines the compute resource requirements and associated behavior attributes for a Spark instance upon creation. These attributes encompass elements such as the name, number of nodes, node size, and scaling behavior. It is important to note that creating a Spark pool does not consume any resources or incur costs. Charges only arise when a Spark job is executed on the designated Spark pool, causing the Spark instance to be instantiated as needed. Additionally, the "time to live" property for all custom pool sessions is set to a default duration of 2 minutes following the session's conclusion. Workspace admins can create custom spark pools (if they authorized by [!INCLUDE [product-name](../includes/product-name.md)] capacity admins)and select these pools as the default compute option for a [!INCLUDE [product-name](../includes/product-name.md)] workspace. Once selected as users submit notebook or spark job defintion jobs, the spark sessions are created in an on-demand manner and take ~3 minutes (as it involves acquiring the VM from Azure based on the compute specifications specified by the users) unlike the prewarmed starter pools.
Admins can create these custom spark pools and size them based on the cores thats available in their [!INCLUDE [product-name](../includes/product-name.md)] capacity. Each [!INCLUDE [product-name](../includes/product-name.md)] capacity SKU offers a set of capacity units and these capacity units are converted to spark VCores (1 Spark VCore = Capacity Unis * 2).

For example if you are using a Fabric capacity SKU F64, that offers 64 Compute Units (which traslate to 128 spark VCores), you would be able to size your custom pool with node sizes and number of nodes not exceeding 128 Spark VCores. 

Possible custom pool configurations for F64 based on the above example 

|Fabric Capacity SKU| Capacity Units|Spark VCores|Node Size|Max Number of Nodes|
|:-----:|:-----:|:------:|:-----:|:-----:|
|F64 |64|128|Small|32|
|F64 |64|128|Medium|16|
|F64 |64|128|Large|8|
|F64 |64|128|X-Large|4|
|F64 |64|128|XX-Large|2|

> [!NOTE]
> To create custom pools, the user should have the **admin** permissions for the workspace and the [!INCLUDE [product-name](../includes/product-name.md)] capacity admin should have granted permissions to allow workspace admins to size their custom spark pools.
> You can learn how to create a custom Spark pool here [Get Started with Custom Spark Pools in Fabric](create-custom-spark-pools.md)

## Nodes

Apache Spark pool instance consists of one head node and two or more worker nodes with a minimum of three nodes in a Spark instance. The head node runs extra management services such as Livy, Yarn Resource Manager, Zookeeper, and the Spark driver. All nodes run services such as Node Agent and Yarn Node Manager. All worker nodes run the Spark Executor service.

## Node Sizes

A Spark pool can be defined with node sizes that range from a Small compute node with 4 vCore and 32 GB of memory up to a XXLarge compute node with 64 vCore and 512 GB of memory per node. Node sizes can be altered after pool creation although the active session would have to be restarted. 

|Size| vCore|Memory|
|:-----:|:-----:|:------:|
|Small |4|32 GB|
|Medium |8|64 GB|
|Large |16|128 GB|
|XLarge |32|256 GB|
|XXLarge |64|512 GB|

## Autoscale

Autoscale for Apache Spark pools allows automatic scale up and down of compute resources based on the amount of activity. When the autoscale feature is enabled, you set the minimum, and maximum number of nodes to scale. When the autoscale feature is disabled, the number of nodes set will remain fixed. This setting can be altered after pool creation although the instance may need to be restarted.

## Dynamic Allocation 

Dynamic allocation allows the spark application to request more number of executors if the tasks exceed the load that current executors can bear. It also releases the executors when the jobs are completed and if the spark application is moving to idle state. Enterprise users often find it hard to tune the executor configurations as they're vastly different across different stages of a Spark Job Execution process, which are also dependent on the volume of data processed which changes from time to time. Users can enable Dynamic Allocation of Executors option as part of the pool configuration, which would enable automatic allocation of executors to the spark application based on the nodes available in the Spark Pool.
When Dynamic Allocation option is enabled, for every spark application submitted, the system reserves executors during the job submission step based on the Max Nodes, which were specified by the user to support successful auto scale scenarios.

## Next steps

>[!div class="nextstepaction"]
>[Get Started with Data Engineering/Science Admin Settings for your Fabric Capacity](data-engineering-and-data-science-capacity-settings-overview.md)
>[Get Started with Data Engineering/Science Admin Settings for your Fabric Workspace](spark-workspace-admin-settings.md)
