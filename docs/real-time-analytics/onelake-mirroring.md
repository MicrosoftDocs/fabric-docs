---
title: One logical copy in Real-time Analytics
description: Learn how to create a OneLake shortcut that exposes the data in your KQL Database to other Microsoft Fabric experiences.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 04/19/2023
ms.search.form: product-kusto
---

# One logical copy

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses and other items. Shortcuts are embedded references within OneLake that point to other files’ store locations.  The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location. Shortcuts can be updated or removed from your items, but these changes don't affect the original data and its source. For more information on OneLake shortcuts, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

In this article, you learn how to create a OneLake shortcut that exposes the data in your KQL Database to all of [!INCLUDE [product-name](../includes/product-name.md)]'s experiences.

This shortcut is a two-step process that requires you to do the following:

 1. Enable data copy to OneLake.
 1. Create a shortcut in OneLake.

 Use this shortcut if you want to access your data in other [!INCLUDE [product-name](../includes/product-name.md)] experiences.

To query referenced data from OneLake in your KQL Database, see [Create a OneLake shortcut](onelake-shortcut.md).

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled workspace.
* [KQL database](create-database.md) with data.

## Enable data copy

Creating one logical copy of your data in OneLake is a two-step process. You send your data from your KQL Database to OneLake by enabling data copying, then you expose the data by creating a OneLake shortcut. To create the shortcut, see [Create shortcut](#create-shortcut).

Data copying to OneLake is disabled in your **KQL Database** by default. Data loaded before enabling data copy won't be copied. Only new tables are affected by this change. If you disable data copying after creating a Lakehouse, the data that was already copied will remain, but any data loaded into your database after that point will remain in your database.

1. To enable data copying, navigate to your **KQL Database**.
1. Next to **OneLake folder** in the **Database details** pane, select the **Edit** (pencil) icon.

    :::image type="content" source="media/onelake-mirroring/onelake-folder.png" alt-text="Screenshot of the Database details pane showing an overview of the database. The edit OneLake folder option is highlighted.":::

1. Enable the feature by turning it on, then select **Save**. The database refreshes automatically.

    :::image type="content" source="media/onelake-mirroring/enable-data-copy.png" alt-text="Screenshot of the OneLake folder details window. The option to copy data to OneLake is turned on.":::

## Create shortcut

1. Open the experience switcher on the bottom of the navigation pane and select **Data Engineering**.

    :::image type="content" source="media/onelake-mirroring/experience-switcher-data-engineering.png" alt-text="Screenshot of experience switcher showing a list of experiences. The experience titled Data Engineering is highlighted.":::

1. Select **Lakehouse**.

     :::image type="content" source="media/onelake-mirroring/new-lakehouse.png" alt-text="Screenshot of Data Engineering artifacts. The option titled Lakehouse is highlighted.":::

1. Name your Lakehouse, then select **Create**.

    :::image type="content" source="media/onelake-mirroring/lakehouse-name.png" alt-text="Screenshot of new Lakehouse window showing the Lakehouse name. The button titled Create is highlighted.":::

1. Select **New Shortcut** on the right-hand side of the Lakehouse.

    :::image type="content" source="media/onelake-mirroring/new-shortcut.png" alt-text="Screenshot of empty Lakehouse. The option titled New shortcut is highlighted.":::

1. Under **Internal sources**, select **Microsoft OneLake**.

    :::image type="content" source="media/onelake-mirroring/internal-source.png" alt-text="Screenshot of New Shortcut window. The option under Internal sources titled Microsoft OneLake is highlighted.":::

1. In **Select a data source type**, select your KQL Database, then select **Next** to connect the data to your shortcut.

    :::image type="content" source="media/onelake-mirroring/onelake-shortcut-data-source.png" alt-text="Screenshot of data source type window showing all of the data sources in your workspace. The button titled Next is highlighted.":::

1. To connect the table with the data from your database, select **>** to expand the tables in the left-hand pane, then select a table.

1. Select **Create**. The Lakehouse automatically refreshes.

The Lakehouse shortcut has been created. You now have one logical copy of your data that you can use in other [!INCLUDE [product-name](../includes/product-name.md)] experiences.

## Next steps

[Access shortcuts](../onelake/access-onelake-shortcuts.md)
