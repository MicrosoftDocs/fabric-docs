---
title: "Tutorial: Use an eventhouse as a vector database with LLM embeddings"
description: Learn about how you can use an eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.topic: tutorial
ms.date: 06/03/2026
ms.subservice: rti-eventhouse
ms.search.form: eventhouse
ai-usage: ai-assisted
---
# Tutorial: Use an eventhouse as a vector database with LLM embeddings

In this tutorial, you learn how to use an eventhouse as a vector database to store and query vector data in Real-Time Intelligence. For general information about vector databases, see [Vector databases](vector-database.md).

The given scenario involves the use of semantic searches on Wikipedia pages to find pages with common themes. You use an available sample dataset, which includes vectors for tens of thousands of Wikipedia pages. These pages are embedded with an OpenAI model to produce vectors for each page. You store the vectors, along with some pertinent metadata related to the page, in an eventhouse. You can use this dataset to find pages that are similar to each other, or to find pages that are similar to some theme you want to find. For example, say you want to look up "famous female scientists of the 19th century." You encode this phrase using the same OpenAI model, and then run a vector similarity search over the stored Wikipedia page data to find the pages with the highest semantic similarity.

Specifically, in this tutorial you:

> [!div class="checklist"]
>
> * Prepare a table in the eventhouse with `Vector16` encoding for the vector columns.
> * Store vector data from a pre-embedded dataset to an eventhouse.
> * Embed a natural language query by using the OpenAI model.
> * Use the [series_cosine_similarity KQL function](/azure/data-explorer/kusto/query/series-cosine-similarity-function) to calculate the similarities between the query embedding vector and those of the wiki pages.
> * View rows of the highest similarity to get the wiki pages that are most relevant to your search query.

You can visualize this flow as follows:

:::image type="content" source="media/vector-database/vector-schematic-condensed.png" alt-text="Schematic of eventhouse as vector database workflow."  lightbox="media/vector-database/vector-schematic-condensed.png":::

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* An [eventhouse](create-eventhouse.md) in your workspace.
* An Azure OpenAI resource with the text-embedding-ada-002 (Version 2) model deployed. This model is currently only available in certain regions. For more information, see [Create a resource](/azure/ai-services/openai/how-to/create-resource).
* Download the [sample notebook](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/vector-database-eventhouse-notebook.ipynb) from the GitHub repository. The notebook is used to ingest the pre-embedded Wikipedia dataset regardless of which embedding approach you use for querying.
* For the **KQL queryset** approach only: the [ai_embeddings plugin](/kusto/query/ai-embeddings-plugin?view=microsoft-fabric&preserve-view=true) configured with a callout policy and managed identity on your eventhouse.

## Prepare your eventhouse environment

In this setup step, you create a table in an eventhouse with the necessary columns and encoding policies to store the vector data.

1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select the eventhouse you created in the prerequisites.
1. Select the target database where you want to store the vector data. If you don't have a database, create one by selecting **Add database**.
1. Expand the database tree, select the embedded **queryset**, and copy and paste the following KQL query to create a table called **Wiki** with the necessary columns:

    ```kusto
    .create table Wiki (id:string,url:string,['title']:string,text:string,title_vector:dynamic,content_vector:dynamic,vector_id:long)
    ```

1. Copy and paste the following commands to set the encoding policy of the vector columns. Run these commands sequentially.

    ```kusto
    .alter column Wiki.title_vector policy encoding type='Vector16'

    .alter column Wiki.content_vector policy encoding type='Vector16'
    ```

## Write vector data to an eventhouse

Use the following steps to import the embedded Wikipedia data and write it in an eventhouse:

### Import notebook

1. Download the sample **vector-database-eventhouse-notebook** notebook from the [GitHub repository](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/real-time-intelligence/vector-database-eventhouse-notebook.ipynb).

1. Browse to your Fabric environment. In the experience switcher, choose **Fabric** and then your workspace.

1. Select **Import** > **Notebook** >  **From this computer** > **Upload** and then choose the notebook you downloaded in a previous step.

    :::image type="content" source="media/vector-database/import-notebook-menu.png" alt-text="Screenshot of the workspace import a notebook menu.":::

1. When the import finishes, open the imported notebook from your workspace.

### Write data to the eventhouse

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

