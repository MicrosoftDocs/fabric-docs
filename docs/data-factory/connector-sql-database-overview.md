---
title: SQL database connector overview (Preview)
description: This article explains the overview of using SQL database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# SQL database connector overview (Preview)

The SQL database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Organizational account |
| **Data pipeline** <br>- [Copy activity](connector-sql-database-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Script activity<br>- Stored procedure activity | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn about how to connect to SQL Database in data pipelines, go to [Set up your SQL Database connection](connector-sql-database.md).

To learn about the copy activity configuration for SQL database in data pipelines, go to [Configure SQL database in a copy activity](connector-sql-database-copy-activity.md).
