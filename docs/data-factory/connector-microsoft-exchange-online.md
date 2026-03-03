---
title: Set up your Microsoft Exchange Online connection
description: This article provides information about how to create a Microsoft Exchange Online connection in Microsoft Fabric.
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

You can connect Dataflow Gen2 in Microsoft Fabric to Microsoft Exchange Online using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Connect to Microsoft Exchange Online (from Power Query Online)](/power-query/connectors/microsoft-exchange-online#connect-to-microsoft-exchange-online-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Microsoft Exchange Online in pipelines.
