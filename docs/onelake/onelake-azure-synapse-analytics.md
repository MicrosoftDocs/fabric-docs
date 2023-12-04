---
title: Integrate OneLake with Azure Synapse Analytics
description: Learn about Microsoft Fabric integration with Azure Synapse Analytics, including how to read and write data into Fabric using Azure Synapse Spark pool.
ms.reviewer: eloldag
ms.author: mahi
author: matt1883
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Integrate OneLake with Azure Synapse Analytics

Azure Synapse is a limitless analytics service that brings together enterprise data warehousing and Big Data analytics. This tutorial shows how to connect to OneLake using [Azure Synapse Analytics](/azure/synapse-analytics/).

## Write data from Synapse using Apache Spark

Follow these steps to use Apache Spark to write sample data to OneLake from Azure Synapse Analytics.

1. Open your Synapse workspace and [create an Apache Spark pool](/azure/synapse-analytics/quickstart-create-apache-spark-pool-studio) with your preferred parameters.

   :::image type="content" source="media\onelake-azure-synapse-analytics\new-apache-spark-pool.png" alt-text="Screenshot showing where to select New in the Apache Spark pool screen.":::

1. Create a new Apache Spark notebook.

1. Open the notebook, set the language to **PySpark (Python)**, and connect it to your newly created Spark pool.

1. In a separate tab, navigate to your Microsoft Fabric lakehouse and find the top-level **Tables** folder.

1. Right-click on the **Tables** folder and select **Properties**.

   :::image type="content" source="media\onelake-azure-synapse-analytics\properties-context-menu.png" alt-text="Screenshot showing where to open the Properties pane lakehouse explorer.":::

1. Copy the **ABFS path** from the properties pane.

   :::image type="content" source="media\onelake-azure-synapse-analytics\abfs-path.png" alt-text="Screenshot showing where to copy the ABFS path.":::

1. Back in the Azure Synapse notebook, in the first new code cell, provide the lakehouse path. This lakehouse is where your data is written later. Run the cell.

   ```python
   # Replace the path below with the ABFS path to your lakehouse Tables folder. 
   oneLakePath = 'abfss://WorkspaceName@onelake.dfs.fabric.microsoft.com/LakehouseName.lakehouse/Tables'
   ```

1. In a new code cell, load data from an Azure open dataset into a dataframe. This dataset is the one you load into your lakehouse. Run the cell.

   ```python
   yellowTaxiDf = spark.read.parquet('wasbs://nyctlc@azureopendatastorage.blob.core.windows.net/yellow/puYear=2018/puMonth=2/*.parquet')
   display(yellowTaxiDf.limit(10))
   ```

1. In a new code cell, filter, transform, or prep your data. For this scenario, you can trim down your dataset for faster loading, join with other datasets, or filter down to specific results. Run the cell.

   ```python
   filteredTaxiDf = yellowTaxiDf.where(yellowTaxiDf.tripDistance>2).where(yellowTaxiDf.passengerCount==1)
   display(filteredTaxiDf.limit(10))
   ```

1. In a new code cell, using your OneLake path, write your filtered dataframe to a new Delta-Parquet table in your Fabric lakehouse. Run the cell.

   ```python
   filteredTaxiDf.write.format("delta").mode("overwrite").save(oneLakePath + '/Taxi/')
   ```

1. Finally, in a new code cell, test that your data was successfully written by reading your newly loaded file from OneLake. Run the cell.

   ```python
   lakehouseRead = spark.read.format('delta').load(oneLakePath + '/Taxi/')
   display(lakehouseRead.limit(10))
   ```

Congratulations. You can now read and write data in OneLake using Apache Spark in Azure Synapse Analytics.

## Read data from Synapse using SQL

Follow these steps to use SQL serverless to read data from OneLake from Azure Synapse Analytics.

1. Open a Fabric lakehouse and identify a table that you'd like to query from Synapse.

1. Right-click on the table and select **Properties**.

1. Copy the **ABFS path** for the table.

   :::image type="content" source="media\onelake-azure-synapse-analytics\abfs-path.png" alt-text="Screenshot showing where to copy the ABFS path.":::

1. Open your Synapse workspace in [Synapse Studio](https://web.azuresynapse.net/workspaces).

1. Create a new SQL script.

1. In the SQL query editor, enter the following query, replacing `ABFS_PATH_HERE` with the path you copied earlier.

   ```sql
   SELECT TOP 10 *
   FROM OPENROWSET(
   BULK 'ABFS_PATH_HERE',
   FORMAT = 'delta') as rows;
   ```

1. Run the query to view the top 10 rows of your table.

Congratulations. You can now read data from OneLake using SQL serverless in Azure Synapse Analytics.

## Related content

- [Integrate OneLake with Azure Storage Explorer](onelake-azure-storage-explorer.md)
