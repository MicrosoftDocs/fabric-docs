---
title: PostgreSQL database connector overview
description: This article provides an overview of the supported capabilities of the PostgreSQL database connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# PostgreSQL database connector overview

The PostgreSQL database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.


## Support in Dataflow Gen2

For information on how to connect to a PostgreSQL database in Dataflow Gen2, go to [Set up your PostgreSQL database connection](connector-postgresql.md).

## Support in Data pipeline

The PostgreSQL database connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Basic |
| **Lookup activity** | None | Basic |

To learn more about the copy activity configuration for PostgreSQL database in Data pipeline, go to [Configure in a data pipeline copy activity](connector-postgresql-copy-activity.md).
