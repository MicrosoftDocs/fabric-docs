---
title: Compute Management in Fabric Environments
description: A Microsoft Fabric environment contains configurations that include Spark compute properties. Learn how to configure these properties in an environment.
ms.author: eur
ms.reviewer: saravi
author: eric-urban
ms.topic: how-to
ms.date: 07/03/2025
ms.search.form: Manage Spark compute in Environment
---

# Spark compute configuration settings in Fabric environments

Microsoft Fabric Data Engineering and Data Science experiences operate on a fully managed Spark compute platform. This platform is designed to deliver unparalleled speed and efficiency. It includes starter pools and custom pools.

A Fabric environment contains a collection of configurations, including Spark compute properties, that you can use to configure the Spark session after they're attached to notebooks and Spark jobs. With an environment, you have a flexible way to customize compute configurations for running your Spark jobs.

## Configure settings

As a workspace admin, you can enable or disable compute customizations.

1. On the **Workspace settings** pane, select the **Data Engineering/Science** section.

1. On the **Pool** tab, turn the **Customize compute configurations for items** toggle to **On**.

   You can also delegate members and contributors to change the default session-level compute configurations in a Fabric environment by enabling this setting.

   :::image type="content" source="media\environment-introduction\customize-compute-items.png" alt-text="Screenshot that shows the item-level compute customization option in Workspace settings." lightbox="media\environment-introduction\customize-compute-items.png":::

   If you disable this option on the **Workspace settings** pane, the **Compute** section of the environment is disabled. The default pool compute configurations for the workspace are used for running Spark jobs.

## Customize session-level compute properties in an environment

As a user, you can select a pool for the environment from the list of pools available in the Fabric workspace. The Fabric workspace admin creates the default starter pool and custom pools.

:::image type="content" source="media\environment-introduction\environment-pool-selection.png" alt-text="Screenshot that shows where to select pools in the environment Compute section." lightbox="media\environment-introduction\environment-pool-selection.png":::

After you select a pool in the **Compute** section, you can tune the cores and memory for the executors within the bounds of the node sizes and limits of the selected pool. For more information about Spark compute sizes and their cores or memory options, see [Spark compute in Fabric](spark-compute.md). Use the **Compute** section to configure the Spark session-level properties to customize the memory and cores of executors based on workload requirements. The Spark properties set via `spark.conf.set` control application-level parameters aren't related to environment variables.

For example, say that you want to select a custom pool with a large node size, which is 16 Spark vCores, as the environment pool.

1. In the **Compute** section, under **Environment pool**, use the **Spark driver core** dropdown to choose either **4**, **8**, or **16**, based on your job-level requirement.

1. To allocate memory to drivers and executors, under **Spark executor memory**, select **28 g**, **56 g**, or **112 g**. All are within the bounds of a large node memory limit.

   :::image type="content" source="media\environment-introduction\env-cores-selection.png" alt-text="Screenshot that shows where to select the number of cores in the environment Compute section." lightbox="media\environment-introduction\env-cores-selection.png":::

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
