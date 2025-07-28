---
title: Dynamics CRM connector overview
description: This article provides an overview of the supported capabilities of the Dynamics CRM connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/17/2023
ms.custom:
  - template-how-to
  - connectors
---

# Dynamics CRM connector overview

This Dynamics CRM connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Data pipeline**<br>- [Copy activity](connector-dynamics-crm-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Service principal |
| **Copy job** (source/destination) <br>- Full load<br>- Append <br>- Merge|None<br> On-premises<br> Virtual network |Service principal |

## Related content

To learn more about the copy activity configuration for Dynamics CRM in Data pipeline, go to [Configure in a data pipeline copy activity](connector-dynamics-crm-copy-activity.md).
