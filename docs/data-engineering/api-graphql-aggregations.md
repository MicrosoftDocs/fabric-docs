---
title: Aggregations in API for GraphQL
description: This article contains information about aggregations in API for GraphQL
author: KoldBrewEd 
ms.author: edlima
ms.reviewer: snehagunda
ms.date: 05/16/2025
ms.topic: conceptual
ms.custom:
ms.search.form: Aggregations in API for GraphQL # This article's title shouldn't change. If so, contact engineering.
---

# Aggregations in API for GraphQL

## Overview

GraphQL aggregation allows you to retrieve summarized data (counts, totals, averages, etc.) directly through the API, similar to SQL GROUP BY and aggregate functions. Instead of fetching all records and calculating summaries on the client, you can ask the server to group data by certain fields and compute aggregate values. This is useful for building reports or analytics – for example, getting the number of products per category or the average rating of posts per author – in a single query.

Aggregation queries return **grouped results**: each result represents a group of records sharing specific field values, along with computed aggregate metrics for that group. This documentation will explain how to use a GraphQL aggregation feature with a fictional e-commerce schema, the types of data you can extract, example queries, and important restrictions and behaviors to be aware of.

## Example Schema: E-Commerce Store

In this schema, a Product belongs to a Category. Each `Product` has fields like price and rating (numeric values we might aggregate), and a relation to `Category` (by the category field). The `Category` has a name. We will use this schema to demonstrate aggregation queries.

For example, the GraphQL types (simplified) might look like:

```GraphQL
type Category {
  id: ID!
  name: String!
  products: [Product!]!  # one-to-many relationship
}

type Product {
  id: ID!
  name: String!
  price: Float!
  rating: Int!
  category: Category!    # many-to-one relationship
}

# Query entry point for products (supports aggregation)
type Query {
  products( 
    groupBy: [String],          # fields to group by (optional)
    distinct: String,           # a field for distinct value extraction (optional)
    orderBy: String,            # field or aggregate to sort by (optional)
    ...otherArgs
  ): ProductsResult
}
```

In this example, the `products` query can return either a normal list of items or, if `groupBy` is used, aggregated results. We will focus on using the `groupBy` and aggregation features of this query.

## Why Use Aggregation Queries?

By using aggregation in GraphQL, you can quickly answer questions about your data without manual processing. For instance, you might want to extract insights like:

- **Total counts**: e.g. _“How many products are in each category?”_
- **Sums and averages**: e.g. _“What is the total revenue per category?”_ or _“Average rating of products by category?”_
- **Min/max values**: e.g. _“What is the highest and lowest priced item in each category?”_
- **Distinct values**: e.g. _“How many unique cities do our customers come from?”_ or _“List the distinct tags used in all blog posts.”_

Instead of retrieving all records and computing these insights in your application, an aggregation query lets the server do it. This reduces data transfer and leverages database optimizations for grouping and calculations.

## Aggregation Query Basics

To perform an aggregation, you typically specify a `groupBy` argument in your GraphQL query to define how to group the data, and request aggregation fields (like counts or sums) in the result. The response will contain a list of grouped records, each with the group’s key values and the aggregated metrics.

### Example 1: Count Products per Category 
Let’s group products by their category and count how many products are in each group. The query might look like:

```GraphQL
query {
  products(groupBy: ["category"]) {
    group        # grouped key values
    count { id } # count of products in each group (count of "id")
  }
}
```

In this query:

- `groupBy: \["category"\]` tells the server to group products by the `category` field.
- In the result selection, we request `group` and a `count` aggregate on the `id` field. (Counting `id` effectively counts the products in that group.)

**What the result looks like:** Each item in the response will represent one category group. The `group` object contains the grouping key (here it will include the `category` value, such as the category name or ID), and `count { id }` gives the number of products in that category. For example:

```json
{
  "data": {
    "products": [
      {
        "group": { "category": "Electronics" },
        "count": { "id": 42 }
      },
      {
        "group": { "category": "Clothing" },
        "count": { "id": 19 }
      },
      // ... one object per distinct category
    ]
  }
}
```

This tells us “Electronics” has 42 products, “Clothing” has 19, and so on.

### Example 2: Sum and Average 
We can request multiple aggregation metrics in one query. Suppose we want, for each category, the total price of all products and the average rating:

```GraphQL
query {
  products(groupBy: ["category"]) {
    group
    count { id }       # number of products in the category
    sum { price }      # total of all product prices in the category
    avg { rating }     # average rating of products in the category
  }
}
```

This would return results like:

```json
{
  "data": {
    "products": [
      {
        "group": { "category": "Electronics" },
        "count": { "id": 42 },
        "sum": { "price": 128900.5 },
        "avg": { "rating": 4.5 }
      },
      { 
        "group": { "category": "Clothing" },
        "count": { "id": 19 },
        "sum": { "price": 7560.0 },
        "avg": { "rating": 4.2 }
      },
      ...
    ]
  }
}
```

