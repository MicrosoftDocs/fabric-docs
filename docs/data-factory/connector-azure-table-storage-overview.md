---
title: Azure Table Storage connector overview
description: This article provides an overview of the supported capabilities of the Azure Table Storage connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Azure Table Storage connector overview

This Azure Table Storage connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Account key<br> Organizational account<br> Workspace identity |
| **Pipeline**<br>- [Copy activity](connector-azure-table-storage-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Account key<br> Workspace identity |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Account key<br> Workspace identity |

## Related content

To learn about how to connect to Azure Table Storage, go to [Set up your Azure Table Storage connection](connector-azure-table-storage.md).

To learn more about the copy activity configuration for Azure Table Storage in pipelines, go to [Configure in a pipeline copy activity](connector-azure-table-storage-copy-activity.md).
