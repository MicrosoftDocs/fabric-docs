---
title: Set up your Google Sheets connection
description: This article provides information about how to create a Google Sheets connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Google Sheets connection

This article outlines the steps to create a Google Sheets connection.


## Supported authentication types

The Google Sheets connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Google Sheets using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Google Sheets](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Google Sheets data](#connect-to-google-sheets-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

### Capabilities

[!INCLUDE [google-sheets-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/google-sheets/google-sheets-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [google-sheets-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/google-sheets/google-sheets-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Google Sheets data

[!INCLUDE [google-sheets-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/google-sheets/google-sheets-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [google-sheets-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/google-sheets/google-sheets-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Google Sheets in pipelines.

## Related content

- [For more information about this connector, see the Google Sheets connector documentation.](/power-query/connectors/google-sheets)
