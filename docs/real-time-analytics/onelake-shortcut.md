---
title: Use a OneLake shortcut to query data in Real-time Analytics
description: Learn how to create a OneLake shortcut to query data from OneLake in your KQL Database.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: product-kusto
---

# Use a OneLake shortcut to query data

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses and other items. Shortcuts are embedded references within OneLake that point to other files’ store locations. The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location. Shortcuts can be updated or removed from your items, but these changes don't affect the original data and its source. For more information on OneLake shortcuts, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

In this article, you learn how to create a OneLake shortcut to query data from OneLake in your KQL Database.

Use this shortcut when you want to infrequently run queries on historical data without partitioning or indexing the data. If you want to run queries frequently and accelerate performance, import the data directly from OneLake. For direct import, see [Get data from OneLake](get-data-onelake.md).

To access the data in your KQL Database in other [!INCLUDE [product-name](../includes/product-name.md)] experiences, see [One logical copy](onelake-mirroring.md).

## Prerequisites

* [Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase) enabled workspace.
* [KQL Database](create-database.md)
* Lakehouse with data

## Create shortcut

1. Select **New** > **OneLake shortcut**.

    :::image type="content" source="media/onelake-shortcut/home-tab.png" alt-text="Screenshot of the Home tab showing the dropdown of the New button. The option titled OneLake shortcut is highlighted.":::

1. Under **Internal sources**, select **Microsoft OneLake**.

    :::image type="content" source="media/onelake-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled OneLake is highlighted."  lightbox="media/onelake-shortcut/new-shortcut-expanded.png":::

1. Select the data source you want to connect to, and then select **Next**.

    :::image type="content" source="media/onelake-shortcut/data-source.png" alt-text="Screenshot of the Select a data source type window showing the available data sources to use with the shortcut. The Next button is highlighted.":::

1. Expand **Files**, and select a specific subfolder to connect to, then select **Create** to create your connection.

    :::image type="content" source="media/onelake-shortcut/create-shortcut.png" alt-text="Screenshot of the New shortcut window showing the data in the LakeHouse. The subfolder titled StrmSC and the Create button are highlighted.":::

1. Select **Close** on the **Shortcut creation completed** window that appears, and then refresh your database.

    The shortcut appears under **Shortcuts** in the **Data tree**.

    :::image type="content" source="media/onelake-shortcut/data-tree.png" alt-text="Screenshot of the data tree showing the new shortcut.":::

The OneLake shortcut has been created. You can now query this data.

> [!NOTE]
> You can only connect to one subfolder or table per shortcut. To connect to more data, repeat these steps and create new shortcuts.

## Query data

To query data from the OneLake shortcut, use the [`external_table()` function](/azure/data-explorer/kusto/query/externaltablefunction?context=/fabric/context/context).

1. On the rightmost of your database, select **Check your data**. The window opens with a few sample queries you can run to get an initial look at your data.
1. Replace the table name placeholder with `external_table('`*Shortcut name*`')`.
1. Select **Run** or press **Shift+ Enter** on a selected query to run it.

:::image type="content" source="media/onelake-shortcut/query-shortcut.png" alt-text="Screenshot of the Check your data window showing the results of a sample query."  lightbox="media/onelake-shortcut/query-shortcut.png":::

## Next steps

[Query data in a KQL Queryset](kusto-query-set.md)
