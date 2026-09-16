---
title: Use Azure OpenAI in Fabric with OpenAI Python SDK
description: Learn how to call Fabric LLMs with the OpenAI Python SDK, including the synchronous and asynchronous OpenAI-compatible clients built into Fabric.
ms.author: singhrana
author: ranadeepsingh
ms.reviewer: scottpolly
reviewer: s-polly
ms.topic: how-to
ms.custom:
ms.date: 09/04/2026
ms.update-cycle: 180-days
ms.search.form:
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
---
# Use Azure OpenAI in Fabric with OpenAI Python SDK (preview)

Fabric supports two ways to call its prebuilt large language models (LLMs) with an OpenAI-compatible Python interface:

- Use the OpenAI SDK with Fabric authentication.
- Import AI Functions and use the synchronous or asynchronous OpenAI-compatible clients that come with Fabric. The built-in clients expose OpenAI Python SDK APIs and require no installation or authentication setup.

Both options support the Responses, Chat Completions, and Embeddings APIs.

For distributed processing of large datasets, see [Use Azure OpenAI with SynapseML](how-to-use-openai-synapse-ml.md). For prebuilt transformations on pandas or PySpark DataFrames, see [Use Azure OpenAI with AI Functions](how-to-use-openai-ai-functions.md).

## Prerequisites

[!INCLUDE [prerequisites](../includes/prerequisites.md)]

- Create [a new notebook](../../data-engineering/how-to-use-notebook.md).

## Choose how to create the client

| Option | Setup | When to use it |
| --- | --- | --- |
| OpenAI SDK | Install the `openai` package and create an `AzureOpenAI` client with Fabric authentication. | Use this option when you want to work directly with the OpenAI SDK. |
| Built-in Fabric clients | Import AI Functions and access `client_sync` or `client_async`. | Use this option when you want an OpenAI-compatible Python client that's already installed, authenticated, and configured for Fabric. |

Complete either setup before you run the API examples.

### Use the OpenAI SDK

Install the [OpenAI Python package](https://github.com/openai/openai-python/) in the notebook:

```python
%pip install openai==1.99.5
```

Create an `AzureOpenAI` client with the Fabric-authenticated HTTP client:

```python
from synapse.ml.fabric.credentials import get_openai_httpx_sync_client
import openai

client = openai.AzureOpenAI(
    http_client=get_openai_httpx_sync_client(),
    api_version="2025-04-01-preview",
)
```

The client uses the OpenAI SDK interface while Fabric handles authentication.

### Use the built-in OpenAI-compatible clients

Fabric already includes clients that expose OpenAI Python SDK interfaces. Import AI Functions to access them:

```python
import synapse.ml.aifunc as aifunc

client = aifunc.session.client_sync
async_client = aifunc.session.client_async
```

- You don't need to install a package, create an Azure OpenAI resource, configure an endpoint, or provide an API key.
- Use `client_sync` for synchronous calls.
- Use `client_async` with `await` for asynchronous calls.

The following sections use the synchronous `client` variable created by either option.

## Responses API

Use the Responses API for new text generation applications. You can provide text or message-style input and read the generated text from `response.output_text`. For API details, see the [Responses API reference](https://developers.openai.com/api/reference/resources/responses).

```python
response = client.responses.create(
    model="gpt-5.1",
    input=[
        {
            "role": "user",
            "content": "Explain quantum computing in simple terms.",
        }
    ],
    store=False,
)
print(response.output_text)
```

> [!NOTE]
> The prebuilt Fabric endpoint doesn't support `store=True` or the `previous_response_id` parameter.

## Chat completions

Use the Chat Completions API when your application represents a conversation as a list of messages. For API details, see the [Chat Completions API reference](https://developers.openai.com/api/reference/resources/chat).

```python
response = client.chat.completions.create(
    model="gpt-5.1",
    messages=[
        {
            "role": "user",
            "content": "Summarize the benefits of a lakehouse in one sentence.",
        }
    ],
)
print(response.choices[0].message.content)
```

## Embeddings

An embedding represents the semantic meaning of text as a vector of floating-point numbers. Applications compare these vectors for semantic search, clustering, recommendations, and other similarity-based tasks. For API details, see the [Embeddings API reference](https://developers.openai.com/api/reference/resources/embeddings).

```python
response = client.embeddings.create(
    input="The food was delicious and the waiter...",
    model="text-embedding-ada-002",
)
print(response.data[0].embedding)
```

## Use the asynchronous client

The built-in `client_async` client supports the same APIs as the synchronous client. It comes with Fabric, so you don't need to install or configure an asynchronous OpenAI client. Add `await` before each request:

```python
response = await async_client.responses.create(
    model="gpt-5.1",
    input="Explain quantum computing in simple terms.",
    store=False,
)
print(response.output_text)

chat_response = await async_client.chat.completions.create(
    model="gpt-5.1",
    messages=[
        {
            "role": "user",
            "content": "Summarize the benefits of a lakehouse in one sentence.",
        }
    ],
)
print(chat_response.choices[0].message.content)

embedding_response = await async_client.embeddings.create(
    model="text-embedding-ada-002",
    input="The food was delicious and the waiter...",
)
print(embedding_response.data[0].embedding)
```

## Available models and rates

For information about available models and consumption rates, see [Foundry Tools consumption rate](ai-services-overview.md#consumption-rate).

## Related content

### Fabric documentation

- [Use Azure OpenAI with AI Functions](how-to-use-openai-ai-functions.md) for large-scale transformations on pandas or PySpark DataFrames.
- [Use Azure OpenAI with SynapseML](how-to-use-openai-synapse-ml.md) for distributed processing with Spark DataFrames.
- [Use Azure OpenAI with the REST API](how-to-use-openai-via-rest-api.md) for direct REST API calls to the LLM endpoint.

### OpenAI-compatible API documentation

- [OpenAI Python package](https://github.com/openai/openai-python/).
- [Chat Completions API reference](https://developers.openai.com/api/reference/resources/chat).
- [Responses API reference](https://developers.openai.com/api/reference/resources/responses).
- [Embeddings API reference](https://developers.openai.com/api/reference/resources/embeddings).
