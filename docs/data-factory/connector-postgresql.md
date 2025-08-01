---
title: Set up your PostgreSQL database connection
description: This article provides information about how to create a PostgreSQL database connection in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 12/18/2024
ms.custom:
  - template-how-to
  - connectors
---

# Set up your PostgreSQL database connection

This article outlines the steps to create a PostgreSQL database connection.


## Supported authentication types

The PostgreSQL database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a PostgreSQL database. The following links provide the specific Power Query connector information you need to connect to a PostgreSQL database in Dataflow Gen2:

- To get started using the PostgreSQL database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [PostgreSQL database prerequisites](/power-query/connectors/postgresql#prerequisites) before connecting to the PostgreSQL database connector.
- To connect to the PostgreSQL database connector from Power Query, go to [Connect to a PostgreSQL database from Power Query Online](/power-query/connectors/postgresql#connect-to-a-postgresql-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
