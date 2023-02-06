---
title: Azure Blob Storage connector overview
description: This article explains the overview of using Azure Blob Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 12/27/2022
ms.custom: template-how-to 
---

# Azure Blob Storage connector overview

This Azure Blob Storage connector is supported in [!INCLUDE [product-name](../includes/product-name.md)] Project – Data Factory with the following capabilities.

## Supported capabilities

|  | Supported capabilities | Gateway | Authentication |
| --- | --- | --- | ---|
| **Copy activity (source/destination)** | Yes | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Lookup activity** | Yes | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **GetMetadata activity** | Yes | None | Anonymous<br/>Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Dataflow Gen2 (source/destination)** | Yes | On-premises data gateway<br/>Virtual network data gateway | Anonymous<br/>Key<br/>Shared Access Signature (SAS)<br/>Organizational account |

## Next steps

- [How to create Azure Blob connection](connector-azure-blob-storage.md)
- [Copy data in Azure Blob Storage](connector-azure-blob-storage-copy-activity.md)
