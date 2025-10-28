---
title: Customize AI functions with pandas
description: Learn how to configure AI functions in Fabric for custom use. For example, modifying the underlying LLM or other related settings with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Customize AI functions with pandas

AI functions are designed to work out of the box, with the underlying model and settings configured by default. Users who want more flexible configurations, however, can customize their solutions with a few extra lines of code.

> [!IMPORTANT]
> This feature is in [preview](../../../get-started/preview.md), for use in [Fabric Runtime 1.3](../../../data-engineering/runtime-1-3.md) and later.
>
> - Review the prerequisites in [this overview article](../overview.md), including the [library installations](../overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.

> [!NOTE]
> - This article covers customizing AI functions with pandas. To customize AI functions with PySpark, see [this article](../pyspark/configuration.md).
> - See additional AI functions in [this overview article](../overview.md).

## Configurations

By default, AI functions are powered by the built-in AI endpoint in Fabric. The LLM's settings are globally configured in the `aifunc.Conf` class. If you work with AI functions in pandas, you can use the `aifunc.Conf` class to modify some or all of these settings:

| Parameter | Description | Default |
|---|---|---|
| `concurrency`<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the maximum number of rows to process in parallel with asynchronous requests to the model. Higher values speed up processing time (if your capacity can accommodate it). It can be set up to 1,000. | `200` |
| `embedding_deployment_name`<br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that designates the name of the embedding model deployment that powers AI functions. | `text-embedding-ada-002` |
| `model_deployment_name`<br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that designates the name of the language model deployment that powers AI functions. You can choose from the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service). | `gpt-4.1-mini` |
| `reasoning_effort`<br> Optional | Used by gpt-5 series models for amount of reasoning tokens it should use. Can be set to `openai.NOT_GIVEN` or a string value of "minimal", "low", "medium", or "high". | `openai.NOT_GIVEN` |
| `seed`<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the seed to use for the response of the underlying model. The default behavior randomly picks a seed value for each row. The choice of a constant value improves the reproducibility of your experiments. | `openai.NOT_GIVEN` |
| `temperature`<br> Optional | A [float](https://docs.python.org/3/library/functions.html#float) between `0.0` and `1.0` that designates the temperature of the underlying model. Higher temperatures increase the randomness or creativity of the model's outputs. | `0.0` |
| `timeout`<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the number of seconds before an AI function raises a time-out error. By default, there's no timeout. | None |
| `top_p`<br> Optional | A [float](https://docs.python.org/3/library/functions.html#float) between 0 and 1. A lower value (e.g., 0.1) restricts the model to consider only the most probable tokens, making the output more deterministic. A higher value (e.g., 0.9) allows for more diverse and creative outputs by including a broader range of tokens. | `openai.NOT_GIVEN` |
| `use_progress_bar`<br> Optional | Show tqdm progress bar for AI function progress over input data. Uses tqdm under the hood. Boolean value which can be set to `True` or `False`. | `True` |
| `verbosity`<br> Optional | Used by gpt-5 series models for output length. Can be set to `openai.NOT_GIVEN` or a string value of "low", "medium", or "high". | `openai.NOT_GIVEN` |

> [!TIP]
> - Setting *concurrency* to higher values can speed up processing time (if your capacity can accommodate it). 

The following code sample shows how to override `aifunc.Conf` settings globally, so that they apply to all AI function calls in a session:

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

aifunc.default_conf.temperature = 0.5 # Default: 0.0
aifunc.default_conf.concurrency = 300 # Default: 200

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
df["sentiment"] = df["text"].ai.analyze_sentiment()
display(df)
```

You can also customize these settings for each individual function call. Each AI function accepts an optional `conf` parameter. The following code sample modifies the default `aifunc` settings for only the `ai.translate` function call, via a custom temperature value. (The `ai.analyze_sentiment` call still uses the default values, because no custom values are set).

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

from synapse.ml.aifunc import Conf

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish", conf=Conf(temperature=0.5))
df["sentiment"] = df["text"].ai.analyze_sentiment()
display(df)
```

## Custom Models

To use an AI model other than the default, you can choose another model supported by Fabric or configure a custom model endpoint.

### Choose another supported large language model

Select one of the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service) and configure it using the `model_deployment_name` parameter. You can do this in one of two ways:

- Globally in the `aifunc.Conf` class.:

```python
    aifunc.default_conf.model_deployment_name = "<model deployment name>">
```

- Individually in each AI function call:

 ```python
df["translations"] = df["text"].ai.translate("spanish", conf=Conf(model_deployment_name="<model deployment name>"))
```

### Choose another supported embedding model

Select one of the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service) and configure it using the `embedding_deployment_name` parameter. You can do this in one of two ways:

- Globally in the `aifunc.Conf` class. Example:

```python
    aifunc.default_conf.embedding_deployment_name = "<embedding deployment name>">
```

- Individually in each AI function call. Example:

 ```python
df["similarity"] = df["company"].ai.similarity("Microsoft", conf=Conf(embedding_deployment_name="<embbedding deployment name>"))
```

### Configure a custom model endpoint

By default, AI functions use the Fabric LLM endpoint. You can also use your own model endpoint by setting up an Azure OpenAI or AsyncOpenAI-compatible client with your endpoint and key. The following example shows how to bring your own Azure OpenAI resource using `aifunc.setup`:

```python
from openai import AzureOpenAI

# Example of how to create a custom client:
client = AzureOpenAI(
    api_key="your-api-key",
    azure_endpoint="https://your-openai-endpoint.openai.azure.com/",
    api_version=aifunc.session.api_version,  # Default "2024-10-21"
    max_retries=aifunc.session.max_retries,  # Default: sys.maxsize ~= 9e18
)

aifunc.setup(client)  # Set the client for all functions.
```

> [!NOTE]
>
> The Fabric trial edition doesn't support bring-your-own Azure OpenAI resources for AI functions. To connect a custom Azure OpenAI endpoint, upgrade to an F2 (or higher) or P capacity.

## Related content

- Customize [AI functions configurations with PySpark](../pyspark/configuration.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Categorize text with [`ai.classify`](./classify.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Calculate similarity with [`ai.similarity`](./similarity.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).