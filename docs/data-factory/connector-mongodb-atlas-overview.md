---
title: MongoDB Atlas connector overview
description: This article provides the overview of connecting to and using MongoDB Atlas data in Data Factory.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 02/05/2026
ms.custom:
  - template-how-to
  - connectors
---

# MongoDB Atlas connector overview

The MongoDB Atlas connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Pipeline** <br>- [Copy activity](connector-mongodb-atlas-copy-activity.md) (source/destination)                            | None<br> On-premises<br> Virtual network | Basic           |
| **Copy job** (source/destination) <br>- Full load<br>- Append <br>- Upsert|None<br> On-premises<br> Virtual network | Basic |

## Related content

To learn more about the copy activity configuration for MongoDB Atlas in pipelines, go to [Configure in a pipeline copy activity](connector-mongodb-atlas-copy-activity.md).
