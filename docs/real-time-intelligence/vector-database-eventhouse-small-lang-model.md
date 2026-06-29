---
title: "Tutorial: Use an eventhouse as a vector database with SLM embeddings"
description: Learn how to use built-in Small Language Model (SLM) embeddings in eventhouse for semantic search without external dependencies.
ms.reviewer: adieldar
ms.topic: tutorial
ms.date: 06/23/2026
ms.subservice: rti-eventhouse
ms.search.form: eventhouse
ai-usage: ai-assisted
---

# Tutorial: Use an eventhouse as a vector database with SLM embeddings

In this tutorial, you learn how to generate text embeddings and perform semantic search in an eventhouse by using the [slm_embeddings_fl()](/kusto/functions-library/slm-embeddings-fl?view=microsoft-fabric&preserve-view=true) user-defined function (UDF). Unlike the [ai_embeddings plugin](/kusto/query/ai-embeddings-plugin?view=microsoft-fabric&preserve-view=true), which requires an external Azure OpenAI endpoint, `slm_embeddings_fl()` runs Small Language Models (SLMs) locally within the Kusto Python sandbox. You can embed and search data entirely within your eventhouse, without any external dependencies or per-request costs.

This scenario demonstrates semantic search over a set of technology article descriptions. You embed the article descriptions by using a local SLM, store the resulting vectors in an eventhouse table, and then run a natural language search query to find the most semantically similar articles.

Specifically, in this tutorial you:

> [!div class="checklist"]
>
> * Enable the Python plugin and prepare a lakehouse to host the SLM model artifacts.
> * Create a table in an eventhouse with `Vector16` encoding for the vector column.
> * Install the `slm_embeddings_fl()` UDF as a stored function in your database.
> * Embed a set of documents by using the UDF and ingest the vectors into the eventhouse.
> * Embed a natural language search query by using the same UDF.
> * Use the [series_cosine_similarity](/kusto/query/series-cosine-similarity-function?view=microsoft-fabric&preserve-view=true) KQL function to find the most semantically similar documents.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* An [eventhouse](create-eventhouse.md) in your workspace.
* The Python plugin [enabled on your eventhouse database](/fabric/real-time-analytics/python-plugin) with either the `3.11.7` or `3.11.7 DL` Python sandbox image.
* A [lakehouse](../data-engineering/create-lakehouse.md) in the same workspace as your eventhouse, to host the SLM model artifact files.

## Prepare the lakehouse artifacts

The `slm_embeddings_fl()` function uses model artifact files that you must download and store in your Fabric lakehouse before you can reference them in KQL queries.

1. Download the following artifact files from the URLs listed:
   * `[embedding_engine.zip](https://artifactswestus.z22.web.core.windows.net/models/SLM/embedding_engine.zip)`
   * `[harrier-v1-270m.zip](https://artifactswestus.z22.web.core.windows.net/models/SLM/harrier-v1-270m.zip)`
   * `[jina-v2-small.zip](https://artifactswestus.z22.web.core.windows.net/models/SLM/jina-v2-small.zip)`
   * `[e5-small-v2.zip](https://artifactswestus.z22.web.core.windows.net/models/SLM/e5-small-v2.zip)`

1. Upload the downloaded files to a folder in your lakehouse. For example, upload them to a folder called `models/SLM/` inside your lakehouse's **Files** section.

1. Note the OneLake path for the folder. Paths use the format:
   `https://onelake.dfs.fabric.microsoft.com/<WorkspaceName>/<LakehouseName>.Lakehouse/Files/models/SLM/`

   Use this base path when you install the UDF in the next section.


## Prepare your eventhouse environment

In this step, you create a table in your eventhouse with the necessary columns and encoding policies to store the embedded vector data.

1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select the eventhouse you created in the prerequisites.
1. Select the target database. If you don't have a database, create one by selecting **Add database**.
1. Expand the database tree, select the embedded queryset, and run the following KQL command to create a table called **Articles**:

    ```kusto
    .create table Articles (id:string, article_title:string, description:string, content_vector:dynamic)
    ```

1. Run the following command to set the `Vector16` encoding policy on the vector column:

    ```kusto
    .alter column Articles.content_vector policy encoding type='Vector16'
    ```

## Install the slm_embeddings_fl() function

Install the `slm_embeddings_fl()` UDF as a stored function in your database. Replace `<OneLakePath>` with the base OneLake path you noted in the previous section. You can comment out or delete the lines that refer to external artifacts for models that you don't plan to use. (These lines are at the bottom of this UDF.) In this tutorial, you use the `harrier-v1-270m` model, so you only need `embedding_engine.zip` and `harrier-v1-270m.zip`.
Install the `slm_embeddings_fl()` UDF as a stored function in your database. Replace `<OneLakePath>` with the base OneLake path you noted in the previous section. You can comment out or delete the lines that refer to external artifacts for models that you don't plan to use. (These lines are at the bottom of this UDF.) In this tutorial, you use the `harrier-v1-270m` model, so you only need `embedding_engine.zip` and `harrier-v1-270m.zip`.

