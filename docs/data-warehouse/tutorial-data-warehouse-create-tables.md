---
title: Data warehouse tutorial - create a table in a warehouse
description: In this fifth tutorial step, learn how to create tables in the data warehouse you created in a previous part of the tutorial.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.date: 5/9/2023
---

# Tutorial: Create tables in a data warehouse

Learn how to create tables in the data warehouse you created in a previous part of the tutorial.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Create a table

1. Select **Workspaces** in the left-hand menu of the [Power BI service](https://powerbi.com/).

1. Select the workspace created in [Tutorial: Create a Microsoft Fabric data workspace](tutorial-data-warehouse-create-workspace.md), such as **Data Warehouse Tutorial**.  

1. From the artifact list, select **WideWorldImporters** with the type of **Warehouse**.

   IMAGE

1. From the ribbon, select **New SQL query**.

   IMAGE

1. In the query editor, paste the following code.
   > [!NOTE]
   > This code will be in a code block on Microsoft Learn which allows for easy copying. In case of issues with copy/paste formatting, a text file containing the script called **Create Tables.txt** can be accessed from the parent folder [Data Warehouse Tutorial Source Code](../placeholder.md).

   ```
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

   IMAGE

1. To save this query for reference later, right-click on the query tab just above the editor and select **Rename**.

   IMAGE

1. Type **Create Tables** to change the name of the query.

1. Press **Enter** on the keyboard or click anywhere outside the tab to save the change.

1. Validate the table was created successfully by clicking the **refresh** button on the ribbon.

   IMAGE

1. In the **Object explorer**, verify that you can see the newly created **Create Tables** query, `fact_sale` table, and `dimension_city` table.

   IMAGE

## Next steps

- [Tutorial: Load data using T-SQL](tutorial-data-warehouse-load-data.md)
