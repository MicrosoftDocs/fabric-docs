---
title: Migrate Spark pools
description: Learn about how to migrate Spark pools from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: migration
ms.custom: ignite-2023
ms.date: 11/03/2023
---

# Migrate Spark pools

While Azure Synapse provides various Spark pools, Fabric offers [Starter pools](configure-starter-pools.md) and [Custom pools](create-custom-spark-pools.md). If you're looking to migrate existing Spark pools from Azure Synapse to Fabric, the Starter pool can be a good choice if you have a single pool with no custom configurations or libraries, and if the [Medium node size](spark-compute.md) meets your requirements. However, if you seek more flexibility with your Spark pool configurations, it's advisable to opt for *Custom pools*. There are two options here: 

* Option 1: Move your Spark pool to a workspace default environment.
* Option 2: Move your Spark pool to a custom environment in Fabric. 

If you have more than one Spark pool and you plan to move those to the same Fabric workspace, the recommended approach is to use Option 2, creating multiple custom environments (one environment per Apache Spark pool).

## Option 1: From Spark Pool to Workspace Default Environment

You can create custom Spark pools from your Fabric workspace and use them as the default environment. The default environment is used by all notebooks and SJD in the same workspace. 

To move from an existing Spark pool in Synapse PaaS to a workspace default environment:

1. **Access Azure Synapse workspace**: Log in to the Azure portal, navigate to your Azure Synapse workspace, and go to Analytics Pools.
1.	**Locate the Spark pool**: In Analytics Pools, locate the Spark pool you want to move to Fabric and check the pool properties. 
1.	**Get the properties**: Get the Spark pool properties such as Apache Spark version, node size family, node size or auto-scale. Please refer to [Spark pool considerations](TBC) to see any differences.
1.	**Create a custom Spark pool in Fabric**
    * Go to your Fabric workspace and click on “Workspace settings”
    * Go to “Data Engineering/Science” and click on “Spark settings”
    * Go to “Pool” tab and in “Default pool for workspace” section, first click on the dropdown menu and click on create “New pool”
    * [Create your custom pool](create-custom-spark-pools.md) with corresponding target values. Complete the name, node family, node size, autoscaling and dynamic executor allocation options
5.	**Select a runtime version**
    * Go to “Environment” tab, and select the required “Runtime Version”
    * Keep “Set default environment” disabled

:::image type="content" source="media\migrate-synapse\migrate-spark-pool-default-environment.png" alt-text="Screenshot showing default environment.":::

> [!NOTE]
> In this option, pool level libraries or configurations are not supported. Users can adjust compute configuration for individual items such as notebooks and Spark Job Definition, and add inline libraries though. If you need to add custom libraries and configurations to an environment, consider a [custom environment](TBC).

## Option 2: From Spark Pool to Custom Environment

With custom environments, you will be able to set up custom Spark properties and libraries. To create a custom environment:

1.	**Access Azure Synapse workspace**: Log in to the Azure portal, navigate to your Azure Synapse workspace, and go to Analytics Pools.
1.	**Locate the Spark pool**: In Analytics Pools, locate the Spark pool you want to move to Fabric and check the pool properties. 
1.	**Get the properties**: Get the Spark pool properties such as Apache Spark version, node size family, node size or auto-scale. Please refer to [Spark pool considerations](TBC) to see any differences.
1.	**Create a custom Spark pool**
    * Go to your Fabric workspace and click on “Workspace settings”
    * Go to “Data Engineering/Science” and click on “Spark settings”
    * Go to “Pool” tab and in “Default pool for workspace” section click on create “New pool”
    * [Create your custom pool](create-custom-spark-pools.md) with corresponding target values. Complete the name, node family, node size, autoscaling and dynamic executor allocation options
1.	**[Create an Environment](TBC)** item if you don’t have one
1.	**Configure the Spark pool**
    * Within the Environment, go to “Spark Compute” > “Compute”
    * Select the newly created pool for the new environment
    * You can configure driver and executors cores and memory 
1.	Click on “Save” and “Publish” changes

:::image type="content" source="media\migrate-synapse\migrate-spark-pool-custom-environment.png" alt-text="Screenshot showing custom environment.":::