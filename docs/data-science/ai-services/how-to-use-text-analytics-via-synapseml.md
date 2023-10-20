---
title: Use text analytics with synapseml
description: How to use prebuilt text analytics in Fabric with SynapseML 
ms.reviewer: mopeakande
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom: ignite-2023
ms.date: 10/18/2023
ms.search.form:
---


# Use prebuilt Text Analytics in Fabric with SynapseML

[Text Analytics](https://learn.microsoft.com/azure/ai-services/language-service/) is an [Azure AI services](https://learn.microsoft.com/azure/ai-services/) that enables you to perform text mining and text analysis with Natural Language Processing (NLP) features.

This tutorial demonstrates using prebuilt text analytics in Fabric with SynapseML to:

-   Detect sentiment labels at the sentence or document level.
-   Identify the language for a given text input.
-   Extract key phases from a text.
-   Identify different entities in text and categorize them into predefined classes or types.
-   Identifies and disambiguates the identity of entities found in text.


## Import package 

``` Python
import synapse.ml.core
from synapse.ml.cognitive.language import AnalyzeText
from pyspark.sql.functions import col
```

## Sentiment analysis

The Sentiment Analysis feature provides a way for detecting the sentiment labels (such as "negative", "neutral" and "positive") and confidence scores at the sentence and document-level. This feature also returns confidence scores between 0 and 1 for each document & sentences
within it for positive, neutral and negative sentiment. See the [Sentiment Analysis and Opinion Mining language support](https://learn.microsoft.com/azure/ai-services/language-service/sentiment-opinion-mining/language-support) for the list of enabled languages.

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

## Language detector

The Language Detector evaluates text input for each document and returns language identifiers with a score that indicates the strength of the
analysis. This capability is useful for content stores that collect arbitrary text, where language is unknown. See the [Supported languages for language detection](https://learn.microsoft.com/azure/ai-services/language-service/language-detection/language-support) for the list of enabled languages.


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


## Key Phrase Extractor

The Key Phrase Extraction evaluates unstructured text and returns a list of key phrases. This capability is useful if you need to quickly
identify the main points in a collection of documents. See the [Supported languages for key phrase extraction](https://learn.microsoft.com/azure/ai-services/language-service/key-phrase-extraction/language-support) for the list of enabled languages.

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


## Named Entity Recognition (NER)

Named Entity Recognition (NER) is the ability to identify different entities in text and categorize them into predefined classes or types
such as: person, location, event, product, and organization. See the [NER language support](https://learn.microsoft.com/azure/ai-services/language-service/named-entity-recognition/language-support?tabs=ga-api) for the list of enabled languages.


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

## Entity linking

Entity linking identifies and disambiguates the identity of entities found in text. For example, in the sentence "We went to Seattle last
week.", the word "Seattle" would be identified, with a link to more information on Wikipedia. See [Supported languages for entity linking](https://learn.microsoft.com/azure/ai-services/language-service/entity-linking/language-support) for the list of enabled languages.


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


## Next steps

- [Use prebuilt Anomaly Detector in Fabric with REST API](how-to-use-anomaly-detector-via-rest-api.md)
- [Use prebuilt Anomaly Detector in Fabric with SynapseML](how-to-use-anomaly-detector-via-synapseml.md)
- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics-via-rest-api.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator-via-rest-api.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator-via-synapseml.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-via-python-sdk.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-via-synapseml.md)