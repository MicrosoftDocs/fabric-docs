---
title: Azure Data Lake Gen2 Storage connector overview
description: This article explains the overview of using Azure Data Lake Gen2 Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 12/27/2022
ms.custom: template-how-to 
---

# Azure Blob Storage Connector Overview

This Azure Data Lake Gen2 Storage connector is supported in Trident Project  – Data Factory with the following capabilities.

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Lookup activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **GetMetadata activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Dataflow Gen2 (source/destination)** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |

## Next Steps

[How to create Azure Data Lake Gen2 Storage connection](connector-azure-data-lake-storage-gen2.md)

[Copy data in Azure Data Lake Gen2 Storage](connector-azure-data-lake-storage-gen2-copy-activity.md)