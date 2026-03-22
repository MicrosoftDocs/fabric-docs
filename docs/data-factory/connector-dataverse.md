---
title: Set up your Dataverse connection
description: This article provides information about how to create a Dataverse connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Dataverse connection

This article outlines the steps to create a Dataverse connection.

## Supported authentication types

The Dataverse connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |
|Service principal| √ | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 to Dataverse in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Dataverse](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Find your Dataverse environment URL](#find-your-dataverse-environment-url).
1. [Connect to Dataverse](#connect-to-dataverse).

### Capabilities

[!INCLUDE [dataverse-ccapabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/dataverse/dataverse-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [dataverse-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/dataverse/dataverse-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Find your Dataverse environment URL

[!INCLUDE [dataverse-find-environment-url](~/../powerquery-repo/powerquery-docs/connectors/includes/dataverse/dataverse-find-environment-url.md)]

### Connect to Dataverse

[!INCLUDE [dataverse-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/dataverse/dataverse-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [dataverse-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/dataverse/dataverse-limitations-and-considerations-include.md)]

## Related content

- [For more information about this connector, see the Dataverse connector documentation.](/power-query/connectors/dataverse)
