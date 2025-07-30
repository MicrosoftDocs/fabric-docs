---
title: Use Azure AI Language with REST API
description: How to use prebuilt text analytics in Fabric with REST API
ms.author: scottpolly
author: s-polly
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: how-to
ms.custom:
ms.date: 11/15/2023
ms.update-cycle: 180-days
ms.search.form:
ms.collection: ce-skilling-ai-copilot
---


# Use Azure AI Language in Fabric with REST API and SynapseML (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

[Azure AI Language](/azure/ai-services/language-service/) is an [Azure AI service](/azure/ai-services/) that enables you to perform text mining and text analysis with Natural Language Processing (NLP) features.

In this article, you'll learn how to use Azure AI Language services directly in Microsoft Fabric to analyze text. By the end of this article, you'll be able to:

-   Detect sentiment labels at the sentence or document level
-   Identify the language for a given text input
-   Extract key phrases from a text
-   Identify different entities in text and categorize them into predefined classes or types


## Prerequisites

[!INCLUDE [prerequisites](../includes/prerequisites.md)]

* Create [a new notebook](../../data-engineering/how-to-use-notebook.md).
* Attach your notebook to a lakehouse. On the left side of your notebook, select **Add** to add an existing lakehouse or create a new one.
* Obtain an Azure AI services key by following [Quickstart: Create a multi-service resource for Azure AI services](/azure/ai-services/multi-service-resource).  Copy the value of the key to use in the code samples below.

The code samples in this tutorial use libraries that are pre-installed in Microsoft Fabric notebooks:

- **SynapseML**: Pre-installed in Fabric notebooks for machine learning capabilities
- **PySpark**: Available by default in Fabric Spark compute
- **Standard Python libraries**: `json`, `uuid` are part of Python standard library

For REST API calls, you'll need to install the `requests` library if it's not already available:

```python
%pip install requests
```

> [!NOTE]
> Microsoft Fabric notebooks come with many common libraries pre-installed. The SynapseML library, which provides the MLflow integration and text analytics capabilities, is automatically available in the Spark environment.

## Choose your approach

This tutorial provides two ways to use Azure AI Language services in Fabric:

- **REST API approach**: Direct HTTP calls to the service (recommended for beginners)
- **SynapseML approach**: Using Spark DataFrames for larger-scale processing

> [!TIP]
> **New users should start with the REST API approach** as it's easier to understand and debug. The SynapseML approach is better for processing large datasets with Spark.

# [Rest API](#tab/rest)

### Step 1: Set up authentication and endpoints

Copy and paste this code into the first cell of your Fabric notebook to set up the connection to Azure AI Language services:

``` python
# Get workload endpoints and access token

from synapse.ml.mlflow import get_mlflow_env_config
import json
import requests
import uuid

mlflow_env_configs = get_mlflow_env_config()
access_token = mlflow_env_configs.driver_aad_token
prebuilt_AI_base_host = mlflow_env_configs.workload_endpoint + "cognitive/textanalytics/"
print("Workload endpoint for AI service: \n" + prebuilt_AI_base_host)

service_url = prebuilt_AI_base_host + "language/:analyze-text?api-version=2022-05-01"

# Make a RESful request to AI service

post_headers = {
    "Content-Type" : "application/json",
    "Authorization" : "Bearer {}".format(access_token)
}

def printresponse(response):
    print(f"HTTP {response.status_code}")
    if response.status_code == 200:
        try:
            result = response.json()
            print(json.dumps(result, indent=2, ensure_ascii=False))
        except:
            print(f"parse error {response.content}")
    else:
        print(response.headers)
        print(f"error message: {response.content}")
```

> [!IMPORTANT]
> Run this cell first! It sets up the authentication and helper functions needed for all the text analytics examples below. You should see a workload endpoint URL printed when it runs successfully.

# [SynapseML](#tab/synapseml)

### Step 1: Import required libraries

Copy and paste this code into the first cell of your Fabric notebook:

``` Python
import synapse.ml.core
from synapse.ml.cognitive.language import AnalyzeText
from pyspark.sql.functions import col

# Note: 'spark' and 'display()' are automatically available in Fabric notebooks
```

