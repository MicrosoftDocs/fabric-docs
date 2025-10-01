---
title: How to Use Fabric for Retrieval Augmented Generation
description: Learn how to build a Retrieval Augmented Generation (RAG) application in Microsoft Fabric using Azure AI Search and OpenAI for enhanced data-driven insights.
author: jonburchel
ms.author: jburchel
ms.reviewer: alsavelv
ms.date: 10/01/2025
ms.topic: concept-article
ms.service: fabric
ms.subservice: data-science
ai.usage: ai-assisted
---
# Build retrieval augmented generation in Fabric

## Introduction

Large language models (LLMs) like OpenAI's ChatGPT are powerful, but they work better for business needs when you customize them with specific business data by using generative AI (GenAI) solutions. Without this customization, LLMs might not deliver results tailored to business and customer requirements.

Add specific information to prompts to improve results. For deeper gains, fine-tune the LLM with custom data. This notebook shows retrieval-augmented generation (RAG). It adds retrieved business-specific context to the LLM to improve answers.

Use web search or APIs to implement RAG. Use a vector search index to explore unstructured text. The index searches a collection of text chunks and ranks them by how closely they match the user's question. Because full documents are often too large to embed as a single vector, they're split into smaller chunks. Index the chunks in a service like Azure AI Search to make retrieval efficient.

:::image type="content" source="media/quickstart-building-retrieval-augmented-generation/fabric-notebook-architecture-diagram.png" alt-text="Diagram that shows Fabric notebook architecture and the services it uses.":::

This quickstart shows how to use Fabric to build RAG applications. The main steps are:

