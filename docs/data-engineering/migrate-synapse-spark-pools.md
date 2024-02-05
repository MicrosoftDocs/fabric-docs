---
title: Migrate Spark pools
description: Learn about how to migrate Spark pools from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: how-to
ms.custom:
  - fabric-cat
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Migrate Spark pools from Azure Synapse to Fabric

While Azure Synapse provides Spark pools, Fabric offers [Starter pools](configure-starter-pools.md) and [Custom pools](create-custom-spark-pools.md). The Starter pool can be a good choice if you have a single pool with no custom configurations or libraries in Azure Synapse, and if the [Medium node size](spark-compute.md) meets your requirements. However, if you seek more flexibility with your Spark pool configurations, we recommended using *Custom pools*. There are two options here: 

* Option 1: Move your Spark pool to a workspace's default pool.
* Option 2: Move your Spark pool to a custom environment in Fabric. 

If you have more than one Spark pool and you plan to move those to the same Fabric workspace, we recommended using Option 2, creating multiple custom environments and pools.

For Spark pool considerations, refer to [differences between Azure Synapse Spark and Fabric](comparison-between-fabric-and-azure-synapse-spark.md).

## Prerequisites

If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.

## Option 1: From Spark pool to workspace's default pool

You can create a custom Spark pool from your Fabric workspace and use it as the default pool in the workspace. The default pool is used by all notebooks and Spark job definitions in the same workspace. 

To move from an existing Spark pool from Azure Synapse to a workspace default pool:

1. **Access Azure Synapse workspace**: Sign-in into [Azure](https://portal.azure.com). Navigate to your Azure Synapse workspace, go to **Analytics Pools** and select **Apache Spark pools**.
1.	**Locate the Spark pool**: From **Apache Spark pools**, locate the Spark pool you want to move to Fabric and check the pool **Properties**. 
1.	**Get properties**: Get the Spark pool properties such as Apache Spark version, node size family, node size or autoscale. Refer to [Spark pool considerations](comparison-between-fabric-and-azure-synapse-spark.md) to see any differences.
1.	**Create a custom Spark pool in Fabric**:
    * Go to your [Fabric](https://app.fabric.microsoft.com) workspace and select **Workspace settings**.
    * Go to **Data Engineering/Science** and select **Spark settings**.
    * From the **Pool** tab and in **Default pool for workspace** section, expand the dropdown menu and select create **New pool**.
    * [Create your custom pool](create-custom-spark-pools.md) with the corresponding target values. Fill the name, node family, node size, autoscaling and dynamic executor allocation options.
5.	**Select a runtime version**:
    * Go to **Environment** tab, and select the required **Runtime Version**. See available runtimes [here](runtime.md).
    * Disable the **Set default environment** option.

:::image type="content" source="media\migrate-synapse\migrate-spark-pool-default-environment.png" alt-text="Screenshot showing default pool.":::

> [!NOTE]
> In this option, pool level libraries or configurations are not supported. However, you can adjust compute configuration for individual items such as notebooks and Spark job definitions, and add inline libraries. If you need to add custom libraries and configurations to an environment, consider a custom [environment](create-and-use-environment.md).

## Option 2: From Spark pool to custom environment

With custom environments, you can set up custom Spark properties and libraries. To create a custom environment:

1. **Access Azure Synapse workspace**: Sign-in into [Azure](https://portal.azure.com). Navigate to your Azure Synapse workspace, go to **Analytics Pools** and select **Apache Spark pools**.
1.	**Locate the Spark pool**: From **Apache Spark pools**, locate the Spark pool you want to move to Fabric and check the pool **Properties**. 
1.	**Get properties**: Get the Spark pool properties such as Apache Spark version, node size family, node size or autoscale. Refer to [Spark pool considerations](comparison-between-fabric-and-azure-synapse-spark.md) to see any differences.
1.	**Create a custom Spark pool**:
    * Go to your [Fabric](https://app.fabric.microsoft.com) workspace and select **Workspace settings**.
    * Go to **Data Engineering/Science** and select **Spark settings**.
    * From the **Pool** tab and in **Default pool for workspace** section, expand the dropdown menu and select create **New pool**.
    * [Create your custom pool](create-custom-spark-pools.md) with the corresponding target values. Fill the name, node family, node size, autoscaling and dynamic executor allocation options.
1.	**[Create an Environment](create-and-use-environment.md)** item if you don’t have one.
1.	**Configure Spark compute**:
    * Within the **Environment**, go to **Spark Compute** > **Compute**.
    * Select the newly created pool for the new environment.
    * You can configure driver and executors cores and memory. 
1.  **Select a runtime version** for the environment. See available runtimes [here](runtime.md).
1.	Click on **Save** and **Publish** changes.

Learn more on creating and using an [Environment](environment-manage-compute.md).

:::image type="content" source="media\migrate-synapse\migrate-spark-pool-custom-environment.png" alt-text="Screenshot showing custom environment.":::

## Related content

- [Migrate Spark configurations](migrate-synapse-spark-configurations.md)
- [Migrate Spark libraries](migrate-synapse-spark-libraries.md)
