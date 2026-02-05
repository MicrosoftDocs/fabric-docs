---
title: Azure Database for MySQL connector overview
description: This article provides an overview of the supported capabilities of the Azure Database for MySQL connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 06/11/2024
ms.custom:
  - template-how-to
  - connectors
---

# Azure Database for MySQL connector overview

The Azure Database for MySQL connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-azure-database-for-mysql-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- Append |None<br> On-premises<br> Virtual network |Basic |

## Related content

To learn more about the copy activity configuration for Azure Database for MySQL in pipelines, go to [Configure in a pipeline copy activity](connector-azure-database-for-mysql-copy-activity.md).
