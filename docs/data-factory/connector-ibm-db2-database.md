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

You can connect Dataflow Gen2 in Microsoft Fabric to IBM Db2 database using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up IBM Db2 database prerequisites](/power-query/connectors/ibm-db2-database#prerequisites).
1. Check [IBM Db2 database issues and limitations](/power-query/connectors/ibm-db2-database#issues-and-limitations) to make sure your scenario is supported.
1. [Connect to an IBM Db2 database (from Power Query Online)](/power-query/connectors/ibm-db2-database#connect-to-an-ibm-db2-database-from-power-query-online).

