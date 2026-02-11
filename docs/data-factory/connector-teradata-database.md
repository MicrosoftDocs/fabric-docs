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

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a Teradata database. The following links provide the specific Power Query connector information you need to connect to a Teradata database in Dataflow Gen2:

- To get started using the Teradata database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Teradata database prerequisites](/power-query/connectors/teradata#prerequisites) before connecting to the Teradata database connector.
- To connect to the Teradata database connector from Power Query, go to [Connect to a Teradata database from Power Query Online](/power-query/connectors/teradata#connect-to-a-teradata-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
