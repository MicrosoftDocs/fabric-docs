---
title: Set up your Dataverse connection
description: This article provides information about how to create a Dataverse connection in Microsoft Fabric.
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

# Set up your Dataverse connection

This article outlines the steps to create a Dataverse connection.

## Supported authentication types

The Dataverse connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |
|Service principal| √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Dataverse. The following links provide the specific Power Query connector information you need to connect to Dataverse in Dataflow Gen2:

- To get started using the Dataverse connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Dataverse prerequisites](/power-query/connectors/dataverse#prerequisites) before connecting to the Dataverse connector.
- To connect to the Dataverse connector from Power Query, go to [Connect to Dataverse from Power Query Online](/power-query/connectors/dataverse#connect-to-dataverse-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
