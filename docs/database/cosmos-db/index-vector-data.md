---
title: Index Vector Data in Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Explore how to index vector data in your Cosmos DB database within Microsoft Fabric during the preview, including setup and optimization tips.
author: seesharprun
ms.author: sidandrews
ms.topic: concept-article
ms.date: 07/17/2025
ms.search.form: Databases replication to OneLake,Integrate Cosmos DB with other services
show_latex: true
appliesto:
- ✅ Cosmos DB in Fabric
---

# Index vector data in Cosmos DB in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric now offers efficient vector indexing and search. This feature is designed to handle multi-modal, high-dimensional vectors, enabling efficient and accurate vector search at any scale. You can now store vectors directly in the documents alongside your data. Each document in your database can contain not only traditional schema-free data, but also multi-modal high-dimensional vectors as other properties of the documents. This colocation of data and vectors allows for efficient indexing and searching, as the vectors are stored in the same logical unit as the data they represent. Keeping vectors and data together simplifies data management, AI application architectures, and the efficiency of vector-based operations.

Cosmos DB in Fabric offers the flexibility it offers in choosing the vector indexing method:

- A "flat" or k-nearest neighbors exact search (sometimes called brute-force) can provide 100% retrieval recall for smaller, focused vector searches. especially when combined with query filters and partition-keys.

- A quantized flat index that compresses vectors using DiskANN-based quantization methods for better efficiency in the kNN search.

- DiskANN, a suite of state-of-the-art vector indexing algorithms developed by Microsoft Research to power efficient, high accuracy multi-modal vector search at any scale.

Vector search in Cosmos DB can be combined with all other supported NoSQL query filters and indexes using `WHERE` clauses. This combination enables your vector searches to be the most relevant data to your applications.

This feature enhances the core capabilities of Cosmos DB, making it more versatile for handling vector data and search requirements in AI applications.

## What is a vector store?

A vector store or vector database is a database designed to store and manage vector embeddings, which are mathematical representations of data in a high-dimensional space. In this space, each dimension corresponds to a feature of the data, and tens of thousands of dimensions might be used to represent sophisticated data. A vector's position in this space represents its characteristics. Words, phrases, or entire documents, and images, audio, and other types of data can all be vectorized.

## How does a vector store work?

In a vector store, vector search algorithms are used to index and query embeddings. Some well-known vector search algorithms include Hierarchical Navigable Small World (HNSW), Inverted File (IVF), DiskANN, etc. Vector search is a method that helps you find similar items based on their data characteristics rather than by exact matches on a property field. This technique is useful in applications such as searching for similar text, finding related images, making recommendations, or even detecting anomalies. It's used to query the [vector embeddings](/azure/ai-services/openai/concepts/understand-embeddings) of your data that you created by using a machine learning model by using an embeddings API. Examples of embeddings APIs are [Azure OpenAI Embeddings](/azure/ai-services/openai/how-to/embeddings) or [Hugging Face on Azure](https://azure.microsoft.com/solutions/hugging-face-on-azure/). Vector search measures the distance between the data vectors and your query vector. The data vectors that are closest to your query vector are the ones that are found to be most similar semantically.

In the Integrated Vector Database in Cosmos DB in Fabric, embeddings can be stored, indexed, and queried alongside the original data. This approach eliminates the extra cost of replicating data in a separate pure vector database. Moreover, this architecture keeps the vector embeddings and original data together, which better facilitates multi-modal data operations, and enables greater data consistency, scale, and performance.

## Container vector policies

Performing vector search with Cosmos DB in Fabric requires you to define a vector policy for the container. This policy provides essential information for the database engine to conduct efficient similarity search for vectors found in the container's documents. This configuration also informs the vector indexing policy of necessary information, should you choose to specify one. The following information is included in the contained vector policy:

- `path`: the property containing the vector (required).

- `datatype`: the data type of the vector property. Supported types are `float32` (default), `int8`, and `uint8`.

- `dimensions`: The dimensionality or length of each vector in the path. All vectors in a path should have the same number of dimensions. (default `1536`).

