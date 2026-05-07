---
title: Set up your OneStream connection
description: This article provides information about how to create a OneStream connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your OneStream connection

This article outlines the steps to create a OneStream connection.


## Supported authentication types

The OneStream connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to OneStream using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for OneStream](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to OneStream data](#connect-to-onestream-data).

### Capabilities

[!INCLUDE [onestream-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/onestream/onestream-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [onestream-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/onestream/onestream-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to OneStream data

[!INCLUDE [onestream-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/onestream/onestream-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support OneStream in pipelines.

## Related content

- [For more information about this connector, see the OneStream connector documentation.](/power-query/connectors/onestream)
