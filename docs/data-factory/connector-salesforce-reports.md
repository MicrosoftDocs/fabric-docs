---
title: Set up your Salesforce reports connection
description: This article provides information about how to create a Salesforce reports connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Salesforce reports connection

This article outlines the steps to create a Salesforce reports connection.


## Supported authentication types

The Salesforce reports connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Salesforce reports. The following links provide the specific Power Query connector information you need to connect to Salesforce reports in Dataflow Gen2:

- To get started using the Salesforce reports connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Salesforce reports prerequisites](/power-query/connectors/salesforce-reports#prerequisites) before connecting to the Salesforce reports connector.
- To connect to the Salesforce reports connector from Power Query, go to [Connect to Salesforce reports from Power Query Online](/power-query/connectors/salesforce-reports#connect-to-salesforce-reports-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Salesforce reports in data pipelines.
