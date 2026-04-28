---
title: Set up your Delta Sharing connection
description: This article provides information about how to create a Delta Sharing connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Delta Sharing connection

This article outlines the steps to create a Delta Sharing connection.


## Supported authentication types

The Delta Sharing connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Key| n/a | √ |
|OAuth (OIDC)| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Delta Sharing using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Delta Sharing](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Delta Sharing data](#connect-to-delta-sharing-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

### Capabilities

[!INCLUDE [delta-sharing-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/delta-sharing/delta-sharing-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [delta-sharing-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/delta-sharing/delta-sharing-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Delta Sharing data

[!INCLUDE [delta-sharing-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/delta-sharing/delta-sharing-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [delta-sharing-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/delta-sharing/delta-sharing-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Delta Sharing in pipelines.

## Related content

- [For more information about this connector, see the Delta Sharing connector documentation.](/power-query/connectors/delta-sharing)
