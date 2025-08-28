---
title: How to Use Fabric for Retrieval Augmented Generation
description: Learn how to build a Retrieval Augmented Generation (RAG) application in Microsoft Fabric using Azure AI Search and OpenAI for enhanced data-driven insights.
author: jonburchel
ms.author: jburchel
ms.reviewer: alsavelv
ms.date: 08/28/2025
ms.topic: concept-article
ms.service: azure-ai-foundry
ai.usage: ai-assisted
---
# Building Retrieval Augmented Generation in Fabric: A Step-by-Step Guide

## Introduction

Large Language Models (LLMs) such as OpenAI's ChatGPT are powerful tools, but their effectiveness for business applications and meeting customer needs greatly improves when customized with specific data using Generative AI (GenAI) solutions. Without this customization, LLMs may not deliver optimal results tailored to the requirements and expectations of businesses and their customers. 

One straightforward approach to enhance the results is to manually integrate specific information into prompts. For more advanced improvements, fine-tuning LLMs with custom data proves effective. This notebook demonstrates the Retrieval Augmented Generation (RAG) strategy, which supplements LLMs with dynamically retrieved and relevant information (e.g., business-specific data) to enrich their knowledge.

Implementing RAG involves methods such as web searching or utilizing specific APIs. An effective approach is utilizing a Vector Search Index to efficiently explore unstructured text data. The Vector Index searches through a database of text chunks and ranks them based on how closely they match the meaning of the user's question or query. Since full documents or articles are usually too large to embed directly into a vector, they are typically split into smaller chunks. These smaller chunks are then indexed in systems like Azure AI Search, making it easier to retrieve relevant information efficiently.

:::image type="content" source="media/quickstart-building-retrieval-augmented-generation/fabric-notebook-architecture-diagram.png" alt-text="Diagram of Fabric Notebook architecture and related services it uses.":::

This tutorial provides a quickstart guide to use Fabric for building RAG applications. The main steps in this tutorial are as following:

