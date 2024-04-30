---
title: Data warehouse tutorial - create a table in a warehouse
description: In this tutorial step, learn how to create tables in the data warehouse you created in a previous part of the tutorial.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
---

# Tutorial: Create tables in a data warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Learn how to create tables in the data warehouse you created in a previous part of the tutorial.

## Create a table

1. Select **Workspaces** in the navigation menu.

1. Select the workspace created in [Tutorial: Create a Microsoft Fabric data workspace](tutorial-create-workspace.md), such as **Data Warehouse Tutorial**.  

1. From the item list, select `WideWorldImporters` with the type of **Warehouse**.

   :::image type="content" source="media/tutorial-create-tables/select-the-warehouse.png" alt-text="Screenshot of the warehouse option that appears in the item list.":::

1. From the ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-create-tables/ribbon-new-sql-query.png" alt-text="Screenshot of the New SQL query option where it appears on the ribbon.":::

1. In the query editor, paste the following code.

   ```sql
   /*
   1. Drop the dimension_city table if it already exists.
   2. Create the dimension_city table.
   3. Drop the fact_sale table if it already exists.
   4. Create the fact_sale table.
   */

   --dimension_city
   DROP TABLE IF EXISTS [dbo].[dimension_city];
   CREATE TABLE [dbo].[dimension_city]
       (
           [CityKey] [int] NULL,
           [WWICityID] [int] NULL,
           [City] [varchar](8000) NULL,
           [StateProvince] [varchar](8000) NULL,
           [Country] [varchar](8000) NULL,
           [Continent] [varchar](8000) NULL,
           [SalesTerritory] [varchar](8000) NULL,
           [Region] [varchar](8000) NULL,
           [Subregion] [varchar](8000) NULL,
           [Location] [varchar](8000) NULL,
           [LatestRecordedPopulation] [bigint] NULL,
           [ValidFrom] [datetime2](6) NULL,
           [ValidTo] [datetime2](6) NULL,
           [LineageKey] [int] NULL
       );

   --fact_sale

   DROP TABLE IF EXISTS [dbo].[fact_sale];

   CREATE TABLE [dbo].[fact_sale]

       (
           [SaleKey] [bigint] NULL,
           [CityKey] [int] NULL,
           [CustomerKey] [int] NULL,
           [BillToCustomerKey] [int] NULL,
           [StockItemKey] [int] NULL,
           [InvoiceDateKey] [datetime2](6) NULL,
           [DeliveryDateKey] [datetime2](6) NULL,
           [SalespersonKey] [int] NULL,
           [WWIInvoiceID] [int] NULL,
           [Description] [varchar](8000) NULL,
           [Package] [varchar](8000) NULL,
           [Quantity] [int] NULL,
           [UnitPrice] [decimal](18, 2) NULL,
           [TaxRate] [decimal](18, 3) NULL,
           [TotalExcludingTax] [decimal](29, 2) NULL,
           [TaxAmount] [decimal](38, 6) NULL,
           [Profit] [decimal](18, 2) NULL,
           [TotalIncludingTax] [decimal](38, 6) NULL,
           [TotalDryItems] [int] NULL,
           [TotalChillerItems] [int] NULL,
           [LineageKey] [int] NULL,
           [Month] [int] NULL,
           [Year] [int] NULL,
           [Quarter] [int] NULL
       );
   ```

1. Select **Run** to execute the query.

   :::image type="content" source="media/tutorial-create-tables/run-to-execute.png" alt-text="Screenshot of the top corner of the query editor screen, showing where to select Run.":::

1. To save this query for reference later, right-click on the query tab, and select **Rename**.

   :::image type="content" source="media/tutorial-create-tables/rename-query-option.png" alt-text="Screenshot of the top corner of the query editor screen, showing where to right-click to select the Rename option.":::

1. Type `Create Tables` to change the name of the query.

1. Press **Enter** on the keyboard or select anywhere outside the tab to save the change.

1. Validate the table was created successfully by selecting the **refresh** button on the ribbon.

   :::image type="content" source="media/tutorial-create-tables/home-ribbon-refresh.png" alt-text="Screenshot of the ribbon on the Home screen, showing where to select the refresh option.":::

1. In the **Object explorer**, verify that you can see the newly created **Create Tables** query, `fact_sale` table, and `dimension_city` table.

   :::image type="content" source="media/tutorial-create-tables/object-explorer-verify.png" alt-text="Screenshot of the Explorer pane, showing where to find your tables and newly created query.":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Load data using T-SQL](tutorial-load-data.md)
