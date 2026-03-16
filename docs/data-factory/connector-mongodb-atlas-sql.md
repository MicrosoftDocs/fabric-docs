---
title: Set up your MongoDB Atlas SQL (Beta) connection
description: This article provides information about how to create a MongoDB Atlas SQL connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Set up your MongoDB Atlas SQL (Beta) connection

This article outlines the steps to create a MongoDB Atlas SQL connection.


## Supported authentication types

The MongoDB Atlas SQL connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to MongoDB Atlas SQL using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up MongoDB Atlas SQL prerequisites](/power-query/connectors/mongodb-atlas-sql-interface#prerequisites).
1. [Connect to MongoDB Atlas SQL (from Power Query Online)](/power-query/connectors/mongodb-atlas-sql-interface#connect-to-mongodb-atlas-federated-database-using-atlas-sql-interface-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support a MongoDB Atlas SQL database in pipelines.
