---
title: Set up your SharePoint list connection
description: This article provides information about how to create a SharePoint list connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your SharePoint list connection

This article outlines the steps to create a SharePoint list connection.


## Supported authentication types

The SharePoint list connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Windows| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to SharePoint list using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Connect to a SharePoint list](#connect-to-a-sharepoint-list).

### Capabilities

[!INCLUDE [sharepoint-list-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/sharepoint-list/sharepoint-list-capabilities-supported.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to a SharePoint list

[!INCLUDE [sharepoint-list-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/sharepoint-list/sharepoint-list-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support a SharePoint list in pipelines.

## Related content

- [For more information about this connector, see the SharePoint list connector documentation.](/power-query/connectors/sharepoint-list)
