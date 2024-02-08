---
title: Set up your SQL Server database connection
description: This article provides information about how to create a SQL Server database connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your SQL Server database connection

This article outlines the steps to create a SQL Server database connection.


## Supported authentication types

The SQL Server database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |
|Organizational account| n/a | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a SQL Server database. The following links provide the specific Power Query connector information you need to connect to a SQL Server database in Dataflow Gen2:

- To get started using the SQL Server database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [SQL Server database prerequisites](/power-query/connectors/sql-server#prerequisites) before connecting to the SQL Server database connector.
- To connect to the SQL Server database connector from Power Query, go to [Connect to SQL Servers database from Power Query Online](/power-query/connectors/sql-server#connect-to-sql-server-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
