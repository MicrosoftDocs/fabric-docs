---
title: Amazon Redshift connector overview
description: This article provides an overview of the supported capabilities of the Amazon Redshift connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Amazon Redshift connector overview

The Amazon Redshift connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Amazon Redshift in Dataflow Gen2, go to [Set up your Amazon Redshift connection](connector-amazon-redshift.md).

## Support in data pipelines

The Amazon Redshift connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Amazon Redshift |
| **Lookup activity** | None | Amazon Redshift |

To learn more about the copy activity configuration for Amazon Redshift in data pipelines, go to [Configure in a data pipeline copy activity](connector-amazon-redshift-copy-activity.md).
