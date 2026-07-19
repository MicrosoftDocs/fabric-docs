---
title: Vector Database
description: Learn about what vector databases are and how you can use Eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.topic: concept-article
ms.date: 06/23/2026
ms.collection: ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.subservice: rti-eventhouse
ms.search.form: Eventhouse
ai-usage: ai-assisted
---

# Vector databases

A vector database stores and manages data in the form of vectors, which are numerical arrays of data points.

Traditional databases aren't well-suited for handling the high-dimensional data that's becoming increasingly common in data analytics. However, vector databases are designed to handle high-dimensional data, such as text, images, and audio, by representing them as vectors. Vector databases are useful for tasks such as machine learning, natural language processing, and image recognition, where the goal is to identify patterns or similarities in large datasets.

This article provides background information about vector databases and explains conceptually how you can use an [Eventhouse](eventhouse.md) as a vector database in Real-Time Intelligence in Microsoft Fabric. For practical examples, see [Tutorial: Use an Eventhouse as a vector database with LLM embeddings](vector-database-eventhouse.md) and [Tutorial: Use an Eventhouse as a vector database with SLM embeddings](vector-database-eventhouse-small-lang-model.md).

## Key concepts

The following key concepts are used in vector databases:

### Vector similarity

Vector similarity is a measure of how different (or similar) two or more vectors are. Vector similarity search is a technique used to find similar vectors in a dataset. You compare vectors by using a distance metric, such as [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) or [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity). The closer two vectors are, the more similar they are.

### Embeddings

Embeddings are a common way of representing data in a vector format for use in vector databases. An embedding is a mathematical representation of a piece of data, such as a word, text document, or an image, that captures its semantic meaning. You create embeddings by using algorithms that analyze the data and generate a set of numerical values that represent its key features. For example, an embedding for a word might represent its meaning, its context, and its relationship to other words.
Embeddings are a common way of representing data in a vector format for use in vector databases. An embedding is a mathematical representation of a piece of data, such as a word, text document, or an image, that captures its semantic meaning. You create embeddings by using algorithms that analyze the data and generate a set of numerical values that represent its key features. For example, an embedding for a word might represent its meaning, its context, and its relationship to other words.
Eventhouse supports two methods for generating embeddings directly in KQL:

* **[ai_embeddings plugin](/kusto/query/ai-embeddings-plugin?view=microsoft-fabric&preserve-view=true)**: Calls an external Azure OpenAI endpoint to generate embeddings by using large language models (LLMs). This method produces the highest quality embeddings and is best suited for production semantic search workloads.

* **[slm_embeddings_fl()](/kusto/functions-library/slm-embeddings-fl?view=microsoft-fabric&preserve-view=true)**: Runs small language models (SLMs) locally within the Kusto Python sandbox, generating embeddings without any external endpoint. This method requires no Azure OpenAI resource and incurs no per-embedding cost.

For more information about embeddings in Azure OpenAI, see [Understand embeddings in Azure OpenAI Service](/azure/ai-services/openai/concepts/understand-embeddings).

#### Choose an embedding method

Use the following table to choose the method that best fits your scenario:

| Consideration | ai_embeddings plugin (LLM) | slm_embeddings_fl() (SLM) |
|---|---|---|
| **Model quality** | Highest quality; uses Azure OpenAI models such as `text-embedding-3-large` | Good quality; uses open-source SLMs such as `harrier-v1-270m`, `jina-v2-small`, and `e5-small-v2` |
| **External dependency** | Requires an Azure OpenAI resource with a deployed embedding model | None; models run locally in the Python sandbox |
| **Cost** | Per-request pricing based on Azure OpenAI usage | No per-embedding cost |
| **Throughput** | Subject to Azure OpenAI rate limits; requires batching and retry logic | Limited only by cluster compute resources; scales naturally with cluster size |
| **Setup** | Requires Azure OpenAI deployment, callout policy configuration, and identity setup | Requires Python plugin enabled and SLM artifacts uploaded to a lakehouse |
| **Max context length** | Depends on the deployed model (for example, 8,192 tokens for `text-embedding-3-large`) | Up to 32,768 tokens with `harrier-v1-270m`, 8,192 with `jina-v2-small` and 512 with and `e5-small-v2` |
| **Best for** | Production semantic search where embedding quality is the top priority | Privacy-sensitive workflows, rapid prototyping, high-volume batch embedding, or scenarios without Azure OpenAI access |

## General workflow

