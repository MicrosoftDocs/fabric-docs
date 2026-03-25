---
title: Set up your IBM Db2 database connection
description: This article provides information about how to create an IBM Db2 database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your IBM Db2 database connection

This article outlines the steps to create an IBM Db2 database connection.


## Supported authentication types

The IBM Db2 database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Windows| n/a | √ |
|Basic| √ | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to IBM Db2 database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for IBM Db2 database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to an IBM Db2 database](#connect-to-an-ibm-db2-database).

### Capabilities

[!INCLUDE [ibm-db2-database-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/ibm-db2-database/ibm-db2-database-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [ibm-db2-database-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/ibm-db2-database/ibm-db2-database-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to an IBM Db2 database

[!INCLUDE [ibm-db2-database-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/ibm-db2-database/ibm-db2-database-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [ibm-db2-database-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/ibm-db2-database/ibm-db2-database-limitations-and-considerations-include.md)]

## Related content

- [For more information about this connector, see the IBM Db2 database connector documentation.](/power-query/connectors/ibm-db2-database)
