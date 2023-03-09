---
title: Warehouse
description: Learn more about data warehouses.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: conceptual
ms.date: 03/15/2023
---

# Warehouse

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

The Warehouse functionality is a ‘traditional’ data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. This warehouse is displayed in the [!INCLUDE [product-name](../includes/product-name.md)] portal with a warehouse icon, however under the Type column, you see the type listed as **Warehouse**. Where data is automatically loaded into the warehouse (default), you're fully in control of creating tables, loading, transforming and querying your data in the data warehouse using either the [!INCLUDE [product-name](../includes/product-name.md)] portal or T-SQL commands.

:::image type="content" source="media\warehouse\multiple-warehouse-list.png" alt-text="Screenshot of a warehouse list that shows distinction between warehouse and warehouse (default)." lightbox="media\warehouse\multiple-warehouse-list.png":::

> [!IMPORTANT]
> The distinction between Warehouse (default) and Warehouse is an important one as transactional T-SQL statements fail if you attempt to run them against the Warehouse (default) item. Throughout this document, we've called out specific features and functionality to align with the differing functionality of these two artifacts.

When you create a Lakehouse or a warehouse, a default Power BI dataset is created. This is represented with the (default) suffix. For more information, see [Default datasets](datasets.md).

## Known limitations with Warehouse

Model view layouts aren't currently saved.

## Delete a warehouse

> [!TIP]
> Applies to: Warehouse

To delete a warehouse, navigate to the workspace and find the warehouse you want to delete. Select the more menu (**...**) and select **Delete** from the menu that appears.

:::image type="content" source="media\warehouse\delete-menu-option.png" alt-text="Screenshot showing where to find the Delete option in the more menu." lightbox="media\warehouse\delete-menu-option.png":::

## Next steps

- [Default warehouse](default-warehouse.md)
