---
title: "Tutorial: Use an Eventhouse as a vector database"
description: Learn about how you can use an Eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 08/19/2025
ms.search.form: Eventhouse
---
# Tutorial: Use an Eventhouse as a vector database

In this tutorial, you learn how to use an Eventhouse as a vector database to store and query vector data in Real-Time Intelligence. For general information about vector databases, see [Vector databases](vector-database.md).

The given scenario involves the use of semantic searches on Wikipedia pages to find pages with common themes. You use an available sample dataset, which includes vectors for tens of thousands of Wikipedia pages. These pages were embedded with an OpenAI model to produce vectors for each page. The vectors, along with some pertinent metadata related to the page, are then stored in an Eventhouse. You can use this dataset to find pages that are similar to each other, or to find pages that are similar to some theme you want to find. For example, say you want to look up "famous female scientists of the 19th century." You encode this phrase using the same OpenAI model, and then run a vector similarity search over the stored Wikipedia page data to find the pages with the highest semantic similarity.

Specifically, in this tutorial you will:

> [!div class="checklist"]
>
> * Prepare a table in the Eventhouse with `Vector16` encoding for the vector columns.
> * Store vector data from a pre-embedded dataset to an Eventhouse.
> * Embed a natural language query using the Open AI model.
> * Use the [series_cosine_similarity KQL function](/azure/data-explorer/kusto/query/series-cosine-similarity-function) to calculate the similarities between the query embedding vector and those of the wiki pages.
> * View rows of the highest similarity to get the wiki pages that are most relevant to your search query.

This flow can be visualized as follows:

