---
title: Clone table examples
description: How to clone table in Microsoft Fabric Warehouse.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 10/21/2023
ms.topic: how-to
ms.search.form: Warehouse Clone table # This article's title should not change. If so, contact engineering.
---
# Clone table in Microsoft Fabric Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

A zero-copy clone creates a replica of the table by copying the metadata, while still referencing the same data files in OneLake. This article describes how to use Clone table actions in the warehouse editor to create cloned table with no-code experience.

## Clone table as of current state of the source table

When you select the table, and click on more options, you get the **Clone table** menu. This menu is also available via Table tools in the ribbon.

:::image type="content" source="media\clone-table-examples\clone-table-contextmenu-entrypoint.png" alt-text="Screenshot showing the entry point for clone table context menu.":::

:::image type="content" source="media\clone-table-examples\clone-table-tabletools-entrypoint.png" alt-text="Screenshot showing the entry point for clone table in table tools.":::

On clone table pane, you can see the source table schema and name is already populated. The table state as current, creates clone of the source table as of its current state. You can choose destination schema and edit pre-populated destination table name. You can also see the generated T-SQL statement when you expand SQL statement section. On clicking **Clone** button, the clone of the table is generated and you can see it in Explorer.

:::image type="content" source="media\clone-table-examples\clone-table-current-state.png" alt-text="Screenshot showing the clone table as current state of the source table.":::

## Clone table as of past point-in-time state of the source table

Similar to current state, you can also choose the past state of the table within last 7 days by selecting the date and time in UTC.

:::image type="content" source="media\clone-table-examples\clone-table-past-state.png" alt-text="Screenshot showing the clone table as past state of the source table.":::

## Clone tables 

**Clone tables** context menu on **Tables** folder in the Explorer enables to select multiple tables for cloning.

   :::image type="content" source="media\clone-table-examples\clone-tables-entrypoint.png" alt-text="Screenshot showing the entry point for multiple clone tables.":::

By selecting source tables, current or past table state, and destination schema, you can perform clone of multiple tables easily and quickly. The default naming pattern to cloned objects is *Source table name-Clone*.

   :::image type="content" source="media\clone-table-examples\clone-multiple-tables.png" alt-text="Screenshot showing the multiple clone tables.":::

## Limitations

- Clone table is not supported on Lakehouse SQL endpoint.

## Next steps

- [Clone table in Microsoft Fabric](clone-table.md)
- [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true)
- [Tutorial: Clone table using T-SQL](tutorial-clone-table.md)
