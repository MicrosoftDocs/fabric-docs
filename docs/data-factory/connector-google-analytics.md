---
title: Set up your Google Analytics connection
description: This article provides information about how to create a Google Analytics connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 12/18/2024
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Google Analytics connection

This article outlines the steps to create a Google Analytics connection.


## Supported authentication types

The Google Analytics connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to Google Analytics using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up Google Analytics prerequisites](/power-query/connectors/google-analytics#prerequisites).
1. Check [Google Analytics limitations and issues](/power-query/connectors/google-analytics#limitations-and-issues) to make sure your scenario is supported.
1. [Connect to Google Analytics data (from Power Query Online)](/power-query/connectors/google-analytics#connect-to-google-analytics-data-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Google Analytics data in pipelines.
