---
title: IBM Db2 database connector overview
description: This article provides an overview of the supported capabilities of the IBM Db2 database connector.
ms.topic: how-to
ms.date: 08/12/2025
ms.custom:
  - template-how-to
  - connectors
---

# IBM Db2 database connector overview

The IBM Db2 database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|On-premises |Basic<br> Windows |
| **Pipeline**<br>- [Copy activity](connector-ibm-db2-database-copy-activity.md) (source/-) <br>- Lookup activity    |On-premises |Basic |
| **Copy job** (source/-) <br>- Full load | On-premises |Basic |

## Related content

To learn about how to connect to IBM Db2 database, go to [Set up your IBM Db2 database connection](connector-ibm-db2-database.md).

To learn about the copy activity configuration for IBM Db2 database in pipelines, go to [Configure IBM Db2 database in a copy activity](connector-ibm-db2-database-copy-activity.md).
