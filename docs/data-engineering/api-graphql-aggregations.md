---
title: Aggregations in API for GraphQL
description: This article contains information about aggregations in API for GraphQL
author: eric-urban
ms.author: eur
ms.reviewer: edlima
ms.date: 05/16/2025
ms.topic: concept-article
ms.custom:
ms.search.form: Aggregations in API for GraphQL # This value shouldn't change. If so, contact engineering.
---

# Aggregations in API for GraphQL

GraphQL aggregation allows you to retrieve summarized data such as counts, totals, averages, etc. directly through the API, similar to SQL GROUP BY and aggregate functions. Instead of fetching all records and calculating summaries on the client, you can ask the server to group data by certain fields and compute aggregate values. This is useful for building reports or analytics – for example, getting the number of products per category or the average rating of posts per author – in a single query.

Aggregation queries return **grouped results**: each result represents a group of records sharing specific field values, along with computed aggregate metrics for that group. This documentation explains how to use a GraphQL aggregation feature with a fictional e-commerce schema, the types of data you can extract, example queries, and important restrictions and behaviors to be aware of.

## Example schema: E-commerce store

In this schema, a product belongs to a category. Each `Product` has fields like price and rating (the numeric values you might aggregate), and a relation to `Category` (by the category field). The `Category` has a name. We'll use this schema to demonstrate aggregation queries.

For example, the simplified GraphQL types might look like:

```graph
type Category {
  id: ID!
  name: String!
  products: [Product!]!  # one-to-many relationship
}

type Product {
  id: Int!
  name: String!
  price: Float!
  rating: Int!
  category_id: Int!
  category: Category!  # many-to-one relationship
}

type ProductResult { # automatically generated, adding groupBy capabilities
  items: [Product!]!
  endCursor: String
  hasNextPage: Boolean!
  groupBy(fields: [ProductScalarFields!]): [ProductGroupBy!]!
}

type Query {
products(
    first: Int
    after: String
    filter: ProductFilterInput
    orderBy: ProductOrderByInput
  ): ProductResult!
```

In this example, the `products` query can return either a normal list of items or, if `groupBy` is used, aggregated results. Let's focus on using the `groupBy` and aggregation features of this query.

## Why use aggregation queries?

By using aggregation queries in GraphQL, you can quickly answer questions about your data without manual processing. For instance, you might want to extract insights like:

- **Total counts**: e.g.,  _"How many products are in each category?"_
- **Sums and averages**: e.g.,  _"What is the total revenue per category?"_ or _"Average rating of products by category?"_
- **Min/max values**: e.g.,  _"What is the highest and lowest priced item in each category?"_
- **Distinct values**: e.g.,  _"How many unique cities do our customers come from?"_ or _"List the distinct tags used in all blog posts."_

Instead of retrieving all records and computing these insights in your application, an aggregation query lets the server do it. This reduces data transfer and uses database optimizations for grouping and calculations.

## Aggregation query basics

To perform an aggregation, you specify a `groupBy` argument in your GraphQL query to define how to group the data, and request aggregation fields (like counts or sums) in the result. The response contains a list of grouped records, each with the group’s key values and the aggregated metrics.

### Example 1: Count products per category 

Let’s group products by their category and count how many products are in each group. The query might look like:

```graph
query {
  products {
   groupBy(fields: [category_id]) 
   {
      fields {
         category_id # grouped key values
      }
      aggregations {
        count(field: id) # count of products in each group (count of "id")
     } 
   }
  }
}
```

In this query:

- `groupBy(fields: [category_id])` tells the Fabric GraphQL engine to group products by the `category_id` field.
- In the result selection, you request `group` and a `count` aggregate on the `id` field. Counting `id` effectively counts the products in that group.

**What the result looks like:** Each item in the response represents one category group. The `groupBy` object contains the grouping key. Here it includes the `category_id` value and `count { id }` gives the number of products in that category:

```json
{
  "data": {
    "products": {
      "groupBy": [
        {
          "fields": {
            "category_id": 1
          },
          "aggregations": {
            "count": 3
          }
        },
        {
          "fields": {
            "category_id": 2
          },
          "aggregations": {
            "count": 2
          }
        },
      ...
      ]
    }
  }
}
```

