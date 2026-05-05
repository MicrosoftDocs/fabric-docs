---
title: Amazon Redshift connector overview
description: This article provides an overview of the supported capabilities of the Amazon Redshift connector.
ms.topic: how-to
ms.date: 10/17/2025
ms.custom:
  - template-how-to
  - connectors
---

# Amazon Redshift connector overview

The Amazon Redshift connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/-)                                                           | None <br> Virtual network        | Amazon Redshift<br> Microsoft Account |
| **Pipeline** <br>- [Copy activity](connector-amazon-redshift-copy-activity.md) (source/-)<br>- Lookup activity        | None       | Amazon Redshift |

## Related content

To learn about how to connect to Amazon Redshift, go to [Set up your Amazon Redshift connection](connector-amazon-redshift.md).


To learn more about the copy activity configuration for Amazon Redshift in pipelines, go to [Configure in a pipeline copy activity](connector-amazon-redshift-copy-activity.md).
