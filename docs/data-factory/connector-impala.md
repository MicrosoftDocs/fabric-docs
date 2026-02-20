---
title: Set up your Impala database connection
description: This article provides information about how to create an Impala database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Impala database connection

This article outlines the steps to create an Impala database connection.


## Supported authentication types

The Impala connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Windows| n/a | √ |
|Database| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to Impala using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. Check [Impala considerations and limitations](/power-query/connectors/impala-database#considerations-and-limitations) to make sure your scenario is supported.
1. [Connect to an Impala database (from Power Query Online)](/power-query/connectors/impala-database#connect-to-an-impala-database-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support an Impala database in pipelines.
