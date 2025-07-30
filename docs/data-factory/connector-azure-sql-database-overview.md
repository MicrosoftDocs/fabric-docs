---
title: Azure SQL Database connector overview
description: This article explains the overview of using Azure SQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure SQL Database connector overview

The Azure SQL Database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Basic<br> Organizational account |
| **Data pipeline** <br>- [Copy activity](connector-azure-sql-database-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Script activity<br>- Stored procedure activity | None<br> On-premises<br> Virtual network | Basic<br> Organizational account<br> Service principal |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- CDC<br>- Append<br>- Merge | None<br> On-premises<br> Virtual network | Basic<br> Organizational account<br> Service principal |

## Related content

To learn about how to connect to Azure SQL Database, go to [Set up your Azure SQL Database connection](connector-azure-sql-database.md).

To learn about the copy activity configuration for Azure SQL Database in data pipelines, go to [Configure Azure SQL Database in a copy activity](connector-azure-sql-database-copy-activity.md).
