---
title: What is Microsoft Fabric API for GraphQL?  
description: Discover how the Microsoft Fabric API for GraphQL simplifies querying multiple data sources using a familiar API technology, enabling faster application development.
ms.reviewer: sngun
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom: freshness-kr
ms.search.form: GraphQL API Overview
ms.date: 01/21/2026
#customer intent: As a developer, I want to understand the Microsoft Fabric API for GraphQL so that I can efficiently query multiple data sources using a familiar API technology.
---

# What is Microsoft Fabric API for GraphQL?

[GraphQL](https://graphql.org) is an open-source query language and runtime for APIs maintained by the GraphQL Foundation. Unlike traditional REST APIs, GraphQL enables clients to request exactly the data they need in a single query, reducing over-fetching and under-fetching of data.

Microsoft Fabric API for GraphQL brings this powerful standard to the Fabric ecosystem as a data access layer that lets you query multiple data sources quickly and efficiently. The API abstracts the specifics of backend data sources so you focus on your application's logic and provide all the data a client needs in a single call. With its simple query language and efficient result set manipulation, GraphQL minimizes the time applications take to access your data in Fabric.

## Why use GraphQL for Fabric data

Without GraphQL, exposing Fabric data to applications typically requires one of these approaches:

**Direct database connections**
- Applications connect directly to lakehouses or warehouses using SQL drivers (ODBC, JDBC)
- Tightly couples application code to database schemas—schema changes break applications
- Requires managing connection strings, credentials, and driver dependencies in every application
- SQL queries embedded in application code are difficult to test and maintain

**Custom REST APIs**
- Build and maintain custom backend services with frameworks like ASP.NET or Node.js
- Write controller code, routing logic, and data access layers for every endpoint
- Create separate API versions (v1, v2, v3) when data structures change
- Over-fetch data (get entire rows when you need few columns) or under-fetch (make multiple round trips for related data)

**GraphQL solves these challenges:**
- **No backend code required**: Fabric automatically generates the GraphQL schema, resolvers, and endpoint from your data sources
- **Query exactly what you need**: Request specific fields in a single query, eliminating over-fetching and reducing payload sizes
- **Fetch related data in one request**: Traverse relationships without multiple round trips (no N+1 query problem)
- **Schema evolution without breaking changes**: Add new fields without affecting existing queries—clients only request what they know about
- **Type safety and documentation**: Self-documenting schema with built-in introspection that development tools understand
- **Unified access to multiple sources**: Query across lakehouses, warehouses, and SQL databases through a single endpoint

For application developers, GraphQL means faster development with less infrastructure. For data engineers, it means exposing data without writing and maintaining custom API code.

## Who should use API for GraphQL

Fabric's API for GraphQL is designed for:
- **Application developers** building data-driven web and mobile applications that consume Fabric lakehouse and warehouse data
- **Data engineers** exposing Fabric data to downstream applications through modern, flexible APIs without writing custom backend code
- **Integration developers** connecting Fabric data to custom applications and automated workflows
- **BI developers** creating custom analytics applications that complement Power BI with Fabric data
- **Data scientists** exposing Fabric data and machine learning insights through programmatic APIs

If you're working within the Microsoft Fabric unified analytics platform and need to make lakehouse, warehouse, or SQL database data accessible to applications, the GraphQL API provides an efficient, developer-friendly way to query exactly the data you need.

> [!TIP]
> Want to integrate Fabric GraphQL APIs with AI agents? Try the [Build a local GraphQL MCP server for AI agents](api-graphql-local-model-context-protocol.md) tutorial to connect AI agents to your Fabric data using the Model Context Protocol.

## Expose data through the API for GraphQL

Exposing data sources to a GraphQL item in Microsoft Fabric is straightforward and can be accomplished in minutes using the Fabric portal's visual interface. The process involves:

1. **Create a GraphQL API item** in your Fabric workspace
1. **Connect your data sources** by selecting from available lakehouses, warehouses, or databases
1. **Choose which objects to expose** such as tables, views, or stored procedures
1. **Define relationships** (optional) between objects to enable powerful nested queries
1. **Configure permissions** to control who can access your API

Once configured, Fabric automatically generates the GraphQL schema, creates the necessary resolvers, and provides you with an endpoint URL. Your API is immediately ready to accept queries—no deployment or infrastructure setup required.

For step-by-step instructions, see [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md).

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

Microsoft Fabric API for GraphQL provides comprehensive capabilities that streamline data access for applications. From automatic code generation to performance monitoring, these features enable you to build robust data APIs with minimal configuration.

### Automatic schema generation
- **Schema discovery**: Automatically discovers and maps data source schemas to GraphQL types
- **Query and mutation generation**: Creates GraphQL queries and mutations based on your data structure
- **Resolver generation**: Automatically generates the resolvers needed to fetch data from your sources
- **Local testing code**: Generates sample code for immediate testing and development

### Data source flexibility
- **Multiple data sources**: Connect and query across multiple data sources with fan-out query support
- **Database objects**: Full support for tables, views, and stored procedures in SQL databases and warehouses
- **Selective exposure**: Choose specific objects and columns to expose through the API
- **Relationship modeling**: Create one-to-one, one-to-many, and many-to-many relationships between data entities

### Operations and monitoring
- **Performance monitoring**: Built-in dashboard and request logging to track API behavior and usage

### Schema evolution without versioning

GraphQL takes a unique approach to API evolution by avoiding traditional versioning. Instead of creating v1, v2, and v3 endpoints, GraphQL APIs evolve continuously:

- **Additive changes**: You can add new types, fields, and capabilities without breaking existing queries. Clients only request the fields they need, so new fields don't affect them.
- **Backward compatibility**: Existing queries continue to work even as the schema grows, because GraphQL only returns explicitly requested data.
- **Deprecation over removal**: Fields can be marked as deprecated rather than immediately removed, giving clients time to adapt.
- **Single endpoint**: Applications always connect to the same endpoint, regardless of schema changes.

This approach simplifies API maintenance and client upgrades compared to traditional versioned APIs. When you modify your GraphQL API schema in Fabric, existing applications continue to function as long as you add new capabilities rather than removing or renaming existing fields. For more information about managing schema changes, see [Fabric API for GraphQL introspection and schema export](api-graphql-introspection-schema-export.md).

## Interactive editing experience

The API for GraphQL includes an editor that lets you develop and test your queries and mutations easily. The editor's capabilities include:

- A results pane to visualize the output of queries and mutations
- Support for query and mutation parameters
- Intellisense that supports GraphQL syntax and schema object names

For more information about using the GraphQL editor, see [API for GraphQL editor](api-graphql-editor.md).

## Limitations

Refer to [API for GraphQL limitations](api-graphql-limits.md) for more information.

## Related content

- [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md)
- [API for GraphQL editor](api-graphql-editor.md)
- [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md)
- [Fabric GraphQL frequently asked questions](graphql-faq.yml)
- [GraphQL query language](https://graphql.org/learn)
