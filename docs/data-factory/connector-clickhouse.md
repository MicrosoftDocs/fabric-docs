---
title: Set up your ClickHouse connection
description: This article provides information about how to create a ClickHouse connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your ClickHouse connection

This article outlines the steps to create a ClickHouse connection.


<a id="supported-authentication-types"></a>

## Summary

The ClickHouse connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|ClickHouse (Username/Password)| n/a | √ |

## Set up your connection for dataflow Gen2
You can connect dataflow Gen2 in Fabric to ClickHouse using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for ClickHouse](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to ClickHouse data](#connect-to-clickhouse-data).

## Prerequisites

[!INCLUDE [clickhouse-prerequisites](includes/power-query/connectors/includes/clickhouse/prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [clickhouse-capabilities-supported](includes/power-query/connectors/includes/clickhouse/capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-clickhouse-data"></a>

### Connection instructions

[!INCLUDE [clickhouse-connect-to-power-query-online](includes/power-query/connectors/includes/clickhouse/connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory doesn't currently support ClickHouse in pipelines.

## Related content

- [For more information about this connector, see the ClickHouse connector documentation.](/power-query/connectors/clickhouse)
