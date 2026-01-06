---
title: Query Using the SQL Query Editor
description: Learn how to use the SQL query editor.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: prlangad, jacindaeng, pradeepsrikakolapu
ms.date: 01/05/2026
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.custom:
  - sfi-image-nochange
ms.search.form: Query editor # This article's title should not change. If so, contact engineering.
---
# Query using the SQL query editor

**Applies to:** [!INCLUDE [fabric-se-dw-mirroreddb](includes/applies-to-version/fabric-se-dw-mirroreddb.md)]

This article describes how to use the SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal to quickly and efficiently write queries, and suggestions on how best to see the information you need.

- You can also [query the data](query-warehouse.md) in your warehouse with multiple tools with a [SQL connection string](connectivity.md).
- You can build queries graphically with the [Visual query editor](visual-query-editor.md).
- You can quickly [view data in the Data preview](data-preview.md).

The SQL query editor provides support for IntelliSense, code completion, syntax highlighting, client-side parsing, and validation. You can run Data Definition Language (DDL), Data Manipulation Language (DML), and Data Control Language (DCL) statements.

## SQL query editor in the Fabric portal

The SQL query editor provides a text editor to write queries using T-SQL. To access the built-in SQL query editor:

- Create a new query using the **New SQL query** button in the ribbon.

   :::image type="content" source="media/sql-query-editor/home-ribbon-select-new.png" alt-text="Screenshot showing where to find the New query menu in the ribbon." lightbox="media/sql-query-editor/home-ribbon-select-new.png":::

- If you select **SQL templates** dropdown list, you can easily create T-SQL objects with code templates that populate in your SQL query window, as shown in the following image.

   :::image type="content" source="media/sql-query-editor/new-sql-query-dropdown-templates.png" alt-text="Screenshot showing where to find the SQL templates in the ribbon." lightbox="media/sql-query-editor/new-sql-query-dropdown-templates.png":::

As you work on your SQL query, the queries are automatically saved every few seconds. A "saving" indicator appears in your query tab to indicate that your query is being saved.

## Multitask between tabs for data preview, querying, and modeling

The data preview, querying, and modeling experience opens up as individual tabs that you can multitask between in the editor. If you're writing a query, you can switch between seeing a preview of the data and viewing the relationships between tables that you're writing the query for. To view or close all tabs, select the icon on the right of all tabs.

:::image type="content" source="media/sql-query-editor/multitask-tabs.png" alt-text="Screenshot showing where to show the tabs for data preview, querying, and modeling." lightbox="media/sql-query-editor/multitask-tabs.png":::

### View query results

Once you've written the T-SQL query, select **Run** to execute the query.

The **Results** preview is displayed in the **Results** section. If number of rows returned is more than 10,000 rows, the preview is limited to 10,000 rows. You can search string within results grid to get filtered rows matching search criteria. The **Messages** tab shows SQL messages returned when SQL query is run.

The status bar indicates the query status, duration of the run and number of rows and columns returned in results.

To enable **Save as view**, **Save as table**, **Open in Excel**, **Explore this data (preview)**, and **Visualize results** menus, highlight the SQL statement containing `SELECT` statement in the SQL query editor.

   :::image type="content" source="media/sql-query-editor/sql-editor-commands.png" alt-text="Screenshot of the query editor window. Command buttons are boxed in red." lightbox="media/sql-query-editor/editor-commands.png":::

#### Save as view

You can select the query and save your query as a view using the **Save as view** button. Select the schema name that you have access to create views, provide name of view and verify the SQL statement before confirming creating view. When view is successfully created, it appears in the **Explorer**.

   :::image type="content" source="media/sql-query-editor/save-as-view.png" alt-text="Screenshot showing how to use Save as view menu.":::

#### Save as table

You can use **Save as table** to save your query results into a table. Select the warehouse in which you would like to save results, select schema that you have access to create tables and provide table name to load results into the table using [CREATE TABLE AS SELECT](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) statement. When table is successfully created, it appears in the **Explorer**.

   :::image type="content" source="media/sql-query-editor/save-as-table.png" alt-text="Screenshot showing how to use Save as table menu.":::

#### Open in Excel

The **Open in Excel** button opens the corresponding T-SQL Query to Excel and executes the query, enabling you to work with the results in Microsoft Excel on your local computer.

   :::image type="content" source="media/sql-query-editor/open-in-excel-popup.png" alt-text="Screenshot showing how to use Open in Excel file menu." lightbox="media/sql-query-editor/open-in-excel-popup.png":::

Follow these steps to work with the Excel file locally:

1. After you select the **Continue** button, locate the downloaded Excel file in your Windows File Explorer, for example, in the **Downloads** folder of your browser.
1. To see the data, select the **Enable Editing** button in the **Protected View** ribbon followed by the **Enable Content** button in the **Security Warning** ribbon. Once both are enabled, you're presented with the following dialog to approve running the query listed.
   :::image type="content" source="media/sql-query-editor/native-database-query.png" alt-text="Screenshot from Microsoft Excel showing the Native Database Query dialog." lightbox="media/sql-query-editor/native-database-query.png":::

1. Select **Run**.
1. Authenticate your account with the Microsoft account option. Select **Connect**.
   :::image type="content" source="media/sql-query-editor/sql-server-database-authentication.png" alt-text="Screenshot from Microsoft Excel showing the SQL Server database dialog." lightbox="media/sql-query-editor/sql-server-database-authentication.png":::

Once you have successfully signed in, you see the data presented in the spreadsheet.

#### Explore this data (preview)

