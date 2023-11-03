---
title: Azure Data Lake Storage Gen2 connector overview
description: This article provides an overview of the Azure Data Lake Storage Gen2 connector in Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 10/26/2023
ms.custom: template-how-to, build-2023
---

# Azure Data Lake Storage Gen2 connector overview

The Azure Data Lake Storage Gen2 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Azure Data Lake Storage Gen2 in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-azure-data-lake-storage-gen2.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The Azure Data Lake Storage Gen2 connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (Source/Destination)** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **Lookup activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |
| **GetMetadata activity** | None | Key<br/>OAuth2<br/>Service principal<br/>Shared Access Signature (SAS) |

To learn about how to connect to Azure Data Lake Storage Gen2 in data pipelines, go to [Set up your Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Azure Data Lake Storage Gen2 in data pipelines, go to [Configure Azure Data Lake Storage Gen2 in a copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md).
