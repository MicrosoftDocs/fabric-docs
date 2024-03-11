---
title: Set up your CloudBluePSA (Beta) connection
description: This article provides information about how to create a CloudBluePSA connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your CloudBluePSA (Beta) connection

This article outlines the steps to create a CloudBluePSA connection.

## Supported authentication types

The CloudBluePSA connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to CloudBluePSA. The following links provide the specific Power Query connector information you need to connect to CloudBluePSA in Dataflow Gen2:

- To get started using the CloudBluePSA connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [CloudBluePSA prerequisites](/power-query/connectors/cloudbluepsa#prerequisites) before connecting to the CloudBluePSA connector.
- To connect to the CloudBluePSA connector from Power Query, go to [Connect to CloudBluePSA from Power Query Online](/power-query/connectors/cloudbluepsa#connect-to-cloudbluepsa-from-powerquery-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support CloudBluePSA in data pipelines.
