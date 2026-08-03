---
title: PostgreSQL database connector overview
description: This article provides an overview of the supported capabilities of the PostgreSQL database connector.
ms.topic: how-to
ms.date: 07/21/2026
ms.custom:
  - template-how-to
  - connectors
---

# PostgreSQL database connector overview

The PostgreSQL database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/destination)|None<br> On-premises<br> Virtual network |Basic |
| **Pipeline**<br>- [Copy activity](connector-postgresql-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load|None<br> On-premises<br> Virtual network |Basic |

> [!IMPORTANT]
> To use PostgreSQL as a Dataflow Gen2 data destination through an on-premises data gateway, install the [June 2026 gateway update (version 3000.322)](/data-integration/gateway/service-gateway-monthly-updates#june-2026-update-3000322) or later.

## Related content

For information on how to connect to a PostgreSQL database, go to [Set up your PostgreSQL database connection](connector-postgresql.md).

To learn more about the copy activity configuration for PostgreSQL database in a pipeline, go to [Configure in a pipeline copy activity](connector-postgresql-copy-activity.md).
