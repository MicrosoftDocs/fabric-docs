---
title: Azure Files connector overview
description: This article provides an overview of the supported capabilities of the Azure Files connector.
ms.topic: how-to
ms.date: 12/04/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Files connector overview

The Azure Files connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Pipeline** <br>- [Copy activity](connector-azure-files-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Delete activity| None<br> On-premises<br> Virtual network | Account key     |
| **Copy job** (source/destination) <br>- Full load<br>- Append<br>- Override|None<br> On-premises<br> Virtual network |Account key  |

## Related content

To learn more about the copy activity configuration for Azure Files in a pipeline, go to [Configure in a pipeline copy activity](connector-azure-files-copy-activity.md).
