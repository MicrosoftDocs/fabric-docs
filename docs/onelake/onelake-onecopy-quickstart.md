---
title: Transform data with Apache Spark and query with SQL
description: Learn how to load data with OneLake file explorer, and use a Fabric notebook to transform the data and then query with SQL.
ms.reviewer: eloldag
ms.topic: how-to
ms.date: 03/07/2025
#customer intent: As a data engineer, I want to learn how to transform data with Apache Spark and query it with SQL using OneLake and Fabric notebooks so that I can efficiently analyze and manipulate data in my lakehouse workspace.
---

# Transform data with Apache Spark and query with SQL

In this guide, you will:

- Upload data to OneLake with the OneLake file explorer.

- Use a Fabric notebook to read data on OneLake and write back as a Delta table.

- Analyze and transform data with Spark using a Fabric notebook.

- Query one copy of data on OneLake with SQL.

## Prerequisites

Before you begin, you must:

- Download and install [OneLake file explorer](onelake-file-explorer.md).

- Create a workspace with a Lakehouse item.

- Download the WideWorldImportersDW dataset. You can use [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/) to connect to `https://fabrictutorialdata.blob.core.windows.net/sampledata/WideWorldImportersDW/csv/full/dimension_city` and download the set of csv files. Or you can use your own csv data and update the details as required.

## Upload data

In this section, you upload test data into your lakehouse using OneLake file explorer.

1. In OneLake file explorer, navigate to your lakehouse and create a subdirectory named `dimension_city` under the `/Files` directory.

   :::image type="content" source="media\onelake-onecopy-quickstart\create-folder-quickstart.png" alt-text="Screenshot of new folder created in OneLake file explorer.":::

1. Copy your sample csv files to the OneLake directory `/Files/dimension_city` using OneLake file explorer.

   :::image type="content" source="media\onelake-onecopy-quickstart\onelake-file-explorer-quickstart.png" alt-text="Screenshot of copying files to OneLake in file explorer." lightbox="media\onelake-onecopy-quickstart\onelake-file-explorer-quickstart.png":::

1. Navigate to your lakehouse in the Power BI or Fabric service and view your files.

   :::image type="content" source="media\onelake-onecopy-quickstart\view-files-quickstart.png" alt-text="Screenshot of viewing files in lakehouse in Fabric.":::

## Create a Delta table

In this section, you convert the unmanaged CSV files into a managed table using Delta format.

> [!NOTE]
> Always create, load, or create a shortcut to Delta-Parquet data *directly* under the **Tables** section of the lakehouse. Don't nest your tables in subfolders under the **Tables** section. The lakehouse doesn't recognize subfolders as tables and labels them as **Unidentified**.

1. In your lakehouse, select **Open notebook**, then **New notebook** to create a notebook.

   :::image type="content" source="media\onelake-onecopy-quickstart\new-notebook-quickstart.png" alt-text="Screenshot of creating new notebook in Fabric.":::

1. Using the Fabric notebook, convert the CSV files to Delta format. The following code snippet reads data from user created directory `/Files/dimension_city` and converts it to a Delta table `dim_city`.

   Copy the code snippet into the notebook cell editor. Replace the placeholders with your own workspace details, then select **Run cell** or **Run all**.

   ```python
   import os
   from pyspark.sql.types import *
   for filename in os.listdir("/lakehouse/default/Files/dimension_city"):
       df=spark.read.format('csv').options(header="true",inferSchema="true").load("abfss://<YOUR_WORKSPACE_NAME>@onelake.dfs.fabric.microsoft.com/<YOUR_LAKEHOUSE_NAME>.Lakehouse/Files/dimension_city/"+filename,on_bad_lines="skip")
       df.write.mode("overwrite").format("delta").save("Tables/dim_city")
   ```

   >[!TIP]
   >You can retrieve the full ABFS path to your directory by right-clicking on the directory name and selecting **Copy ABFS path**.

1. To see your new table, refresh your view of the `/Tables` directory. Select more options (**...**) next to the Tables directory, then select **Refresh**.

   :::image type="content" source="media\onelake-onecopy-quickstart\view-table-quickstart.png" alt-text="Screenshot of a viewing table in a lakehouse in Fabric.":::

## Query and modify data

In this section, you use a Fabric notebook to interact with the data in your table.

1. Query your table with SparkSQL in the same Fabric notebook.

   ```python
   %%sql
   SELECT * from <LAKEHOUSE_NAME>.dim_city LIMIT 10;
   ```

1. Modify the Delta table by adding a new column named **newColumn** with data type integer. Set the value of 9 for all the records for this newly added column.

   ```python
   %%sql
   
   ALTER TABLE <LAKEHOUSE_NAME>.dim_city ADD COLUMN newColumn int;
  
   UPDATE <LAKEHOUSE_NAME>.dim_city SET newColumn = 9;
  
   SELECT City,newColumn FROM <LAKEHOUSE_NAME>.dim_city LIMIT 10;
   ```

You can also access any Delta table on OneLake via a SQL analytics endpoint. A SQL analytics endpoint references the same physical copy of Delta table on OneLake and offers the T-SQL experience. 

1. Navigate to your lakehouse, then select **Lakehouse** > **SQL analytics endpoint** from the drop-down menu.

   :::image type="content" source="media\onelake-onecopy-quickstart\open-sql-analytics-endpoint.png" alt-text="Screenshot that shows navigating to the SQL analytics endpoint.":::

1. Select **New SQL Query** to query the table using T-SQL.

1. Copy and paste the following code into the query editor, then select **Run**.

   ```sql
   SELECT TOP (100) * FROM [<LAKEHOUSE_NAME>].[dbo].[dim_city];
   ```

## Related content

- [Connect to ADLS using a OneLake shortcut](onelake-shortcuts-adb-quickstart.md)

