---
title: Amazon S3 connector overview
description: This article provides an overview of the supported capabilities of the Amazon S3 connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 09/13/2023
ms.custom: template-how-to, build-2023
---

# Amazon S3 connector overview

This Amazon S3 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Data Factory

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support Amazon S3 in Dataflow Gen2.

## Support in data pipelines

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Basic |
| **Lookup activity** | None | Basic |
| **GetMetadata activity** | None | Basic |
| **Delete activity** | None | Basic |

## Next steps

- [Set up your Amazon S3 connection](connector-amazon-s3.md)
- [Configure in a data pipeline copy activity](connector-amazon-s3-copy-activity.md)
