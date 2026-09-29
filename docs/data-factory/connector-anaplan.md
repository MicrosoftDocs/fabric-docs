---
title: Set up your Anaplan connection
description: This article provides information about how to create an Anaplan connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Anaplan connection

This article outlines the steps to create an Anaplan connection.


<a id="supported-authentication-types"></a>

## Summary

The Anaplan connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| n/a | √ |
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect dataflow Gen2 in Fabric to Anaplan by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Anaplan](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Anaplan data](#connect-to-anaplan-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

## Prerequisites

[!INCLUDE [anaplan-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/anaplan/anaplan-prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [anaplan-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/anaplan/anaplan-capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-anaplan-data"></a>

### Connection instructions

[!INCLUDE [anaplan-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/anaplan/anaplan-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory doesn't currently support Anaplan in pipelines.

## Limitations and considerations

[!INCLUDE [anaplan-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/anaplan/anaplan-limitations-and-considerations-include.md)]

## Related content

- [For more information about this connector, see the Anaplan connector documentation.](/power-query/connectors/anaplan)
