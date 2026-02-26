---
title: SharePoint Online List connector overview
description: This article explains the overview of using SharePoint Online List.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 04/01/2025
ms.custom:
  - template-how-to
  - connectors
---

# SharePoint Online List connector overview

The SharePoint Online List connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Organizational account<br> Service principal<br> Workspace identity |
| **Pipeline**<br>- [Copy activity](connector-sharepoint-online-list-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Organizational account<br> Service principal <br>Workspace identity|
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Organizational account<br> Service principal<br>Workspace identity |

## Related content

To learn about how to connect to a SharePoint Online List, go to [Set up your SharePoint Online List connection](connector-sharepoint-online-list.md).

To learn about the copy activity configuration for a SharePoint Online List in pipelines, go to [Configure SharePoint Online List in a copy activity](connector-sharepoint-online-list-copy-activity.md).
