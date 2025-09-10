---
title: Query with the SQL Editor
description: Learn how to use the SQL database query editor in the Microsoft Fabric portal
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: yoleichen
ms.date: 09/09/2025
ms.topic: how-to
ms.search.form: Develop and run queries in SQL editor
---

# Query with the SQL query editor

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

This article describes how to use the SQL query editor in the Microsoft Fabric portal.

The SQL query editor provides support for IntelliSense, code completion, syntax highlighting, client-side parsing, and validation. You can run Data Definition Language (DDL), Data Manipulation Language (DML), and Data Control Language (DCL) statements.

You can also query the data in your database with multiple tools with a [SQL connection string](connect.md).

## SQL query editor in the Fabric portal

The SQL query editor provides a text editor to write queries using T-SQL.

To access the built-in SQL query editor, create a new query using the **New SQL query** button. If you select the dropdown list, you can easily create T-SQL objects with code templates that populate in your SQL query window.

:::image type="content" source="media/query-editor/query-editor-and-templates.png" alt-text="Screenshot from the Fabric portal of the SQL query editor and templates.":::

As you work on your SQL query, the queries are automatically saved every few seconds. A "saving" indicator appears in your query tab to indicate that your query is being saved.

All saved queries are accessible from the **Explorer**, organized into two folders:

- **My queries** folder contains your personal queries, visible only to you.

- **Shared queries** folder contains queries that can be viewed and edited by any admin, contributor, or member in your workspace, enabling collaborative development and knowledge sharing.

:::image type="content" source="media/query-editor/queries-folder.png" alt-text="Screenshot from the Fabric portal of the Queries folder.":::

### View query results

Once you've written the T-SQL query, select **Run** to execute the query. Two tabs contain the query result set and information.

- The result set of data is displayed in the **Results** tab.
   - You can further search for strings within the results grid to get filtered rows matching search criteria.
   - If number of rows returned is more than 10,000 rows, the preview is limited to 10,000 rows. To view the entire result set, you can query the data with other tools using the [SQL connection string](connect.md).
- The **Messages** tab shows SQL messages returned when SQL query is run.
- The status bar indicates the query status, duration of the run and number of rows and columns returned in results.

   :::image type="content" source="media/query-editor/run-results-tab.png" alt-text="Screenshot from the Fabric portal of the SQL query editor results tab and resultset." lightbox="media/query-editor/run-results-tab.png":::

#### Data Preview

After creating a table or view, select the object in the **Explorer** to preview its definition and data (top 1000 rows). In the **Data Preview** grid, you can search for values, sort the column alphabetically or numerically, and hide or show values.

:::image type="content" source="media/query-editor/data-preview.png" alt-text="Screenshot from the Fabric portal of the Data Preview grid." lightbox="media/query-editor/data-preview.png":::

#### Save as view

You can save your query as a view using the **Save as view** button.

Select the schema name that you have access to create views, provide name of view and verify the SQL statement before confirming creating view. When view is successfully created, it appears in the **Explorer**.

:::image type="content" source="media/query-editor/save-as-view.png" alt-text="Screenshot from the Fabric portal of the SQL query editor of the Save as View feature window.":::

#### Copy

The **Copy** dropdown list allows you to copy the results and/or column names in the data grid. You can choose to copy results with column names, just copy the results only, or just copy the column names only.

:::image type="content" source="media/query-editor/copy-results.png" alt-text="Screenshot from the Fabric portal of the Copy drop down." lightbox="media/query-editor/copy-results.png":::

#### Download as Excel/JSON/CSV

You can download your result set as a Microsoft Excel (.xlsx) file using the download button. You can also download JSON or CSV versions of the result set data, as well as copy/paste the result set to your clipboard.

:::image type="content" source="media/query-editor/download-results-in-xlsx.png" alt-text="Screenshot from the Fabric portal of the SQL query editor showing the Download results button.":::

#### Multiple result sets

When you run multiple queries and those return multiple results, you can select results dropdown list to see individual results.

   :::image type="content" source="media/query-editor/multiple-result-sets.png" alt-text="Screenshot from the Fabric portal of the SQL query editor showing multiple result sets in the dropdown list.":::

## Copilot

The SQL query editor is powered by [Copilot for SQL database](copilot.md). It is designed to accelerate database development by leveraging generative AI to simplify and automate database management and improving the efficiency of writing T-SQL queries. Copilot is contextualized to your database's schema and can generate answers catered for you.

Copilot for SQL database offers a variety of features. For more information, visit [Features of Copilot for SQL database in Microsoft Fabric](copilot.md#features-of-copilot-for-sql-database-in-fabric).

Before your business can start using Copilot for SQL database, you need to [enable Copilot](../../fundamentals/copilot-enable-fabric.md).

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

To find more keyboard shortcuts, press `F1` to open the **Command Palette** and view the entire list of keyboard shortcuts.

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
