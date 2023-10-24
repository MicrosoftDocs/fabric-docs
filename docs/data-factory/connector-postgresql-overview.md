---
title: PostgreSQL connector overview
description: This article provides the overview of connecting to and using PostgreSQL data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 10/20/2023
ms.custom: template-how-to, build-2023
---

# PostgreSQL connector overview

The PostgreSQL connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Support in data pipelines

The PostgreSQL connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Basic |
| **Lookup activity** | None | Basic |

To learn more about the copy activity configuration for PostgreSQL in data pipelines, go to [Configure in a data pipeline copy activity](connector-postgresql-copy-activity.md).