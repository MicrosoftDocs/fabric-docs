---
title: HTTP connector overview
description: This article provides the overview of connecting to and using HTTP data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# HTTP connector overview

The HTTP connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the HTTP connector in Dataflow Gen2.

## Support in data pipelines

The Google Cloud Storage connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Basic |
| **Lookup activity** | None | Basic |

To learn about how to connect to HTTP data in data pipelines, go to [Set up your HTTP connection](connector-http.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for HTTP in data pipelines, go to [Configure HTTP in a copy activity](connector-http-copy-activity.md).
