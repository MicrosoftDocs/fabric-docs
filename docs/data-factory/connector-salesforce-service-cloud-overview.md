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

## Support in Dataflow Gen2

Data Factory in Microsoft Fabric doesn't currently support Salesforce reports in Dataflow Gen2.

## Support in pipelines

The Salesforce Service Cloud connector supports the following capabilities in pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br> On-premises | Organizational account |
| **Lookup activity** | None <br> On-premises | Organizational account |

To learn more about the copy activity configuration for Salesforce Service Cloud in pipelines, go to [Configure in a pipeline copy activity](connector-salesforce-service-cloud-copy-activity.md).
