---
title: OData connector overview
description: This article provides a brief overview of the OData connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/19/2025
ms.custom:
  - template-how-to
  - connectors
---

# OData connector overview

This OData connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Anonymous<br> Basic<br> Organizational account |
| **Pipeline**<br>- [Copy activity](connector-odata-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Anonymous<br> Basic |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Anonymous<br> Basic |

## Related content

To learn about how to connect to OData, go to [Set up your OData connection](connector-odata.md).

To learn about the copy activity configuration for Azure Blob Storage in pipelines, go to [Configure OData in a copy activity](connector-odata-copy-activity.md).
