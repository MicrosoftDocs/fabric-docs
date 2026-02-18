---
title: Set up your Salesforce reports connection
description: This article provides information about how to create a Salesforce reports connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Salesforce reports connection

This article outlines the steps to create a Salesforce reports connection.


## Supported authentication types

The Salesforce reports connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to Salesforce reports using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up Salesforce reports prerequisites](/power-query/connectors/salesforce-reports#prerequisites).
1. Check [Salesforce reports known issues and limitations](/power-query/connectors/salesforce-reports#known-issues-and-limitations) to make sure your scenario is supported.
1. [Connect to Salesforce Reports (from Power Query Online)](/power-query/connectors/salesforce-reports#connect-to-salesforce-reports-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Salesforce reports in pipelines.
