---
title: Multiple data source support in Fabric GraphQL API
description: Learn about GraphQL API support for multiple data sources, and see an example of a query that spans two sources.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: conceptual
ms.search.form: GraphQL multiple data sources
ms.date: 04/05/2024
---

# Multiple data source support in Fabric GraphQL API

> [!NOTE]
> Microsoft Fabric GraphQL API is in preview.

In GraphQL API, you are able to expose many data sources through a single API item. This feature allows you to issue a single query that will retrieve data across multiple data sources.

## Query example

The following example shows a query that spans across both the "AdventureWorks" and the "testsqldb2" data sources:

:::image type="content" source="media/multiple-data-sources/multi-data-source-query.png" alt-text="Screenshot of the editor screen, showing an example of a query that spans two data sources." lightbox="media/multiple-data-sources/multi-data-source-query.png":::

This functionality can enhance the performance of your applications by reducing the amount of round trips between your application and the GraphQL API.

## Related content

- [Create and add data to GraphQL API in Microsoft Fabric](get-started-graphql-api.md)
