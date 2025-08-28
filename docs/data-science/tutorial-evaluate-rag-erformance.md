---
title: "Tutorial: Assessing RAG System Performance"
description: Learn how to evaluate RAG performance using Azure OpenAI and Azure AI Search with this step-by-step tutorial. Includes metrics, visualization, and benchmarking.
author: jonburchel
ms.author: jburchel
ms.reviewer: alsavelv
ms.date: 08/27/2025
ms.topic: tutorial
ms.service: azure-ai-foundry
ai.usage: ai-assisted
---
# Evaluation of RAG Performance Basics

### Introduction

This tutorial provides a quickstart guide to use Fabric for evaluating the performance RAG applications. Performance evaluation is focused on two main components of RAG: the retriever (in our scenario it is based on Azure AI Search) and response generator (an LLM that uses provided user query, retrieved context, and prompt to spit out a reply that can be served to the user).  The main steps in this tutorial are as following:

1. Set up Azure OpenAI and Azure AI Search Services
1. Load and manipulate the data from CMU's QA dataset of Wikipedia articles to curate a benchmark
1. Run a "smoke" test with one query to confirm that the RAG system works end-to-end
1. Define deterministic and AI-Assisted metrics that will be used for evaluation
1. Check-in #1 - evaluate the performance of retriever using "top-N accuracy score"
1. Check-in #2 - evaluate the performance of response generator using Groundedness, Relevance, and Similarity metrics
1. Visualize results and preserve evaluation results in OneLake for future reference and continuous evaluation

### Prerequisites

‼️ Prior to starting this tutorial, please complete "Building Retrieval Augmented Generation in Fabric: A Step-by-Step Guide" [here](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/genai-guidance/00-quickstart/quickstart-bring-your-own-keys/quickstart-genai-guidance.ipynb)

You need the following services to run this notebook:

