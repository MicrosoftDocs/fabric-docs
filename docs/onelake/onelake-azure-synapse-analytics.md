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

This tutorial shows how to integrate OneLake with Azure Synapse Analytics. We encourage you to test any tools, programs, or services that you currently use today to interface with Azure Data Lake Storage (ADLS) Gen2.

## Using Azure Synapse Analytics

1. Open your Synapse workspace and [create an Apache Spark pool](/azure/synapse-analytics/quickstart-create-apache-spark-pool-portal) with your preferred parameters.

   :::image type="content" source="media\onelake-azure-synapse-analytics\new-apache-spark-pool.png" alt-text="Screenshot showing where to select New in the Apache Spark pool screen." lightbox="media\onelake-azure-synapse-analytics\new-apache-spark-pool.png":::

1. Create a new Apache Spark notebook.

1. Open the Spark notebook, set the language to **PySpark (Python)**, and connect it to your newly created Spark pool.

1. In a separate tab, navigate to your Microsoft Fabric Lakehouse.  Find the URL of your lakehouse in the Properties pane for any file in your lakehouse.

1. Build your OneLake URL for your lakehouse. This URL is the location for your data output:

   ```python
   oneLakePath = https://' + ‘Workspace Name or GUID’ + ‘@onelake.dfs.fabric.microsoft.com/’ + ‘Lakehouse Name.lakehouse or GUID’ + '/Files/'
   ```

1. Load data from an Azure open dataset into a dataframe. This file is the one you’ll load into your lakehouse. (You can also read a file from elsewhere in Fabric or choose a file from another ADLS Gen2 account you already own.)

   ```python
   yellowTaxiDF = spark.read.load('abfss://users@contosolake.dfs.core.windows.net/NYCTripSmall.parquet', format='parquet')
   display(yellowTaxiDF.limit(10))
   ```

1. Filter, transform, or prep your data. For this scenario, you can trim down your dataset for faster loading, join with other datasets, or filter down to specific results.

   ```python
   filteredTaxiDF = yellowTaxiDF.where(yellowTaxiDF.TripDistanceMiles>2).where(yellowTaxiDF.PassengerCount==1)display(filteredTaxiDF)
   ```

1. Write your filtered dataframe to your Fabric Lakehouse using your OneLake path.

   ```python
   filteredTaxiDF.write.format("csv").mode("overwrite").option("header", "true").csv(oneLakePath + 'taxi.csv')
   ```

1. Test that your data was successfully written by reading your newly loaded file.

   ```python
   lakehouseRead = spark.read.format('csv').option("header", "true").load(oneLakePath + 'taxi.csv')display(lakehouseRead.limit(10))
   ```

Congratulations! You can now read and write data in Fabric using Azure Synapse Spark. You can use this same code to read and write to an ADLS Gen2 folder; just change the URL.

## Next steps

- [Integrate OneLake with Azure Storage Explorer](onelake-azure-storage-explorer.md)
