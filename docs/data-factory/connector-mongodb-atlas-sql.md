---
title: Set up your MongoDB Atlas SQL (Beta) connection
description: This article provides information about how to create a MongoDB Atlas SQL connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your MongoDB Atlas SQL (Beta) connection

This article outlines the steps to create a MongoDB Atlas SQL connection.


## Supported authentication types

The MongoDB Atlas SQL connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to MongoDB Atlas SQL using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for MongoDB Atlas SQL (Beta)](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to MongoDB Atlas SQL](#connect-to-mongodb-atlas-sql).

### Capabilities

[!INCLUDE [mongodb-atlas-sql-interface-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/mongodb-atlas-sql-interface/mongodb-atlas-sql-interface-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [mongodb-atlas-sql-interface-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/mongodb-atlas-sql-interface/mongodb-atlas-sql-interface-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to MongoDB Atlas SQL

[!INCLUDE [mongodb-atlas-sql-interface-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/mongodb-atlas-sql-interface/mongodb-atlas-sql-interface-connect-to-power-query-online.md)]


## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support a MongoDB Atlas SQL database in pipelines.

## Related content

- [For more information about this connector, see the MongoDB Atlas SQL (Beta) connector documentation.](/power-query/connectors/mongodb-atlas-sql-interface)
