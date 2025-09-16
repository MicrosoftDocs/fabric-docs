---
title: Amazon S3 Compatible connector overview
description: This article provides an overview of the supported capabilities of the Amazon S3 Compatible connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 01/23/2024
ms.custom:
  - template-how-to
  - connectors
---

# Amazon S3 Compatible connector overview

This Amazon S3 Compatible connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support Amazon S3 Compatible connectors in Dataflow Gen2.

## Support in a pipeline

The Amazon S3 Compatible connector supports the following capabilities in a pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br> On-premises | Access Key |
| **Lookup activity** | None <br> On-premises | Access Key |
| **GetMetadata activity** | None <br> On-premises | Access Key |
| **Delete activity** | None <br> On-premises | Access Key |

To learn more about the copy activity configuration for Amazon S3 Compatible in a pipeline, go to [Configure in a pipeline copy activity](connector-amazon-s3-compatible-copy-activity.md).
