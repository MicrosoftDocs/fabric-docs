---
title: SQL Server database connector overview
description: This article provides an overview of the supported capabilities of the SQL Server database connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# SQL Server database connector overview

The SQL Server database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.


## Support in Dataflow Gen2

For information on how to connect to a SQL Server database in Dataflow Gen2, go to [Set up your SQL Server database connection](connector-sql-server-database.md).

## Support in Data pipeline

The SQL Server database connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (source/destination)** | None | Basic |
| **Lookup activity** | None | Basic |
| **GetMetadata activity** | None | Basic |
| **Script activity** | None | Basic |
| **Stored procedure activity** | None | Basic |

To learn more about the copy activity configuration for SQL Server database in Data pipeline, go to [Configure in a data pipeline copy activity](connector-sql-server-copy-activity.md).
