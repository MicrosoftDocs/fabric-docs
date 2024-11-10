---
title: "Data warehouse tutorial: Load data with T-SQL into a Warehouse in Microsoft Fabric"
description: "In this tutorial, you will load data from a public storage Azure Blob storage account into warehouse tables by using T-SQL."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: scbradl
ms.date: 11/10/2024
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
---

# Tutorial: Load data with T-SQL into a Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

In this tutorial, you will load data from a public storage Azure Blob storage account into warehouse tables by using T-SQL.

> [!NOTE]
> This tutorial forms part of an [end-to-end scenario](tutorial-introduction.md#data-warehouse-end-to-end-scenario). In order to complete this tutorial, you must first complete these tutorials:
>
> 1. [Create a Microsoft Fabric workspace](tutorial-create-workspace.md)
> 1. [Create a Warehouse in Microsoft Fabric](tutorial-create-warehouse.md)
> 1. [Create tables with T-SQL in a Warehouse in Microsoft Fabric](tutorial-create-tables.md)

## Load data with T-SQL

In this task, you will load data with T-SQL.

1. Ensure that the workspace you created in the [first tutorial](tutorial-create-workspace.md) is open.

1. On the **Home** ribbon, select **New SQL query**.

   :::image type="content" source="media/tutorial-load-data/ribbon-new-sql-query.png" alt-text="Screenshot of the Home ribbon, highlighting the New SQL query option.":::

1. In the query editor, paste the following code and read the comments.

   ```sql
    --Copy data from the public Azure storage account to the dbo.dimension_city table.
    COPY INTO [dbo].[dimension_city]
    FROM 'https://fabrictutorialdata.blob.core.windows.net/sampledata/WideWorldImportersDW/tables/dimension_city.parquet'
    WITH (FILE_TYPE = 'PARQUET');
   
    --Copy data from the public Azure storage account to the dbo.fact_sale table.
    COPY INTO [dbo].[fact_sale]
    FROM 'https://fabrictutorialdata.blob.core.windows.net/sampledata/WideWorldImportersDW/tables/fact_sale.parquet'
    WITH (FILE_TYPE = 'PARQUET');
   ```

1. On the query designer ribbon, select **Run** to execute the query.

   :::image type="content" source="media/tutorial-load-data/run-to-execute.png" alt-text="Screenshot of the Run option on the query editor ribbon.":::

1. When the script execution completes, review the messages to determine how many rows were loaded into the `dimension_city` and `fact_sale` tables.

   :::image type="content" source="media/tutorial-load-data/review-query-messages.png" alt-text="Screenshot of the messages, highlighting the number of rows loaded into each table." lightbox="media/tutorial-load-data/review-query-messages.png":::

1. To load a preview of the loaded data, in the **Explorer** pane, select `fact_sale`.

   :::image type="content" source="media/tutorial-load-data/explorer-select-table.png" alt-text="Screenshot of the Explorer pane, highlighting the fact sale table.":::

1. Rename the query as `Load Tables`.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Clone a table with T-SQL in a Warehouse in Microsoft Fabric](tutorial-clone-table.md)
