---
title: Azure AI Search connector overview
description: This article provides an overview of the supported capabilities of the Azure AI Search connector.
ms.topic: how-to
ms.date: 12/04/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure AI Search connector overview

The Azure AI Search connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Pipeline** <br>- [Copy activity](connector-azure-search-copy-activity.md) (-/destination)| None <br>On-premises | Service admin key     |
| **Copy job** (-/destination) <br>- Append<br>- Upsert |None <br>On-premises |Service admin key  |

## Related content

To learn more about the copy activity configuration for Azure AI Search in a pipeline, go to [Configure in a pipeline copy activity](connector-azure-search-copy-activity.md).
