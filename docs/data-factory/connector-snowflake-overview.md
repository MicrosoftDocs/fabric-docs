---
title: Snowflake connector overview
description: This article provides an overview of the Snowflake connector in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 03/11/2025
ms.custom:
  - template-how-to
  - connectors
---

# Snowflake connector overview

The Snowflake connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to a Snowflake database in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-snowflake.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The Snowflake connector supports the following capabilities in data pipelines.

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br> On-premises | Snowflake <br> Microsoft Account  |
| **Lookup activity** | None <br> On-premises | Snowflake <br> Microsoft Account |
| **Script activity** | None <br> On-premises | Snowflake <br> Microsoft Account |

To learn about the copy activity configuration for Snowflake in data pipelines, go to [Configure Snowflake in a copy activity](connector-snowflake-copy-activity.md).
