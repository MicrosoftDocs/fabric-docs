---
title: Set up your Adobe Analytics connection
description: This article provides information about how to create an Adobe Analytics connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Adobe Analytics connection

This article outlines the steps to create an Adobe Analytics connection.


## Supported authentication types

The Adobe Analytics connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Adobe Analytics using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Adobe Analytics](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Adobe Analytics data](#connect-to-adobe-analytics-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

### Capabilities

[!INCLUDE [adobe-analytics-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/adobe-analytics/adobe-analytics-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [adobe-analytics-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/adobe-analytics/adobe-analytics-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Adobe Analytics data

[!INCLUDE [adobe-analytics-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/adobe-analytics/adobe-analytics-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [adobe-analytics-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/adobe-analytics/adobe-analytics-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Adobe Analytics in pipelines.

## Related content

- [For more information about this connector, see the Adobe Analytics connector documentation.](/power-query/connectors/adobe-analytics)
