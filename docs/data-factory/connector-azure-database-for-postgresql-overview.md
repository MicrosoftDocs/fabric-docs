---
title: Azure Database for PostgreSQL connector overview
description: This article provides the overview of connecting to and using Azure Database for PostgreSQL data in Data Factory.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 05/08/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Database for PostgreSQL connector overview

The Azure Database for PostgreSQL connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-azure-database-for-postgresql-copy-activity.md) (source/destination) <br>- Lookup activity <br>- Script activity (only supported in version 2.0)    |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- Append |None<br> On-premises<br> Virtual network |Basic |

## Related content

To learn more about the copy activity configuration for Azure Database for PostgreSQL in pipelines, go to [Configure in a pipeline copy activity](connector-azure-database-for-postgresql-copy-activity.md).
