---
title: Query using the SQL query editor
description: Learn how to use the SQL query editor.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: how-to
ms.search.form: Query Editor
---

# Query using the SQL query editor

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can [query the data](query-warehouse.md) in your warehouse with multiple tools, including the [Visual query editor](visual-query-editor.md) and the SQL query editor in the [!INCLUDE [product-name](../includes/product-name.md)] portal. This article describes how to use the SQL query editor to quickly and efficiently write queries, and suggestions on how best to see the information you need.

## SQL query editor in the Fabric portal

The SQL query editor provides a text editor to write queries using T-SQL. 

- To access the built-in SQL query editor, select the **Query** icon located at the bottom of the warehouse editor window.

   :::image type="content" source="media\sql-query-editor\query-button-ribbon.png" alt-text="Screenshot showing the SQL query editor query icon." lightbox="media\sql-query-editor\query-button-ribbon.png":::

- Alternatively, in the warehouse editor ribbon, create a new query using the **New SQL query** button. If you select the dropdown, you can easily create T-SQL objects with code templates that will populate in your SQL query window, as shown in the following image.

   :::image type="content" source="media\sql-query-editor\new-sql-query-dropdown-templates.png" alt-text="Screenshot showing where to find the New query menu on the Data preview view ribbon." lightbox="media\sql-query-editor\new-sql-query-dropdown-templates.png":::

The SQL query editor provides support for IntelliSense, code completion, syntax highlighting, client-side parsing, and validation. You can run Data Definition Language (DDL), Data Manipulation Language (DML) and Data Control Language (DCL) statements. For more information on limitations for Transaction Control Language statement runs, see [Limitations](#limitations).

### View query results

Once you've written the T-SQL query, select **Run** to execute the query.

The **Results** preview is displayed in the **Results** section. If number of rows returned is more than 10,000 rows, the preview is limited to 10,000 rows. You can search string within results grid to get filtered rows matching search criteria. The **Messages** tab shows SQL messages returned when SQL query is run.

The status bar indicates the query status, duration of the run and number of rows and columns returned in results.

- When you run multiple queries and those return multiple results, you can select results drop down to see individual results.

   :::image type="content" source="media\sql-query-editor\sql-query-editor-overview.png" alt-text="Screenshot of the query editor window with results." lightbox="media\sql-query-editor\sql-query-editor-overview.png":::

- To enable **Save as view**, **Save as table**, **Download Excel file**, and **Visualize results** menus, select the SQL statement containing SELECT statement in the SQL query editor.

   :::image type="content" source="media\sql-query-editor\editor-commands.png" alt-text="Screenshot of the query editor window. Command buttons are boxed in red." lightbox="media\sql-query-editor\editor-commands.png":::

- You can select the query and save your query as a view using the **Save as view** button. Select the schema name, provide name of view and verify the SQL statement before confirming creating view. When view is successfully created, it will appear in the Explorer.

   :::image type="content" source="media\sql-query-editor\save-as-view.png" alt-text="Screenshot showing how to use Save as view menu" lightbox="media\sql-query-editor\save-as-view.png":::

- You can use **Save as table** to save your query results into a table. Select the warehouse in which you would like to save results, select schema and provide table name to load results into the table using [CREATE TABLE AS SELECT](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true) statement. When table is successfully created, it will appear in the Explorer.

   :::image type="content" source="media\sql-query-editor\save-as-table.png" alt-text="Screenshot showing how to use Save as table menu" lightbox="media\sql-query-editor\save-as-table.png":::

- The **Download Excel file** button opens the corresponding T-SQL Query to Excel and executes the query, enabling you to view the results in Excel.

   :::image type="content" source="media\sql-query-editor\download-excel-file.png" alt-text="Screenshot showing how to use Download Excel file menu" lightbox="media\sql-query-editor\download-excel-file.png":::

- **Visualize results** allows you to create reports from your query results within the SQL query editor.

   :::image type="content" source="media\sql-query-editor\visualize-results.png" alt-text="Screenshot showing how to use Visualize results menu" lightbox="media\sql-query-editor\visualize-results.png":::

   As you work on your SQL query, the queries are automatically saved every few seconds. A "saving" indicator appears in your query tab at the bottom to indicate that your query is being saved.

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

- In SQL query editor, when you select **Run** button, you are submitting an independent batch request to execute. The SQL query editor does not support `sp_set_session_context`. Each **Run** action in the SQL query editor is a batch request, and a session only exists per batch. Each execution of code in the same query window will run in a different batch and session.

   For example, when independently executing transaction statements, session context is not retained. In the following screenshot, `BEGIN TRAN` was executed in the first request, but since the second request was executed in a different session, there is no transaction to commit, resulting into the failure of commit/rollback operation.

   :::image type="content" source="media\sql-query-editor\transaction-run-error.png" alt-text="Screenshot showing independent run of transactions failed in SQL query editor" lightbox="media\sql-query-editor\transaction-run-error.png":::

   For example, when you define temp table in the first batch request and try to use it in subsequent batch runs in the same query tab, it throws error.

   :::image type="content" source="media\sql-query-editor\temp-table-run-error.png" alt-text="Screenshot showing multiple runs of temp table failed in SQL query editor" lightbox="media\sql-query-editor\temp-table-run-error.png":::

- The following table summarizes the expected behavior will not match with SQL Server Management Studio/Azure Data Studio:

   | **Scenario** | **Supported in SSMS/ADS** | **Supported in SQL query editor in Fabric portal** |
   |---|---|---|
   |Using [USE (Transact-SQL)](/sql/t-sql/language-elements/use-transact-sql) |Yes|No|
   |Using [SET Statements (Transact-SQL)](/sql/t-sql/statements/set-statements-transact-sql) to set properties for session |Yes|No|
   |Referencing temp tables in open SQL query tab for multiple batch executions |Yes|No|
   |Using [sp_set_session_context (Transact-SQL)](/sql/relational-databases/system-stored-procedures/sp-set-session-context-transact-sql) for multiple batch statements runs |Yes|No|
   |[Transactions (Transact-SQL)](/sql/t-sql/language-elements/transactions-transact-sql) (unless executed as a single batch request) |Yes|No|

## Next steps

- [How-to: Query the Synapse Data Warehouse](query-warehouse.md)
- [Query using the Visual Query editor](visual-query-editor.md)