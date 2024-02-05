---
title: Snowflake connector overview
description: This article provides an overview of the Snowflake connector in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Snowflake connector overview

The Snowflake connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to a Snowflake database in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-snowflake.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The Snowflake connector supports the following capabilities in data pipelines.

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Snowflake |
| **Lookup activity** | None | Snowflake |
| **Script activity** | None | Snowflake |

To learn about the copy activity configuration for Snowflake in data pipelines, go to [Configure Snowflake in a copy activity](connector-snowflake-copy-activity.md).
