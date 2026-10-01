---
title: Set up your Eduframe connection
description: This article provides information about how to create an Eduframe connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Eduframe connection

This article outlines the steps to create an Eduframe connection.


<a id="supported-authentication-types"></a>

## Summary

The Eduframe connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Eduframe account| n/a | √ |

## Set up your connection for dataflow Gen2
You can connect dataflow Gen2 in Fabric to Eduframe using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Eduframe](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Eduframe data](#connect-to-eduframe-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

## Prerequisites

[!INCLUDE [eduframe-prerequisites](includes/power-query/connectors/includes/eduframe/prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [eduframe-capabilities-supported](includes/power-query/connectors/includes/eduframe/capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-eduframe-data"></a>

### Connection instructions

[!INCLUDE [eduframe-connect-to-power-query-online](includes/power-query/connectors/includes/eduframe/connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory doesn't currently support Eduframe in pipelines.

## Limitations and considerations

[!INCLUDE [eduframe-limitations-and-considerations](includes/power-query/connectors/includes/eduframe/limitations.md)]

## Related content

- [For more information about this connector, see the Eduframe connector documentation.](/power-query/connectors/eduframe)
