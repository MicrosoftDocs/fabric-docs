---
title: Data warehouse tutorial - load data using T-SQL
description: In this tutorial step, learn how to load data from a public storage account into a table using T-SQL.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Tutorial: Load data using T-SQL

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Now that you know how to build a data warehouse, load a table, and generate a report, it's time to extend the solution by exploring other methods for loading data.

## Load data with COPY INTO

1. From the ribbon, select **New SQL query**.

   :::image type="content" source="media\tutorial-load-data\home-ribbon-select-new.png" alt-text="Screenshot of the Home screen ribbon, showing where to select New SQL query.":::

1. In the query editor, paste the following code.

   ```sql
   --Copy data from the public Azure storage account to the dbo.dimension_city table.
   COPY INTO [dbo].[dimension_city]
   FROM 'https://azuresynapsestorage.blob.core.windows.net/sampledata/WideWorldImportersDW/tables/dimension_city.parquet'
   WITH (FILE_TYPE = 'PARQUET');
   
   --Copy data from the public Azure storage account to the dbo.fact_sale table.
   COPY INTO [dbo].[fact_sale]
   FROM 'https://azuresynapsestorage.blob.core.windows.net/sampledata/WideWorldImportersDW/tables/fact_sale.parquet'
   WITH (FILE_TYPE = 'PARQUET');
   ```

1. Select **Run** to execute the query. The query takes between one and four minutes to execute.

   :::image type="content" source="media\tutorial-load-data\select-run-option.png" alt-text="Screenshot showing where to select Run to execute your query.":::

1. After the query is completed, review the messages to see the rows affected which indicated the number of rows that were loaded into the `dimension_city` and `fact_sale` tables respectively.

   :::image type="content" source="media\tutorial-load-data\review-query-messages.png" alt-text="Screenshot of a list of messages, showing where to find the number of rows that were loaded into the tables." lightbox="media\tutorial-load-data\review-query-messages.png":::

1. Load the data preview to validate the data loaded successfully by selecting on the `fact_sale` table in the **Explorer**.

   :::image type="content" source="media\tutorial-load-data\explorer-select-table.png" alt-text="Screenshot of the Explorer, showing where to find and select the table.":::

1. Rename the query for reference later. Right-click on **SQL query 1** in the **Explorer** and select **Rename**.

   :::image type="content" source="media\tutorial-load-data\right-click-rename.png" alt-text="Screenshot of the Explorer pane, showing where to right-click on the table name and select Rename.":::

1. Type `Load Tables` to change the name of the query.

1. Press **Enter** on the keyboard or select anywhere outside the tab to save the change.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Transform data using a stored procedure](tutorial-transform-data.md)
