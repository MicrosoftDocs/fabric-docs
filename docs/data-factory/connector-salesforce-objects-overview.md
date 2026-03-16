---
title: Salesforce objects connector overview
description: This article provides an overview of the supported capabilities of the Salesforce objects connector.
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Salesforce objects connector overview

The Salesforce objects connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/-)                                                 | None<br> On-premises<br> Virtual network | Organizational account |
| **Pipeline** <br>- [Copy activity](connector-salesforce-copy-activity.md) (source/destination)<br>- Lookup activity        | None<br> On-premises<br> Virtual network | Organizational account |
| **Copy job** (source/destination) <br>- Full load<br>- Append <br>- Upsert | None<br> On-premises<br> Virtual network | Organizational account |

## Related content

To learn about how to connect to Salesforce objects, go to [Set up your Salesforce objects connection](connector-salesforce-objects.md).

To learn more about the copy activity configuration for Salesforce objects in pipelines, go to [Configure in a pipeline copy activity](connector-salesforce-copy-activity.md).