1. Set up Azure AI Search Services
1. Load and manipulate the data from [CMU's QA dataset](https://www.cs.cmu.edu/~ark/QA-data/) of Wikipedia articles
1. Chunk the data by leveraging Spark pooling for efficient processing
1. Create embeddings using fabric's built-in [Azure OpenAI Services through Synapse ML](/fabric/data-science/ai-services/how-to-use-openai-sdk-synapse?tabs=synapseml)
1. Create a Vector Index using [Azure AI Search](https://aka.ms/what-is-azure-search)
1. Generate answers based on the retrieved context using fabrics built-in [Azure OpenAI through python SDK](/fabric/data-science/ai-services/how-to-use-openai-sdk-synapse?tabs=python)

## Prerequisites

You need the following services to run this notebook.

- [Microsoft Fabric](https://aka.ms/fabric/getting-started) with F64 Capacity
- [Add a lakehouse](https://aka.ms/fabric/addlakehouse) to this notebook. You will download data from a public blob, then store the data in the lakehouse resource.
- [Azure AI Search](https://aka.ms/azure-ai-search)


## Step 1: Overview of Azure Setup

In this tutorial, we will benefit from Fabric's built-in Azure Openai Service that requires no keys. You only need to run the cell below to enforce required synapse ml configuration.

#### Set up Azure AI Search Keys

Once you have an Azure subscription, you can create an Azure AI Search Service by following the instructions [here](https://aka.ms/azure-ai-search).

You may choose a free tier for the Azure AI Search Service, which allows you to have 3 indexes and 50 MB of storage. The free tier is sufficient for this tutorial. You will need to select a subscription, set up a resource group, and name the service. Once configured, obtain the keys to specify as `aisearch_api_key`. Please complete the details for `aisearch_index_name`, etc in the following.

:::image type="content" source="media/quickstart-building-retrieval-augmented-generation/azure-ai-search-free-tier.png" alt-text="Screenshot of Azure portal showing the Azure AI Search Service creation page with free tier selected, allowing 3 indexes and 50 MB storage.":::

%pip install openai==0.28.1

```python
# Setup key accesses to Azure AI Search
aisearch_index_name = "" # TODO: Create a new index name: must only contain lowercase, numbers, and dashes
aisearch_api_key = "" # TODO: Fill in your API key from Azure AI Search
aisearch_endpoint = "https://<CHANGE_ME>.search.windows.net" # TODO: Provide the url endpoint for your created Azure AI Search 
```
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 5, Finished, Available, Finished)

After setting up your Azure OpenAI and Azure AI Search Keys, you must import required libraries from [Spark](https://spark.apache.org/), [SynapseML](https://aka.ms/AboutSynapseML), [Azure Search](https://aka.ms/azure-search-libraries), and OpenAI. 

Make sure to use the `environment.yaml` from the same location as this notebook file to upload into Fabric to create, save, and publish a [Fabric environment](https://aka.ms/fabric/create-environment). Then select the newly created environment before running the cell below for imports.


```python
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning) 

import os, requests, json, warnings

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
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 7, Finished, Available, Finished)

## Step 2: Load the data into the Lakehouse and Spark

#### Dataset

The Carnegie Mellon University Question-Answer dataset version 1.2 is a corpus of Wikipedia articles, manually-generated factual questions based on the articles, and manually-generated answers. The data is hosted on an Azure blob storage under the same license [GFDL](http://www.gnu.org/licenses/fdl.html). For simplicity, the data is cleaned up and refined into a single structured table with the following fields.

- ArticleTitle: the name of the Wikipedia article from which questions and answers initially came.
- Question: manually generated question based on article
- Answer: manually generated answer based on question and article
- DifficultyFromQuestioner: prescribed difficulty rating for the question as given to the question-writer
- DiffuctlyFromAnswerer: Difficulty rating assigned by the individual who evaluated and answered the question, which may differ from the difficulty from DifficultyFromQuestioner
- ExtractedPath: path to original article. There may be more than one Question-Answer pair per article
- text: cleaned wikipedia artices

For more information about the license, please download a copy of the license named `LICENSE-S08,S09` from the same location.

##### History and Citation

The dataset used for this notebook requires the following citation:

```
CMU Question/Answer Dataset, Release 1.2

8/23/2013

Noah A. Smith, Michael Heilman, and Rebecca Hw

Question Generation as a Competitive Undergraduate Course Project

In Proceedings of the NSF Workshop on the Question Generation Shared Task and Evaluation Challenge, Arlington, VA, September 2008. 
Available at: http://www.cs.cmu.edu/~nasmith/papers/smith+heilman+hwa.nsf08.pdf

Original dataset acknowledgements:
This research project was supported by NSF IIS-0713265 (to Smith), an NSF Graduate Research Fellowship (to Heilman), NSF IIS-0712810 and IIS-0745914 (to Hwa), and Institute of Education Sciences, U.S. Department of Education R305B040063 (to Carnegie Mellon).

cmu-qa-08-09 (modified verison)

6/12/2024

Amir Jafari, Alexandra Savelieva, Brice Chung, Hossein Khadivi Heris, Journey McDowell

Released under same license GFDL (http://www.gnu.org/licenses/fdl.html)
All the GNU license applies to the dataset in all copies.
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
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 8, Finished, Available, Finished)
Blob content successfully stored at /lakehouse/default/Files/cmu_qa.parquet

The original dataset is divided into student Semesters S08, S09, and S10. Each semester contains multiple sets, and each set comprises approximately 10 Wikipedia articles. As illustrated earlier, due to varying licenses, the entire datasets are consolidated into a single table encompassing S08 and S09, omitting S10. For sake of simplicity in demonstration, this tutorial will specifically highlight sets 1 and 2 within S08. The primary focus areas will be `wildlife` and `countries`.

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
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 9, Finished, Available, Finished)
SynapseWidget(Synapse.DataFrame, eb3e3dac-90fb-4fd7-9574-e5eba6335aad)
SynapseWidget(Synapse.DataFrame, 29a22160-4fb3-437c-a4c9-afa46e6510f1)

## Step 3: Chunk the Text 

When large documents are inputted into the LLMs, it needs to extract the most important information to answer user queries. Chunking involves breaking down large text into smaller segments or chunks. In the RAG context, embedding smaller chunks rather than entire documents for the knowledge base means retrieving only the most relevant chunks in response to a user's query. This approach reduces input tokens and provides more focused context for the LLM to process.

To perform chunking, you should use the `PageSplitter` implementation from the `SynapseML` library for distributed processing. Adjusting the page length parameters (in characters) is crucial for optimizing performance based on the text size supported by the language model and the number of chunks selected as context for the conversational bot. For demonstration, a page length of 4000 characters is recommended.


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
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 10, Finished, Available, Finished)
SynapseWidget(Synapse.DataFrame, 8353f865-eadd-4edf-bcbb-2a3980f06cf6)

Note that each row can contain multiple chunks from the same document represented as a vector. The function `explode` distributes and duplicates the vector's content across several rows.

```python
df_chunks = df_splitted.select('ExtractedPath', 'ArticleTitle', 'text', explode(col("chunks")).alias("chunk"))
display(df_chunks)
```
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 11, Finished, Available, Finished)
SynapseWidget(Synapse.DataFrame, d1459c26-9eb4-4996-8fdd-a996c9b30777)

Now, you will add a unique id for each row. 

```python
df_chunks_id = df_chunks.withColumn("Id", monotonically_increasing_id())
display(df_chunks_id)
```
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 12, Finished, Available, Finished)
SynapseWidget(Synapse.DataFrame, 5cc2055a-96e9-4c7d-8ad6-558b04d847fd)

## Step 4: Create Embeddings

In RAG, embedding refers to incorporating relevant chunks of information from documents into the model's knowledge base. These chunks are chosen based on their relevance to potential user queries, allowing the model to retrieve specific and targeted information rather than entire documents. Embedding helps optimize the retrieval process by providing concise and pertinent context for generating accurate responses to user inputs. In this section, we will use SynapseML Library to obtain embeddings for each chunk of text.

```python
Embd = (In this section, we use SynapseML Library to obtain embeddings for each chunk of text.
    OpenAIEmbedding()
    .setDeploymentName('text-embedding-ada-002') # set deployment_name as text-embedding-ada-002
    .setTextCol("chunk")
    .setErrorCol("error")    
    .setOutputCol("Embedding")
)
df_embeddings = Embd.transform(df_chunks_id)
display(df_embeddings)
```
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 13, Finished, Available, Finished)
SynapseWidget(Synapse.DataFrame, b3dcfce1-7bd9-419b-b233-d848f5fddb06)

## Step 5: Create Vector Index with Azure AI Search 

In RAG, creating a vector index helps quickly retrieve the most relevant information for user queries. By organizing document chunks into a vector space, RAG can match and generate responses based on similar content rather than just keywords. This makes the responses more accurate and meaningful, improving how well the system understands and responds to user inputs.

In the next steps, you will set up a search index in Azure AI Search that integrates both semantic and vector search capabilities. You can begin by initializing the `SearchIndexClient` with the required endpoint and API key. Then, define the data structure using a list of fields, specifying their types and attributes. The `Chunk` field will hold the text to be retrieved, while the `Embedding` field will facilitate vector-based searches. Additional fields like `ArticleTitle` and `ExtractedPath` can be included for filtering purposes. For custom datasets, you can adjust the fields as necessary.

For vector search, configure the Hierarchical Navigable Small Worlds (HNSW) algorithm by specifying its parameters and creating a usage profile. You can also set up semantic search by defining a configuration that emphasizes specific fields for improved relevance. Finally, create the search index with these configurations and utilize the client to create or update the index, ensuring it supports advanced search operations. 

Note that while this tutorial focuses on vector search, Azure Search offers text search, filtering, and semantic ranking capabilities that are beneficial for various applications.


> [!TIP]
> You can skip the following details. You will use the Python SDK for Azure AI Search to create a new Vector Index. This index will include fields for `Chunk`, which holds the text to be retrieved, and `Embedding`, generated from the OpenAI embedding model. Additional searchable fields like `ArticleTitle` and `ExtractedPath` are useful in this dataset, but you can customize your own dataset by adding or removing fields as needed.

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

StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 14, Finished, Available, Finished)
prioritized_content_fields is not a known attribute of class <class 'azure.search.documents.indexes._generated.models._models_py3.SemanticPrioritizedFields'> and will be ignored
demo-portland-tutorial created
    

The following code defines a User Defined Function (UDF) named `insertToAISearch` that inserts data into an Azure AI Search index. The integration between Azure and Spark offers a significant advantage for handling large datasets efficiently. Although the current dataset is not particularly large, employing Spark User-Defined Functions (UDFs) ensures readiness for future scalability. UDFs enable the creation of custom functions that can process Spark DataFrames, enhancing Spark's capabilities. This UDF, annotated with `@udf(returnType=StringType())`, specifies the return type as a string. The function takes five parameters: `Id`, `ArticleTitle`, `ExtractedPath`, `Chunk`, and `Embedding`. It constructs a URL for the Azure AI Search API, incorporating the search service name and index name. The function then creates a payload in JSON format, including the document fields and specifying the search action as `upload`. The headers are set to include the content type and the API key for authentication. A POST request is sent to the constructed URL with the headers and payload, and the response from the server is printed. This function facilitates the uploading of documents to the Azure AI Search index. Please make sure to include the fields specified in the previous section for your own dataset.

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
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 15, Finished, Available, Finished)


