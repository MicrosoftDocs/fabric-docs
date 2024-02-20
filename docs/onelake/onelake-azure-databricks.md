---
title: Integrate OneLake with Azure Databricks
description: Learn how to connect to OneLake via Azure Databricks. After completing this tutorial, you can read and write to a lakehouse via Azure Databricks.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 09/27/2023
---

# Integrate OneLake with Azure Databricks

This scenario shows how to connect to OneLake via Azure Databricks. After completing this tutorial, you'll be able to read and write to a Microsoft Fabric lakehouse from your Azure Databricks workspace.

## Prerequisites

Before you connect, you must have:

- A Fabric workspace and lakehouse.
- A premium Azure Databricks workspace. Only premium Azure Databricks workspaces support Microsoft Entra credential passthrough, which you need for this scenario.

## Set up your Databricks workspace

1. Open your Azure Databricks workspace and select **Create** > **Cluster**.

1. To authenticate to OneLake with your Microsoft Entra identity, you must enable Azure Data Lake Storage (ADLS) credential passthrough on your cluster in the Advanced Options.

   :::image type="content" source="media\onelake-azure-databricks\advanced-options-create-cluster.png" alt-text="Screenshot showing where to select Create cluster in the Advanced options screen.":::

   > [!NOTE]
   > You can also connect Databricks to OneLake using a service principal. For more information about authenticating Azure Databricks using a service principal, see [Service principals for Azure Databricks automation](/azure/databricks/administration-guide/users-groups/service-principals).

1. Create the cluster with your preferred parameters. For more information on creating a Databricks cluster, see [Configure clusters - Azure Databricks](/azure/databricks/clusters/configure).

1. Open a notebook and connect it to your newly created cluster.

## Author your notebook

1. Navigate to your Fabric lakehouse and copy the Azure Blob Filesystem (ABFS) path to your lakehouse. You can find it in the **Properties** pane.

   > [!NOTE]
   > Azure Databricks only supports the Azure Blob Filesystem (ABFS) driver when reading and writing to ADLS Gen2 and OneLake: `abfss://myWorkspace@onelake.dfs.fabric.microsoft.com/`.

1. Save the path to your lakehouse in your Databricks notebook. This lakehouse is where you write your processed data later:

   ```python
   oneLakePath = 'abfss://myWorkspace@onelake.dfs.fabric.microsoft.com/myLakehouse.lakehouse/Files/'
   ```

1. Load data from a Databricks public dataset into a dataframe. You can also read a file from elsewhere in Fabric or choose a file from another ADLS Gen2 account you already own.

   ```python
   yellowTaxiDF = spark.read.format("csv").option("header", "true").option("inferSchema", "true").load("/databricks-datasets/nyctaxi/tripdata/yellow/yellow_tripdata_2019-12.csv.gz")
   ```

1. Filter, transform, or prep your data. For this scenario, you can trim down your dataset for faster loading, join with other datasets, or filter down to specific results.

   ```python
   filteredTaxiDF = yellowTaxiDF.where(yellowTaxiDF.fare_amount<4).where(yellowTaxiDF.passenger_count==4)
   display(filteredTaxiDF)
   ```

1. Write your filtered dataframe to your Fabric lakehouse using your OneLake path.

   ```python
   filteredTaxiDF.write.format("csv").option("header", "true").mode("overwrite").csv(oneLakePath)
   ```

1. Test that your data was successfully written by reading your newly loaded file.

   ```python
   lakehouseRead = spark.read.format('csv').option("header", "true").load(oneLakePath)
   display(lakehouseRead.limit(10))
   ```

Congratulations. You can now read and write data in Fabric using Azure Databricks.

## Related content

- [Integrate OneLake with Azure HDInsight](onelake-azure-hdinsight.md)
