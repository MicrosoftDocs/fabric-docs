---
title: Data Warehouse connector overview
description: This article explains the overview of using Data Warehouse.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/23/2023
ms.custom: template-how-to 
---

# Data Warehouse connector overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This Data Warehouse connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | User Auth  |
| **Lookup activity** | None |User Auth |
| **GetMetadata activity** | None |User Auth |
| **Script activity** | None |User Auth |
| **Stored Procedure Activity** | None |User Auth |
| **Dataflow Gen2 (source/destination)** |  |  |

## Next Steps

[How to configure Data Warehouse in a copy activity](connector-data-warehouse-copy-activity.md)