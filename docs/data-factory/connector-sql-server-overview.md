---
title: SQL server connector overview
description: This article explains the overview of using SQL server.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 10/25/2023
ms.custom: template-how-to, build-2023
---

# SQL server connector overview

This SQL server connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Support in data pipelines

The SQL server connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (source/destination)** | None | Basic |
| **Lookup activity** | None | Basic |
| **GetMetadata activity** | None | Basic |
| **Script activity** | None | Basic |
| **Stored procedure activity** | None | Basic |

To learn more about the copy activity configuration for SQL server in data pipelines, go to [Configure in a data pipeline copy activity](connector-sql-server-copy-activity.md).
