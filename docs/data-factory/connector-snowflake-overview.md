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

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Snowflake<br> Microsoft Account |
| **Data pipeline**<br>- [Copy activity](connector-snowflake-copy-activity.md) (source/destination) <br>- Lookup activity  <br>- Script activity |None<br> On-premises<br> Virtual network |Snowflake<br> Microsoft Account |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- Append |None<br> On-premises<br> Virtual network |Snowflake<br> Microsoft Account |

## Related content

To learn about how to connect to a Snowflake database in Dataflow Gen2, go to [Set up your Snowflake connection](connector-snowflake.md).


To learn about the copy activity configuration for Snowflake in data pipelines, go to [Configure Snowflake in a copy activity](connector-snowflake-copy-activity.md).
