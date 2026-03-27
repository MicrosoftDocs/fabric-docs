---
title: Set up your Microsoft Exchange Online connection
description: This article provides information about how to create a Microsoft Exchange Online connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Microsoft Exchange Online connection

This article outlines the steps to create a Microsoft Exchange Online connection.


## Supported authentication types

The Microsoft Exchange Online connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Microsoft Exchange Online using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Connect to Microsoft Exchange Online](#connect-to-microsoft-exchange-online).

### Capabilities

[!INCLUDE [microsoft-exchange-online-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/microsoft-exchange-online/microsoft-exchange-online-capabilities-supported.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Microsoft Exchange Online

[!INCLUDE [microsoft-exchange-online-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/microsoft-exchange-online/microsoft-exchange-online-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Microsoft Exchange Online in pipelines.

## Related content

- [For more information about this connector, see the Microsoft Exchange Online connector documentation.](/power-query/connectors/microsoft-exchange-online)
