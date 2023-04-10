---
title: Query using the SQL Query editor
description: Learn how to use the SQL Query editor.
ms.reviewer: wiassaf
ms.author: salilkanade
author: salilkanade
ms.topic: how-to
ms.date: 03/15/2023
ms.search.form: Query Editor
---

# Query using the SQL Query editor

You can [query the data](query-warehouse.md) in your warehouse with multiple tools, including the [Visual Query editor](visual-query-editor.md) and the SQL Query editor in the Fabric portal. This article describes how to use the SQL Query editor to quickly and efficiently write queries, and suggestions on how best to see the information you need.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## SQL Query editor in the Fabric portal
The SQL Query editor provides a text editor to write queries using T-SQL. To access the built-in SQL query editor, select the **SQL query editor view** icon located at the bottom of the warehouse editor window.

:::image type="content" source="media\sql-query-editor\sql-query-editor-icon.png" alt-text="Screenshot showing the SQL query editor view icon." lightbox="media\sql-query-editor\sql-query-editor-icon.png":::

Alternatively, in the **Data grid** view, create a new query using the **+ New Query** button on the ribbon, as shown in the following image.

:::image type="content" source="media\sql-query-editor\data-grid-new-query.png" alt-text="Screenshot showing where to find the New query menu on the Data grid view ribbon." lightbox="media\sql-query-editor\data-grid-new-query.png":::

You can write your SQL query in the query editor window, which includes IntelliSense support. Once complete, select the **Run** button to execute the query. Query results appear in the results section. You can open the results in Excel for further analysis by selecting the **Open in Excel** button.

As you work on your SQL query, the queries are automatically saved every few seconds. A "saving indicator" appears in your query tab at the bottom to indicate that your query is being saved.

:::image type="content" source="media\sql-query-editor\save-indicator-sql-query.png" alt-text="Screenshot of the query editor window." lightbox="media\sql-query-editor\save-indicator-sql-query.png":::

The SQL Query editor provides support for IntelliSense, code completion, syntax highlighting, client-side parsing and validation. Once you've written the T-SQL query, select **Run** to execute the query. The **Results** preview is displayed in the **Results** section. The **Open in Excel** button opens the corresponding T-SQL Query to Excel and executes the query, enabling you to view the results in Excel.

## Known limitations with SQL Query editor

Currently, you can only run read-only queries. To write statements to update data (DML) or modify schemas (DDL), [Query the Synapse Data Warehouse using SSMS](query-warehouse.md).

## Next steps

- [How-to: Query the Synapse Data Warehouse](query-warehouse.md)
- [Query using the Visual Query editor](visual-query-editor.md)
