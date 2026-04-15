---
title: Set up your MySQL database connection
description: This article provides information about how to create a MySQL database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your MySQL database connection

This article outlines the steps to create a MySQL database connection.


## Supported authentication types

The MySQL database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| √ | √ |
|Windows| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to MySQL database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for MySQL database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to MySQL database](#connect-to-mysql-database).

### Capabilities

[!INCLUDE [mysql-database-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/mysql-database/mysql-database-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [mysql-database-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/mysql-database/mysql-database-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to MySQL database

[!INCLUDE [mysql-database-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/mysql-database/mysql-database-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [mysql-database-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/mysql-database/mysql-database-limitations-and-considerations.md)]

## Related content

- [For more information about this connector, see the MySQL database connector documentation.](/power-query/connectors/mysql-database)
