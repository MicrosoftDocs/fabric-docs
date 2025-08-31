---
title: Use Azure OpenAI with REST API
description: How to use prebuilt Azure OpenAI in Fabric with REST API
ms.author: lagayhar
author: lgayhardt
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: how-to
ms.date: 02/14/2025
ms.update-cycle: 180-days
ms.search.form: 
ms.collection: ce-skilling-ai-copilot
---

# Use Azure OpenAI in Fabric with REST API (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]
This document shows examples of how to use Azure OpenAI in Fabric using REST API.

## Initialization

```python
from synapse.ml.mlflow import get_mlflow_env_config
from trident_token_library_wrapper import PyTridentTokenLibrary

mlflow_env_configs = get_mlflow_env_config()
mwc_token = PyTridentTokenLibrary.get_mwc_token(mlflow_env_configs.workspace_id, mlflow_env_configs.artifact_id, 2)

auth_headers = {
    "Authorization" : "MwcToken {}".format(mwc_token)
}
```
## Chat

GPT-4o and GPT-4o-mini are language models optimized for conversational interfaces. 

```python
import requests

def print_chat_result(messages, response_code, response):
    print("==========================================================================================")
    print("| OpenAI Input    |")
    for msg in messages:
        if msg["role"] == "system":
            print("[System] ", msg["content"])
        elif msg["role"] == "user":
            print("Q: ", msg["content"])
        else:
            print("A: ", msg["content"])
    print("------------------------------------------------------------------------------------------")
    print("| Response Status |", response_code)
    print("------------------------------------------------------------------------------------------")
    print("| OpenAI Output   |")
    if response.status_code == 200:
        print(response.json()["choices"][0]["message"]["content"])
    else:
        print(response.content)
    print("==========================================================================================")


deployment_name = "gpt-4o" # deployment_id could be one of {gpt-4o or gpt-4o-mini}
openai_url = mlflow_env_configs.workload_endpoint + f"cognitive/openai/openai/deployments/{deployment_name}/chat/completions?api-version=2025-04-01-preview"
payload = {
    "messages": [
        {"role": "system", "content": "You are an AI assistant that helps people find information."},
        {"role": "user", "content": "Does Azure OpenAI support customer managed keys?"}
    ]
}

response = requests.post(openai_url, headers=auth_headers, json=payload)
print_chat_result(payload["messages"], response.status_code, response)
```

Output

```console
==========================================================================================
| OpenAI Input    |
[System]  You are an AI assistant that helps people find information.
Q:  Does Azure OpenAI support customer managed keys?
------------------------------------------------------------------------------------------
| Response Status | 200
------------------------------------------------------------------------------------------
| OpenAI Output   |
As of my last training cut-off in October 2023, Azure OpenAI Service did not natively support customer-managed keys (CMK) for encryption of data at rest. Data within Azure OpenAI is typically encrypted using Microsoft-managed keys. 

However, you should verify this information on the official Azure documentation or by contacting Microsoft support, as cloud service features and capabilities are frequently updated.
==========================================================================================
```
## Embeddings
An embedding is a special data representation format that machine learning models and algorithms can easily utilize. It contains information-rich semantic meaning of a text, represented by a vector of floating point numbers. The distance between two embeddings in the vector space is related to the semantic similarity between two original inputs. For example, if two texts are similar, their vector representations should also be similar.

To access Azure OpenAI embeddings endpoint in Fabric, you can send an API request using the following format:

```POST <url_prefix>/openai/deployments/<deployment_name>/embeddings?api-version=2024-02-01```

`deployment_name` could be `text-embedding-ada-002`.

```python
import requests

def print_embedding_result(prompts, response_code, response):
    print("==========================================================================================")
    print("| OpenAI Input    |\n\t" + "\n\t".join(prompts))
    print("------------------------------------------------------------------------------------------")
    print("| Response Status |", response_code)
    print("------------------------------------------------------------------------------------------")
    print("| OpenAI Output   |")
    if response_code == 200:
        for data in response.json()['data']:
            print("\t[" + ", ".join([f"{n:.8f}" for n in data["embedding"][:10]]) + ", ... ]")
    else:
        print(response.content)
    print("==========================================================================================")

deployment_name = "text-embedding-ada-002"
openai_url = mlflow_env_configs.workload_endpoint + f"cognitive/openai/openai/deployments/{deployment_name}/embeddings?api-version=2025-04-01-preview"
payload = {
    "input": [
        "empty prompt, need to fill in the content before the request",
        "Once upon a time"
    ]
}

response = requests.post(openai_url, headers=auth_headers, json=payload)
print_embedding_result(payload["input"], response.status_code, response)
```


Output:
```console
==========================================================================================
| OpenAI Input    |
	empty prompt, need to fill in the content before the request
	Once upon a time
------------------------------------------------------------------------------------------
| Response Status | 200
------------------------------------------------------------------------------------------
| OpenAI Output   |
	[-0.00258819, -0.00449802, -0.01700411, 0.00405622, -0.03064079, 0.01899395, -0.01295485, -0.01426286, -0.03512142, -0.01831212, ... ]
	[0.02129045, -0.02013996, -0.00462094, -0.01146069, -0.01123944, 0.00199124, 0.00228992, -0.01370478, 0.00855917, -0.01470356, ... ]
==========================================================================================
```

## Related content

- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-sdk-synapse.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-sdk-synapse.md)
