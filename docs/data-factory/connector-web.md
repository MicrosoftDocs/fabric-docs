---
title: Set up your Web connection
description: This article provides information about how to create a Web connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Web connection

This article outlines the steps to create either a Web API or Web page connection.


## Supported authentication types

Both the Web API and Web page connectors support the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Basic (Username/Password)| n/a | √ |
|Organizational account| n/a | √ |
|Windows| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Web using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Web](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Load web data](#load-web-data).

### Capabilities

[!INCLUDE [web-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/web/web-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [web-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/web/web-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Load web data

[!INCLUDE [web-load-data-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/web/web-load-data-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support the Web API or Web page connector in pipelines.

## Related content

- [For more information about this connector, see the Web connector documentation.](/power-query/connectors/web/web)
