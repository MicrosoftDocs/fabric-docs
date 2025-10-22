---
title: Sample indexing policies in Cosmos DB Database
titleSuffix: Microsoft Fabric
description: Explore sample custom indexing policies that fine tune the performance of Cosmos DB in Microsoft Fabric during the preview.
author: seesharprun
ms.author: sidandrews
ms.topic: sample
ms.date: 07/14/2025
ai-usage: ai-generated
appliesto:
- ✅ Cosmos DB in Fabric
---

# Sample indexing policies in Cosmos DB in Microsoft Fabric

Indexing in Cosmos DB is designed to deliver fast and flexible query performance, no matter how your data evolves. Explore these sample indexing policies to see how you can tailor indexing to your workload in Cosmos DB. Each sample demonstrates a different way to control which properties are indexed, how, and why.

## Index all properties (default)

This policy indexes every property in every item, which is the default behavior. It provides maximum query flexibility.

```json
{
  "indexingMode": "consistent",
  "includedPaths": [ { "path": "/*" } ],
  "excludedPaths": []
}
```

## Exclude a property from indexing

This policy indexes all properties except for a specific property, reducing storage and write costs if you don’t need to query that property.

```json
{
  "indexingMode": "consistent",
  "includedPaths": [ { "path": "/*" } ],
  "excludedPaths": [ { "path": "/nonIndexedProperty/?" } ]
}
```

## Only index specific properties

This policy only performs indexing of the properties you specify, which can improve write performance and reduce storage if you only query a subset of your data.

```json
{
  "indexingMode": "consistent",
  "includedPaths": [
    { "path": "/name/?" },
    { "path": "/address/city/?" }
  ],
  "excludedPaths": [ { "path": "/*" } ]
}
```

## Use range and spatial indexes

This policy demonstrates how to use different index types for different properties, such as range indexes for numbers and spatial indexes for geospatial data.

```json
{
  "indexingMode": "consistent",
  "includedPaths": [
    {
      "path": "/location/?",
      "indexes": [
        { "kind": "Spatial", "dataType": "Point" }
      ]
    },
    {
      "path": "/age/?",
      "indexes": [
        { "kind": "Range", "dataType": "Number", "precision": -1 }
      ]
    }
  ],
  "excludedPaths": [ { "path": "/*" } ]
}
```

## Use composite indexes

This policy adds a composite index to optimize queries that filter or sort on multiple properties together.

```json
{
  "indexingMode": "consistent",
  "includedPaths": [ { "path": "/*" } ],
  "excludedPaths": [],
  "compositeIndexes": [
    [
      { "path": "/category/?", "order": "ascending" },
      { "path": "/timestamp/?", "order": "descending" }
    ]
  ]
}
```

## Disable indexing

This policy disables indexing for the container, which is useful for write-heavy workloads where you don’t need to query the data.

```json
{
  "indexingMode": "none"
}
```


## Vector indexing policy

This policy enables vector indexing on the `/vector` property, allowing efficient similarity searches using cosine distance on three-dimensional `float32` vectors.

```json
{
  "vectorEmbeddings": [
    {
      "path": "/vector",
      "dataType": "float32",
      "distanceFunction": "cosine",
      "dimensions": 3
    },
  ]
}
```

## Full text indexing policy

This policy configures the `/text` property for full text search using English language analysis, allowing efficient text search queries.

```json
{
  "defaultLanguage": "en-US",
  "fullTextPaths": [
    {
      "path": "/text",
      "language": "en-US"
    }
  ]
}
```

## Full text indexing with excluded system property

This policy enables full text indexing on the `/text` property while excluding the system property `_etag` from indexing.

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

## Full text indexing on multiple properties

This policy enables full text indexing on both the `/text1` and `/text2` properties using English language analysis, allowing efficient text search queries across multiple fields.

```json
{
  "defaultLanguage": "en-US",
  "fullTextPaths": [
    {
      "path": "/text1",
      "language": "en-US"
    },
    {
      "path": "/text2",
      "language": "en-US"
    }
  ]
}
```

## Sample full text and vector policy for hybrid search

This policy combines full text and vector indexing to enable hybrid search capabilities, allowing efficient text and vector similarity queries within the same container.

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
    {
      "path": "/vector/*"
    }
  ],
  "fullTextIndexes": [
    {
      "path": "/text"
    }
  ],
  "vectorIndexes": [
    {
      "path": "/vector",
      "type": "DiskANN"
    }
  ]
}
```

## Related content

- [Review indexing policies in Cosmos DB in Microsoft Fabric](indexing-policies.md)
- [Configure a Cosmos DB database container in Microsoft Fabric](how-to-configure-container.md)