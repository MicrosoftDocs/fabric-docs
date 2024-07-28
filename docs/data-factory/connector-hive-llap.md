---
title: Set up your Hive LLAP connection
description: This article provides information about how to create a Hive LLAP connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Hive LLAP connection

This article outlines the steps to create a Hive LLAP connection.


## Supported authentication types

The Hive LLAP connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Windows| n/a | √ |
|Basic| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Hive LLAP data. The following links provide the specific Power Query connector information you need to connect to Hive LLAP data in Dataflow Gen2:

- To get started using the Hive LLAP connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Hive LLAP prerequisites](/power-query/connectors/hive-llap#prerequisites) before connecting to the Hive LLAP connector.
- To connect to the Hive LLAP connector from Power Query, go to [Connect to Hive LLAP data from Power Query Online](/power-query/connectors/hive-llap#connect-to-hive-llap-data-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Hive LLAP data in data pipelines.
