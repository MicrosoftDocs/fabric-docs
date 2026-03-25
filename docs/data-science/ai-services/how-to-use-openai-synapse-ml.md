---
title: Use Azure OpenAI with SynapseML
description: How to use prebuilt Azure OpenAI in Fabric with SynapseML for distributed processing
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

# Use Azure OpenAI in Fabric with SynapseML (preview)

This article shows how to use Azure OpenAI in Fabric with [SynapseML](https://github.com/microsoft/SynapseML). SynapseML is an open-source library that enables distributed processing of large datasets with Foundry Tools. For single-row or small dataset scenarios, see [Use Azure OpenAI with Python SDK](how-to-use-openai-python-sdk.md) or [Use Azure OpenAI with AI Functions](how-to-use-openai-ai-functions.md).

## Why use SynapseML?

SynapseML offers several advantages for working with Azure OpenAI in Fabric:

- **Open source**: Available at [https://github.com/microsoft/SynapseML](https://github.com/microsoft/SynapseML)
- **No client setup needed**: Authentication is handled automatically in Fabric
- **Distributed processing**: Process millions of rows efficiently with minimal overhead. Use [Fabric AI Functions](how-to-use-openai-ai-functions.md) for validated text transformations at scale.
- **Fast batch workloads**: Optimized for large-scale operations

## Prerequisites

> [!NOTE]
> SynapseML should be run in PySpark runtimes [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.

``` python
import synapse.ml.core
from synapse.ml.services.openai import *
```

The `OpenAIPrompt` transformer provides more flexibility, including support for the Chat Completions or Responses API, usage tracking, and structured output. For finer control use `OpenAIChatCompletions` or `OpenAIResponses` transformers directly. See more details on [SynapseML GitHub Example Notebook](https://github.com/microsoft/SynapseML/blob/master/docs/Explore%20Algorithms/OpenAI/OpenAI.ipynb)

### Using Chat Completions API

```python
from synapse.ml.services.openai import OpenAIPrompt

# Create a DataFrame with prompts
df = spark.createDataFrame([
    ("Explain quantum computing in simple terms.",),
    ("What are the benefits of exercise?",),
    ("Describe the water cycle.",)
]).toDF("prompt")

# Configure OpenAIPrompt with chat_completions API
prompt_completion = (
    OpenAIPrompt()
    .setDeploymentName("gpt-4.1")
    .setApiType("chat_completions")  # Accepts "chat_completions" or "responses"
    .setPromptCol("prompt")
    .setUsageCol("usage")  # Track token usage
    .setOutputCol("completions")
)

# Transform and display results
display(prompt_completion.transform(df).select("prompt", "completions", "usage"))
```

### Using Responses API

The Responses API provides improved response quality and better handling of structured outputs.

```python
from synapse.ml.services.openai import OpenAIPrompt

# Configure OpenAIPrompt with responses API
prompt_responses = (
    OpenAIPrompt()
    .setDeploymentName("gpt-4.1")
    .setApiType("responses")
    .setPromptCol("prompt")
    .setUsageCol("usage")  # Track token usage
    .setStore(False)  # Fabric LLM endpoint does not support storage
    .setOutputCol("responses")
)

# Transform and display results
display(prompt_responses.transform(df).select("prompt", "responses", "usage"))
```

> [!NOTE]
> The Fabric LLM endpoint does not support the `store` parameter set to `True` or the `previous_response_id` parameter.

### Structured output with OpenAIPrompt

Request structured JSON output using the `setResponseFormat` method. The response format accepts the following options:

| Format | Description |
|--------|-------------|
| `None` (default) | Let the LLM decide response format based on the instructions and input data, which can vary per row. Responses can be plain text or JSON dict with varying fields. |
| `"text"` or `{"type": "text"}` | Forces plain text responses for all rows. |
| `"json_object"` or `{"type": "json_object"}` | Returns a JSON dictionary in text form where the LLM decides the fields. Requires the word "json" in your prompt. |
| `{"type": "json_schema", ...}` | Returns a JSON dictionary that conforms to your custom [JSON Schema](https://json-schema.org/). Provides precise control over response structure. |

```python
from synapse.ml.services.openai import OpenAIPrompt

# Create a DataFrame with prompts requiring structured output
df = spark.createDataFrame([
    ("List three programming languages with their main use cases.",),
]).toDF("prompt")

# Configure OpenAIPrompt with JSON response format
prompt_json = (
    OpenAIPrompt()
    .setDeploymentName("gpt-4.1")
    .setApiType("chat_completions")
    .setPromptCol("prompt")
    .setUsageCol("usage")
    .setResponseFormat({"type": "json_object"})  # Request JSON output
    .setOutputCol("completions")
)

# Transform and display results
display(prompt_json.transform(df).select("prompt", "completions", "usage"))
```

## Embeddings with OpenAIEmbedding

An embedding is a special format of data representation by machine learning models and algorithms. The embedding is an information dense representation of the semantic meaning of a piece of text. Each embedding is a vector of floating point numbers, such that the distance between two embeddings in the vector space is correlated with semantic similarity between two inputs in the original format. For example, if two texts are similar, then their vector representations should also be similar.

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
    .setDeploymentName("text-embedding-ada-002")
    .setTextCol("text")
    .setOutputCol("out")
)
display(embedding.transform(df))
```

## Available models and rates

For information about available models and consumption rates, see [Foundry Tools consumption rate](ai-services-overview.md#consumption-rate).

## Related content

- [Use Azure OpenAI with AI Functions](how-to-use-openai-ai-functions.md) for large scale dataset transformations in Fabric for Pandas or PySpark DataFrames
- [Use Azure OpenAI with Python SDK](how-to-use-openai-python-sdk.md) for pythonic control over single API calls using OpenAI Python SDK
- [Use Azure OpenAI with REST API](how-to-use-openai-via-rest-api.md) for direct REST API calls to the LLM endpoint
