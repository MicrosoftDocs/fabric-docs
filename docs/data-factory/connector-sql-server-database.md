---
title: Set up your SQL Server database connection
description: This article provides information about how to create a SQL Server database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your SQL Server database connection

This article outlines the steps to create a SQL Server database connection.


## Supported authentication types

The SQL Server database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| √ | √ |
|Organizational account| √ | √ |
|Service principal | √ (Only for [SQL Server on Azure VMs](/azure/azure-sql/virtual-machines))| √ |
|Windows| √ (When use on-premises data gateway) | √ |
|Workspace identity | n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to SQL Server database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Connect to SQL Server database](#connect-to-sql-server-database).


### Capabilities

[!INCLUDE [sql-server-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/sql-server/sql-server-capabilities-supported.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to SQL Server database

[!INCLUDE [sql-server-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/sql-server/sql-server-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [sql-server-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/sql-server/sql-server-limitations-and-considerations.md)]

## Related content

- [For more information about this connector, see the SQL Server database connector documentation.](/power-query/connectors/sql-server)
