---
title: MySQL database connector overview
description: This article provides an overview of the supported capabilities of the MySQL database connector.
ms.topic: how-to
ms.date: 03/27/2024
ms.custom:
  - template-how-to
  - connectors
---

# MySQL database connector overview

The MySQL database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Basic |
| **Pipeline**<br>- [Copy activity](connector-mysql-database-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Basic |

## Related content

To learn more about the copy activity configuration for MySQL database in a pipeline, go to [Configure in a pipeline copy activity](connector-mysql-database-copy-activity.md).
