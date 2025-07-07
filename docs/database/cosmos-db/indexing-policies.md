---
title: Indexing policies in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Use custom indexing policies to fine tune the performance of Cosmos DB in Microsoft Fabric during the preview to better match your application workloads.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/07/2025
ai-usage: ai-generated
---

# Indexing policies in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Indexing in Cosmos DB is designed to deliver fast and flexible query performance, no matter how your data evolves. By default, Cosmos DB automatically indexes all data, so you can query it without worrying about index management. However, every workload is unique, and sometimes you need more control to optimize for performance, cost, or specific query patterns. That’s where indexing policies come in.

## What is indexed by default?

Cosmos DB automatically indexes every property of every item in your container, so you can run queries on any field without extra configuration. This default behavior is great for flexibility, but you can customize it to better fit your workload.

## What is an indexing policy?

An indexing policy defines how Cosmos DB indexes your data. It determines which properties are indexed, the types of indexes used, and how queries are served. With a custom indexing policy, you can fine-tune the balance between query performance, storage, and write throughput.

### Indexing policy structure

An indexing policy is defined in JSON and includes included paths, excluded paths, index types, and indexing mode. Here’s a simple example:

```json
{
  "indexingMode": "consistent",
  "includedPaths": [
    { "path": "/*" }
  ],
  "excludedPaths": [
    { "path": "/nonIndexedProperty/?" }
  ]
}
```

## Key concepts

- **Automatic indexing:** By default, all properties in your items are indexed. This means you can run rich queries without any manual configuration.

- **Custom indexing:** You can customize which properties are indexed, exclude certain paths, or specify index types (such as range or spatial indexes) to match your workload.

- **Indexing modes:**

  - **Consistent:** Indexes are updated synchronously with your data, ensuring queries always reflect the latest changes.

  - **None:** Disables indexing for the container. This is useful for write-heavy workloads where you don’t need to query the data.

- **Included and excluded paths:**

  - **Included paths** specify which JSON paths are indexed. For example, including `/*` indexes all properties.

  - **Excluded paths** let you skip indexing for specific properties, reducing storage and write costs. For example, excluding `/largeBlob/?` avoids indexing a large property you never query.

- **Index types:**

  - **Range indexes** support efficient queries on numbers, strings, and dates.

  - **Spatial indexes** enable fast queries on geospatial data (like points, polygons, and lines).

  - **Composite indexes** optimize queries that filter or sort on multiple properties.

- **Precision and data types:** You can control the precision of certain index types and specify which data types to index for each path.

### Example: Including and excluding paths

Suppose you want to index all properties except a large attachment:

```json
{
  "includedPaths": [ { "path": "/*" } ],
  "excludedPaths": [ { "path": "/attachment/?" } ]
}
```

### Example: Composite index

Composite indexes help optimize queries that filter or sort on multiple properties. For example:

```json
{
  "compositeIndexes": [
    [
      { "path": "/category/?", "order": "ascending" },
      { "path": "/timestamp/?", "order": "descending" }
    ]
  ]
}
```

### Example: Spatial index

To efficiently query geospatial data, you can add a spatial index:

```json
{
  "includedPaths": [
    {
      "path": "/location/?",
      "indexes": [
        { "kind": "Spatial", "dataType": "Point" }
      ]
    }
  ]
}
```

## How indexing policies affect performance and cost

A well-designed indexing policy can significantly improve query performance and reduce costs. Indexing only the properties you need for queries can lower storage and speed up writes. On the other hand, indexing more properties increases query flexibility but may increase storage and write latency.

> [!NOTE]
> Changes to indexing policies only affect new data and queries after the policy is updated. Existing data is re-indexed in the background.

## How indexing policy changes are applied

When you update an indexing policy, Cosmos DB automatically re-indexes your existing data in the background. This process is online and does not block reads or writes, but the time to complete depends on the size of your data.

## When to customize your indexing policy

- You have write-heavy workloads and want to minimize write latency.
- You only query a subset of properties and want to reduce storage costs.
- You need to support geospatial or composite queries.
- You want to exclude large or rarely queried properties from indexing.

Customizing your indexing policy helps you get the most out of Cosmos DB, ensuring your database is tuned for your application’s needs.

## Next step

> [!div class="nextstepaction"]
> [Customize an indexing policy for a container in Cosmos DB in Microsoft Fabric](how-to-customize-indexing-policy.md)
