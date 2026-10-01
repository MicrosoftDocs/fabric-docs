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


<a id="supported-authentication-types"></a>

## Summary

The SharePoint list connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Windows| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect a dataflow Gen2 in Fabric to a SharePoint list by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Connect to a SharePoint list](#connect-to-a-sharepoint-list).

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [sharepoint-list-capabilities-supported](includes/power-query/connectors/includes/sharepoint-list/sharepoint-list-capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-a-sharepoint-list"></a>

### Connection instructions

[!INCLUDE [sharepoint-list-connect-to-power-query-online](includes/power-query/connectors/includes/sharepoint-list/sharepoint-list-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory doesn't currently support a SharePoint list in pipelines.

## Related content

- [For more information about this connector, see the SharePoint list connector documentation.](/power-query/connectors/sharepoint-list)