> [!IMPORTANT]
> Run this cell first! It imports the libraries needed for all the SynapseML examples below.

---


## Sentiment analysis

# [Rest API](#tab/rest)

The Sentiment Analysis feature provides a way for detecting the sentiment labels (such as "negative", "neutral" and "positive") and confidence scores at the sentence and document-level. This feature also returns confidence scores between 0 and 1 for each document and sentences within it for positive, neutral and negative sentiment. See the [Sentiment Analysis and Opinion Mining language support](/azure/ai-services/language-service/sentiment-opinion-mining/language-support) for the list of enabled languages.

### Step 2: Analyze sentiment of text

Copy this code into a new cell in your notebook to analyze the sentiment of a sample text:

``` python
# Sentiment analysis example
from pprint import pprint

post_body = {
    "kind": "SentimentAnalysis",
    "parameters": {
        "modelVersion": "latest",
        "opinionMining": "True"
    },
    "analysisInput":{
        "documents":[
            {
                "id":"1",
                "language":"en",
                "text": "The food and service were unacceptable. The concierge was nice, however."
            }
        ]
    }
} 

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)

```

> [!TIP]
> You can replace the text in the "text" field with your own content to analyze. The service will return sentiment scores and identify which parts of the text are positive, negative, or neutral.

#### Expected output

When you run this code successfully, you should see output similar to this:

```
    HTTP 200
    {
      "kind": "SentimentAnalysisResults",
      "results": {
        "documents": [
          {
            "id": "1",
            "sentiment": "mixed",
            "confidenceScores": {
              "positive": 0.43,
              "neutral": 0.04,
              "negative": 0.53
            },
            "sentences": [
              {
                "sentiment": "negative",
                "confidenceScores": {
                  "positive": 0.0,
                  "neutral": 0.01,
                  "negative": 0.99
                },
                "offset": 0,
                "length": 40,
                "text": "The food and service were unacceptable. ",
                "targets": [
                  {
                    "sentiment": "negative",
                    "confidenceScores": {
                      "positive": 0.01,
                      "negative": 0.99
                    },
                    "offset": 4,
                    "length": 4,
                    "text": "food",
                    "relations": [
                      {
                        "relationType": "assessment",
                        "ref": "#/documents/0/sentences/0/assessments/0"
                      }
                    ]
                  },
                  {
                    "sentiment": "negative",
                    "confidenceScores": {
                      "positive": 0.01,
                      "negative": 0.99
                    },
                    "offset": 13,
                    "length": 7,
                    "text": "service",
                    "relations": [
                      {
                        "relationType": "assessment",
                        "ref": "#/documents/0/sentences/0/assessments/0"
                      }
                    ]
                  }
                ],
                "assessments": [
                  {
                    "sentiment": "negative",
                    "confidenceScores": {
                      "positive": 0.01,
                      "negative": 0.99
                    },
                    "offset": 26,
                    "length": 12,
                    "text": "unacceptable",
                    "isNegated": false
                  }
                ]
              },
              {
                "sentiment": "positive",
                "confidenceScores": {
                  "positive": 0.86,
                  "neutral": 0.08,
                  "negative": 0.07
                },
                "offset": 40,
                "length": 32,
                "text": "The concierge was nice, however.",
                "targets": [
                  {
                    "sentiment": "positive",
                    "confidenceScores": {
                      "positive": 1.0,
                      "negative": 0.0
                    },
                    "offset": 44,
                    "length": 9,
                    "text": "concierge",
                    "relations": [
                      {
                        "relationType": "assessment",
                        "ref": "#/documents/0/sentences/1/assessments/0"
                      }
                    ]
                  }
                ],
                "assessments": [
                  {
                    "sentiment": "positive",
                    "confidenceScores": {
                      "positive": 1.0,
                      "negative": 0.0
                    },
                    "offset": 58,
                    "length": 4,
                    "text": "nice",
                    "isNegated": false
                  }
                ]
              }
            ],
            "warnings": []
          }
        ],
        "errors": [],
        "modelVersion": "2022-11-01"
      }
    }
```

# [SynapseML](#tab/synapseml)

