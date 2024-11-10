---
title: "Data warehouse tutorial: Transform data with a stored procedure in a Warehouse in Microsoft Fabric"
description: "In this tutorial, you will create a stored procedure to transform data in a warehouse table."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 11/10/2024
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
  - build-2024
---

# Tutorial: Transform data with a stored procedure in a Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

In this tutorial, you will create a stored procedure to transform data in a warehouse table.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a Microsoft Fabric workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse in Microsoft Fabric](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse in Microsoft Fabric](tutorial-ingest-data.md)

## Create a stored procedure

In this task, you will create a stored procedure to transform data in a warehouse table.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. On the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-transform-data/ribbon-new-sql-query.png" alt-text="Screenshot of the Home ribbon, highlighting the New SQL query option." border="false":::

1. In the query editor, paste the following code and read the comments.

   ```sql
    --Drop the stored procedure if it already exists.
    DROP PROCEDURE IF EXISTS [dbo].[populate_aggregate_sale_by_city];
    GO
   
    --Create the populate_aggregate_sale_by_city stored procedure.
    CREATE PROCEDURE [dbo].[populate_aggregate_sale_by_city]
    AS
    BEGIN
        --Drop the aggregate table if it already exists.
        DROP TABLE IF EXISTS [dbo].[aggregate_sale_by_date_city];
        --Create the aggregate table.
        CREATE TABLE [dbo].[aggregate_sale_by_date_city]
        (
           [Date] [DATETIME2](6),
           [City] [VARCHAR](8000),
           [StateProvince] [VARCHAR](8000),
           [SalesTerritory] [VARCHAR](8000),
           [SumOfTotalExcludingTax] [DECIMAL](38,2),
           [SumOfTaxAmount] [DECIMAL](38,6),
           [SumOfTotalIncludingTax] [DECIMAL](38,6),
           [SumOfProfit] [DECIMAL](38,2)
        );
        
        --Load aggregated data into the table.
        INSERT INTO [dbo].[aggregate_sale_by_date_city]
        SELECT
           FS.[InvoiceDateKey] AS [Date], 
           DC.[City], 
           DC.[StateProvince], 
           DC.[SalesTerritory], 
           SUM(FS.[TotalExcludingTax]) AS [SumOfTotalExcludingTax], 
           SUM(FS.[TaxAmount]) AS [SumOfTaxAmount], 
           SUM(FS.[TotalIncludingTax]) AS [SumOfTotalIncludingTax], 
           SUM(FS.[Profit]) AS [SumOfProfit]
        FROM [dbo].[fact_sale] AS FS
        INNER JOIN [dbo].[dimension_city] AS DC
           ON FS.[CityKey] = DC.[CityKey]
        GROUP BY
           FS.[InvoiceDateKey],
           DC.[City], 
           DC.[StateProvince], 
           DC.[SalesTerritory]
        ORDER BY 
           FS.[InvoiceDateKey], 
           DC.[StateProvince], 
           DC.[City];
    END;
   ```

1. To execute the query, on the query designer ribbon, select **Run**.

1. When execution completes, rename the query as `Create Aggregate Procedure`.

1. In the **Explorer** pane, from inside the **Stored Procedures** folder, verify that the `aggregate_sale_by_date_city` stored procedure exists.

   :::image type="content" source="media/tutorial-transform-data/explorer-stored-procedure.png" alt-text="Screenshot of the Explorer pane, highlighting the newly created stored procedure." border="false":::

## Run the stored procedure

In this task, you will execute the stored procedure to transform data in a warehouse table.

1. Create a new query.

1. In the query editor, paste the following code and read the comment.

   ```sql
    --Execute the stored procedure to create and load aggregated data.
    EXEC [dbo].[populate_aggregate_sale_by_city];
   ```

1. Run the query.

1. When execution completes, rename the query as `Run Aggregate Procedure`.

1. To preview the aggregated data, in the **Explorer** pane, select the `aggregate_sale_by_date_city` table.

   :::image type="content" source="media/tutorial-transform-data/explorer-aggregate-table.png" alt-text="Screenshot of the Explorer pane, highlighting the newly created table." border="false":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Time travel with T-SQL in a Warehouse in Microsoft Fabric](tutorial-time-travel.md)
