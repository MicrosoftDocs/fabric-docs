---
title: Transform data with Spark and query with SQL
description: Learn how to load data with OneLake file explorer, and use a Fabric notebook to transform the data and then query with SQL.
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Transform data with Spark and query with SQL

In this guide, you will:

- Upload data to OneLake with the OneLake file explorer.

- Use a Fabric notebook to read data on OneLake and write back as a Delta table.

- Analyze and transform data with Spark using a Fabric notebook.

- Query one copy of data on OneLake with SQL.

## Prerequisites

Before you begin, you must:

- Download and install [OneLake file explorer](onelake-file-explorer.md).

- Create a workspace with a Lakehouse item.

- Download the WideWorldImportersDW dataset. You can use [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/) to connect to `https://azuresynapsestorage.blob.core.windows.net/sampledata/WideWorldImportersDW/csv/full/dimension_city` and download the set of csv files. Or you can use your own csv data and update the details as required.

> [!NOTE]
> Always create, load, or create a shortcut to Delta-Parquet data *directly* under the **Tables** section of the lakehouse. Do not nest your tables in subfolders under the **Tables** section as the lakehouse will not recognize it as a table and will label it as Unidentified.

## Upload, read, analyze, and query data

1. In OneLake file explorer, navigate to your lakehouse and under the `/Files` directory, create a subdirectory named `dimension_city`.

   :::image type="content" source="media\onelake-onecopy-quickstart\create-folder-quickstart.png" alt-text="Screenshot of new folder created in OneLake file explorer.":::

1. Copy your sample csv files to the OneLake directory `/Files/dimension_city` using OneLake file explorer.

   :::image type="content" source="media\onelake-onecopy-quickstart\onelake-file-explorer-quickstart.png" alt-text="Screenshot of copying files to OneLake in file explorer." lightbox="media\onelake-onecopy-quickstart\onelake-file-explorer-quickstart.png":::

1. Navigate to your lakehouse in the Power BI service and view your files.

   :::image type="content" source="media\onelake-onecopy-quickstart\view-files-quickstart.png" alt-text="Screenshot of viewing files in lakehouse in Fabric.":::

1. Select **Open notebook**, then **New notebook** to create a notebook.

   :::image type="content" source="media\onelake-onecopy-quickstart\new-notebook-quickstart.png" alt-text="Screenshot of creating new notebook in Fabric.":::

1. Using the Fabric notebook, convert the CSV files to Delta format. The following code snippet reads data from user created directory `/Files/dimension_city` and converts it to a Delta table `dim_city`.

   ```python
   import os
   from pyspark.sql.types import *
   for filename in os.listdir("/lakehouse/default/Files/<replace with your folder path>"):
   df=spark.read.format('csv').options(header="true",inferSchema="true").load("abfss://<replace with workspace name>@onelake.dfs.fabric.microsoft.com/<replace with item name>.Lakehouse/Files/<folder name>/"+filename,on_bad_lines="skip")
   df.write.mode("overwrite").format("delta").save("Tables/<name of delta table>")
   ```

1. To see your new table, refresh your view of the `/Tables` directory.

   :::image type="content" source="media\onelake-onecopy-quickstart\view-table-quickstart.png" alt-text="Screenshot of a viewing table in a lakehouse in Fabric.":::

1. Query your table with SparkSQL in the same Fabric notebook.

   ```python
   %%sql
   SELECT * from <replace with item name>.dim_city LIMIT 10;
   ```

1. Modify the Delta table by adding a new column named **newColumn** with data type integer. Set the value of 9 for all the records for this newly added column.

   ```python
   %%sql
   
   ALTER TABLE <replace with item name>.dim_city ADD COLUMN newColumn int;
  
   UPDATE <replace with item name>.dim_city SET newColumn = 9;
  
   SELECT City,newColumn FROM <replace with item name>.dim_city LIMIT 10;
   ```

1. You can also access any Delta table on OneLake via a SQL analytics endpoint. A SQL analytics endpoint references the same physical copy of Delta table on OneLake and offers the T-SQL experience. Select the SQL analytics endpoint for **lakehouse1** and then select **New SQL Query** to query the table using T-SQL.

   ```sql
   SELECT TOP (100) * FROM [<replace with item name>].[dbo].[dim_city];
   ```

## Related content

- [Connect to ADLS using a OneLake shortcut](onelake-shortcuts-adb-quickstart.md)
