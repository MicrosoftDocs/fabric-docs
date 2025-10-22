---
title: Indexing policies in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Use custom indexing policies to fine tune the performance of Cosmos DB in Microsoft Fabric during the preview to better match your application workloads.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/14/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Indexing policies in Cosmos DB in Microsoft Fabric (preview)


Cosmos DB is a schema-agnostic database that allows you to iterate on your application without having to deal with schema or index management. Indexing within Cosmos DB in Microsoft Fabric is designed to deliver fast and flexible query performance, no matter how your data evolves. In Cosmos DB in Fabric, every container has an indexing policy that dictates how the container's items should be indexed. The default indexing policy for newly created containers indexes every property of every item and enforces range indexes for any string or number. This default configuration allows you to get good query performance without having to think about indexing and index management upfront.

In some situations, you might want to override this automatic behavior to better suit your requirements. You can customize a container's indexing policy by setting its *indexing mode*, and include or exclude *property paths*.

## Indexing mode

Cosmos DB supports two indexing modes:

- **Consistent**: The index is updated synchronously as you create, update, or delete items.

- **None**: Indexing is disabled on the container. This mode is commonly used when a container is used as a pure key-value store without the need for secondary indexes. It can also be used to improve the performance of bulk operations. After the bulk operations are complete, the index mode can be set to `Consistent` and then monitored using the `IndexTransformationProgress` feature in the SDK until complete.

> [!NOTE]
> Cosmos DB also supports a Lazy indexing mode. Lazy indexing performs updates to the index at a lower priority level when the engine isn't doing any other work. This behavior can result in **inconsistent** or **incomplete** query results. If you plan to query a Cosmos DB container, you shouldn't select lazy indexing. New containers can't select lazy indexing.

## Index size

In Cosmos DB, the total consumed storage is the combination of both the Data size and Index size. The following are some features of index size:

- The index size depends on the indexing policy. If all the properties are indexed, then the index size can be larger than the data size.

- When data is deleted, indexes are compacted on a near continuous basis. However, for small data deletions, you might not immediately observe a decrease in index size.

- The Index size can temporarily grow when physical partitions split. The index space is released after the partition split is completed.

- The system properties `id` and `_ts` are always indexed when the container's indexing mode is Consistent.

- The system properties `id` and `_ts` aren't included in the indexed paths description for a container policy. This exclusion is by design because these system properties are always indexed by default, and this behavior can't be disabled.

