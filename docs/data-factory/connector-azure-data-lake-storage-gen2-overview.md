---
title: Azure Data Lake Storage Gen2 connector overview
description: This article provides an overview of the Azure Data Lake Storage Gen2 connector in [!INCLUDE [product-name](../includes/product-name.md)] Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/20/2023
ms.custom: template-how-to 
---

# Azure Data Lake Storage Gen2 connector overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

The Azure Data Lake Storage Gen2 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (Source/Destination)** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Lookup activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **GetMetadata activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Dataflow Gen2 (Source/Destination)** | | |

## Next steps

[How to create a Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md)

[How to configure Azure Data Lake Storage Gen2 in copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md)
