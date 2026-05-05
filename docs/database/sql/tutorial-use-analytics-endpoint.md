---
title: SQL database tutorial - Use the SQL analytics endpoint to query data
description: In this tutorial step, learn how to use the SQL analytics endpoint to query data.
ms.date: 10/25/2024
ms.topic: tutorial
---

# Use the SQL analytics endpoint to query data

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Data that you create in your SQL database in Fabric is mirrored automatically to Microsoft Fabric OneLake in Delta format, at short intervals. This mirrored data is useful for many applications, including serving as a reporting data source to relieve compute pressure on your operational database.

## Prerequisites

- Complete all the previous steps in this tutorial.

## Access the SQL analytics endpoint of your SQL database in Fabric

You can access this mirrored data by selecting the SQL analytics endpoint in your Workspace view.

:::image type="content" source="media/tutorial-use-analytics-endpoint/workspace-sql-analytics-endpoint.png" alt-text="Screenshot the SQL analytics endpoint of the SQL database in the Workspace view." lightbox="media/tutorial-use-analytics-endpoint/workspace-sql-analytics-endpoint.png":::

You can also access the SQL analytics endpoint in the database view.

:::image type="content" source="media/tutorial-use-analytics-endpoint/switch-sql-database-sql-analytics-endpoint.png" alt-text="Screenshot shows the drop-down list to switch from the SQL database to the SQL analytics endpoint view." lightbox="media/tutorial-use-analytics-endpoint/switch-sql-database-sql-analytics-endpoint.png":::

When you open the SQL analytics endpoint of the SQL database, you're brought to a view similar to the SQL database in Fabric view.

:::image type="content" source="media/tutorial-use-analytics-endpoint/explorer-sql-analytics-endpoint.png" alt-text="Screenshot shows the same data available in the Explorer via the SQL analytics endpoint of the SQL database." lightbox="media/tutorial-use-analytics-endpoint/explorer-sql-analytics-endpoint.png":::

## Query data with the SQL analytics endpoint

You can query any of the mirrored data in the SQL analytics endpoint using standard Transact-SQL statements that are compatible with a [Fabric warehouse](../../data-warehouse/data-warehousing.md). You can't add data-bearing objects to this data, but you can add views to the data for reporting and analytic purposes. Using the read-only SQL analytics endpoint relieves compute pressure from your operational database and scales the system for reporting and analytic purposes.

In this step, create a view over the mirrored data, and then create a report to show the results.

1. Ensure you're in the SQL analytics endpoint, and then open a new Query window using the icon bar that depicts a paper with the letters **SQL** and paste the following Transact-SQL Code and select **Run** to execute it. This T-SQL query creates three new SQL views, named `SupplyChain.vProductsBySupplier`, `SupplyChain.vSalesByDate`, and `SupplyChain.vTotalProductsByVendorLocation`.

    ```sql
    CREATE VIEW SupplyChain.vProductsBySupplier AS
    -- View for total products by each supplier
    SELECT sod.ProductID
    , sup.CompanyName
    , SUM(sod.OrderQty) AS TotalOrderQty
    FROM SalesLT.SalesOrderHeader AS soh
    INNER JOIN SalesLT.SalesOrderDetail AS sod 
        ON soh.SalesOrderID = sod.SalesOrderID
        INNER JOIN SupplyChain.Warehouse AS sc 
            ON sod.ProductID = sc.ProductID
            INNER JOIN dbo.Suppliers AS sup 
                ON sc.SupplierID = sup.SupplierID
    GROUP BY sup.CompanyName, sod.ProductID;
    GO
    CREATE VIEW SupplyChain.vSalesByDate AS
    -- Product Sales by date and month
    SELECT YEAR(OrderDate) AS SalesYear
    , MONTH(OrderDate) AS SalesMonth
    , ProductID
    , SUM(OrderQty) AS TotalQuantity
    FROM SalesLT.SalesOrderDetail AS SOD
    INNER JOIN SalesLT.SalesOrderHeader AS SOH 
        ON SOD.SalesOrderID = SOH.SalesOrderID
    GROUP BY YEAR(OrderDate), MONTH(OrderDate), ProductID;
    GO
    CREATE VIEW SupplyChain.vTotalProductsByVendorLocation AS
    -- View for total products by each supplier by location
    SELECT wh.SupplierLocationID AS 'Location'
    , vpbs.CompanyName AS 'Supplier'
    , SUM(vpbs.TotalOrderQty) AS 'TotalQuantityPurchased'
    FROM SupplyChain.vProductsBySupplier AS vpbs
    INNER JOIN SupplyChain.Warehouse AS wh
        ON vpbs.ProductID = wh.ProductID
    GROUP BY wh.SupplierLocationID, vpbs.CompanyName;
    GO   
    ```

You can now use these views in analytics and reporting. You will create a report using these views later in this tutorial.

To learn more about the automatic mirroring of SQL database into OneLake, see [Mirroring Fabric SQL database in Microsoft Fabric](mirroring-overview.md).

## Next step

> [!div class="nextstepaction"]
> [Create and share visualizations](tutorial-create-visualizations.md)
