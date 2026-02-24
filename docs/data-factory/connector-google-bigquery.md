---
title: Set up your Google BigQuery connection
description: This article provides information about how to create a Google BigQuery connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 09/24/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Google BigQuery connection

This article outlines the steps to create a Google BigQuery connection.


## Supported authentication types

The Google BigQuery connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Service Account Login| √ | √ |
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to Google BigQuery using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up Google BigQuery prerequisites](/power-query/connectors/google-bigquery#prerequisites).
1. Check [Google BigQuery limitations and considerations](/power-query/connectors/google-bigquery#limitations-and-considerations) to make sure your scenario is supported.
1. [Connect to Google BigQuery data (from Power Query Online)](/power-query/connectors/google-bigquery#connect-to-google-bigquery-data-from-power-query-online).
