---
title: Microsoft Fabric GraphQL API overview
description: Learn about the Microsoft Fabric GraphQL API, including supported data sources and how to expose them to a GraphQL item.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: overview
ms.search.form: GraphQL API Overview
ms.date: 04/05/2024
---

# What is Microsoft Fabric API for GraphQL?

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

Microsoft Fabric API for GraphQL is a data access layer that allows for quick and efficient querying of multiple data sources leveraging a widely adopted and familiar API technology. The API allows you to abstract the specifics of backend data sources so you can concentrate on your application's logic, providing all the data a client needs in a single call. By using a simple query language and easy to manipulate result sets, GraphQL minimizes the time it takes for applications to access your data in Microsoft Fabric.

## Expose data through the GraphQL API

Exposing data sources to a GraphQL item in Microsoft Fabric is quick and easy. Select the data source you would like to expose and then indicate which objects within that data source you want to present through the API. Optionally, define any relationships between the fields that you choose. After you complete these steps, your API endpoint is ready to accept queries.

## Supported data sources (preview)

Currently, the following supported data sources can be exposed through the Fabric API for GraphQL:

- Microsoft Fabric Data Warehouse
- Microsoft Fabric Lakehouse via SQL Analytics Endpoint
- Microsoft Fabric Mirrored Databases via SQL Analytics Endpoint

## Features

The Fabric API for GraphQL includes:

- Automatic generation of queries and mutations.
- Support for stored procedures for SQL Database and Data Warehouse.
- Support for multiple data sources with corresponding fan-out queries.

## Related content

- [Create and add data to GraphQL API in Microsoft Fabric](get-started-graphql-api.md)
- [Connect applications to Fabric GraphQL API](connect-apps-graphql-api.md)
- [GraphQL API frequently asked questions](graphql-api-faq.md)
- [GraphQL query language](https://graphql.org/learn)
