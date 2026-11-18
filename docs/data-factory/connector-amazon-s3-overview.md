---
title: Amazon S3 connector overview
description: This article provides an overview of the supported capabilities of the Amazon S3 connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/04/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Amazon S3 connector overview

This Amazon S3 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

In Dataflow Gen2, Amazon S3 is available in preview as both a data source and a file-based data destination. Read files from an S3 bucket, transform the data with Power Query, and write the results to a supported destination, including Amazon S3.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source, preview) | None | Access Key |
| **Dataflow Gen2** (destination, preview) | None<br> On-premises | Access Key |
| **Pipeline** <br>- [Copy activity](connector-amazon-s3-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Delete activity | None<br> On-premises<br> Virtual network | Access Key      |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load <br>- Append<br>- Override | None<br> On-premises<br> Virtual network | Access Key      |

> [!IMPORTANT]
> To use Amazon S3 as a Dataflow Gen2 data destination through an on-premises data gateway, you need the November 2026 gateway release (version **3000.342.0**) or later. For update instructions, see [Update an on-premises data gateway](/data-integration/gateway/service-gateway-update).

The [Dataflow Gen2 source connection walkthrough](connector-amazon-s3.md#read-data-from-amazon-s3) uses Access Key authentication without a gateway.

## Related content

To learn about how to connect to Amazon S3, go to [Set up your Amazon S3 connection](connector-amazon-s3.md).

To write query results to Amazon S3 from Dataflow Gen2, see [Use Amazon S3 as a data destination](connector-amazon-s3.md#use-amazon-s3-as-a-data-destination).

To learn about the copy activity configuration for Amazon S3 in a pipeline, go to [Configure Amazon S3 in a copy activity](connector-amazon-s3-copy-activity.md).