Each group object includes the category and the computed aggregates: how many products, the sum of their prices, and the average of their ratings in that category.

### Example 3: Group by Multiple Fields
You can group by more than one field to get a multi-level grouping. For example, if our Product had a `brand` field, we could group by both `category` and `brand`:

```GraphQL
query {
  products(groupBy: ["category", "brand"]) {
    group
    count { id }
    avg { price }
  }
}
```

This would group products by the unique combination of category _and_ brand. A snippet of the result would be:

```json
{
  "group": { "category": "Electronics", "brand": "AcmeCorp" },
  "count": { "id": 10 },
  "avg": { "price": 256.3 }
}
```

and so on for each category-brand pair in the data.

### Example 4: Using Distinct
The aggregation feature often supports a **distinct** modifier to count or consider unique values. For instance, to find out how many distinct categories exist in the products collection, you could use a distinct count:

```GraphQL
query {
  products {
    countDistinct { category }
  }
}
```

This query (with no groupBy specified) would return a single result with the number of unique category values among all products. The result might look like:

```JSON
{
  "data": {
    "products": {
      "countDistinct": { "category": 5 }
    }
  }
}
```

Indicating there are 5 distinct categories. Distinct can also be combined with grouping. For example, if we group by `category` and want to know how many distinct brands are in each category, we could do:

```GraphQL
query {
  products(groupBy: ["category"]) {
    group
    countDistinct { brand }
  }
}
```

Each group’s `countDistinct { brand }` would tell how many unique brands are in that category.

## Available Aggregation Functions

The exact functions available depend on the implementation, but common aggregation operations include:

- **count** – Count of records (or non-null values of a field) in the group.
- **countDistinct** – Count of unique values of a field in the group.
- **sum** – Sum of all values in a numeric field.
- **sumDistinct** – Sum of unique values in a numeric field.
- **avg** – Average (mean) of values in a numeric field.
- **avgDistinct** – Average of unique values in a numeric field.
- **min** – Minimum value in a field.
- **max** – Maximum value in a field.

In our GraphQL API, these are typically requested by specifying the function name and the target field, as shown in the examples `(count { id }`, `sum { price }`, etc. Each function returns an object allowing you to select the field(s) it was applied to. For instance, `sum { price }` gives the sum of the price field for that group, and `count { id }` gives the count of id (which is effectively the count of items).

> [!NOTE]
> Currently aggregation operations like `sum`, `avg`, `min`, and `max` work only on **numeric** or quantitative fields (e.g., integers, floats, dates). You cannot use them on text fields. (For example, you can’t take the “average” of a string.) The **count** functions can be used on any field (including strings or IDs, since they just count occurrences). Support for performing aggregates on other types (like text for a future possible function such as concatenation or lexicographical min/max) is planned, but not available yet.

## Restrictions and Best Practices

When using aggregations in GraphQL, there are some important rules and limitations to keep in mind. These ensure that your queries are valid and that the results are predictable, especially when paginating through results.

**1\. Grouped Fields Must Appear in Results:** If you use a `groupBy` argument, the fields you group by should also be requested in the query result (or be part of the `group` object in the result). In practice, this means you cannot group by a field and then omit it from the returned data. Each grouping key is essential to identify the group in the results. Conversely, you cannot ask for non-aggregated fields that you did _not_ group by. For example, if you group products by `category` only, you **cannot** directly select `name` or `id` of individual products in the result, because each group contains multiple products with different names/ids. Only aggregated values (like counts or sums) or the grouped key itself (category) can be returned for each group. This mirrors the SQL rule that any selected non-aggregated field must be part of the GROUP BY. Always ensure the fields listed in `groupBy` correspond to fields you include in the result (as group identifiers or via the `group` object).

**2\. Aggregation and Raw Items Mutually Exclusive:** At present, you cannot retrieve both the grouped summary data and the raw list of items in the same query **simultaneously**. The `groupBy` aggregation query for a collection returns grouped data instead of the normal item list. For example, in our API the `products(...)` query will return either a list of products (when no `groupBy` is used) **or** a list of grouped results (when `groupBy` is used), but not both at once. You may notice that in the aggregated examples above, the field `group` and aggregate fields appear, whereas the usual `items` list of products is not present. If you attempt to request the normal items along with groups in one query, the GraphQL engine will return an error (or simply not allow that selection). If you need both the raw data and aggregated data, you will have to run two separate queries (or wait for a future update that might lift this limitation). This design is to keep the response structure unambiguous – for now, the query is either in "aggregation mode" or "list items mode".