This output tells us category 1 has three products, category 2 has 2, and so on.

### Example 2: Sum and average 

We can request multiple aggregation metrics in one query. Suppose we want, for each category, the total price of all products and the average rating:

```graph
query {
  products {
   groupBy(fields: [category_id]) 
   {
      fields {
         category_id
      }
     aggregations {
        count(field: id)   # number of products in the category
        sum(field: price)  # sum of all product prices in the category
        avg(field: rating) # average rating of products in the category
     } 
   }
  }
}
```

This query would return the following results:

```json
{
  "data": {
    "products": {
      "groupBy": [
        {
          "fields": {
            "category_id": 1
          },
          "aggregations": {
            "count": 3,
            "sum": 2058.98,
            "avg": 4
          }
        },
        {
          "fields": {
            "category_id": 2
          },
          "aggregations": {
            "count": 2,
            "sum": 109.94,
            "avg": 4
          }
        },
        ...
      ]
    }
  }
}
```

Each group object includes the category and the computed aggregates such as the number of products, the sum of their prices, and the average ratings in that category.

### Example 3: Group by multiple fields

You can group by more than one field to get a multi-level grouping. For example, if your product has a `rating` field, you can group by both `category_id` and `rating` then calculate the average `price` for the group:

```graph
query {
  products {
   groupBy(fields: [category_id, rating])
   {
      fields {
         category_id
         rating
      }
     aggregations {
        avg(field: price)
     }
   }
  }
}
```

This would group products by the unique combination of category _and_ rating as shown below:

```json
 {
    "fields": {
        "category_id": 10,
        "rating": 4
    },
    "aggregations": {
        "avg": 6.99
    }
}
```

And so on for each category-rating pair in the data.

### Example 4: Using distinct

The aggregation feature supports a **distinct** modifier to count or consider unique values. For instance, to find out how many distinct categories exist in the products collection, you can use a distinct count:

```graph
query {
  products {
   groupBy(fields: [category_id]) 
   {
      fields {
         category_id
      }
     aggregations {
        count(field: id, distinct: true) 
     } 
   }
  }
}
```

This query returns a result with the number of unique products for each category. The result would look like:

```JSON
{
  "data": {
    "products": {
      "groupBy": [
        {
          "fields": {
            "category_id": 1
          },
          "aggregations": {
            "count": 3
          }
        },
        {
          "fields": {
            "category_id": 2
          },
          "aggregations": {
            "count": 2
          }
        },
        ...
      ]
    }
  }
}
```

### Example 5: Using aliases

You can create aliases for aggregations to provide meaningful and easy to understand names for aggregated results. For instance, you can name the aggregation in the previous example as `distinctProductCategoryCount` as it's counting distinct product categories to better understand the results:

```GraphQL
query {
  products {
   groupBy(fields: [category_id]) 
   {
      fields {
         category_id
      }
     aggregations {
        distinctProductCategoryCount: count(field: id, distinct: true) 
     } 
   }
  }
}
```

The result is similar but more meaningful with the custom alias:

```JSON
{
  "data": {
    "products": {
      "groupBy": [
        {
          "fields": {
            "category_id": 1
          },
          "aggregations": {
            "distinctProductCategoryCount": 3
          }
        },
        {
          "fields": {
            "category_id": 2
          },
          "aggregations": {
            "distinctProductCategoryCount": 2
          }
        },
        ...
      ]
    }
  }
}
```

### Example 6: Using the `having` clause

It's possible to filter the aggregated results with the `having` clause. For example, you can modify the previous example to only return results greater than two:

```GraphQL
query {
  products {
   groupBy(fields: [category_id]) 
   {
      fields {
         category_id
      }
     aggregations {
        distinctProductCategoryCount: count(field: id, distinct: true, having:  {
           gt: 2
        }) 
     } 
   }
  }
}
```

The result returns a single value with the only category with more than two products:

```JSON
{
  "data": {
    "products": {
      "groupBy": [
        {
          "fields": {
            "category_id": 1
          },
          "aggregations": {
            "distinctProductCategoryCount": 3
          }
        }
      ]
    }
  }
}
```

