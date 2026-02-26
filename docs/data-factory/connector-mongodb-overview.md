---
title: MongoDB connector overview
description: This article provides the overview of connecting to and using MongoDB data in Data Factory.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 12/04/2025
ms.custom:
  - template-how-to
  - connectors
---

# MongoDB connector overview

The MongoDB connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Pipeline** <br>- [Copy activity](connector-mongodb-copy-activity.md) (source/destination)                            | None<br> On-premises<br> Virtual network | Basic           |
| **Copy job** (source/destination) <br>- Full load<br>- Append <br>- Upsert|None<br> On-premises<br> Virtual network | Basic |


## Related content

To learn more about the copy activity configuration for MongoDB in pipelines, go to [Configure in a pipeline copy activity](connector-mongodb-copy-activity.md).
