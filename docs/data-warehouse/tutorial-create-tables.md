---
title: "Data warehouse tutorial: Create tables with T-SQL in a Warehouse in Microsoft Fabric"
description: "In this tutorial, you will create tables in the warehouse by using T-SQL."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 11/10/2024
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
---

# Tutorial: Create tables with T-SQL in a Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this tutorial, you will create tables in the warehouse by using T-SQL.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a Microsoft Fabric workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse in Microsoft Fabric](tutorial-create-warehouse.md)

## Create tables

In this task, you will create tables in the warehouse by using T-SQL.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. Select the **Wide World Importers** warehouse (from the items listed on the workspace landing page).

1. On the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-create-tables/ribbon-new-sql-query.png" alt-text="Screenshot of the Home ribbon, highlighting the New SQL query option." border="false":::

1. In the query editor, paste the following code and read the comments.

   ```sql
    --Drop the dimension_city table if it already exists.
    DROP TABLE IF EXISTS [dbo].[dimension_city];

    --Create the dimension_city table.
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

    --Drop the fact_sale table if it already exists.
    DROP TABLE IF EXISTS [dbo].[fact_sale];

    --Create the fact_sale table.
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

1. To execute the query, on the query designer ribbon, select **Run**.

   :::image type="content" source="media/tutorial-create-tables/run-to-execute.png" alt-text="Screenshot of the Run option on the query editor ribbon." border="false":::

1. When the script execution completes, to rename the query, right-click on the query tab, and then select **Rename**.

   :::image type="content" source="media/tutorial-create-tables/rename-query-option.png" alt-text="Screenshot of the Rename option available when right-clicking the query tab." border="false":::

1. In the **Rename** window, replace the name with `Create Tables`.

   :::image type="content" source="media/tutorial-create-tables/rename-script.png" alt-text="Screenshot of the Rename window, showing the script name entered." border="false":::

1. Select **Rename**.

1. Verify that the two new tables are listed in the **Explorer** pane.

    _The `dimension_customer` table was created in the [previous tutorial](tutorial-ingest-data.md)._

   :::image type="content" source="media/tutorial-create-tables/explorer-verify.png" alt-text="Screenshot of the Explorer pane, showing where to find your tables and newly created query." border="false":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Load data with T-SQL into a Warehouse in Microsoft Fabric](tutorial-load-data.md)
