---
title: Query with the SQL Query Editor
description: Learn how to use the SQL database query editor in the Fabric portal.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: yoleichen, pradeepsrikakolapu
ms.date: 01/05/2026
ms.topic: how-to
ms.search.form: Develop and run queries in SQL editor
---

# Query with the SQL query editor

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article describes how to use the SQL query editor in the Fabric portal.

The SQL query editor provides support for IntelliSense, code completion, syntax highlighting, client-side parsing, and validation. You can run Data Definition Language (DDL), Data Manipulation Language (DML), and Data Control Language (DCL) statements.

You can also [connect to your SQL database](connect.md) with SQL connection string or directly open in SQL Server Management Studio (SSMS) or MSSQL Extension for Visual Studio Code.

## SQL query editor in the Fabric portal

The SQL query editor provides a text editor to write queries using T-SQL.

To start writing T-SQL, create a new query using the **New SQL query** button. If you select the dropdown list, you can easily create T-SQL objects with code templates that populate in your SQL query window.

:::image type="content" source="media/query-editor/query-editor-and-templates.png" alt-text="Screenshot from the Fabric portal of the SQL query editor and templates.":::

#### My Queries and Shared Queries

As you work on your SQL query, the queries are automatically saved every few seconds. A "saving" indicator appears in your query tab to indicate that your query is being saved.

All saved queries are accessible from the **Explorer**, organized into two folders:

- **My queries** folder contains your personal queries, visible only to you.

- **Shared queries** folder contains queries that can be viewed and edited by any admin, contributor, or member in your workspace, enabling collaborative development and knowledge sharing.

:::image type="content" source="media/query-editor/queries-folder.png" alt-text="Screenshot from the Fabric portal of the Queries folder.":::

To delete multiple queries at once, hold `Ctrl` (Windows) or `Cmd` (macOS) to select multiple non-adjacent queries, or hold `Shift` to select a range of queries. Then, right-click or select the ellipse to delete.

:::image type="content" source="media/query-editor/bulk-query-delete.png" alt-text="Screenshot from the Fabric portal showing how to delete multiple queries at once.":::

#### SQL Code Snippets

Aside from using **Templates** from the ribbon to quickly create database objects with predefined templates, you can also type `sql` while writing your query to insert a SQL code snippet. Choose the name of the code snippet from the list, and the T-SQL template will appear in the query editor.

:::image type="content" source="media/query-editor/code-snippets.png" alt-text="Screenshot from the Fabric portal query editor showing code snippets.":::

### View query results

Once you've written the T-SQL query, select **Run** to execute the query. Two tabs contain the query result set and information.

- The result set of data is displayed in the **Results** tab.
   - You can further search for strings within the results grid to get filtered rows matching search criteria.
  - If number of rows returned is more than 10,000 rows, the preview is limited to 10,000 rows. To view the entire result set, you can also [connect to your SQL database](connect.md) with SQL connection string or directly open in SQL Server Management Studio (SSMS) or MSSQL Extension for Visual Studio Code.
    
- The **Messages** tab shows SQL messages returned when SQL query is run.
- The status bar indicates the query status, duration of the run and number of rows and columns returned in results.

   :::image type="content" source="media/query-editor/run-results-tab.png" alt-text="Screenshot from the Fabric portal of the SQL query editor results tab and resultset." lightbox="media/query-editor/run-results-tab.png":::

#### Data Preview

After creating a table or view, select the object in the **Explorer** to preview its definition and data (top 1,000 rows). In the **Data Preview** grid, you can search for values, sort the column alphabetically or numerically, and hide or show values.

:::image type="content" source="media/query-editor/data-preview.png" alt-text="Screenshot from the Fabric portal of the Data Preview grid." lightbox="media/query-editor/data-preview.png":::

#### Save as view

You can save your query as a view using the **Save as view** button.

Select the schema name that you have access to create views, provide name of view and verify the SQL statement before confirming creating view. When view is successfully created, it appears in the **Explorer**.

:::image type="content" source="media/query-editor/save-as-view.png" alt-text="Screenshot from the Fabric portal of the SQL query editor of the Save as View feature window.":::

