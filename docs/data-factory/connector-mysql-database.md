---
title: Set up your MySQL database connection
description: This article provides information about how to create a MySQL database connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your MySQL database connection

This article outlines the steps to create a MySQL database connection.


## Supported authentication types

The MySQL database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a MySQL database. The following links provide the specific Power Query connector information you need to connect to a MySQL database in Dataflow Gen2:

- To get started using the MySQL database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [MySQL database prerequisites](/power-query/connectors/mysql-database#prerequisites) before connecting to the MySQL database connector.
- To connect to the MySQL database connector from Power Query, go to [Connect to MySQL database from Power Query Online](/power-query/connectors/mysql-database#connect-to-mysql-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support a MySQL database in data pipelines.
