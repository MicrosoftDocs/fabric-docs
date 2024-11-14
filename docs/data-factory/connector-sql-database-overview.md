---
title: SQL database connector overview
description: This article explains the overview of using SQL database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/14/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# SQL database connector overview

This SQL database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in data pipelines

The SQL database connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (Source/Destination)** | None <br> On-premises | User Auth |
| **Lookup activity** | None <br> On-premises | User Auth |
| **GetMetadata activity** | None <br> On-premises | User Auth |
| **Script activity** | None <br> On-premises | User Auth |
| **Stored procedure activity** | None <br> On-premises | User Auth |

To learn about the copy activity configuration for SQL database in data pipelines, go to [Configure SQL database in a copy activity](connector-sql-database-copy-activity.md).
