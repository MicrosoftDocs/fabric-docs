---
title: Set up your Odbc connection
description: This article provides information about how to create an Odbc data source connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Odbc connection

This article outlines the steps to create an Odbc connection.


## Supported authentication types

The Odbc connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Basic (Username/Password)| n/a | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to an Odbc data source. The following links provide the specific Power Query connector information you need to connect to an Odbc data source in Dataflow Gen2:

- To get started using the Odbc connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Odbc prerequisites](/power-query/connectors/odbc#prerequisites) before connecting to the Odbc connector.
- To connect to the Odbc data source from Power Query, go to [Connect to an ODBC data source from Power Query Online](/power-query/connectors/odbc#connect-to-an-odbc-data-source-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support an Odbc data source in data pipelines.
