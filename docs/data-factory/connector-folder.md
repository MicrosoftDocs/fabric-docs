---
title: Set up your Folder connection
description: This article provides information about how to create a Folder connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Folder connection

This article outlines the steps to create a folder connection.


## Supported authentication types

The Folder connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Windows| √| √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Folder using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Connect to a folder](#connect-to-a-folder).

### Capabilities

[!INCLUDE [folder-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/folder/folder-capabilities-supported.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to a folder

[!INCLUDE [folder-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/folder/folder-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the Folder connector documentation.](/power-query/connectors/folder)
