---
title: Amazon RDS for SQL Server connector overview
description: This article provides the overview of connecting to and using Amazon RDS for SQL Server data in Data Factory.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Amazon RDS for SQL Server connector overview

The Amazon RDS for SQL Server connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-amazon-rds-for-sql-server-copy-activity.md) (source/-) <br>- Lookup activity<br>- Get Metadata activity  <br>- Stored procedure activity |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Basic |

## Related content

To learn more about the copy activity configuration for Amazon RDS for SQL Server in a pipeline, go to [Configure in a pipeline copy activity](connector-amazon-rds-for-sql-server-copy-activity.md).
