---
title: Set up your Azure Table Storage connection
description: This article provides information about how to create an Azure Table Storage connection in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 12/29/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Azure Table Storage connection

This article outlines the steps to create an Azure Table Storage connection in Microsoft Fabric.

## Supported authentication types

The Azure Table Storage connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| √ | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 to Azure Table Storage in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
1. [Copy your account key for Azure Table Storage](/power-query/connectors/azure-table-storage#copy-your-account-key-for-azure-table-storage).
1. [Connect to Azure Table Storage (from Power Query online)](/power-query/connectors/azure-table-storage#connect-to-azure-table-storage-from-power-query-online).

## More information

- [Azure table storage connector limitations](/power-query/connectors/azure-table-storage#limitations)
