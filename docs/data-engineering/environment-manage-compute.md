---
title: Compute management in Environment
description: An Environment contains a collection of configurations, and one of them is the Spark compute properties, which allow users to configure the Spark session once attached by Notebooks and Spark jobs
ms.author: saravi
author: santhoshravindran7
ms.topic: overview
ms.date: 11/15/2023
ms.search.for: Manage Spark compute in Environment
---

# Spark compute configuration settings in Environment

Microsoft Fabric Data Engineering and Data Science experiences operate on a fully managed Spark compute platform. This platform is designed to deliver unparalleled speed and efficiency.

- Starter Pools
- Custom Pools

With environment, you have a flexible way to customize compute configurations for running your Spark jobs. In an environment, the compute section allows users to configure the Spark session level properties to customize the memory and cores of executors based on the workload requirements.

Workspace admins can enable or disable compute customizations using the **Customize compute configurations for items** switch in the Pool tab within Data Engineering/Science section of the Microsoft Fabric Workspace settings.

Workspace admins can delegate the members, contributors to change the default session level compute configurations in Fabric Environment by enabling this setting.

:::image type="content" source="media\environment-introduction\customize-compute-items.png" alt-text="Screenshot of showing item level compute customization option in workspace settings.":::

If the workspace admin disabled this option in the workspace settings, the compute section of the environment becomes disabled and the compute configurations of the default pool for the workspace is used for running your spark jobs.

## Customizing session level compute properties in Environment

As a user, you could select the pool for the environment from the list of pools (Default Starter Pool and Custom Pools created by the Fabric workspace admin) available in the Fabric workspace.

:::image type="content" source="media\environment-introduction\environment-pool-selection.png" alt-text="Screenshot of showing pool selection from environment compute section.":::

Once you select the pool in the Compute section of the environment, you can tune the Cores and Memory for the executors within the bounds of the node sizes and limits of the selected pool.

For example : If a Custom Pool (Node Size Large, which is 16 Spark Vcores) is selected for as the environment pool, the users can choose the driver/executor core to be either 4, 8 or 16 based on their job level requirement. Likewise for the memory allocated to driver and executors could be chosen to be either 28 g, 56 g, or 112 g within the bounds of the Large nodes memory limits.

:::image type="content" source="media\environment-introduction\env-cores-selection.png" alt-text="Screenshot of showing cores selection from environment compute section.":::

Learn more about the Spark compute sizes and their cores or memory options, see [Spark Compute Overview](spark-compute.md).

> [!IMPORTANT]
> The Fabric Environment is currently in PREVIEW.

## Next steps

In this overview, you get a basic understanding of the environment. Advance to the next articles to learn how to create and get started with your own Fabric Environment:

- To get started with [!INCLUDE [product-name](../includes/product-name.md)] Environment, see [Environment 101: create, configure, and use an Environment](create-and-use-environment.md).
