---
title: Data warehouse tutorial - Create queries cross-warehouse with the SQL query editor
description: In this tutorial step, learn how to use the SQL query editor to write cross-warehouse queries.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 01/22/2024
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
---

# Tutorial: Create cross-warehouse queries with the SQL query editor

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, learn about how you can easily create and execute T-SQL queries with the SQL query editor across multiple warehouse, including joining together data from a [!INCLUDE [fabric-se](includes/fabric-se.md)] and a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

## Add multiple warehouses to the Explorer

1. Select the `Data Warehouse Tutorial` workspace in the navigation menu.
1. Select the `WideWorldImporters` **warehouse** item.
1. In the **Explorer**, select the **+ Warehouses** button.

    :::image type="content" source="media\tutorial-sql-cross-warehouse-query-editor\explorer-add-warehouses.png" alt-text="Screenshot from the Fabric portal Explorer, showing the + Warehouse button boxed in red.":::

1. Select the SQL analytics endpoint of the lakehouse you created using shortcuts previously, named `ShortcutExercise`. Both items are added to the query.

    :::image type="content" source="media\tutorial-sql-cross-warehouse-query-editor\explorer-add-warehouses-select-sql-endpoint.png" alt-text="Screenshot from the Fabric portal Add warehouses window. Two warehouses are selected, including the ShortcutExercise SQL analytics endpoint." lightbox="media/tutorial-sql-cross-warehouse-query-editor/explorer-add-warehouses-select-sql-endpoint.png":::

1. Your selected warehouses now show the same **Explorer** pane.

## Execute a cross-warehouse query

In this example, you can see how easily you can run T-SQL queries across the `WideWorldImporters` warehouse and `ShortcutExercise` SQL analytics endpoint. You can write cross-database queries using three-part naming to reference the `database.schema.table`, as in SQL Server.

1. From the ribbon, select **New SQL query**.

    :::image type="content" source="media\tutorial-sql-cross-warehouse-query-editor\new-sql-query.png" alt-text="Screenshot from the Fabric portal showing the ribbon, and the New SQL query option boxed in red.":::

1. In the query editor, copy and paste the following T-SQL code.

    ```sql
    SELECT Sales.StockItemKey, 
    Sales.Description, 
    SUM(CAST(Sales.Quantity AS int)) AS SoldQuantity, 
    c.Customer
    FROM [dbo].[fact_sale] AS Sales,
    [ShortcutExercise].[dbo].[dimension_customer] AS c
    WHERE Sales.CustomerKey = c.CustomerKey
    GROUP BY Sales.StockItemKey, Sales.Description, c.Customer;
    ```

1. Select the **Run** button to execute the query. After the query is completed, you will see the results.

    :::image type="content" source="media\tutorial-sql-cross-warehouse-query-editor\cross-warehouse-query-results.png" alt-text="Screenshot from the Fabric portal showing the results of a cross-warehouse query." lightbox="media\tutorial-sql-cross-warehouse-query-editor\cross-warehouse-query-results.png":::

1. Rename the query for reference later. Right-click on `SQL query 1` in the **Explorer** and select **Rename**.
1. Type `Cross-warehouse query` to change the name of the query.
1. Press **Enter** on the keyboard or select anywhere outside the tab to save the change.

## Execute a cross-warehouse cross-workspace query

To query data from Warehouse A residing in another workspace than your Warehouse B, follow these steps:

1. Create a lakehouse in the same workspace as your Warehouse B.
1. In that lakehouse, create a shortcut pointing to the required databases or tables from Warehouse A.
1. Through the previous cross-warehouse sample query, you can now query tables in that lakehouse which are just a shortcut to Warehouse A. For example:
   
    ```sql
    SELECT * FROM [lakehouse].[dbo].[table_shortcuted_from_warehouse_A]
    ```

> [!NOTE]
> Cross-warehouse cross-workspace querying is currently limited for queries within the same region.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create Power BI reports](tutorial-power-bi-report.md)
