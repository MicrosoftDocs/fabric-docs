---
title: Migrate Spark configurations
description: Learn about how to migrate Spark configurations from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: migration
ms.custom: ignite-2023
ms.date: 11/03/2023
---

# Migrate Spark configurations

Options to migrate Azure Synapse pool configurations to Fabric.

## Option 1: Adding Spark Configurations to Custom Environment

Within an environment, you can set Spark properties and those will be applied to the environment pool.

1.	**Open Synapse Studio**: Log in to the Azure portal, navigate to your Azure Synapse workspace, and open the Synapse Studio
1.	**Locate Spark configurations**
    * Go “Manage” area and click on “Apache Spark pools”
    * Find the Apache Spark pool, click on “Apache Spark configuration” and locate the Spark configuration name for the pool
1.	**Get Spark configurations**: You can either obtain those by clicking “View configurations” or exporting the configuration file name from “Configurations + libraries” > “Apache Spark configurations”
1.	Once you have Spark configurations, **add custom Spark properties to your Environment** in Fabric
    * Within the Environment, go to “Spark Compute” > “Spark properties”
    * Add Spark configurations. You can either add each manually or import from .yml.
1.	Click on “Save” and “Publish” changes

:::image type="content" source="media\migrate-synapse\migrate-spark-configurations.png" alt-text="Screenshot showing Spark configurations.":::