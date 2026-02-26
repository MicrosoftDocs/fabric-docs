---
title: SQL database connector overview (Preview)
description: This article explains the overview of using SQL database.
ms.reviewer: jianleishen
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
| **Pipeline** <br>- [Copy activity](connector-sql-database-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Script activity<br>- Stored procedure activity | None<br> On-premises<br> Virtual network | Organizational account |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- Append<br>- Override<br>- Upsert <br>- CDC Merge | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn about how to connect to SQL Database in pipelines, go to [Set up your SQL Database connection](connector-sql-database.md).

To learn about the copy activity configuration for SQL database in pipelines, go to [Configure SQL database in a copy activity](connector-sql-database-copy-activity.md).