#### Copy

The **Copy** dropdown list allows you to copy the results and/or column names in the data grid. You can choose to copy results with column names, just copy the results only, or just copy the column names only.

:::image type="content" source="media/query-editor/copy-results.png" alt-text="Screenshot from the Fabric portal of the Copy drop down." lightbox="media/query-editor/copy-results.png":::

#### Download as Excel/JSON/CSV

You can download your result set as a Microsoft Excel (.xlsx) file using the download button. You can also download JSON or CSV versions of the result set data, and copy/paste the result set to your clipboard.

:::image type="content" source="media/query-editor/download-results-in-xlsx.png" alt-text="Screenshot from the Fabric portal of the SQL query editor showing the Download results button.":::

#### Multiple result sets

When you run multiple queries and those return multiple results, you can select results dropdown list to see individual results.  
:::image type="content" source="media/query-editor/multiple-result-sets.png" alt-text="Screenshot from the Fabric portal of the SQL query editor showing multiple result sets in the dropdown list.":::

## Copilot

The SQL query editor is powered by [Copilot for SQL database](copilot.md). It's designed to accelerate database development by using generative AI to simplify and automate database management and improving the efficiency of writing T-SQL queries. Copilot is contextualized to your database's schema and can generate answers catered for you.

For more information, visit [Features of Copilot for SQL database in Microsoft Fabric](copilot.md#features-of-copilot-for-sql-database-in-fabric).

Before your business can start using Copilot for SQL database, you need to [enable Copilot](../../fundamentals/copilot-enable-fabric.md).

## Manage running queries when closing the query editor

When a query is still running and you close the query editor tab, you can decide whether the query should continue running in the background or be canceled. 

- **Yes, keep running the query**: The query continues to execute in the background, with a toast notification indicating it's running. When the query finishes, a notification will alert you so you can return to the query to view the results.

- **No, cancel the query**: The query is terminated immediately. This is useful to free up resources or stop queries you no longer need.

- **Remember my preference and don't show again**: Saves your choice locally in your browser cookies.

## Keyboard shortcuts

Keyboard shortcuts provide a quick way to navigate and allow users to work more efficiently in SQL query editor. The table in this article lists all the shortcuts available in SQL query editor in the Microsoft Fabric portal:

| **Function** | **Windows** **Shortcut** |**macOS Shortcut**|
|---|---| -------- |
| New SQL query | `Ctrl + J` | `Cmd + J`|
| Close current tab | `Ctrl + Shift + F4` | `Cmd + Shift + F4` |
| Run SQL Script| `Ctrl + Enter, Shift +Enter`|`Cmd + Enter, Shift +Enter`|
| Search string | `Ctrl + F` |`Cmd + F`|
| Replace string | `Ctrl + H` | `Cmd + H`|
| Undo | `Ctrl + Z` |`Cmd + Z`|
| Redo | `Ctrl + Y` |`Cmd + Y`|
| Go one word left | `Ctrl + Left arrow key` | `Cmd + Left arrow key` |
| Go one word right | `Ctrl + Right arrow key` | `Cmd + Right arrow key` |
| Indent increase | `Tab` | `Tab` |
| Indent decrease | `Shift + Tab` | `Shift + Tab` |
| Move cursor up | `↑` | `↑` |
| Move cursor down | `↓` | `↓` |
| Select All | `Ctrl + A` | `Cmd + A` |

To view the list of keyboard shortcuts in the editor, select **Help > Keyboard Shortcuts** from the ribbon.

:::image type="content" source="media/query-editor/keyboard-shortcuts.png" alt-text="Screenshot from the Fabric portal showing keyboard shortcuts in the query editor." lightbox="media/query-editor/keyboard-shortcuts.png":::

Alternatively, press `F1` to open the Command Palette and view more built-in keyboard shortcuts. 

:::image type="content" source="media/query-editor/keyboard-shortcuts-command-palette.png" alt-text="Screenshot from the Fabric portal showing shortcuts in the Command Palette." lightbox="media/query-editor/keyboard-shortcuts-command-palette.png":::

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
