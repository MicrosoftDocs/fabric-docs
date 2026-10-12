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


<a id="supported-authentication-types"></a>

## Summary

The Smartsheet connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Smartsheet account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect a dataflow Gen2 in Fabric to Smartsheet using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Smartsheet](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Smartsheet data](#connect-to-smartsheet-data).

## Prerequisites

[!INCLUDE [smartsheet-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/smartsheet/prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [smartsheet-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/smartsheet/capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-smartsheet-data"></a>

### Connection instructions

[!INCLUDE [smartsheet-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/smartsheet/connect-online.md)]

## Set up your connection in a pipeline

Data Factory doesn't currently support Smartsheet in pipelines.

## Related content

- [For more information about this connector, see the Smartsheet connector documentation.](/power-query/connectors/smartsheet)
