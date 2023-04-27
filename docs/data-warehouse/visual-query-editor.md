---
title: Query using the Visual Query editor
description: Learn how to use the Visual Query editor.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 04/13/2023
ms.topic: how-to
ms.search.form: Query Editor
---

# Query using the Visual query editor

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can [query the data](query-warehouse.md) in your warehouse with multiple tools, including the Visual query editor and the [SQL Query editor](sql-query-editor.md) among others. This article describes how to use the Visual query editor to quickly and efficiently write queries, and suggestions on how best to see the information you need.

## Visual query editor in the Fabric portal

The Visual query editor provides an easy visual interface to write queries against the data in your warehouse.

Once you've loaded data into your warehouse, you can use the Visual query editor to create queries to analyze your data. You can use the Visual query editor for a no-code experience to create your queries.

There are two ways to get to the Visual query editor:

In the ribbon, create a new query using the **New visual query** button, as shown in the following image.

:::image type="content" source="media\visual-query-editor\new-visual-query.png" alt-text="Screenshot showing where to find the New query menu in the Data preview view." lightbox="media\visual-query-editor\new-visual-query.png":::

To create a query, drag and drop tables from the **Object explorer** on the left onto the canvas. Once you drag one or more tables onto the canvas, you can use the visual experience to design your queries. The warehouse editor uses the Power Query diagram view experience to enable you to easily query and analyze your data. Learn more about [Power Query diagram view](/power-query/diagram-view).

As you work on your visual query, the queries are automatically saved every few seconds. A "saving indicator" appears in your query tab to indicate that your query is being saved.

The following image shows a sample query created using the no-code Visual query editor to retrieve the **Top customers by Orders**.

:::image type="content" source="media\visual-query-editor\sample-query-top-customers.png" alt-text="Screenshot of the results of a sample query to retrieve top customers by orders." lightbox="media\visual-query-editor\sample-query-top-customers.png":::

When you see results, you can use **Download Excel file** to view results in Excel or **Visualize results** to create report on results. 

## Create a cross-warehouse query in Visual query editor

1. Add [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) from your current active workspace to object Explorer using **+ Warehouses** action. When you select [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md) or [[!INCLUDE [fabric-dw](includes/fabric-dw.md)]](warehouse.md) from the dialog, it gets added into the **Object Explorer** for referencing when writing a SQL query or creating Visual query.

:::image type="content" source="media\visual-query-editor\add-warehouses.png" alt-text="Screenshot of adding warehouses or SQL endpoint from current active workspace." lightbox="media\visual-query-editor\add-warehouses.png":::

2. To create a cross-warehouse query, drag and drop tables from added warehouses and add merge activity. For example, in the image, `store_sales` is added from `sales` warehouse and it is merged with `item` table from `marketing` warehouse.

:::image type="content" source="media\visual-query-editor\cross-warehouse-query-visual-query-editor.png" alt-text="Screenshot of sample cross-warehouse query between Sales and marketing database and Power Query activities." lightbox="media\visual-query-editor\cross-warehouse-query-visual-query-editor.png":::


## Known limitations with Visual query editor

- You can only write DQL (not DDL or DML).

## Next steps

- [How-to: Query the Synapse Data Warehouse](query-warehouse.md)
- [Query using the SQL Query editor](sql-query-editor.md)
