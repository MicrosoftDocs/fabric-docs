---
title: Set up your Snowflake database connection
description: This article provides information about how to create a Snowflake database connection in Microsoft Fabric.
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

# Set up your Snowflake database connection

This article outlines the steps to create a Snowflake database connection.

## Supported authentication types

The Snowflake database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Snowflake| √ | √ |
|Microsoft account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a Snowflake database. The following links provide the specific Power Query connector information you need to connect to Snowflake database in Dataflow Gen2:

- To get started using the Snowflake database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To connect to the Snowflake database connector from Power Query, go to [Connect to a Snowflake database from Power Query Online](/power-query/connectors/snowflake#connect-to-a-snowflake-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
