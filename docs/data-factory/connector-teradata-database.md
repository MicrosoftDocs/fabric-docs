---
title: Set up your Teradata database connection
description: This article provides information about how to create a Teradata database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/10/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Teradata database connection

This article outlines the steps to create a Teradata database connection.


## Supported authentication types

The Teradata database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| √ | √ |
|Windows| √ | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to Teradata database using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up Teradata database prerequisites](/power-query/connectors/teradata#prerequisites).
1. [Connect to a Teradata database (from Power Query Online)](/power-query/connectors/teradata#connect-to-a-teradata-database-from-power-query-online).
