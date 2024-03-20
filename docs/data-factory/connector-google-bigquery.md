---
title: Set up your Google BigQuery connection
description: This article provides information about how to create a Google BigQuery connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Google BigQuery connection

This article outlines the steps to create a Google BigQuery connection.


## Supported authentication types

The Google BigQuery connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Service Account Login| n/a | √ |
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Google BigQuery data. The following links provide the specific Power Query connector information you need to connect to Google BigQuery data in Dataflow Gen2:

- To get started using the Google BigQuery connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Google BigQuery prerequisites](/power-query/connectors/google-bigquery#prerequisites) before connecting to the Google BigQuery connector.
- To connect to the Google BigQuery connector from Power Query, go to [Connect to Google BigQuery data from Power Query Online](/power-query/connectors/google-bigquery#connect-to-google-bigquery-data-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support Google BigQuery data in data pipelines.
