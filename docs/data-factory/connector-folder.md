---
title: Set up your Folder connection
description: This article provides information about how to create a Folder connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Folder connection

This article outlines the steps to create a folder connection.


## Supported authentication types

The Folder connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a folder. The following links provide the specific Power Query connector information you need to connect to a folder in Dataflow Gen2:

- To get started using the Folder connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To connect to a folder from Power Query, go to [Connect to a folder from Power Query Online](/power-query/connectors/folder#connect-to-a-folder-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support folders in data pipelines.
