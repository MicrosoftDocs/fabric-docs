---
title: Set up your Dataflow (Power Platform) connection
description: This article provides information about how to create a dataflow connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your dataflow (Power Platform) connection

This article outlines the steps to create a dataflow connection.


## Supported authentication types

The dataflow connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 to dataflows (Power Platform) in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Dataflow](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Get data from dataflows](#get-data-from-dataflows).

### Capabilities

[!INCLUDE [dataflows-ccapabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/dataflows/dataflows-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [dataflows-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/dataflows/dataflows-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Get data from dataflows

[!INCLUDE [dataflows-get-data-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/dataflows/dataflows-get-data-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [dataflows-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/dataflows/dataflows-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support dataflow data in pipelines.

## Related content

- [For more information about this connector, see the Dataflow (Power Platform) connector documentation.](/power-query/connectors/dataflows)
