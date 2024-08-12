---
title: Vector database
description: Learn about what vector databases are and how you can use Eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: concept-article
ms.date: 08/11/2024
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

The following components of the Eventhouse architecture enable its use as a vector database:

* The [dynamic](/azure/data-explorer/kusto/query/scalar-data-types/dynamic) data type, which can store unstructured data such as arrays and property bags. Thus data type is recommended for storing vector values. You can further augment the vector value by storing metadata related to the original object as separate columns in your table.  
* The [encoding](/azure/data-explorer/kusto/management/encoding-policy) type [`Vector16`](/azure/data-explorer/kusto/management/alter-encoding-policy#encoding-policy-types) designed for storing vectors of floating-point numbers in 16-bits precision, which uses the `Bfloat16` instead of the default 64 bits. This encoding is recommended for storing ML vector embeddings as it reduces storage requirements by a factor of four and accelerates vector processing functions such as [series_dot_product()](/azure/data-explorer/kusto/query/series-dot-product-function) and [series_cosine_similarity()](/azure/data-explorer/kusto/query/series-cosine-similarity-function) by orders of magnitude.
* The [series_cosine_similarity](/azure/data-explorer/kusto/query/series-cosine-similarity-function) function, which can perform vector similarity searches on top of the vectors stored in Eventhouse.

## Optimize for scale

To optimize the cosine similarity search, you split the vectors table to many extents that are evenly distributed among all cluster nodes. Set the partitioning policy for the embedding table using the [`.alter-merge policy partitioning` command](/azure/data-explorer/kusto/management/alter-merge-table-partitioning-policy-command) as follows:

~~~kusto
.alter-merge table TABLENAME policy partitioning  
``` 
{ 
  "PartitionKeys": [ 
    { 
      "ColumnName": "vector_id_str", 
      "Kind": "Hash", 
      "Properties": { 
        "Function": "XxHash64", 
        "MaxPartitionCount": 2048,      //  set it to max value create smaller partitions thus more balanced spread among all cluster nodes 
        "Seed": 1, 
        "PartitionAssignmentMode": "Uniform" 
      } 
    } 
  ], 
  "EffectiveDateTime": "2000-01-01"     //  set it to old date in order to apply partitioning on existing data 
} 
``` 
~~~

In this example, we modified the partitioning policy a table that contained the wiki pages’ title and embeddings.

The partitioning process requires a string key with high cardinality, so we also projected the unique `vector_id` and converted it to string. The best practice is to create an empty table, modify its partition policy then ingest the data. In that case there's no need to define the old `EffectiveDateTime` as in the previous command. It takes some time after data ingestion until the policy is applied. To test the effect of partitioning, we created in a similar manner multiple tables containing up to 1M embedding vectors and tested the cosine similarity performance on clusters with 1, 2, 4, 8 & 20 nodes.
The following chart compares search performance (in seconds) before and after partitioning:

> [!NOTE]
> You may notice that the cluster has 2 nodes, but the tables are stored on a single node. This is the baseline before applying the partitioning policy.

:::image type="content" source="media/vector-database/duration-search.png" alt-text="Graph showing the duration of semantic search in sections as a function of cluster nodes.":::

Even on the smallest cluster, the search speed improves by more than a factor of four. In general, the speed is inversely proportional to the number of nodes. The number of embedding vectors that are needed for common LLM (Large Language Model) scenarios (for example, Retrieval Augmented Generation) rarely exceeds 100 K, so by having eight nodes searching can be done in 1 sec.

## Next step

> [!div class="nextstepaction"]
> [Tutorial: Use an Eventhouse as a vector database](vector-database-eventhouse.md)
