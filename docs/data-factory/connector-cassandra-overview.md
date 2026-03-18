---
title: Cassandra connector overview
description: This article explains the overview of using Cassandra.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 12/04/2025
ms.custom:
  - template-how-to
  - connectors
---

# Cassandra connector overview

The Cassandra connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication                                                                                                 |
|----------------------------------------------------------------------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------|
| **Pipeline** <br>- [Copy activity](connector-cassandra-copy-activity.md) (source/-)<br>- Lookup activity | None<br>On-premises (version 3000.274.3 or above) <br>Virtual network | Anonymous<br> Basic |
| **Copy job** (source/-) <br>- Full load |None<br>On-premises (version 3000.274.3 or above) <br>Virtual network  | Anonymous<br> Basic|


## Related content

To learn about the copy activity configuration for Cassandra in pipelines, go to [Configure Cassandra in a copy activity](connector-cassandra-copy-activity.md).
