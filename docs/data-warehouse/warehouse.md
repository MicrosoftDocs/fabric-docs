---
title: Warehouse
description: Learn more about data warehouses.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: conceptual
ms.date: 03/15/2023
ms.search.form: Warehouse overview, Warehouse in workspace overview
---

# Warehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

The Warehouse functionality is a 'traditional' data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. This warehouse is displayed in the [!INCLUDE [product-name](../includes/product-name.md)] portal with a warehouse icon, however under the **Type** column, you see the type listed as **Warehouse**. Where data is automatically accessible via the read-only SQL Endpoint, you're fully in control of creating tables, loading, transforming and querying your data in the data warehouse using either the [!INCLUDE [product-name](../includes/product-name.md)] portal or T-SQL commands.

:::image type="content" source="media\warehouse\multiple-warehouse-list.png" alt-text="Screenshot of a warehouse list that shows distinction between warehouse and SQL Endpoint." lightbox="media\warehouse\multiple-warehouse-list.png":::

> [!IMPORTANT]
> The distinction between the [SQL Endpoint](sql-endpoint.md) and Warehouse is an important one as T-SQL statements that write data or modify schema fail if you attempt to run them against the SQL Endpoint. Throughout our documentation, we've called out specific features and functionality to align with the differing functionality.

When you create a Lakehouse or a warehouse, a default Power BI dataset is created. This is represented with the (default) suffix. For more information, see [Default datasets](datasets.md).

## Limitations

1. Model view layouts aren't currently saved.

## Rename a warehouse

From within the **Settings**, select the Settings icon in the ribbon. The **Settings** panel displays on the right side of the screen; you can edit the name of a warehouse to provide a new name and close the panel.

:::image type="content" source="media\warehouse\settings-icon-panel.png" alt-text="Screenshot showing the Settings icon in the ribbon and the Settings panel." lightbox="media\warehouse\settings-icon-panel.png":::

You can also get to the **Settings** panel from the more menu (**...**), next to the warehouse name in the workspace view.

:::image type="content" source="media\warehouse\more-menu-settings-option.png" alt-text="Screenshot showing where the Settings option appears in the more menu." lightbox="media\warehouse\more-menu-settings-option.png":::

You can also rename a warehouse using header.

:::image type="content" source="media\warehouse\rename-header.png" alt-text="Screenshot showing where you can rename using the header." lightbox="media\warehouse\rename-header.png":::

Alternatively, you can change the warehouse name from the workspace list view. Select the more menu (**...**) next to the warehouse name in the workspace view.

From the menu that appears, select **Rename**.

:::image type="content" source="media\warehouse\more-menu-rename.png" alt-text="Screenshot showing where Rename appears in the workspace list more menu." lightbox="media\warehouse\more-menu-rename.png":::

Provide a new name in the dialog and select **Rename** to apply.

When you rename a warehouse, the default dataset based on that warehouse is also automatically renamed.

## Delete a warehouse

To delete a warehouse, navigate to the workspace and find the warehouse you want to delete. Select the more menu (**...**) and select **Delete** from the menu that appears.

:::image type="content" source="media\warehouse\delete-menu-option.png" alt-text="Screenshot showing where to find the Delete option in the more menu." lightbox="media\warehouse\delete-menu-option.png":::

## Next steps

- [Data warehousing overview](data-warehousing.md)
- [Create a warehouse](create-warehouse.md)
- [SQL Endpoint](sql-endpoint.md)