---
title: "Query the SQL analytics endpoint of your SQL database"
description: Learn how to query the SQL analytics endpoint of your SQL database in Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dlevy
ms.date: 11/01/2024
ms.topic: how-to
ms.search.form: Develop and run queries in SQL editor
ms.custom: sfi-image-nochange
---
# Query the SQL analytics endpoint of your SQL database in Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Every Fabric SQL database is created with a paired SQL analytics endpoint. This allows you to run all of your reporting queries against the OneLake copy of the data without worrying about impacting production. You should run all reporting queries against the SQL analytics endpoint. Query the SQL database directly only for those reports that require the most current data. 

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Make sure that you [Enable SQL database in Fabric using Admin Portal tenant settings](enable.md).
- [Create a new workspace](../../fundamentals/workspaces.md) or use an existing Fabric workspace.
- [Create a new SQL database](create.md) or use an existing SQL database.
- Consider loading the [AdventureWorks sample data](load-adventureworks-sample-data.md) in a new SQL database.

## Access the SQL analytics endpoint

The SQL analytics endpoint can be queried with T-SQL multiple ways:

- The first is via the workspace. Every SQL database is paired with a SQL analytics endpoint. The SQL analytics endpoint always display under the SQL database in item in the workspace list. You can access any of them by selecting them by name from the list.
        :::image type="content" source="media/query-sql-analytics-endpoint/workspace-item-list.png" alt-text="Screenshot from the Fabric portal showing the workspace item list, and the three objects created with a SQL database.":::
- The SQL analytics endpoint can also be accessed from within the SQL query editor. This can be especially useful when toggling between the database and the SQL analytics endpoint. Use the pulldown in the upper right corner to change from the editor to the analytics endpoint.  
        :::image type="content" source="media/query-sql-analytics-endpoint/sql-database-sql-analytics-endpoint-dropdown.png" alt-text="Screenshot from the Fabric portal showing the query editor's dropdown list containing the SQL database and SQL analytics endpoint options.":::

- The SQL analytics endpoint also has its own SQL connection string if you want to query it directly from tools like [SQL Server Management Studio](connect.md#connect-with-sql-server-management-studio-manually) or [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true). To get the connection strings, see [Find SQL connection strings](connect.md#find-sql-connection-string).

## Query the SQL analytics endpoint

1. Open an existing database with some data, or [create a new database](create.md) and [load it with sample data](load-adventureworks-sample-data.md).
1. Expand the **Object Explorer** and make note of the tables in the database.
1. Select the replication menu at the top of the editor, select **Monitor Replication**.
1. A list containing the tables in the database will appear. If this is a new database, you'll want to wait until all of the tables have been replicated. There is a refresh button in the toolbar. If there are any problems replicating your data, it is displayed on this page.
1. Once your tables are replicated, close the **Monitor Replication** page.
1. Select the SQL analytics endpoint from the dropdown in the SQL query editor.  
        :::image type="content" source="media/query-sql-analytics-endpoint/sql-database-sql-analytics-endpoint-dropdown.png" alt-text="Screenshot from the Fabric portal showing the query editor's dropdown list containing the SQL database and SQL analytics endpoint options.":::
1. You now see that the **Object Explorer** changed over to the warehouse experience.
1. Select some of your tables to see the data appear, reading directly from OneLake.
1. Select the context menu (`...`) for any table, and select **Properties** from the menu. Here you can see the OneLake information and `ABFS` file path.
1. Close the **Properties** page and select the context menu (`...`) for one the tables again.
1. Select **New Query** and **SELECT TOP 100**. Run the query to see the top 100 rows of data, queried from the SQL analytics endpoint, a copy of the database in OneLake.
1. If you have other databases in your workspace, you can also run queries with cross-database joins. Select the **+ Warehouse** button in the **Object Explorer** to add the SQL analytics endpoint for another database. You can write T-SQL queries similar to the following that join different [Fabric data stores](../../fundamentals/decision-guide-data-store.md) together:
    ```sql
    SELECT TOP (100) [a.AccountID], 
                [a.Account_Name], 
                [o.Order_Date], 
                [o.Order_Amount] 
    FROM    [Contoso Sales Database].[dbo].[dbo_Accounts] a  
            INNER JOIN [Contoso Order History Database].[dbo].[dbo_Orders] o  
            ON a.AccountID = o.AccountID;
    ```
1. Next, select the **New Query** dropdown from the toolbar, and choose **New SQL query in notebook**
    :::image type="content" source="media/query-sql-analytics-endpoint/new-sql-query-in-notebook.png" alt-text="Screenshot from the Fabric portal SQL query editor showing the New SQL query dropdown list.":::

1. Once in the notebook experience, select context menu (`...`) next to a table, then select **SELECT TOP 100**.
    :::image type="content" source="media/query-sql-analytics-endpoint/select-top-100.png" alt-text="Screenshot from the notebook experience of SQL database, showing the SELECT TOP 100 option next to a table in the Object Explorer.":::

1. To run the T-SQL query, select the play button next to the query cell in the notebook.
    :::image type="content" source="media/query-sql-analytics-endpoint/notebook-play.png" alt-text="Screenshot of the Fabric portal notebook experience of querying a table.":::

## Next step

> [!div class="nextstepaction"]
> [Create GraphQL API from your SQL database in the Fabric portal](graphql-api.md)

## Related content

- [Connect to your SQL database in Microsoft Fabric](connect.md)
