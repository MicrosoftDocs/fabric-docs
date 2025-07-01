---
title: Vector database
description: Learn about what vector databases are and how you can use Eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 11/19/2024
ms.search.form: Eventhouse
---
# Vector databases

A vector database stores and manages data in the form of vectors, which are numerical arrays of data points.

The use of vectors allows for complex queries and analyses, because vectors can be compared and analyzed using advanced techniques such as vector similarity search, quantization and clustering.
Traditional databases aren't well-suited for handling the high-dimensional data that is becoming increasingly common in data analytics. However, vector databases are designed to handle high-dimensional data, such as text, images, and audio, by representing them as vectors. Vector databases are useful for tasks such as machine learning, natural language processing, and image recognition, where the goal is to identify patterns or similarities in large datasets.

This article gives some background about vector databases and explains conceptually how you can use an [Eventhouse](eventhouse.md) as a vector database in Real-Time Intelligence in Microsoft Fabric. For a practical example, see [Tutorial: Use an Eventhouse as a vector database](vector-database-eventhouse.md).

## Key concepts

The following key concepts are used in vector databases:

### Vector similarity

Vector similarity is a measure of how different (or similar) two or more vectors are. Vector similarity search is a technique used to find similar vectors in a dataset. Vectors are compared using a distance metric, such as [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) or [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity). The closer two vectors are, the more similar they are.

### Embeddings

Embeddings are a common way of representing data in a vector format for use in vector databases. An embedding is a mathematical representation of a piece of data, such as a word, text document, or an image, that is designed to capture its semantic meaning. Embeddings are created using algorithms that analyze the data and generate a set of numerical values that represent its key features. For example, an embedding for a word might represent its meaning, its context, and its relationship to other words. The process of creating embeddings is straightforward. While they can be created using standard python packages (for example, spaCy, sent2vec, Gensim), Large Language Models (LLM) generate highest quality embeddings for semantic text search. For example, you can send text to an embedding model in [Azure OpenAI](/azure/ai-services/openai/how-to/embeddings), and it generates a vector representation that can be stored for analysis. For more information, see [Understand embeddings in Azure OpenAI Service](/azure/ai-services/openai/concepts/understand-embeddings).

## General workflow

:::image type="content" source="media/vector-database/vector-schematic.png" alt-text="Schematic of how to embed, store, and query text stored as vectors." lightbox="media/vector-database/vector-schematic.png":::

The general workflow for using a vector database is as follows:

1. **Embed data**: Convert data into vector format using an embedding model. For example, you can embed text data using an OpenAI model.
1. **Store vectors**: Store the embedded vectors in a vector database. You can send the embedded data to an Eventhouse to store and manage the vectors.
1. **Embed query**: Convert the query data into vector format using the same embedding model used to embed the stored data.
1. **Query vectors**: Use vector similarity search to find entries in the database that are similar to the query. 

## Eventhouse as a Vector Database

At the core of Vector Similarity Search is the ability to store, index, and query vector data. Eventhouses provide a solution for handling and analyzing large volumes of data, particularly in scenarios requiring real-time analytics and exploration, making it an excellent choice for storing and searching vectors. 

The following components of the enable the use of Eventhouse a vector database:

* The [dynamic](/kusto/query/scalar-data-types/dynamic?view=microsoft-fabric&preserve-view=true) data type, which can store unstructured data such as arrays and property bags. Thus data type is recommended for storing vector values. You can further augment the vector value by storing metadata related to the original object as separate columns in your table.  
* The [encoding](/kusto/management/encoding-policy?view=microsoft-fabric&preserve-view=true) type [`Vector16`](/kusto/management/alter-encoding-policy#encoding-policy-types?view=microsoft-fabric&preserve-view=true) designed for storing vectors of floating-point numbers in 16-bits precision, which uses the `Bfloat16` instead of the default 64 bits. This encoding is recommended for storing ML vector embeddings as it reduces storage requirements by a factor of four and accelerates vector processing functions such as [series_dot_product()](/kusto/query/series-dot-product-function?view=microsoft-fabric&preserve-view=true) and [series_cosine_similarity()](/kusto/query/series-cosine-similarity-function?view=microsoft-fabric&preserve-view=true) by orders of magnitude.
* The [series_cosine_similarity](/kusto/query/series-cosine-similarity-function?view=microsoft-fabric&preserve-view=true) function, which can perform vector similarity searches on top of the vectors stored in Eventhouse.

## Optimize for scale

For more information on optimizing vector similarity search, read the [blog](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/optimizing-vector-similarity-search-on-azure-data-explorer/ba-p/4033082).

To maximize performance and the resulting search times, follow the following steps:

1. Set the encoding of the embeddings column to Vector16, the 16-bit encoding of the vectors coefficients (instead of the default 64-bit).
1. Store the embedding vectors table on all cluster nodes with at least one shard per processor, which is done by the following steps:
    1. Limit the number of embedding vectors per shard by altering the *ShardEngineMaxRowCount* of the [sharding policy](/kusto/management/sharding-policy?view=microsoft-fabric&preserve-view=true). The sharding policy balances data on all nodes with multiple extents per node so the search can use all available processors.
    1. Change the *RowCountUpperBoundForMerge* of the [merging policy](/kusto/management/merge-policy?view=microsoft-fabric&preserve-view=true). The merge policy is needed to suppress merging extents after ingestion.

### Example optimization steps

In the following example, a static vector table is defined for storing 1M vectors. The embedding policy is defined as Vector16, and the sharding and merging policies are set to optimize the table for vector similarity search. For this let's assume the cluster has 20 nodes each has 16 processors. The table’s shards should contain at most 1000000/(20*16)=3125 rows. 

1. The following KQL commands are run one by one to create the empty table and set the required policies and encoding:

    ```kusto
    .create table embedding_vectors(vector_id:long, vector:dynamic)                                  //  This is a sample selection of columns, you can add more columns
    
    .alter column embedding_vectors.vector policy encoding type = 'Vector16'                         // Store the coefficients in 16 bits instead of 64 bits accelerating calculation of dot product, suppress redundant indexing
    
    .alter-merge table embedding_vectors policy sharding '{ "ShardEngineMaxRowCount" : 3125 }'       // Balanced data on all nodes and, multiple extents per node so the search can use all processors 
    
    .alter-merge table embedding_vectors policy merge '{ "RowCountUpperBoundForMerge" : 3125 }'      // Suppress merging extents after ingestion
    ```
  
1. Ingest the data to the table created and defined in the previous step.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Use an Eventhouse as a vector database](vector-database-eventhouse.md)