:::image type="content" source="media/vector-database/vector-schematic-condensed.png" alt-text="Schematic of Eventhouse as vector database workflow."  lightbox="media/vector-database/vector-schematic-condensed.png":::

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [eventhouse](create-eventhouse.md) in your workspace
* An [ai-embeddings](/kusto/query/ai-embeddings-plugin?view=fabric&preserve-view=true&tabs=managed-identity) plugin enabled in your eventhouse
* An Azure OpenAI resource with the text-embedding-ada-002 (Version 2) model deployed. This model is currently only available in certain regions. For more information, see [Create a resource](/azure/ai-services/openai/how-to/create-resource).
    * Make sure that local authentication is [enabled](/azure/ai-services/disable-local-auth#re-enable-local-authentication) on your Azure OpenAI resource.
* Download the [sample notebook](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/vector-database-eventhouse-notebook.ipynb) from the GitHub repository

> [!NOTE]
> While this tutorial uses Azure OpenAI, you can use any embedding model provider to generate vectors for text data.

## Prepare your Eventhouse environment

In this setup step, you create a table in an Eventhouse with the necessary columns and encoding policies to store the vector data.

1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select the Eventhouse you created in the prerequisites.
1. Select the target database where you want to store the vector data. If you don't have a database, you can create one by selecting **Add database**.
1. Select **Explore my data**. Copy/paste the following KQL query to create a table with the necessary columns:

    ```kusto
    .create table Wiki (id:string,url:string,['title']:string,text:string,title_vector:dynamic,content_vector:dynamic,vector_id:long)
    ```

1. Copy/paste the following commands to set the encoding policy of the vector columns. Run these commands sequentially.

    ```kusto
    .alter column Wiki.title_vector policy encoding type='Vector16'

    .alter column Wiki.content_vector policy encoding type='Vector16'
    ```

## Write vector data to an Eventhouse

The following steps are used to import the embedded Wikipedia data and write it in an Eventhouse:

### Import notebook

1. Download the sample notebook from the [GitHub repository](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/vector-database-eventhouse-notebook.ipynb).
1. Browse to your Fabric environment. In the experience switcher, choose **Fabric** and then your workspace.
1. Select **Import** > **Notebook** >  **From this computer** > **Upload** then choose the notebook you downloaded in a previous step.
1. Once the import is complete, open the imported notebook from your workspace.

### Write data to the Eventhouse

1. Run the cells to set up your environment.

    ```python
    %%configure -f
    {"conf":
        {
            "spark.rpc.message.maxSize": "1024"
        }
    }
    ```
    
    ```python
    %pip install wget
    ```
    
    ```python
    %pip install openai
    ```
      
1. Run the cells to download the precomputed embeddings.

    ```python
    import wget
    
    embeddings_url = "https://cdn.openai.com/API/examples/data/vector_database_wikipedia_articles_embedded.zip"
    
    # The file is ~700 MB so it might take some time
    wget.download(embeddings_url)
    ```
    
    ```python
    import zipfile
    
    with zipfile.ZipFile("vector_database_wikipedia_articles_embedded.zip","r") as zip_ref:
        zip_ref.extractall("/lakehouse/default/Files/data")
    ```
    
    ```python
    import pandas as pd
    
    from ast import literal_eval
    
    article_df = pd.read_csv('/lakehouse/default/Files/data/vector_database_wikipedia_articles_embedded.csv')
    # Read vectors from strings back into a list
    article_df["title_vector"] = article_df.title_vector.apply(literal_eval)
    article_df["content_vector"] = article_df.content_vector.apply(literal_eval)
    article_df.head()
    ```

1. To write to the eventhouse, enter your Cluster URI, which can be found on the [system overview page](manage-monitor-eventhouse.md#view-system-overview), and the name of the database. The table is created in the notebook and later referenced in the query.

    ```python
    # replace with your Eventhouse Cluster URI, Database name, and Table name
    KUSTO_CLUSTER =  "Eventhouse Cluster URI"
    KUSTO_DATABASE = "Database name"
    KUSTO_TABLE = "Wiki"
    ```

1. Run the remaining cells to write the data to the Eventhouse. This operation can take some time to execute.

    ```python
    kustoOptions = {"kustoCluster": KUSTO_CLUSTER, "kustoDatabase" :KUSTO_DATABASE, "kustoTable" : KUSTO_TABLE }
    
    access_token=mssparkutils.credentials.getToken(kustoOptions["kustoCluster"])
    ```

    ```python
    #Pandas data frame to spark dataframe
    sparkDF=spark.createDataFrame(article_df)
    ```

    ```python
    # Write data to a table in Eventhouse
    sparkDF.write. \
    format("com.microsoft.kusto.spark.synapse.datasource"). \
    option("kustoCluster",kustoOptions["kustoCluster"]). \
    option("kustoDatabase",kustoOptions["kustoDatabase"]). \
    option("kustoTable", kustoOptions["kustoTable"]). \
    option("accessToken", access_token). \
    option("tableCreateOptions", "CreateIfNotExist").\
    mode("Append"). \
    save()
    ```

### View the data in the Eventhouse

At this point, you can verify the data was written to the eventhouse by browsing to the database details page.

1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select the database item that was provided in the previous section. You should see a summary of the data that was written to the "Wiki" table.

## Generate embedding for the search term

Now that you stored the embedded wiki data in your eventhouse, you can use this data as a reference to find pages on a particular article. In order to make the comparison, you embed the search term, and then do a comparison between the search term and the Wikipedia pages.

To successfully make a call against Azure OpenAI, you need an endpoint and deployment ID.

| Variable name | Value |
|---|---|
| endpoint |This value can be found in the **Keys & Endpoint** section when examining your resource from the [Azure portal](https://ms.portal.azure.com/). Alternatively, you can find the value in the **[Azure AI Foundry](https://oai.azure.com/) > Playground > Code View**. An example endpoint is: `https://docs-test-001.openai.azure.com/`. |
| deployment ID | This value can be found under the **Deployments** section in the [Azure AI Foundry](https://oai.azure.com/). |

Use the information in the table when running the Azure OpenAI cells.

```kusto
let model_endpoint = 'https://deployment-name.openai.azure.com/openai/deployments/kusto-text-embedding-ada-002/embeddings?api-version=2024-10-21;impersonate';
let searchedEmbedding = toscalar(evaluate ai_embeddings("most difficult gymnastics moves in the olympics", model_endpoint));
print(searchedEmbedding)
```

## Query the similarity

The query is run directly in the Eventhouse, and uses the returned embedding from the previous step in a comparison against the embedded Wikipedia pages stored in your eventhouse. This query uses the [cosine similarity function](/azure/data-explorer/kusto/query/series-cosine-similarity-function) and returns the top 10 most similar vectors.

Run the KQL query to see the results. You can change the search term and rerun the query to see different results. You could also compare an existing entry in the Wiki database to find similar entries.

```kusto
let model_endpoint = 'https://deployment-name.openai.azure.com/openai/deployments/kusto-text-embedding-ada-002/embeddings?api-version=2024-10-21;impersonate';
//
Wiki
| extend similarity = series_cosine_similarity(searchedEmbedding, content_vector)
| top 10 by similarity desc
```

<!--
:::image type="content" source="media/vector-database/similarity-results.png" alt-text="Screenshot of running cell of similarity results." lightbox="media/vector-database/similarity-results.png":::
-->

## Clean up resources

When you finish the tutorial, you can delete the resources, you created to avoid incurring other costs. To delete the resources, follow these steps:

1. Browse to your workspace homepage.
1. Delete the notebook created in this tutorial.
1. Delete the Eventhouse or [database](manage-monitor-database.md#manage-kql-databases) used in this tutorial.
