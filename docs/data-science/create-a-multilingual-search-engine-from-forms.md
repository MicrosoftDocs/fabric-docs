---
title: Build a Search Engine
description: Build a custom search engine and question-answering system with SynapseML.
ms.topic: tutorial
ms.custom: dev-focus
ai-usage: ai-assisted
ms.author: scottpolly
author: s-polly
ms.reviewer: jessiwang
ms.date: 03/02/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---
# Tutorial: Create a custom search engine and question-answering system

In this tutorial, you load invoices into Spark, extract structured data with Azure Document Intelligence, translate text, enrich with Azure OpenAI, and write results to an Azure AI Search index you can query. The tutorial takes approximately 30 minutes to complete.

## Prerequisites

- A [Microsoft Fabric subscription](../enterprise/licenses.md). Or, sign up for a free [Microsoft Fabric trial](../fundamentals/fabric-trial.md).
- A Fabric notebook attached to a lakehouse
- An [Azure AI services](/azure/ai-services/what-are-ai-services) (Foundry Tools) resource and key
- An [Azure Translator](/azure/ai-services/translator/overview) resource and key
- An [Azure AI Search](/azure/search/search-what-is-azure-search) service and admin key
- An [Azure OpenAI](/azure/ai-services/openai/overview) resource with a `gpt-4o-mini` (or equivalent) deployment

## Set up dependencies

Import packages and connect to the Azure resources used in this workflow.


```python
import os
from pyspark.sql import SparkSession
from synapse.ml.core.platform import running_on_synapse, find_secret

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()

cognitive_key = find_secret("Foundry-resource-key") # replace with your Azure AI services key
cognitive_location = "eastus"

translator_key = find_secret("translator-key") # replace with your Azure Translator resource key
translator_location = "eastus"

search_key = find_secret("azure-search-key") # replace with your Azure AI Search key
search_service = "mmlspark-azure-search"
search_index = "form-demo-index-5"

openai_key = find_secret("openai-api-key") # replace with your Azure OpenAI key
openai_service_name = "synapseml-openai"
openai_deployment_name = "gpt-4o-mini"
openai_url = f"https://{openai_service_name}.openai.azure.com/"
```

## Load data into Spark

This code loads a few external files from an Azure storage account that's used for demo purposes. The files are various invoices, and the code reads them into a data frame.


```python
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType


def blob_to_url(blob):
    [prefix, postfix] = blob.split("@")
    container = prefix.split("/")[-1]
    split_postfix = postfix.split("/")
    account = split_postfix[0]
    filepath = "/".join(split_postfix[1:])
    return "https://{}/{}/{}".format(account, container, filepath)


df2 = (
    spark.read.format("binaryFile")
    .load("wasbs://ignite2021@mmlsparkdemo.blob.core.windows.net/form_subset/*")
    .select("path")
    .limit(10)
    .select(udf(blob_to_url, StringType())("path").alias("url"))
    .cache()
)

display(df2)
```


## Apply document intelligence

