---
title: OneLake integration with Azure Synapse Analytics
description: Learn about Microsoft Fabric integration with Azure services, specifically how to read and write data in Fabric using Azure Synapse Spark.
ms.reviewer: eloldag
ms.author: mahi
author: matt1883
ms.topic: how-to
ms.date: 03/24/2023
---

# OneLake integration: Azure Synapse Analytics

[!INCLUDE [preview-note](../includes/preview-note.md)]

This tutorial is an example of OneLake integration with Azure. We encourage you to test any tools, programs, or services that you currently use today to interface with Azure Data Lake Storage (ADLS) Gen2.

## Using Azure Synapse Analytics

1. Open your Synapse workspace and create an Apache Spark pool with your preferred parameters.

   :::image type="content" source="media\onelake-azure-synapse-analytics\new-apache-spark-pool.png" alt-text="Screenshot showing where to select New in the Apache Spark pool screen." lightbox="media\onelake-azure-synapse-analytics\new-apache-spark-pool.png":::

   For more information on creating a pool, see [Quickstart: Create a new serverless Apache Spark pool using the Azure portal](/azure/synapse-analytics/quickstart-create-apache-spark-pool-portal)

1. Create a new Apache Spark notebook.

1. Open the Spark notebook, set the language to PySpark (Python), and connect it to your newly created Spark pool.

1. In a separate tab, navigate to your Microsoft Fabric Lakehouse and find the GUIDs associated with your workspace and lakehouse. (You can find these values in the URL of your lakehouse or in the **Properties** pane for any file in your lakehouse.)

1. Copy the workspace and lakehouse GUIDs into your Spark notebook, and build your OneLake URL for your lakehouse. This location is what you'll write your data into. The following example is for East US 2:

   ```
   `oneLakePath = https://' + workspaceGUID + '@onelake.dfs.fabric.microsoft.com/' + lakehouseGUID + '/Files/'oneLakePath = https://' + workspaceGUID + '@onelake.dfs.fabric.microsoft.com/' + lakehouseGUID + '/Files/'`
   ```

1. Load data from an Azure open dataset into a dataframe. This file is the one you’ll load into your lakehouse. (You can also read a file from elsewhere in Fabric or choose a file from another ADLS Gen 2 account you already own.)

   ```
   yellowTaxiDF = spark.read.load('abfss://users@contosolake.dfs.core.windows.net/NYCTripSmall.parquet', format='parquet')display(yellowTaxiDF.limit(10))yellowTaxiDF = spark.read.load('abfss://users@contosolake.dfs.core.windows.net/NYCTripSmall.parquet', format='parquet')display(yellowTaxiDF.limit(10))
   ```

1. Filter, transform, or prep your data. For this scenario, you can trim down your dataset for faster loading, join with other datasets, or filter down to specific results.

   ```
   filteredTaxiDF = yellowTaxiDF.where(yellowTaxiDF.TripDistanceMiles>2).where(yellowTaxiDF.PassengerCount==1)display(filteredTaxiDF)filteredTaxiDF = yellowTaxiDF.where(yellowTaxiDF.TripDistanceMiles>2).where(yellowTaxiDF.PassengerCount==1)display(filteredTaxiDF)`
   ```

1. Write your filtered dataframe to your Fabric Lakehouse using your OneLake path.

   ```
   filteredTaxiDF.write.format("csv").mode("overwrite").option("header", "true").csv(oneLakePath + 'taxi.csv')filteredTaxiDF.write.format("csv").mode("overwrite").option("header", "true").csv(oneLakePath + 'taxi.csv')`
   ```

1. Test that your data was successfully written by reading your newly loaded file.

   ```
   lakehouseRead = spark.read.format('csv').option("header", "true").load(oneLakePath + 'taxi.csv')display(lakehouseRead.limit(10))lakehouseRead = spark.read.format('csv').option("header", "true").load(oneLakePath + 'taxi.csv')display(lakehouseRead.limit(10))
   ```

Congratulations! You can now read and write data in Fabric using Azure Synapse Spark. You can use this same code to read and write to an ADLS Gen 2 folder; just change the URL.

## Next steps

- [OneLake integration: Azure Storage Explorer](onelake-azure-storage-explorer.md)
