---
title: Informix For Pipeline connector overview
description: This article provides an overview of the supported capabilities of the Informix For Pipeline connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 09/03/2025
ms.custom:
  - template-how-to
---

# Informix For Pipeline connector overview

The Informix For Pipeline connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Pipeline** <br>- [Copy activity](connector-informix-for-pipeline-copy-activity.md) (source/destination)<br>- Lookup activity | On-premises (version 3000.282.5 or above) | Anonymous <br>Basic   |
| **Copy job** (source/destination) | On-premises (version 3000.282.5 or above) | Anonymous <br>Basic   |

> [!NOTE]
> To use Informix For Pipeline connector, install [the 64-bit Informix Client SDK](https://www.ibm.com/support/pages/informix-client-software-development-kit-client-sdk-and-informix-connect-system-requirements) on the computer running on-premises data gateway.

## Related content

To learn more about the copy activity configuration for Informix For Pipeline in pipelines, go to [Configure in a pipeline copy activity](connector-informix-for-pipeline-copy-activity.md).
