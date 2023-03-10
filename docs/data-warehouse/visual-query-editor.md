---
title: Query using the Visual Query editor
description: Learn how to use the Visual Query editor.
ms.reviewer: wiassaf
ms.author: salilkanade
author: cynotebo
ms.topic: how-to
ms.date: 03/15/2023
---

# Query using the Visual Query editor

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

You can query the data in your warehouse with multiple tools, including the Visual Query editor and the [SQL Query editor](sql-query-editor.md) among others. This article describes how to use the Visual Query editor to quickly and efficiently write queries, and suggestions on how best to see the information you need.

> [!TIP]
> Applies to: Warehouse (default) and warehouse

The Visual query editor provides an easy visual interface to write queries against the data in your warehouse.

Once you've loaded data into your warehouse, you can use the Visual Query editor to create queries to analyze your data. You can use the Visual Query editor for a no-code experience to create your queries.

There are two ways to get to the Visual query editor:

In the **Data grid** view, create a new query using the **+ New Query** button on the ribbon, as shown in the following image.

:::image type="content" source="media\visual-query-editor\new-query-button.png" alt-text="Screenshot showing where to find the New query menu in the Data grid view." lightbox="media\visual-query-editor\new-query-button.png":::

Alternatively, you can use the **Design view** icon found along the bottom of the Warehouse editor window, shown in the following image.

:::image type="content" source="media\visual-query-editor\design-view-icon.png" alt-text="Screenshot of Design view icon." lightbox="media\visual-query-editor\design-view-icon.png":::

To create a query, drag and drop tables from the Object explorer on the left onto the canvas.

:::image type="content" source="media\visual-query-editor\explorer-and-canvas.png" alt-text="Screenshot of the Object explorer and canvas." lightbox="media\visual-query-editor\explorer-and-canvas.png":::

Once you drag one or more tables onto the canvas, you can use the visual experience to design your queries. The warehouse editor uses the similar Power Query diagram view experience to enable you to easily query and analyze your data. Learn more about [Power Query diagram view](/power-query/diagram-view).

As you work on your Visual query, the queries are automatically saved every few seconds. A “saving indicator” appears in your query tab at the bottom to indicate that your query is being saved.

The following image shows a sample query created using the no-code Visual Query editor to retrieve the **Top customers by Orders**.

:::image type="content" source="media\visual-query-editor\sample-query-top-customers.png" alt-text="Screenshot of the results of a sample query to retrieve top customers by orders." lightbox="media\visual-query-editor\sample-query-top-customers.png":::

## Known limitations with Visual Query editor

- You can only write DQL (not DDL or DML).
- You can't currently open the visual query in Excel.

## Next steps

- [Query using the SQL Query editor](sql-query-editor.md)