The Sentiment Analysis feature provides a way for detecting the sentiment labels (such as "negative", "neutral" and "positive") and confidence scores at the sentence and document-level. This feature also returns confidence scores between 0 and 1 for each document & sentences
within it for positive, neutral and negative sentiment. See the [Sentiment Analysis and Opinion Mining language support](/azure/ai-services/language-service/sentiment-opinion-mining/language-support) for the list of enabled languages.

``` Python
df = spark.createDataFrame([
    ("Great atmosphere. Close to plenty of restaurants, hotels, and transit! Staff are friendly and helpful.",),
    ("What a sad story!",)
], ["text"])

model = (AnalyzeText()
        .setTextCol("text")
        .setKind("SentimentAnalysis")
        .setOutputCol("response"))

result = model.transform(df)\
        .withColumn("documents", col("response.documents"))\
        .withColumn("sentiment", col("documents.sentiment"))

display(result.select("text", "sentiment"))
```

---


## Language detector

# [Rest API](#tab/rest)

The Language Detector evaluates text input for each document and returns language identifiers with a score that indicates the strength of the
analysis. This capability is useful for content stores that collect arbitrary text, where language is unknown. See the [Supported languages for language detection](/azure/ai-services/language-service/language-detection/language-support) for the list of enabled languages.

``` python
post_body = {
    "kind": "LanguageDetection",
    "parameters": {
        "modelVersion": "latest"
    },
    "analysisInput":{
        "documents":[
            {
                "id":"1",
                "text": "This is a document written in English."
            }
        ]
    }
}

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```
### Output

```
    HTTP 200
    {
      "kind": "LanguageDetectionResults",
      "results": {
        "documents": [
          {
            "id": "1",
            "detectedLanguage": {
              "name": "English",
              "iso6391Name": "en",
              "confidenceScore": 0.99
            },
            "warnings": []
          }
        ],
        "errors": [],
        "modelVersion": "2022-10-01"
      }
    }
```

# [SynapseML](#tab/synapseml)

The Language Detector evaluates text input for each document and returns language identifiers with a score that indicates the strength of the
analysis. This capability is useful for content stores that collect arbitrary text, where language is unknown. See the [Supported languages for language detection](/azure/ai-services/language-service/language-detection/language-support) for the list of enabled languages.


``` Python
df = spark.createDataFrame([
    (["Hello world"],),
    (["Bonjour tout le monde", "Hola mundo", "Tumhara naam kya hai?"],),
    (["你好"],),
    (["日本国（にほんこく、にっぽんこく、英"],)
], ["text"])

model = (AnalyzeText()
        .setTextCol("text")
        .setKind("LanguageDetection")
        .setOutputCol("response"))

result = model.transform(df)\
        .withColumn("documents", col("response.documents"))\
        .withColumn("detectedLanguage", col("documents.detectedLanguage.name"))

display(result.select("text", "detectedLanguage"))
```

---

## Key Phrase Extractor

# [Rest API](#tab/rest)

The Key Phrase Extraction evaluates unstructured text and returns a list of key phrases. This capability is useful if you need to quickly
identify the main points in a collection of documents. See the [Supported languages for key phrase extraction](/azure/ai-services/language-service/key-phrase-extraction/language-support) for the list of enabled languages.


``` python
post_body = {
    "kind": "KeyPhraseExtraction",
    "parameters": {
        "modelVersion": "latest"
    },
    "analysisInput":{
        "documents":[
            {
                "id":"1",
                "language":"en",
                "text": "Dr. Smith has a very modern medical office, and she has great staff."
            }
        ]
    }
}

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```
### Output
```
    HTTP 200
    {
      "kind": "KeyPhraseExtractionResults",
      "results": {
        "documents": [
          {
            "id": "1",
            "keyPhrases": [
              "modern medical office",
              "Dr. Smith",
              "great staff"
            ],
            "warnings": []
          }
        ],
        "errors": [],
        "modelVersion": "2022-10-01"
      }
    }
```

# [SynapseML](#tab/synapseml)

The Key Phrase Extraction evaluates unstructured text and returns a list of key phrases. This capability is useful if you need to quickly
identify the main points in a collection of documents. See the [Supported languages for key phrase extraction](/azure/ai-services/language-service/key-phrase-extraction/language-support) for the list of enabled languages.

