---
title: Azure Cosmos DB for MongoDB connector overview
description: This article provides the overview of connecting to and using Azure Cosmos DB for MongoDB data in Data Factory.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 12/04/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Cosmos DB for MongoDB connector overview

The Azure Cosmos DB for MongoDB connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-azure-cosmos-db-for-mongodb-copy-activity.md) (source/destination)      |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/destination) <br>- Full load<br>- Append <br>- Upsert|None<br> On-premises<br> Virtual network |Basic |

## Related content

To learn more about the copy activity configuration for Azure Cosmos DB for MongoDB in pipelines, go to [Configure Azure Cosmos DB for MongoDB in a copy activity](connector-azure-cosmos-db-for-mongodb-copy-activity.md).
