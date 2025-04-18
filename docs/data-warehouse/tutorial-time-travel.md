---
title: "Data Warehouse Tutorial: Time Travel with T-SQL in a Warehouse"
description: "In this tutorial, learn how to use T-SQL statements to time travel in a warehouse table."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajagadish
ms.date: 04/06/2025
ms.topic: how-to
---

# Tutorial: Time travel with T-SQL in a Warehouse

In this tutorial, learn how to use T-SQL statements to _[time travel](time-travel.md)_ in a warehouse table. Time travel means to query data as it existed at a specific point in time, which is made automatically possible by Fabric Warehouse [data retention](time-travel.md#data-retention).

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse](tutorial-ingest-data.md)

## Work with time travel queries

In this task, learn how to create a view of the top 10 customers by sales. You will use the view in the next task to run time-travel queries.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. On the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-time-travel/ribbon-new-sql-query.png" alt-text="Screenshot of the New SQL query option on the ribbon." lightbox="media/tutorial-time-travel/ribbon-new-sql-query.png":::

1. In the query editor, paste the following code. The code creates a view named `Top10Customers`. The view uses a query to retrieve the top 10 customers based on sales.

    ```sql
    --Create the Top10Customers view.
    CREATE VIEW [dbo].[Top10Customers]
    AS
    SELECT TOP(10)
        FS.[CustomerKey],
        DC.[Customer],
        SUM(FS.[TotalIncludingTax]) AS [TotalSalesAmount]
    FROM
        [dbo].[dimension_customer] AS DC
        INNER JOIN [dbo].[fact_sale] AS FS
            ON DC.[CustomerKey] = FS.[CustomerKey]
    GROUP BY
        FS.[CustomerKey],
        DC.[Customer]
    ORDER BY
        [TotalSalesAmount] DESC;
    ```

1. Run the query.

1. When execution completes, rename the query as `Create Top 10 Customer View`.

1. In the **Explorer** pane, from inside the **Views** folder for the `dbo` schema, verify that the `Top10Customers` view exists.

   :::image type="content" source="media/tutorial-time-travel/explorer-view.png" alt-text="Screenshot of the Explorer pane, highlighting the newly created view.":::

1. Create a new query to work with time travel queries.

1. In the query editor, paste the following code. The code updates the `TotalIncludingTax` value for a single fact row to deliberately inflate its total sales. It also retrieves the current timestamp.

   ```sql
    --Update the TotalIncludingTax for a single fact row to deliberately inflate its total sales.
    UPDATE [dbo].[fact_sale]
    SET [TotalIncludingTax] = 200000000
    WHERE [SaleKey] = 22632918; --For customer 'Tailspin Toys (Muir, MI)'
    GO
    
    --Retrieve the current (UTC) timestamp.
    SELECT CURRENT_TIMESTAMP;
   ```

    > [!NOTE]
    > Currently, you can only use the Coordinated Universal Time (UTC) time zone for time travel.

1. Run the query.

1. When execution completes, rename the query as `Time Travel`.

1. In the **Results** pane, notice the timestamp value (your value will be the current UTC date and time).

   :::image type="content" source="media/tutorial-time-travel/results-copy-timestamp.png" alt-text="Screenshot of the Results pane, highlighting the timestamp value to copy.":::

1. To retrieve the top 10 customers _as of now_, in a new query editor, paste the following statement. The code retrieves the top 10 customers by using the `FOR TIMESTAMP AS OF` query hint.

   ```sql
    --Retrieve the top 10 customers as of now.
    SELECT *
    FROM [dbo].[Top10Customers]
    OPTION (FOR TIMESTAMP AS OF 'YOUR_TIMESTAMP');
   ```

1. Rename the query as `Time Travel Now`.

1. Return to the `Time Travel` query, and then use the **Copy** command to copy the query results.

   :::image type="content" source="media/tutorial-time-travel/copy-results-command.png" alt-text="Screenshot of the Copy command, highlighting Copy Query results.":::

1. Return to the `Time Travel Now` query, and then replace `YOUR_TIMESTAMP` with the timestamp you copied to the clipboard.

1. Run the query, and notice that the second top `CustomerKey` value is 49 for `Tailspin Toys (Muir, MI)`.

1. Modify the timestamp value to an earlier time _by subtracting one minute_ from the timestamp.

1. Run the query again, and notice that the second top `CustomerKey` value is 381 for `Wingtip Toys (Sarversville, PA)`.

> [!TIP]
> For more time travel examples, see [How to: Query using time travel at the statement level](how-to-query-using-time-travel.md).

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a query with the visual query builder in a Warehouse](tutorial-visual-query.md)

## Related content

- [Query data as it existed in the past](time-travel.md)
- [How to: Query using time travel](how-to-query-using-time-travel.md)
- [Query hints (Transact-SQL)](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true)
