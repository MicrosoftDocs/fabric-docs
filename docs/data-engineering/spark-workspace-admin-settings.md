---
title: Apache Spark workspace administration settings
description: Learn about the workspace administration settings such as Apache Spark node family, runtime version, and Spark properties. 
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: conceptual
ms.date: 02/24/2023
---

# Apache Spark workspace administration settings

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

When you create a workspace in [!INCLUDE [product-name](../includes/product-name.md)], an [Apache Spark pool](/azure/synapse-analytics/spark/apache-spark-pool-configurations) that is associated with that workspace is automatically created. With the simplified setup in [!INCLUDE [product-name](../includes/product-name.md)], there's no need to choose the node or machine sizes, as this is handled for you behind the scenes. This configuration provides a faster experience to start and run your Spark jobs in many common scenarios.

To make changes to the Spark settings in a workspace, you should have the admin role for that workspace. To learn more about the roles you can assign users in a workspace, see [Roles in workspaces in Power BI](/power-bi/collaborate-share/service-roles-new-workspaces).

To manage the Spark settings for the pool associated with your workspace:

1. Go to the **Workspace settings** in your workspace:

   :::image type="content" source="media\spark-workspace-admin-settings\workspace-settings.png" alt-text="Screenshot showing where to select Workspace settings." lightbox="media\spark-workspace-admin-settings\workspace-settings.png":::

1. Then, choose the **Data Engineering** option to expand the menu:

   :::image type="content" source="media\spark-workspace-admin-settings\data-engineering-menu.png" alt-text="Screenshot showing where to select Data Engineering in the Workspace settings menu." lightbox="media\spark-workspace-admin-settings\data-engineering-menu.png":::

1. You see the **Spark Settings** option in your left-hand menu:

   :::image type="content" source="media\spark-workspace-admin-settings\select-spark-settings.png" alt-text="Screenshot showing where to select Spark settings." lightbox="media\spark-workspace-admin-settings\select-spark-settings.png":::

1. You have three options you can change on this page: **Node family**, **Runtime version**, and **Spark properties**.

> [!NOTE]
> If you change any of the defaults on this page, a new pool will be created and you may see reduced performance in this case. In the future, we expect to have more flexibility and to see similar performance in more scenarios.

## Node family

There are two options for machines you can select to use in your pool.

:::image type="content" source="media\spark-workspace-admin-settings\node-family-options.png" alt-text="Screenshot showing the node family options." lightbox="media\spark-workspace-admin-settings\node-family-options.png":::

By default, your pool uses **Memory Optimized** machines. This is the most common machine type used for Spark and is recommended for most Spark workloads. In addition, you can select GPU-optimized machines for your pool to use. Learn more: [GPU-accelerated Apache Spark pools in Azure Synapse Analytics](/azure/synapse-analytics/spark/apache-spark-gpu-concept)

## Runtime version

You may choose which version of Spark you’d like to use for the workspace. The only version of Spark that is currently available for use is Spark 3.2. You'll have additional options in the future.

:::image type="content" source="media\spark-workspace-admin-settings\runtime-version.png" alt-text="Screenshot showing where to select runtime version." lightbox="media\spark-workspace-admin-settings\runtime-version.png":::

## Spark Properties

Apache Spark has many settings you can provide to optimize the experience for your scenarios. You may set those properties through the UI by selecting the **Add** option. Select an item from the dropdown menu, and enter the value.

:::image type="content" source="media\spark-workspace-admin-settings\spark-properties-add.png" alt-text="Screenshot showing where to select Add." lightbox="media\spark-workspace-admin-settings\spark-properties-add.png":::

You can delete items by selecting the item(s) and then select the **Delete** button, or simply select the delete icon after each item you wish you to delete.

:::image type="content" source="media\spark-workspace-admin-settings\spark-properties-delete.png" alt-text="Screenshot showing where to select Delete." lightbox="media\spark-workspace-admin-settings\spark-properties-delete.png":::

## Learn more

Learn more about the Spark properties from the [public documentation](https://spark.apache.org/docs/latest/configuration.html) for Apache Spark.
