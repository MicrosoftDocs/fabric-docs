---
title: Set up your Common Data Service (Legacy) connection
description: This article provides information about how to create a Common Data Service (Legacy) connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Common Data Service (Legacy) connection

This article outlines the steps to create a Common Data Service (Legacy) connection.

## Supported authentication types

The Common Data Service (Legacy) connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Common Data Service (Legacy). The following links provide the specific Power Query connector information you need to connect to Common Data Service (Legacy) in Dataflow Gen2:

- To get started using the Common Data Service (Legacy) connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Common Data Service (Legacy) prerequisites](/power-query/connectors/common-data-service-legacy#prerequisites) before connecting to the Common Data Service (Legacy) connector.
- To connect to the Common Data Service (Legacy) connector from Power Query, go to [Connect to Common Data Service (Legacy) from Power Query Online](/power-query/connectors/common-data-service-legacy#connect-to-common-data-service-legacy-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Common Data Service (Legacy) in data pipelines.
