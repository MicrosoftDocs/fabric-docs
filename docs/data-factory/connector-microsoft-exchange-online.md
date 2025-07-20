---
title: Set up your Microsoft Exchange Online connection
description: This article provides information about how to create a Microsoft Exchange Online connection in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Microsoft Exchange Online connection

This article outlines the steps to create a Microsoft Exchange Online connection.


## Supported authentication types

The Microsoft Exchange Online connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Microsoft Exchange Online. The following links provide the specific Power Query connector information you need to connect to Microsoft Exchange Online in Dataflow Gen2:

- To get started using the Microsoft Exchange Online connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To connect to the Microsoft Exchange Online connector from Power Query, go to [Connect to Microsoft Exchange Online from Power Query Online](/power-query/connectors/microsoft-exchange-online#connect-to-microsoft-exchange-online-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Microsoft Exchange Online in data pipelines.