- [Microsoft Fabric](https://aka.ms/fabric/getting-started)
- [Add a lakehouse](https://aka.ms/fabric/addlakehouse) to this notebook (it should have data populated with steps from previous tutorial).
- [Azure AI Studio for OpenAI](https://aka.ms/what-is-ai-studio)
- [Azure AI Search](https://aka.ms/azure-ai-search) (it should have data populated with steps from previous tutorial).

In the previous tutorial, you have uploaded data to your lakehouse and built an index of documents that is in the backend of RAG. The index will be used here as part of an exercise to learn the main techniques for evaluation of RAG performance and identification of potential problems. If you haven't done this yet, or removed previously created index, please follow [here](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/genai-guidance/00-quickstart/quickstart-bring-your-own-keys/quickstart-genai-guidance.ipynb) to complete that prerequisite.


:::image type="content" source="media/tutorial-evaluate-rag-performance/user-conversation-rag-diagram.png" alt-text="Screenshot of diagram showing the flow of a user conversation with the RAG system." lightbox="media/tutorial-evaluate-rag-performance/user-conversation-rag-diagram.png":::


### Set up access to Azure Open AI and Azure AI Search

Define the endpoints and the required keys. Then import required libraries and functions. Instantiate clients for Azure OpenAI and Azure AI Search. Finally, define a function wrapper with a prompt for querying RAG system.


```textpython
# Fill in the following lines with your Azure OpenAI service information
aoai_endpoint = "https://.openai.azure.com" # TODO: Provide the URL endpoint for your created Azure OpenAI
aoai_key = "" # TODO: Fill in your API key from Azure OpenAI 
aoai_deployment_name_embeddings = "text-embedding-ada-002"
aoai_model_name_query = "gpt-4-32k"  
aoai_model_name_metrics = "gpt-4-32k"
aoai_api_version = "2024-02-01"

# Setup key accesses to Azure AI Search
aisearch_index_name = "" # TODO: Create a new index name: must only contain lowercase, numbers, and dashes
aisearch_api_key = "" # TODO: Fill in your API key from Azure AI Search
aisearch_endpoint = "https://.search.windows.net" # TODO: Provide the url endpoint for your created Azure AI Search 
```


```python
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning) 

import os, requests, json, warnings

from datetime import datetime, timedelta
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient

from pyspark.sql import functions as F
from pyspark.sql.functions import to_timestamp, current_timestamp, concat, col, split, explode, udf, monotonically_increasing_id, when, rand, coalesce, lit, input_file_name, regexp_extract, concat_ws, length, ceil, lit, current_timestamp
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

import openai 
from openai import AzureOpenAI
import uuid
import matplotlib.pyplot as plt
from synapse.ml.featurize.text import PageSplitter
import ipywidgets as widgets  
from IPython.display import display as w_display
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 6, Finished, Available, Finished)


```python
# Configure access to OpenAI endpoint
openai.api_type = "azure"
openai.api_key = aoai_key
openai.api_base = aoai_endpoint
openai.api_version = aoai_api_version

# Create client for accessing embedding endpoint
embed_client = AzureOpenAI(
    api_version=aoai_api_version,
    azure_endpoint=aoai_endpoint,
    api_key=aoai_key,
)

# Create client for accessing chat endpoint
chat_client = AzureOpenAI(
    azure_endpoint=aoai_endpoint,
    api_key=aoai_key,
    api_version=aoai_api_version,
)

# Configure access to Azure AI Search
search_client = SearchClient(
    aisearch_endpoint,
    aisearch_index_name,
    credential=AzureKeyCredential(aisearch_api_key)
)
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 7, Finished, Available, Finished)


Definitions of functions below are the implementations of two main components of RAG - retriever (`get_context_source`) and response generator (`get_answer`). This code within these functions should be already familiar to you from the previous tutorial. Note the `topN` parameter - it allows you to configure how many relevant resources to fetch from the index (we will use 3 in this tutorial, but optimal value may vary for different data):


```python
# implementation of retriever
def get_context_source(question, topN=3):
    """
    Retrieves contextual information and sources related to a given question using embeddings and a vector search.  
    Parameters:  
    question (str): The question for which the context and sources are to be retrieved.  
    topN (int, optional): The number of top results to retrieve. Default is 3.  
      
    Returns:  
    List: A list containing two elements:  
        1. A string with the concatenated retrieved context.  
        2. A list of retrieved source paths.  
    """
    embed_client = openai.AzureOpenAI(
        api_version=aoai_api_version,
        azure_endpoint=aoai_endpoint,
        api_key=aoai_key,
    )

    query_embedding = embed_client.embeddings.create(input=question, model=aoai_deployment_name_embeddings).data[0].embedding

    vector_query = VectorizedQuery(vector=query_embedding, k_nearest_neighbors=topN, fields="Embedding")

    results = search_client.search(   
        vector_queries=[vector_query],
        top=topN,
    )

    retrieved_context = ""
    retrieved_sources = []
    for result in results:
        retrieved_context += result['ExtractedPath'] + "\n" + result['Chunk'] + "\n\n"
        retrieved_sources.append(result['ExtractedPath'])

    return [retrieved_context, retrieved_sources]

# Implementation of response generator
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
            "content": "You are a chat assistant who will be provided text information for grounding your response. Give a one-word answer whenever possible ('yes'/'no' is ok where appropriate, no details). For every word in the response that's not critical, you'll be penalized $500."
        }
    ]

    messages.append(
        {
            "role": "user", 
            "content": question + "\n" + context,
        },
    )

    chat_client = openai.AzureOpenAI(
        azure_endpoint=aoai_endpoint,
        api_key=aoai_key,
        api_version=aoai_api_version,
    )

    chat_completion = chat_client.chat.completions.create(
        model=aoai_model_name_query,
        messages=messages,
    )

    return chat_completion.choices[0].message.content
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 8, Finished, Available, Finished)


## Dataset

The Carnegie Mellon University Question-Answer dataset version 1.2 is a corpus of Wikipedia articles, manually generated factual questions based on the articles, and manually generated answers. The data is hosted in Azure Blob Storage under the same GFDL license. For simplicity, the dataset uses a single structured table with the following fields.

* ArticleTitle: the name of the Wikipedia article from which questions and answers initially came.
* Question: manually generated question based on the article.
* Answer: manually generated answer based on the question and the article.
* DifficultyFromQuestioner: prescribed difficulty rating for the question as given to the question writer.
* DifficultyFromAnswerer: difficulty rating assigned by the individual who evaluated and answered the question, which might differ from the rating in DifficultyFromQuestioner.
* ExtractedPath: path to the original article. There can be more than one question-answer pair per article.
* text: cleaned Wikipedia articles.

For more information about the license, download the LICENSE-S08,S09 file from the same location.

## History and citation

Use the following citation for this dataset:

```
CMU Question/Answer Dataset, Release 1.2

8/23/2013

Noah A. Smith, Michael Heilman, and Rebecca Hwa

Question Generation as a Competitive Undergraduate Course Project

In Proceedings of the NSF Workshop on the Question Generation Shared Task and Evaluation Challenge, Arlington, VA, September 2008. 
Available at http://www.cs.cmu.edu/~nasmith/papers/smith+heilman+hwa.nsf08.pdf.

Original dataset acknowledgments:
This research project was supported by NSF IIS-0713265 (to Smith), an NSF Graduate Research Fellowship (to Heilman), NSF IIS-0712810 and IIS-0745914 (to Hwa), and Institute of Education Sciences, U.S. Department of Education R305B040063 (to Carnegie Mellon).

cmu-qa-08-09 (modified version)

6/12/2024

Amir Jafari, Alexandra Savelieva, Brice Chung, Hossein Khadivi Heris, Journey McDowell

Released under the same license, GFDL (http://www.gnu.org/licenses/fdl.html).
The GNU license applies to the dataset in all copies.
```


## Create benchmark

Import the benchmark. For this demo, use a subset of questions prepared by CMU students in the `S08/set1` and `S08/set2` buckets. To limit to one question per article, apply `df.dropDuplicates(["ExtractedPath"])` to the data. There are also duplicate questions-so drop duplicates. Labels on the complexity of questions have been provided as part of the curation process: in the below example they're limited to `medium`. 


```python
df = spark.sql("SELECT * FROM data_load_tests.cmu_qa")

# Filter the DataFrame to include only the specified paths
df = df.filter((col("ExtractedPath").like("S08/data/set1/%")) | (col("ExtractedPath").like("S08/data/set2/%")))

# Choose questions 
df = df.filter(col("DifficultyFromQuestioner") == "medium")


# Drop duplicate questions
df = df.dropDuplicates(["Question"])
df = df.dropDuplicates(["ExtractedPath"])

num_rows = df.count()
num_columns = len(df.columns)
print(f"Number of rows: {num_rows}, Number of columns: {num_columns}")

# Persist the DataFrame
df.persist()
display(df)
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 9, Finished, Available, Finished)


    Number of rows: 20, Number of columns: 7
    


    SynapseWidget(Synapse.DataFrame, 47aff8cb-72f8-4a36-885c-f4f3bb830a91)


The result is a DataFrame with 20 rows-this is the demo benchmark. Important fields are `Question`, `Answer` (human-curated 'ground truth' answer), and `ExtractedPath` (the source document where information is found). Modify the filtering criteria to include other questions and vary complexity for a more realistic example. Try this as an exercise for additional experiments.

## Run a simple end-to-end test

Start with a simple end-to-end smoke test of retrieval-augmented generation (RAG):


```python
question = "How many suborders are turtles divided into?"
retrieved_context, retrieved_sources = get_context_source(question)
answer = get_answer(question, retrieved_context)
print(answer)
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 10, Finished, Available, Finished)


    Three
    

Although it's quick to run, this test is informative because it helps you quickly find issues in the RAG implementation. It can fail if credentials are incorrect, a vector index is missing or empty, or function interfaces are incompatible. If it fails, pause and check for issues. The expected output is `Three`. If the smoke test passes, go to the next section to evaluate RAG in more detail. 

# Establish metrics

Define a deterministic metric to evaluate the retriever. It's inspired by search engines and is familiar to people with that background. It checks whether the list of retrieved sources includes the ground truth source. This metric is often called a top N accuracy score because the `topN` parameter controls the number of retrieved sources.


```python
def get_retrieval_score(target_source, retrieved_sources):
    if target_source in retrieved_sources: 
        return 1
    else: 
        return 0
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 11, Finished, Available, Finished)


According to the benchmark, the answer is contained in the source with id `"S08/data/set1/a9"`. Test the function on the example we ran above returns `1`, as expected, because it is returned in top 3 relevant text chunks (in fact, it is the first in the list!):


```python
print("Retrieved sources: ", retrieved_sources)
get_retrieval_score("S08/data/set1/a9", retrieved_sources)
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 12, Finished, Available, Finished)


    Retrieved sources:  ['S08/data/set1/a9', 'S08/data/set1/a9', 'S08/data/set1/a5']
    



    1



This section defines AI-assisted metrics. The prompt template includes a few examples of input (CONTEXT and ANSWER) and suggested output; this is called a few-shot model. It's the same prompt that's used in Azure AI Studio. Learn more in [Built-in evaluation metrics](/azure/ai-studio/concepts/evaluation-metrics-built-in?tabs=warning#ai-assisted-relevance). This demo uses the `groundedness` and `relevance` metrics-these are usually the most useful and reliable for evaluating GPT models. Other metrics can be useful but provide less intuition-for example, answers don't have to be similar to be correct, so `similarity` scores can be misleading. The scale for all metrics is 1 to 5. Higher is better. Groundedness takes only two inputs (context and generated answer), while the other two metrics also use ground truth for evaluation. 



```python
def get_groundedness_metric(context, answer):
    """ Using context and answer, get groundedness score with the help of LLM"""

    groundedness_prompt_template = """
    You will be presented with a CONTEXT and an ANSWER about that CONTEXT. You need to decide whether the ANSWER is entailed by the CONTEXT by choosing one of the following rating:
    1. 5: The ANSWER follows logically from the information contained in the CONTEXT.
    2. 1: The ANSWER is logically false from the information contained in the CONTEXT.
    3. an integer score between 1 and 5 and if such integer score does not exist, use 1: It is not possible to determine whether the ANSWER is true or false without further information. Read the passage of information thoroughly and select the correct answer from the three answer labels. Read the CONTEXT thoroughly to ensure you know what the CONTEXT entails. Note the ANSWER is generated by a computer system, it can contain certain symbols, which should not be a negative factor in the evaluation.
    Independent Examples:
    ## Example Task #1 Input:
    "CONTEXT": "Some are reported as not having been wanted at all.", "QUESTION": "", "ANSWER": "All are reported as being completely and fully wanted."
    ## Example Task #1 Output:
    1
    ## Example Task #2 Input:
    "CONTEXT": "Ten new television shows appeared during the month of September. Five of the shows were sitcoms, three were hourlong dramas, and two were news-magazine shows. By January, only seven of these new shows were still on the air. Five of the shows that remained were sitcoms.", "QUESTION": "", "ANSWER": "At least one of the shows that were cancelled was an hourlong drama."
    ## Example Task #2 Output:
    5
    ## Example Task #3 Input:
    "CONTEXT": "In Quebec, an allophone is a resident, usually an immigrant, whose mother tongue or home language is neither French nor English.", "QUESTION": "", "ANSWER": "In Quebec, an allophone is a resident, usually an immigrant, whose mother tongue or home language is not French."
    5
    ## Example Task #4 Input:
    "CONTEXT": "Some are reported as not having been wanted at all.", "QUESTION": "", "ANSWER": "All are reported as being completely and fully wanted."
    ## Example Task #4 Output:
    1
    ## Actual Task Input:
    "CONTEXT": {context}, "QUESTION": "", "ANSWER": {answer}
    Reminder: The return values for each task should be correctly formatted as an integer between 1 and 5. Do not repeat the context and question.  Don't explain the reasoning. The answer should include only a number: 1, 2, 3, 4, or 5.
    Actual Task Output:
    """

    metric_client = openai.AzureOpenAI(
        api_version=aoai_api_version,
        azure_endpoint=aoai_endpoint,
        api_key=aoai_key,
    )

    messages = [
        {
            "role": "system",
            "content": "You are an AI assistant. You will be given the definition of an evaluation metric for assessing the quality of an answer in a question-answering task. Your job is to compute an accurate evaluation score using the provided evaluation metric."
        }, 
        {
            "role": "user",
            "content": groundedness_prompt_template.format(context=context, answer=answer)
        }
    ]

    metric_completion = metric_client.chat.completions.create(
        model=aoai_model_name_metrics,
        messages=messages,
        temperature=0,
    )

    return metric_completion.choices[0].message.content

```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 13, Finished, Available, Finished)



```python
def get_relevance_metric(context, question, answer):    
    relevance_prompt_template = """
    Relevance measures how well the answer addresses the main aspects of the question, based on the context. Consider whether all and only the important aspects are contained in the answer when evaluating relevance. Given the context and question, score the relevance of the answer between one to five stars using the following rating scale:
    One star: the answer completely lacks relevance
    Two stars: the answer mostly lacks relevance
    Three stars: the answer is partially relevant
    Four stars: the answer is mostly relevant
    Five stars: the answer has perfect relevance

    This rating value should always be an integer between 1 and 5. So the rating produced should be 1 or 2 or 3 or 4 or 5.

    context: Marie Curie was a Polish-born physicist and chemist who pioneered research on radioactivity and was the first woman to win a Nobel Prize.
    question: What field did Marie Curie excel in?
    answer: Marie Curie was a renowned painter who focused mainly on impressionist styles and techniques.
    stars: 1

    context: The Beatles were an English rock band formed in Liverpool in 1960, and they are widely regarded as the most influential music band in history.
    question: Where were The Beatles formed?
    answer: The band The Beatles began their journey in London, England, and they changed the history of music.
    stars: 2

    context: The recent Mars rover, Perseverance, was launched in 2020 with the main goal of searching for signs of ancient life on Mars. The rover also carries an experiment called MOXIE, which aims to generate oxygen from the Martian atmosphere.
    question: What are the main goals of Perseverance Mars rover mission?
    answer: The Perseverance Mars rover mission focuses on searching for signs of ancient life on Mars.
    stars: 3

    context: The Mediterranean diet is a commonly recommended dietary plan that emphasizes fruits, vegetables, whole grains, legumes, lean proteins, and healthy fats. Studies have shown that it offers numerous health benefits, including a reduced risk of heart disease and improved cognitive health.
    question: What are the main components of the Mediterranean diet?
    answer: The Mediterranean diet primarily consists of fruits, vegetables, whole grains, and legumes.
    stars: 4

    context: The Queen's Royal Castle is a well-known tourist attraction in the United Kingdom. It spans over 500 acres and contains extensive gardens and parks. The castle was built in the 15th century and has been home to generations of royalty.
    question: What are the main attractions of the Queen's Royal Castle?
    answer: The main attractions of the Queen's Royal Castle are its expansive 500-acre grounds, extensive gardens, parks, and the historical castle itself, which dates back to the 15th century and has housed generations of royalty.
    stars: 5

    Don't explain the reasoning. The answer should include only a number: 1, 2, 3, 4, or 5.

    context: {context}
    question: {question}
    answer: {answer}
    stars:
    """

    metric_client = openai.AzureOpenAI(
        api_version=aoai_api_version,
        azure_endpoint=aoai_endpoint,
        api_key=aoai_key,
    )


    messages = [
        {
            "role": "system",
            "content": " You are an AI assistant. You will be given the definition of an evaluation metric for assessing the quality of an answer in a question-answering task. Your job is to compute an accurate evaluation score using the provided evaluation metric."
        }, 
        {
            "role": "user",
            "content": relevance_prompt_template.format(context=context, question=question, answer=answer)
        }
    ]

    metric_completion = metric_client.chat.completions.create(
        model=aoai_model_name_metrics,
        messages=messages,
        temperature=0,
    )

    return metric_completion.choices[0].message.content

```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 14, Finished, Available, Finished)



```python
def get_similarity_metric(question, ground_truth, answer):
    similarity_prompt_template = """
    Equivalence, as a metric, measures the similarity between the predicted answer and the correct answer. If the information and content in the predicted answer is similar or equivalent to the correct answer, then the value of the Equivalence metric should be high, else it should be low. Given the question, correct answer, and predicted answer, determine the value of Equivalence metric using the following rating scale:
    One star: the predicted answer is not at all similar to the correct answer
    Two stars: the predicted answer is mostly not similar to the correct answer
    Three stars: the predicted answer is somewhat similar to the correct answer
    Four stars: the predicted answer is mostly similar to the correct answer
    Five stars: the predicted answer is completely similar to the correct answer

    This rating value should always be an integer between 1 and 5. So the rating produced should be 1 or 2 or 3 or 4 or 5.

    The examples below show the Equivalence score for a question, a correct answer, and a predicted answer.

    question: What is the role of ribosomes?
    correct answer: Ribosomes are cellular structures responsible for protein synthesis. They interpret the genetic information carried by messenger RNA (mRNA) and use it to assemble amino acids into proteins.
    predicted answer: Ribosomes participate in carbohydrate breakdown by removing nutrients from complex sugar molecules.
    stars: 1

    question: Why did the Titanic sink?
    correct answer: The Titanic sank after it struck an iceberg during its maiden voyage in 1912. The impact caused the ship's hull to breach, allowing water to flood into the vessel. The ship's design, lifeboat shortage, and lack of timely rescue efforts contributed to the tragic loss of life.
    predicted answer: The sinking of the Titanic was a result of a large iceberg collision. This caused the ship to take on water and eventually sink, leading to the death of many passengers due to a shortage of lifeboats and insufficient rescue attempts.
    stars: 2

    question: What causes seasons on Earth?
    correct answer: Seasons on Earth are caused by the tilt of the Earth's axis and its revolution around the Sun. As the Earth orbits the Sun, the tilt causes different parts of the planet to receive varying amounts of sunlight, resulting in changes in temperature and weather patterns.
    predicted answer: Seasons occur because of the Earth's rotation and its elliptical orbit around the Sun. The tilt of the Earth's axis causes regions to be subjected to different sunlight intensities, which leads to temperature fluctuations and alternating weather conditions.
    stars: 3

    question: How does photosynthesis work?
    correct answer: Photosynthesis is a process by which green plants and some other organisms convert light energy into chemical energy. This occurs as light is absorbed by chlorophyll molecules, and then carbon dioxide and water are converted into glucose and oxygen through a series of reactions.
    predicted answer: In photosynthesis, sunlight is transformed into nutrients by plants and certain microorganisms. Light is captured by chlorophyll molecules, followed by the conversion of carbon dioxide and water into sugar and oxygen through multiple reactions.
    stars: 4

    question: What are the health benefits of regular exercise?
    correct answer: Regular exercise can help maintain a healthy weight, increase muscle and bone strength, and reduce the risk of chronic diseases. It also promotes mental well-being by reducing stress and improving overall mood.
    predicted answer: Routine physical activity can contribute to maintaining ideal body weight, enhancing muscle and bone strength, and preventing chronic illnesses. In addition, it supports mental health by alleviating stress and augmenting general mood.
    stars: 5

    Don't explain the reasoning. The answer should include only a number: 1, 2, 3, 4, or 5.

    question: {question}
    correct answer:{ground_truth}
    predicted answer: {answer}
    stars:
    """
    
    metric_client = openai.AzureOpenAI(
        api_version=aoai_api_version,
        azure_endpoint=aoai_endpoint,
        api_key=aoai_key,
    )

    messages = [
        {
            "role": "system",
            "content": "You are an AI assistant. You will be given the definition of an evaluation metric for assessing the quality of an answer in a question-answering task. Your job is to compute an accurate evaluation score using the provided evaluation metric."
        }, 
        {
            "role": "user",
            "content": similarity_prompt_template.format(question=question, ground_truth=ground_truth, answer=answer)
        }
    ]

    metric_completion = metric_client.chat.completions.create(
        model=aoai_model_name_metrics,
        messages=messages,
        temperature=0,
    )

    return metric_completion.choices[0].message.content

```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 15, Finished, Available, Finished)


Test the relevance metric:


```python
get_relevance_metric(retrieved_context, question, answer)
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 16, Finished, Available, Finished)




    '2'



A score of 5 means the answer is very relevant to the question. Here's the similarity metric:


```python
get_similarity_metric(question, 'three', answer)
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 17, Finished, Available, Finished)




    '5'



A score of 5 means the answer is completely similar to the ground truth answer curated by a human expert. Keep in mind that AI-assisted metrics can fluctuate for the same input. Using them is usually faster than involving human judges.

## Evaluate RAG performance on benchmark Q&A

To run at scale, create wrappers for functions. It's important to create a wrapper for each function that ends with `_udf` (short for `user-defined function`), conforms to Spark framework requirements (`@udf(returnType=StructType([ ... ]))`), and lets you run calculations on large data faster in a distributed manner.


```python
# UDF wrappers for RAG components
@udf(returnType=StructType([  
    StructField("retrieved_context", StringType(), True),  
    StructField("retrieved_sources", ArrayType(StringType()), True)  
]))
def get_context_source_udf(question, topN=3):
    return get_context_source(question, topN)

@udf(returnType=StringType())
def get_answer_udf(question, context):
    return get_answer(question, context)


# UDF wrapper for retrieval score
@udf(returnType=StringType())
def get_retrieval_score_udf(target_source, retrieved_sources):
    return get_retrieval_score(target_source, retrieved_sources)


# UDF wrappers for AI-assisted metrics
@udf(returnType=StringType())
def get_groundedness_metric_udf(context, answer):
    return get_groundedness_metric(context, answer)

@udf(returnType=StringType())
def get_relevance_metric_udf(context, question, answer): 
    return get_relevance_metric(context, question, answer)

@udf(returnType=StringType())
def get_similarity_metric_udf(question, ground_truth, answer):
    return get_similarity_metric(question, ground_truth, answer)
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 18, Finished, Available, Finished)


