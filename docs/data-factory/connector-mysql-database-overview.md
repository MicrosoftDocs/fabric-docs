---
title: MySQL database connector overview
description: This article provides an overview of the supported capabilities of the MySQL database connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 03/27/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# MySQL database connector overview

The MySQL database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

For information on how to connect to a MySQL database in Dataflow Gen2, go to [Set up your MySQL database connection](connector-mysql-database.md).

## Support in Data pipeline

The MySQL database connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None <br>On-premises | Basic |
| **Lookup activity** | None <br>On-premises | Basic |

To learn more about the copy activity configuration for MySQL database in Data pipeline, go to [Configure in a Data pipeline copy activity](connector-mysql-database-copy-activity.md).
