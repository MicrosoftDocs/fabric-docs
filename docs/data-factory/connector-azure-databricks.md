---
title: Set up your Azure Databricks connection
description: This article provides information about how to create an Azure Databricks connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Azure Databricks connection

This article outlines the steps to create an Azure Databricks connection.

## Supported authentication types

The Azure Databricks connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Username/Password| n/a | √ |
|Personal Access Token| n/a | √ |
|Microsoft Entra ID| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure Databricks. The following links provide the specific Power Query connector information you need to connect to Azure Databricks in Dataflow Gen2:

- To get started using the Azure Databricks connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To connect to the Azure Databricks connector from Power Query, go to [Connect to Databricks data from Power Query Online](/power-query/connectors/databricks-azure#connect-to-databricks-data-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Azure Databricks in data pipelines.
