---
title: Use Azure AI Translator with REST API
description: How to use prebuilt Azure AI translator in Fabric with REST API
ms.author: scottpolly
author: s-polly
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: how-to
ms.custom:
ms.date: 07/31/2025
ms.update-cycle: 180-days
ms.search.form:
ms.collection: ce-skilling-ai-copilot
---

# Use prebuilt Azure AI Translator in Fabric with REST API and SynapseML (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

[Azure AI Translator](/azure/ai-services/translator/) is an [Azure AI services](/azure/ai-services/) that enables you to perform language translation and other language-related operations.

This sample shows use, with RESTful APIs, of the prebuilt Azure AI translator, in Fabric:

-   Translate text
-   Transliterate text
-   Get supported languages

## Prerequisites

[!INCLUDE [prerequisites](../includes/prerequisites.md)]

* Create [a new notebook](../../data-engineering/how-to-use-notebook.md).
* Attach your notebook to a lakehouse. On the left side of your notebook, select **Add** to add an existing lakehouse or create a new one.

> [!NOTE]
> This article uses Microsoft Fabric's built-in prebuilt AI services, which handle authentication automatically. You don't need to obtain a separate Azure AI services key - the authentication is managed through your Fabric workspace. For more information, see [Prebuilt AI models in Fabric (preview)](ai-services-overview.md#prebuilt-ai-models-in-fabric-preview).


The code samples in this article use libraries that are preinstalled in Microsoft Fabric notebooks:

- **SynapseML**: Preinstalled in Fabric notebooks for machine learning capabilities
  - `synapse.ml.core` - Core SynapseML functionality
  - `synapse.ml.fabric.service_discovery` - Fabric service discovery utilities
  - `synapse.ml.fabric.token_utils` - Authentication token utilities
  - `synapse.ml.services` - AI services integration (includes Translate, Transliterate classes)
- **PySpark**: Available by default in Fabric Spark compute
  - `pyspark.sql.functions` - DataFrame transformation functions (`col`, `flatten`)
- **Standard Python libraries**: Built into Python runtime
  - `json` - JSON parsing and formatting
  - `requests` - HTTP client for REST API calls


# [Rest API](#tab/rest)

``` python
# Get workload endpoints and access token

from synapse.ml.fabric.service_discovery import get_fabric_env_config
from synapse.ml.fabric.token_utils import TokenUtils
import json
import requests


fabric_env_config = get_fabric_env_config().fabric_env_config
auth_header = TokenUtils().get_openai_auth_header()

# Make a RESTful request to AI service
prebuilt_AI_base_host = fabric_env_config.ml_workload_endpoint + "cognitive/texttranslation/"
print("Workload endpoint for AI service: \n" + prebuilt_AI_base_host)

service_url = prebuilt_AI_base_host + "language/:analyze-text?api-version=2022-05-01"
print("Service URL: \n" + service_url)

auth_headers = {
    "Authorization" : auth_header
}

def print_response(response):
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
from synapse.ml.services import *
from pyspark.sql.functions import col, flatten
```

---

## Text Translation

# [Rest API](#tab/rest)

Text translation is the core operation of the Translator service.


``` python
service_url = prebuilt_AI_base_host + "translate?api-version=3.0&to=fr"
post_body = [{'Text':'Hello, friend.'}]

response = requests.post(service_url, json=post_body, headers=auth_headers)

# Output all information of the request process
print_response(response)
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

Text translation is the core operation of the Translator service.

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

## Text Transliteration

# [Rest API](#tab/rest)

Transliteration converts a word or phrase from the script (alphabet) of one language to another, based on phonetic similarity.

``` python
service_url = prebuilt_AI_base_host + "transliterate?api-version=3.0&language=ja&fromScript=Jpan&toScript=Latn"
post_body = [
    {"Text":"こんにちは"},
    {"Text":"さようなら"}
]

response = requests.post(service_url, json=post_body, headers=auth_headers)

# Output all information of the request process
print_response(response)
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

Transliteration converts a word or phrase from the script (alphabet) of one language to another, based on phonetic similarity.

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

# [Rest API](#tab/rest)

Returns a list of languages that Translator operations support.

``` python
service_url = prebuilt_AI_base_host + "languages?api-version=3.0"

response = requests.get(service_url, headers=auth_headers)

# Output all information of the request process
print_response(response)
```

# [SynapseML](#tab/synapseml)

No steps for SynapseML in this section.

---

## Related content

- [Use prebuilt Text Analytics in Fabric with REST API and SynapseML](how-to-use-text-analytics.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-sdk-synapse.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-sdk-synapse.md)
