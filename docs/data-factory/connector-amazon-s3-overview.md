---
title: Amazon S3 connector overview
description: This article provides an overview of the supported capabilities of the Amazon S3 connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 10/26/2023
ms.custom: template-how-to, build-2023
---

# Amazon S3 connector overview

This Amazon S3 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support Amazon S3 in Dataflow Gen2.

## Support in data pipelines

The Amazon S3 connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Basic |
| **Lookup activity** | None | Basic |
| **GetMetadata activity** | None | Basic |
| **Delete activity** | None | Basic |

To learn about how to connect to Amazon S3 data in data pipelines, go to [Set up your Amazon S3 connection](connector-amazon-s3.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Amazon S3 in data pipelines, go to [Configure Amazon S3 in a copy activity](connector-amazon-s3-copy-activity.md).
