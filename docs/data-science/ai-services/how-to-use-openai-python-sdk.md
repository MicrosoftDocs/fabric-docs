---
title: Use Azure OpenAI with Python SDK
description: How to use prebuilt Azure OpenAI in Fabric with OpenAI Python SDK
ms.author: lagayhar
author: lgayhardt
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.custom:
ms.date: 01/16/2026
ms.update-cycle: 180-days
ms.search.form:
ms.collection: ce-skilling-ai-copilot
---
# Use Azure OpenAI in Fabric with Python SDK (preview)

This article shows how to use Azure OpenAI in Fabric with the [OpenAI Python SDK](https://github.com/openai/openai-python/). For distributed processing of large datasets, see [Use Azure OpenAI with SynapseML](how-to-use-openai-synapse-ml.md). For the simplest approach using Pandas AI Functions, see [Use Azure OpenAI with AI Functions](how-to-use-openai-ai-functions.md).

## Prerequisites

The [OpenAI Python SDK](https://github.com/openai/openai-python/) isn't installed in default runtime, you need to first install it.

``` Python
%pip install -U openai
```

## Create Fabric-authenticated client

To use Azure OpenAI in Fabric, create a client with Fabric's authentication:

```python
from synapse.ml.fabric.credentials import get_openai_httpx_sync_client
import openai

client = openai.AzureOpenAI(
    http_client=get_openai_httpx_sync_client(),
    api_version="2025-04-01-preview",
)
```

This client handles authentication automatically when running in Fabric notebooks. Use this client for all subsequent API calls.

## Chat completions

The example presented here showcases simple chat completion operations. For complete API reference, see [Chat Completions API](https://platform.openai.com/docs/api-reference/chat).

```python
response = client.chat.completions.create(
    model="gpt-4.1",
    messages=[
        {
            "role": "user",
            "content": """Analyze the following text and return a JSON array of issue insights.

Each item must include:
- issue_brief (1 sentence)
- scenario
- severity (high | medium | low)
- verbatim_quotes (list)
- recommended_fix

Text:
We booked the hotel room in advance for our family trip. The check-in the great however the room service was slow and pool was closed

Return JSON only.
"""
        }
    ],
)
print(f"{response.choices[0].message.content}")
```

## Responses API

The Responses API is the recommended approach by OpenAI for new implementations. It provides improved response quality and better handling of structured outputs. For complete API reference, see [Responses API](https://platform.openai.com/docs/api-reference/responses).

```python
response = client.responses.create(
    model="gpt-4.1",
    input=[
        {
            "role": "user",
            "content": "Explain quantum computing in simple terms."
        }
    ],
    store=False  # Fabric LLM endpoint does not support storage
)
print(f"{response.output_text}")
```

> [!NOTE]
> The Fabric LLM endpoint does not support the `store` parameter set to `True` or the `previous_response_id` parameter.

## Embeddings

An embedding is a special data representation format that machine learning models and algorithms can easily utilize. It contains information-rich semantic meaning of a text, represented by a vector of floating point numbers. The distance between two embeddings in the vector space is related to the semantic similarity between two original inputs. For complete API reference, see [Embeddings API](https://platform.openai.com/docs/api-reference/embeddings).

```python
response = client.embeddings.create(
    input="The food was delicious and the waiter...",
    model="text-embedding-ada-002",
)
print(response.data[0].embedding)
```

## Available models and rates

For information about available models and consumption rates, see [AI Services consumption rate](ai-services-overview.md#consumption-rate).

## Related content

### Fabric documentation

- [Use Azure OpenAI with AI Functions](how-to-use-openai-ai-functions.md) for large scale dataset transformations in Fabric for Pandas or PySpark DataFrames
- [Use Azure OpenAI with SynapseML](how-to-use-openai-synapse-ml.md) for distributed processing using Spark DataFrames with no overhead
- [Use Azure OpenAI with REST API](how-to-use-openai-via-rest-api.md) for direct REST API calls to the LLM endpoint

### OpenAI Python SDK documentation

- [OpenAI Python SDK GitHub](https://github.com/openai/openai-python/) - Official repository with examples and documentation
- [Chat Completions API](https://platform.openai.com/docs/api-reference/chat) - Complete API reference for chat completions
- [Responses API](https://platform.openai.com/docs/api-reference/responses) - Complete API reference for the responses endpoint
- [Embeddings API](https://platform.openai.com/docs/api-reference/embeddings) - Complete API reference for embeddings
