---
title: KQL Database connector overview
description: This article explains the overview of using KQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# KQL database connector overview

The KQL database connector is supported in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Data pipeline** <br>- [Copy activity](connector-kql-database-copy-activity.md) (source/destination)<br>- Lookup activity        | None<br> On-premises<br> Virtual network | Organizational account |
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn about how to connect to KQL database, go to [Set up your KQL database connection](connector-kql-database.md).

To learn about the copy activity configuration for KQL Database in data pipelines, go to [Configure KQL Database in a copy activity](connector-kql-database-copy-activity.md).
