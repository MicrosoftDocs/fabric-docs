---
title: Set up your Azure Synapse Analytics connection
description: This article provides information about how to create an Azure Synapse Analytics connection in Microsoft Fabric.
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

# Set up your Azure Synapse Analytics connection

This article outlines the steps to create an Azure Synapse Analytics connection.

## Supported authentication types

The Azure Synapse Analytics connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| √ | √ |
|Organizational account| √ | √ |
|Service principal | √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure Synapse Analytics. The following links provide the specific Power Query connector information you need to connect to Azure Synapse Analytics in Dataflow Gen2:

- To get started using the Azure Synapse Analytics connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Azure Synapse Analytics prerequisites](/power-query/connectors/azure-sql-data-warehouse#prerequisites) before connecting to the Azure Synapse Analytics connector.
- To connect to the Azure Synapse Analytics connector from Power Query, go to [Connect to Azure Synapse Analytics from Power Query Online](/power-query/connectors/azure-sql-data-warehouse#connect-to-azure-synapse-analytics-sql-dw-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
