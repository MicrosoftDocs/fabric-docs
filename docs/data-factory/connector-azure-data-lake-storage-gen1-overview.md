---
title: Azure Data Lake Storage Gen1 connector overview
description: This article provides an overview of the Azure Data Lake Storage Gen1 connector in Data Factory in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/30/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure Data Lake Storage Gen1 connector overview

The Azure Data Lake Storage Gen1 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.


## Supported in Data pipeline

The Azure Data Lake Storage Gen1 connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Service principal |
| **Lookup activity** | None | Service principal |
| **GetMetadata activity** | None | Service principal|
| **Delete data activity** | None | Service principal|

To learn more about the copy activity configuration for Azure Data Lake Storage Gen1 in Data pipeline, go to [Configure in a data pipeline copy activity](connector-azure-data-lake-storage-gen1-copy-activity.md).
