---
title: SFTP connector overview
description: This article provides the overview of connecting to and using SFTP data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# SFTP connector overview

The SFTP connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the SFTP connector in Dataflow Gen2.

## Support in data pipelines

The SFTP connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Basic |
| **Lookup activity** | None | Basic |
| **GetMetadata activity** | None | Basic |
| **Delete activity** | None | Basic |

To learn about the copy activity configuration for SFTP in data pipelines, go to [Configure SFTP in a copy activity](connector-sftp-copy-activity.md).