In the following, you will be using the previously defined UDF `insertToAISearch` to upload data from a DataFrame to the Azure AI Search index. The DataFrame `df_embeddings` contains fields such as `Id`, `ArticleTitle`, `ExtractedPath`, `Chunk`, and `Embedding`.

You apply the `insertToAISearch` function to each row to add a new column named `errorAISearch` to `df_embeddings`. This column captures responses from the Azure AI Search API, allowing you to check for any upload errors. This error checking ensures that each document is successfully uploaded to the search index.

Finally, you use the `display` function to examine the modified DataFrame `df_embeddings_ingested` visually and verify the processing accuracy.


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
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 16, Finished, Available, Finished)
SynapseWidget(Synapse.DataFrame, 5be010aa-4b2a-47b5-8008-978031e0795a)

You can now proceed to perform sanity checks to ensure the data has been correctly uploaded to the Azure AI Search index. First, count the number of successful uploads by filtering the DataFrame for rows where `errorAISearch` is "Success" and using the count method to determine the total. Next, identify unsuccessful uploads by filtering for rows containing errors in `errorAISearch` and count these occurrences. Print the counts of successful and unsuccessful uploads to summarize the results. If there are any unsuccessful uploads, use the show method to display details of those rows. This allows you to inspect and address any issues, ensuring the upload process is validated and any necessary corrective actions are taken.


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
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 17, Finished, Available, Finished)
Number of successful uploads: 172
Number of unsuccessful uploads: 0
   
