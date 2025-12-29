---
title: Set up your Azure Synapse Analytics connection
description: This article provides information about how to create an Azure Synapse Analytics connection in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 12/29/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Azure Synapse Analytics connection

This article outlines the steps to create an Azure Synapse Analytics connection in Microsoft Fabric.

## Supported authentication types

The Azure Synapse Analytics connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| √ | √ |
|Organizational account| √ | √ |
|Service principal | √ | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 to Azure Synapse Analytics in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data in Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).

1. Check that the capabilities you need are supported on the [Azure Synapse Analytics connector page](/power-query/connectors/azure-sql-data-warehouse#prerequisites).

1. [Connect to Azure Synapse Analytics (from Power Query online)](/power-query/connectors/azure-sql-data-warehouse#connect-to-azure-synapse-analytics-sql-dw-from-power-query-online).

## More information

- [Connect using advanced options](/power-query/connectors/azure-sql-data-warehouse#connect-using-advanced-options)
- [Troubleshooting](/power-query/connectors/azure-sql-data-warehouse#troubleshooting)