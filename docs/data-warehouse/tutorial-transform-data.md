---
title: Data warehouse tutorial - transform data using a stored procedure
description: In this tutorial step, learn how to create and save a new stored procedure to transform data.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Tutorial: Transform data using a stored procedure

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Learn how to create and save a new stored procedure to transform data.

## Transform data

1. From the **Home** tab of the ribbon, select **New SQL query**.

   :::image type="content" source="media\tutorial-transform-data\select-new-query.png" alt-text="Screenshot of the ribbon of the Home tab, showing where to select New SQL query.":::

1. In the query editor, paste the following code to create the stored procedure `dbo.populate_aggregate_sale_by_city`. This stored procedure will create and load the `dbo.aggregate_sale_by_date_city` table in a later step.

   ```sql
   --Drop the stored procedure if it already exists.
   DROP PROCEDURE IF EXISTS [dbo].[populate_aggregate_sale_by_city]
   GO
   
   --Create the populate_aggregate_sale_by_city stored procedure.
   CREATE PROCEDURE [dbo].[populate_aggregate_sale_by_city]
   AS
   BEGIN
       --If the aggregate table already exists, drop it. Then create the table.
       DROP TABLE IF EXISTS [dbo].[aggregate_sale_by_date_city];
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
   
       --Reload the aggregated dataset to the table.
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
   END
   ```

1. To save this query for reference later, right-click on the query tab, and select **Rename**.

   :::image type="content" source="media\tutorial-transform-data\query-tab-select-rename.png" alt-text="Screenshot of the tabs in the editor screen, showing where to right-click on the query and select Rename.":::

1. Type **Create Aggregate Procedure** to change the name of the query.

1. Press **Enter** on the keyboard or select anywhere outside the tab to save the change.

1. Select **Run** to execute the query.

1. Select the **refresh** button on the ribbon.

   :::image type="content" source="media\tutorial-transform-data\refresh-option-ribbon.png" alt-text="Screenshot of the Home ribbon, showing where to select the Refresh button.":::

1. In the **Object explorer**, verify that you can see the newly created stored procedure by expanding the **StoredProcedures** node under the `dbo` schema.

   :::image type="content" source="media\tutorial-transform-data\explorer-expand-node.png" alt-text="Screenshot of the Explorer pane, showing where to expand the StoredProcedures node to find your newly created procedure.":::

1. From the **Home** tab of the ribbon, select **New SQL query**.

1. In the query editor, paste the following code. This T-SQL executes `dbo.populate_aggregate_sale_by_city` to create the `dbo.aggregate_sale_by_date_city` table.

   ```sql
   --Execute the stored procedure to create the aggregate table.
   EXEC [dbo].[populate_aggregate_sale_by_city];
   ```

1. To save this query for reference later, right-click on the query tab, and select **Rename**.

1. Type **Run Create Aggregate Procedure** to change the name of the query.

1. Press **Enter** on the keyboard or select anywhere outside the tab to save the change.

1. Select **Run** to execute the query.

1. Select the **refresh** button on the ribbon. The query takes between two and three minutes to execute.

1. In the **Object explorer**, load the data preview to validate the data loaded successfully by selecting on the `aggregate_sale_by_city` table in the **Explorer**.

   :::image type="content" source="media\tutorial-transform-data\validate-loaded-data.png" alt-text="Screenshot of the Explorer pane next to a Data preview screen that lists the data loaded into the selected table.":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Create a query with the visual query builder](tutorial-visual-query.md)
