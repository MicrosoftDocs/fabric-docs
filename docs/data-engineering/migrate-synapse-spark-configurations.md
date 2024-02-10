---
title: Migrate Spark configurations
description: Learn about how to migrate Spark configurations from Azure Synapse Spark to Fabric.
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

# Migrate Spark configurations from Azure Synapse to Fabric

Apache Spark provides numerous configurations that can be customized to enhance the experience in various scenarios. In Azure Synapse Spark and Fabric Data Engineering, you have the flexibility to incorporate these configurations or properties to tailor your experience. In Fabric, you can add Spark configurations to an [environment](migrate-synapse-spark-libraries.md) and use inline Spark properties directly within your Spark jobs. To move Azure Synapse Spark pool configurations to Fabric, use an environment.

For Spark configuration considerations, refer to [differences between Azure Synapse Spark and Fabric](comparison-between-fabric-and-azure-synapse-spark.md).

## Prerequisites

* If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.
* If you don’t have one already, create an [Environment](create-and-use-environment.md) in your workspace. 

## Option 1: Adding Spark configurations to custom environment

Within an environment, you can set Spark properties and those configurations are applied to the selected environment pool.

1.	**Open Synapse Studio**: Sign-in into [Azure](https://portal.azure.com). Navigate to your Azure Synapse workspace and open the Synapse Studio.
1.	**Locate Spark configurations**:
    * Go to **Manage** area and select on **Apache Spark pools.**
    * Find the Apache Spark pool, select **Apache Spark configuration** and locate the Spark configuration name for the pool.
1.	**Get Spark configurations**: You can either obtain those properties by selecting **View configurations** or exporting configuration (.txt/.conf/.json format) from **Configurations + libraries** > **Apache Spark configurations**.
1.	Once you have Spark configurations, **add custom Spark properties to your Environment** in [Fabric](https://app.fabric.microsoft.com):
    * Within the Environment, go to **Spark Compute** > **Spark properties**.
    * Add Spark configurations. You can either add each manually or import from .yml.
1.	Click on **Save** and **Publish** changes.

:::image type="content" source="media\migrate-synapse\migrate-spark-configurations.png" alt-text="Screenshot showing Spark configurations.":::

Learn more on adding Spark configurations to an [Environment](create-and-use-environment.md).

## Related content

- [Migrate Spark pools](migrate-synapse-spark-pools.md)
- [Migrate Spark libraries](migrate-synapse-spark-libraries.md)
- [Migrate Spark notebooks](migrate-synapse-notebooks.md)
