---
title: What is Microsoft Fabric API for GraphQL?  
description: Discover how the Microsoft Fabric API for GraphQL simplifies querying multiple data sources using a familiar API technology, enabling faster application development.
ms.reviewer: sngun
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom: null
ms.search.form: GraphQL API Overview
ms.date: 08/20/2025
#customer intent: As a developer, I want to understand the Microsoft Fabric API for GraphQL so that I can efficiently query multiple data sources using a familiar API technology.
---

# What is Microsoft Fabric API for GraphQL?

Microsoft Fabric API for GraphQL is a data access layer that lets you query multiple data sources quickly and efficiently using a widely adopted and familiar API technology. The API abstracts the specifics of backend data sources so you focus on your application's logic and provide all the data a client needs in a single call. GraphQL uses a simple query language and easily manipulates result sets, minimizing the time applications take to access your data in Fabric.

## Expose data through the API for GraphQL

Exposing data sources to a GraphQL item in Microsoft Fabric is simple. Select the data source you want to expose, and indicate which objects within that data source you want to present through the API. Optionally, define relationships between the fields you choose. After completing these steps, your API endpoint is ready to accept queries.

## Supported data sources

Currently the following supported data sources are exposed through the Fabric API for GraphQL:

- Microsoft Fabric Data Warehouse
- Microsoft Fabric SQL database
- Microsoft Fabric Lakehouse via SQL Analytics Endpoint
- Microsoft Fabric Mirrored Databases via SQL Analytics Endpoint, including:
  - Azure SQL Database
  - Azure SQL Managed Instance
  - Azure Cosmos DB
  - Microsoft Fabric SQL Database
  - Azure Databricks
  - Snowflake
  - Open mirrored databases
- Azure SQL database
- Datamart

## Features

The Fabric API for GraphQL includes:

- Automatic discovery of data source schemas.
- Automatic generation of queries and mutations.
- Automatic generation of resolvers.
- Automatic generation of local testing code.
- Support for views in SQL databases and data warehouses.
- Support for stored procedures in SQL databases and data warehouses.
- Support for multiple data sources with corresponding fan-out queries.
- Tools to create one-to-one, one-to-many, and many-to-many relationships.
- Options to select individual objects to expose from a data source.
- Options to expose specific columns from data source tables.
- Tools to monitor API behavior with a dashboard and request logging.

## Interactive editing experience

The API for GraphQL includes an editor that lets you develop and test your queries and mutations easily. The editor's capabilities include:

- A results pane to visualize the output of queries and mutations
- Support for query and mutation parameters
- Intellisense that supports GraphQL syntax and schema object names

## Limitations

Refer to [API for GraphQL limitations](api-graphql-limits.md) for more information.

## Related content

- [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md)
- [API for GraphQL editor](api-graphql-editor.md)
- [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md)
- [Fabric GraphQL frequently asked questions](graphql-faq.yml)
- [GraphQL query language](https://graphql.org/learn)
