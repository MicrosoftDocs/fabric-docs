---
title: SFTP connector overview
description: This article provides the overview of connecting to and using SFTP data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 12/18/2024
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
| **Copy activity (source/destination)** | None <br> On-premises | Basic |
| **Lookup activity** | None <br> On-premises | Basic |
| **GetMetadata activity** | None <br> On-premises | Basic |
| **Delete activity** | None <br> On-premises | Basic |

To learn about the copy activity configuration for SFTP in data pipelines, go to [Configure SFTP in a copy activity](connector-sftp-copy-activity.md).
