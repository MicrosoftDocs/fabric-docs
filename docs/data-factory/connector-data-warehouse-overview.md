---
title: Data Warehouse connector overview
description: This article explains the overview of using Data Warehouse.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Data Warehouse connector overview

The Data Warehouse connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to a Data Warehouse in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-data-warehouse.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipeline

The Data Warehouse connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | User Auth  |
| **Lookup activity** | None |User Auth |
| **GetMetadata activity** | None |User Auth |
| **Script activity** | None |User Auth |
| **Stored Procedure Activity** | None |User Auth |

To learn more about the copy activity configuration for Data Warehouse in data pipelines, go to [Configure in a data pipeline copy activity](connector-data-warehouse-copy-activity.md).
