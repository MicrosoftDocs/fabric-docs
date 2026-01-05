---
title: Salesforce Service Cloud connector overview
description: This article provides an overview of the supported capabilities of the Salesforce Service Cloud connector.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 02/11/2025
ms.custom:
  - template-how-to
  - connectors
---

# Salesforce Service Cloud connector overview

The Salesforce Service Cloud connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-salesforce-service-cloud-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Organizational account |
| **Copy job** (source/destination) <br>- Full load<br>- Append<br>- Upsert |None<br> On-premises<br> Virtual network |Organizational account |

## Related content

To learn more about the copy activity configuration for Salesforce Service Cloud in pipelines, go to [Configure in a pipeline copy activity](connector-salesforce-service-cloud-copy-activity.md).
