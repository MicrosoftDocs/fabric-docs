---
author: seesharprun
ms.author: sidandrews
ms.topic: include
ms.date: 10/22/2025
---

## Query the source database from Fabric

Use the Fabric portal to explore the data that already exists in your Azure Cosmos DB account, querying your source Cosmos DB database.

1. Navigate to the mirrored database in the Fabric portal.

1. Select **View**, then **Source database**. This action opens the Azure Cosmos DB data explorer with a read-only view of the source database.

    :::image type="content" source="../../media/azure-cosmos-db-tutorial/source-explorer-query.png" lightbox="../../media/azure-cosmos-db-tutorial/source-explorer-query.png" alt-text="Screenshot of the data explorer with a read-only view of NoSQL data in the Azure Cosmos DB account.":::

1. Select a container, then open the context menu and select **New SQL query**.

1. Run any query. For example, use `SELECT COUNT(1) FROM container` to count the number of items in the container.

    > [!NOTE]
    > All the reads on source database are routed to Azure and consumes Request Units (RUs) allocated on the account.  

## Analyze the target mirrored database

Now, use T-SQL to query your NoSQL data that is now stored in Fabric OneLake.

1. Navigate to the mirrored database in the Fabric portal.

1. Switch from **Mirrored Azure Cosmos DB** to **SQL analytics endpoint**.

    :::image type="content" source="../../media/azure-cosmos-db-tutorial/switch-experience.png" lightbox="../../media/azure-cosmos-db-tutorial/switch-experience.png" alt-text="Screenshot of the selector to switch between items in the Fabric portal.":::

1. Each container in the source database should be represented in the SQL analytics endpoint as a warehouse table.

1. Select any table, open the context menu, then select **New SQL Query**, and finally select **Select Top 100**.

1. The query executes and returns 100 records in the selected table.

1. Open the context menu for the same table and select **New SQL Query**. Write an example query that uses aggregates like `SUM`, `COUNT`, `MIN`, or `MAX`. Join multiple tables in the warehouse to execute the query across multiple containers.

    > [!NOTE]
    > For example, this query would execute across multiple containers:
    >
    > ```sql
    > SELECT
    >     d.[product_category_name],
    >     t.[order_status],
    >     c.[customer_country],
    >     s.[seller_state],
    >     p.[payment_type],
    >     sum(o.[price]) as price,
    >     sum(o.[freight_value]) freight_value 
    > FROM
    >     [dbo].[products] p 
    > INNER JOIN
    >     [dbo].[OrdersDB_order_payments] p 
    >         on o.[order_id] = p.[order_id] 
    > INNER JOIN
    >     [dbo].[OrdersDB_order_status] t 
    >         ON o.[order_id] = t.[order_id] 
    > INNER JOIN
    >     [dbo].[OrdersDB_customers] c 
    >         on t.[customer_id] = c.[customer_id] 
    > INNER JOIN
    >     [dbo].[OrdersDB_productdirectory] d 
    >         ON o.product_id = d.product_id 
    > INNER JOIN
    >     [dbo].[OrdersDB_sellers] s 
    >         on o.seller_id = s.seller_id 
    > GROUP BY
    >     d.[product_category_name],
    >     t.[order_status],
    >     c.[customer_country],
    >     s.[seller_state],
    >     p.[payment_type]
    > ```
    >
    > This example assumes the name of your table and columns. Use your own table and columns when writing your SQL query.

1. Select the query and then select **Save as view**. Give the view a unique name. You can access this view at any time from the Fabric portal.

1. Return back to the mirrored database in the Fabric portal.

1. Select **New visual query**. Use the query editor to build complex queries.

    :::image type="content" source="../../media/azure-cosmos-db-tutorial/query-editor.png" lightbox="../../media/azure-cosmos-db-tutorial/query-editor.png" alt-text="Screenshot of the query editor for both text-based and visual queries in Fabric.":::

<a id="building-bi-reports-on-the-sql-queries-or-views"></a>

## Build BI reports on the SQL queries or views
   1. Select the query or view and then select **Explore this data (preview)**. This action explores the query in Power BI directly using Direct Lake on OneLake mirrored data.
   1. Edit the charts as needed and save the report.
      
> [!TIP]
> You can also optionally use Copilot or other enhancements to build dashboards and reports without any further data movement.
