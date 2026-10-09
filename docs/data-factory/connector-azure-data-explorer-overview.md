---
title: Azure Data Explorer connector overview
description: This article provides an overview of the supported capabilities of the Azure Data Explorer connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Azure Data Explorer overview

This Azure Data Explorer connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/destination)|None<br> On-premises<br> Virtual network |Organizational account<br> Workspace identity |
| **Pipeline**<br>- [Copy activity](connector-azure-data-explorer-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Organizational account<br>Workspace identity |
| **Copy job** (source/destination) <br>- Full load<br>- Append |None<br> On-premises<br> Virtual network |Organizational account<br>Workspace identity |

## Related content
To learn about how to connect to Azure Data Explorer, go to [Set up your connection](connector-azure-data-explorer.md).

To learn more about the copy activity configuration for Azure Data Explorer in pipelines, go to [Configure in a pipeline copy activity](connector-azure-data-explorer-copy-activity.md).
