---
title: "Tutorial: Use an Eventhouse as a vector database"
description: Learn about how you can use an Eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 07/18/2024
ms.search.form: Eventhouse
---
# Tutorial: Use an Eventhouse as a vector database

In this tutorial, you'll learn how to use an Eventhouse as a vector database to store and query vector data in Real-Time Intelligence. For more information, see [Vector databases](vector-database.md)

The scenario used is semantic searches on top of Wikipedia pages to find commonly themed pages. You generate vectors for tens of thousands of Wikipedia pages by embedding them with an Open AI model and storing the vectors in an Eventhouse, together with some metadata related to the page.

Specifically, in this tutorial you will:

> [!div class="checklist"]
>
> * Create an embedding for the natural language query using the Open AI model.
> * Obtain the embedding vector for the search term from Open AI.
> * Use the [series_cosine_similarity KQL function](/azure/data-explorer/kusto/query/series-cosine-similarity-function) to calculate the similarities between the query embedding vector and those of the wiki pages.
> * Select rows of the highest similarity to get the wiki pages that are most relevant to your search query.

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [eventhouse](create-eventhouse.md) in your workspace
* Azure OpenAI credentials or OpenAI API key. TODO: Choose one
* Download the sample notebooks from the GitHub repository


## Query the similarity

```kusto
WikipediaEmbeddings
| extend similarity = series_cosine_similarity_fl(searched_text_embedding, embedding_title,1,1)
| top 10 by similarity desc 
| project doc_title,doc_url, similarity
```

## Optimize for scale

To optimize the cosine similarity search we need to split the vectors table to many extents that are evenly distributed among all cluster nodes. This can be done by setting Partitioning Policy for the embedding table using the [.alter-merge policy partitioning command](/azure/data-explorer/kusto/management/alter-merge-table-partitioning-policy-command): 

~~~kusto
.alter-merge table WikipediaEmbeddingsTitleD policy partitioning  
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
 In the example above we modified the partitioning policy for WikipediaEmbeddingsTitleD. This table was created from WikipediaEmbeddings by projecting the documents’ title and embeddings.

 

Notes: 

The partitioning process requires a string key with high cardinality, so we also projected the unique `vector_id` and converted it to string.  
The best practice is to create an empty table, modify its partition policy then ingest the data. In that case there is no need to define the old `EffectiveDateTime` as above. 
It takes some time after data ingestion until the policy is applied. 
To test the effect of partitioning we created in a similar manner multiple tables containing up to 1M embedding vectors and tested the cosine similarity performance on clusters with 1, 2, 4, 8 & 20 nodes.

The following chart compares search performance (in seconds) before and after partitioning:

> [!NOTE]
> You may notice that the cluster has 2 nodes, but the tables are stored on a single node. This is the baseline before applying the partitioning policy.

:::image type="content" source="media/vector-database/duration-search.png" alt-text="Graph showing the duration of semantic search in sections as a function of cluster nodes.":::

You can see that even on the smallest 2 nodes cluster the search speed is improved by more than x4 factor, and in general the speed is inversely proportional to the number of nodes. The number of embedding vectors that are needed for common LLM scenarios (for example, Retrieval Augmented Generation) rarely exceeds 100K, thus by having 8 nodes searching can be done in 1 sec.

 