---
title: Set up your Azure Analysis Services connection
description: This article provides information about how to create an Azure Analysis Services connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 10/30/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Azure Analysis Services connection

You can connect Dataflow Gen2 to Azure Analysis Services in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data in Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. Install or set up any [Access database prerequisites](/power-query/connectors/access-database#prerequisites).
1. [Connect to Azure Analysis Services](/power-query/connectors/azure-analysis-services#connect-to-azure-analysis-services-database-from-power-query-online).

## Supported authentication types

The Access database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Learn more about this connector

- [Supported capabilities](/power-query/connectors/azure-analysis-services#capabilities-supported)
- [Troubleshooting](/power-query/connectors/azure-analysis-services#troubleshooting)
- [Connect using advanced options](/power-query/connectors/azure-analysis-services#connect-using-advanced-options)