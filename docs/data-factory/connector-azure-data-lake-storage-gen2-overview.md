---
title: Azure Data Lake Storage Gen2 connector overview
description: This article explains the overview of using Azure Data Lake Storage Gen2.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 12/27/2022
ms.custom: template-how-to 
---

# Azure Data Lake Storage Gen2 Connector Overview

This Azure Data Lake Storage Gen2 connector is supported in Trident Project  – Data Factory with the following capabilities.

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (Source/Destination)** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Lookup activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **GetMetadata activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Dataflow Gen2 (Source/Destination)** | | |

## Next Steps

[How to create Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md)

[How to configure Azure Data Lake Storage Gen2 in copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md)