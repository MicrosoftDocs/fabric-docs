---
title: Azure Cosmos DB for NoSQL connector overview
description: This article provides an overview of the Azure Cosmos DB for NoSQL connector in Microsoft Fabric.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 12/04/2025
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
| **Pipeline** <br>- [Copy activity](connector-azure-cosmosdb-for-nosql-copy-activity.md) (source/destination)<br>- Lookup activity        | None<br> On-premises<br> Virtual network | Account key<br> Organizational account<br> Workspace identity|
| **Copy job** (source/destination) <br>- Full load<br>- Append <br>- Upsert|None<br> On-premises<br> Virtual network |Account key<br> Organizational account<br> Workspace identity|

## Related content

To learn about how to connect to Azure Cosmos DB for NoSQL in pipelines, go to [Set up your Azure Cosmos DB for NoSQL connection](connector-azure-cosmosdb-for-nosql.md).

To learn about the copy activity configuration for Azure Cosmos DB for NoSQL in pipelines, go to [Configure Azure Cosmos DB for NoSQL in a copy activity](connector-azure-cosmosdb-for-nosql-copy-activity.md).
