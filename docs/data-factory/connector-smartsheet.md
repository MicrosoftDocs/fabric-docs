---
title: Set up your Smartsheet connection
description: This article provides information about how to create a Smartsheet connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Smartsheet connection

This article outlines the steps to create a Smartsheet connection.


## Supported authentication types

The Smartsheet connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Smartsheet account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Smartsheet using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Smartsheet](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Smartsheet data](#connect-to-smartsheet-data).

### Capabilities

[!INCLUDE [smartsheet-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/smartsheet/smartsheet-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [smartsheet-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/smartsheet/smartsheet-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Smartsheet data

[!INCLUDE [smartsheet-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/smartsheet/smartsheet-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Smartsheet in pipelines.

## Related content

- [For more information about this connector, see the Smartsheet connector documentation.](/power-query/connectors/smartsheet)
