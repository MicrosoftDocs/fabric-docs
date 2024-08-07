---
title: "Tutorial: Use an Eventhouse as a vector database"
description: Learn about how you can use an Eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 08/05/2024
ms.search.form: Eventhouse
---
# Tutorial: Use an Eventhouse as a vector database

In this tutorial, you'll learn how to use an Eventhouse as a vector database to store and query vector data in Real-Time Intelligence. For general information about vector databases, see [Vector databases](vector-database.md)

The given scenario involves the use of semantic searches on Wikipedia pages to find pages with common themes. You use an available sample dataset, which includes vectors for tens of thousands of Wikipedia pages. These pages have already been embedded with an Open AI model to produce vectors for each page. The vectors, along with some pertinent metadata related to the page, are then stored in an Eventhouse. This dataset could be used to find pages which are similar to each other, or to find pages that are similar to some theme you want to find. For example, say you want to look up "famous female scientists of the 19th century". You encode this phrase using the same Open AI model, and then run a vector similarity search over the stored Wikipedia page data to find the pages with the highest semantic similarity.

Specifically, in this tutorial you will:

> [!div class="checklist"]
>
> * Store vector data from a pre-embedded dataset to an Eventhouse.
> * Embed afor a natural language query using the Open AI model.
> * Use the [series_cosine_similarity KQL function](/azure/data-explorer/kusto/query/series-cosine-similarity-function) to calculate the similarities between the query embedding vector and those of the wiki pages.
> * View rows of the highest similarity to get the wiki pages that are most relevant to your search query.

This flow can be visualized as follows:

:::image type="content" source="media/vector-database/vector-schematic-condensed.png" alt-text="Schematic of Eventhouse as vector database workflow."  lightbox="media/vector-database/vector-schematic-condensed.png":::

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [eventhouse](create-eventhouse.md) in your workspace
* An Azure OpenAI resource with the text-embedding-ada-002 (Version 2) model deployed. This model is currently only available in certain regions. For more information, see [Create a resource](/azure/ai-services/openai/how-to/create-resource).
* Download the sample notebook from the GitHub repository

## Write vector data to an Eventhouse

The following steps are used to import the embedded Wikipedia data and write it in an Eventhouse:

### Import notebook

1. Download the sample notebook from the [GitHub repository]().
1. Browse to your Fabric envrionment. In the experience switcher, choose **Data Engineering**.
1. Select **Import notebook** > **Upload**, and choose the upload you've downloaded in a previous step. :::image type="icon" source="media/vector-database/import-notebook.png" border="false":::
1. Open the imported notebook item.

### Write data to the Eventhouse

1. Run the cells to set up your environment.
1. Run the cells to download the precomputed embeddings.
1. To write to the eventhouse, enter your Cluster URI, which can be found on the [system overview page](manage-monitor-eventhouse.md#view-system-overview-details-for-an-eventhouse), and the name of the database.
1. Run the remaining cells to write the data to the Eventhouse.

### View the data in the Eventhouse

At this point, you can verify the data has been written to the eventhouse by browsing to the database details page. 
1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select the database item which was provided in the previous section. You should see a summary of the data that has just been written to the "Wiki" table:

    :::image type="content" source="media/vector-database/database-with-data.png" alt-text="Screenshot of database details page with data ingested from the embedded sample data.":::

## Generate embedding for the search term

Now that you have stored the embedded wiki data in your eventhouse, you can use this as a reference to find pages on a particular topic. In order to make the comparison, you embed the search term, and will then do a comparison between the search term and the wikipedia pages.

To successfully make a call against Azure OpenAI, you need an endpoint, key, and deployment ID.

| Variable name	| Value |
|---|---|
| endpoint	|This value can be found in the **Keys & Endpoint** section when examining your resource from the [Azure portal](https://ms.portal.azure.com/). Alternatively, you can find the value in the **[Azure OpenAI Studio](https://oai.azure.com/) > Playground > Code View**. An example endpoint is: https://docs-test-001.openai.azure.com/. |
| api key |	This value can be found in the **Keys & Endpoint** section when examining your resource from the [Azure portal](https://ms.portal.azure.com/). You can use either KEY1 or KEY2. |
| deployment id | This value can be found under the **Deployments** section in the [Azure OpenAI Studio](https://oai.azure.com/). |

1. Use the above information when running the Azure Open AI cells. 

## Query the similarity

The query is run directly from the notebook, and uses the returned embedding from the previous step in a comparison against the embedded Wikipedia pages stored in your eventhouse. This query uses the [cosine similarity function](/azure/data-explorer/kusto/query/series-cosine-similarity-function) and returns the top 10 most similar vectors.

Run the cells in the notebook to see the results of the query. 

## Optimize for scale

To optimize the cosine similarity search, you split the vectors table to many extents that are evenly distributed among all cluster nodes. This can be done by setting partitioning policy for the embedding table using the [.alter-merge policy partitioning command](/azure/data-explorer/kusto/management/alter-merge-table-partitioning-policy-command) as follows:

1. Browse to your database in the Real-Time Intelligence experience.
1. Select **Explore your data**, and copy/paste the following command:

NOTE FOR ANSHUL: CAN YOU GIVE ME A COMMAND TO CREATE THIS TABLE?

    ~~~kusto
    .alter-merge table WikipediaEmbeddings policy partitioning  
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

In the example above we modified the partitioning policy for WikipediaEmbeddingsTitleD. This table was created from Wiki by projecting the documents’ title and embeddings.

The partitioning process requires a string key with high cardinality, so we also projected the unique `vector_id` and converted it to string. The best practice is to create an empty table, modify its partition policy then ingest the data. In that case there is no need to define the old `EffectiveDateTime` as above. It takes some time after data ingestion until the policy is applied.  To test the effect of partitioning we created in a similar manner multiple tables containing up to 1M embedding vectors and tested the cosine similarity performance on clusters with 1, 2, 4, 8 & 20 nodes.
The following chart compares search performance (in seconds) before and after partitioning:

> [!NOTE]
> You may notice that the cluster has 2 nodes, but the tables are stored on a single node. This is the baseline before applying the partitioning policy.

    :::image type="content" source="media/vector-database/duration-search.png" alt-text="Graph showing the duration of semantic search in sections as a function of cluster nodes.":::

You can see that even on the smallest 2 nodes cluster the search speed is improved by more than x4 factor, and in general the speed is inversely proportional to the number of nodes. The number of embedding vectors that are needed for common LLM scenarios (for example, Retrieval Augmented Generation) rarely exceeds 100K, thus by having 8 nodes searching can be done in 1 sec.

 