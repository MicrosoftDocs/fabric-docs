---
title: Set up your Access database connection
description: This article provides information about how to create an Access database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Access database connection

You can connect your Access database to Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Access database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to your Access database](#connect-to-your-access-database).

## Supported authentication types

The Access database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Capabilities
[!INCLUDE [access-database-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/access-database/access-database-capabilities-supported.md)]

## Prerequisites
[!INCLUDE [access-database-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/access-database/access-database-prerequisites.md)]

## Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

## Connect to your Access database

[!INCLUDE [access-database-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/access-database/access-database-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the Access database connector documentation.](/power-query/connectors/access-database)
