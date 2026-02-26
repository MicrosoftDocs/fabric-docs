---
title: Set up your Hive LLAP connection
description: This article provides information about how to create a Hive LLAP connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
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

You can connect Dataflow Gen2 in Microsoft Fabric to Hive LLAP using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up Hive LLAP prerequisites](/power-query/connectors/hive-llap#prerequisites).
1. [Connect to Hive LLAP data (from Power Query Online)](/power-query/connectors/hive-llap#connect-to-hive-llap-data-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Hive LLAP data in pipelines.
