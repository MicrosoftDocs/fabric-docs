---
title: Set up your Dataflow (Power Platform) connection
description: This article provides information about how to create a dataflow connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 12/29/2025
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

You can connect Dataflow Gen2 to dataflows (Power Platform) in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
1. [Set up dataflow prerequisites](/power-query/connectors/dataflows#prerequisites).
1. [Get data from dataflows (from Power Query online)](/power-query/connectors/dataflows#get-data-from-dataflows-in-power-query-online).

### More information

- [Dataflows connector capabilities](/power-query/connectors/dataflows#capabilities-supported)
- [Dataflows connector known issues and limitations](/power-query/connectors/dataflows#known-issues-and-limitations)
- [Dataflows connector frequently asked questions](/power-query/connectors/dataflows#frequently-asked-questions)

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support dataflow data in pipelines.
