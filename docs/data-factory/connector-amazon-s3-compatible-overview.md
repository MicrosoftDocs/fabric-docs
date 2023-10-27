---
title: Amazon S3 Compatible connector overview
description: This article provides an overview of the supported capabilities of the Amazon S3 Compatible connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 10/27/2023
ms.custom: template-how-to, build-2023
---

# Amazon S3 Compatible connector overview

This Amazon S3 Compatible connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Support in Data Factory

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support Amazon S3 Compatible in Dataflow Gen2.

## Support in data pipelines

The Amazon S3 Compatible connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Basic |
| **Lookup activity** | None | Basic |
| **GetMetadata activity** | None | Basic |
| **Delete activity** | None | Basic |

To learn more about the copy activity configuration for Amazon S3 Compatible in data pipelines, go to [Configure in a data pipeline copy activity](connector-amazon-s3-compatible-copy-activity.md).
