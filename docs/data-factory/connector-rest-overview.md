---
title: REST connector overview
description: This article explains the overview of using REST.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 07/01/2025
ms.custom:
  - template-how-to
  - connectors
---

# REST connector overview

The REST connector is supported in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the REST connector in Dataflow Gen2. To get REST data in Dataflow Gen2, use the [Web API](/power-query/connectors/web/web) connector instead.

## Support in data pipelines

The REST connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br> On-premises | Anonymous <br>Basic <br>Organizational account <br>Service principal |

To learn about how to connect to REST data in data pipelines, go to [Set up your REST connection](connector-rest.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for REST in data pipelines, go to [Configure REST in a copy activity](connector-rest-copy-activity.md).
