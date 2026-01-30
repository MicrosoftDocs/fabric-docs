---
title: Aggregations in API for GraphQL
description: Learn how to use GraphQL aggregations in Microsoft Fabric to retrieve summarized data from your lakehouse and warehouse tables through the API for GraphQL.
author: eric-urban
ms.author: eur
ms.reviewer: edlima
ms.date: 01/21/2026
ms.topic: concept-article
ms.custom: freshness-kr
ms.search.form: Aggregations in API for GraphQL # This value shouldn't change. If so, contact engineering.
---

# Aggregations in API for GraphQL

Transform your Microsoft Fabric data into actionable insights with GraphQL aggregations. Instead of retrieving thousands of individual records and processing them in your application, you can ask Fabric to group your data and calculate summaries server-side—dramatically improving performance and reducing data transfer.

GraphQL aggregations work like SQL GROUP BY operations, but through the GraphQL API. You can count items per category, calculate revenue totals, find average ratings, or determine min/max values across your lakehouse and warehouse tables—all in a single, efficient query.

**Key benefits:**
- **Server-side processing**: Leverage Fabric's optimized query engines for calculations
- **Reduced data transfer**: Get summaries instead of raw records
- **Single query efficiency**: Replace multiple client-side operations with one aggregation

This guide shows you how to build aggregation queries using a practical e-commerce example, covering everything from basic grouping to advanced functions and important limitations.

## Who should use aggregations

GraphQL aggregations are valuable for:
- **Application developers** building custom dashboards and analytics applications that need summarized Fabric data
- **Data engineers** creating data APIs that serve pre-computed metrics and KPIs from Fabric lakehouses and warehouses
- **BI developers** building custom analytics solutions that complement Power BI with aggregated Fabric data
- **Integration developers** creating applications and workflows that need summary statistics from Fabric
- **Data analysts** building self-service analytics solutions that require grouped, aggregated insights from Fabric data

If you're retrieving data to display charts, calculate totals, generate reports, or analyze trends, aggregations can significantly improve your application's performance and reduce data transfer.

## Common business questions you can answer

GraphQL aggregations excel at answering analytical questions about your Fabric data:

- **Counting and grouping**: _"How many products are in each category?"_ or _"How many orders per month?"_
- **Financial calculations**: _"What's the total revenue by region?"_ or _"Average order value by customer segment?"_  
- **Performance metrics**: _"What's the highest and lowest rated product in each category?"_
- **Customer insights**: _"How many unique customers visited this month?"_ or _"Which cities have the most active users?"_

These queries are ideal for building dashboards, generating reports, and powering analytics applications where you need summarized data rather than individual records.

## Prerequisites

Before using GraphQL aggregations, ensure you have:
- A Microsoft Fabric workspace with appropriate permissions
- A lakehouse or warehouse with tables containing the data you want to aggregate
- An API for GraphQL endpoint configured for your Fabric items
- Basic familiarity with GraphQL query syntax

## Where to run these queries

**Quick start**: Use the **API for GraphQL editor** in your Fabric workspace to test all the examples in this article. The editor provides schema exploration, query validation, and immediate results.

**For applications**: Send queries as HTTP POST requests to your GraphQL endpoint, using any GraphQL client library for your programming language.

**For development**: Tools like GraphQL Playground, Insomnia, or Postman work well for query development and testing.

> [!NOTE]
> Examples in this article are ready to copy and run once you've configured your API for GraphQL endpoint. Some examples are shortened for brevity and might need adaptation for your specific schema.

## Example scenario: E-commerce data in Fabric

For this guide, we use a fictional e-commerce dataset stored in your Microsoft Fabric lakehouse or warehouse. This scenario demonstrates how you might analyze retail data using GraphQL aggregations.

