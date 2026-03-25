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


## Supported authentication types

The Google Analytics connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Google Analytics using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Google Analytics](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Google Analytics data](#connect-to-google-analytics-data).

### Capabilities

[!INCLUDE [google-analytics-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/google-analytics/google-analytics-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [google-analytics-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/google-analytics/google-analytics-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Google Analytics data

[!INCLUDE [google-analytics-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/google-analytics/google-analytics-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [google-analytics-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/google-analytics/google-analytics-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Google Analytics data in pipelines.

## Related content

- [For more information about this connector, see the Google Analytics connector documentation.](/power-query/connectors/google-analytics)