### Check-in #1: performance of the retriever

The following code creates the `result` and `retrieval_score` columns in the benchmark DataFrame. These columns include the RAG-generated answer and an indicator of whether the context provided to the LLM includes the article the question is based on.


```python
df = df.withColumn("result", get_context_source_udf(df.Question)).select(df.columns+["result.*"])
df = df.withColumn('retrieval_score', get_retrieval_score_udf(df.ExtractedPath, df.retrieved_sources))
print("Aggregate Retrieval score: {:.2f}%".format((df.where(df["retrieval_score"] == 1).count() / df.count()) * 100))
display(df.select(["question", "retrieval_score",  "ExtractedPath", "retrieved_sources"]))
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 19, Finished, Available, Finished)


    Aggregate Retrieval score: 100.00%
    


    SynapseWidget(Synapse.DataFrame, 14efe386-836a-4765-bd88-b121f32c7cfc)


For all questions, the correct context was fetched, and in most cases it's the first entry in the list. Azure AI Search did a great job. You might wonder why, in some cases, the context has two or three identical values. That's not an error-it means the retriever fetched fragments of the same article that didn't fit into one chunk during splitting.

### Check-in #2: performance of the response generator


Pass the question and context to the LLM to generate an answer, and store it in the `generated_answer` column in the DataFrame:


```python
df = df.withColumn('generated_answer', get_answer_udf(df.Question, df.retrieved_context))
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 20, Finished, Available, Finished)


