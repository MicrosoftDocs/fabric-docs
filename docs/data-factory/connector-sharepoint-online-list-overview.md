---
title: SharePoint Online List connector overview
description: This article explains the overview of using SharePoint Online List.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# SharePoint Online List connector overview

The SharePoint Online List connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to a SharePoint Online List in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-sharepoint-online-list.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The SharePoint Online List connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Service principal |
| **Lookup activity** | None | Service principal |

To learn about how to connect to a SharePoint Online List in data pipelines, go to [Set up your SharePoint Online List connection](connector-sharepoint-online-list.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for a SharePoint Online List in data pipelines, go to [Configure SharePoint Online List in a copy activity](connector-sharepoint-online-list-copy-activity.md).
