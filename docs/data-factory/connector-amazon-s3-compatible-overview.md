---
title: Amazon S3 Compatible connector overview
description: This article provides an overview of the supported capabilities of the Amazon S3 Compatible connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 12/04/2025
ms.custom:
  - template-how-to
  - connectors
---

# Amazon S3 Compatible connector overview

This Amazon S3 Compatible connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-amazon-s3-compatible-copy-activity.md) (source/destination) <br>- Lookup activity<br>- Get Metadata activity<br>- Delete activity  |None<br> On-premises<br> Virtual network |Access Key |
| **Copy job** (source/-) <br>- Full load<br>- Incremental load |None<br> On-premises<br> Virtual network |Access Key |

## Related content

To learn more about the copy activity configuration for Amazon S3 Compatible in pipelines, go to [Configure in a pipeline copy activity](connector-amazon-s3-compatible-copy-activity.md).

