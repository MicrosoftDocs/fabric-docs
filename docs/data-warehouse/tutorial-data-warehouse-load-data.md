---
title: Data warehouse tutorial - load data with T-SQL
description: In this sixth tutorial step, learn how to load data from a public storage account into a table using T-SQL.
ms.reviewer: wiassaf
ms.author: scbradl
author: bradleyschacht
ms.topic: tutorial
ms.date: 5/9/2023
---

# Tutorial: Load data using T-SQL

Now that you have seen how to build a data warehouse, load a table, and generate a report it's time to extend the solution by exploring other methods for loading data.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Load data

1. From the ribbon, select **New SQL query**.

   IMAGE

1. In the query editor, paste the following code.

   > [!NOTE]
   > This code will be in a code block on Microsoft Learn which allows for easy copying. In case of issues with copy/paste formatting, a text file containing the script called **Load Tables.txt** can be accessed from the parent folder [Data Warehouse Tutorial Source Code](../placeholder.md).

   ```
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

   IMAGE

1. After the query is completed, review the messages to see the rows affected which indicated the number of rows that were loaded into the dimension_city and fact_sale tables respectively.

   IMAGE

1. Load the data preview to validate the data loaded successfully by clicking on the **fact_sale** table in the **Explorer**.

   IMAGE

1. Rename the query for reference later. Right-click on **SQL query 1** in the **Explorer** and select **Rename**.

   IMAGE

1. Type **Load Tables** to change the name of the query.

1. Press **Enter** on the keyboard or click anywhere outside the tab to save the change.

## Next steps

- [Tutorial: Transform data using a stored procedure](tutorial-data-warehouse-transform-data.md)
