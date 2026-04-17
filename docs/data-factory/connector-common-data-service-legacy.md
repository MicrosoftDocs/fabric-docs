---
title: Set up your Common Data Service (Legacy) connection
description: This article provides information about how to create a Common Data Service (Legacy) connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Common Data Service (Legacy) connection

This article outlines the steps to create a Common Data Service (Legacy) connection.

## Supported authentication types

The Common Data Service (Legacy) connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 to Common Data Service (Legacy) in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Common Data Service (Legacy)](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Find your Common Data Service (Legacy) URL](#find-your-common-data-service-legacy-url).
1. [Connect to Common Data Service (Legacy)](#connect-to-common-data-service-legacy).


### Capabilities

[!INCLUDE [common-data-service-legacy-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/common-data-service-legacy/common-data-service-legacy-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [common-data-service-legacy-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/common-data-service-legacy/common-data-service-legacy-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Find your Common Data Service (Legacy) URL

[!INCLUDE [common-data-service-legacy-find-environment-url](~/../powerquery-repo/powerquery-docs/connectors/includes/common-data-service-legacy/common-data-service-legacy-find-environment-url.md)]

### Connect to Common Data Service (Legacy)

[!INCLUDE [common-data-service-legacy-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/common-data-service-legacy/common-data-service-legacy-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Common Data Service (Legacy) in pipelines.

## Related content

- [For more information about this connector, see the Common Data Service (Legacy) connector documentation.](/power-query/connectors/common-data-service-legacy)
