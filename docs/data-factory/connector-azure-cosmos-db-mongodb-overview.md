---
title: Azure Cosmos DB for MongoDB connector overview
description: This article provides the overview of connecting to and using Azure Cosmos DB for MongoDB data in Data Factory.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/07/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure Cosmos DB for MongoDB connector overview

The Azure Cosmos DB for MongoDB connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support for Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the Azure Cosmos DB for MongoDB connector in Dataflow Gen2.

## Support in data pipelines

The Azure Cosmos DB for MongoDB connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br>On-premises | Basic |

To learn more about the copy activity configuration for Azure Cosmos DB for MongoDB in data pipelines, go to [Configure in a data pipeline copy activity](connector-azure-cosmos-db-mongodb-copy-activity.md).