``` Python
df = spark.createDataFrame([
    ("en", "Microsoft was founded by Bill Gates and Paul Allen."),
    ("en", "Text Analytics is one of the Azure Cognitive Services."),
    ("en", "My cat might need to see a veterinarian.")
], ["language", "text"])

model = (AnalyzeText()
        .setTextCol("text")
        .setKind("KeyPhraseExtraction")
        .setOutputCol("response"))

result = model.transform(df)\
        .withColumn("documents", col("response.documents"))\
        .withColumn("keyPhrases", col("documents.keyPhrases"))

display(result.select("text", "keyPhrases"))
```

---

## Named Entity Recognition (NER)

# [Rest API](#tab/rest)

Named Entity Recognition (NER) is the ability to identify different entities in text and categorize them into predefined classes or types such as: person, location, event, product, and organization. See the [NER language support](/azure/ai-services/language-service/named-entity-recognition/language-support?tabs=ga-api) for the list of enabled languages.

``` python
post_body = {
    "kind": "EntityRecognition",
    "parameters": {
        "modelVersion": "latest"
    },
    "analysisInput":{
        "documents":[
            {
                "id":"1",
                "language": "en",
                "text": "I had a wonderful trip to Seattle last week."
            }
        ]
    }
}

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```
### Output

```
    HTTP 200
    {
      "kind": "EntityRecognitionResults",
      "results": {
        "documents": [
          {
            "id": "1",
            "entities": [
              {
                "text": "trip",
                "category": "Event",
                "offset": 18,
                "length": 4,
                "confidenceScore": 0.74
              },
              {
                "text": "Seattle",
                "category": "Location",
                "subcategory": "GPE",
                "offset": 26,
                "length": 7,
                "confidenceScore": 1.0
              },
              {
                "text": "last week",
                "category": "DateTime",
                "subcategory": "DateRange",
                "offset": 34,
                "length": 9,
                "confidenceScore": 0.8
              }
            ],
            "warnings": []
          }
        ],
        "errors": [],
        "modelVersion": "2021-06-01"
      }
    }

```

# [SynapseML](#tab/synapseml)


Named Entity Recognition (NER) is the ability to identify different entities in text and categorize them into predefined classes or types
such as: person, location, event, product, and organization. See the [NER language support](/azure/ai-services/language-service/named-entity-recognition/language-support?tabs=ga-api) for the list of enabled languages.


``` Python
df = spark.createDataFrame([
    ("en", "Microsoft was founded by Bill Gates and Paul Allen."),
    ("en", "Pike place market is my favorite Seattle attraction.")
], ["language", "text"])

model = (AnalyzeText()
        .setTextCol("text")
        .setKind("EntityRecognition")
        .setOutputCol("response"))

result = model.transform(df)\
        .withColumn("documents", col("response.documents"))\
        .withColumn("entityNames", col("documents.entities.text"))

display(result.select("text", "entityNames"))
```

---


## Entity linking

# [Rest API](#tab/rest)

No steps for REST API in this section.

# [SynapseML](#tab/synapseml)

Entity linking identifies and disambiguates the identity of entities found in text. For example, in the sentence "We went to Seattle last
week.", the word "Seattle" would be identified, with a link to more information on Wikipedia. See [Supported languages for entity linking](/azure/ai-services/language-service/entity-linking/language-support) for the list of enabled languages.


``` Python
df = spark.createDataFrame([
    ("en", "Microsoft was founded by Bill Gates and Paul Allen."),
    ("en", "Pike place market is my favorite Seattle attraction.")
], ["language", "text"])

model = (AnalyzeText()
        .setTextCol("text")
        .setKind("EntityLinking")
        .setOutputCol("response"))

result = model.transform(df)\
        .withColumn("documents", col("response.documents"))\
        .withColumn("entityNames", col("documents.entities.name"))

display(result)
```

---

## Related content

- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-sdk-synapse.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-sdk-synapse.md)
- [SynapseML GitHub repository](https://github.com/microsoft/SynapseML) - Source code and documentation for SynapseML
- [Azure AI Language documentation](/azure/ai-services/language-service/) - Complete reference for Azure AI Language service
