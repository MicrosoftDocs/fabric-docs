---
title: Set up your Dataflows (Power Platform) connection
description: This article provides information about how to create a Dataflows connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Dataflows (Power Platform) connection

This article outlines the steps to create a Dataflows connection.


## Supported authentication types

The Dataflows connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Dataflows data. The following links provide the specific Power Query connector information you need to connect to Dataflows data in Dataflow Gen2:

- To get started using the Dataflows connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Dataflows prerequisites](/power-query/connectors/dataflows#prerequisites) before connecting to the Dataflows connector.
- To connect to the Dataflows connector from Power Query, go to [Get data from Dataflows in Power Query Online](/power-query/connectors/dataflows#get-data-from-dataflows-in-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Dataflows data in data pipelines.
