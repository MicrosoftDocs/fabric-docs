---
title: Clone tables in the Fabric portal
description: How to clone tables in the Warehouse in the Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: prlangad
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.search.form: Warehouse Clone table # This article's title should not change. If so, contact engineering.
---
# Tutorial: Clone tables in the Fabric portal

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

A zero-copy clone creates a replica of the table by copying the metadata, while still referencing the same data files in OneLake. This tutorial guides you through creating a [table clone](clone-table.md) in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], using the warehouse editor with a no-code experience.

## Clone table as of current state

When you select the table, and select on more options, you get the **Clone table** menu. This menu is also available via **Table tools** in the ribbon.

:::image type="content" source="media/tutorial-clone-table-portal/clone-table-contextmenu-entrypoint.png" alt-text="Screenshot showing the entry point for clone table context menu.":::

:::image type="content" source="media/tutorial-clone-table-portal/clone-table-tabletools-entrypoint.png" alt-text="Screenshot showing the entry point for clone table in table tools.":::

On clone table pane, you can see the source table schema and name is already populated. The table state as current, creates clone of the source table as of its current state. You can choose destination schema and edit pre-populated destination table name. You can also see the generated T-SQL statement when you expand SQL statement section. When you select the **Clone** button, a clone of the table is generated and you can see it in **Explorer**.

:::image type="content" source="media/tutorial-clone-table-portal/clone-table-current-state.png" alt-text="Screenshot showing the clone table as current state of the source table.":::

## Clone table as of past point-in-time

Similar to current state, you can also choose the past state of the table within last seven days by selecting the date and time in UTC. This generates a clone of the table from a specific point in time, selectable in the **Date and time of past state** fields.

:::image type="content" source="media/tutorial-clone-table-portal/clone-table-past-state.png" alt-text="Screenshot showing the clone table as past state of the source table.":::

## Clone multiple tables at once

You can also clone a group of tables at once. This can be useful for cloning a group of related tables at the same past point in time. By selecting source tables, current or past table state, and destination schema, you can perform clone of multiple tables easily and quickly.

With the **Clone tables** context menu on **Tables** folder in the **Explorer**, you can select multiple tables for cloning.

   :::image type="content" source="media/tutorial-clone-table-portal/clone-tables-entrypoint.png" alt-text="Screenshot showing the entry point for multiple clone tables.":::

The default naming pattern for cloned objects is `source_table_name-Clone`. The T-SQL commands for the multiple [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true) statements are provided if customization of the name is required.

   :::image type="content" source="media/tutorial-clone-table-portal/clone-multiple-tables.png" alt-text="Screenshot showing the multiple clone tables.":::

## Related content

- [Clone table in Microsoft Fabric](clone-table.md)
- [Tutorial: Clone table using T-SQL](tutorial-clone-table.md)
- [CREATE TABLE AS CLONE OF](/sql/t-sql/statements/create-table-as-clone-of-transact-sql?view=fabric&preserve-view=true)
