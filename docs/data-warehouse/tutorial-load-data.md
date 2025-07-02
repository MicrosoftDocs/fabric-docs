---
title: "Data Warehouse Tutorial: Load Data with T-SQL into a Warehouse"
description: "In this tutorial, learn how to load data from a public storage Azure Blob storage account into Warehouse tables with T-SQL."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 04/06/2025
ms.topic: tutorial
ms.custom: sfi-image-nochange
---

# Tutorial: Load data with T-SQL into a Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this tutorial, learn how to load data from a public storage Azure Blob storage account into Warehouse tables with T-SQL.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse](tutorial-create-warehouse.md)
> 1. [Ingest data into a Warehouse](tutorial-ingest-data.md)
> 1. [Create tables with T-SQL in a Warehouse](tutorial-create-tables.md)

## Load data with T-SQL

In this task, learn to load data with T-SQL.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. On the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-load-data/ribbon-new-sql-query.png" alt-text="Screenshot of the Home ribbon, highlighting the New SQL query option." lightbox="media/tutorial-load-data/ribbon-new-sql-query.png":::

1. In the query editor, paste the following code. The code returns a sample data from Parquet files sourced from an Azure Blob storage account. Ensure that the columns in the results match the `dimension_city` and `fact_sale` table schemas.

   ```sql
   -- Read sample dimension_city data from the public Azure storage account.
   SELECT TOP 10 *
   FROM OPENROWSET(
     BULK 'https://fabrictutorialdata.blob.core.windows.net/sampledata/WideWorldImportersDW/tables/dimension_city.parquet'
   ) AS sample;
   
   -- Read sample fact_sale data from the public Azure storage account.
   SELECT TOP 10 *
   FROM OPENROWSET(
     BULK 'https://fabrictutorialdata.blob.core.windows.net/sampledata/WideWorldImportersDW/tables/fact_sale.parquet'
   ) AS sample;
   ```

1. In the query editor, paste the following code. The code copies data from Parquet files sourced from an Azure Blob storage account into the `dimension_city` table and `fact_sale` table.

   ```sql
    --Copy data from the public Azure storage account to the dimension_city table.
    COPY INTO [dbo].[dimension_city]
    FROM 'https://fabrictutorialdata.blob.core.windows.net/sampledata/WideWorldImportersDW/tables/dimension_city.parquet'
    WITH (FILE_TYPE = 'PARQUET');
   
    --Copy data from the public Azure storage account to the fact_sale table.
    COPY INTO [dbo].[fact_sale]
    FROM 'https://fabrictutorialdata.blob.core.windows.net/sampledata/WideWorldImportersDW/tables/fact_sale.parquet'
    WITH (FILE_TYPE = 'PARQUET');
   ```

1. On the query designer ribbon, select **Run** to execute the query.

   :::image type="content" source="media/tutorial-load-data/run-to-execute.png" alt-text="Screenshot of the Run option on the query editor ribbon.":::

1. When the script execution completes, review the messages to determine how many rows were loaded into the `dimension_city` table and `fact_sale` table.

1. To load a preview of the loaded data, in the **Explorer** pane, select `fact_sale`.

   :::image type="content" source="media/tutorial-load-data/explorer-select-table.png" alt-text="Screenshot of the Explorer pane, highlighting the fact sale table.":::

1. Rename the query as `Load Tables`.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Clone a table with T-SQL in a Warehouse](tutorial-clone-table.md)
