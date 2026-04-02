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

# Set up your KQL Database connection

This article outlines the steps to create a KQL Database connection.

## Supported authentication types

The KQL Database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to KQL Database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for KQL Database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to a KQL database](#connect-to-a-kql-database).

### Capabilities

[!INCLUDE [kql-database-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/kql-database/kql-database-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [kql-database-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/kql-database/kql-database-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to a KQL database

[!INCLUDE [kql-database-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/kql-database/kql-database-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the KQL Database connector documentation.](/power-query/connectors/kql-database)
