---
title: Dynamics AX connector overview
description: This article provides an overview of the supported capabilities of the Dynamics AX connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 10/10/2025
ms.custom:
  - template-how-to
  - connectors
---

# Dynamics AX connector overview

The Dynamics AX connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-dynamics-ax-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises  |Service principal<br> Workspace identity |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises |Service principal<br> Workspace identity |

## Related content

To learn more about the copy activity configuration for Dynamics AX in a pipeline, go to [Configure in a pipeline copy activity](connector-dynamics-ax-copy-activity.md).