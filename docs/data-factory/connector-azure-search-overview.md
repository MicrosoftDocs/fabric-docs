---
title: Azure AI Search connector overview
description: This article provides an overview of the supported capabilities of the Azure AI Search connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 04/24/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure AI Search connector overview

The Azure AI Search connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the Azure AI Search connector in Dataflow Gen2.

## Support in Data pipeline

The Azure AI Search connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (-/destination)** | None <br>On-premises| Service admin key |

To learn more about the copy activity configuration for Azure AI Search in Data pipeline, go to [Configure in a Data pipeline copy activity](connector-azure-search-copy-activity.md).
