---
title: Set up your PostgreSQL database connection
description: This article provides information about how to create a PostgreSQL database connection in Microsoft Fabric.
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

You can connect Dataflow Gen2 in Microsoft Fabric to PostgreSQL database using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up PostgreSQL database prerequisites](/power-query/connectors/postgresql#prerequisites).
1. [Connect to a PostgreSQL database (from Power Query Online)](/power-query/connectors/postgresql#connect-to-a-postgresql-database-from-power-query-online).
