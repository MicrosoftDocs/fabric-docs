---
title: Set up your KQL Database connection
description: This article provides information about how to create a KQL Database connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
---

# Set up your KQL Database connection

This article outlines the steps to create a KQL Database connection.

## Supported authentication types

The KQL Database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a KQL database. The following links provide the specific Power Query connector information you need to connect to KQL database in Dataflow Gen2:

- To get started using the KQL Database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [KQL Database prerequisites](/power-query/connectors/kql-database#prerequisites) before connecting to the KQL Database connector.
- To connect to the KQL Database connector from Power Query, go to [Connect to a KQL database from Power Query Online](/power-query/connectors/kql-database#connect-to-a-kql-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
