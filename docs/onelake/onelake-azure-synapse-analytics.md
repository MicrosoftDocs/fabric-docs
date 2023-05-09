---
title: Integrate OneLake with Azure Synapse Analytics
description: Learn about Microsoft Fabric integration with Azure Synapse Analytics. Specifically how to read and write data into Fabric using Azure Synapse Spark pool.
ms.reviewer: eloldag
ms.author: mahi
author: matt1883
ms.topic: how-to
ms.date: 05/23/2023
---

# Integrate OneLake with Azure Synapse Analytics

[!INCLUDE [preview-note](../includes/preview-note.md)]

Azure Synapse is a limitless analytics service that brings together enterprise data warehousing and Big Data analytics. This tutorial shows how to connect to OneLake using [Azure Synapse Analytics](/azure/synapse-analytics/).

## Write data to OneLake from Apache Spark in Synapse

1. Open your Synapse workspace and [create an Apache Spark pool](/azure/synapse-analytics/quickstart-create-apache-spark-pool-portal) with your preferred parameters.

   :::image type="content" source="media\onelake-azure-synapse-analytics\new-apache-spark-pool.png" alt-text="Screenshot showing where to select New in the Apache Spark pool screen." lightbox="media\onelake-azure-synapse-analytics\new-apache-spark-pool.png":::

1. Create a new Apache Spark notebook.

1. Open the notebook, set the language to **PySpark (Python)**, and connect it to your newly created Spark pool.

1. In a separate tab, navigate to your Microsoft Fabric lakehouse and find the top-level **Tables** folder.

1. Right click on the **Tables** folder and click **Properties**.

   :::image type="content" source="media\onelake-azure-synapse-analytics\properties-context-menu.png" alt-text="Screenshot showing where to open the Properties pane lakehouse explorer." lightbox="media\onelake-azure-synapse-analytics\properties-context-menu.png":::

1. Copy the **ABFS path** from the properties pane.

   :::image type="content" source="media\onelake-azure-synapse-analytics\abfs-path.png" alt-text="Screenshot showing where to copy the ABFS path." lightbox="media\onelake-azure-synapse-analytics\abfs-path.png":::

1. Back in the Azure Synapse notebook, in the first new code cell, provide the lakehouse path. This is where your data will be written later. Run the cell.

   ```python
   # Replace the path below with the ABFS path to your lakehouse Tables folder. 
   oneLakePath = 'abfss://WorkspaceName@onelake.dfs.fabric.microsoft.com/LakehouseName.lakehouse/Tables'
   ```

1. In a new code cell, load data from an Azure open dataset into a dataframe. This is the dataset you will load into your lakehouse. Run the cell.

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

Congratulations! You can now read and write data in OneLake using Apache Spark in Azure Synapse Analytics.

## Next steps

- [Integrate OneLake with Azure Storage Explorer](onelake-azure-storage-explorer.md)
