---
title: MongoDB connector overview
description: This article provides the overview of connecting to and using MongoDB data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# MongoDB connector overview

The MongoDB connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support for Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the MongoDB connector in Dataflow Gen2.

## Support in data pipelines

The MongoDB connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Basic |

To learn more about the copy activity configuration for MongoDB in data pipelines, go to [Configure in a data pipeline copy activity](connector-mongodb-copy-activity.md).
