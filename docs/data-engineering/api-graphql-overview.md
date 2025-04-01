---
title: Microsoft Fabric API for GraphQL overview
description: Learn about the Microsoft Fabric API for GraphQL, including supported data sources and how to expose them to a GraphQL item.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: overview
ms.custom:
ms.search.form: GraphQL API Overview
ms.date: 05/21/2024
---

# What is Microsoft Fabric API for GraphQL?

Microsoft Fabric API for GraphQL is a data access layer that enables quick and efficient querying of multiple data sources with a widely adopted and familiar API technology. The API allows you to abstract the specifics of backend data sources so you can concentrate on your application's logic, and provide all the data a client needs in a single call. GraphQL uses a simple query language and easily manipulated result sets, which minimizes the time it takes for applications to access your data in Fabric.

## Expose data through the API for GraphQL

Exposing data sources to a GraphQL item in Microsoft Fabric is quick and easy. Select the data source you would like to expose and then indicate which objects within that data source you want to present through the API. Optionally, define any relationships between the fields that you choose. After you complete these steps, your API endpoint is ready to accept queries.

## Supported data sources

Currently, the following supported data sources can be exposed through the Fabric API for GraphQL:

- Microsoft Fabric Data Warehouse
- Microsoft Fabric SQL database
- Microsoft Fabric Lakehouse via SQL Analytics Endpoint
- Microsoft Fabric Mirrored Databases via SQL Analytics Endpoint, including:
    - Mirrored databases from Azure SQL Database
    - Mirrored databases from Azure SQL Managed Instance
    - Mirrored databases from Azure Cosmos DB
    - Mirrored databases from Microsoft Fabric SQL Database
    - Mirrored databases from Azure Databricks
    - Mirrored databases from Snowflake
    - Open mirrored databases
- Azure SQL database
- Datamart

## Features

The Fabric API for GraphQL includes:

- Automatic data source schema discovery.
- Automatic generation of queries and mutations.
- Automatic generation of resolvers.
- Automatic generation of local testing code.
- Support for views for SQL databases and data warehouses.
- Support for stored procedures for SQL databases and data warehouses.
- Support for multiple data sources with corresponding fan-out queries.
- Ability to create one-to-one, one-to-many, and many-to-many relationships.
- Ability to select individual objects to be exposed from a data source.
- Ability to expose specific columns from data source tables.
- Ability to monitor API behavior with a dashboard and request logging.

## Interactive editing experience

API for GraphQL includes an editor where you can easily develop and test your queries or mutations. Some of the capabilities of the editor include:

- A results pane to visualize the output of queries or mutations
- Support for query or mutation parameters
- Intellisense with support for GraphQL syntax and schema object names
 
## Limitations

Please refer to [ API for GraphQL Limitations](api-graphql-limits.md) for more information.

## Related content

- [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md)
- [API for GraphQL editor](api-graphql-editor.md)
- [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md)
- [Fabric GraphQL frequently asked questions](graphql-faq.yml)
- [GraphQL query language](https://graphql.org/learn)
