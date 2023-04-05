---
title: Create an external table (shortcut) in Real-time Analytics
description: Learn how to create an external table that references data from OneLake in your KQL Database.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 04/05/2023
ms.search.form: product-kusto
---

# Create an external table (shortcut)

In this article, you'll learn how to create a OneLake shortcut to reference data from OneLake in your KQL Database.

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses and other items. Shortcuts are embedded references within OneLake that point to other files’ store locations. The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location. Shortcuts can be updated or removed from your items, but these changes don't affect the original data and its source.

[!INCLUDE [product-name](../includes/product-name.md)] supports two types of OneLake shortcuts that use internal sources:

| Shortcut | Description | When to use it? |
|---------| --------- | --------- |
|External table| Defines the data from OneLake as an external table in your KQL Database. | Use this shortcut when you want to infrequently run queries on historical data without partitioning or indexing the data. But if you want to run queries frequently and accelerate performance, import the data directly from OneLake. For direct import, see [Get data from OneLake](get-data-onelake.md).
|One logical copy| Creates one logical copy of the data in your KQL Database in OneLake. This shortcut is a two-step process that requires enabling continuous export of your data, and creating a shortcut in OneLake. | Use this shortcut if you want to access your data in other [!INCLUDE [product-name](../includes/product-name.md)] experiences without more management. To create one logical copy, see <!-- [One logical copy (shortcut)](onelake-mirroring) --->|

For more information on OneLake shortcuts, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

## Prerequisites

* [Power BI Premium subscription](/power-bi/enterprise/service-admin-premium-purchase).
* Workspace
* [KQL Database](create-database.md)
* Lakehouse with data

## Create Shortcut

1. Select **New** > **OneLake shortcut**.

    :::image type="content" source="media/onelake-shortcut/home-tab.png" alt-text="Screenshot of the Home tab showing the dropdown of the New button. The option titled OneLake shortcut is highlighted.":::

1. Under **Internal sources**, select **OneLake**.

    :::image type="content" source="media/onelake-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled OneLake is highlighted.":::

1. In **Select a data source type** select the data source you want to connect to, then select **Next**.

    :::image type="content" source="media/onelake-shortcut/data-source.png" alt-text="Screenshot of the Select a data source type window showing the available data sources to use with the shortcut. The Next button is highlighted.":::

1. Select the specific table or subfolder containing the data, then select **Create** to create your connection.

    :::image type="content" source="media/onelake-shortcut/create-shortcut.png" alt-text="Screenshot of the New shortcut window showing the data in the LakeHouse. The subfolder titled StrmSC and the Create button are highlighted.":::

1. Select **Refresh** to refresh your database. The shortcut will appear under **Shortcuts** in the **Object tree**.

    :::image type="content" source="media/onelake-shortcut/object-tree.png" alt-text="Screenshot of the object tree showing the new shortcut.":::

The OneLake shortcut has been created. You can now query this data in a KQL Queryset.

> [!IMPORTANT]
> To query the data in the OneLake shortcut, use the `external_table()` function .

## Next steps

[Query data in the KQL Queryset](kusto-query-set.md)
