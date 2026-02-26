---
title: Set up your Databricks connection
description: This article provides information about how to create a Databricks connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 12/29/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Databricks connection

This article outlines the steps to create a Databricks connection.


## Supported authentication types

The Databricks connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Username/Password| n/a | √ |
|Personal Access Token| n/a | √ |
|OAuth (OIDC)| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 to Databricks in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
1. [Set up Databricks prerequisites](/power-query/connectors/databricks#prerequisites).
1. [Connect to Databricks (from Power Query online)](/power-query/connectors/databricks#connect-to-databricks-data-from-power-query-online).

### More information

- [Databricks connector capabilities](/power-query/connectors/databricks#capabilities-supported)

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support the Databricks connector in pipelines.
