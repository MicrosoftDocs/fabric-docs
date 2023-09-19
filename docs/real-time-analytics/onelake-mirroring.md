---
title: One logical copy in Real-Time Analytics
description: Learn how to create a OneLake shortcut that exposes the data in your KQL database to other Microsoft Fabric experiences.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom: build-2023
ms.date: 07/16/2023
ms.search.form: product-kusto
---
# One logical copy

[!INCLUDE [preview-note](../includes/preview-note.md)]

OneLake is a single, unified, logical data lake for [!INCLUDE [product-name](../includes/product-name.md)] to store lakehouses, warehouses and other items. Shortcuts are embedded references within OneLake that point to other files' store locations.  The embedded reference makes it appear as though the files and folders are stored locally but in reality; they exist in another storage location. Shortcuts can be updated or removed from your items, but these changes don't affect the original data and its source. For more information on OneLake shortcuts, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

In this article, you learn how to create a OneLake shortcut that exposes the data in your KQL database or table to all [!INCLUDE [product-name](../includes/product-name.md)] experiences.

This shortcut is a two-step process that requires you to do the following:

 1. Enable data availability on the KQL database or table level.
 1. Create a shortcut in OneLake.

Use this shortcut if you want to access your data in other [!INCLUDE [product-name](../includes/product-name.md)] experiences.

To query referenced data from OneLake in your KQL database or table, see [Create a OneLake shortcut](onelake-shortcuts.md?tab=onelake-shortcut)

## How it works

* When you **enable the policy on your KQL database**, existing tables aren't affected. New tables are available in OneLake.
* When you **disable the policy on your KQL database**, existing tables aren't affected. New tables won't be available in OneLake.
* When you **enable the policy on your table**, new data is available in OneLake. Existing data isn't backfilled. Table schema can't be altered and the table can't be renamed.
* When you **disable the policy on your table**, the data is no longer available in OneLake.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with data

## Enable availability in OneLake

Creating one logical copy of your data in OneLake is a two-step process. You enable OneLake availability in your KQL database or table, then expose the data by creating a OneLake shortcut. To create the shortcut, see [Create a OneLake shortcut](../onelake/create-onelake-shortcut.md).

1. To enable data availability, browse to the details page of your KQL database or table.
1. Next to **OneLake folder** in the **Database details** pane, select the **Edit** (pencil) icon.

    :::image type="content" source="media/onelake-mirroring/onelake-folder.png" alt-text="Screenshot of the Database details pane in Real-Time Analytics showing an overview of the database with the edit OneLake folder option highlighted.":::

1. Enable the feature by toggling the button to **Active**, then select **Done**. The database refreshes automatically.

    :::image type="content" source="media/onelake-mirroring/enable-data-copy.png" alt-text="Screenshot of the OneLake folder details window in Real-Time Analytics in Microsoft Fabric. The option to expose data to OneLake is turned on.":::

You've enabled data availability in your KQL database. To expose the data, create a OneLake shortcut.

## Next step

> [!div class="nextstepaction"]
> [Create a OneLake shortcut](../onelake/create-onelake-shortcut.md)
