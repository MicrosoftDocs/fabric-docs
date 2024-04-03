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

# What is Microsoft Fabric GraphQL API?

> [!NOTE]
> Microsoft Fabric GraphQL API is in preview.

Microsoft Fabric GraphQL API is a data access layer that allows for quick and efficient querying of multiple data sources. The API allows you to abstract the specifics of those data sources so you can concentrate on your application's logic. By using a simple query language and easy to manipulate result sets, GraphQL minimizes the time it takes to access your data in Microsoft Fabric.

## Expose data through the GraphQL API

Exposing data sources to a GraphQL item in Microsoft Fabric is quick and easy. Pick the data source you would like to expose and then indicate which objects within that data source you want to present through the API. Optionally, define any relationships between the fields that you choose. After you complete these steps, your API endpoint is ready to accept queries.

## Supported data sources (preview)

Currently, these supported data sources can be exposed through the Fabric GraphQL API:

* Microsoft Fabric SQL Database
* Microsoft Fabric Data Warehouse
* Microsoft Fabric Lakehouse via SQL Analytics Endpoint
* Microsoft Fabric Mirrored Databases via SQL Analytics Endpoint

## Features

The Fabric GraphQL API includes:

* Automatic generation of queries and mutations.
* Support for stored procedures for SQL Database and Data Warehouse.
* Support for multiple data sources with corresponding fan-out queries.

## Related content

* [Create and add data to GraphQL API in Microsoft Fabric](get-started-graphql-api.md)
* [Connect applications to Fabric GraphQL API](connect-apps-graphql-api.md)
* [GraphQL query language](https://graphql.org/)
