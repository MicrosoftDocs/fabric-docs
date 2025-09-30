---
title: Oracle Cloud Storage connector overview
description: This article provides an overview of the supported capabilities of the Oracle Cloud Storage connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 03/18/2024
ms.custom:
  - template-how-to
  - connectors
---

# Oracle Cloud Storage connector overview

The Oracle Cloud Storage connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-oracle-cloud-storage-copy-activity.md) (source/-) <br>- Lookup activity<br>- Get Metadata activity<br>- Delete activity  |None<br> On-premises<br> Virtual network |Access Key |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Access Key |

## Related content

To learn about the copy activity configuration for Oracle Cloud Storage in pipelines, go to [Configure Oracle Cloud Storage in a copy activity](connector-oracle-cloud-storage-copy-activity.md).
