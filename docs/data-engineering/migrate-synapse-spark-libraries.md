---
title: Migrate Spark libraries
description: Learn about migrating Spark libraries from Azure Synapse Spark to Fabric, including migration prerequisites and options.
ms.reviewer: aimurg
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
  - fabric-cat
ms.date: 11/15/2023
---

# Migrate Spark libraries from Azure Synapse to Fabric

Azure Synapse Spark pool offers different feed and custom library options. In Fabric, each runtime comes with a preinstalled set of libraries (built-in libraries). However, based on your scenarios and specific needs, you can also include other libraries using [environment libraries](environment-manage-library.md) and [inline libraries](library-management.md). To move Azure Synapse Spark pool libraries to Fabric, use environment libraries.

For Spark library considerations, refer to [differences between Azure Synapse Spark and Fabric](comparison-between-fabric-and-azure-synapse-spark.md).

## Prerequisites

* If you don’t have one already, create a [Fabric workspace](../fundamentals/create-workspaces.md) in your tenant.
* If you don’t have one already, create an [Environment](create-and-use-environment.md) in your workspace. 

## Option 1: Adding Spark libraries to custom environment

You can move Spark pool libraries to an environment as follows:

1.	**Open Synapse Studio**: Sign-in into [Azure](https://portal.azure.com). Navigate to your Azure Synapse workspace and open the Synapse Studio.
1.	**Locate Spark libraries**:
    * Go to **Manage** area and select on **Apache Spark pools.**
    * Find the Apache Spark pool, select **Packages** and locate the Spark libraries for the pool.
1.	**Get Spark libraries**: Locate the requirements.txt, environment.yml, or workspace packages installed in the pool. Get the list of installed libraries on the pool.
1.	Once you have Spark libraries, add custom Spark libraries to an environment in [Fabric](https://app.fabric.microsoft.com/?pbi_source=learn-data-engineering-migrate-synapse-spark-libraries). Within your **Environment**, go to **Libraries** and add libraries:
    * From **Public Libraries,** you can upload a .yml file. You can also install libraries using PyPI and Conda.
    * From **Custom Libraries,** you can install libraries by using .jar/.whl/.tar.gz files.
1.	Click on **Save** and **Publish** changes.

:::image type="content" source="media\migrate-synapse\migrate-spark-libraries.png" alt-text="Screenshot showing Spark libraries.":::

Learn more on adding Spark libraries to an [Environment](environment-manage-library.md).

> [!NOTE]
> Note that library installation may take some time.

## Related content

- [Migrate Spark configurations](migrate-synapse-spark-configurations.md)
- [Migrate Spark notebooks](migrate-synapse-notebooks.md)
- [Migrate Spark job definition](migrate-synapse-spark-job-definition.md)
