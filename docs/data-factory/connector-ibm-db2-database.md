---
title: Set up your IBM Db2 database connection
description: This article provides information about how to create an IBM Db2 database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 12/06/2024
ms.custom:
  - template-how-to
  - connectors
---

# Set up your IBM Db2 database connection

This article outlines the steps to create an IBM Db2 database connection.


## Supported authentication types

The IBM Db2 database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Windows| n/a | √ |
|Basic| √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to an IBM Db2 database. The following links provide the specific Power Query connector information you need to connect to an IBM Db2 database in Dataflow Gen2:

- To get started using the IBM Db2 database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [IBM Db2 database prerequisites](/power-query/connectors/ibm-db2-database#prerequisites) before connecting to the IBM Db2 database connector.
- To connect to the IBM Db2 database connector from Power Query, go to [Connect to an IBM Db2 database from Power Query Online](/power-query/connectors/ibm-db2-database#connect-to-an-ibm-db2-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

