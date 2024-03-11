---
title: MongoDB Atlas connector overview
description: This article provides the overview of connecting to and using MongoDB Atlas data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# MongoDB Atlas connector overview

The MongoDB Atlas connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support for Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the MongoDB Atlas connector in Dataflow Gen2. Use the [MongoDB Atlas SQL](connector-mongodb-atlas-sql.md) connector instead.

## Support in data pipelines

The MongoDB Atlas connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Basic |

To learn more about the copy activity configuration for MongoDB Atlas in data pipelines, go to [Configure in a data pipeline copy activity](connector-mongodb-atlas-copy-activity.md).
