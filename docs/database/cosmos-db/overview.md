---
title: Cosmos DB Database Preview
titleSuffix: Microsoft Fabric
description: Learn about Cosmos DB in Microsoft Fabric, an integrated NoSQL developer-friendly database.
author: seesharprun
ms.author: sidandrews
ms.topic: overview
ms.date: 06/06/2025
---

# What is Cosmos DB in Microsoft Fabric (preview)?

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric is an AI-optimized NoSQL database automatically configured for typical development needs with a simplified management experience. As a developer, you can use Cosmos DB in Fabric to build AI applications with less friction and without having to take on typical database management tasks. Cosmos DB in Microsoft Fabric is build on the same engine as [Azure Cosmos DB for NoSQL](/azure/cosmos-db/nosql). This shared engine provides dynamic scaling, high availability, and built-in reliability for your database.

## Use as a NoSQL database

Cosmos DB in Fabric is a **database** workload. You can use a combination of database workloads to store both semi-structured and relational databases in Fabric. With various databases available, you can unify your data platform and analytics experience across your entire application solution. Cosmos DB is also already configured with AI capabilities like full-text search, hybrid search, and vector indexing.

Cosmos DB in Fabric is preconfigured with defaults that are appropriate for most application workloads. Existing applications can connect to Cosmos DB in a manner similar to Azure Cosmos DB for NoSQL. Existing applications can use Cosmos DB by specifying the Fabric-supplied database endpoint and using Microsoft Entra authentication. Your host applications can use various identity types, like human identities, application identities, or workload identities, to connect to the database in a secure manner. Other Azure services, like Azure Functions, can use managed identities to connect in the same way.

## Integrate with Fabric

Data in Cosmos DB is automatically made available in Fabric OneLake in the Delta Parquet format. Since the data is surfaced in OneLake, the platform allows you to use Cosmos DB in various integrated scenarios including, but not limited to:

- Migrating data between databases using jobs, flows, and pipelines

- Searching Cosmos DB together with other Fabric-native databases in a single unified query

- Integrating with data science tools like notebooks and Lakehouse

- Performing operations like reverse Extract, Transform, and Load (ETL)

- Generating vector embeddings from chunked data in Fabric note

- Providing context to NoSQL data using functions or Apache Spark

- Creating a common query layer using GraphQL

## Start with Cosmos DB

Cosmos DB in Fabric is available to participants in a limited preview. To participate, [submit an application](https://aka.ms/FabricCosmosDBPreview).

## Next step

> [!div class="nextstepaction"]
> [Quickstart: Create a Cosmos DB database workload in Microsoft Fabric](quickstart-portal.md)
