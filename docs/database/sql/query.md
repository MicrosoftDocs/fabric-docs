---
title: "Query your SQL database"
description: Learn how to query your SQL database in Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 11/01/2024
ms.topic: how-to
ms.custom:
---
# Query your SQL database in Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

You can query Fabric SQL database just like any other SQL Server database, using [SQL Server Management Studio](connect.md#connect-with-sql-server-management-studio-manually) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true). Fabric SQL database also includes a lightweight, browser-based query editor that we use here.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database](create.md) or use an existing SQL database.

## Get a quick look at the data

For lightweight queries where you just want to see the structure of a table, the type of data in the table or even what columns the table has, just select on table's name in the **Object Explorer**. The top 1,000 rows will automatically be returned.

If you want to write a new query with T-SQL, select the **New Query** button from the toolbar of the query editor. 

> [!TIP] 
> To get a head start on the basic structure of a query, select the `...` on the table name, and select **SELECT TOP 1000 rows** from the menu.
> Or, create a new query using the **New SQL query** dropdown list, then create T-SQL scripts with code templates that populate in your SQL query window.

## Ask Copilot to write a query

Copilot can also be used to write a query, and will translate [natural language prompts to T-SQL](copilot-chat-pane.md).

1. Start with a database with some data. For example, try the [AdventureWorks sample data](load-adventureworks-sample-data.md).
1. Select **New Query** in the ribbon.  
1. Type the following text as a T-SQL comment, then press the tab key:

   ```sql
   --I need to query order history, by count and value, grouped by customer company name   
   ```

1. You should see a suggestion like this:

   :::image type="content" source="media/query/t-sql-query-with-copilot.png" alt-text="Screenshot from the Fabric portal showing the results of a Copilot query suggestion on the AdventureWorksLT sample database." lightbox="media/query/t-sql-query-with-copilot.png":::

1. Press the tab key to accept the suggested T-SQL code.
1. Review the query.
1. Select **Run** from the toolbar of the query window and review the results.

For more on query capabilities with the SQL database query editor in the Fabric portal, see [Query with the SQL query editor](query-editor.md).

## Next step

> [!div class="nextstepaction"]
> [Query the SQL analytics endpoint of your SQL database in Fabric](query-sql-analytics-endpoint.md)

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
