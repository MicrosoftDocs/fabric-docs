---
title: Dynamics AX connector overview
description: This article provides an overview of the supported capabilities of the Dynamics AX connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/15/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Dynamics AX connector overview

The Dynamics AX connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in Microsoft Fabric doesn't currently support Dynamics AX in Dataflow Gen2.

## Support in data pipelines

The Dynamics AX connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Service principal |
| **Lookup activity** | None | Service principal |

To learn more about the copy activity configuration for Dynamics AX in Data pipeline, go to [Configure in a data pipeline copy activity](connector-dynamics-ax-copy-activity.md).
