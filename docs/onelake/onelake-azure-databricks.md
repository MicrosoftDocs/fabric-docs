---
title: OneLake integration with Azure Databricks
description: Learn how to connect to OneLake via Azure Databricks. After completing this tutorial, you can read and write to a lakehouse via Azure Databricks.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: how-to
ms.date: 03/24/2023
---

# OneLake integration: Azure Databricks

[!INCLUDE [preview-note](../includes/preview-note.md)]

This scenario shows how to connect to OneLake via Azure Databricks. After completing this tutorial, you'll be able to read and write to a Microsoft Fabric Lakehouse via Azure Databricks.

## Prerequisites

Before you connect, you must have the following:

- A Fabric workspace. For detailed instructions in creating and gaining access to a Fabric workspace, follow these steps: Quickstart: Create a workspace for Project Trident.
- A Fabric Lakehouse with data loaded into it. Follow Scenario one for more details.
- An Azure Databricks workspace. To use Azure Active Directory (Azure AD) passthrough to authenticate to Fabric, you must have a premium Azure Databricks workspace.

## Set up your Databricks workspace

1. Open your Azure Databricks workspace and select **Create** > **Cluster**.

1. To authenticate to OneLake with your Azure AD identity, you must enable Azure Data Lake Storage credential passthrough on your cluster in the Advanced Options.

   IMAGE advanced-options-create-cluster.png Screenshot showing where to select Create cluster in the Advanced options screen.

   > [!NOTE]
   > You can also connect Databricks to OneLake using a service principal. For more information about authenticating Azure Databricks using a service principal, see [Service principals for Azure Databricks automation](/azure/databricks/dev-tools/service-principals).

1. Create the cluster with your preferred parameters. For more information on creating a Databricks cluster, see [Configure clusters - Azure Databricks](/azure/databricks/clusters/configure).

1. Open a notebook and connect it to your newly created cluster.

## Author your notebook

1. Navigate to your Fabric Lakehouse and find the GUID for your workspace and lakehouse. You can find them in the URL of your lakehouse or the **Properties** pane for a file.

1. Copy the workspace and lakehouse GUIDs into your Databricks notebook and build your OneLake URL for your lakehouse. This location is what you’ll write your data into (example shown for East US 2):

   > [!NOTE]
   > Azure Databricks only supports the Azure Blob Filesystem (ABFS) driver when reading and writing to Azure Data Lake Storage (ADLS) Gen 2 and OneLake, so you’ll use a different format for your regional URI: *abfss://{workspaceGUID}@onelake{region}.dfs.fabric.microsoft.com/.*

   ```
   oneLakePath = 'abfss://' + workspaceGUID + '@onelakeeastus2.pbidedicated.windows.net/' + lakehouseGUID + '/Files/'oneLakePath = 'abfss://' + workspaceGUID + '@onelakeeastus2.dfs.fabric.microsoft.com/' + lakehouseGUID + '/Files/'oneLakePath = 'abfss://' + workspaceGUID + '@onelakeeastus2.pbidedicated.windows.net/' + lakehouseGUID + '/Files/'oneLakePath = 'abfss://' + workspaceGUID + '@onelakeeastus2.dfs.fabric.microsoft.com/' + lakehouseGUID + '/Files/'`
   ```

1. Load data from a Databricks public dataset into a dataframe. This file is the one you’ll load into your lakehouse. You can also read a file from elsewhere in Fabric or choose a file from another ADLS Gen 2 account you already own.

   ```
   yellowTaxiDF = (spark.read  .format("csv")  .option("header", "true")  .option("inferSchema", "true")  .load("/databricks-datasets/nyctaxi/tripdata/yellow/yellow_tripdata_2019-12.csv.gz"))yellowTaxiDF = (spark.read  .format("csv")  .option("header", "true")  .option("inferSchema", "true")  .load("/databricks-datasets/nyctaxi/tripdata/yellow/yellow_tripdata_2019-12.csv.gz"))
   ```

1. Filter, transform, or prep your data. For this scenario, you can trim down your dataset for faster loading, join with other datasets, or filter down to specific results.

   `filteredTaxiDF = yellowTaxiDF.where(yellowTaxiDF.fare_amount<4).where(yellowTaxiDF.passenger_count==4)display(filteredTaxiDF)filteredTaxiDF = yellowTaxiDF.where(yellowTaxiDF.fare_amount<4).where(yellowTaxiDF.passenger_count==4)display(filteredTaxiDF)`

1. Write your filtered dataframe to your Fabric Lakehouse using your OneLake path.

   `filteredTaxiDF.write.format("csv").mode("overwrite").csv(oneLakePath)filteredTaxiDF.write.format("csv").mode("overwrite").csv(oneLakePath)`

1. Test that your data was successfully written by reading your newly loaded file.

   ```
   lakehouseRead = spark.read.format('csv').load(oneLakePath)display(lakehouseRead.limit(10))lakehouseRead = spark.read.format('csv').load(oneLakePath)display(lakehouseRead.limit(10))
   ```

Congratulations! You can now read and write data in Fabric using Azure Databricks.

## Next steps

- [OneLake integration: Azure HDInsight](onelake-azure-hdinsight.md)
