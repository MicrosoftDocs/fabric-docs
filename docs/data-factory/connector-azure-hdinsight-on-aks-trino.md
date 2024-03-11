---
title: Set up your Azure HDInsight on AKS Trino connection
description: This article provides information about how to create an Azure HDInsight on AKS Trino connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Azure HDInsight on AKS Trino connection

This article outlines the steps to create an Azure HDInsight on AKS Trino connection.

## Supported authentication types

The Access database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure HDInsight on AKS Trino. The following links provide the specific Power Query connector information you need to connect to Azure HDInsight on AKS Trino in Dataflow Gen2:

- To get started using the Azure HDInsight on AKS Trino connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Azure HDInsight on AKS Trino prerequisites](/power-query/connectors/azure-hdinsight-on-aks-trino#prerequisites) before connecting to the Azure HDInsight on AKS Trino connector.
- To connect to the Azure HDInsight on AKS Trino connector from Power Query, go to [Connect to Azure HDInsight on AKS Trino from Power Query Online](/power-query/connectors/azure-hdinsight-on-aks-trino#connect-to-azure-hdinsight-on-aks-trino-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Azure HDInsight on AKS Trino in data pipelines.
