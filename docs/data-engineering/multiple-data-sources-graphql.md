---
title: Query multiple data sources in Fabric API for GraphQL
description: Learn about API for GraphQL support for multiple data sources, and see an example of a query that spans two sources.
ms.reviewer: sngun
ms.author: eur
author: eric-urban
ms.topic: conceptual
ms.custom:
ms.search.form: GraphQL multiple data sources
ms.date: 08/21/2025
---

# Query multiple data sources in Fabric API for GraphQL

In Fabric API for GraphQL, you can expose many data sources through a single API item. This feature allows you to issue a single query that retrieves data across multiple data sources.

A multi-data source query is a sequence of queries that perform operations against different data sources.

This functionality enhances application performance by reducing the number of round trips between your application and the API for GraphQL.

> [!NOTE]
> A multi-data source request fans out individual requests to data sources. You can't create relationships across types that span multiple data sources. Additionally, there isn't a guarantee on the order the individual requests execute.

## Query example

The following example shows a query that spans both the **ContosoSales** and **ContosoInventory** data sources:

```json
query {
  customers (first: 1) {
    items {
      FirstName
      LastName
    }
  }
  inventories (first: 1) {
    items {
      Name
    }
  }
}
```

This request retrieves the first node from the **customers** query derived from the **ContosoSales** data source, and the first node from the **inventories** query derived from the **ContosoInventory** data source.

The output for the request is:

```json
{
  "data": {
    "customers": {
      "items": [
        {
          "FirstName": "Orlando",
          "LastName": "Gee"
        }
      ]
    },
    "inventories": {
      "items": [
        {
          "Name": "AWC Logo Cap"
        }
      ]
    }
  }
}
```

The output has two parts: The first section, "data", contains the output of the **customers** query, and the second section, "inventories", contains the output of the **inventories** query.

This is how the query view looks when you execute this request:

:::image type="content" source="media/multiple-data-sources-graphql/multi-data-source-query.png" alt-text="Screenshot of the editor screen showing a query spanning two data sources." lightbox="media/multiple-data-sources-graphql/multi-data-source-query.png":::

## Related content

- [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md)
