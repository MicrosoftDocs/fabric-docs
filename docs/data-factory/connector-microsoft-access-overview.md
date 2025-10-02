---
title: Microsoft Access connector overview
description: This article provides an overview of the supported capabilities of the Microsoft Access connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 08/25/2025
ms.custom:
  - template-how-to
---

# Microsoft Access connector overview

The Microsoft Access connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Pipeline** <br>- [Copy activity](connector-microsoft-access-copy-activity.md) (source/destination)<br>- Lookup activity | On-premises (version 3000.278.5 or above) | Anonymous <br>Basic   |
| **Copy job** (source/destination) | On-premises (version 3000.278.5 or above) | Anonymous <br>Basic |

> [!NOTE]
> To use Microsoft Access connector in date pipelines, please install [Microsoft Access ODBC driver](https://www.microsoft.com/download/details.aspx?id=54920) on the computer running on-premises data gateway. The recommended driver version is 16.00.5378.1000 or above.

## Related content

To learn more about the copy activity configuration for Microsoft Access in Pipeline, go to [Configure in a pipeline copy activity](connector-microsoft-access-copy-activity.md).
