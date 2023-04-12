---
title: Synapse Data Warehouse in Microsoft Fabric
description: Learn more about Synapse Data Warehouse in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: conceptual
ms.date: 04/05/2023
ms.search.form: Warehouse overview, Warehouse in workspace overview
---

# Synapse Data Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] functionality is a 'traditional' data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. 

This warehouse is displayed in the [!INCLUDE [product-name](../includes/product-name.md)] portal with a warehouse icon, however under the **Type** column, you see the type listed as **Warehouse**. Where data is automatically accessible via the read-only SQL Endpoint, you're fully in control of creating tables, loading, transforming and querying your data in the data warehouse using either the [!INCLUDE [product-name](../includes/product-name.md)] portal or T-SQL commands.

> [!IMPORTANT]
> The distinction between the [SQL Endpoint](sql-endpoint.md) and [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is an important one as T-SQL statements that write data or modify schema fail if you attempt to run them against the SQL Endpoint. Throughout our documentation, we've called out specific features and functionality to align with the differing functionality.

To get started with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], see [Get started with the Synapse Data Warehouse in Microsoft Fabric](get-started-data-warehouse.md).

## Datasets

When you create a [Lakehouse](../data-engineering/lakehouse-overview.md) or a [!INCLUDE [fabric-dw](includes/fabric-dw.md)], a default Power BI dataset is created. This is represented with the (default) suffix. For more information, see [Default Power BI datasets](datasets.md).

## Limitations

1. Model view layouts aren't currently saved.

## T-SQL surface area

Creating, altering, and dropping tables, and insert, update, and delete are only supported in the transactional warehouse, not in the SQL Endpoint.

At this time, the following list of commands is NOT currently supported. Don't try to use these commands because even though they may appear to succeed, they could cause corruption to your warehouse.

- ALTER TABLE ADD/ALTER/DROP COLUMN
- BULK LOAD
- CREATE ROLE
- CREATE SECURITY POLICY - Row Level Security (RLS)
- CREATE USER
- GRANT/DENY/REVOKE
- Hints
- Identity Columns
- Manually created multi-column stats
- MASK and UNMASK (Dynamic Data Masking)
- MATERIALIZED VIEWS
- MERGE
- OPENROWSET
- PREDICT
- Queries targeting system and user tables
- Recursive queries
- Result Set Caching
- Schema and Table names can't contain / or \
- SELECT - FOR (except JSON)
- SET ROWCOUNT
- SET TRANSACTION ISOLATION LEVEL
- `sp_showmemo_xml`
- `sp_showspaceused`
- `sp_rename`
- Temp Tables
- Triggers
- TRUNCATE

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

When you rename a warehouse, the default Power BI dataset based on that warehouse is also automatically renamed.

## Delete a warehouse

To delete a [!INCLUDE [fabric-dw](includes/fabric-dw.md)], navigate to the workspace and find the warehouse you want to delete. Select the more menu (**...**) and select **Delete** from the menu that appears.

:::image type="content" source="media\warehouse\delete-menu-option.png" alt-text="Screenshot showing where to find the Delete option in the more menu." lightbox="media\warehouse\delete-menu-option.png":::

## Next steps

- [Data warehousing overview](data-warehousing.md)
- [Get started with the Synapse Data Warehouse in Microsoft Fabric](get-started-data-warehouse.md)
- [Create a warehouse](create-warehouse.md)
- [SQL Endpoint](sql-endpoint.md)
