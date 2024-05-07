---
title: Query multiple data sources in Fabric API for GraphQL
description: Learn about API for GraphQL support for multiple data sources, and see an example of a query that spans two sources.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: conceptual
ms.search.form: GraphQL multiple data sources
ms.date: 05/07/2024
---

# Query multiple data sources in Fabric API for GraphQL

> [!NOTE]
> Microsoft Fabric API for GraphQL is in preview.

In Fabric API for GraphQL, you can expose many data sources through a single API item. This feature allows you to issue a single query that retrieves data across multiple data sources.

## Query example

The following example shows a query that spans across both the **AdventureWorks** and the **testsqldb2** data sources:

:::image type="content" source="media/multiple-data-sources-graphql/multi-data-source-query.png" alt-text="Screenshot of the editor screen, showing an example of a query that spans two data sources." lightbox="media/multiple-data-sources-graphql/multi-data-source-query.png":::

This functionality can enhance the performance of your applications by reducing the number of round trips between your application and the API for GraphQL.

## Related content

- [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md)
