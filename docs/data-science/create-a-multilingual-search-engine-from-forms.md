---
title: Build a Search Engine
description: Build a custom search engine and question-answering system with SynapseML.
ms.topic: tutorial
ms.custom: dev-focus
ms.author: scottpolly
author: s-polly
ms.reviewer: jessiwang
ms.date: 06/30/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
---
# Tutorial: Create a custom search engine and question-answering system

In this tutorial, you build a custom search engine and question-answering chatbot over invoice data. By the end, you have a working Azure AI Search index with translated, enriched invoice data and a chatbot that queries it.

In this tutorial, you learn how to:

> [!div class="checklist"]
> * Load invoices into a Spark data frame
> * Extract structured fields with Azure Document Intelligence
> * Translate item descriptions into multiple languages
> * Enrich data with emoji and continent classifications using Azure OpenAI
> * Write the output to an Azure AI Search index
> * Build a chatbot that searches and answers questions over the indexed data

**Time to complete:** 30 minutes

## Prerequisites

- A [Microsoft Fabric workspace](/fabric/get-started/create-workspaces) with a Spark runtime (1.3 or later). You need **Member** or **Contributor** role on the workspace.
- A [Foundry resource](/azure/ai-services/multi-service-resource) with a resource key and endpoint (for Document Intelligence and Translator). You need the **Cognitive Services User** role or a resource key.
- An [Azure AI Search resource](/azure/search/search-create-service-portal) with an [admin API key](/azure/search/search-security-api-keys). You need the **Search Service Contributor** role or an admin API key for index management.
- An [Azure OpenAI resource](/azure/ai-services/openai/how-to/create-resource) with a `gpt-4o-mini` deployment. You need the **Cognitive Services OpenAI User** role or a resource key.
- The `openai` Python package (v1.0 or later) installed in your environment

