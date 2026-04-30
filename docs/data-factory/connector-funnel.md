---
title: Set up your Funnel connection
description: This article provides information about how to create a Funnel connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Funnel connection

This article outlines the steps to create a Funnel connection.


## Supported authentication types

The Funnel connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Funnel Workspace| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Funnel using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Funnel](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Funnel data](#connect-to-funnel-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

### Capabilities

[!INCLUDE [funnel-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/funnel/funnel-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [funnel-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/funnel/funnel-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Funnel data

[!INCLUDE [funnel-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/funnel/funnel-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [funnel-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/funnel/funnel-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Funnel in pipelines.

## Related content

- [For more information about this connector, see the Funnel connector documentation.](/power-query/connectors/funnel)
