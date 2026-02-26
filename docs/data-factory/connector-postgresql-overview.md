---
title: PostgreSQL database connector overview
description: This article provides an overview of the supported capabilities of the PostgreSQL database connector.
ms.topic: how-to
ms.date: 01/24/2025
ms.custom:
  - template-how-to
  - connectors
---

# PostgreSQL database connector overview

The PostgreSQL database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Basic |
| **Pipeline**<br>- [Copy activity](connector-postgresql-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/-) <br>- Full load<br>- Incremental load|None<br> On-premises<br> Virtual network |Basic |

## Related content

For information on how to connect to a PostgreSQL database, go to [Set up your PostgreSQL database connection](connector-postgresql.md).

To learn more about the copy activity configuration for PostgreSQL database in a pipeline, go to [Configure in a pipeline copy activity](connector-postgresql-copy-activity.md).