In this example, product data belongs to categories, with each `Product` containing fields like price and rating (numeric values perfect for aggregation), and a relationship to `Category`. When you expose these tables through Fabric's API for GraphQL, the generated schema might look like:

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
}
```

In this example, the `products` query can return either a normal list of items or, if `groupBy` is used, aggregated results. Let's focus on using the `groupBy` and aggregation features of this query.

> [!NOTE]
> You can't retrieve both normal items and grouped results in the same query. For more details, see [Aggregation and raw items are mutually exclusive](#aggregation-and-raw-items-are-mutually-exclusive).

## Available aggregation functions

The exact functions available depend on the implementation, but common aggregation operations include:

- **count** – Count of records (or non-null values of a field) in the group.
- **sum** – Sum of all values in a numeric field.
- **avg** – Average (mean) of values in a numeric field.
- **min** – Minimum value in a field.
- **max** – Maximum value in a field.

In GraphQL aggregations, you specify the function name and target field, as shown in the examples `count(field: id)`, `sum(field: price)`, etc. Each function returns an object allowing you to select one or more fields it was applied to.

> [!NOTE]
> In Microsoft Fabric's API for GraphQL, aggregation operations like `count`, `sum`, `avg`, `min`, and `max` currently work only on **numeric** or quantitative fields (integers, floats). You can't use them on text or date fields directly. For example, you can't calculate the "average" of a string field. Support for performing aggregates on other data types (such as text concatenation or lexicographical min/max) might be added in future updates to Fabric.

## Aggregation query basics

To perform an aggregation in Fabric's GraphQL API, you specify a `groupBy` argument in your query to define how to group the data, and request aggregation fields (like counts or sums) in the result. Fabric's GraphQL engine processes these queries efficiently against your underlying lakehouse or warehouse tables, returning a list of grouped records with their key values and computed aggregated metrics.

### Example 1: Count products per category 

Let's group products by their category and count how many products are in each group. The query might look like:

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
        // Sample shortened for brevity
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

> [!TIP]
> When grouping by multiple fields, explicit sorting becomes especially important for predictable results. See [Sorting grouped results requires explicit ordering](#sorting-grouped-results-requires-explicit-ordering).

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

> [!TIP]
> For more guidance on when and how to use distinct appropriately, see [Use distinct aggregation appropriately](#use-distinct-aggregation-appropriately).

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



## Restrictions and best practices

When you use aggregations in Microsoft Fabric's API for GraphQL, there are important rules and limitations to consider. By following these best practices and understanding these restrictions, you can build effective GraphQL aggregation queries that yield powerful insights while ensuring predictable results, especially when working with large datasets or implementing pagination.

The aggregation feature is useful for reporting and analytics use cases, but it does require careful structuring of queries. Always double-check that your `groupBy` fields align with your selected output fields, add sorting for predictable order especially when paginating, and use distinct and aggregate functions appropriately for the data types.

The following sections cover three key areas you need to understand: [Aggregation and raw items are mutually exclusive](#aggregation-and-raw-items-are-mutually-exclusive), [Sorting grouped results requires explicit ordering](#sorting-grouped-results-requires-explicit-ordering), and [Use distinct aggregation appropriately](#use-distinct-aggregation-appropriately).

### Aggregation and raw items are mutually exclusive

Currently, you can't retrieve both grouped summary data and the raw list of items in the same query **simultaneously**. When you use `groupBy` in your query, the API switches into "aggregation mode" and returns only grouped results. This design keeps the response structure unambiguous - each query is either in "aggregation mode" or "list items mode", but never both.

**How this works in practice:**

The `products(...)` query returns either:
- A list of individual products (when `groupBy` isn't used)
- A list of grouped results with aggregate data (when `groupBy` is used)

Notice in the aggregated examples above that the response contains `groupBy` and aggregate fields, but the usual `items` list of products is missing.

**What happens if you try both:**

If you attempt to request both normal items and groups in the same query, the GraphQL engine returns an error or won't allow that selection.

**Workaround:**

If you need both raw data and aggregated data, run two separate queries: one for raw data and one for aggregated data. This approach gives you complete control over both datasets and can be optimized based on your specific caching and performance requirements.

### Sorting grouped results requires explicit ordering

Aggregated groups are returned in unpredictable order unless you specify explicit sorting. Always use `orderBy` or `sort` arguments to ensure consistent, meaningful results.

**Why explicit ordering matters:**

- **Unpredictable default order**: Without `orderBy`, groups might return in arbitrary database-determined order
- **Pagination requirements**: Stable sort order is essential for consistent pagination behavior
- **User experience**: Predictable ordering improves data interpretation and application reliability

**When you must specify ordering:**

- **No primary key in groupBy fields**: If your grouping fields don't include a primary key, you must add `orderBy`
- **Non-unique grouping keys**: When grouping by fields like category names or dates
- **Pagination scenarios**: Anytime you plan to use limit/offset or cursor pagination

**Best practices:**

- Sort by aggregate values (such as highest count first) for analytical insights
- Use alphabetical sorting for category-based groupings
- Combine multiple sort criteria for complex ordering needs 

### Use distinct aggregation appropriately

The `distinct` modifier eliminates duplicate values before performing aggregations, ensuring accurate calculations when your data contains duplicates.

**Common use cases:**

- **Unique counts**: `count(field: category_id, distinct: true)` counts how many different categories exist in each group
- **Deduplicated sums**: `sum(field: price, distinct: true)` adds each unique price value only once per group
- **Join scenarios**: When products appear multiple times due to table joins, distinct ensures each item is counted once

**When to use distinct:**

- Your data contains legitimate duplicates that would skew calculations
- You're working with joined tables that create duplicate rows
- You need to count unique values rather than total occurrences

**Performance consideration:**

Distinct operations require more processing. Only use when necessary for data accuracy.

## Related content

- [API for GraphQL editor](api-graphql-editor.md)
- [GraphQL schema view and Schema explorer](graphql-schema-view.md)
- [Data API Builder GraphQL documentation](/azure/data-api-builder/graphql#supported-root-types)
