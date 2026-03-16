---
title: Set up your MySQL database connection
description: This article provides information about how to create a MySQL database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/27/2024
ms.custom:
  - template-how-to
  - connectors
---

# Set up your MySQL database connection

This article outlines the steps to create a MySQL database connection.


## Supported authentication types

The MySQL database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| √ | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to MySQL database using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up MySQL database prerequisites](/power-query/connectors/mysql-database#prerequisites).
1. Check [MySQL database limitations](/power-query/connectors/mysql-database#limitations) to make sure your scenario is supported.
1. [Connect to MySQL database (from Power Query Online)](/power-query/connectors/mysql-database#connect-to-mysql-database-from-power-query-online).