## Step 6: Demonstrate Retrieval Augmented Generation

After you chunk, embed, and create a vector index, the final step is to use this indexed data to find and retrieve the most relevant information based on user queries. This allows the system to generate accurate responses or recommendations by leveraging the indexed data's organization and similarity scores from the embeddings. 

In the following, you create a function for retrieving chunks of relevant Wikipedia articles from the vector index named Azure AI Search. Whenever someone asks a new question, the system procedurally

- embed the question into a vector
- retrieve the top N chunks from Azure AI Search using the vector
- concatenate the results to get a single string


```python
import copy, json, os, requests, warnings

# implementation of retriever
def get_context_source(retrieve_results, question, topN=3, filter=''):
    """
    Retrieves contextual information and sources related to a given question using embeddings and a vector search.  
    Parameters:
    retrieve_results (function): implements one of retrieval methods with Azure AI search.
    question (str): The question for which the context and sources are to be retrieved.  
    topN (int, optional): The number of top results to retrieve. Default is 3.  
    filter (str, optional): The article title to filter retrieved chunks to. Default is '' (not applied).
      
    Returns:  
    List: A list containing three elements:  
        1. A string with the concatenated retrieved context.  
        2. A list of retrieved source paths.  
        3. A dataframe of retrieved chunks with metadata
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
 
# wrapper for vector search call 
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
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 18, Finished, Available, Finished)

```python
question = "How do elephants communicate over long distances?"
retrieved_context, retrieved_sources, df_chunks = get_context_source(vector_search, question)
df_chunks
```
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 19, Finished, Available, Finished)

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Embedding</th>
      <th>ExtractedPath</th>
      <th>ArticleTitle</th>
      <th>Chunk</th>
      <th>Id</th>
      <th>@search.score</th>
      <th>@search.reranker_score</th>
      <th>@search.highlights</th>
      <th>@search.captions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>[-0.03276262, -0.006002287, 0.009044814, -0.02...</td>
      <td>S08/data/set1/a5</td>
      <td>elephant</td>
      <td>hand, live mostly solitary lives.\n\nThe socia...</td>
      <td>131</td>
      <td>0.888358</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>[-0.011676712, -0.0079745, 0.001480885, -0.021...</td>
      <td>S08/data/set1/a5</td>
      <td>elephant</td>
      <td>farther north, in slightly cooler climates, an...</td>
      <td>130</td>
      <td>0.877915</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>[-0.018319938, -0.013896506, 0.014269567, -0.0...</td>
      <td>S08/data/set1/a5</td>
      <td>elephant</td>
      <td>trunk, which pick up the resonant vibrations m...</td>
      <td>132</td>
      <td>0.867543</td>
      <td>None</td>
      <td>None</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>

You need another function to get the response from the OpenAI Chat model. This function combines the user question with the context retrieved from Azure AI Search. This example is basic and doesn't include chat history or memory. First, you initialize the chat client with the chosen model and then perform a chat completion to obtain the response. The messages have a "system" content that can be adjusted to enhance the response's tone, conciseness, and other aspects.

```python
def get_answer(question, context):
    """  
    Generates a response to a given question using provided context and an Azure OpenAI model.  
    
    Parameters:  
        question (str): The question that needs to be answered.  
        context (str): The contextual information related to the question that will help generate a relevant response.  
    
    Returns:  
        str: The response generated by the Azure OpenAI model based on the provided question and context.  
    """
    messages = [
        {
            "role": "system",
            "content": "You are a helpful chat assistant who will be provided text information for you to refer to in response."
        }
    ]

    messages.append(
        {
            "role": "user", 
            "content": question + "\n" + context,
        },
    )
    response = openai.ChatCompletion.create(
        deployment_id='gpt-35-turbo-0125', # see the note in the cell below for an alternative deployment_id.
        messages= messages,
        temperature=0,
    )

    return response.choices[0].message.content

