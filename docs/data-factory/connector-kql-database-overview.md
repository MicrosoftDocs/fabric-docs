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

# KQL Database connector overview

The KQL Database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Organizational account |
| **Pipeline** <br>- [Copy activity](connector-kql-database-copy-activity.md) (source/destination)<br>- Lookup activity        | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn about how to connect to KQL Database, go to [Set up your KQL Database connection](connector-kql-database.md).

To learn about the copy activity configuration for KQL Database in pipelines, go to [Configure KQL Database in a copy activity](connector-kql-database-copy-activity.md).
