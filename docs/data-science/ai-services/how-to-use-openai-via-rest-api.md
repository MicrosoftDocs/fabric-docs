---
title: Use Azure OpenAI with REST API
description: How to use prebuilt Azure OpenAI in Fabric with REST API
ms.author: lagayhar
author: lgayhardt
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 01/16/2026
ms.update-cycle: 180-days
ms.search.form: 
ms.collection: ce-skilling-ai-copilot
---

# Use Azure OpenAI in Fabric with REST API (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

This document shows examples of how to use Azure OpenAI in Fabric using REST API. For complete API reference and additional REST API examples, see [OpenAI API Reference](https://platform.openai.com/docs/api-reference/introduction).

## Initialization

```python
from synapse.ml.fabric.service_discovery import get_fabric_env_config
from synapse.ml.fabric.token_utils import TokenUtils

fabric_env_config = get_fabric_env_config().fabric_env_config
auth_header_value = TokenUtils().get_openai_auth_header()

auth_headers = {
    "Authorization": auth_header_value,
    "Content-Type": "application/json"
}
```

## Chat

For complete API reference, see [Chat Completions API](https://platform.openai.com/docs/api-reference/chat).

```python
import requests

def print_chat_result(messages, response_code, response):
    print("=" * 90)
    print("| OpenAI Input    |")
    for msg in messages:
        if msg["role"] == "system":
            print("[System]", msg["content"])
        elif msg["role"] == "user":
            print("Q:", msg["content"])
        else:
            print("A:", msg["content"])
    print("-" * 90)
    print("| Response Status |", response_code)
    print("-" * 90)
    print("| OpenAI Output   |")
    if response.status_code == 200:
        print(response.json()["choices"][0]["message"]["content"])
    else:
        print(response.content)
    print("=" * 90)

deployment_name = "gpt-4.1"

openai_url = (
    f"{fabric_env_config.ml_workload_endpoint}cognitive/openai/openai/deployments/"
    f"{deployment_name}/chat/completions?api-version=2024-02-15-preview"
)

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
[System] You are an AI assistant that helps people find information.
Q: Does Azure OpenAI support customer managed keys?
------------------------------------------------------------------------------------------
| Response Status | 200
------------------------------------------------------------------------------------------
| OpenAI Output   |
Yes, **Azure OpenAI Service** supports **customer managed keys (CMK)** for encrypting your data at rest. This allows organizations to control and manage their own encryption keys using **Azure Key Vault**. By integrating with Azure Key Vault, you can bring your own keys (BYOK) to have full control over the encryption of data stored and processed by Azure OpenAI.

**Reference:**
- [Azure OpenAI encryption documentation - Microsoft Learn](/azure/ai-services/openai/concepts/security#encryption)
- [Azure OpenAI Security - Microsoft Learn](/azure/ai-services/openai/concepts/security)

**Key features:**
- Data at rest is encrypted by default with a service-managed key.
- You can specify your own customer managed key (CMK) in Azure Key Vault for additional control.
- Supported for both Standard and Enterprise Azure OpenAI deployments.

**Summary:**  
You can use customer managed keys with Azure OpenAI for enhanced security and regulatory compliance.
==========================================================================================
```

## Embeddings

An embedding is a special data representation format that machine learning models and algorithms can easily utilize. It contains information-rich semantic meaning of a text, represented by a vector of floating point numbers. The distance between two embeddings in the vector space is related to the semantic similarity between two original inputs. For example, if two texts are similar, their vector representations should also be similar. For complete API reference, see [Embeddings API](https://platform.openai.com/docs/api-reference/embeddings).

To access Azure OpenAI embeddings endpoint in Fabric, you can send an API request using the following format:

```POST <url_prefix>/openai/deployments/<deployment_name>/embeddings?api-version=2024-02-01```

`deployment_name` could be `text-embedding-ada-002`.

```python
from synapse.ml.fabric.service_discovery import get_fabric_env_config
from synapse.ml.fabric.token_utils import TokenUtils
import requests


fabric_env_config = get_fabric_env_config().fabric_env_config

auth_header_value = TokenUtils().get_openai_auth_header()
auth_headers = {
    "Authorization": auth_header_value,
    "Content-Type": "application/json"
}

def print_embedding_result(prompts, response_code, response):
    print("=" * 90)
    print("| OpenAI Input    |\n\t" + "\n\t".join(prompts))
    print("-" * 90)
    print("| Response Status |", response_code)
    print("-" * 90)
    print("| OpenAI Output   |")
    if response_code == 200:
        for data in response.json()['data']:
            print("\t[" + ", ".join([f"{n:.8f}" for n in data["embedding"][:10]]) + ", ... ]")
    else:
        print(response.content)
    print("=" * 90)

deployment_name = "text-embedding-ada-002"
openai_url = (
    f"{fabric_env_config.ml_workload_endpoint}cognitive/openai/openai/deployments/"
    f"{deployment_name}/embeddings?api-version=2024-02-15-preview"
)

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
	[-0.00263638, -0.00441368, -0.01702866, 0.00410065, -0.03052361, 0.01894856, -0.01293149, -0.01421838, -0.03505902, -0.01835033, ... ]
	[0.02133885, -0.02018847, -0.00464259, -0.01151640, -0.01114348, 0.00194205, 0.00229917, -0.01371602, 0.00857094, -0.01467678, ... ]
==========================================================================================
```

## Related content

### Fabric documentation

- [Use Azure OpenAI with AI Functions](how-to-use-openai-ai-functions.md) for large scale dataset transformations in Fabric for Pandas or PySpark DataFrames
- [Use Azure OpenAI with SynapseML](how-to-use-openai-synapse-ml.md) for distributed processing using Spark DataFrames with no overhead
- [Use Azure OpenAI with Python SDK](how-to-use-openai-python-sdk.md) for pythonic control over single API calls using OpenAI Python SDK

### OpenAI API documentation

- [OpenAI API Reference](https://platform.openai.com/docs/api-reference/introduction) - Complete API reference with REST API examples
- [Chat Completions API](https://platform.openai.com/docs/api-reference/chat) - Complete API reference for chat completions
- [Embeddings API](https://platform.openai.com/docs/api-reference/embeddings) - Complete API reference for embeddings
