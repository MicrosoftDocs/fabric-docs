---
title: Azure Cosmos DB for NoSQL connector overview
description: This article provides an overview of the Azure Cosmos DB for NoSQL connector in Microsoft Fabric.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 10/26/2023
ms.custom: template-how-to, build-2023
---

# Azure Cosmos DB for NoSQL connector overview

The Azure Cosmos DB for NoSQL connector is supported in Data Factory in Microsoft Fabric with the following capabilities.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support Amazon S3 in Dataflow Gen2.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support Azure Cosmos DB for NoSQL in Dataflow Gen2.

## Support in data pipelines

The Azure Cosmos DB for NoSQL connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Key |
| **Lookup activity** | None | Key |

To learn about how to connect to Azure Cosmos DB for NoSQL in data pipelines, go to [Set up your Azure Cosmos DB for NoSQL connection](connector-azure-cosmosdb-for-nosql.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Azure Cosmos DB for NoSQL in data pipelines, go to [Configure in a data pipeline copy activity](connector-azure-cosmosdb-for-nosql-copy-activity.md).
