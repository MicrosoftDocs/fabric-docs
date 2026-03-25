---
title: Set up your Google BigQuery connection
description: This article provides information about how to create a Google BigQuery connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Google BigQuery connection

This article outlines the steps to create a Google BigQuery connection.


## Supported authentication types

The Google BigQuery connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Service Account Login| √ | √ |
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Google BigQuery using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Google BigQuery](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Google BigQuery data](#connect-to-google-bigquery-data).

### Capabilities

[!INCLUDE [google-bigquery-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/google-bigquery/google-bigquery-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [google-bigquery-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/google-bigquery/google-bigquery-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Google BigQuery data

[!INCLUDE [google-bigquery-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/google-bigquery/google-bigquery-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [google-bigquery-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/google-bigquery/google-bigquery-limitations-and-considerations-include.md)]

## Related content

- [For more information about this connector, see the Google BigQuery connector documentation.](/power-query/connectors/google-bigquery)
