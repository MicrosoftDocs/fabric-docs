---
title: Cosmos DB Database Preview
titleSuffix: Microsoft Fabric
description: Learn about Cosmos DB in Microsoft Fabric, an integrated NoSQL developer-friendly database.
author: seesharprun
ms.author: sidandrews
ms.topic: overview
ms.date: 07/17/2025
ms.search.form: Databases Overview,Cosmos DB Overview
appliesto:
- ✅ Cosmos DB in Fabric
---

# What is Cosmos DB in Microsoft Fabric (preview)?

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric is an AI-optimized NoSQL database with a simplified management experience. As a developer, you can use Cosmos DB in Fabric to build AI applications with less friction and without having to take on typical database management tasks. Cosmos DB in Microsoft Fabric uses the same engine, same infrastructure as [Azure Cosmos DB for NoSQL](/azure/cosmos-db/nosql), but is tightly integrated into Fabric. Cosmos DB provides a schemaless data model ideal for semi-structured data, limitless and automatic scaling, and low latency and performance guarantees; with built-in high availability.

To learn more about Cosmos DB in Fabric, watch this demo from Microsoft Build 2025 walking through building a chat-enabled storefront, storing NoSQL data, generating recommendations, and applying AI insights—all in one unified platform.
  
> [!VIDEO https://www.youtube.com/embed/_OywQvAr7xE]

## Why Cosmos DB in Fabric?

- **Optimized for semi-structured data**: Cosmos DB in Fabric is a database workload optimized for semi-structured data. You can use Cosmos DB database and SQL database in Fabric together to store both semi-structured and relational data. With various databases available, you can unify your data platform and analytics experience across your entire application solution. Cosmos DB comes with built-in AI capabilities like full-text search, hybrid search, and vector indexing.

- **Autonomous**: Cosmos DB in Fabric comes with autonomous defaults optimized for most application workloads. Existing applications can connect to Cosmos DB by specifying the Fabric-supplied connection string and using Microsoft Entra authentication. Your host applications can use various identity types, like human identities, application identities, or workload identities, to connect to the database in a secure manner.

- **Integrated**: Data in Cosmos DB is automatically made available in Fabric OneLake in the Delta Parquet format. Since the data is surfaced in OneLake, the platform allows you to use Cosmos DB in various integrated scenarios including, but not limited to:

  - Obtaining near-realtime insights into Cosmos DB data using data science tools like notebooks and Lakehouse, visualizing in Power BI
  
  - Querying data across Cosmos DB and other Fabric-native databases in a single unified query

  - Serving high-value OneLake data back to the app with low latency and high concurrency/reliability, eliminating the need for reverse ETL
  
  - Generating vector embeddings from chunked data in Fabric One Lake
  
  - Migrating data between databases using jobs, flows, and pipelines
  
  - Performing operations like reverse Extract, Transform, and Load (ETL)
  
  - Building an API over nonrelational data using functions  
   
  - Creating a common query layer using GraphQL

## Next step

> [!div class="nextstepaction"]
> [Quickstart: Create a Cosmos DB database workload in Microsoft Fabric](quickstart-portal.md)
