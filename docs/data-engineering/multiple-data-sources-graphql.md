---
title: Query multiple data sources in Fabric API for GraphQL
description: Learn about API for GraphQL support for multiple data sources, and see an example of a query that spans two sources.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: conceptual
ms.custom:
ms.search.form: GraphQL multiple data sources
ms.date: 05/21/2024
---

# Query multiple data sources in Fabric API for GraphQL

In Fabric API for GraphQL, you can expose many data sources through a single API item. This feature allows you to issue a single query that retrieves data across multiple data sources.

A multi-data source query is a sequence of queries that use perform operations against different data sources.

This functionality can enhance the performance of your applications by reducing the number of round trips between your application and the API for GraphQL.

> [!NOTE]
> A multi-data source request fans out individual requests to data sources. You cannot create relationships across types that span multiple data sources. Additionally, there are no guarantees on the order the individual requests will execute.

## Query example

The following example shows a query that spans across both the **ContosoSales** and the **ContosoInventory** data sources:

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

This request retrieves the first node from the **customers** query, which is derived from the **ContosoSales** data source, and the first node from the **inventories** query, which is derived from the **ContosoInventory** data source.

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
There are two parts to the output: The first section, "data" contains the output of the **customers** query. The second section, "inventories", contains the output of the **inventories** query.

This is how the query view looks like when executing this request:

:::image type="content" source="media/multiple-data-sources-graphql/multi-data-source-query.png" alt-text="Screenshot of the editor screen, showing an example of a query that spans two data sources." lightbox="media/multiple-data-sources-graphql/multi-data-source-query.png":::


## Related content

- [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md)
