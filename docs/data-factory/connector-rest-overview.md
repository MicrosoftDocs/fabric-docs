---
title: REST connector overview
description: This article explains the overview of using REST.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/01/2026
ai-usage: ai-assisted
ms.custom:
  - template-how-to
  - connectors
---

# REST connector overview

The REST connector is supported in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

> [!IMPORTANT]
> A REST connector security update introduces a breaking change for Copy activity configurations that use **Relative URL** to override the connection's scheme, host, port, or base path. If your activity fails with `HttpInvalidUrlAddress`, follow the mitigation in [REST request URL validation](connector-rest-copy-activity.md#rest-request-url-validation).

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-rest-copy-activity.md) (source/destination)      |None<br> On-premises<br> Virtual network |Anonymous<br> Basic<br> Organizational account<br> Service principal |

## Related content

To learn about how to connect to REST, go to [Set up your REST connection](connector-rest.md).

To learn about the copy activity configuration for REST in pipelines, go to [Configure REST in a copy activity](connector-rest-copy-activity.md).
