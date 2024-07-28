---
title: Set up your Lakehouse connection
description: This article details how to use the Data Factory Lakehouse connector in Microsoft Fabric to create a data lake connection.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - ignite-2023
  - ignite-2023-fabric
---

# Set up your Lakehouse connection

You can connect to a Lakehouse data lake in Dataflow Gen2 using the Lakehouse connector provided by Data Factory in Microsoft Fabric.

## Supported authentication types

The Azure Blob Storage connector supports the following authentication types for copy and Dataflow Gen2 respectively.

| Authentication type | Copy | Dataflow Gen2 |
| --- | :---: | :---: |
| Organizational account | √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a Lakehouse. The following links provide the specific Power Query connector information you need to connect to a Lakehouse in Dataflow Gen2:

* To get started using the Lakehouse connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
* Be sure to install or set up any [Lakehouse prerequisites](/power-query/connectors/lakehouse#prerequisites) before connecting to the Lakehouse connector.
* To connect to the Lakehouse connector from Power Query, go to [Connect to a Lakehouse from Power Query Online](/power-query/connectors/lakehouse#connect-to-a-lakehouse-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Related content

* [Configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md)
