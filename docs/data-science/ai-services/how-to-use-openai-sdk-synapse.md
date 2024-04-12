---
title: Use Azure OpenAI with Python SDK
description: How to use prebuilt Azure openai in Fabric with Python library
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
# Use Azure OpenAI in Fabric with Python SDK and Synapse ML (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

This article shows examples of how to use Azure OpenAI in Fabric using [OpenAI Python SDK](https://platform.openai.com/docs/api-reference?lang=python) and using SynapseML.

## Prerequisites

# [Python SDK](#tab/python)

[OpenAI Python SDK](https://platform.openai.com/docs/api-reference?lang=python) isn't installed in default runtime, you need to first install it.


``` Python
%pip install openai==0.28.1
```

# [SynapseML](#tab/synapseml)

``` python
import synapse.ml.core
from synapse.ml.services.openai import *
```

---

## Chat

# [Python SDK](#tab/python)

ChatGPT and GPT-4 are language models optimized for conversational interfaces. The example presented here showcases simple chat completion operations and isn't intended to serve as a tutorial.

``` Python
import openai

response = openai.ChatCompletion.create(
    deployment_id='gpt-35-turbo', # deployment_id could be one of {gpt-35-turbo, gpt-35-turbo-16k}
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
    deployment_id='gpt-35-turbo', # deployment_id could be one of {gpt-35-turbo, gpt-35-turbo-16k}
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

# [SynapseML](#tab/synapseml)

ChatGPT and GPT-4 models are language models that are optimized for conversational interfaces.

`deployment_name` could be one of:

-   `gpt-35-turbo` (to be deprecated)
-   `gpt-35-turbo-16k` (to be deprecated)
-   `gpt-4` (to be deprecated)
-   `gpt-35-turbo-0125` (coming soon)
-   `gpt-4-turbo` (coming soon)

``` python
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
    .setDeploymentName("gpt-35-turbo-16k") # deploymentName could be one of {gpt-35-turbo, gpt-35-turbo-16k, gpt-4}
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

## Completions

# [Python SDK](#tab/python)

The completions endpoint can be used for a wide variety of tasks. It provides a simple but powerful text-in, text-out interface to any of our models. You input some text as a prompt, and the model generates a text completion that attempts to match whatever context or pattern you gave it. For example, if you give the API the prompt, "As Descartes said, I think, therefore," it returns the completion " I am" with high probability.

The example presented here showcases simple completions operations and isn't intended to serve as a tutorial.

You can conclude a sentence using the completion endpoint.

``` Python
prompt = "The food was delicious and the waiter"
completion = openai.Completion.create(deployment_id='text-davinci-003',  # deployment_id could be text-davinci-003 or code-cushman-002
                                        prompt=prompt, 
                                        stop=".", 
                                        temperature=0)
                                
print(f"{prompt}{completion['choices'][0]['text']}.")
```

### Output

``` json
    The food was delicious and the waiter was very friendly.
```

You can use the completion endpoint to generate code from natural language. 

``` Python
deployment_id = "code-cushman-002" # deployment_id could be text-davinci-003 or code-cushman-002
prompt = "# Python 3\n# Write a quick sort function\ndef quicksort(arr):"
response = openai.Completion.create(
    deployment_id=deployment_id,
    prompt=prompt,
    max_tokens=200,
    temperature=0,
    stop=["#"]
)
text = response['choices'][0]['text']
print(prompt + text)
```

### Output

``` Python 
    # Python 3
    # Write a quick sort function
    def quicksort(arr):
        if len(arr) <= 1:
            return arr
        pivot = arr[len(arr) // 2]
        left = [x for x in arr if x < pivot]
        middle = [x for x in arr if x == pivot]
        right = [x for x in arr if x > pivot]
        return quicksort(left) + middle + quicksort(right)

    print(quicksort([3, 6, 8, 10, 1, 2, 1]))

```

# [SynapseML](#tab/synapseml)

The completions endpoint can be used for a wide variety of tasks. It provides a simple but powerful text-in, text-out interface to any of our
models. You input some text as a prompt, and the model generates a text completion that attempts to match whatever context or pattern you
gave it. For example, if you give the API the prompt, "As Descartes said, I think, therefore", it returns the completion " I am" with
high probability.

`deployment_name` could be one of:

-   `text-davinci-003`
-   `code-cushman-002`

``` python
df = spark.createDataFrame(
    [
        ("Hello my name is",),
        ("The best code is code thats",),
        ("SynapseML is ",),
    ]
).toDF("prompt")

deployment_name = "text-davinci-003" # deployment_name could be text-davinci-003 or code-cushman-002
completion = (
    OpenAICompletion()
    .setDeploymentName(deployment_name)
    .setMaxTokens(200)
    .setPromptCol("prompt")
    .setErrorCol("error")
    .setOutputCol("completions")
)
```

``` python
from pyspark.sql.functions import col

completed_df = completion.transform(df).cache()
display(
    completed_df.select(
        col("prompt"),
        col("error"),
        col("completions.choices.text").getItem(0).alias("text"),
    )
)
```

---

### All functionalities in one call

# [Python SDK](#tab/python)

No steps for this section in the Python SDK. 

# [SynapseML](#tab/synapseml)

OpenAI contains numerous abilities including `Summarize Text`, `Classification`, `Natural Language to SQL`, `Code Generation`, `Translation`, etc.

This sample shows that we could use one single `OpenAICompletion` instance to complete all above tasks within one single `.transform()` call.


``` python
df = spark.createDataFrame(
    [
        ("A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.\n\nTl;dr",),
        ("Classify the following news article into 1 of the following categories: categories: [Business, Tech, Politics, Sport, Entertainment].\n news article: Donna Steffensen Is Cooking Up a New Kind of Perfection. The Internet's most beloved cooking guru has a buzzy new book and a fresh new perspective:",),
        ("### Postgres SQL tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n### A query to list the names of the departments which employed more than 10 employees in the last 3 months",),
        ("Write a quick sort function using Python.",),
        ("Product description: A home milkshake maker\nSeed words: fast, healthy, compact.\nProduct names: HomeShaker, Fit Shaker, QuickShake, Shake Maker\n\nProduct description: A pair of shoes that can fit any foot size.\nSeed words: adaptable, fit, omni-fit.",),
        ("English: I do not speak French.\nFrench: Je ne parle pas français.\n\nEnglish: See you later!\nFrench: À tout à l'heure!\n\nEnglish: Where is a good restaurant?\nFrench: Où est un bon restaurant?\n\nEnglish: What rooms do you have available?\nFrench: Quelles chambres avez-vous de disponible?\n\nEnglish: I want to say nothing.\n",),
        ("There are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy. There are also loheckles, which are a grayish blue fruit and are very tart, a little bit like a lemon. Pounits are a bright green color and are more savory than sweet. There are also plenty of loopnovas which are a neon pink flavor and taste like cotton candy. Finally, there are fruits called glowls, which have a very sour and bitter taste which is acidic and caustic, and a pale orange tinge to them.\n\nPlease make a table summarizing the fruits from Goocrux\n| Fruit | Color | Flavor |\n| Neoskizzles | Purple | Sweet |\n| Loheckles | Grayish blue | Tart |",),
        ("The following is a list of companies and the categories they fall into\n\nFacebook: Social media, Technology\nLinkedIn: Social media, Technology, Enterprise, Careers\nUber: Transportation, Technology, Marketplace\nUnilever: Conglomerate, Consumer Goods\nMcdonalds: Food, Fast Food, Logistics, Restaurants\nFedEx:",)
    ]
).toDF("prompt")
```

``` python
from synapse.ml.cognitive.openai import OpenAICompletion
from pyspark.sql.functions import col

deployment_name = "text-davinci-003" # deployment_name could be text-davinci-003 or code-cushman-002
completion = (
    OpenAICompletion()
    .setDeploymentName(deployment_name)
    .setMaxTokens(200)
    .setPromptCol("prompt")
    .setErrorCol("error")
    .setOutputCol("completions")
)

completed_df = completion.transform(df).cache()
display(
    completed_df.select(
        col("prompt"),
        col("error"),
        col("completions.choices.text").getItem(0).alias("text"),
    )
)
```

---

## Embeddings

# [Python SDK](#tab/python)

An embedding is a special data representation format that machine learning models and algorithms can easily utilize. It contains information-rich semantic meaning of a text, represented by a vector of floating point numbers. The distance between two embeddings in the vector space is related to the semantic similarity between two original inputs. For example, if two texts are similar, their vector representations should also be similar.

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

# [SynapseML](#tab/synapseml)

An embedding is a special format of data representation by machine learning models and algorithms. The embedding is an information dense representation of the semantic meaning of a piece of text. Each embedding is a vector of floating point numbers, such that the distance between two embeddings in the vector space is correlated with semantic similarity between two inputs in the original
format. For example, if two texts are similar, then their vector
representations should also be similar.

`deployment_name` could be `text-embedding-ada-002`.



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