Use the generated answer, ground-truth answer, question, and context to calculate metrics and display evaluation results for each question-answer pair:


```python
df = df.withColumn('gpt_groundedness', get_groundedness_metric_udf(df.retrieved_context, df.generated_answer))
df = df.withColumn('gpt_relevance', get_relevance_metric_udf(df.retrieved_context, df.Question, df.generated_answer))
df = df.withColumn('gpt_similarity', get_similarity_metric_udf(df.Question, df.Answer, df.generated_answer))
display(df.select(["question", "answer", "generated_answer", "retrieval_score", "gpt_groundedness","gpt_relevance", "gpt_similarity"]))
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 21, Finished, Available, Finished)



    SynapseWidget(Synapse.DataFrame, 22b97d27-91e1-40f3-b888-3a3399de9d6b)


What do these values show? To make them easier to interpret, plot histograms of groundedness, relevance, and similarity. The LLM is more verbose than the human-written ground-truth answers, which affects the similarity metric (about half of the answers are semantically correct but get 4 stars as mostly similar). Most values for all three metrics are 4 or 5, which suggests that RAG performance is good. There are a few outliers-for example, for the question `How many species of otter are there?`, the model generated `There are 13 species of otter`, which is correct with high relevance and similarity (5). For some reason, GPT considered it poorly grounded in the provided context and gave it 1 star. In the other three cases with at least one AI-assisted metric of 1 star, the low score points to a bad answer. Like humans, the LLM is occasionally wrong in evaluation, but in most cases it does a good job.



```python
# Convert Spark DataFrame to Pandas DataFrame
pandas_df = df.toPandas()

