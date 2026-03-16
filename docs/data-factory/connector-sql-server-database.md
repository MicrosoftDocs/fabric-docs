---
title: Set up your SQL Server database connection
description: This article provides information about how to create a SQL Server database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/18/2025
ms.custom:
  - template-how-to
  - connectors
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

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to SQL Server database using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. Check [SQL Server database limitations](/power-query/connectors/sql-server#limitations) to make sure your scenario is supported.
1. [Connect to SQL Server database (from Power Query Online)](/power-query/connectors/sql-server#connect-to-sql-server-database-from-power-query-online).
