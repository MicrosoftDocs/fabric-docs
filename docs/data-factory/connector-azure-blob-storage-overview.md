---
title: Azure Blob Storage connector overview
description: This article explains the overview of using Azure Blob Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Azure Blob Storage connector overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

The Azure Blob Storage connector is supported in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Lookup activity** | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **GetMetadata activity** | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |

## Next steps

- [How to create Azure Blob connection](connector-azure-blob-storage.md)
- [Copy data in Azure Blob Storage](connector-azure-blob-storage-copy-activity.md)
- [Connect to Azure Blob Storage in dataflows](connector-azure-blob-storage-dataflows.md)
