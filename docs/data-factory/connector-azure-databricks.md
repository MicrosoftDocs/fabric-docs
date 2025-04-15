---
title: Set up your Azure Databricks connection
description: This article provides information about how to create an Azure Databricks connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 04/07/2025
ms.custom:
  - template-how-to
---

# Set up your Azure Databricks connection

This article outlines the steps to create an Azure Databricks connection.

## Supported authentication types

The Azure Databricks connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Username/Password| n/a | √ |
|Personal Access Token| √ | √ |
|Microsoft Entra ID| n/a | √ |

## Prerequisites

To use this Azure Databricks connector, you need to set up a cluster in Azure Databricks.

- To copy data to Azure Databricks, Copy activity invokes Azure Databricks cluster to read data from an Azure Storage, which is either your original source or a staging area to where the service firstly writes the source data via built-in staged copy. Learn more from [Azure Databricks as the destination](connector-azure-databricks-copy-activity.md#destination).
- Similarly, to copy data from Azure Databricks, Copy activity invokes Azure Databricks cluster to write data to an Azure Storage, which is either your original destination or a staging area from where the service continues to write data to final destination via built-in staged copy. Learn more from [Azure Databricks as the source](connector-azure-databricks-copy-activity.md#source).

The Databricks cluster needs to have access to Azure Blob or Azure Data Lake Storage Gen2 account, both the storage container/file system used for source/destination/staging and the container/file system where you want to write the Azure Databricks tables.

- To use **Azure Data Lake Storage Gen2**, you can configure a **service principal** on the Databricks cluster as part of the Apache Spark configuration. Follow the steps in [Access directly with service principal](/azure/databricks/data/data-sources/azure/azure-datalake-gen2#--access-directly-with-service-principal-and-oauth-20).

- To use **Azure Blob storage**, you can configure a **storage account access key** or **SAS token** on the Databricks cluster as part of the Apache Spark configuration. Follow the steps in [Access Azure Blob storage using the RDD API](/azure/databricks/data/data-sources/azure/azure-storage#access-azure-blob-storage-using-the-rdd-api).

During copy activity execution, if the cluster you configured has been terminated, the service automatically starts it. If you author pipeline using authoring UI, for operations like data preview, you need to have a live cluster, the service won't start the cluster on your behalf.

### Specify the cluster configuration

1. In the **Cluster Mode** drop-down, select **Standard**.

2. In the **Databricks Runtime Version** drop-down, select a Databricks runtime version.

3. Turn on [Auto Optimize](/azure/databricks/optimizations/auto-optimize) by adding the following properties to your [Spark configuration](/azure/databricks/clusters/configure#spark-config):

   ```
   spark.databricks.delta.optimizeWrite.enabled true
   spark.databricks.delta.autoCompact.enabled true
   ```

4. Configure your cluster depending on your integration and scaling needs.

For cluster configuration details, see [Configure clusters](/azure/databricks/clusters/configure).

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure Databricks. The following links provide the specific Power Query connector information you need to connect to Azure Databricks in Dataflow Gen2:

- To get started using the Azure Databricks connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To connect to the Azure Databricks connector from Power Query, go to [Connect to Databricks data from Power Query Online](/power-query/connectors/databricks-azure#connect-to-databricks-data-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
