---
title: Set up your Palantir Foundry connection
description: This article provides information about how to create a Palantir Foundry connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
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

You can connect Dataflow Gen2 in Microsoft Fabric to Palantir Foundry using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up Palantir Foundry prerequisites](/power-query/connectors/palantir-foundry-datasets#prerequisites).
1. [Connect to Palantir Foundry (from Power Query Online)](/power-query/connectors/palantir-foundry-datasets#connect-to-palantir-foundry-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Palantir Foundry in pipelines.
