---
title: Azure Data Lake Storage Gen2 connector overview
description: This article provides an overview of the Azure Data Lake Storage Gen2 connector in Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/30/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure Data Lake Storage Gen2 connector overview

The Azure Data Lake Storage Gen2 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Azure Data Lake Storage Gen2 in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-azure-data-lake-storage-gen2.md#set-up-your-connection-in-dataflow-gen2).

## Support in Data pipeline

The Azure Data Lake Storage Gen2 connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (Source/Destination)** | None | Account Key<br/>Organizational account<br/>Shared Access Signature (SAS)<br/>Service principal |
| **Lookup activity** | None | Account Key<br/>Organizational account<br/>Shared Access Signature (SAS)<br/>Service principal  |
| **GetMetadata activity** | None | Account Key<br/>Organizational account<br/>Shared Access Signature (SAS)<br/>Service principal  |
| **Delete data activity** | None | Account Key<br/>Organizational account<br/>Shared Access Signature (SAS)<br/>Service principal|

To learn about how to connect to Azure Data Lake Storage Gen2 in Data pipeline, go to [Set up your Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Azure Data Lake Storage Gen2 in Data pipeline, go to [Configure Azure Data Lake Storage Gen2 in a copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md).