1. Set up Azure AI Search.
1. Load and prepare data from the [CMU QA dataset](https://www.cs.cmu.edu/~ark/QA-data/).
1. Chunk the data by using Spark pools for efficient processing.
1. Create embeddings by using Fabric's built-in [Azure OpenAI services through Synapse ML](/fabric/data-science/ai-services/how-to-use-openai-sdk-synapse?tabs=synapseml).
1. Create a vector index by using [Azure AI Search](https://aka.ms/what-is-azure-search).
1. Generate answers from the retrieved context by using Fabric's built-in [Azure OpenAI through Python SDK](/fabric/data-science/ai-services/how-to-use-openai-sdk-synapse?tabs=python).

## Prerequisites

Set up these services to run the notebook.

- Set up [Microsoft Fabric](https://aka.ms/fabric/getting-started) with F64 capacity.
- [Add a lakehouse](https://aka.ms/fabric/addlakehouse) to this notebook. Download data from a public blob and store it in the lakehouse.
- Set up [Azure AI Search](https://aka.ms/azure-ai-search).

## Step 1: Overview of Azure setup

This tutorial uses Fabric's built-in Azure OpenAI Service, so you don't need keys. Run the next cell to apply the required SynapseML configuration.

#### Set up Azure AI Search keys

After you get an Azure subscription, create an Azure AI Search service by following the [Azure AI Search quickstart](https://aka.ms/azure-ai-search).

Choose the free tier. It lets you create three indexes and use 50 MB of storage, which is enough for this tutorial. Select a subscription, set up a resource group, and name the service. After you configure the service, get the key and set `aisearch_api_key`. Enter values for `aisearch_index_name` and the other variables:

:::image type="content" source="media/quickstart-building-retrieval-augmented-generation/azure-ai-search-free-tier.png" alt-text="Screenshot of Azure portal showing the Azure AI Search service creation page with free tier selected, allowing 3 indexes and 50 MB of storage.":::

`%pip install openai==0.28.1`

```python
# Set up Azure AI Search credentials
aisearch_index_name = "" # TODO: Create a new index name: must only contain lowercase, numbers, and dashes
aisearch_api_key = "" # TODO: Fill in your API key from Azure AI Search
aisearch_endpoint = "https://<YOUR_AI_SEARCH_SERVICE_NAME>.search.windows.net" # TODO: Provide the URL endpoint for your Azure AI Search service
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 5, Finished, Available, Finished)*`

After you set up Azure OpenAI and Azure AI Search keys, import the required libraries from [Spark](https://spark.apache.org/), [SynapseML](https://aka.ms/AboutSynapseML), [Azure Search](https://aka.ms/azure-search-libraries), and OpenAI.

Use the `environment.yaml` in the same folder as this notebook to create, save, and publish a [Fabric environment](https://aka.ms/fabric/create-environment). Select the new environment before running the import cell.

```python
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning) 

import os, requests, json

from datetime import datetime, timedelta
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient

from pyspark.sql import functions as F
from pyspark.sql.functions import to_timestamp, current_timestamp, concat, col, split, explode, udf, monotonically_increasing_id, when, rand, coalesce, lit, input_file_name, regexp_extract, concat_ws, length, ceil
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, TimestampType, ArrayType, FloatType
from pyspark.sql import Row
import pandas as pd
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.models import (
    VectorizedQuery,
)
from azure.search.documents.indexes.models import (  
    SearchIndex,  
    SearchField,  
    SearchFieldDataType,  
    SimpleField,  
    SearchableField,   
    SemanticConfiguration,  
    SemanticPrioritizedFields,
    SemanticField,  
    SemanticSearch,
    VectorSearch, 
    HnswAlgorithmConfiguration,
    HnswParameters,  
    VectorSearchProfile,
    VectorSearchAlgorithmKind,
    VectorSearchAlgorithmMetric,
)

from synapse.ml.featurize.text import PageSplitter
from synapse.ml.services.openai import OpenAIEmbedding
from synapse.ml.services.openai import OpenAIChatCompletion
import ipywidgets as widgets  
from IPython.display import display as w_display
import openai
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 7, Finished, Available, Finished)*`

## Step 2: Load data into the lakehouse and Spark

### Dataset

The Carnegie Mellon University Question-Answer dataset version 1.2 is a corpus of Wikipedia articles, manually generated factual questions based on the articles, and manually generated answers. The data is hosted on an Azure blob storage under the same license [GFDL](http://www.gnu.org/licenses/fdl.html). For simplicity, the data is cleaned up and refined into a single structured table with the following fields.

- ArticleTitle: The name of the Wikipedia article from which the questions and answers come.
- Question: Manually generated question based on the article.
- Answer: Manually generated answer based on the question and article.
- DifficultyFromQuestioner: Prescribed difficulty rating for the question as given to the question writer.
- DifficultyFromAnswerer: Difficulty rating assigned by the individual who evaluated and answered the question, which can differ from DifficultyFromQuestioner.
- ExtractedPath: Path to the original article. Multiple question and answer pairs can come from one article.
- text: Cleaned Wikipedia article text.

For more information about the license, download the file named `LICENSE-S08,S09` from the same location.

#### History and citation

The dataset used for this notebook requires the following citation:

**Cell output:**
```
CMU Question/Answer Dataset, Release 1.2
8/23/2013
Noah A. Smith, Michael Heilman, and Rebecca Hwa
**Question Generation as a Competitive Undergraduate Course Project**
In Proceedings of the NSF Workshop on the Question Generation Shared Task and Evaluation Challenge, Arlington, VA, September 2008.
Available at: http://www.cs.cmu.edu/~nasmith/papers/smith+heilman+hwa.nsf08.pdf
Original dataset acknowledgments:
This research project was supported by NSF IIS-0713265 (to Smith), an NSF Graduate Research Fellowship (to Heilman), NSF IIS-0712810 and IIS-0745914 (to Hwa), and Institute of Education Sciences, U.S. Department of Education R305B040063 (to Carnegie Mellon).
cmu-qa-08-09 (modified version)
6/12/2024
Amir Jafari, Alexandra Savelieva, Brice Chung, Hossein Khadivi Heris, Journey McDowell
Released under the same GFDL license (http://www.gnu.org/licenses/fdl.html).
All GNU license terms apply to the dataset in all copies.
```

```python
import requests
import tempfile 

# SAS URL of the blob with data
sas_url = "https://aka.ms/cmu_qa"

# Download the blob content using the SAS URL
response = requests.get(sas_url)
blob_content = response.content

# Save the blob content to a file named cmu_qa.parquet in Fabric Lakehouse
location = "Files/cmu_qa.parquet"
fabric_lakehouse_path = "/lakehouse/default/"+ location
with open(fabric_lakehouse_path, 'wb') as f:
    f.write(blob_content)

print(f"Blob content successfully stored at {fabric_lakehouse_path}")

# Read the Parquet file from the temporary file into a Spark DataFrame 
spark.read.parquet(location).write.mode("overwrite").format("delta").saveAsTable("cmu_qa_08_09_refresh")

```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 8, Finished, Available, Finished)*`
`*Blob content successfully stored at /lakehouse/default/Files/cmu_qa.parquet*`

The original dataset includes student semesters S08, S09, and S10. Each semester contains multiple sets, and each set comprises approximately 10 Wikipedia articles. Because of licensing differences, this article consolidates the data into one table that includes S08 and S09 and omits S10. For simplicity, this article highlights sets 1 and 2 within S08. The primary focus areas are `wildlife` and `countries`.

```python
# Read parquet table from default lakehouse into spark dataframe
df_dataset = spark.sql("SELECT * FROM cmu_qa_08_09_refresh")
display(df_dataset)

# Filter the DataFrame to include only the specified paths
df_selected = df_dataset.filter((col("ExtractedPath").like("S08/data/set1/%")) | (col("ExtractedPath").like("S08/data/set2/%")))

# Select only the required columns
filtered_df = df_selected.select('ExtractedPath', 'ArticleTitle', 'text')

# Drop duplicate rows based on ExtractedPath, ArticleTitle, and text
df_wiki = filtered_df.dropDuplicates(['ExtractedPath', 'ArticleTitle', 'text'])

# Show the result
display(df_wiki)
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 9, Finished, Available, Finished)*`
`*SynapseWidget(Synapse.DataFrame, eb3e3dac-90fb-4fd7-9574-e5eba6335aad)*`
`*SynapseWidget(Synapse.DataFrame, 29a22160-4fb3-437c-a4c9-afa46e6510f1)*`

## Step 3: chunk the text

When you submit large documents to an LLM, the model extracts the most important information to answer queries. Chunking splits large text into smaller sections. In a RAG setup, embedding smaller chunks instead of whole documents lets the retriever return only the most relevant chunks for a query. This approach reduces token usage and gives the model focused context.

Use the `PageSplitter` class in the `SynapseML` library for distributed processing. Tune the page length (in characters) to balance model limits, retrieval quality, and context size. For example, set the maximum page length to 4,000 characters.

```python
ps = (
    PageSplitter()
    .setInputCol("text")
    .setMaximumPageLength(4000)
    .setMinimumPageLength(3000)
    .setOutputCol("chunks")
)

df_splitted = ps.transform(df_wiki) 
display(df_splitted.limit(10)) 
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 10, Finished, Available, Finished)*`
`*SynapseWidget(Synapse.DataFrame, 8353f865-eadd-4edf-bcbb-2a3980f06cf6)*`

Each row can contain multiple chunks from the same document in a vector. The `explode` function expands the vector into separate rows.

```python
df_chunks = df_splitted.select('ExtractedPath', 'ArticleTitle', 'text', explode(col("chunks")).alias("chunk"))
display(df_chunks)
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 11, Finished, Available, Finished)*`
`*SynapseWidget(Synapse.DataFrame, d1459c26-9eb4-4996-8fdd-a996c9b30777)*`

Add a unique ID for each row.

```python
df_chunks_id = df_chunks.withColumn("Id", monotonically_increasing_id())
display(df_chunks_id)
```

**Cell output:**
`StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 12, Finished, Available, Finished)`
`SynapseWidget(Synapse.DataFrame, 5cc2055a-96e9-4c7d-8ad6-558b04d847fd)`

## Step 4: Create embeddings

In RAG, embedding adds relevant document chunks to the model's knowledge base. The system selects chunks that match likely user queries, so it retrieves precise information instead of whole documents. Embeddings improve retrieval by giving focused context for accurate answers. This section uses the SynapseML library to generate embeddings for each text chunk.

```python
# Generate embeddings for each chunk.
Embd = (
    OpenAIEmbedding()
    .setDeploymentName('text-embedding-ada-002')  # Set deployment name.
    .setTextCol("chunk")
    .setErrorCol("error")
    .setOutputCol("Embedding")
)
df_embeddings = Embd.transform(df_chunks_id)
display(df_embeddings)
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 13, Finished, Available, Finished)*`
`*SynapseWidget(Synapse.DataFrame, b3dcfce1-7bd9-419b-b233-d848f5fddb06)*`

## Step 5: create vector index with Azure AI Search

In RAG, a vector index quickly retrieves relevant information. It organizes document chunks into a vector space to match queries by similarity instead of only keywords. This approach improves accuracy and relevance.

Set up a search index in Azure AI Search that integrates semantic and vector search. Initialize `SearchIndexClient` with the endpoint and API key. Define fields and attributes. Use `Chunk` for retrievable text and `Embedding` for vector search. Add filter fields like `ArticleTitle` and `ExtractedPath`. Adjust field choices for your dataset.

Configure HNSW parameters and create a vector profile. Define a semantic configuration that prioritizes key fields. Create or update the index with these settings.

Although this tutorial focuses on vector search, Azure AI Search also offers text search, filtering, and semantic ranking.

> [!TIP]
> Skip these details if you prefer. The Python SDK creates a vector index with `Chunk` for retrievable text and `Embedding` from the OpenAI embedding model. Add or remove searchable fields like `ArticleTitle` and `ExtractedPath` to fit your dataset.

```python
index_client = SearchIndexClient(
    endpoint=aisearch_endpoint,
    credential=AzureKeyCredential(aisearch_api_key),
)
fields = [
    SimpleField(name="Id", type=SearchFieldDataType.String, key=True, sortable=True, filterable=True, facetable=True),
    SearchableField(name="ArticleTitle", type=SearchFieldDataType.String, filterable=True),
    SearchableField(name="ExtractedPath", type=SearchFieldDataType.String, filterable=True),
    SearchableField(name="Chunk", type=SearchFieldDataType.String, searchable=True),
    SearchField(name="Embedding",
                type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
                searchable=True,
                vector_search_dimensions=1536,
                vector_search_profile_name="my-vector-config"
    ),
]

vector_search = VectorSearch(
    algorithms=[
        HnswAlgorithmConfiguration(
            name="myHnsw",
            kind=VectorSearchAlgorithmKind.HNSW,
            parameters=HnswParameters(
                m=4,
                ef_construction=400,
                ef_search=500,
                metric=VectorSearchAlgorithmMetric.COSINE
            )
        )
    ],
    profiles=[
        VectorSearchProfile(
            name="my-vector-config",
            algorithm_configuration_name="myHnsw",
        ),
    ]
)

# Note: Useful for reranking 
semantic_config = SemanticConfiguration(
    name="my-semantic-config",
    prioritized_fields=SemanticPrioritizedFields(
        title_field=SemanticField(field_name="ArticleTitle"),
        prioritized_content_fields=[SemanticField(field_name="Chunk")]
    )
)

# Create the semantic settings with the configuration
semantic_search = SemanticSearch(configurations=[semantic_config])

# Create the search index with the semantic settings
index = SearchIndex(
    name=aisearch_index_name,
    fields=fields,
    vector_search=vector_search,
    semantic_search=semantic_search
)
result = index_client.create_or_update_index(index)
print(f' {result.name} created')

```

**Cell output:**
`StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 14, Finished, Available, Finished)`
`prioritized_content_fields isn't a known attribute of class <class 'azure.search.documents.indexes._generated.models._models_py3.SemanticPrioritizedFields'> and will be ignored.`
`demo-portland-tutorial created`

The following code defines a user-defined function (UDF) `insertToAISearch` that inserts data into the Azure AI Search index. It takes `Id`, `ArticleTitle`, `ExtractedPath`, `Chunk`, and `Embedding`, builds the API URL, creates an `upload` JSON payload, sets headers with the API key, sends a POST request, prints the response, and returns Success or the error text. Include those fields in your dataset.

```python
@udf(returnType=StringType())
def insertToAISearch(Id, ArticleTitle, ExtractedPath, Chunk, Embedding):
    url = f"{aisearch_endpoint}/indexes/{aisearch_index_name}/docs/index?api-version=2023-11-01"

    payload = json.dumps(
        {
            "value": [
                {
                    "Id": str(Id),
                    "ArticleTitle": ArticleTitle,
                    "ExtractedPath": ExtractedPath,
                    "Chunk": Chunk, 
                    "Embedding": Embedding.tolist(),
                    "@search.action": "upload",
                },
            ]
        }
    )

    headers = {
        "Content-Type": "application/json",
        "api-key": aisearch_api_key,
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)

    if response.status_code == 200 or response.status_code == 201:
        return "Success"
    else:
        return response.text
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 15, Finished, Available, Finished)*`

Use the UDF `insertToAISearch` to upload rows from the `df_embeddings` DataFrame to the Azure AI Search index. The DataFrame has `Id`, `ArticleTitle`, `ExtractedPath`, `Chunk`, and `Embedding`.

Apply `insertToAISearch` to each row to add an `errorAISearch` column. This column stores the Azure AI Search API response so you can check for upload errors and confirm each document uploads.

Use the `display` function to review `df_embeddings_ingested` and verify the results.

```python
df_embeddings_ingested = df_embeddings.withColumn(
    "errorAISearch",
    insertToAISearch(
        df_embeddings["Id"],
        df_embeddings["ArticleTitle"],
        df_embeddings["ExtractedPath"],
        df_embeddings["Chunk"],
        df_embeddings["Embedding"]
    ),
)

display(df_embeddings_ingested)
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 16, Finished, Available, Finished)*`
`*SynapseWidget(Synapse.DataFrame, 5be010aa-4b2a-47b5-8008-978031e0795a)*`

Run basic validation to confirm data uploads to the Azure AI Search index. Count successes where `errorAISearch` is `Success` and any failures. If failures occur, display those rows to diagnose and fix issues.

```python
# Count the number of successful uploads
successful_uploads = df_embeddings_ingested.filter(col("errorAISearch") == "Success").count()

# Identify and display unsuccessful uploads
unsuccessful_uploads = df_embeddings_ingested.filter(col("errorAISearch") != "Success")
unsuccessful_uploads_count = unsuccessful_uploads.count()

# Display the results
print(f"Number of successful uploads: {successful_uploads}")
print(f"Number of unsuccessful uploads: {unsuccessful_uploads_count}")

# Show details of unsuccessful uploads if any
if unsuccessful_uploads_count > 0:
    unsuccessful_uploads.show()
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 17, Finished, Available, Finished)*`
`*Number of successful uploads: 172*`
`*Number of unsuccessful uploads: 0*`
   
## Step 6: Demonstrate retrieval augmented generation

After you chunk, embed, and index, use the indexed data to retrieve the most relevant information for user queries. This retrieval lets the system generate accurate responses by using the index structure and embedding similarity scores.

In the following example, you create a function that retrieves relevant Wikipedia article chunks from a vector index in Azure AI Search. Whenever someone asks a new question, the system:

- Embed the question as a vector
- Retrieve the top N chunks from Azure AI Search by using the vector
- Concatenate the results into a single string


```python
import copy, json, os, requests, warnings

# Implementation of retriever

def get_context_source(retrieve_results, question, topN=3, filter=''):
        """
    Retrieve context text and source metadata for a question by running a vector search.
    Parameters:
    retrieve_results (function): Implements one of the retrieval methods with Azure AI Search.
    question (str): The question to retrieve context and sources for.  
    topN (int, optional): Number of top results to retrieve. Default is 3.  
    filter (str, optional): Article title used to filter retrieved chunks. Default is '' (no filter).
    
    Returns:  
    list: A list with three elements:  
        1. Concatenated retrieved context string.  
        2. List of retrieved source paths.  
        3. DataFrame of retrieved chunks with metadata.
    """

    results = retrieve_results(question, filter, topN)
    results_copy = copy.deepcopy(results)
    documents = [result for result in results_copy]
    df_chunks = pd.DataFrame(documents)

    retrieved_context = ""
    retrieved_sources = []
    for result in results:
        retrieved_context += result['ExtractedPath'] + "\n" + result['Chunk'] + "\n\n"
        retrieved_sources.append(result['ExtractedPath'])

    return [retrieved_context, retrieved_sources, df_chunks]
 
# Wrapper for vector search call
 
def vector_search(question, filter = '', topN = 3): 
    deployment_id = "text-embedding-ada-002"

    query_embedding = openai.Embedding.create(deployment_id=deployment_id, input=question).data[0].embedding
  
    vector_query = VectorizedQuery(vector=query_embedding, k_nearest_neighbors=topN, fields="Embedding"  )

    search_client = SearchClient(
        aisearch_endpoint,
        aisearch_index_name,
        credential=AzureKeyCredential(aisearch_api_key)
    )

    results = search_client.search(   
        vector_queries=[vector_query],
        top=topN,
    )

    return results
```

**Cell output:**
`StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 18, Finished, Available, Finished)*`

```python
question = "How do elephants communicate over long distances?"
retrieved_context, retrieved_sources, df_chunks = get_context_source(vector_search, question)
df_chunks
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 19, Finished, Available, Finished)*`

| Chunk Ordinal  | Embedding | ExtractedPath | ArticleTitle | Chunk | ID | @search.score | @search.reranker_score | @search.highlights | @search.captions |
|---|-----------|---------------|--------------|-------|----|--------------|-----------------------|-------------------|------------------|
| 0 | [-0.03276262, -0.006002287, 0.009044814, -0.02...] | S08/data/set1/a5 | elephant | hand, live mostly solitary lives.\n\nThe socia... | 131 | 0.888358 | None | None | None |
| 1 | [-0.011676712, -0.0079745, 0.001480885, -0.021...] | S08/data/set1/a5 | elephant | farther north, in slightly cooler climates, an... | 130 | 0.877915 | None | None | None |
| 2 | [-0.018319938, -0.013896506, 0.014269567, -0.0...] | S08/data/set1/a5 | elephant | trunk, which pick up the resonant vibrations m... | 132 | 0.867543 | None | None | None |

You need another function to get the response from the OpenAI Chat model. This function combines the user question with the context retrieved from Azure AI Search. This example is basic and doesn't include chat history or memory. First, you initialize the chat client with the chosen model and then perform a chat completion to obtain the response. The messages have a "system" content that can be adjusted to enhance the response's tone, conciseness, and other aspects.

```python
def get_answer(question, context):
    """  
    Generate an answer to a question by using supplied context and an Azure OpenAI model.
    
    Parameters:  
        question (str): The question that needs to be answered.  
        context (str): The contextual information related to the question that will help generate a relevant response.  
    
    Returns:  
        str: The response generated by the Azure OpenAI model based on the provided question and context.  
    """
    messages = [
        {
            "role": "system",
            "content": "You are a helpful chat assistant who is given reference text to answer the question."
        }
    ]

    messages.append(
        {
            "role": "user", 
            "content": question + "\n" + context,
        },
    )
    response = openai.ChatCompletion.create(
                deployment_id='gpt-35-turbo-0125', # See the note below for an alternative deployment ID.

        messages= messages,
        temperature=0,
    )

    return response.choices[0].message.content

```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 20, Finished, Available, Finished)*`

Note: For other available deployment_ids, see the [documentation for Python SDK](/fabric/data-science/ai-services/how-to-use-openai-sdk-synapse?tabs=python).

```python
answer = get_answer(question, retrieved_context)
print(answer)
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 21, Finished, Available, Finished)*`

```
Elephants communicate over long distances by producing and receiving low-frequency sounds known as infrasound. This subsonic rumbling can travel through the ground farther than sound travels through the air. Elephants can feel these vibrations through the sensitive skin of their feet and trunks. They use this method of communication to stay connected with other elephants over large distances. This ability to communicate through infrasound plays a crucial role in their social lives and helps them coordinate movements and interactions within their groups.
    
 The ability of elephants to recognize themselves in a mirror test demonstrates their self-awareness and cognitive abilities. This test involves marking an elephant and observing its reaction to its reflection in a mirror. Elephants have shown the capacity to understand that the image in the mirror is their own reflection, indicating a level of self-awareness similar to that seen in humans, apes, and dolphins.
    
 In addition to infrasound communication, elephants also use other forms of communication such as visual displays and olfactory cues. For example, during the mating period, male elephants emit a specific odor from a gland behind their eyes. They may fan their ears to help disperse this scent over long distances, a behavior theorized by researcher Joyce Poole as a way to attract potential mates.
    
 Overall, elephants have complex social structures and behaviors that involve various forms of communication to maintain relationships, coordinate movements, and express emotions within their groups.
