---
title: Amazon S3 connector overview
description: This article provides an overview of the supported capabilities of the Amazon S3 connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Amazon S3 connector overview

This Amazon S3 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Pipeline** <br>- [Copy activity](connector-amazon-s3-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Delete activity | None<br> On-premises<br> Virtual network | Access Key      |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load <br>- Append<br>- Override | None<br> On-premises<br> Virtual network | Access Key      |


## Related content

To learn about how to connect to Amazon S3, go to [Set up your Amazon S3 connection](connector-amazon-s3.md).

To learn about the copy activity configuration for Amazon S3 in a pipeline, go to [Configure Amazon S3 in a copy activity](connector-amazon-s3-copy-activity.md).
