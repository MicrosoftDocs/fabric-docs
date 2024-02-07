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


## Related content

- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-sdk-synapse.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-sdk-synapse.md)
