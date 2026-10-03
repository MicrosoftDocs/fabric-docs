---
title: Set up your Impala database connection
description: This article provides information about how to create an Impala database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Impala database connection

This article outlines the steps to create an Impala database connection.


<a id="supported-authentication-types"></a>

## Summary

The Impala connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Windows| n/a | √ |
|Database| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect dataflow Gen2 in Fabric to Impala using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Connect to an Impala database](#connect-to-an-impala-database).

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [impala-database-capabilities-supported](includes/power-query/connectors/includes/impala-database/impala-database-capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-an-impala-database"></a>

### Connection instructions

[!INCLUDE [impala-database-connect-to-power-query-online](includes/power-query/connectors/includes/impala-database/impala-database-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory doesn't currently support an Impala database in pipelines.

## Limitations and considerations

[!INCLUDE [impala-database-limitations-and-considerations](includes/power-query/connectors/includes/impala-database/limitations.md)]

## Related content

- [For more information about this connector, see the Impala database connector documentation.](/power-query/connectors/impala-database)
