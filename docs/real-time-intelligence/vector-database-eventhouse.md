---
title: "Tutorial: Use an Eventhouse as a vector database"
description: Learn about how you can use an Eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 08/11/2024
ms.search.form: Eventhouse
---
# Tutorial: Use an Eventhouse as a vector database

In this tutorial, you learn how to use an Eventhouse as a vector database to store and query vector data in Real-Time Intelligence. For general information about vector databases, see [Vector databases](vector-database.md)

The given scenario involves the use of semantic searches on Wikipedia pages to find pages with common themes. You use an available sample dataset, which includes vectors for tens of thousands of Wikipedia pages. These pages have already been embedded with an OpenAI model to produce vectors for each page. The vectors, along with some pertinent metadata related to the page, are then stored in an Eventhouse. You can use this dataset to find pages that are similar to each other, or to find pages that are similar to some theme you want to find. For example, say you want to look up "famous female scientists of the 19th century," you encode this phrase using the same OpenAI model, and then run a vector similarity search over the stored Wikipedia page data to find the pages with the highest semantic similarity.

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
1. Select **Import notebook** > **Upload**, and choose the upload you downloaded in a previous step. :::image type="icon" source="media/vector-database/import-notebook.png" border="false":::
1. Open the imported notebook item.

### Write data to the Eventhouse

1. Run the cells to set up your environment.

  
1. Run the cells to download the precomputed embeddings.

      :::image type="content" source="media/vector-database/precomputed-embeddings.png" alt-text="Screenshot of running the precomputed embeddings cell in the notebook.":::

1. To write to the eventhouse, enter your Cluster URI, which can be found on the [system overview page](manage-monitor-eventhouse.md#view-system-overview-details-for-an-eventhouse), and the name of the database. The table is created in the notebook and later referenced in the query.

    ```python
    # replace with your Eventhouse Cluster URI, Database name, and Table name
    KUSTO_CLUSTER =  "Eventhouse Cluster URI"
    KUSTO_DATABASE = "Database name"
    KUSTO_TABLE = "Wiki"
    ```

1. Run the remaining cells to write the data to the Eventhouse. This can take some time to execute.

### View the data in the Eventhouse

At this point, you can verify the data was written to the eventhouse by browsing to the database details page.
1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select the database item that was provided in the previous section. You should see a summary of the data that was written to the "Wiki" table:

    :::image type="content" source="media/vector-database/database-with-data.png" alt-text="Screenshot of database details page with data ingested from the embedded sample data.":::

## Generate embedding for the search term

Now that you stored the embedded wiki data in your eventhouse, you can use this data as a reference to find pages on a particular article. In order to make the comparison, you embed the search term, and then do a comparison between the search term and the Wikipedia pages.

To successfully make a call against Azure OpenAI, you need an endpoint, key, and deployment ID.

| Variable name	| Value |
|---|---|
| endpoint	|This value can be found in the **Keys & Endpoint** section when examining your resource from the [Azure portal](https://ms.portal.azure.com/). Alternatively, you can find the value in the **[Azure OpenAI Studio](https://oai.azure.com/) > Playground > Code View**. An example endpoint is: `https://docs-test-001.openai.azure.com/`. |
| api key |	This value can be found in the **Keys & Endpoint** section when examining your resource from the [Azure portal](https://ms.portal.azure.com/). You can use either KEY1 or KEY2. |
| deployment id | This value can be found under the **Deployments** section in the [Azure OpenAI Studio](https://oai.azure.com/). |

Use the information in the table when running the Azure OpenAI cells.

> [!IMPORTANT]
> Key-based authentication must be enabled on your resource in order to use the API key.

## Query the similarity

The query is run directly from the notebook, and uses the returned embedding from the previous step in a comparison against the embedded Wikipedia pages stored in your eventhouse. This query uses the [cosine similarity function](/azure/data-explorer/kusto/query/series-cosine-similarity-function) and returns the top 10 most similar vectors.

Run the cells in the notebook to see the results of the query. You can change the search term and rerun the query to see different results. You could also compare an existing entry in the Wiki database to find similar entries.

:::image type="content" source="media/vector-database/similarity-results.png" alt-text="Screenshot of running cell of similarity results" lightbox="media/vector-database/similarity-results.png":::

## Optimize for scale

To optimize the cosine similarity search, you split the vectors table to many extents that are evenly distributed among all cluster nodes. Set the partitioning policy for the embedding table using the [`.alter-merge policy partitioning` command](/azure/data-explorer/kusto/management/alter-merge-table-partitioning-policy-command) as follows:

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

In this example, we modified the partitioning policy for WikipediaEmbeddingsTitleD. This table was created from Wiki by projecting the documents’ title and embeddings.

The partitioning process requires a string key with high cardinality, so we also projected the unique `vector_id` and converted it to string. The best practice is to create an empty table, modify its partition policy then ingest the data. In that case there's no need to define the old `EffectiveDateTime` as in the previous command. It takes some time after data ingestion until the policy is applied. To test the effect of partitioning, we created in a similar manner multiple tables containing up to 1M embedding vectors and tested the cosine similarity performance on clusters with 1, 2, 4, 8 & 20 nodes.
The following chart compares search performance (in seconds) before and after partitioning:

> [!NOTE]
> You may notice that the cluster has 2 nodes, but the tables are stored on a single node. This is the baseline before applying the partitioning policy.

:::image type="content" source="media/vector-database/duration-search.png" alt-text="Graph showing the duration of semantic search in sections as a function of cluster nodes.":::

Even on the smallest cluster, the search speed improves by more than a factor of four. In general, the speed is inversely proportional to the number of nodes. The number of embedding vectors that are needed for common LLM (Large Language Model) scenarios (for example, Retrieval Augmented Generation) rarely exceeds 100 K, so by having eight nodes searching can be done in 1 sec.

## Clean up resources

When you're done with the tutorial, you can delete the resources you created to avoid incurring additional costs. To delete the resources, follow these steps:

1. Delete the notebook from the Real-Time Intelligence experience.
1. Delete the Eventhouse from the Real-Time Intelligence experience.