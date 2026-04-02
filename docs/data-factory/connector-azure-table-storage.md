---
title: Set up your Azure Table Storage connection
description: This article provides information about how to create an Azure Table Storage connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Azure Table Storage connection

This article outlines the steps to create an Azure Table Storage connection in Microsoft Fabric.

## Supported authentication types

The Azure Table Storage connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| √ | √ |

## Set up your connection for Dataflow Gen2

You can connect Dataflow Gen2 to Azure Table Storage in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Copy your account key for Azure Table Storage](#copy-your-account-key-for-azure-table-storage).
1. [Connect to Azure Table Storage](#connect-to-azure-table-storage).

### Capabilities

[!INCLUDE [azure-table-storage-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-table-storage/azure-table-storage-capabilities-supported.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Copy your account key for Azure Table Storage

[!INCLUDE [azure-table-storage-copy-account-key](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-table-storage/azure-table-storage-copy-account-key.md)]

### Connect to Azure Table Storage

[!INCLUDE [azure-table-storage-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-table-storage/azure-table-storage-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the Azure Table Storage connector documentation.](/power-query/connectors/azure-table-storage)
