---
title: Set up your KQL Database connection
description: This article provides information about how to create a KQL Database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your KQL database connection

This article outlines the steps to create a KQL database connection.

<a id="supported-authentication-types"></a>

## Summary

The KQL database connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection for dataflow Gen2
You can connect dataflow Gen2 in Fabric to KQL database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for KQL database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to a KQL database](#connect-to-a-kql-database).

## Prerequisites

[!INCLUDE [kql-database-prerequisites](includes/power-query/connectors/includes/kql-database/kql-database-prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [kql-database-capabilities-supported](includes/power-query/connectors/includes/kql-database/kql-database-capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-a-kql-database"></a>

### Connection instructions

[!INCLUDE [kql-database-connect-to-power-query-online](includes/power-query/connectors/includes/kql-database/kql-database-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the KQL database connector documentation.](/power-query/connectors/kql-database)
