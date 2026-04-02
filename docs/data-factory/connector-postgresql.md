---
title: Set up your PostgreSQL database connection
description: This article provides information about how to create a PostgreSQL database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your PostgreSQL database connection

This article outlines the steps to create a PostgreSQL database connection.


## Supported authentication types

The PostgreSQL database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to PostgreSQL database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for PostgreSQL database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to a PostgreSQL database](#connect-to-a-postgresql-database).

### Capabilities

[!INCLUDE [postgresql-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/postgresql/postgresql-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [postgresql-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/postgresql/postgresql-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to a PostgreSQL database

[!INCLUDE [postgresql-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/postgresql/postgresql-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the PostgreSQL database connector documentation.](/power-query/connectors/postgresql)
