---
title: Set up your MongoDB Atlas SQL (Beta) connection
description: This article provides information about how to create a MongoDB Atlas SQL connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your MongoDB Atlas SQL (Beta) connection

This article outlines the steps to create a MongoDB Atlas SQL connection.


## Supported authentication types

The MongoDB Atlas SQL connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a MongoDB Atlas SQL database. The following links provide the specific Power Query connector information you need to connect to a MongoDB Atlas SQL database in Dataflow Gen2:

- To get started using the MongoDB Atlas SQL connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [MongoDB Atlas SQL prerequisites](/power-query/connectors/mongodb-atlas-sql-interface#prerequisites) before connecting to the MongoDB Atlas SQL connector.
- To connect to the MongoDB Atlas SQL connector from Power Query, go to [Connect to MongoDB Atlas federated database using Atlas SQL interface from Power Query Online](/power-query/connectors/mongodb-atlas-sql-interface#connect-to-mongodb-atlas-federated-database-using-atlas-sql-interface-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support a MongoDB Atlas SQL database in data pipelines.
