---
title: Set up your Azure Analysis Services connection
description: This article provides information about how to create an Azure Analysis Services connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Azure Analysis Services connection

This article outlines the steps to create an Azure Analysis Services connection.

## Supported authentication types

The Azure Analysis Services connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure Analysis Services. The following links provide the specific Power Query connector information you need to connect to Azure Analysis Services in Dataflow Gen2:

- To get started using the Azure Analysis Services connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Azure Analysis Services prerequisites](/power-query/connectors/azure-analysis-services#prerequisites) before connecting to the Azure Analysis Services connector.
- To connect to the Azure Analysis Services connector from Power Query, go to [Connect to Azure Analysis Services database from Power Query Online](/power-query/connectors/azure-analysis-services#connect-to-azure-analysis-services-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Azure Analysis Services in data pipelines.
