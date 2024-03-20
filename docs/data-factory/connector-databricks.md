---
title: Set up your Databricks connection
description: This article provides information about how to create a Databricks connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Databricks connection

This article outlines the steps to create a Databricks connection.


## Supported authentication types

The Databricks connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Username/Password| n/a | √ |
|Personal Access Token| n/a | √ |
|OAuth (OIDC)| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Databricks data. The following links provide the specific Power Query connector information you need to connect to Databricks data in Dataflow Gen2:

- To get started using the Databricks connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Databricks prerequisites](/power-query/connectors/databricks#prerequisites) before connecting to the Databricks connector.
- To connect to the Databricks connector from Power Query, go to [Connect to Databricks data from Power Query Online](/power-query/connectors/databricks#connect-to-databricks-data-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support the Databricks connector in data pipelines.
