---
title: Azure Synapse Analytics connector overview
description: This article explains the overview of using Azure Synapse Analytics.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 06/25/2023
ms.custom: template-how-to, build-2023
---

# Azure Synapse Analytics connector overview

This Azure Synapse Analytics connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported capabilities

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (Source/Destination)** | None | Basic<br>Organizational account<br>Service principal |
| **Lookup activity** | None | Basic<br>Organizational account<br>Service principal |
| **GetMetadata activity** | None | Basic<br>Organizational account<br>Service principal |
| **Script activity** | None | Basic<br>Organizational account<br>Service principal |
| **Stored procedure activity** | None | Basic<br>Organizational account<br>Service principal |

## Next steps

- [How to configure Azure Synapse Analytics in copy activity](connector-azure-synapse-analytics-copy-activity.md)