```

Now you know how to prepare (chunk and embed) the CMU QA dataset, build a vector index, retrieve relevant chunks, and generate answers. Use this foundation to create a basic ipywidgets chatbot interface. Run the cell below, enter your question, then select <kbd>Enter</kbd> to get a response. Change the text to ask a new question, then select <kbd>Enter</kbd> again.

> [!Tip]
> This RAG solution can make mistakes. You can change the OpenAI model to GPT-4 or modify the system prompt.

```python
# Create a text box for input  
text = widgets.Text(  
    value='',  
    placeholder='Type something',  
    description='Question:',  
    disabled=False,  
    continuous_update=False,  
    layout=widgets.Layout(width='800px')  # Adjust the width as needed  
)  
  
# Create an HTML widget to display the answer  
label = widgets.HTML(  
    value='',  
    layout=widgets.Layout(width='800px')  # Adjust the width as needed  
)  
  
# Define what happens when the text box value changes  
def on_text_change(change):  
    if change['type'] == 'change' and change['name'] == 'value':  
        retrieved_context, retrieved_sources, df_chunks = get_context_source(vector_search, change['new'])  
        label.value = f"<div style='word-wrap: break-word; line-height: 1;'>{get_answer(change['new'], retrieved_context)}</div>"  
  
text.observe(on_text_change)  
  
# Display the text box and label  
w_display(text, label)
```

**Cell output:**
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 37, Finished, Available, Finished)*`
`*Text(value='', continuous_update=False, description='Question:', layout=Layout(width='800px'), placeholder='Ty…*`
`*HTML(value='', layout=Layout(width='800px'))*`
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 38, Finished, Available, Finished)*`
`*StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 39, Finished, Available, Finished)*`

This tutorial concludes the process of creating a RAG application in Fabric by using the built-in OpenAI endpoint. Fabric unifies your data so you can build effective generative AI applications.
