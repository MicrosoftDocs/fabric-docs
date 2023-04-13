---
title: Query using the Visual Query editor
description: Learn how to use the Visual Query editor.
author: salilkanade
ms.author: salilkanade
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: how-to
ms.search.form: Query Editor
---

# Query using the Visual Query editor

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can [query the data](query-warehouse.md) in your warehouse with multiple tools, including the Visual query editor and the [SQL Query editor](sql-query-editor.md) among others. This article describes how to use the Visual Query editor to quickly and efficiently write queries, and suggestions on how best to see the information you need.

## Visual Query editor in the Fabric portal

The Visual Query editor provides an easy visual interface to write queries against the data in your warehouse.

Once you've loaded data into your warehouse, you can use the Visual Query editor to create queries to analyze your data. You can use the Visual Query editor for a no-code experience to create your queries.

There are two ways to get to the Visual Query editor:

In the ribbon, create a new query using the **New visual query** button, as shown in the following image.

:::image type="content" source="media\visual-query-editor\newvisualquery.png" alt-text="Screenshot showing where to find the New query menu in the Data grid view." lightbox="media\visual-query-editor\newvisualquery.png":::

To create a query, drag and drop tables from the Object explorer on the left onto the canvas. Once you drag one or more tables onto the canvas, you can use the visual experience to design your queries. The warehouse editor uses the similar Power Query diagram view experience to enable you to easily query and analyze your data. Learn more about [Power Query diagram view](/power-query/diagram-view).

As you work on your visual query, the queries are automatically saved every few seconds. A "saving indicator" appears in your query tab at the bottom to indicate that your query is being saved.

The following image shows a sample query created using the no-code Visual Query editor to retrieve the **Top customers by Orders**.

:::image type="content" source="media\visual-query-editor\sample-query-top-customers.png" alt-text="Screenshot of the results of a sample query to retrieve top customers by orders." lightbox="media\visual-query-editor\sample-query-top-customers.png":::

## Known limitations with Visual Query editor

- You can only write DQL (not DDL or DML).
- You can't currently open a visual query in Microsoft Excel.

## Next steps

- [How-to: Query the Synapse Data Warehouse](query-warehouse.md)
- [Query using the SQL Query editor](sql-query-editor.md)