1. To write to the eventhouse, enter your Cluster URI, which you can find on the [system overview page](manage-monitor-eventhouse.md#system-overview), and the name of the database. The table is created in the notebook and later referenced in the query.

    ```python
    # replace with your eventhouse Query URI, Database name, and Table name
    KUSTO_CLUSTER =  "eventhouse Cluster URI"
    KUSTO_DATABASE = "Database name"
    KUSTO_TABLE = "Wiki"
    ```

1. Run the remaining cells to write the data to the eventhouse. This operation can take some time to execute.

    ```python
    kustoOptions = {"kustoCluster": KUSTO_CLUSTER, "kustoDatabase" :KUSTO_DATABASE, "kustoTable" : KUSTO_TABLE }
    
    access_token=mssparkutils.credentials.getToken(kustoOptions["kustoCluster"])
    ```

    ```python
    #Pandas data frame to spark dataframe
    sparkDF=spark.createDataFrame(article_df)
    ```

    ```python
    # Write data to a table in eventhouse
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

### View the data in the eventhouse

At this point, you can verify the data is written to the eventhouse by browsing to the database details page.

1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select the database item that you provided in the previous section. You see a summary of the data that was written to the "Wiki" table. If the database is already opened, refresh it to see the new data.

## Generate embedding for the search term

After you store the embedded wiki data in your eventhouse, embed a search term by using the same Azure OpenAI model. Then, compare it against the stored vectors to find similar Wikipedia pages.

# [Notebook](#tab/notebook)

To call the Azure OpenAI embedding API from the notebook, you need the following values:

| Variable name | Value |
|---|---|
| endpoint | Find this value in the **Keys & Endpoint** section when you examine your resource in the [Azure portal](https://portal.azure.com/). An example endpoint is: `https://docs-test-001.openai.azure.com/`. |
| API key | Find this value in the **Keys & Endpoint** section when you examine your resource in the Azure portal. Use either **KEY1** or **KEY2**. |
| deployment id | Find this value under the **Deployments** section in [Azure OpenAI Studio](https://oai.azure.com/). |

1. Run the following cell to connect to Azure OpenAI and define the embedding function. Replace the placeholder values with your endpoint, API key, and deployment ID.

    ```python
    import openai
    
    openai.api_version = '2022-12-01'
    openai.api_base = 'endpoint'      # Add your endpoint here
    openai.api_type = 'azure'
    openai.api_key = 'api key'        # Add your API key here
    
    def embed(query):
        # Creates embedding vector from user query
        embedded_query = openai.Embedding.create(
                input=query,
                deployment_id="deployment id",  # Add your deployment ID here
                chunk_size=1
        )["data"][0]["embedding"]
        return embedded_query
    ```

1. Run the following cell to generate an embedding for your search term:

    ```python
    searchedEmbedding = embed("most difficult gymnastics moves in the olympics")
    ```

# [KQL queryset](#tab/kql-queryset)

With the KQL queryset approach, you embed data inline by using the [ai_embeddings plugin](/kusto/query/ai-embeddings-plugin?view=microsoft-fabric&preserve-view=true). You need the model endpoint URL, which combines your Azure OpenAI resource endpoint and deployment name.

| Variable name | Value |
|---|---|
| model_endpoint | Constructed from your Azure OpenAI endpoint and deployment name, in the format: `https://<deployment-name>.openai.azure.com/openai/deployments/text-embedding-ada-002/embeddings?api-version=2024-10-21;impersonate`. Find the endpoint in the **Keys & Endpoint** section of your resource in the [Azure portal](https://portal.azure.com/). |

Run the following query in your KQL queryset to verify the embedding is generated correctly. Use this same pattern in the next step to run the full similarity search.

```kusto
let model_endpoint = 'https://<deployment-name>.openai.azure.com/openai/deployments/text-embedding-ada-002/embeddings?api-version=2024-10-21;impersonate';
let searchedEmbedding = toscalar(evaluate ai_embeddings("most difficult gymnastics moves in the olympics", model_endpoint));
print searchedEmbedding
```

---

## Query the similarity

Use cosine similarity to compare the search term embedding against the stored Wikipedia page vectors and return the top 10 most similar pages. You can change the search term and rerun to explore different results.

# [Notebook](#tab/notebook)

The query runs via the Kusto Spark connector in the notebook, using the `searchedEmbedding` vector from the previous step.

```python
kustoQuery = "Wiki | extend similarity = series_cosine_similarity(dynamic(" + str(searchedEmbedding) + "), content_vector) | top 10 by similarity desc"
accessToken = mssparkutils.credentials.getToken(KUSTO_CLUSTER)
kustoDf = spark.read \
    .format("com.microsoft.kusto.spark.synapse.datasource") \
    .option("accessToken", accessToken) \
    .option("kustoCluster", KUSTO_CLUSTER) \
    .option("kustoDatabase", KUSTO_DATABASE) \
    .option("kustoQuery", kustoQuery).load()

kustoDf.show()
```

# [KQL queryset](#tab/kql-queryset)

The following query embeds the search term and runs the similarity search in a single KQL statement. Replace the `model_endpoint` value with your own.

```kusto
let model_endpoint = 'https://<deployment-name>.openai.azure.com/openai/deployments/text-embedding-ada-002/embeddings?api-version=2024-10-21;impersonate';
let searchedEmbedding = toscalar(evaluate ai_embeddings("most difficult gymnastics moves in the olympics", model_endpoint));
Wiki
| extend similarity = series_cosine_similarity(searchedEmbedding, content_vector)
| top 10 by similarity desc
```

---

## Clean up resources

When you finish the tutorial, delete the resources you created to avoid incurring extra costs. To delete the resources, follow these steps:

1. Browse to your workspace homepage.
1. Delete the notebook you created in this tutorial.
1. Delete the eventhouse or [database](manage-monitor-database.md#manage-kql-databases) used in this tutorial.
