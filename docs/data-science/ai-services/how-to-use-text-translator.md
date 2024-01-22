---
title: Use Azure AI Translator with REST API
description: How to use prebuilt Azure AI translator in Fabric with REST API
ms.reviewer: ssalgado
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form:
---


# Use prebuilt Azure AI Translator in Fabric with REST API and SynapseML (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

[Azure AI Translator](/azure/ai-services/translator/) is an [Azure AI services](/azure/ai-services/) that enables you to perform language translation and other language-related operations.

This sample demonstrates using prebuilt Azure AI translator in Fabric with RESTful APIs to:

-   Translate text
-   Transliterate text
-   Get supported languages
-   Detect language
-   Break sentence
-   Dictionary lookup
-   Dictionary example

## Prerequisites

# [Rest API](#tab/rest)

``` python
# Get workload endpoints and access token

from synapse.ml.mlflow import get_mlflow_env_config
import json

mlflow_env_configs = get_mlflow_env_config()
access_token = access_token = mlflow_env_configs.driver_aad_token
prebuilt_AI_base_host = mlflow_env_configs.workload_endpoint + "cognitive/texttranslation/"
print("Workload endpoint for AI service: \n" + prebuilt_AI_base_host)

# Make a RESTful request to AI service

post_headers = {
    "Content-Type" : "application/json",
    "Authorization" : "Bearer {}".format(access_token),
}

def printresponse(response):
    print(f"HTTP {response.status_code}")
    if response.status_code == 200:
        try:
            result = response.json()
            print(json.dumps(result, indent=2, ensure_ascii=False))
        except:
            print(f"pasre error {response.content}")
    else:
        print(f"error message: {response.content}")
```


# [SynapseML](#tab/synapseml)

``` Python
import synapse.ml.core
from synapse.ml.cognitive.translate import *
from pyspark.sql.functions import col, flatten
```

---

## Text Translation

# [Rest API](#tab/rest)



The core operation of the Translator service is to translate text.


``` python
import requests
import uuid

service_url = prebuilt_AI_base_host + "translate?api-version=3.0&to=fr"
post_body = [{'Text':'Hello, friend.'}]

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```

### Output

```
    HTTP 200
    [
      {
        "detectedLanguage": {
          "language": "en",
          "score": 1.0
        },
        "translations": [
          {
            "text": "Bonjour cher ami.",
            "to": "fr"
          }
        ]
      }
    ]

```



# [SynapseML](#tab/synapseml)


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

---

## Text Transliterate

# [Rest API](#tab/rest)


Transliteration is the process of converting a word or phrase from the script (alphabet) of one language to another based on phonetic similarity.


``` python
service_url = prebuilt_AI_base_host + "transliterate?api-version=3.0&language=ja&fromScript=Jpan&toScript=Latn"
post_body = [
    {"Text":"こんにちは"},
    {"Text":"さようなら"}
]

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```
### Output
```
    HTTP 200
    [
      {
        "text": "Kon'nichiwa​",
        "script": "Latn"
      },
      {
        "text": "sayonara",
        "script": "Latn"
      }
    ]

```

# [SynapseML](#tab/synapseml)

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

---


## Supported Languages Retrieval

Gets a list of languages supported by the operations of Translator.


``` python
service_url = prebuilt_AI_base_host + "languages?api-version=3.0"

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.get(service_url, headers=post_headers)

# Output all information of the request process
printresponse(response)
```

## Language Detection

# [Rest API](#tab/rest)


You can utilize the language detection operation if you require translation but are unsure about the text language.

``` python
service_url = prebuilt_AI_base_host + "detect?api-version=3.0"
post_body = [
    {"Text":"こんにちは"},
    {"Text":"さようなら"}
]

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```

```

    HTTP 200
    [
      {
        "language": "ja",
        "score": 1.0,
        "isTranslationSupported": true,
        "isTransliterationSupported": true
      },
      {
        "language": "ja",
        "score": 1.0,
        "isTranslationSupported": true,
        "isTransliterationSupported": true
      }
    ]

```

# [SynapseML](#tab/synapseml)


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

---


## Sentence Breaking

# [Rest API](#tab/rest)


Identifies the positioning of sentence boundaries in a piece of text.

``` python
service_url = prebuilt_AI_base_host + "breaksentence?api-version=3.0"
post_body = [{ "Text": "How are you? I am fine. What did you do today?" }]

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```

### Output
```
    HTTP 200
    [
      {
        "detectedLanguage": {
          "language": "en",
          "score": 1.0
        },
        "sentLen": [
          13,
          11,
          22
        ]
      }
    ]
```

# [SynapseML](#tab/synapseml)

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

---


## Dictionary Lookup

# [Rest API](#tab/rest)

Provides alternative translations for a word and a few idiomatic phrases. Each translation has a part-of-speech and a list of back-translations. The back-translations enable a user to understand the translation in context. The Dictionary Example operation allows further drill-down to see example uses of each translation pair.

``` python
service_url = prebuilt_AI_base_host + "dictionary/lookup?api-version=3.0&from=en&to=es"
post_body = [{"Text":"fly"}]

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```

