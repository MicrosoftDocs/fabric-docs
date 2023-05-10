---
title: Data warehouse tutorial - Create queries cross-warehouse with the SQL query editor
description: In this tutorial step, learn how to use the SQL query editor to write cross-warehouse queries.
ms.reviewer: wiassaf
ms.author: prlangad
author: prlangad
ms.topic: tutorial
ms.date: 5/23/2023
---

# Tutorial: Create cross-warehouse queries with the SQL query editor

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, learn about how you can easily create and execute T-SQL queries with the SQL query editor across multiple warehouse, including joining together data from a [!INCLUDE [fabric-se](includes/fabric-se.md)] and a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Add multiple warehouses to the Explorer

1. Select the `Data Warehouse Tutorial` workspace in the left-hand navigation menu.
1. In the **Explorer**, select the **+ Warehouses** button.

    :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/explorer-add-warehouses.png" alt-text="A screenshot from the Fabric portal Explorer, showing the + Warehouse button boxed in red.":::

1. Select the SQL endpoint of the lakehouse you created using shortcuts previously, named `ShortcutExercise`. Both warehouse experiences are added to the query.

    :::image type="content" source="media/tutorial-sql-cross-warehouse-query-editor/explorer-add-warehouses-select-sql-endpoint.png" alt-text="A screenshot from the Fabric portal Add warehouses window. Two warehouses are selected, including the ShortcutExercuse SQL endpoint.":::

1. Your selected warehouses now show the same **Explorer** pane.

## Execute a cross-warehouse query

You can write cross-database queries using three-part naming to reference the `database.schema.table`, just as in SQL Server.

1. In this example, you will see how easily you can run TSQL queries across the `WideWorldImporters` warehouse and `ShortcutExercise` SQL Endpoint.

```sql
SELECT Sales.StockItemKey, 
Sales.Description, 
SUM(CAST(Sales.Quantity AS int)) AS SoldQuantity, 
c.Customer
FROM [dbo].[fact_sale] AS Sales,
[ShortcutExercise].[dbo].[dim_customer] AS c
WHERE Sales.CustomerKey = c.CustomerKey
GROUP BY Sales.StockItemKey, [Description], c.Customer;
```

## Next steps

> [!div class="nextstepaction"]
> [Tutorial: Create a Power BI report](tutorial-power-bi-report.md)
