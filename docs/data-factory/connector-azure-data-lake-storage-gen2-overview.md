---
title: Azure Data Lake Storage Gen2 connector overview
description: This article provides an overview of the Azure Data Lake Storage Gen2 connector in Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Azure Data Lake Storage Gen2 connector overview

The Azure Data Lake Storage Gen2 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

[!INCLUDE [df-preview-warning](includes/df-preview-warning.md)]

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (Source/Destination)** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Lookup activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **GetMetadata activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |

## Next steps

- [How to create a Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md)
- [How to configure Azure Data Lake Storage Gen2 in copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md)
- [Connect to Azure Data Lake Storage Gen2 in dataflows](connector-azure-data-lake-storage-gen2-dataflows.md)