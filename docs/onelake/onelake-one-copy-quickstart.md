---
title: OneCopy quickstart, transform data with Spark and query with SQL
description: Learn how to load data with OneLake file explorer, use a Fabric notebook to transform the data and then query with SQL
ms.reviewer: eloldag
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.date: 05/23/2023
---

# OneCopy: Transform data with Spark and query with SQL

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Overview

In this guide, you will:

- Upload data to OneLake using OneLake file explorer.

- Use a Fabric notebook to read data on OneLake and write back as a delta table.

- Analyze and transform data with Spark using a Fabric notebook.

- Query one copy of data on OneLake with SQL.

## Prerequisites

- Download and install [OneLake file explorer](onlake-file-explorer.md).
- A workspace with a lakehouse item
- Download the WideWorldImportersDW dataset to your computer to follow along with the instructions in this guide.  You can also use your own csv data.  Just update the details as required.

## Steps

1. In OneLake file explorer, navigate to your lakehouse and under the /Files directory, create a subdirectory named dimension_city.

   :::image type="content" source="media\onelake-one-copy-quickstart\create-folder-quickstart.png" alt-text="Screenshot of new folder created in OneLake file explorer." lightbox="media\onelake-one-copy-quickstart\create-folder-quickstart.png":::

1. Copy your sample csv files to the OneLake directory /Files/dimension_city using OneLake file explorer.

1. Navigate to your lakehouse in the Power BI service and view your files.

   :::image type="content" source="media\onelake-one-copy-quickstart\view-files-quickstart.png" alt-text="Screenshot of viewing files in lakehouse in Fabric." lightbox="media\onelake-one-copy-quickstart\view-files-quickstart.png":::

1. Select **Open notebook**, then **New notebook** to create a notebook.

   :::image type="content" source="media\onelake-one-copy-quickstart\new-notebook-quickstart.png" alt-text="Screenshot of creating new notebook in Fabric." lightbox="media\onelake-one-copy-quickstart\new-notebook-quickstart.png":::

1. Using the Fabric notebook, convert the CSV files to delta format. The following code snippet reads data from user created directory /Files/dimension_city and converts it to a delta table dim_city.

```python
import os
from pyspark.sql.types import *
for filename in os.listdir("/lakehouse/default/Files/<replace with your folder path>"):
    df=spark.read.format('csv').options(header="true",inferSchema="true").load("abfss://<replace with workspace name>@onelake.dfs.fabric.microsoft.com/<replace with item name>.Lakehouse/Files/<folder name>/"+filename,on_bad_lines="skip")
    df.write.mode("overwrite").format("delta").save("Tables/<name of delta table>")
```

1. View your new table under the /Tables directory.

   :::image type="content" source="media\onelake-one-copy-quickstart\view-table-quickstart.png" alt-text="Screenshot of viewing table in lakehouse in Fabric." lightbox="media\onelake-one-copy-quickstart\view-table-quickstart.png":::

1. Query your table with SparkSQL in the same Fabric notebook.

```sql
%%sql
SELECT * fom lakehouse1.dim_city LIMIT 10;
```

1. Modify the delta table by adding a new column named newColumn with data type integer.  Set the value of 9 for all of the records for this newly added column.

```sql
%%sql

ALTER TABLE lakehouse1.dim_city ADD COLUMN newColumn int;

UPDATE lakehouse1.dim_city SET newColumn = 9;

SELECT City,newColumn FROM lakehouse1.dim_city LIMIT 10;
```

1. Any delta table on OneLake can also be accessed via a SQL Endpoint. This SQL endpoint references the same physical copy of delta table on OneLake and offers T-SQL experience. Select the SQL Endpoint for lakehouse1 and then select dim_city table listed in the Explorer pane.

Query the data using T-SQL

```sql
SELECT TOP (100) * FROM [lakehouse1].[dbo].[dim_city];
```
 
## Summary

In this quickstart guide, you used OneLake File explorer to copy external datasets to OneLake. The datasets were then transformed to delta table and analyzed using lakehouse and T-SQL experiences.