selected_columns = ['gpt_groundedness', 'gpt_relevance', 'gpt_similarity']
trimmed_df = pandas_df[selected_columns].astype(int)

# Define a function to plot histograms for the specified columns
def plot_histograms(dataframe, columns):
    # Set up the figure size and subplots
    plt.figure(figsize=(15, 5))
    for i, column in enumerate(columns, 1):
        plt.subplot(1, len(columns), i)
        # Filter the dataframe to only include rows with values 1, 2, 3, 4, 5
        filtered_df = dataframe[dataframe[column].isin([1, 2, 3, 4, 5])]
        filtered_df[column].hist(bins=range(1, 7), align='left', rwidth=0.8)
        plt.title(f'Histogram of {column}')
        plt.xlabel('Values')
        plt.ylabel('Frequency')
        plt.xticks(range(1, 6))
        plt.yticks(range(0, 20, 2))


# Call the function to plot histograms for the specified columns
plot_histograms(trimmed_df, selected_columns)

# Show the plots
plt.tight_layout()
plt.show()
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 24, Finished, Available, Finished)


    
:::image type="content" source="media/tutorial-evaluate-rag-performance/evaluate-rag-gpt-scores-histogram.png" alt-text="Screenshot of histograms that show the distribution of GPT relevance and similarity scores for the evaluated questions." lightbox="media/tutorial-evaluate-rag-performance/evaluate-rag-gpt-scores-histogram.png":::
    


