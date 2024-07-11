---
title: Data warehouse tutorial - Time travel in Warehouse (preview)
description: Examples on how to use time travel in Warehouse in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: ajagadish
ms.date: 06/10/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.custom:
  - build-2024
ms.topic: how-to
---
# Tutorial: Time travel using T-SQL at statement level (preview)

In this article, learn how to time travel in your warehouse at the statement level using T-SQL. This feature allows you to query data as it appeared in the past, within a [retention period](time-travel.md#retention-of-data-history).

> [!NOTE]
> Currently, only the Coordinated Universal Time (UTC) time zone is used for time travel.

## Time travel

In this example, we'll update a row, and show how to easily query the previous value using the `FOR TIMESTAMP AS OF` query hint.

1. From the **Home** tab of the ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-time-travel/new-sql-query.png" alt-text="Screenshot from the Fabric portal of the New SQL query button.":::

1. In the query editor, paste the following code to create the view `Top10CustomerView`. Select **Run** to execute the query.

    ```sql
    CREATE VIEW dbo.Top10CustomersView
    AS
    SELECT TOP (10)
        FS.[CustomerKey],
        DC.[Customer],
        SUM(FS.TotalIncludingTax) AS TotalSalesAmount
    FROM
        [dbo].[dimension_customer] AS DC
    INNER JOIN
        [dbo].[fact_sale] AS FS ON DC.[CustomerKey] = FS.[CustomerKey]
    GROUP BY
        FS.[CustomerKey],
        DC.[Customer]
    ORDER BY
        TotalSalesAmount DESC;
    ```

1. In the **Explorer**, verify that you can see the newly created view `Top10CustomersView` by expanding the **View** node under `dbo` schema.

   :::image type="content" source="media/tutorial-time-travel/explorer.png" alt-text="Screenshot of the user's image.":::

1. Create another new query, similar to Step 1. From the **Home** tab of the ribbon, select **New SQL query**.

1. In the query editor, paste the following code. This updates the `TotalIncludingTax` column value to `200000000` for the record which has the `SaleKey` value of `22632918`. Select **Run** to execute the query.

   ```sql
   /*Update the TotalIncludingTax value of the record with SaleKey value of 22632918*/
   UPDATE [dbo].[fact_sale]
   SET TotalIncludingTax = 200000000
   WHERE SaleKey = 22632918;
   ```

1. In the query editor, paste the following code. The `CURRENT_TIMESTAMP` T-SQL function returns the current UTC timestamp as a **datetime**. Select **Run** to execute the query.

   ```sql
   SELECT CURRENT_TIMESTAMP;
   ```

1. Copy the timestamp value returned to your clipboard. 

1. Paste the following code in the query editor and replace the timestamp value with the current timestamp value obtained from the prior step. The timestamp syntax format is `YYYY-MM-DDTHH:MM:SS[.FFF]`. 
1. Remove the trailing zeroes, for example: `2024-04-24T20:59:06.097`.
1. The following example returns the list of top ten customers by `TotalIncludingTax`, including the new value for `SaleKey` `22632918`. Select **Run** to execute the query.

   ```sql
   /*View of Top10 Customers as of today after record updates*/
   SELECT *
   FROM [WideWorldImporters].[dbo].[Top10CustomersView]
   OPTION (FOR TIMESTAMP AS OF '2024-04-24T20:59:06.097');
   ```

1. Paste the following code in the query editor and replace the timestamp value to a time prior to executing the update script to update the `TotalIncludingTax` value. This would return the list of top ten customers *before* the `TotalIncludingTax` was updated for `SaleKey` 22632918. Select **Run** to execute the query.

   ```sql
   /*View of Top10 Customers as of today before record updates*/
   SELECT *
   FROM [WideWorldImporters].[dbo].[Top10CustomersView]
   OPTION (FOR TIMESTAMP AS OF '2024-04-24T20:49:06.097');
   ```

For more examples, visit [How to: Query using time travel at the statement level](how-to-query-using-time-travel.md).

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a query with the visual query builder](tutorial-visual-query.md)

## Related content

- [Query data as it existed in the past](time-travel.md)
- [How to: Query using time travel](how-to-query-using-time-travel.md)
- [Query hints (Transact-SQL)](/sql/t-sql/queries/hints-transact-sql-query?view=fabric&preserve-view=true)
