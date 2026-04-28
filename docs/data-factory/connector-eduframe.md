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


## Supported authentication types

The Eduframe connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Eduframe account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Eduframe using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Eduframe](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Eduframe data](#connect-to-eduframe-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

### Capabilities

[!INCLUDE [eduframe-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/eduframe/eduframe-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [eduframe-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/eduframe/eduframe-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Eduframe data

[!INCLUDE [eduframe-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/eduframe/eduframe-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [eduframe-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/eduframe/eduframe-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Eduframe in pipelines.

## Related content

- [For more information about this connector, see the Eduframe connector documentation.](/power-query/connectors/eduframe)
