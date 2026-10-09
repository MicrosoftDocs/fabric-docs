---
title: Set up your Dataflow (Power Platform) connection
description: This article provides information about how to create a dataflow connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your dataflow (Power Platform) connection

This article outlines the steps to create a dataflow connection.


<a id="supported-authentication-types"></a>

## Summary

The dataflow connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for dataflow Gen2
You can connect dataflow Gen2 to dataflows (Power Platform) in Fabric by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for dataflow](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Get data from dataflows](#get-data-from-dataflows).

## Prerequisites

[!INCLUDE [dataflows-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/dataflows/prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [dataflows-ccapabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/dataflows/capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="get-data-from-dataflows"></a>

### Connection instructions

[!INCLUDE [dataflows-get-data-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/dataflows/connect-online.md)]

## Set up your connection in a pipeline

Data Factory doesn't currently support dataflow data in pipelines.

## Limitations and considerations

[!INCLUDE [dataflows-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/dataflows/limitations.md)]

## Related content

- [For more information about this connector, see the dataflow (Power Platform) connector documentation.](/power-query/connectors/dataflows)
