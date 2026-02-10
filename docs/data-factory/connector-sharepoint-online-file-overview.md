---
title: SharePoint Online File (Preview) connector overview
description: This article provides an overview of the supported capabilities of the SharePoint Online File connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 01/21/2026
ms.custom:
  - template-how-to
  - connectors
---

# SharePoint Online File connector overview (Preview)

This SharePoint Online File connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication |
|----------------------------------------------------------------------------------------|--------------------------------|----------------|
| **Pipeline** <br> - [Copy activity](connector-sharepoint-online-file-copy-activity.md) (source/destination) <br> - Lookup activity <br> - Get Metadata activity <br> - Delete activity | None <br> On-premises <br> Virtual network | Organizational account <br> Service principal <br> Workspace identity |
| **Copy job** (source/destination) <br> | None <br> On-premises <br> Virtual network | Organizational account <br> Service principal <br> Workspace identity |

## Related content

To learn about how to connect to SharePoint Online File, go to [Set up your SharePoint Online File connection](connector-sharepoint-online-list.md).

To learn about the copy activity configuration for SharePoint Online File in a pipeline, go to [Configure SharePoint Online File in a copy activity](connector-sharepoint-online-file-copy-activity.md).
