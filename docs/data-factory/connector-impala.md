---
title: Set up your Impala database connection
description: This article provides information about how to create an Impala database connection in Microsoft Fabric.
author: whhender
ms.author: whhender
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

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to an Impala database. The following links provide the specific Power Query connector information you need to connect to an Impala database in Dataflow Gen2:

- To get started using the Impala connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To connect to the Impala connector from Power Query, go to [Connect to an Impala database from Power Query Online](/power-query/connectors/impala-database#connect-to-an-impala-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support an Impala database in data pipelines.
