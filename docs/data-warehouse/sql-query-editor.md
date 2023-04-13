---
title: Query using the SQL Query editor
description: Learn how to use the SQL Query editor.
author: salilkanade
ms.author: salilkanade
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: how-to
ms.search.form: Query Editor
---

# Query using the SQL Query editor

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can [query the data](query-warehouse.md) in your warehouse with multiple tools, including the [Visual Query editor](visual-query-editor.md) and the SQL Query editor in the Fabric portal. This article describes how to use the SQL Query editor to quickly and efficiently write queries, and suggestions on how best to see the information you need.

## SQL Query editor in the Fabric portal

The SQL Query editor provides a text editor to write queries using T-SQL. To access the built-in SQL query editor, select the **SQL query editor view** icon located at the bottom of the warehouse editor window.

:::image type="content" source="media\sql-query-editor\Screenshot 2023-04-12 190539.png" alt-text="Screenshot showing the SQL query editor view icon." lightbox="media\sql-query-editor\Screenshot 2023-04-12 190539.png":::

Alternatively, in the ribbon, create a new query using the **New SQL Query** button on the ribbon. If you click the dropdown, you can easily create T-SQL objects with code templates that will prepopulate in your SQL query window, as shown in the following image below.

:::image type="content" source="media\sql-query-editor\sqlquerynew.png" alt-text="Screenshot showing where to find the New query menu on the Data grid view ribbon." lightbox="media\sql-query-editor\sqlquerynew.png":::

The SQL Query editor provides support for IntelliSense, code completion, syntax highlighting, client-side parsing and validation. Once you've written the T-SQL query, select **Run** to execute the query. You can also save your query as a view using the **Save as view** button. The **Results** preview is displayed in the **Results** section. Use **Save as table** to save your query results into a table. The **Download Excel file** button opens the corresponding T-SQL Query to Excel and executes the query, enabling you to view the results in Excel. **Visualize Results** allows you to create reports from your query results within the Visual and SQL query editor.

As you work on your SQL query, the queries are automatically saved every few seconds. A "saving indicator" appears in your query tab at the bottom to indicate that your query is being saved.

:::image type="content" source="media\sql-query-editor\editorcommands.png" alt-text="Screenshot of the query editor window." lightbox="media\sql-query-editor\editorcommands.png":::



## Keyboard shortcuts

Keyboard shortcuts provide a quick way to navigate and allow users to work more efficiently in SQL query editor. The table in this article lists all the shortcuts available in SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal:

| **Function** | **Shortcut** |
|---|---|
| New SQL query | Ctrl + Q |
| Close current tab | Ctrl + Shift + F4 |
| Run SQL script | Ctrl + Enter, Shift +Enter |
| Cancel running SQL script | Alt+Break |
| Search string | Ctrl + F |
| Replace string | Ctrl + H |
| Undo | Ctrl + Z |
| Redo | Ctrl + Y |
| Go one word left | Ctrl + Left arrow key |
| Go one word right*| Ctrl + Right arrow key |
| Indent increase | Tab |
| Indent decrease | Shift + Tab |
| Comment | Ctrl + K, Ctrl + C |
| Uncomment | Ctrl + K, Ctrl + U |
| Move cursor up | ↑ |
| Move cursor down | ↓ |
|Select All | Ctrl + A |



## Next steps

- [How-to: Query the Synapse Data Warehouse](query-warehouse.md)
- [Query using the Visual Query editor](visual-query-editor.md)
