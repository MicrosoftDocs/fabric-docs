---
title: Use Azure OpenAI with Python SDK
description: How to use prebuilt Azure OpenAI in Fabric with Python library
ms.author: lagayhar
author: lgayhardt
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: how-to
ms.custom: 
ms.date: 05/07/2025
ms.update-cycle: 180-days
ms.search.form: 
ms.collection: ce-skilling-ai-copilot
---
# Use Azure OpenAI in Fabric with Python SDK and Synapse ML (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

This article shows how to use Azure OpenAI in Fabric, with [OpenAI Python SDK](https://platform.openai.com/docs/api-reference?lang=python) and with SynapseML.


## Prerequisites

# [OpenAI Python SDK < 1.0.0](#tab/python0)

[OpenAI Python SDK](https://platform.openai.com/docs/api-reference?lang=python) isn't installed in default runtime, you need to first install it.


``` Python
%pip install openai==0.28.1
```

# [OpenAI Python SDK >=1.0.0](#tab/python1)

[OpenAI Python SDK](https://platform.openai.com/docs/api-reference?lang=python) isn't installed in default runtime, you need to first install it. 
Change the environment to Runtime version 1.3 or higher.


``` Python
%pip install -U openai
```

# [SynapseML](#tab/synapseml)

``` python
import synapse.ml.core
from synapse.ml.services.openai import *
```

---

## Chat

# [OpenAI Python SDK < 1.0.0](#tab/python0)

Create a new cell in your Fabric notebook to use this code, separate from the cell described in the previous step to install the openai libraries. GPT-4o and GPT-4o-mini are language models optimized for conversational interfaces. The example presented here showcases simple chat completion operations and isn't intended to serve as a tutorial.

``` Python
import openai

response = openai.ChatCompletion.create(
    deployment_id='gpt-4o', # deployment_id could be one of {gpt-4o or gpt-4o-mini}
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Knock knock."},
        {"role": "assistant", "content": "Who's there?"},
        {"role": "user", "content": "Orange."},
    ],
    temperature=0,
)

print(f"{response.choices[0].message.role}: {response.choices[0].message.content}")
```

### Output

``` json
    assistant: Orange who?
```
We can also stream the response

``` Python
response = openai.ChatCompletion.create(
    deployment_id='gpt-4o', # deployment_id could be one of {gpt-4o or gpt-4o-mini}
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Knock knock."},
        {"role": "assistant", "content": "Who's there?"},
        {"role": "user", "content": "Orange."},
    ],
    temperature=0,
    stream=True
)

for chunk in response:
    delta = chunk.choices[0].delta

    if "role" in delta.keys():
        print(delta.role + ": ", end="", flush=True)
    if "content" in delta.keys():
        print(delta.content, end="", flush=True)
```

### Output

``` json 
    assistant: Orange who?
```

# [OpenAI Python SDK >=1.0.0](#tab/python1)

Create a new cell in your Fabric notebook to use this code, separate from the cell described in the previous step to install the openai libraries. GPT-4o and GPT-4o-mini are language models optimized for conversational interfaces. The example presented here showcases simple chat completion operations and isn't intended to serve as a tutorial.


```Python
import openai
import os

os.environ["OPENAI_API_VERSION"] = "2023-05-15"

response = openai.chat.completions.create(
    model='gpt-4o', # model could be one of {gpt-4o or gpt-4o-mini}
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Knock knock."},
        {"role": "assistant", "content": "Who's there?"},
        {"role": "user", "content": "Orange."},
    ],
    temperature=0,
)

print(f"{response.choices[0].message.role}: {response.choices[0].message.content}")
```


### Output

``` json
    assistant: Orange who?
```

# [SynapseML](#tab/synapseml)

Create a new cell in your Fabric notebook to use this code, separate from the cell described in the previous step to install the openai libraries. GPT-4o and GPT-4o-mini models are language models that are optimized for conversational interfaces.

`deployment_name` could be one of:

-   `gpt-4o`
-   `gpt-4o-mini`

``` python
from synapse.ml.services.openai import OpenAIChatCompletion
from pyspark.sql import Row
from pyspark.sql.types import *


def make_message(role, content):
    return Row(role=role, content=content, name=role)


chat_df = spark.createDataFrame(
    [
        (
            [
                make_message(
                    "system", "You are an AI chatbot with red as your favorite color"
                ),
                make_message("user", "Whats your favorite color"),
            ],
        ),
        (
            [
                make_message("system", "You are very excited"),
                make_message("user", "How are you today"),
            ],
        ),
    ]
).toDF("messages")


chat_completion = (
    OpenAIChatCompletion()
    .setDeploymentName("gpt-4o") # deploymentName could be one of {gpt-4o or gpt-4o-mini}
    .setMessagesCol("messages")
    .setErrorCol("error")
    .setOutputCol("chat_completions")
)

display(
    chat_completion.transform(chat_df).select(
        "messages", "chat_completions.choices.message.content"
    )
)
```

---

## Embeddings

# [OpenAI Python SDK < 1.0.0](#tab/python0)

Create a new cell in your Fabric notebook to use this code, separate from the cell described in the previous step to install the openai libraries. An embedding is a special data representation format that machine learning models and algorithms can easily utilize. It contains information-rich semantic meaning of a text, represented by a vector of floating point numbers. The distance between two embeddings in the vector space is related to the semantic similarity between two original inputs. For example, if two texts are similar, their vector representations should also be similar.

The example demonstrated here showcases how to obtain embeddings and isn't intended as a tutorial.

``` Python
deployment_id = "text-embedding-ada-002" # set deployment_name as text-embedding-ada-002
embeddings = openai.Embedding.create(deployment_id=deployment_id,
                                     input="The food was delicious and the waiter...")
                                
print(embeddings)
```

### Output

```
    {
      "object": "list",
      "data": [
        {
          "object": "embedding",
          "index": 0,
          "embedding": [
            0.002306425478309393,
            -0.009327292442321777,
            0.015797346830368042,
            ...
            0.014552861452102661,
            0.010463837534189224,
            -0.015327490866184235,
            -0.01937841810286045,
            -0.0028842221945524216
          ]
        }
      ],
      "model": "ada",
      "usage": {
        "prompt_tokens": 8,
        "total_tokens": 8
      }
    }
```
# [OpenAI Python SDK >=1.0.0](#tab/python1)

Create a new cell in your Fabric notebook to use this code, separate from the cell described in the previous step to install the openai libraries. An embedding is a special data representation format that machine learning models and algorithms can easily utilize. It contains information-rich semantic meaning of a text, represented by a vector of floating point numbers. The distance between two embeddings in the vector space is related to the semantic similarity between two original inputs. For example, if two texts are similar, their vector representations should also be similar.

The example demonstrated here showcases how to obtain embeddings and isn't intended as a tutorial.

``` Python
response = openai.embeddings.create(
         input="The food was delicious and the waiter...",
         model="text-embedding-ada-002"  # Or another embedding model
     )

print(response)
```

### Output

```
    CreateEmbeddingResponse(
        data=[
            Embedding(
                embedding=[
                    0.0022756962571293116,
                    -0.009305915795266628,
                    0.01574261300265789,
                    ...
                    -0.015387134626507759,
                    -0.019424352794885635,
                    -0.0028009789530187845
                ],
                index=0,
                object='embedding'
        )
        ],
        model='text-embedding-ada-002',
        object='list',
        usage=Usage(
            prompt_tokens=8,
            total_tokens=8
        )
    )
```

# [SynapseML](#tab/synapseml)

An embedding is a special format of data representation by machine learning models and algorithms. The embedding is an information dense representation of the semantic meaning of a piece of text. Each embedding is a vector of floating point numbers, such that the distance between two embeddings in the vector space is correlated with semantic similarity between two inputs in the original
format. For example, if two texts are similar, then their vector
representations should also be similar.

`deployment_name` could be `text-embedding-ada-002`.

```python
df = spark.createDataFrame(
    [
        ("Once upon a time",),
        ("Best programming language award goes to",),
        ("SynapseML is ",)
    ]
).toDF("text")
```


``` python
embedding = (
    OpenAIEmbedding()
    .setDeploymentName("text-embedding-ada-002") # set deployment_name as text-embedding-ada-002
    .setTextCol("text")
    .setOutputCol("out")
)
display(embedding.transform(df))
```

---

## Related content

- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML and Python SDK](how-to-use-openai-sdk-synapse.md)
