---
title: Set up your Data Warehouse connection
description: This article provides information about how to create a Data Warehouse connection in Microsoft Fabric.
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

# Set up your Data Warehouse connection

This article outlines the steps to create a Data Warehouse connection.

## Supported authentication types

The Data Warehouse connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a Data Warehouse. The following links provide the specific Power Query connector information you need to connect to a Data Warehouse in Dataflow Gen2:

- To get started using the Warehouse connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Warehouse prerequisites](/power-query/connectors/warehouse#prerequisites) before connecting to the Warehouse connector.
- To connect to the Warehouse connector from Power Query, go to [Connect to a Warehouse from Power Query Online](/power-query/connectors/warehouse#connect-to-a-warehouse-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
