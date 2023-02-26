---
title: Create OneLake shortcut in Real-time Analytics
description: Learn how to create a OneLake shortcut in a KQL Database.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 02/26/2023
---

# Create a OneLake shortcut

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses and other items.

Shortcuts are embedded references within OneLake that point to other files’ storage locations. The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location.

Shortcuts can be updated or removed from your items, but these changes won't affect the original data and its source.

There are two types of shortcuts:

* OneLake shortcut linking your KQL Database to OneLake. This shortcut creates one logical copy of the data in your database that you can access in other [!INCLUDE [product-name](../includes/product-name.md)] experiences without more management.

* OneLake shortcut linking data in OneLake to your KQL Database. This shortcut references data from OneLake as an external table. It's useful for querying large amounts of data that you don't want to store locally.

In this article, you'll learn how to create a OneLake shortcut in the context of your KQL Database.

## Prerequisites

* Power BI Premium subscription. For more information, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
* Workspace
* [KQL Database](create-database.md)
* Lakehouse with data

## Create a OneLake shortcut in your KQL Database

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

The Lakehouse shortcut has been created. You can now query this data in a KQL Queryset.

## Next steps

[Query data in the KQL Queryset](kusto-query-set.md)
