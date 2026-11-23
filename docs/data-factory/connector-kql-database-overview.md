---
title: KQL Database connector overview
description: This article explains the overview of using KQL Database.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# KQL database connector overview

[!INCLUDE [product-name](../includes/product-name.md)] Data Factory supports the KQL database connector with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Organizational account |
| **Pipeline** <br>- [Copy activity](connector-kql-database-copy-activity.md) (source/destination)<br>- Lookup activity        | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn how to connect to a KQL database, see [Set up your KQL database connection](connector-kql-database.md).

To learn how to configure the copy activity for a KQL database in pipelines, see [Configure KQL database in a copy activity](connector-kql-database-copy-activity.md).
