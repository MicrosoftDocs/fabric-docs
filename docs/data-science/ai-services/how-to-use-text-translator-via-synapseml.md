---
title: Use Azure ai translator with synapseml
description: How to use prebuilt Azure AI translator in Fabric with SynapseML 
ms.reviewer: mopeakande
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom: ignite-2023
ms.date: 10/18/2023
ms.search.form:
---


# Use prebuilt Azure AI Translator in Fabric with SynapseML

[Azure AI Translator](https://learn.microsoft.com/azure/ai-services/translator/) is an [Azure AI services](https://learn.microsoft.com/azure/ai-services/) that enables you to perform language translation and other language-related operations.

This sample demonstrates using Azure AI translator in Fabric with SynapseML to:

-   Translate text
-   Transliterate text
-   Detect language
-   Break sentence
-   Dictionary lookup
-   Dictionary example

## Import package 

``` Python
import synapse.ml.core
from synapse.ml.cognitive.translate import *
from pyspark.sql.functions import col, flatten
```

## Text Translation

The core operation of the Translator service is to translate text.

``` Python
df = spark.createDataFrame([
  (["Hello, what is your name?", "Bye"],)
], ["text",])

translate = (Translate()
    .setTextCol("text")
    .setToLanguage(["zh-Hans", "fr"])
    .setOutputCol("translation")
    .setConcurrency(5))

result = translate.transform(df)\
        .withColumn("translation", flatten(col("translation.translations")))\
        .withColumn("translation", col("translation.text"))

display(result.select("text", "translation"))
```

## Text Transliterate

Transliteration is the process of converting a word or phrase from the script (alphabet) of one language to another based on phonetic similarity.

``` Python
transliterateDf =  spark.createDataFrame([
  (["こんにちは", "さようなら"],)
], ["text",])

transliterate = (Transliterate()
    .setLanguage("ja")
    .setFromScript("Jpan")
    .setToScript("Latn")
    .setTextCol("text")
    .setOutputCol("result"))

result = transliterate.transform(transliterateDf)\
        .withColumn("script", col("result.script"))

display(result.select("text", "script"))
```

## Language Detection

You can utilize the language detection operation if you require translation but are unsure about the text language.

``` Python
detectDf =  spark.createDataFrame([
  (["Hello, what is your name?"],)
], ["text",])

detect = (Detect()
    .setTextCol("text")
    .setOutputCol("result"))

result = detect.transform(detectDf)\
        .withColumn("language", col("result.language"))

display(result.select("text", "language"))
```

## Sentence Breaking

Identifies the positioning of sentence boundaries in a piece of text.


``` Python
bsDf =  spark.createDataFrame([
  (["Hello, what is your name?"],)
], ["text",])

breakSentence = (BreakSentence()
    .setTextCol("text")
    .setOutputCol("result"))

result = breakSentence.transform(bsDf)\
    .withColumn("sentLen", flatten(col("result.sentLen")))

display(result.select("text", "result", "sentLen"))
```


## Dictionary Lookup

Provides alternative translations for a word and a few idiomatic phrases. Each translation has a part-of-speech and a list of back-translations. The back-translations enable a user to understand the translation in context. The Dictionary Example operation allows further drill-down to see example uses of each translation pair.

``` Python
dictDf = spark.createDataFrame([
  (["fly"],)
], ["text",])

dictionaryLookup = (DictionaryLookup()
    .setFromLanguage("en")
    .setToLanguage("es")
    .setTextCol("text")
    .setOutputCol("result"))

result = dictionaryLookup.transform(dictDf)\
        .withColumn("translations", flatten(col("result.translations")))\
        .withColumn("normalizedTarget", col("translations.normalizedTarget"))

display(result.select("text", "translations", "normalizedTarget"))
```

## Dictionary Examples

You can use the dictionary/examples endpoint to get examples of source text and translation in context after a dictionary lookup.


``` Python
dictDf = spark.createDataFrame([
  ([("fly", "volar")],)
], ["textAndTranslation",])

dictionaryExamples = (DictionaryExamples()
    .setFromLanguage("en")
    .setToLanguage("es")
    .setTextAndTranslationCol("textAndTranslation")
    .setOutputCol("result"))

result = dictionaryExamples.transform(dictDf)\
        .withColumn("examples", flatten(col("result.examples")))

display(result.select("textAndTranslation", "examples"))
```

## Next steps

- [Use prebuilt Anomaly Detector in Fabric with REST API](how-to-use-anomaly-detector-via-rest-api.md)
- [Use prebuilt Anomaly Detector in Fabric with SynapseML](how-to-use-anomaly-detector-via-synapseml.md)
- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics-via-rest-api.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics-via-synapseml.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-via-python-sdk.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-via-synapseml.md)
