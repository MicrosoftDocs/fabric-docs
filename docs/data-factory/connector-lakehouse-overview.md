---
title: Lakehouse connector overview
description: This article explains the overview of using Lakehouse.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Lakehouse connector overview

The Lakehouse connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/destination)                                                 | None<br> On-premises<br> Virtual network | Organizational account |
| **Pipeline** <br>- [Copy activity](connector-lakehouse-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Delete activity  | None<br> On-premises<br> Virtual network | Organizational account |
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load <br>- CDC (only supported for Lakehouse Tables)<br>- Append<br>- Override <br>- Upsert (only supported for Lakehouse Tables) <br>- CDC Merge (only supported for Lakehouse Tables) | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn about how to connect to Lakehouse, go to [Set up your Lakehouse connection](connector-lakehouse.md).

To learn about the copy activity configuration for a Lakehouse in pipelines, go to [Configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md).
