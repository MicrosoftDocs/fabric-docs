---
title: Dynamics CRM connector overview
description: This article provides an overview of the supported capabilities of the Dynamics CRM connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 12/04/2025
ms.custom:
  - template-how-to
  - connectors
---

# Dynamics CRM connector overview

This Dynamics CRM connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-dynamics-crm-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Service principal<br> Workspace identity |
| **Copy job** (source/destination) <br>- Full load<br>- Append <br>- Upsert|None<br> On-premises<br> Virtual network |Service principal<br> Workspace identity |

## Related content

To learn more about the copy activity configuration for Dynamics CRM in a pipeline, go to [Configure in a pipeline copy activity](connector-dynamics-crm-copy-activity.md).
