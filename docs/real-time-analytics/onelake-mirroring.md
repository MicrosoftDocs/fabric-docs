---
title: Continuous export to OneLake (mirroring) in Real-time Analytics
description: Learn how to create a OneLake shortcut to mirror your data to OneLake.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 03/30/2023
ms.search.form: product-kusto
---

# Continuous export to OneLake (mirroring)

In this article, you'll learn how to create a OneLake shortcut in OneLake to mirror your KQL Database.

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses and other items. Shortcuts are embedded references within OneLake that point to other files’ store locations.  The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location. Once you create a shortcut, you can access your data in all of [!INCLUDE [product-name](../includes/product-name.md)]'s experiences. Shortcuts can be updated or removed from your items, but these changes don't affect the original data and its source.

There are two types of shortcuts:

* OneLake shortcut linking data in OneLake to your KQL Database. This shortcut defines the data from OneLake as an external table. Create this shortcut when you want to infrequently run queries on historical data. To create this type of shortcut, see [Create a OneLake shortcut](onelake-shortcut.md). If you want to run queries frequently and accelerate performance, see [Get data from OneLake](get-data-onelake.md).
* Continuous export: this is a OneLake shortcut that mirrors the data in your KQL Database to OneLake. If enabled, this shortcut creates one logical copy of the data in your database that you can access in other [!INCLUDE [product-name](../includes/product-name.md)] experiences without more management. To disable continuous export, see [Continuous export (mirroring)](#continuous-export-mirroring).

For more information on OneLake shortcuts, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* A Workspace
* A [KQL database](create-database.md) with data

## Continuous export (mirroring)

:::image type="content" source="media/onelake-mirroring/continuous-export.png" alt-text="Screenshot of the Manage tab showing two options titled Data retention policy and Continuous export.":::

Continuous export to OneLake is enabled in your **KQL Database** by default. If you disable continuous export before creating your Lakehouse, your data won't be mirrored. If you disable continuous export after creating a Lakehouse, the data that was already mirrored will remain, but any data loaded into your database after that won't be mirrored.

1. To disable **Continuous export**, navigate to your **KQL Database**.
1. On the ribbon, select **Manage**.
1. Select **Continuous export** > **off**.

You can enable this option again after creating a shortcut in OneLake

## Create a OneLake shortcut in OneLake

1. Open the experience switcher on the bottom of the navigation pane and select **Data Engineering**.

    :::image type="content" source="media/onelake-mirroring/app-switcher-dataengineering.png" alt-text="Screenshot of experience switcher showing a list of experiences. The experience titled Data Engineering is highlighted.":::

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

1. Select **Create** to create the shortcut. The Lakehouse will automatically refresh.

The Lakehouse shortcut has been created. You now have one logical copy of your data that you can use in other [!INCLUDE [product-name](../includes/product-name.md)] experiences without more management.

## Next steps

[Query data in the KQL Queryset](kusto-query-set.md)