## Available aggregation functions

The exact functions available depend on the implementation, but common aggregation operations include:

- **count** – Count of records (or non-null values of a field) in the group.
- **sum** – Sum of all values in a numeric field.
- **avg** – Average (mean) of values in a numeric field.
- **min** – Minimum value in a field.
- **max** – Maximum value in a field.

In our GraphQL API, these are typically requested by specifying the function name and the target field, as shown in the examples `count(field: id)`, `sum(field: price)`, etc. Each function returns an object allowing you to select one or more fields it was applied to. For instance, `sum(field: price)` gives the sum of the price field for that group, and `count(field: id)` gives the count of id which is effectively the count of items.

> [!NOTE]
> Currently aggregation operations like `count`, `sum`, `avg`, `min`, and `max` work only on **numeric** or quantitative fields. For example, integers, floats. You can't use them on text or date fields. For example, you can’t take the "average" of a string. Support for performing aggregates on other types (like text for a future possible function such as concatenation or lexicographical min/max) is planned, but not available yet.

## Restrictions and best practices

When using aggregations in GraphQL, there are some important rules and limitations to consider. These ensure that your queries are valid and that the results are predictable, especially when paginating through results.

1. **Aggregation and raw items mutually exclusive:** Currently, you can't retrieve both grouped summary data and the raw list of items in the same query **simultaneously**. The `groupBy` aggregation query for a collection returns grouped data instead of the normal item list. For example, in our API, the `products(...)` query returns either a list of products when `groupBy` isn't used **or** a list of grouped results when `groupBy` is used, but not both at once. You may notice that in the aggregated examples above, the field `group` and aggregate fields appear, whereas the usual `items` list of products isn't present. If you attempt to request the normal items along with groups in one query, the GraphQL engine returns an error or doesn't allow that selection. If you need both the raw data and aggregated data, you'll have to run two separate queries or wait for a future update that might lift this limitation. This design is to keep the response structure unambiguous so, the query is either in "aggregation mode" or "list items mode".

2. **Sorting grouped results (`orderBy` vs. primary key):** When you get aggregated groups, the order in which groups are returned isn't guaranteed unless you specify an explicit sort order. It's **highly recommended to use an `orderBy` or `sort` argument** on aggregated queries to define how groups should be sorted in the results – especially if the grouping key isn't inherently unique or if there's no obvious default order. For example, if you group by `category` which is a name, should the results come back alphabetically by category name, or in order of highest count, or in insertion order? Without an `orderBy`, the grouping might be returned in an arbitrary order determined by the database. Moreover, if you plan to paginate through the grouped results using limit/offset or cursor pagination, a stable sort order is required for the pagination to work correctly. In many systems, if a primary key is part of the grouping making each group naturally identifiable by that key, the results might default to sorting by that. But if **no primary key is present in the groupBy fields**, you must specify an `orderBy` clause to get consistent ordering. 

3. **Distinct aggregation usage:** The **distinct** modifier should be used when you need to ignore duplicate values in an aggregation. For example, `count(field: category_id, distinct: true) ` counts unique categories. This is useful if you want to know _how many distinct X are in this group_. Distinct can also be applied to sum or average – for example, `sum (field: price, distinct: true)` would add up each unique price value only once per group. That case is less common, but it’s available for completeness. Use distinct aggregates in scenarios where duplicates skew the data. For instance, if a product could appear multiple times say, via joins, a distinct count ensures it’s only counted once. 

By keeping these restrictions and guidelines in mind, you can build effective GraphQL aggregation queries that yield powerful insights. The aggregation feature is useful for reporting and analytics use cases, but it does require careful structuring of queries. Always double-check that your `groupBy` fields align with your selected output fields, add sorting for predictable order especially when paginating, and use distinct and aggregate functions appropriately for the data types.

## Related content

- [Fabric API for GraphQL editor](api-graphql-editor.md)
- [More query and mutation examples](/azure/data-api-builder/graphql#supported-root-types)
- [Fabric API for GraphQL schema view and Schema explorer](graphql-schema-view.md)