```
StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 20, Finished, Available, Finished)

Note: please consult the [documentation for python SDK](/fabric/data-science/ai-services/how-to-use-openai-sdk-synapse?tabs=python) for the other available deployment_ids. 


```python
answer = get_answer(question, retrieved_context)
print(answer)
```


StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 21, Finished, Available, Finished)

```
    Elephants communicate over long distances by producing and receiving low-frequency sounds known as infrasound. This sub-sonic rumbling can travel through the ground farther than sound travels through the air. Elephants can feel these vibrations through the sensitive skin of their feet and trunks. They use this method of communication to stay connected with other elephants over large distances. This ability to communicate through infrasound plays a crucial role in their social lives and helps them coordinate movements and interactions within their groups.
    
    The ability of elephants to recognize themselves in a mirror test demonstrates their self-awareness and cognitive abilities. This test involves marking an elephant and observing its reaction to its reflection in a mirror. Elephants have shown the capacity to understand that the image in the mirror is their own reflection, indicating a level of self-awareness similar to that seen in humans, apes, and dolphins.
    
    In addition to infrasound communication, elephants also use other forms of communication such as visual displays and olfactory cues. For example, during the mating period, male elephants emit a specific odor from a gland behind their eyes. They may fan their ears to help disperse this scent over long distances, a behavior theorized by researcher Joyce Poole as a way to attract potential mates.
    
    Overall, elephants have complex social structures and behaviors that involve various forms of communication to maintain relationships, coordinate movements, and express emotions within their groups.
``` 

You learn how to use the tools mentioned above to embed and chunk the CMU QA dataset for your RAG application. Now that you see the retrieval and answering functions in action, you can create a basic ipywidget to serve as a chatbot interface.  After running the cell below, enter your question and select `Enter` to get a response from the RAG solution. Modify the text to ask a new question and select `Enter` again.

> [!Tip]
> This RAG solution can make mistakes. Feel free to change the OpenAI model to gpt-4 or modify the system content prompt. 

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


StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 37, Finished, Available, Finished)



    Text(value='', continuous_update=False, description='Question:', layout=Layout(width='800px'), placeholder='Ty…



    HTML(value='', layout=Layout(width='800px'))



StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 38, Finished, Available, Finished)



StatementMeta(, c9c5b6e5-daf4-4265-babf-3a4ab57888cb, 39, Finished, Available, Finished)


This concludes the Quickstart tutorial on creating a RAG application in Fabric using Fabric's built-in OpenAI endpoint.

Fabric is a platform for unifying your company's data, empowering you to leverage knowledge for your GenAI applications effectively.