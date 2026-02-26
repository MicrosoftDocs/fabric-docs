---
title: Data Warehouse connector overview
description: This article explains the overview of using Data Warehouse.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Data Warehouse connector overview

The Data Warehouse connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Organizational account |
| **Pipeline** <br>- [Copy activity](connector-data-warehouse-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Script activity<br>- Stored procedure activity | None<br> On-premises<br> Virtual network | Organizational account |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- Append | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn about how to connect to Data Warehouse, go to [Set up your Data Warehouse connection](connector-data-warehouse.md).

To learn more about the copy activity configuration for Data Warehouse in pipelines, go to [Configure in a pipeline copy activity](connector-data-warehouse-copy-activity.md).
