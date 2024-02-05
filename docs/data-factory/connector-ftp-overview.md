---
title: FTP connector overview
description: This article provides the overview of connecting to and using FTP data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# FTP connector overview

The FTP connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support FTP in Dataflow Gen2.

## Support in data pipelines

The FTP connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Anonymous<br>Basic |
| **Lookup activity** | None | Anonymous<br>Basic |
| **GetMetadata activity** | None | Anonymous<br>Basic |
| **Delete activity** | None | Anonymous<br>Basic |

To learn more about the copy activity configuration for FTP in data pipelines, go to [Configure in a data pipeline copy activity](connector-ftp-copy-activity.md).
