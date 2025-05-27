---
title: Azure Database for PostgreSQL connector overview
description: This article provides the overview of connecting to and using Azure Database for PostgreSQL data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/08/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Database for PostgreSQL connector overview

The Azure Database for PostgreSQL connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.


## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support Azure Database for PostgreSQL in Dataflow Gen2.

## Support in data pipelines

The Azure Database for PostgreSQL connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br> On-premises | Basic |
| **Lookup activity** | None <br> On-premises | Basic |
| **Script activity** (only supported in version 2.0) | None <br> On-premises | Basic |

To learn more about the copy activity configuration for Azure Database for PostgreSQL in data pipelines, go to [Configure in a data pipeline copy activity](connector-azure-database-for-postgresql-copy-activity.md).
