---
title: Presto connector overview
description: This article provides an overview of the supported capabilities of the Presto connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 08/26/2025
ms.custom:
  - template-how-to
---

# Presto connector overview

The Presto connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Data pipeline** <br>- [Copy activity](connector-presto-copy-activity.md) (source/-)<br>- Lookup activity | None <br>On-premises<br> Virtual network | Anonymous <br>LDAP   |
| **Copy job** (source/-) | None <br>On-premises<br> Virtual network |  Anonymous <br>LDAP |

## Related content

To learn more about the copy activity configuration for Presto in data pipelines, go to [Configure in a Data pipeline copy activity](connector-presto-copy-activity.md).
