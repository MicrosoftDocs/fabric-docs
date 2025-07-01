---
title: Amazon RDS for SQL Server connector overview
description: This article provides the overview of connecting to and using Amazon RDS for SQL Server data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Amazon RDS for SQL Server connector overview

The Amazon RDS for SQL Server connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Data pipeline

The Amazon RDS for SQL Server connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None <br> On-premises | Basic |
| **Lookup activity** | None <br> On-premises | Basic |
| **GetMetadata activity** | None <br> On-premises | Basic |
| **Stored procedure activity** | None <br> On-premises | Basic |

To learn more about the copy activity configuration for Amazon RDS for SQL Server in Data pipeline, go to [Configure in a data pipeline copy activity](connector-amazon-rds-for-sql-server-copy-activity.md).
