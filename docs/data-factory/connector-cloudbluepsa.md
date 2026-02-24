---
title: Set up your CloudBluePSA (Beta) connection
description: This article provides information about how to create a CloudBluePSA connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 12/29/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your CloudBluePSA (Beta) connection

This article outlines the steps to create a CloudBluePSA connection.

## Supported authentication types

The CloudBluePSA connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 to CloudBluePSA in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up CloudBluePSA prerequisites](/power-query/connectors/cloudbluepsa#prerequisites).
1. [Connect to CloudBluePSA (from Power Query online)](/power-query/connectors/cloudbluepsa#connect-to-cloudbluepsa-from-powerquery-online).

### More information

- [CloudBluePSA connector capabilities](/power-query/connectors/cloudbluepsa#troubleshooting)

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support CloudBluePSA in pipelines.
