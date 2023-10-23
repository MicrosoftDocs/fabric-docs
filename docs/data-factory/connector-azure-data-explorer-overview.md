---
title: Azure Data Explorer connector overview
description: This article provides an overview of the supported capabilities of the Azure Data Explorer connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 10/23/2023
ms.custom: template-how-to, build-2023
---

# Azure Data Explorer overview

This Azure Data Explorer connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Support in data pipelines

The Azure Data Explorer connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | User Auth |
| **Lookup activity** | None | User Auth |

To learn more about the copy activity configuration for Azure Data Explorer in data pipelines, go to [Configure in a data pipeline copy activity](connector-azure-explorer-copy-activity.md).
