---
title: Set up your Palantir Foundry connection
description: This article provides information about how to create a Palantir Foundry connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Palantir Foundry connection

This article outlines the steps to create a Palantir Foundry connection.


## Supported authentication types

The Palantir Foundry connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Foundry Token| n/a | √ |
|Foundry OAuth| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Palantir Foundry. The following links provide the specific Power Query connector information you need to connect to Palantir Foundry in Dataflow Gen2:

- To get started using the Palantir Foundry connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Palantir Foundry prerequisites](/power-query/connectors/palantir-foundry-datasets#prerequisites) before connecting to the Palantir Foundry connector.
- To connect to the Palantir Foundry connector from Power Query, go to [Connect to Palantir Foundry from Power Query Online](/power-query/connectors/palantir-foundry-datasets#connect-to-palantir-foundry-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Palantir Foundry in data pipelines.
