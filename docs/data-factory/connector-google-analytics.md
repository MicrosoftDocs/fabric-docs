---
title: Set up your Google Analytics connection
description: This article provides information about how to create a Google Analytics connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Google Analytics connection

This article outlines the steps to create a Google Analytics connection.


<a id="supported-authentication-types"></a>

## Summary

The Google Analytics connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for dataflow Gen2
You can connect dataflow Gen2 in Fabric to Google Analytics by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Google Analytics](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Google Analytics data](#connect-to-google-analytics-data).

## Prerequisites

[!INCLUDE [google-analytics-prerequisites](includes/power-query/connectors/includes/google-analytics/google-analytics-prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [google-analytics-capabilities-supported](includes/power-query/connectors/includes/google-analytics/google-analytics-capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-google-analytics-data"></a>

### Connection instructions

[!INCLUDE [google-analytics-connect-to-power-query-online](includes/power-query/connectors/includes/google-analytics/google-analytics-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory doesn't currently support Google Analytics data in pipelines.

## Limitations and considerations

[!INCLUDE [google-analytics-limitations-and-considerations](includes/power-query/connectors/includes/google-analytics/limitations.md)]

## Related content

- [For more information about this connector, see the Google Analytics connector documentation.](/power-query/connectors/google-analytics)