As a final step, save the benchmark results to a table in your lakehouse. This step is optional but highly recommended-it makes your findings more useful. When you change something in the RAG (for example, modify the prompt, update the index, or use a different GPT model in the response generator), you can measure the impact, quantify improvements, and detect regressions.


```python
# create name of experiment that is easy to refer to
friendly_name_of_experiment = "rag_tutorial_experiment_1"

# Note the current date and time  
time_of_experiment = current_timestamp()

# Generate a unique GUID for all rows
experiment_id = str(uuid.uuid4())

# Add two new columns to the Spark DataFrame
updated_df = df.withColumn("execution_time", time_of_experiment) \
                        .withColumn("experiment_id", lit(experiment_id)) \
                        .withColumn("experiment_friendly_name", lit(friendly_name_of_experiment))

# Store the updated DataFrame in the default lakehouse as a table named 'rag_experiment_runs'
table_name = "rag_experiment_run_demo1" 
updated_df.write.format("parquet").mode("append").saveAsTable(table_name)
```


    StatementMeta(, 21cb8cd3-7742-4c1f-8339-265e2846df1d, 28, Finished, Available, Finished)


You can return to your experiment results at any time to review them, compare with new experiments, and choose the configuration that works best for your production release. 

## Summary

By now, you're comfortable using AI-assisted metrics and the top N retrieval rate to build your retrieval-augmented generation (RAG) solution.

In the upcoming tutorials, you continue your generative AI (GenAI) journey with Microsoft Fabric-the next steps show how to change your RAG configuration to fit your scenario.
