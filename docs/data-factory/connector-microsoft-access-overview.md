---
title: Microsoft Access connector overview
description: This article provides an overview of the supported capabilities of the Microsoft Access connector.
ms.reviewer: jianleishen
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
> To use Microsoft Access connector in date pipelines, install [Microsoft 365 Access Runtime](https://support.microsoft.com/office/download-and-install-microsoft-365-access-runtime-185c5a32-8ba9-491e-ac76-91cbe3ea09c9) on the computer running on-premises data gateway.

## Related content

To learn more about the copy activity configuration for Microsoft Access in Pipeline, go to [Configure in a pipeline copy activity](connector-microsoft-access-copy-activity.md).
