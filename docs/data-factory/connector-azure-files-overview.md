---
title: Azure Files connector overview
description: This article provides an overview of the supported capabilities of the Azure Files connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 04/09/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure Files connector overview

The Azure Files connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in Microsoft Fabric doesn't currently support the Azure Files connector in Dataflow Gen2.

## Support in Data pipeline

The Azure Files connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br>On-premises | Account key |
| **Lookup activity** | None <br>On-premises | Account key |
| **GetMetadata activity** | None <br>On-premises | Account key |
| **Delete data activity** | None <br>On-premises | Account key |

To learn more about the copy activity configuration for Azure Files in Data pipeline, go to [Configure in a Data pipeline copy activity](connector-azure-files-copy-activity.md).
