---
title: OneCopy quickstart, transform data with Spark and query with SQL
description: Learn how to load data with OneLake file explorer, use a Fabric notebook to transform the data and then query with SQL
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom: build-2023
ms.date: 05/23/2023
---

# OneCopy: Transform data with Spark and query with SQL

In this guide, you will:

- Upload data to OneLake using OneLake file explorer.

- Use a Fabric notebook to read data on OneLake and write back as a delta table.

- Analyze and transform data with Spark using a Fabric notebook.

- Query one copy of data on OneLake with SQL.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites

- Download and install [OneLake file explorer](onelake-file-explorer.md).
- A workspace with a lakehouse item
- Download the WideWorldImportersDW dataset to your computer to follow along with the instructions in this guide.  You can use [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/) to connect to "https://azuresynapsestorage.blob.core.windows.net/sampledata/WideWorldImportersDW/csv/full/dimension_city" and download the set of csv files. You can also use your own csv data and update the details as required.

> [!NOTE]
> Create, load, or create a shortcut Delta-Parquet data directly under the Tables section of the Lakehouse. Do not nest your tables under additional subfolders in the Tables section as the Lakehouse will not automatically recognize it as a table and label it as Unidentified.

## Steps

1. In OneLake file explorer, navigate to your lakehouse and under the /Files directory, create a subdirectory named dimension_city.

   :::image type="content" source="media\onelake-onecopy-quickstart\create-folder-quickstart.png" alt-text="Screenshot of new folder created in OneLake file explorer." lightbox="media\onelake-onecopy-quickstart\create-folder-quickstart.png":::

1. Copy your sample csv files to the OneLake directory /Files/dimension_city using OneLake file explorer.

    :::image type="content" source="media\onelake-onecopy-quickstart\onelake-file-explorer-quickstart.png" alt-text="Screenshot of copying files to OneLake in file explorer." lightbox="media\onelake-onecopy-quickstart\onelake-file-explorer-quickstart.png":::

1. Navigate to your lakehouse in the Power BI service and view your files.

   :::image type="content" source="media\onelake-onecopy-quickstart\view-files-quickstart.png" alt-text="Screenshot of viewing files in lakehouse in Fabric." lightbox="media\onelake-onecopy-quickstart\view-files-quickstart.png":::

1. Select **Open notebook**, then **New notebook** to create a notebook.

   :::image type="content" source="media\onelake-onecopy-quickstart\new-notebook-quickstart.png" alt-text="Screenshot of creating new notebook in Fabric." lightbox="media\onelake-onecopy-quickstart\new-notebook-quickstart.png":::

1. Using the Fabric notebook, convert the CSV files to delta format. The following code snippet reads data from user created directory /Files/dimension_city and converts it to a delta table dim_city.

    ```python
    import os
    from pyspark.sql.types import *
    for filename in os.listdir("/lakehouse/default/Files/<replace with your folder path>"):
    df=spark.read.format('csv').options(header="true",inferSchema="true").load("abfss://<replace with workspace name>@onelake.dfs.fabric.microsoft.com/<replace with item name>.Lakehouse/Files/<folder name>/"+filename,on_bad_lines="skip")
    df.write.mode("overwrite").format("delta").save("Tables/<name of delta table>")
    ```

1. Refresh your view of the /Tables directory to see your new table.

   :::image type="content" source="media\onelake-onecopy-quickstart\view-table-quickstart.png" alt-text="Screenshot of viewing table in lakehouse in Fabric." lightbox="media\onelake-onecopy-quickstart\view-table-quickstart.png":::

1. Query your table with SparkSQL in the same Fabric notebook.

    ```python
    %%sql
    SELECT * from <replace with item name>.dim_city LIMIT 10;
    ```

1. Modify the delta table by adding a new column named newColumn with data type integer.  Set the value of 9 for all of the records for this newly added column.

    ```python
    %%sql
    
    ALTER TABLE <replace with item name>.dim_city ADD COLUMN newColumn int;
    
    UPDATE <replace with item name>.dim_city SET newColumn = 9;
    
    SELECT City,newColumn FROM <replace with item name>.dim_city LIMIT 10;
    ```

1. Any delta table on OneLake can also be accessed via a SQL Endpoint. This SQL endpoint references the same physical copy of delta table on OneLake and offers T-SQL experience. Select the SQL Endpoint for lakehouse1 and then select "New SQL Query" to query the table using T-SQL

    ```sql
    SELECT TOP (100) * FROM [<replace with item name>].[dbo].[dim_city];
    ```

## Summary

In this quickstart guide, you used OneLake File explorer to copy external datasets to OneLake. The datasets were then transformed to delta table and analyzed using lakehouse and T-SQL experiences.