```

    HTTP 200
    [
      {
        "normalizedSource": "fly",
        "displaySource": "fly",
        "translations": [
          {
            "normalizedTarget": "volar",
            "displayTarget": "volar",
            "posTag": "VERB",
            "confidence": 0.4081,
            "prefixWord": "",
            "backTranslations": [
              {
                "normalizedText": "fly",
                "displayText": "fly",
                "numExamples": 15,
                "frequencyCount": 4637
              },
              {
                "normalizedText": "flying",
                "displayText": "flying",
                "numExamples": 15,
                "frequencyCount": 1365
              },
              {
                "normalizedText": "blow",
                "displayText": "blow",
                "numExamples": 15,
                "frequencyCount": 503
              },
              {
                "normalizedText": "flight",
                "displayText": "flight",
                "numExamples": 15,
                "frequencyCount": 135
              }
            ]
          },
          {
            "normalizedTarget": "mosca",
            "displayTarget": "mosca",
            "posTag": "NOUN",
            "confidence": 0.2668,
            "prefixWord": "",
            "backTranslations": [
              {
                "normalizedText": "fly",
                "displayText": "fly",
                "numExamples": 15,
                "frequencyCount": 1697
              },
              {
                "normalizedText": "flyweight",
                "displayText": "flyweight",
                "numExamples": 0,
                "frequencyCount": 48
              },
              {
                "normalizedText": "flies",
                "displayText": "flies",
                "numExamples": 9,
                "frequencyCount": 34
              }
            ]
          },
          {
            "normalizedTarget": "operan",
            "displayTarget": "operan",
            "posTag": "VERB",
            "confidence": 0.1144,
            "prefixWord": "",
            "backTranslations": [
              {
                "normalizedText": "operate",
                "displayText": "operate",
                "numExamples": 15,
                "frequencyCount": 1344
              },
              {
                "normalizedText": "fly",
                "displayText": "fly",
                "numExamples": 1,
                "frequencyCount": 422
              }
            ]
          },
          {
            "normalizedTarget": "pilotar",
            "displayTarget": "pilotar",
            "posTag": "VERB",
            "confidence": 0.095,
            "prefixWord": "",
            "backTranslations": [
              {
                "normalizedText": "fly",
                "displayText": "fly",
                "numExamples": 15,
                "frequencyCount": 104
              },
              {
                "normalizedText": "pilot",
                "displayText": "pilot",
                "numExamples": 15,
                "frequencyCount": 61
              }
            ]
          },
          {
            "normalizedTarget": "moscas",
            "displayTarget": "moscas",
            "posTag": "VERB",
            "confidence": 0.0644,
            "prefixWord": "",
            "backTranslations": [
              {
                "normalizedText": "flies",
                "displayText": "flies",
                "numExamples": 15,
                "frequencyCount": 1219
              },
              {
                "normalizedText": "fly",
                "displayText": "fly",
                "numExamples": 15,
                "frequencyCount": 143
              }
            ]
          },
          {
            "normalizedTarget": "marcha",
            "displayTarget": "marcha",
            "posTag": "NOUN",
            "confidence": 0.0514,
            "prefixWord": "",
            "backTranslations": [
              {
                "normalizedText": "march",
                "displayText": "March",
                "numExamples": 15,
                "frequencyCount": 5355
              },
              {
                "normalizedText": "up",
                "displayText": "up",
                "numExamples": 15,
                "frequencyCount": 1277
              },
              {
                "normalizedText": "running",
                "displayText": "running",
                "numExamples": 15,
                "frequencyCount": 752
              },
              {
                "normalizedText": "going",
                "displayText": "going",
                "numExamples": 15,
                "frequencyCount": 570
              },
              {
                "normalizedText": "fly",
                "displayText": "fly",
                "numExamples": 15,
                "frequencyCount": 253
              }
            ]
          }
        ]
      }
    ]

```

# [SynapseML](#tab/synapseml)

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

---

## Dictionary Examples

# [Rest API](#tab/rest)


You can use the dictionary/examples endpoint to get examples of source text and translation in context after a dictionary lookup.


``` python
service_url = prebuilt_AI_base_host + "dictionary/examples?api-version=3.0&from=en&to=es"
post_body = [{"Text":"fly", "Translation":"volar"}]

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```


```

    HTTP 200
    [
      {
        "normalizedSource": "fly",
        "normalizedTarget": "volar",
        "examples": [
          {
            "sourcePrefix": "I mean, for a guy who could ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Quiero decir, para un tipo que podía ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "Now it's time to make you ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Ahora es hora de que te haga ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "One happy thought will make you ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Uno solo te hará ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "They need machines to ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Necesitan máquinas para ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "That should really ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Eso realmente debe ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "It sure takes longer when you can't ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Lleva más tiempo cuando no puedes ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "I have to ",
            "sourceTerm": "fly",
            "sourceSuffix": " home in the morning.",
            "targetPrefix": "Tengo que ",
            "targetTerm": "volar",
            "targetSuffix": " a casa por la mañana."
          },
          {
            "sourcePrefix": "You taught me to ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Me enseñaste a ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "I think you should ",
            "sourceTerm": "fly",
            "sourceSuffix": " with the window closed.",
            "targetPrefix": "Creo que debemos ",
            "targetTerm": "volar",
            "targetSuffix": " con la ventana cerrada."
          },
          {
            "sourcePrefix": "They look like they could ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Parece que pudieran ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "But you can ",
            "sourceTerm": "fly",
            "sourceSuffix": ", for instance?",
            "targetPrefix": "Que puedes ",
            "targetTerm": "volar",
            "targetSuffix": ", por ejemplo."
          },
          {
            "sourcePrefix": "At least until her kids can be able to ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Al menos hasta que sus hijos sean capaces de ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "I thought you could ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Pensé que podías ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "I was wondering what it would be like to ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Me preguntaba cómo sería ",
            "targetTerm": "volar",
            "targetSuffix": "."
          },
          {
            "sourcePrefix": "But nobody else can ",
            "sourceTerm": "fly",
            "sourceSuffix": ".",
            "targetPrefix": "Pero nadie puede ",
            "targetTerm": "volar",
            "targetSuffix": "."
          }
        ]
      }
    ]

```

# [SynapseML](#tab/synapseml)

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

---


## Related content

- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-sdk-synapse.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-sdk-synapse.md)