> [!IMPORTANT]
> Store resource keys securely. Use [Azure Key Vault](/azure/key-vault/general/overview) or Fabric environment variables rather than hard-coding keys in notebooks. Key-based authentication is supported but considered transitional. For production workloads, use [Microsoft Entra ID with managed identities](/azure/ai-services/authentication#authenticate-with-microsoft-entra-id) instead of resource keys.

## Set up dependencies

Import packages and connect to the Azure resources used in this workflow.


```python
import os
from pyspark.sql import SparkSession
from synapse.ml.core.platform import running_on_synapse, find_secret

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()

# find_secret retrieves secrets from the linked Key Vault or Fabric secret store.
# For local development, replace these calls with your own resource keys.
# For production, use Microsoft Entra ID with managed identities instead of keys.

# Foundry resource key (Ocp-Apim-Subscription-Key) – used by Document Intelligence
foundry_key = find_secret("foundry-resource-key")  # your Foundry resource key
foundry_location = "eastus"

# Azure Translator resource key (a separate key is required when Translator
# is not accessed through the Foundry multi-service resource)
translator_key = find_secret("translator-resource-key")  # your Azure Translator resource key
translator_location = "eastus"

# Azure AI Search admin API key – grants read/write access to the index
search_admin_key = find_secret("search-admin-api-key")  # your Azure AI Search admin API key
search_service = "mmlspark-azure-search"
search_index = "form-demo-index-5"

# Azure OpenAI resource key
openai_key = find_secret("openai-resource-key")  # your Azure OpenAI resource key
openai_service_name = "synapseml-openai"
openai_deployment_name = "gpt-4o-mini"
openai_url = f"https://{openai_service_name}.openai.azure.com/"
```

> [!NOTE]
> This tutorial uses resource keys for simplicity. Key-based authentication is still supported but is considered transitional. For production workloads, authenticate with [Microsoft Entra ID and managed identities](/azure/ai-services/authentication#authenticate-with-microsoft-entra-id) to enable role-based access control (RBAC) and eliminate key management.

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

The output is a data frame with 10 rows, each containing a URL pointing to an invoice image in Azure Blob Storage.

## Analyze invoices with Document Intelligence

This code loads the [AnalyzeInvoices transformer](https://mmlspark.blob.core.windows.net/docs/1.0.4/pyspark/synapse.ml.services.form.html#module-synapse.ml.services.form.AnalyzeInvoices) and passes a reference to the data frame containing the invoices. It calls the pre-built invoice model of Azure Document Intelligence.


```python
from synapse.ml.services import AnalyzeInvoices

analyzed_df = (
    AnalyzeInvoices()
    .setSubscriptionKey(foundry_key)
    .setLocation(foundry_location)
    .setImageUrlCol("url")
    .setOutputCol("invoices")
    .setErrorCol("errors")
    .setConcurrency(5)
    .transform(df2)
    .cache()
)

display(analyzed_df)
```

The output adds an `invoices` column containing the structured extraction results for each invoice, and an `errors` column for any failures.

**Reference:** [AnalyzeInvoices](https://mmlspark.blob.core.windows.net/docs/1.0.4/pyspark/synapse.ml.services.form.html#module-synapse.ml.services.form.AnalyzeInvoices), [Document Intelligence invoice model](/azure/ai-services/document-intelligence/prebuilt/invoice)

## Simplify Document Intelligence output

This code uses the [FormOntologyLearner](https://mmlspark.blob.core.windows.net/docs/1.0.4/pyspark/synapse.ml.services.form.html#module-synapse.ml.services.form.FormOntologyLearner), a transformer that analyzes the output of Document Intelligence transformers and infers a tabular data structure. The output of AnalyzeInvoices is dynamic and varies based on the features detected in your content.

FormOntologyLearner extends the utility of the AnalyzeInvoices transformer by looking for patterns that it can use to create a tabular data structure. Organizing the output into multiple columns and rows makes for simpler downstream analysis.

```python
from synapse.ml.services import FormOntologyLearner

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

The output is a flat tabular data frame with one row per invoice, containing extracted fields like vendor name, invoice total, and date.

**Reference:** [FormOntologyLearner](https://mmlspark.blob.core.windows.net/docs/1.0.4/pyspark/synapse.ml.services.form.html#module-synapse.ml.services.form.FormOntologyLearner)

By using a tabular data frame, you can flatten the nested tables found in the forms by using SparkSQL.


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

The output expands each invoice's line items into individual rows with columns like `Description`, `Quantity`, and `Amount`.

**Reference:** [explode](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.functions.explode.html)

## Add translations

This code loads [Translate](https://microsoft.github.io/SynapseML/docs/Explore%20Algorithms/AI%20Services/Overview/#translation), a transformer that calls the Azure AI Translator in Foundry Tools. The original text, which is in English in the "Description" column, is machine-translated into various languages. The code consolidates all of the output into the "output.translations" array.

> [!TIP]
> The `.setLocation()` call maps to the `Ocp-Apim-Subscription-Region` header [required by the Translator service](/azure/ai-services/authentication#authenticate-with-a-foundry-resource-key) when you use a Foundry multi-service resource key. Set this value to the region where your resource is deployed.

```python
from synapse.ml.services import Translate

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

The output adds a `Translations` column containing the translated descriptions in Chinese, French, Russian, and Welsh.

**Reference:** [Translate](https://mmlspark.blob.core.windows.net/docs/1.0.4/pyspark/synapse.ml.services.translate.html#module-synapse.ml.services.translate.Translate), [Azure Translator](/azure/ai-services/translator/)

## Translate products to emojis with OpenAI
Use `OpenAIPrompt` to translate invoice item descriptions into emoji representations.
```python
from synapse.ml.services.openai import OpenAIPrompt
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
```

> [!TIP]
> The `OpenAIPrompt` transformer also supports the Responses API and structured JSON output via `setResponseFormat`. For more options, see [Use Azure OpenAI with SynapseML](../data-science/ai-services/how-to-use-openai-synapse-ml.md).

```python
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

The output shows each item description alongside its emoji translation.

**Reference:** [OpenAIPrompt](/fabric/data-science/ai-services/how-to-use-openai-synapse-ml)

## Infer vendor address continent with OpenAI

Use the same `OpenAIPrompt` transformer with a different template to classify vendor addresses by continent.

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

The output shows each vendor address alongside the inferred continent.

**Reference:** [OpenAIPrompt](/fabric/data-science/ai-services/how-to-use-openai-synapse-ml)

## Create an Azure AI Search index for the forms

Write the enriched data frame to an Azure AI Search index using `writeToAzureSearch`. The method infers the index schema from the data frame columns. The `subscriptionKey` parameter accepts an Azure AI Search admin API key.

```python
from synapse.ml.services import *
from pyspark.sql.functions import monotonically_increasing_id, lit

(
    continent_df.withColumn("DocID", monotonically_increasing_id().cast("string"))
    .withColumn("SearchAction", lit("upload"))
    .writeToAzureSearch(
        subscriptionKey=search_admin_key,  # Azure AI Search admin API key
        actionCol="SearchAction",
        serviceName=search_service,
        indexName=search_index,
        keyCol="DocID",
    )
)
```

**Reference:** [writeToAzureSearch](https://microsoft.github.io/SynapseML/docs/Explore%20Algorithms/AI%20Services/Overview/#azure-ai-search-sample), [Azure AI Search REST API](/rest/api/searchservice/documents)

## Try out a search query


```python
import requests

search_url = (
    "https://{}.search.windows.net"
    "/indexes/{}/docs/search"
    "?api-version=2024-07-01"
).format(search_service, search_index)

requests.post(
    search_url,
    json={"search": "door"},
    headers={"api-key": search_admin_key},
).json()
```

The response is a JSON object containing matching documents from the search index.

**Reference:** [Azure AI Search - Search Documents](/rest/api/searchservice/documents/search-post)

## Build a chatbot that can use Azure AI Search as a tool

> [!TIP]
> The `AzureOpenAI` client also accepts an `azure_ad_token_provider` parameter for Microsoft Entra authentication, which eliminates the need for a resource key. For details, see [Use managed identity with Azure OpenAI](/azure/ai-services/openai/how-to/managed-identity). Azure AI Search also supports [keyless authentication with Microsoft Entra ID](/azure/search/keyless-connections).

```python
import json
import requests
from openai import AzureOpenAI

client = AzureOpenAI(
    api_key=openai_key,
    api_version="2024-10-21",
    azure_endpoint=openai_url,
)

chat_context_prompt = f"""
You are a chatbot designed to answer questions
with the help of a search engine that has the
following information:

{continent_df.columns}

If you dont know the answer to a question say
"I dont know". Do not lie or hallucinate
information. Be brief. If you need to use the
search engine to solve the please output a json
in the form of {{"query": "example_query"}}
"""


def search_query_prompt(question):
    return f"""
Given the search engine above, what would you
search for to answer the following question?

Question: "{question}"

Please output a json in the form of
{{"query": "example_query"}}
"""


def search_result_prompt(query):
    search_results = requests.post(
        search_url,
        json={"search": query},
        headers={"api-key": search_admin_key},
    ).json()
    return f"""
You previously ran a search for "{query}"
which returned the following results:

{search_results}

You should use the results to help you answer
questions. If you dont know the answer to a
question say "I dont know". Do not lie or
hallucinate information. Be Brief and mention
which query you used to solve the problem.
"""


def prompt_gpt(messages):
    response = client.chat.completions.create(
        model=openai_deployment_name,
        messages=messages,
        max_tokens=None,
        top_p=0.95,
    )
    return response.choices[0].message.content


def custom_chatbot(question):
    while True:
        try:
            query = json.loads(
                prompt_gpt(
                    [
                        {
                            "role": "system",
                            "content": chat_context_prompt,
                        },
                        {
                            "role": "user",
                            "content": search_query_prompt(
                                question
                            ),
                        },
                    ]
                )
            )["query"]

            return prompt_gpt(
                [
                    {
                        "role": "system",
                        "content": chat_context_prompt,
                    },
                    {
                        "role": "system",
                        "content": search_result_prompt(
                            query
                        ),
                    },
                    {
                        "role": "user",
                        "content": question,
                    },
                ]
            )
        except Exception as e:
            raise e
```

**Reference:** [AzureOpenAI Python SDK](/azure/ai-foundry/openai/how-to/migration), [Chat Completions API](/azure/ai-foundry/openai/reference)

## Ask the chatbot a question

Test the chatbot by asking about a specific customer's purchases.

```python
custom_chatbot("What did Luke Diaz buy?")
```

The chatbot searches the index and returns a brief answer listing the items Luke Diaz purchased.

## Verify the results

Cross-check the chatbot's answer against the source data by querying the data frame directly.

```python
display(
    continent_df.where(col("CustomerName") == "Luke Diaz")
    .select("Description")
    .distinct()
)
```

The output lists the distinct item descriptions for Luke Diaz, which should match the chatbot's response.

## Clean up resources

If you no longer need the resources created in this tutorial:

- Delete the Azure AI Search index (`form-demo-index-5`) from the Azure portal.
- Stop or delete the Spark session to avoid compute charges.

## Related content

- [Transform and enrich data with AI Functions](/fabric/data-science/ai-functions/overview) - For simpler text transformations like translation and summarization without managing resource keys
- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use SynapseML and Foundry Tools for multivariate anomaly detection - Analyze time series](multivariate-anomaly-detection.md)
- [How to use SynapseML to tune hyperparameters](hyperparameter-tuning-fighting-breast-cancer.md)