**Explore this data (preview)** provides the capability to perform ad hoc exploration of your query results. With this feature, you can launch a side-by-side matrix and visual view to better understand any trends or patterns behind your query results before diving into building a full Power BI report. For more information, see [Explore your data in the Power BI service](/power-bi/consumer/explore-data-service).

#### Visualize results

**Visualize results** allows you to create reports from your query results within the SQL query editor.

   :::image type="content" source="media/sql-query-editor/visualize-results-query.png" alt-text="Screenshot showing how to use Visualize results menu." lightbox="media/sql-query-editor/visualize-results-query.png":::

#### Copy

The **Copy** dropdown list allows you to copy the results and/or column names in the data grid. You can choose to copy results with column names, just copy the results only, or just copy the column names only.

   :::image type="content" source="media/sql-query-editor/copy-dropdown.png" alt-text="Screenshot showing the options in the Copy dropdown menu." lightbox="media/sql-query-editor/copy-dropdown.png":::

#### Multiple result sets

When you run multiple queries and those return multiple results, you can select results dropdown list to see individual results.

   :::image type="content" source="media/sql-query-editor/sql-query-editor-overview.png" alt-text="Screenshot of the query editor window with results." lightbox="media/sql-query-editor/sql-query-editor-overview.png":::

## Cross-warehouse querying

For more information on cross-warehouse querying, see [Cross-warehouse querying](query-warehouse.md#write-a-cross-database-query).

You can write a T-SQL query with three-part naming convention to refer to objects and join them across warehouses, for example:

```sql
SELECT
   emp.Employee
   ,SUM(Profit) AS TotalProfit
   ,SUM(Quantity) AS TotalQuantitySold
FROM
   [SampleWarehouse].[dbo].[DimEmployee] as emp
JOIN
   [WWI_Sample].[dbo].[FactSale] as sale
ON
   emp.EmployeeKey = sale.SalespersonKey
WHERE
   emp.IsSalesperson = 'TRUE'
GROUP BY
   emp.Employee
ORDER BY
   TotalProfit DESC;
```

## Manage running queries when closing the query editor

When a query is still running and you close the query editor tab, you can decide whether the query should continue running in the background or be canceled. 

- **Yes, keep running the query**: The query continues to execute in the background, with a toast notification indicating it's running. When the query finishes, a notification will alert you so you can return to the query to view the results.

- **No, cancel the query**: The query is terminated immediately. This is useful to free up resources or stop queries you no longer need.

- **Remember my preference and don't show again**: Saves your choice locally in your browser cookies.

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
| Go one word right | Ctrl + Right arrow key |
| Indent increase | Tab |
| Indent decrease | Shift + Tab |
| Comment | Ctrl + K, Ctrl + C |
| Uncomment | Ctrl + K, Ctrl + U |
| Move cursor up | ↑ |
| Move cursor down | ↓ |
| Select All | Ctrl + A |

## Limitations

- In SQL query editor, every time you run the query, it opens a separate session and closes it at the end of the execution. This means if you set up session context for multiple query runs, the context is not maintained for independent execution of queries.

- You can run Data Definition Language (DDL), Data Manipulation Language (DML), and Data Control Language (DCL) statements, but there are limitations for Transaction Control Language (TCL) statements. In the SQL query editor, when you select the **Run** button, you're submitting an independent batch request to execute. Each **Run** action in the SQL query editor is a batch request, and a session only exists per batch. Each execution of code in the same query window runs in a different batch and session.

  - For example, when independently executing transaction statements, session context is not retained. In the following screenshot, `BEGIN TRAN` was executed in the first request, but since the second request was executed in a different session, there is no transaction to commit, resulting into the failure of commit/rollback operation. If the SQL batch submitted does not include a `COMMIT TRAN`, the changes applied after `BEGIN TRAN` will not commit.

   :::image type="content" source="media/sql-query-editor/transaction-run-error.png" alt-text="Screenshot showing independent run of transactions failed in SQL query editor." lightbox="media/sql-query-editor/transaction-run-error.png":::

  - The SQL query editor does not support `sp_set_session_context`.

  - In the SQL query editor, the `GO` SQL command creates a new independent batch in a new session.

- When you are running a SQL query with [USE](/sql/t-sql/language-elements/use-transact-sql?view=fabric&preserve-view=true), you need to submit the SQL query with `USE` as one single request.

- **Visualize results** currently does not support SQL queries with an `ORDER BY` clause.

- T-SQL statements that use the T-SQL `OPTION` syntax are not currently supported in the **Explore this data** or **Visualize results** options with DirectQuery mode. The workaround is to create visualizations in Power BI Desktop using **Import** mode.

- The following table summarizes the expected behavior will not match with [SQL Server Management Studio](/sql/ssms/download-sql-server-management-studio-ssms) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true):

   | **Scenario** | **Supported in SSMS/ADS** | **Supported in SQL query editor in Fabric portal** |
   |---|---|---|
   |Using [SET Statements (Transact-SQL)](/sql/t-sql/statements/set-statements-transact-sql?view=fabric&preserve-view=true) to set properties for session |Yes|No|
   |Using [sp_set_session_context (Transact-SQL)](/sql/relational-databases/system-stored-procedures/sp-set-session-context-transact-sql?view=fabric&preserve-view=true) for multiple batch statements runs |Yes|No|
   |[Transactions (Transact-SQL)](transactions.md) (unless executed as a single batch request) |Yes|No|

## Related content

- [Manage objects in your data warehouse](manage-objects.md)
- [Query using the Visual Query editor](visual-query-editor.md)

- [Tutorial: Create cross-warehouse queries with the SQL query editor](tutorial-sql-cross-warehouse-query-editor.md)

## Next step

> [!div class="nextstepaction"]
> [How-to: Query the Warehouse](query-warehouse.md)
