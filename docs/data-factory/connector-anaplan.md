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


## Supported authentication types

The Anaplan connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| n/a | √ |
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Anaplan using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Anaplan](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Anaplan data](#connect-to-anaplan-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

### Capabilities

[!INCLUDE [anaplan-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/anaplan/anaplan-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [anaplan-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/anaplan/anaplan-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Anaplan data

[!INCLUDE [anaplan-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/anaplan/anaplan-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [anaplan-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/anaplan/anaplan-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Anaplan in pipelines.

## Related content

- [For more information about this connector, see the Anaplan connector documentation.](/power-query/connectors/anaplan)
