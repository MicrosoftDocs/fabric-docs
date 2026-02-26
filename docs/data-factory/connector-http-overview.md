---
title: HTTP connector overview
description: This article provides the overview of connecting to and using HTTP data in Data Factory.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# HTTP connector overview

The HTTP connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-http-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Basic |

## Related content

To learn about how to connect to HTTP, go to [Set up your HTTP connection](connector-http.md).

To learn about the copy activity configuration for HTTP in pipelines, go to [Configure HTTP in a copy activity](connector-http-copy-activity.md).
