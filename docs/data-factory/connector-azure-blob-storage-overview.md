---
title: Azure Blob Storage connector overview
description: This article explains the overview of using Azure Blob Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure Blob Storage connector overview

The Azure Blob Storage connector is supported in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Azure Blob Storage in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-azure-blob-storage.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The Azure Blob Storage connector supports the following capabilities in data pipelines.

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Lookup activity** | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **GetMetadata activity** | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |

To learn about how to connect to Azure Blob Storage in data pipelines, go to [Set up your Azure Blob Storage connection](connector-azure-blob-storage.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Azure Blob Storage in data pipelines, go to [Configure Azure Blob Storage in a copy activity](connector-azure-blob-storage-copy-activity.md).
