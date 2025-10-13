---
title: Set up your Dataflow (Power Platform) connection
description: This article provides information about how to create a dataflow connection in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Set up your dataflow (Power Platform) connection

This article outlines the steps to create a dataflow connection.


## Supported authentication types

The dataflow connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to dataflow data. The following links provide the specific Power Query connector information you need to connect to dataflow data in Dataflow Gen2:

- To get started using the dataflow connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [dataflow prerequisites](/power-query/connectors/dataflows#prerequisites) before connecting to the dataflow connector.
- To connect to the dataflow connector from Power Query, go to [Get data from dataflows in Power Query Online](/power-query/connectors/dataflows#get-data-from-dataflows-in-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support dataflow data in pipelines.
