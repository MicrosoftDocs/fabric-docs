---
title: KQL Database connector overview
description: This article explains the overview of using KQL Database.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# KQL Database connector overview

This KQL Database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to a KQL database in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-kql-database.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The KQL Database connector supports the following capabilities in data pipelines.

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | User Auth |
| **Lookup activity** | None | User Auth |

To learn about the copy activity configuration for KQL Database in data pipelines, go to [Configure KQL Database in a copy activity](connector-kql-database-copy-activity.md).
