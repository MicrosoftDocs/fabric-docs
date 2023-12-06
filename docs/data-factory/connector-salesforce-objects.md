---
title: Set up your Salesforce objects connection
description: This article provides information about how to create a Salesforce objects connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Salesforce objects connection

This article outlines the steps to create a Salesforce objects connection.


## Supported authentication types

The Salesforce objects connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Salesforce objects. The following links provide the specific Power Query connector information you need to connect to Salesforce objects in Dataflow Gen2:

- To get started using the Salesforce objects connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Salesforce objects prerequisites](/power-query/connectors/salesforce-objects#prerequisites) before connecting to the Salesforce objects connector.
- To connect to the Salesforce objects connector from Power Query, go to [Connect to Salesforce objects from Power Query Online](/power-query/connectors/salesforce-objects#connect-to-salesforce-objects-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Salesforce objects in data pipelines.