- `distanceFunction`: The metric used to compute distance/similarity. Supported metrics are:

  - [`cosine`](https://en.wikipedia.org/wiki/Cosine_similarity), which has values from $-1$ (least similar) to $+1$ (most similar).

  - [`dot product`](https://en.wikipedia.org/wiki/Dot_product), which has values from $-\infty$ (least similar) to $+\infty$ (most similar).

  - [`euclidean`](https://en.wikipedia.org/wiki/Euclidean_distance), which has values from $0$ (most similar) to $+\infty$ (least similar).

> [!NOTE]
> Each unique path can have at most one policy. However, multiple policies can be specified if they all target a different path.

The container vector policy can be described as JSON objects. Here are two examples of valid container vector policies:

### A policy with a single vector path

```json
{
  "vectorEmbeddings": [
    {
      "path": "/vector1",
      "dataType": "float32",
      "distanceFunction": "cosine",
      "dimensions": 1536
    }
  ]
}
```

### A policy with two vector paths

```json
{
  "vectorEmbeddings": [
    {
      "path": "/vector1",
      "dataType": "float32",
      "distanceFunction": "cosine",
      "dimensions": 1536
    },
    {
      "path": "/vector2",
      "dataType": "int8",
      "distanceFunction": "dotproduct",
      "dimensions": 100
    }
  ]
}
```

For more information and examples of settings a container vector policy, see [vector indexing policy samples](sample-indexing-policies.md#vector-indexing-policy).

## Vector indexing policies

**Vector** indexes increase the efficiency when performing vector searches using the `VectorDistance` system function. Vectors searches have lower latency, higher throughput, and less RU consumption when using a vector index. You can specify these types of vector index policies:

| | Description | Max dimensions |
| --- | --- |
| **`flat`** | Stores vectors on the same index as other indexed properties. | 505 |
| **`quantizedFlat`** | Quantizes (compresses) vectors before storing on the index. This policy can improve latency and throughput at the cost of a small amount of accuracy. | 4096 |
| **`diskANN`** | Creates an index based on DiskANN for fast and efficient approximate search. | 4096 |

> [!NOTE]
> The `quantizedFlat` and `diskANN` indexes requires that at least **1,000 vectors** to be inserted. This minimum is to ensure accuracy of the quantization process. If there are fewer than 1,000 vectors, a full scan is executed instead and leads to higher RU charges for a vector search query.

A few points to note:

- The `flat` and `quantizedFlat` index types use Cosmos DB's index to store and read each vector during a vector search. Vector searches with a `flat` index are brute-force searches and produce 100% accuracy or recall. That is, they're guaranteed to find the most similar vectors in the dataset. However, a limitation exists of `505` dimensions for vectors on a flat index.

- The `quantizedFlat` index stores quantized (compressed) vectors on the index. Vector searches with `quantizedFlat` index are also brute-force searches, however their accuracy might be slightly less than 100% since the vectors are quantized before adding to the index. However, vector searches with `quantized flat` should have lower latency, higher throughput, and lower RU cost than vector searches on a `flat` index. This index is a good option for smaller scenarios, or scenarios where you're using query filters to narrow down the vector search to a relatively small set of vectors. `quantizedFlat` is recommended when the number of vectors to be indexed is somewhere around 50,000 or fewer per physical partition. However, this recommendation is just a general guideline and actual performance should be tested as each scenario can be different.

- The `diskANN` index is a separate index defined specifically for vectors using [DiskANN](https://www.microsoft.com/research/publication/diskann-fast-accurate-billion-point-nearest-neighbor-search-on-a-single-node/), a suite of high performance vector indexing algorithms developed by Microsoft Research. DiskANN indexes can offer some of the lowest latency, highest throughput, and lowest RU cost queries, while still maintaining high accuracy. In general, DiskANN is the most performant of all index types if there are more than 50,000 vectors per physical partition.

Here are examples of valid vector index policies:

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
      "path": "/_etag/?"
    },
    {
      "path": "/vector1/*"
    }
  ],
  "vectorIndexes": [
    {
      "path": "/vector1",
      "type": "diskANN"
    }
  ]
}
```

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
      "path": "/_etag/?"
    },
    {
      "path": "/vector1/*",
    },
    {
      "path": "/vector2/*",
    }
  ],
  "vectorIndexes": [
    {
      "path": "/vector1",
      "type": "quantizedFlat"
    },
    {
      "path": "/vector2",
      "type": "diskANN"
    }
  ]
}
```

> [!IMPORTANT]
> The vector path added to the `excludedPaths` section of the indexing policy to ensure optimized performance for insertion. Not adding the vector path to `excludedPaths` results in higher request unit charge and latency for vector insertions.

> [!IMPORTANT]
> Wild card characters (`*`, `[]`) aren't currently supported in the vector policy or vector index.

## Perform vector search with queries using `VECTORDISTANCE`

Once you created a container with the desired vector policy, and inserted vector data into the container, you can conduct a vector search using the [built-in `VECTORDISTANCE` function](/nosql/query/vectordistance) in a query. An example of a NoSQL query that projects the similarity score as the alias `score`, and sorts in order of most-similar to least-similar:

```nosql
SELECT TOP 10
  c.title,
  VECTORDISTANCE(c.contentVector, [1,2,3]) AS score 
FROM
  container c
ORDER BY
  VECTORDISTANCE(c.contentVector, [1,2,3])   
```

> [!IMPORTANT]
> Always use a `TOP N` clause in the `SELECT` statement of a query. Otherwise the vector search tries to return many more results causing the query to cost more request units (RUs) and have higher latency than necessary.

## Related content

- [Learn about indexing policies in Cosmos DB in Fabric](indexing-policies.md)
- [Use full-text indexing in Cosmos DB in Fabric](full-text-indexing.md)
- [Use hybrid-search in Cosmos DB in Fabric](hybrid-search.md)
- [Review sample indexing policies](sample-indexing-policies.md)
