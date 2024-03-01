---
title: Set up your Azure Table Storage connection
description: This article provides information about how to create an Azure Table Storage connection in Microsoft Fabric.
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

# Set up your Azure Table Storage connection

This article outlines the steps to create an Azure Table Storage connection.

## Supported authentication types

The Azure Table Storage connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| √ | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure Table Storage. The following links provide the specific Power Query connector information you need to connect to Azure Table Storage in Dataflow Gen2:

- To get started using the Azure Table Storage connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To learn where to get a copy of your account key, go to [Copy your account key for Azure Table Storage](/power-query/connectors/azure-table-storage#copy-your-account-key-for-azure-table-storage).
- To connect to the Azure Table Storage connector from Power Query, go to [Connect to Azure Table Storage from Power Query Online](/power-query/connectors/azure-table-storage#connect-to-azure-table-storage-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
