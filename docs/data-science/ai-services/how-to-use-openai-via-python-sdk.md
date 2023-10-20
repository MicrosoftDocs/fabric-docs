---
title: Use Azure openai with python SDK
description: How to use prebuilt Azure openai in Fabric with Python library
ms.reviewer: mopeakande
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom: ignite-2023
ms.date: 10/18/2023
ms.search.form:
---
# Use Azure OpenAI in Fabric with Python SDK

This document shows examples of how to use Azure OpenAI in Fabric using [OpenAI Python SDK](https://platform.openai.com/docs/api-reference?lang=python).

## Prerequisites

[OpenAI Python SDK](https://platform.openai.com/docs/api-reference?lang=python) isn't installed in default runtime, you need to first install it.


``` Python
%pip install openai
```

## Chat

ChatGPT and GPT-4 are language models optimized for conversational interfaces. The example presented here showcases simple chat completion operations and isn't intended to serve as a tutorial.

``` Python
import openai

response = openai.ChatCompletion.create(
    deployment_id='gpt-35-turbo', # deployment_id could be one of {gpt-35-turbo, gpt-35-turbo-16k, dv3}
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
    deployment_id='gpt-35-turbo', # deployment_id could be one of {gpt-35-turbo, gpt-35-turbo-16k, dv3}
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


## Completions

The completions endpoint can be used for a wide variety of tasks. It provides a simple but powerful text-in, text-out interface to any of our models. You input some text as a prompt, and the model generates a text completion that attempts to match whatever context or pattern you gave it. For example, if you give the API the prompt, "As Descartes said, I think, therefore", it returns the completion " I am" with high probability.

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

## Embeddings
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

## Next steps

- [Use prebuilt Anomaly Detector in Fabric with REST API](how-to-use-anomaly-detector-via-rest-api.md)
- [Use prebuilt Anomaly Detector in Fabric with SynapseML](how-to-use-anomaly-detector-via-synapseml.md)
- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics-via-rest-api.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics-via-synapseml.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator-via-rest-api.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator-via-synapseml.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-via-synapseml.md)