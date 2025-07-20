---
title: Azure Cosmos DB for NoSQL connector overview
description: This article provides an overview of the Azure Cosmos DB for NoSQL connector in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Cosmos DB for NoSQL connector overview

The Azure Cosmos DB for NoSQL connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/-)                                                           | None<br> On-premises<br> Virtual network | Account key<br> Organizational account |
| **Data pipeline** <br>- [Copy activity](connector-azure-cosmosdb-for-nosql-copy-activity.md) (source/destination)<br>- Lookup activity        | None<br> On-premises<br> Virtual network | Account key<br> Organizational account|

## Related content

To learn about how to connect to Azure Cosmos DB for NoSQL in data pipelines, go to [Set up your Azure Cosmos DB for NoSQL connection](connector-azure-cosmosdb-for-nosql.md).

To learn about the copy activity configuration for Azure Cosmos DB for NoSQL in data pipelines, go to [Configure Azure Cosmos DB for NoSQL in a copy activity](connector-azure-cosmosdb-for-nosql-copy-activity.md).
