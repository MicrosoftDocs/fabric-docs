---
title: One logical copy
description: Learn how to enable KQL Database data availability in OneLake.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 11/07/2023
---
# One logical copy

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses and other items. You can create a one logical copy of the data in KQL Database to make it appear as though the files and folders are stored locally in OneLake, but in reality; they exist in KQL Database.

You can create a one logical copy by enabling data availability in OneLake. Enabling data availability of your KQL database in OneLake means that you can query data with high performance and low latency in your KQL database, and query the same data in Delta Lake format via other Fabric engines such as Direct Lake mode in Power BI, warehouse, Lakehouse, Notebooks, and more.

Delta Lake is a unified data lake table format that achieves seamless data access across all compute engines in Microsoft Fabric. For more information on Delta Lake, see [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake).

In this article, you learn how to enable availability of KQL Database data in OneLake.

## How it works

The following table describes the behavior of your KQL database and tables when you enable or disable data availability.

| | Enabled| Disabled|
|------|---------|--------|
|**KQL Database**| - Existing tables aren't affected. New tables are made available in OneLake. <br/> - The [Data retention policy](data-policies.md#data-retention-policy) of your KQL database is also applied to the data in OneLake. Data that's removed from your KQL database at the end of the retention period is also removed from OneLake. | - Existing tables aren't affected. New tables won't be available in OneLake. |
|**A table in KQL Database**| - New data is made available in OneLake. <br/> - Existing data isn't backfilled. <br/> - Data can't be deleted, truncated, or purged. <br/> - Table schema can't be altered and the table can't be renamed. | - New data isn't made available in OneLake. <br/> - Data can be deleted, truncated, or purged. <br/> - Table schema can be altered and the table can be renamed. <br/> - Data is soft deleted from OneLake.|

> [!IMPORTANT]
> There's no additional storage cost to enable data availability, you're charged only once for the data storage.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with editing permissions and data

## Enable availability in OneLake

You can enable data availability either on a KQL database or table level.

1. To enable data availability, browse to the details page of your KQL database or table.
1. Next to **OneLake folder** in the **Database details** pane, select the **Edit** (pencil) icon.

    :::image type="content" source="media/onelake-mirroring/onelake-folder.png" alt-text="Screenshot of the Database details pane in Real-Time Analytics showing an overview of the database with the edit OneLake folder option highlighted.":::

1. Enable the feature by toggling the button to **Active**, then select **Done**. The database refreshes automatically. It might take up to a few minutes for the data to be available in OneLake.

    :::image type="content" source="media/onelake-mirroring/enable-data-copy.png" alt-text="Screenshot of the OneLake folder details window in Real-Time Analytics in Microsoft Fabric. The option to expose data to OneLake is turned on.":::

You've enabled data availability in your KQL database. You can now access all the new data added to your database at the given OneLake path in Delta Lake format. You can also to choose to create a OneLake shortcut from a Lakehouse, Data warehouse, or query the data directly via Power BI Direct Lake mode.

## Related content

* To expose the data in Onelake, see [Create a shortcut in OneLake](../onelake/create-onelake-shortcut.md)
* To query referenced data from OneLake in your KQL database or table, see [Create a OneLake shortcut in KQL Database](onelake-shortcuts.md?tab=onelake-shortcut)
* Query data directly with Power BI [Direct Lake](/power-bi/enterprise/directlake-overview) mode.