:::image type="content" source="media/vector-database/vector-schematic.png" alt-text="Schematic of how to embed, store, and query text stored as vectors." lightbox="media/vector-database/vector-schematic.png":::

The general workflow for using a vector database is as follows:

1. **Embed data**: Convert data into vector format by using an embedding model.
1. **Store vectors**: Store the embedded vectors in a vector database. You can send the embedded data to an Eventhouse to store and manage the vectors.
1. **Embed query**: Convert the query data into vector format using the same embedding model used to embed the stored data.
1. **Query vectors**: Use vector similarity search to find entries in the database that are similar to the query. 

## Eventhouse as a vector database

At the core of vector similarity search is the ability to store, index, and query vector data. Eventhouses provide a solution for handling and analyzing large volumes of data, particularly in scenarios requiring real-time analytics and exploration. This capability makes Eventhouse an excellent choice for storing and searching vectors. 

The following components of the Eventhouse enable you to use it as a vector database:

* The [dynamic](/kusto/query/scalar-data-types/dynamic?view=microsoft-fabric&preserve-view=true) data type, which can store unstructured data such as arrays and property bags. Use this data type to store vector values. You can further augment the vector value by storing metadata related to the original object as separate columns in your table.  
* The [encoding](/kusto/management/encoding-policy?view=microsoft-fabric&preserve-view=true) type [`Vector16`](/kusto/management/alter-encoding-policy#encoding-policy-types?view=microsoft-fabric&preserve-view=true) designed for storing vectors of floating-point numbers in 16-bit precision. This encoding uses the `Bfloat16` instead of the default 64 bits. Use this encoding to store vector embeddings because it reduces storage requirements by a factor of four and significantly accelerates vector processing functions such as [series_dot_product()](/kusto/query/series-dot-product-function?view=microsoft-fabric&preserve-view=true) and [series_cosine_similarity()](/kusto/query/series-cosine-similarity-function?view=microsoft-fabric&preserve-view=true).
* The [series_cosine_similarity](/kusto/query/series-cosine-similarity-function?view=microsoft-fabric&preserve-view=true) function, which you can use to perform vector similarity searches on top of the vectors stored in Eventhouse.

## Optimize for scale

For more information on optimizing vector similarity search, see the [blog](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/optimizing-vector-similarity-search-on-azure-data-explorer/ba-p/4033082).

To maximize performance and the resulting search times, follow these steps:

1. Set the encoding of the embeddings column to Vector16, the 16-bit encoding of the vectors coefficients (instead of the default 64-bit).
1. Store the embedding vectors table on all cluster nodes with at least one shard per processor. To do this goal, follow these steps:
    1. Limit the number of embedding vectors per shard by altering the *ShardEngineMaxRowCount* of the [sharding policy](/kusto/management/sharding-policy?view=microsoft-fabric&preserve-view=true). This setting spreads your data across all available computing resources for faster searches.
    1. Change the *RowCountUpperBoundForMerge* of the [merging policy](/kusto/management/merge-policy?view=microsoft-fabric&preserve-view=true). The merge policy is needed to suppress merging extents after ingestion.

### Example optimization steps

In the following example, you define a static vector table for storing 1M vectors. You define the embedding policy as Vector16, and set the sharding and merging policies to optimize the table for vector similarity search. For this example, assume the cluster has 20 nodes and each node has 16 processors. The table’s shards should contain at most 1,000,000/(20*16)=3,125 rows. 

1. Run the following KQL commands one by one to create the empty table and set the required policies and encoding:

    ```kusto
    .create table embedding_vectors(vector_id:long, vector:dynamic)                                  //  This is a sample selection of columns, you can add more columns
    
    .alter column embedding_vectors.vector policy encoding type = 'Vector16'                         // Store the coefficients in 16 bits instead of 64 bits accelerating calculation of dot product, suppress redundant indexing
    
    .alter-merge table embedding_vectors policy sharding '{ "ShardEngineMaxRowCount" : 3125 }'       // Balanced data on all nodes and, multiple extents per node so the search can use all processors 
    
    .alter-merge table embedding_vectors policy merge '{ "RowCountUpperBoundForMerge" : 3125 }'      // Suppress merging extents after ingestion
    ```
  
1. Ingest the data to the table created and defined in the previous step.

## Next steps

> [!div class="nextstepaction"]
> [Tutorial: Use an Eventhouse as a vector database with LLM embeddings](vector-database-eventhouse.md)

> [!div class="nextstepaction"]
> [Tutorial: Use an Eventhouse as a vector database with SLM embeddings](vector-database-eventhouse-small-lang-model.md)
