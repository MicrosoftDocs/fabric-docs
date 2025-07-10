---
title: Data Warehouse connector overview
description: This article explains the overview of using Data Warehouse.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Data warehouse connector overview

The Data warehouse connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Data pipeline** <br>- [Copy activity](connector-data-warehouse-copy-activity.md) (source/destination)<br>- Lookup activity<br>- GetMetadata activity<br>- Script<br>- Stored Proc | None<br> On-premises<br> Virtual network | Organizational account |
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Organizational account |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- Append<br>- Override | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn about how to connect to Data warehouse, go to [Set up your Data warehouse connection](connector-data-warehouse.md).

To learn more about the copy activity configuration for Data Warehouse in data pipelines, go to [Configure in a data pipeline copy activity](connector-data-warehouse-copy-activity.md).