> [!NOTE]
> The partition key (unless it's also `/id`) isn't indexed and should be included in the index.

## Including and excluding property paths

A custom indexing policy can specify property paths that are explicitly included or excluded from indexing. By optimizing the number of paths that are indexed, you can substantially reduce the latency and RU charge of write operations.

Consider this JSON item again:

```json
{
  "locations": [
    { "country": "Germany", "city": "Berlin" },
    { "country": "France", "city": "Paris" }
  ],
  "headquarters": { "country": "Belgium", "employees": 250 },
  "exports": [
    { "city": "Moscow" },
    { "city": "Athens" }
  ]
}
```

This indexing policy results in these indexing paths:

| Path | Value |
| --- | --- |
| `/locations/0/country` | `"Germany"` |
| `/locations/0/city` | `"Berlin"` |
| `/locations/1/country` | `"France"` |
| `/locations/1/city` | `"Paris"` |
| `/headquarters/country` | `"Belgium"` |
| `/headquarters/employees` | `250` |
| `/exports/0/city` | `"Moscow"` |
| `/exports/1/city` | `"Athens"` |

These paths are defined with the following additions:

- a path leading to a scalar value (string or number) ends with `/?`

- elements from an array are addressed together through the `/[]` notation (instead of `/0`, `/1`, etc.)

- the `/*` wildcard can be used to match any elements below the node

A baseline indexing policy fo the example item could include these optimizations:

- the `headquarters`'s `employees` path is `/headquarters/employees/?`

- the `locations`' `country` path is `/locations/[]/country/?`

- the path to anything under `headquarters` is `/headquarters/*`

For example, we could include the `/headquarters/employees/?` path. This path would ensure that we index the `employees` property but wouldn't index extra nested JSON within this property.

## Include/exclude strategy

Any indexing policy has to include the root path `/*` as either an included or an excluded path.

- Include the root path to selectively exclude paths that don't need to be indexed. This approach is recommended as it lets Cosmos DB proactively index any new property that might be added to your model.

- Exclude the root path to selectively include paths that need to be indexed. The partition key property path isn't indexed by default with the excluded strategy and should be explicitly included if needed.

- For paths with regular characters that include: alphanumeric characters and _ (underscore), you don't have to escape the path string around double quotes (for example, "/path/?"). For paths with other special characters, you need to escape the path string around double quotes (for example, "/\"path-abc\"/?"). If you expect special characters in your path, you can escape every path for safety. Functionally, it doesn't make any difference if you escape every path or just the ones that have special characters.

- The system property `_etag` is excluded from indexing by default, unless the etag is added to the included path for indexing.

- If the indexing mode is set to **consistent**, the system properties `id` and `_ts` are automatically indexed.

- If an explicitly indexed path doesn't exist in an item, a value is added to the index to indicate that the path is undefined.

All explicitly included paths have values added to the index for each item in the container, even if the path is undefined for a given item.

For more information, see [sample indexing policies](sample-indexing-policies.md).

## Include/exclude precedence

If your included paths and excluded paths have a conflict, the more precise path takes precedence.

Consider this example:

- **Included Path**: `/food/ingredients/nutrition/*`

- **Excluded Path**: `/food/ingredients/*`

In this case, the included path takes precedence over the excluded path because it's more precise. Based on these paths, any data in the `/food/ingredients` path or nested within the path would be excluded from the index. The exception would be data within the included path: `/food/ingredients/nutrition/*`, which would be indexed.

Here are some rules for included and excluded paths precedence in Cosmos DB:

- Deeper paths are more precise than narrower paths. for example: `/a/b/?` is more precise than `/a/?`.

- The `/?` is more precise than `/*`. For example, `/a/?` is more precise than `/a/*` so `/a/?` takes precedence.

- The path `/*` must be either an included path or excluded path.

## Full-text indexes

**Full-text** indexes enable full text search and scoring efficiently using the index. Defining a full text path in an indexing policy can easily be done by including a `fullTextIndexes` section of the indexing policy that contains all of the text paths to be indexed. For example:

```json
{
    "indexingMode": "consistent",
    "automatic": true,
    "includedPaths": [
        {
            "path": "/*"
        }
    ],
    "excludedPaths": [
        {
            "path": "/\"_etag\"/?"
        },
    ],
    "fullTextIndexes": [
        {
            "path": "/text"
        }
    ]
}
```

> [!IMPORTANT]
> A full text indexing policy must be on the path defined in the container's full text policy. For more information, see [full text search](full-text-indexing.md).

## Vector indexes

**Vector** indexes increase the efficiency when performing vector searches using the `VECTORDISTANCE` system function. Vectors searches have lower latency, higher throughput, and less request unit (RU) consumption when applying a vector index. You can specify the following types of vector index policies:

| Type | Description | Max dimensions |
| --- | --- |
| **`flat`** | Stores vectors on the same index as other indexed properties. | `505` |
| **`quantizedFlat`** | Quantizes (compresses) vectors before storing on the index. This type can improve latency and throughput at the cost of a small amount of accuracy. | `4096` |
| **`diskANN`** | Creates an index based on DiskANN for fast and efficient approximate search. | `4096` |

> [!IMPORTANT]
> Vector policies and vector indexes are immutable after creation. To make changes, create a new collection.

A few points to note:

- The `flat` and `quantizedFlat` index types use Cosmos DB's index to store and read each vector during a vector search. Vector searches with a `flat` index are brute-force searches and provide 100% accuracy or recall. This accuracy means the search always finds the most similar vectors in the dataset. However, a `flat` index supports vectors with up to `505` dimensions.

  - The `quantizedFlat` index stores quantized (compressed) vectors on the index. Vector searches with `quantizedFlat` index are also brute-force searches, however their accuracy might be slightly less than 100% since the vectors are quantized before adding to the index. However, vector searches with `quantized flat` should have lower latency, higher throughput, and lower RU cost than vector searches on a `flat` index. This type is a good option for scenarios where you're using query filters to narrow down the vector search to a relatively small set of vectors. In this scenario, high accuracy is required.

  - The `diskANN` index is a separate index defined specifically for vectors applying [DiskANN](https://www.microsoft.com/research/publication/diskann-fast-accurate-billion-point-nearest-neighbor-search-on-a-single-node/), a suite of high performance vector indexing algorithms developed by Microsoft Research. DiskANN indexes can offer some of the lowest latency, highest throughput, and lowest RU cost queries, while still maintaining high accuracy. However, since DiskANN is an approximate nearest neighbors (ANN) index, the accuracy might be lower than `quantizedFlat` or `flat`.

  - The `diskANN` and `quantizedFlat` indexes can take optional index build parameters that can be used to tune the accuracy versus latency trade-off that applies to every Approximate Nearest Neighbors vector index.

- `quantizationByteSize`: Sets the size (in bytes) for product quantization. (`Min=1`, `Default=dynamic` (system decides), `Max=512`). Setting this size larger could result in higher accuracy vector searches at expense of higher RU cost and higher latency. This tradeoff applies to both `quantizedFlat` and `DiskANN` index types.

  - `indexingSearchListSize`: Sets how many vectors to search over during index build construction. Min=10, Default=100, Max=500. Setting this size larger could result in higher accuracy vector searches at the expense of longer index build times and higher vector ingest latencies. This characteristic applies to `DiskANN` indexes only.

Here's an example of an indexing policy with a vector index:

```json
{
  "indexingMode": "consistent",
  "automatic": true,
  "includedPaths": [
    {
      "path": "/*"
    }
  ],
  "excludedPaths": [
    {
      "path": "/_etag/?",
    },
    {
      "path": "/vector/*"
    }
  ],
  "vectorIndexes": [
    {
      "path": "/vector",
      "type": "diskANN"
    }
  ]
}
```

> [!IMPORTANT]
> The vector path should be added to the `excludedPaths` section of the indexing policy to ensure optimized performance for insertion. Not adding the vector path to `excludedPaths` results in higher RU charge and latency for vector insertions.
>
> A vector indexing policy must also be on the path defined in the container's vector policy. For more information, see [vector policies](index-vector-data.md#vector-indexing-policies).
>

## Spatial indexes

When you define a spatial path in the indexing policy, you should define which index `type` should be applied to that path.

Possible types for spatial indexes include:

- Point

- Polygon

- MultiPolygon

- LineString

By default, Cosmos DB doesn't create any spatial indexes. To use spatial SQL built-in functions, create a spatial index on the required properties. For more information, see [spatial indexes](indexing.md#spatial-index).

## Tuple indexes

Tuple Indexes are useful when performing filtering on multiple fields within an array element. Tuple indexes are defined in the includedPaths section of the indexing policy using the tuple specifier `[]`.

> [!NOTE]
> Unlike with included or excluded paths, you can't create a path with the `/*` wildcard. Every tuple path needs to end with `/?`. If a tuple in a tuple path doesn't exist in an item, a value is added to the index to indicate that the tuple is undefined.

Array tuple paths are defined in the `includedPaths` section using the following notation: `<path prefix>/[]/{<tuple 1>, <tuple 2>, …, <tuple n>}/?`

Consider these important rules for array tuples:

- Each part of the tuple is separated by a comma.

- The first part, the path prefix, is the path that is common between the tuples. It's the path from root to array. In our example, it's `/events`.

- After the first part, the tuple should include the array wildcard specifier `[]`. All array tuple paths should have an array wildcard specifier before the tuple specifier `{}`.

- The next part specify tuples using the tuple specifier `{}`.

- Tuple needs to use the same path specification as other index paths with a few exceptions:

  - Tuples shouldn't start with the leading `/`.

  - Tuples shouldn't have array wildcards.

  - Tuples shouldn't end with `?` or `*`.

  - `?` is the last segment in a tuple path and should be specified immediately after the tuple specifier segment.

For example, this specification is a valid tuple path: `/events/[]/{name, category}/?`

Here are a few more valid examples of array tuple paths:

```json
[
  { "path": "/events/[]/{name/first, name/last}/?" },
  { "path": "/events/[]/{name/first, category}/?" },
  { "path": "/events/[]/{name/first, category/subcategory}/?" },
  { "path": "/events/[]/{name/[1]/first, category}/?" },
  { "path": "/events/[]/{[1], [3]}/?" },
  { "path": "/city/[1]/events/[]/{name, category}/?" }
]
```

Here are a few examples of *invalid* array tuple paths with explanations:

| Invalid path | Explanation |
| --- | --- |
| `/events/[]/{name/[]/first, category}/?` | One of the tuples has array wildcard |
| `/events/[]/{name, category}/*` | The last segment in array tuple path should be `?` and not `*` |
| `/events/[]/{{name, first},category}/?` | The tuple specifier is nested |
| `/events/{name, category}/?` | The array wildcard is missing before the tuple specifier |
| `/events/[]/{/name,/category}/?` | Tuples must start with a leading `/` |
| `/events/[]/{name/?,category/?}/?` | Tuples must end with an `?` |
| `/city/[]/events/[]/{name, category}/?` | The path prefix as two array wildcards |

## Composite indexes

Queries that have an `ORDER BY` clause with two or more properties require a composite index. You can also define a composite index to improve the performance of many equality and range queries. By default, no composite indexes are defined so you should add composite indexes as needed.

You can't use the `/*` wildcard in composite index paths. Each composite path automatically ends with `/?`, so you don't need to add it. Composite paths must point to a scalar value, which is the only value included in the composite index. If a composite index path doesn't exist in an item or points to a nonscalar value, Cosmos DB adds a value to the index to show that the path is undefined.

When defining a composite index, you specify these two components:

- Two or more property paths, defined in a specific order that affects how the composite index is used.

- The order, defined as either **ascending** or **descending**.

When you add a composite index, the query utilizes existing range indexes until the new composite index addition is complete. Therefore, when you add a composite index, you might not immediately observe performance improvements.

> [!TIP]
> It's possible to track the progress of index transformation by using one of the software development kits (SDKs).

### `ORDER BY` queries on multiple properties:

The following considerations are used when using composite indexes for queries with an `ORDER BY` clause with two or more properties.

- If the composite index paths don't match the sequence of the properties in the `ORDER BY` clause, then the composite index can't support the query.

- The order of composite index paths (ascending or descending) should also match the `order` in the `ORDER BY` clause.

- The composite index also supports an `ORDER BY` clause with the opposite order on all paths.

Consider the following example where a composite index is defined on properties name, age, and _ts:

| Composite Index | Sample `ORDER BY` Query | Supported by Composite Index? |
| ----------------------- | -------------------------------- | -------------- |
| `(name ASC, age ASC)` | `SELECT * FROM c ORDER BY c.name ASC, c.age asc` | `Yes` |
| `(name ASC, age ASC)` | `SELECT * FROM c ORDER BY c.age ASC, c.name asc` | `No` |
| `(name ASC, age ASC)` | `SELECT * FROM c ORDER BY c.name DESC, c.age DESC` | `Yes` |
| `(name ASC, age ASC)` | `SELECT * FROM c ORDER BY c.name ASC, c.age DESC` | `No` |
| `(name ASC, age ASC, timestamp ASC)` | `SELECT * FROM c ORDER BY c.name ASC, c.age ASC, timestamp ASC` | `Yes` |
| `(name ASC, age ASC, timestamp ASC)` | `SELECT * FROM c ORDER BY c.name ASC, c.age ASC` | `No` |

You should customize your indexing policy so you can serve all necessary `ORDER BY` queries.

### Queries with filters on multiple properties

If a query has filters on two or more properties, it might be helpful to create a composite index for these properties.

For example, consider the following query that has both an equality and range filter:

```nosql
SELECT
  *
FROM
  container c
WHERE
  c.name = "John" AND c.age > 18
```

This query is more efficient, taking less time and consuming fewer request units (RUs), if it's able to apply a composite index on `(name ASC, age ASC)`.

Queries with multiple range filters can also be optimized with a composite index. However, each individual composite index can only optimize a single range filter. Range filters include `>`, `<`, `<=`, `>=`, and `!=`. The range filter should be defined last in the composite index.

Consider the following query with an equality filter and two range filters:

```nosql
SELECT
  *
FROM
  container c
WHERE
  c.name = "John" AND
  c.age > 18 AND
  c._ts > 1612212188
```

This query is more efficient with a composite index on `(name ASC, age ASC)` and `(name ASC, _ts ASC)`. However, the query wouldn't utilize a composite index on `(age ASC, name ASC)` because the properties with equality filters must be defined first in the composite index. Two separate composite indexes are required instead of a single composite index on `(name ASC, age ASC, _ts ASC)` since each composite index can only optimize a single range filter.

The following considerations are used when creating composite indexes for queries with filters on multiple properties:

- Filter expressions can use multiple composite indexes.

- The properties in the query's filter should match the properties in composite index. If a property is in the composite index but isn't included in the query as a filter, the query doesn't utilize the composite index.

- When a query filters on properties not included in a composite index, a combination of composite and range indexes are used to evaluate the query. This approach consumes fewer RUs than relying solely on range indexes.

- If a property has a range filter (`>`, `<`, `<=`, `>=`, or `!=`), then this property should be defined last in the composite index. If a query has more than one range filter, it might benefit from multiple composite indexes.

- When creating a composite index to optimize queries with multiple filters, the `ORDER` of the composite index has no effect on the results. This property is optional.

Consider the following examples where a composite index is defined on properties name, age, and timestamp:

| Composite Index | Sample Query | Supported by Composite Index? |
| ----------------------- | -------------------------------- | -------------- |
| `(name ASC, age ASC)` | `SELECT * FROM c WHERE c.name = "John" AND c.age = 18` | `Yes` |
| `(name ASC, age ASC)` | `SELECT * FROM c WHERE c.name = "John" AND c.age > 18` | `Yes` |
| `(name ASC, age ASC)` | `SELECT COUNT(1) FROM c WHERE c.name = "John" AND c.age > 18` | `Yes` |
| `(name DESC, age ASC)` | `SELECT * FROM c WHERE c.name = "John" AND c.age > 18` | `Yes` |
| `(name ASC, age ASC)` | `SELECT * FROM c WHERE c.name != "John" AND c.age > 18` | `No` |
| `(name ASC, age ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.name = "John" AND c.age = 18 AND c.timestamp > 123049923` | `Yes` |
| `(name ASC, age ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.name = "John" AND c.age < 18 AND c.timestamp = 123049923` | `No` |
| `(name ASC, age ASC) and (name ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.name = "John" AND c.age < 18 AND c.timestamp > 123049923` | `Yes` |

### Queries with a filter and ORDER BY

If a query filters on one or more properties and has different properties in the ORDER BY clause, it might be helpful to add the properties in the filter to the `ORDER BY` clause.

For example, by adding the properties in the filter to the `ORDER BY` clause, the following query could be rewritten to apply a composite index:

Query using range index:

```nosql
SELECT
  *
FROM
  container c
WHERE
  c.name = "John"
ORDER BY
  c.timestamp
```

Query using composite index:

```nosql
SELECT
  *
FROM
  container c
WHERE
  c.name = "John"
ORDER BY
  c.name,
  c.timestamp
```

The same query optimizations can be generalized for any `ORDER BY` queries with filters, keeping in mind that individual composite indexes can only support, at most, one range filter.

Query using range index:

```nosql
SELECT
  *
FROM
  container c
WHERE
  c.name = "John" AND
  c.age = 18 AND
  c.timestamp > 1611947901
ORDER BY
  c.timestamp
```

Query using composite index:

```nosql
SELECT
  *
FROM
  container c
WHERE
  c.name = "John" AND
  c.age = 18 AND
  c.timestamp > 1611947901
ORDER BY
  c.name,
  c.age,
  c.timestamp
```

In addition, you can use composite indexes to optimize queries with system functions and `ORDER BY`:

Query using range index:

```nosql
SELECT
  *
FROM
  container c
WHERE
  c.firstName = "John" AND
  CONTAINS(c.lastName, "Smith", true)
ORDER BY
  c.lastName
```

Query using composite index:

```nosql
SELECT
  *
FROM
  container c
WHERE
  c.firstName = "John" AND
  CONTAINS(c.lastName, "Smith", true)
ORDER BY
  c.firstName, c.lastName
```

The following considerations apply when creating composite indexes to optimize a query with a filter and `ORDER BY` clause:

- If you don't define a composite index on a query with a filter on one property and a separate `ORDER BY` clause using a different property, the query still succeeds. However, the RU cost of the query can be reduced with a composite index, particularly if the property in the `ORDER BY` clause has a high cardinality.

- If the query filters on properties, these properties should be included first in the `ORDER BY` clause.

- If the query filters on multiple properties, the equality filters must be the first properties in the `ORDER BY` clause.

- If the query filters on multiple properties, you can have a maximum of one range filter or system function utilized per composite index. The property used in the range filter or system function should be defined last in the composite index.

- All considerations for creating composite indexes for `ORDER BY` queries with multiple properties and queries with filters on multiple properties still apply.

| Composite Index | Sample `ORDER BY` Query | Supported by Composite Index? |
| ---------------------------------------- | ------------------------------------------------------------ | --------------------------------- |
| `(name ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.name = "John" ORDER BY c.name ASC, c.timestamp ASC` | `Yes` |
| `(name ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.name = "John" AND c.timestamp > 1589840355 ORDER BY c.name ASC, c.timestamp ASC` | `Yes` |
| `(timestamp ASC, name ASC)` | `SELECT * FROM c WHERE c.timestamp > 1589840355 AND c.name = "John" ORDER BY c.timestamp ASC, c.name ASC` | `No` |
| `(name ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.name = "John" ORDER BY c.timestamp ASC, c.name ASC` | `No` |
| `(name ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.name = "John" ORDER BY c.timestamp ASC` | `No` |
| `(age ASC, name ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.age = 18 and c.name = "John" ORDER BY c.age ASC, c.name ASC,c.timestamp ASC` | `Yes` |
| `(age ASC, name ASC, timestamp ASC)` | `SELECT * FROM c WHERE c.age = 18 and c.name = "John" ORDER BY c.timestamp ASC` | `No` |

### Queries with a filter and an aggregate

If a query filters on one or more properties and has an aggregate system function, it might be helpful to create a composite index for the properties in the filter and aggregate system function. This optimization applies to the [`SUM`](/nosql/query/sum) and [`AVG`](/nosql/query/avg) system functions.

The following considerations apply when creating composite indexes to optimize a query with a filter and aggregate system function.

- Composite indexes are optional when running queries with aggregates. However, the RU cost of the query can often be reduced with a composite index.

- If the query filters on multiple properties, the equality filters must be the first properties in the composite index.

- You can have a maximum of one range filter per composite index and it must be on the property in the aggregate system function.

- The property in the aggregate system function should be defined last in the composite index.

- The `order` (`ASC` or `DESC`) doesn't matter.

| Composite Index | Sample Query | Supported by Composite Index? |
| ---------------------------------------- | ------------------------------------------------------------ | --------------------------------- |
| `(name ASC, timestamp ASC)` | `SELECT AVG(c.timestamp) FROM c WHERE c.name = "John"` | `Yes` |
| `(timestamp ASC, name ASC)` | `SELECT AVG(c.timestamp) FROM c WHERE c.name = "John"` | `No` |
| `(name ASC, timestamp ASC)` | `SELECT AVG(c.timestamp) FROM c WHERE c.name > "John"` | `No` |
| `(name ASC, age ASC, timestamp ASC)` | `SELECT AVG(c.timestamp) FROM c WHERE c.name = "John" AND c.age = 25` | `Yes` |
| `(age ASC, timestamp ASC)` | `SELECT AVG(c.timestamp) FROM c WHERE c.name = "John" AND c.age > 25` | `No` |

### Composite indexes with an array wildcard

Here's an example for a composite index that contains an array wildcard:

```json
{
  "automatic": true,
  "indexingMode": "Consistent",
  "includedPaths": [
    {
      "path": "/*"
    }
  ],
  "excludedPaths": [],
  "compositeIndexes": [
    [
      {
        "path": "/familyname",
        "order": "ascending"
      },
      {
        "path": "/children/[]/age",
        "order": "descending"
      }
    ]
  ]
}
```

An example query that can benefit from this composite index is:

```nosql
SELECT VALUE
  p.id
FROM
  products p
JOIN
  t IN p.tags
WHERE
  p.category = 'apparel' AND
  p.order > 20
```

## Modifying the indexing policy

An update to the indexing policy triggers a transformation from the old index to the new one. This transformation is performed in place and online. No extra storage space is consumed during the operation. The old indexing policy is efficiently transformed to the new policy without affecting the write availability, read availability, or the throughput provisioned on the container. Index transformation is an asynchronous operation, and the time it takes to complete depends on the provisioned throughput, the number of items and their size. If you need to make multiple indexing policy updates, perform all the changes in a single operation. This approach allows the index transformation to complete more quickly.

> [!IMPORTANT]
> Index transformation is an operation that consumes [request units](request-units.md). You can track the progress and consumption of the index transformation operation by using one of the SDKs.

There's no effect on write availability during any index transformations. The index transformation uses your provisioned RUs but at a lower priority than your CRUD operations or queries.

There's no effect on read availability when adding new indexed paths. Queries use new indexed paths only after the index transformation completes. In other words, when adding a new indexed path, queries that benefit from that indexed path has the same performance before and during the index transformation. After the index transformation is complete, the query engine will begin to use the new indexed paths.

When removing indexed paths, you should group all your changes into one indexing policy transformation. If you remove multiple indexes and do so in one single indexing policy change, the query engine provides consistent and complete results throughout the index transformation. However, if you remove indexes through multiple indexing policy changes, the query engine doesn't provide consistent or complete results until all index transformations complete. Most developers don't drop indexes and then immediately try to run queries that utilize these indexes. In practice, this situation is unlikely.

When you drop an indexed path, the query engine immediately stops using it and performs a full scan instead. Where possible, always group multiple index removals into a single indexing policy modification.

Removing an index takes effect immediately, whereas adding a new index takes some time as it requires an indexing transformation. Make sure to add the new index first and then wait for the index transformation to complete **before** you remove the previous index from the indexing policy when replacing one index with another. For example, follow this strategy when replacing a single property index with a composite-index. Otherwise, this misstep negatively affects your ability to query the previous index and might break any active workloads that reference the previous index.

## Indexing policies and TTL

Using the [time-to-Live (TTL) feature](time-to-live.md) requires indexing.

This required means that:

- It isn't possible to activate TTL on a container where the indexing mode is set to `none`,

- It isn't possible to set the indexing mode to None on a container where TTL is activated.

For scenarios where no property path needs to be indexed, but TTL is required, you can use an indexing policy with an indexing mode set to `consistent`, no included paths, and `/*` as the only excluded path.

## Next step

- [Review indexing conceptually in Cosmos DB in Microsoft Fabric](indexing.md)
- [Customize an indexing policy for a container in Cosmos DB in Microsoft Fabric](how-to-customize-indexing-policy.md)