```kusto
.create-or-alter function with (folder = "Packages\\AI", docstring = "Embedding using local SLM")
slm_embeddings_fl(tbl:(*), text_col:string, embeddings_col:string, batch_size:int=32, model_name:string='harrier-v1-270m', prefix:string='query:')
{
    let kwargs = bag_pack('text_col', text_col, 'embeddings_col', embeddings_col, 'batch_size', batch_size, 'model_name', model_name, 'prefix', prefix);
    let code = ```if 1:
    from sandbox_utils import Zipackage
    Zipackage.install('embedding_engine.zip')
    from embedding_factory import create_embedding_engine
    text_col = kargs["text_col"]
    embeddings_col = kargs["embeddings_col"]
    batch_size = kargs["batch_size"]
    model_name = kargs["model_name"]
    prefix = kargs["prefix"]
    Zipackage.install(f'{model_name}.zip')
    engine = create_embedding_engine(model_name, cache_dir="C:\\Temp")
    work_dir = os.environ.get("UPLOAD_PATH")
    embeddings = engine.encode(df[text_col].tolist(), batch_size=batch_size, prefix=prefix)    # prefix is used only for E5
    result = df
    result[embeddings_col] = list(embeddings)```;
    tbl
    | evaluate hint.distribution=per_node python(typeof(*), code, kwargs,
        external_artifacts = bag_pack(
            'embedding_engine.zip', '<OneLakePath>embedding_engine.zip;impersonate',
            'harrier-v1-270m.zip', '<OneLakePath>harrier-v1-270m.zip;impersonate',
            'jina-v2-small.zip', '<OneLakePath>jina-v2-small.zip;impersonate',
            'e5-small-v2.zip', '<OneLakePath>e5-small-v2.zip;impersonate'))
}
```

For more details on the function parameters and supported models, see [slm_embeddings_fl()](/kusto/functions-library/slm-embeddings-fl?view=microsoft-fabric&preserve-view=true).

## Embed and ingest documents

Now that the UDF is installed, you can use it to generate embeddings for your documents and store them in the **Articles** table.

Run the following KQL query to embed a set of sample technology article descriptions and write them to the table:

```kusto
.set-or-append Articles <|
datatable(id:string, article_title:string, description:string)
    "1", "Introduction to machine learning", "Machine learning enables computers to learn from data and improve over time without being explicitly programmed.",
    "2", "Getting started with Python", "Python is a versatile, high-level programming language popular for data science, automation, and web development.",
    "3", "Real-time analytics with Eventhouse", "eventhouse provides fast, scalable analytics on large volumes of streaming and historical data using KQL.",
    "4", "Understanding vector embeddings", "Embeddings convert text and other data into dense numerical vector representations that capture semantic meaning.",
    "5", "Neural networks explained", "Neural networks are computational models inspired by the brain, capable of learning complex patterns from large datasets.",
    "6", "Building RAG pipelines", "Retrieval-Augmented Generation combines vector search with language model generation to produce grounded, accurate responses.",
    "7", "Semantic search techniques", "Semantic search goes beyond keyword matching to find results that are conceptually similar to the user's query.",
    "8", "Data ingestion best practices", "Efficient data ingestion requires choosing the right format, batch size, and compression strategy for your workload."
]
| extend content_vector=dynamic(null)
| invoke slm_embeddings_fl('description', 'content_vector', model_name='harrier-v1-270m', prefix='passage:')
```

> [!NOTE]
> The `passage:` prefix is used when embedding documents for retrieval. When embedding the search query in the next step, use the `query:` prefix. The Harrier model uses these prefixes to distinguish between query and passage representations.

## Generate an embedding for the search term

After you store the embedded articles in your eventhouse, you can embed a natural language search query by using the same model and find the most similar articles.

Run the following query to embed the search term and retrieve its vector:

```kusto
let searchTerm = "How do I find similar text using vectors?";
print query=searchTerm
let searchTerm = "How do I find similar text using embedding vectors?";
| invoke slm_embeddings_fl('query', 'query_vector', model_name='harrier-v1-270m', prefix='query:')
| project query_vector
```

## Query the similarity

Run the following KQL query to compute the cosine similarity between the search term and each article in the **Articles** table and return the top matches:

```kusto
let searchTerm = "How do I find similar text using vectors?";
let searchVector = toscalar(
    print query=searchTerm
    | extend query_vector=dynamic(null)
    | invoke slm_embeddings_fl('query', 'query_vector', model_name='harrier-v1-270m', prefix='query:')
    | project query_vector
);
Articles
| extend similarity = series_cosine_similarity(searchVector, content_vector, 1.0, 1.0)
| project title, description, similarity
| top 3 by similarity desc
| project article_title, description, similarity
```

The query returns the three articles that are most semantically similar to your search term, ranked by cosine similarity score:

| article_title | description | similarity |
| -- | -- | -- |
| Understanding vector embeddings | Embeddings convert text and other data into dense numerical vector representations that capture semantic meaning. | 0.600029468536377 |
| Building RAG pipelines | Retrieval-Augmented Generation combines vector search with language model generation to produce grounded, accurate responses. | 0.573046445846558 |
| Semantic search techniques | Semantic search goes beyond keyword matching to find results that are conceptually similar to the user's query. | 0.469195783138275 |

You can change the search term and rerun the query to explore different results.

## Clean up resources

When you finish the tutorial, delete the resources you created to avoid incurring extra costs. To delete the resources, follow these steps:

1. Browse to your workspace homepage.
1. Delete the **Articles** table from the eventhouse database, or delete the [database](manage-monitor-database.md#manage-kql-databases) or eventhouse used in this tutorial.
1. Remove the model artifact files from your lakehouse if they're no longer needed.