This code loads the [AnalyzeInvoices transformer](https://microsoft.github.io/SynapseML/docs/Explore%20Algorithms/AI%20Services/Overview/#form-recognizer) and passes a reference to the data frame containing the invoices. It calls the prebuilt invoice model of Azure Document Intelligence.


```python
from synapse.ml.cognitive import AnalyzeInvoices

analyzed_df = (
    AnalyzeInvoices()
    .setSubscriptionKey(cognitive_key)
    .setLocation(cognitive_location)
    .setImageUrlCol("url")
    .setOutputCol("invoices")
    .setErrorCol("errors")
    .setConcurrency(5)
    .transform(df2)
    .cache()
)

display(analyzed_df)
```

## Simplify document intelligence output

The [FormOntologyLearner](https://mmlspark.blob.core.windows.net/docs/0.10.0/pyspark/synapse.ml.cognitive.html#module-synapse.ml.cognitive.FormOntologyTransformer) transformer infers a tabular structure from the dynamic `AnalyzeInvoices` output, organizing it into columns and rows for simpler downstream analysis.

```python
from synapse.ml.cognitive import FormOntologyLearner

organized_df = (
    FormOntologyLearner()
    .setInputCol("invoices")
    .setOutputCol("extracted")
    .fit(analyzed_df)
    .transform(analyzed_df)
    .select("url", "extracted.*")
    .cache()
)

display(organized_df)
```

By using a tabular dataframe, you can flatten the nested tables found in the forms by using SparkSQL.


```python
from pyspark.sql.functions import explode, col

itemized_df = (
    organized_df.select("*", explode(col("Items")).alias("Item"))
    .drop("Items")
    .select("Item.*", "*")
    .drop("Item")
)

display(itemized_df)
```

## Add translations

This code loads [Translate](https://microsoft.github.io/SynapseML/docs/Explore%20Algorithms/AI%20Services/Overview/#translation), a transformer that calls the Azure Translator in Foundry Tools service. The original text, which is in English in the "Description" column, is machine-translated into various languages. All of the output is consolidated into "output.translations" array.


```python
from synapse.ml.cognitive import Translate

translated_df = (
    Translate()
    .setSubscriptionKey(translator_key)
    .setLocation(translator_location)
    .setTextCol("Description")
    .setErrorCol("TranslationError")
    .setOutputCol("output")
    .setToLanguage(["zh-Hans", "fr", "ru", "cy"])
    .setConcurrency(5)
    .transform(itemized_df)
    .withColumn("Translations", col("output.translations")[0])
    .drop("output", "TranslationError")
    .cache()
)

display(translated_df)
```

## Translate products to emojis with OpenAI 🤯


```python
from synapse.ml.cognitive.openai import OpenAIPrompt
from pyspark.sql.functions import trim, split

emoji_template = """ 
  Your job is to translate item names into emoji. Do not add anything but the emoji and end the translation with a comma
  
  Two Ducks: 🦆🦆,
  Light Bulb: 💡,
  Three Peaches: 🍑🍑🍑,
  Two kitchen stoves: ♨️♨️,
  A red car: 🚗,
  A person and a cat: 🧍🐈,
  A {Description}: """

prompter = (
    OpenAIPrompt()
    .setSubscriptionKey(openai_key)
    .setDeploymentName(openai_deployment_name)
    .setUrl(openai_url)
    .setMaxTokens(5)
    .setPromptTemplate(emoji_template)
    .setErrorCol("error")
    .setOutputCol("Emoji")
)

emoji_df = (
    prompter.transform(translated_df)
    .withColumn("Emoji", trim(split(col("Emoji"), ",").getItem(0)))
    .drop("error", "prompt")
    .cache()
)
```


```python
display(emoji_df.select("Description", "Emoji"))
```

## Infer vendor address continent with OpenAI


```python
continent_template = """
Which continent does the following address belong to? 

Pick one value from Europe, Australia, North America, South America, Asia, Africa, Antarctica. 

Dont respond with anything but one of the above. If you don't know the answer or cannot figure it out from the text, return None. End your answer with a comma.

Address: "6693 Ryan Rd, North Whales",
Continent: Europe,
Address: "6693 Ryan Rd",
Continent: None,
Address: "{VendorAddress}",
Continent:"""

continent_df = (
    prompter.setOutputCol("Continent")
    .setPromptTemplate(continent_template)
    .transform(emoji_df)
    .withColumn("Continent", trim(split(col("Continent"), ",").getItem(0)))
    .drop("error", "prompt")
    .cache()
)
```


```python
display(continent_df.select("VendorAddress", "Continent"))
```

## Create an Azure AI Search index for the forms


```python
from synapse.ml.cognitive import *
from pyspark.sql.functions import monotonically_increasing_id, lit

(
    continent_df.withColumn("DocID", monotonically_increasing_id().cast("string"))
    .withColumn("SearchAction", lit("upload"))
    .writeToAzureSearch(
        subscriptionKey=search_key,
        actionCol="SearchAction",
        serviceName=search_service,
        indexName=search_index,
        keyCol="DocID",
    )
)
```

## Try out a search query


```python
import requests

search_url = "https://{}.search.windows.net/indexes/{}/docs/search?api-version=2024-07-01".format(
    search_service, search_index
)
requests.post(
    search_url, json={"search": "door"}, headers={"api-key": search_key}
).json()
```

## Build a chatbot that can use Azure AI Search as a tool 🧠🔧


```python
import json
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key=openai_key,
    api_version="2024-10-21",
    azure_endpoint=openai_url,
)

chat_context_prompt = f"""
You are a chatbot designed to answer questions with the help of a search engine that has the following information:

{continent_df.columns}

If you dont know the answer to a question say "I dont know". Do not lie or hallucinate information. Be brief. If you need to use the search engine to solve the please output a json in the form of {{"query": "example_query"}}
"""


def search_query_prompt(question):
    return f"""
Given the search engine above, what would you search for to answer the following question?

Question: "{question}"

Please output a json in the form of {{"query": "example_query"}}
"""


def search_result_prompt(query):
    search_results = requests.post(
        search_url, json={"search": query}, headers={"api-key": search_key}
    ).json()
    return f"""

You previously ran a search for "{query}" which returned the following results:

{search_results}

You should use the results to help you answer questions. If you dont know the answer to a question say "I dont know". Do not lie or hallucinate information. Be Brief and mention which query you used to solve the problem. 
"""


def prompt_gpt(messages):
    response = client.chat.completions.create(
        model=openai_deployment_name, messages=messages, max_tokens=None, top_p=0.95
    )
    return response.choices[0].message.content


def custom_chatbot(question):
    while True:
        try:
            query = json.loads(
                prompt_gpt(
                    [
                        {"role": "system", "content": chat_context_prompt},
                        {"role": "user", "content": search_query_prompt(question)},
                    ]
                )
            )["query"]

            return prompt_gpt(
                [
                    {"role": "system", "content": chat_context_prompt},
                    {"role": "system", "content": search_result_prompt(query)},
                    {"role": "user", "content": question},
                ]
            )
        except Exception as e:
            raise e
```

## Ask the chatbot a question


```python
custom_chatbot("What did Luke Diaz buy?")
```

## Verify the results


```python
display(
    continent_df.where(col("CustomerName") == "Luke Diaz")
    .select("Description")
    .distinct()
)
```
## Related content

- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use SynapseML and Foundry Tools for multivariate anomaly detection - Analyze time series](multivariate-anomaly-detection.md)
- [How to use SynapseML to tune hyperparameters](hyperparameter-tuning-fighting-breast-cancer.md)