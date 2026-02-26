---
title: Amazon RDS For Oracle connector overview
description: This article provides an overview of the supported capabilities of the Amazon RDS For Oracle connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 08/28/2025
ms.custom:
  - template-how-to
---

# Amazon RDS For Oracle connector overview

The Amazon RDS For Oracle connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Pipeline** <br>- [Copy activity](connector-amazon-rds-for-oracle-copy-activity.md) (source/-)<br>- Lookup activity | None <br>On-premises (version 3000.278.5 or above)<br> Virtual network | Basic  |
| **Copy job** (source/-) | None <br>On-premises (version 3000.278.5 or above)<br> Virtual network | Basic |

## Related content

To learn more about the copy activity configuration for Amazon RDS For Oracle in pipelines, go to [Configure in a pipeline copy activity](connector-amazon-rds-for-oracle-copy-activity.md).
