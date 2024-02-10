---
title: Set up your Azure Data Explorer connection
description: This article provides information about how to create an Azure Data Explorer connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
---

# Set up your Azure Data Explorer connection

This article outlines the steps to create an Azure Data Explorer connection.

## Supported authentication types

The Azure Data Explorer connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure Data Explorer. The following links provide the specific Power Query connector information you need to connect to Azure Data Explorer in Dataflow Gen2:

- To get started using the Azure Data Explorer connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Azure Data Explorer prerequisites](/power-query/connectors/azure-data-explorer#prerequisites) before connecting to the Azure Data Explorer connector.
- To connect to the Azure Data Explorer connector from Power Query, go to [Connect to Azure Data Explorer from Power Query Online](/power-query/connectors/azure-data-explorer#connect-to-azure-data-explorer-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
