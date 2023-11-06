---
title: Migrate Spark libraries
description: Learn about how to migrate Spark libraries from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: migration
ms.custom: ignite-2023
ms.date: 11/03/2023
---

# Migrate Spark libraries from Azure Synapse to Fabric

Azure Synapse Spark pool offers different feed and custom library options. In Fabric, each runtime comes with a preinstalled set of libraries (built-in libraries). However, based on your scenarios and specific needs, you can also include other libraries using [environment libraries](migrate-synapse-spark-libraries.md) and inline libraries. To move Azure Synapse Spark pool libraries to Fabric, use environment libraries.

For Spark library considerations, refer to [differences between Azure Synapse Spark and Fabric](migrate-synapse-spark-libraries.md).

## Prerequisites

* If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.
* If you don’t have one already, create an [Environment](migrate-synapse-spark-libraries.md) in your workspace. 

## Option 1: Adding Spark libraries to custom environment

You can move Spark pool libraries to an environment as follows:

1.	**Open Synapse Studio**: Sign-in into the Azure portal. Navigate to your Azure Synapse workspace and open the Synapse Studio.
1.	**Locate Spark libraries**:
    * Go to **Manage** area and select on **Apache Spark pools.**
    * Find the Apache Spark pool, select **Packages** and locate the Spark libraries for the pool.
1.	**Get Spark libraries**: Locate the requirements.txt, environment.yml, or workspace packages installed in the pool. Get the list of installed libraries on the pool.
1.	Once you have Spark libraries, **add custom Spark libraries to the Environment**. Within the Environment, go to **Libraries** and add libraries:
    * From **Public libraries,** you can upload a yml file. You can also install libraries using PyPI and Conda.
    * From **Custom libraries,** you can install libraries by using jar, whl, or tar.gz files.
1.	Click on **Save** and **Publish** changes.

:::image type="content" source="media\migrate-synapse\migrate-spark-libraries.png" alt-text="Screenshot showing Spark libraries.":::

Learn more on adding Spark libraries to an [Environment](migrate-synapse-spark-libraries.md).

> [!NOTE]
> Note that library installation may take some time.

## Next steps

- [Migrate Spark pools](migrate-synapse-spark-pools.md)
- [Migrate Spark configurations](migrate-synapse-spark-configurations.md)
- [Migrate Spark notebooks](migrate-synapse-notebooks.md)