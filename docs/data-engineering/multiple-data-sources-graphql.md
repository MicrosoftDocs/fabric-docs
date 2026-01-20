---
title: Query multiple data sources in Fabric API for GraphQL
description: Learn about API for GraphQL support for multiple data sources, and see an example of a query that spans two sources.
ms.reviewer: sngun
ms.author: eur
author: eric-urban
ms.topic: article
ms.custom: freshness-kr
ms.search.form: GraphQL multiple data sources
ms.date: 01/21/2026
---

# Query multiple data sources in Fabric API for GraphQL

One of the key advantages of Fabric API for GraphQL is the ability to expose multiple data sources—such as lakehouses, warehouses, and databases—through a single unified API endpoint. This means your applications can retrieve data from different sources in a single GraphQL query, eliminating the need to connect to multiple APIs or databases separately.

For example, you might have customer data in one warehouse and inventory data in another lakehouse. Instead of making two separate API calls, you can query both sources simultaneously through your GraphQL API, reducing network overhead and simplifying your application code.

## How multi-source queries work

When you issue a GraphQL query that spans multiple data sources, the API automatically fans out individual requests to each data source in parallel, then combines the results into a single response. This approach:

- **Reduces round trips**: Your application makes one request instead of multiple sequential calls
- **Improves performance**: Parallel execution means faster overall response times
- **Simplifies client code**: You work with a single API interface regardless of where data is stored

> [!IMPORTANT]
> Multi-source queries have the following limitations:
> - You can't create relationships between types that span different data sources. Relationships only work within a single data source.
> - Individual requests to each data source execute in parallel with no guaranteed order.
> - Each request to a data source is independent—there's no transaction spanning multiple sources.

## Query example

**Business scenario**: Imagine you're building a dashboard that displays customer information and product inventory status side by side. Your customer data lives in a sales warehouse (**ContosoSales**), while your product inventory is managed in a separate lakehouse (**ContosoInventory**) that's updated by your supply chain systems. Without multi-source support, you'd need to make two separate API calls, manage two different connections, and combine the data yourself in your application code.

With Fabric API for GraphQL, you can retrieve data from both sources in a single query:

```graphql
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

This single request retrieves customer records from the **ContosoSales** data source and inventory items from the **ContosoInventory** data source in parallel, combining them into one response. Your dashboard gets all the data it needs with one API call instead of two.

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

The response structure mirrors the query structure. Inside the `data` object, you have two top-level fields (`customers` and `inventories`) corresponding to the two queries you made. Each field contains an `items` array with the actual results. The `customers` items have properties like `FirstName` and `LastName`, while the `inventories` items have properties like `Name`—exactly as requested in the query.

This is how the query view looks when you execute this request:

:::image type="content" source="media/multiple-data-sources-graphql/multi-data-source-query.png" alt-text="Screenshot of the editor screen showing a query spanning two data sources." lightbox="media/multiple-data-sources-graphql/multi-data-source-query.png":::

## Related content

- [What is Microsoft Fabric API for GraphQL?](api-graphql-overview.md)
- [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md)
- [Manage relationships in Fabric API for GraphQL](manage-relationships-graphql.md)
- [API for GraphQL editor](api-graphql-editor.md)
- [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md)