**3\. Sorting Grouped Results (orderBy vs. primary key):** When you get aggregated groups, the order in which groups are returned is not guaranteed unless you specify an explicit sort order. It is **highly recommended to use an `orderBy` (or `sort`) argument** on aggregated queries to define how groups should be sorted in the results – especially if the grouping key is not inherently unique or if there is no obvious default order. For example, if we group by `category` which is a name, should the results come back alphabetically by category name, or in order of highest count, or in insertion order? Without an `orderBy`, the grouping might be returned in an arbitrary order determined by the database. Moreover, if you plan to paginate through the grouped results (using limit/offset or cursor pagination), a stable sort order is required for the pagination to work correctly. In many systems, if a primary key is part of the grouping (making each group naturally identifiable by that key), the results might default to sorting by that. But if **no primary key is present in the groupBy fields**, you must specify an `orderBy` clause to get consistent ordering. For instance, you could do `orderBy: "count.id DESC"` to sort categories by the number of products (from highest to lowest) if the implementation supports ordering by aggregate results (see next point). Otherwise, you might sort by the grouped field itself (`orderBy: "category"` to sort alphabetically by category name, for example).

**4\. Sorting by Aggregated Values:** By default, GraphQL does not allow directly referencing an aggregated value in the query arguments, but our API provides a way to sort on aggregate results using the `orderBy` (or `sort`) parameter with a special syntax. You cannot use the aggregated fields in a normal field selection for ordering because they are computed on the fly. However, the aggregation system exposes them for sorting by naming them under their function. For example, to sort groups by the count of products descending, you can use an order like `"count.id DESC"` (meaning sort by the count on `id` field). Similarly, `"avg.rating ASC"` could sort by average rating. This syntax treats the aggregate function name and field as a sort key. 

> [!NOTE]
> There is no separate `orderBy` inside the `count` or `avg` objects; instead you specify the sort at the query level. Ensure your documentation or code supports this (for instance, in some client SDKs you might provide it as `sort: ["count.id"]`). If the API returns an error when trying to sort by an aggregate, check the documentation – it might be a feature added in a newer version. (In our fictional scenario, we assume support is present as of now.)


**5\. Distinct Aggregation Usage:** The **distinct** modifier should be used when you need to ignore duplicate values in an aggregation. For example, `countDistinct { category }` counts unique categories. This is particularly useful if you want to know _how many distinct X are in this group_. Distinct can also be applied to sum or average – e.g., `sumDistinct { price }` would add up each unique price value only once per group. That case is less common, but it’s available for completeness. Use distinct aggregates in scenarios where duplicates skew the data. For instance, if a product could appear multiple times (say, via joins), a distinct count ensures it’s only counted once. If you just want the unique values themselves (not count), an approach is to group by that field without any other grouping – each returned group represents one distinct value. For example, to list distinct product categories, you could do `products(groupBy: ["category"]) { group }` and you’d get one group entry per category (with perhaps a count alongside). In future, there may be direct support for retrieving the list of distinct values without grouping, but currently grouping by the field or using distinct in an aggregate are the ways to get that information.

**6\. Aggregations on Non-numeric Fields:** As mentioned, aggregate functions like sum/avg/min/max currently work only on numeric fields. If you attempt to use them on a text or Boolean field, you will get an error. For example, `sum { name }` is invalid because `name` is a string. You should only use these functions on appropriate data types (integers, floats, or possibly date/time for min/max). Counting is the exception – you can count any field (or use a wildcard count of all items). If you need to perform text aggregations (like concatenating strings or finding distinct text values), those operations are not supported yet in this GraphQL API. The development team has indicated that support for string-based aggregation (such as maybe a future GROUP_CONCAT or similar) is on the roadmap, but for now, you will need to retrieve the raw data and handle such text aggregation in your application if required.

By keeping these restrictions and guidelines in mind, you can build effective GraphQL aggregation queries that yield powerful insights. The aggregation feature is extremely useful for reporting and analytics use cases, but it does require careful structuring of queries. Always double-check that your `groupBy` fields align with your selected output fields, add sorting for predictable order (especially when paginating), and use distinct and aggregate functions appropriately for the data types.

## Conclusion

GraphQL aggregations enable you to get summarized, analytical data directly from your API using a convenient query format. In our e-commerce examples, we demonstrated grouping products by category to get counts and sums, averaging ratings, and using distinct counts. These queries return structured results that can power dashboards or reports without additional processing. As this feature evolves, some limitations (like combining raw items with groups, or aggregating text fields) may be lifted, but as of now, you should design queries within the current constraints.

With a clear understanding of your schema and the guidelines above, you can confidently write aggregation queries to extract valuable insights. Happy querying!

**Related content**

- [Fabric API for GraphQL editor](api-graphql-editor.md)
- [More query and mutation examples](/azure/data-api-builder/graphql.md#supported-root-types)
- [Fabric API for GraphQL schema view and Schema explorer](graphql-schema-view.md)