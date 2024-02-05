---
title: Microsoft 365 connector overview
description: This article explains the overview of using Microsoft 365.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Microsoft 365 connector overview

The Microsoft 365 connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the Microsoft 365 connector in Dataflow Gen2.

## Support in data pipelines

The Microsoft 365 connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Service principal |

To learn about how to connect to Microsoft 365 in data pipelines, go to [Set up your Microsoft 365 connection](connector-microsoft-365.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Microsoft 365 in data pipelines, go to [Configure Microsoft 365 in a copy activity](connector-microsoft-365-copy-activity.md).
