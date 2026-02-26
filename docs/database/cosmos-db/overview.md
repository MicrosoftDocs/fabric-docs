---
title: Cosmos DB Database
description: Learn about Cosmos DB in Microsoft Fabric, an integrated NoSQL developer-friendly database.
ms.reviewer: mjbrown
ms.topic: overview
ms.date: 10/30/2025
ms.search.form: Databases Overview,Cosmos DB Overview
---

# What is Cosmos DB in Microsoft Fabric?

Cosmos DB in Microsoft Fabric is an AI-optimized NoSQL database with a simplified management experience. As a developer, you can use Cosmos DB in Fabric to build AI applications with less friction and without having to take on typical database management tasks. As an analytics user, Cosmos DB can be used as a low-latency serving layer, making reports faster and able to serve thousands of users simultaneously.

Cosmos DB in Microsoft Fabric uses the same engine, same infrastructure as [Azure Cosmos DB for NoSQL](/azure/cosmos-db/nosql), but is tightly integrated into Fabric. Cosmos DB provides a schemaless data model ideal for semi-structured data or evolving data models; offering limitless, automatic, and instantaneous scaling, with low latency and built-in high availability.

To learn more about Cosmos DB in Fabric, watch this demo from Microsoft Build 2025 walking through building a chat-enabled storefront, storing NoSQL data, generating recommendations, and applying AI insights—all in one unified platform.
  
> [!VIDEO https://www.youtube.com/embed/_OywQvAr7xE]

## Why Cosmos DB in Fabric?

- **Optimized for semi-structured data**: Cosmos DB in Fabric is a database optimized for semi-structured data. You can use Cosmos DB database and SQL database in Fabric together to store both semi-structured and relational data. With various databases available, you can unify your data platform and analytics experience across your entire application solution. Cosmos DB comes with built-in AI capabilities like vector search, full-text search and hybrid search combining both with Reciprocal Rank Fusion (RRF).

- **Autonomous**: Cosmos DB in Fabric comes with autonomous defaults optimized for most application workloads. Existing applications can easily connect to Cosmos DB in Fabric. Your applications can use the same Entra ID you use today and supports all identity types, like human identities, application identities, or workload identities, to connect to the database in a secure manner.

- **Integrated**: Data in Cosmos DB is automatically made available in Fabric OneLake in the Delta Parquet format. Since the data is surfaced in OneLake, the platform allows you to use Cosmos DB in various integrated scenarios including, but not limited to:

  - Obtaining near-realtime insights into Cosmos DB data using data science tools like notebooks and Lakehouse, visualizing in Power BI
  
  - Querying data across Cosmos DB and other Fabric-native databases in a single unified query

  - Serving high-value OneLake data back to your app with low latency and high concurrency/reliability with reverse Extract, Transform, and Load (ETL)
  
  - Generating vector embeddings from chunked data in Fabric One Lake
  
  - Migrating data between databases using jobs, flows, and pipelines

  - Building an API over nonrelational data using user data functions  

  - Creating a common query layer using GraphQL

## Next step

> [!div class="nextstepaction"]
> [Quickstart: Create a Cosmos DB database workload in Microsoft Fabric](quickstart-portal.md)

