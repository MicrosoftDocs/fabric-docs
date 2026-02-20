---
title: Customize AI functions with pandas
description: Learn how to configure AI functions in Fabric for custom use. For example, modifying the underlying LLM or other related settings with pandas.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI functions
---

# Customize AI functions with pandas

AI functions are designed to work out of the box, with the underlying model and settings configured by default. Users who want more flexible configurations, however, can customize their solutions with a few extra lines of code.

> [!IMPORTANT]
> - AI functions are for use in [Fabric Runtime 1.3 (Spark 3.5), (Python 3.11)](../../../data-engineering/runtime-1-3.md) and later.
> - Review the prerequisites in [this overview article](../overview.md), including the [library installations](../overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.

> [!NOTE]
> - This article covers customizing AI functions with pandas. To customize AI functions with PySpark, see [this article](../pyspark/configuration.md).
> - See all AI functions in [this overview article](../overview.md).

## Configurations

By default, AI functions are powered by the built-in AI endpoint in Fabric. The large language model (LLM) settings are globally configured in the `aifunc.Conf` class. If you work with AI functions in pandas, you can use the `aifunc.Conf` class to modify some or all of these settings:

| Parameter | Description | Default |
|---|---|---|
| `concurrency`<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the maximum number of rows to process in parallel with asynchronous requests to the model. Higher values speed up processing time (if your capacity can accommodate it). It can be set up to 1,000. | `200` |
| `embedding_deployment_name`<br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that designates the name of the embedding model deployment that powers AI functions. | `text-embedding-ada-002` |
| `model_deployment_name`<br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that designates the name of the language model deployment that powers AI functions. You can choose from the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service). | `gpt-4.1-mini` |
| `reasoning_effort`<br> Optional | Used by gpt-5 series models for number of reasoning tokens they should use. Can be set to `openai.NOT_GIVEN` or a string value of "minimal", "low", "medium", or "high". | `openai.NOT_GIVEN` |
| `seed`<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the seed to use for the response of the underlying model. The default behavior randomly picks a seed value for each row. The choice of a constant value improves the reproducibility of your experiments. | `openai.NOT_GIVEN` |
| `temperature`<br> Optional | A [float](https://docs.python.org/3/library/functions.html#float) between `0.0` and `1.0` that designates the temperature of the underlying model. Higher temperatures increase the randomness or creativity of the model's outputs. | `0.0` |
| `timeout`<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the number of seconds before an AI function raises a time-out error. By default, there's no timeout. | None |
| `top_p`<br> Optional | A [float](https://docs.python.org/3/library/functions.html#float) between 0 and 1. A lower value (for example, 0.1) restricts the model to consider only the most probable tokens, making the output more deterministic. A higher value (for example, 0.9) allows for more diverse and creative outputs by including a broader range of tokens. | `openai.NOT_GIVEN` |
| `use_progress_bar`<br> Optional | Show tqdm progress bar for AI function progress over input data. Uses tqdm under the hood. Boolean value, which can be set to `True` or `False`. | `True` |
| `verbosity`<br> Optional | Used by gpt-5 series models for output length. Can be set to `openai.NOT_GIVEN` or a string value of "low", "medium", or "high". | `openai.NOT_GIVEN` |

> [!TIP]
> - If your model deployment capacity can accommodate more requests, setting a higher *concurrency* values can speed up processing time. 

The following code sample shows how to override `aifunc.Conf` settings globally, so that they apply to all AI function calls in a session:

```python
# This code uses AI. Always review output for mistakes.

aifunc.default_conf.temperature = 0.5 # Default: 0.0
aifunc.default_conf.concurrency = 300 # Default: 200

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself.",
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
df["sentiment"] = df["text"].ai.analyze_sentiment()
display(df)
```

You can also customize these settings for each individual function call. Each AI function accepts an optional `conf` parameter. The following code sample modifies the default `aifunc` settings for only the `ai.translate` function call, via a custom temperature value. (The `ai.analyze_sentiment` call still uses the default values, because no custom values are set).

```python
# This code uses AI. Always review output for mistakes. 

from synapse.ml.aifunc import Conf

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself.",
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish", conf=Conf(temperature=0.5))
df["sentiment"] = df["text"].ai.analyze_sentiment()
display(df)
```

The following code sample shows how to configure the `gpt-5` and other reasoning models for all functions.

```python
aifunc.default_conf.model_deployment_name = "gpt-5"
aifunc.default_conf.temperature = 1  # gpt-5 only accepts default value of temperature
aifunc.default_conf.top_p = 1  # gpt-5 only accepts default value of top_p
aifunc.default_conf.verbosity = "low"
aifunc.default_conf.reasoning_effort = "low"
```

## Custom Models

To use an AI model other than the default, you can choose another model supported by Fabric or configure a custom model endpoint.

### Choose another supported large language model

Select one of the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service) and configure it using the `model_deployment_name` parameter. You can do this configuration in one of two ways:

- Globally in the `aifunc.Conf` class. Example:

    ```python
    aifunc.default_conf.model_deployment_name = "<model deployment name>"
    ```

- Individually in each AI function call:

    ```python
    df["translations"] = df["text"].ai.translate(
        "spanish",
        conf=Conf(model_deployment_name="<model deployment name>"),
    )
    ```

### Choose another supported embedding model

Select one of the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service) and configure it using the `embedding_deployment_name` parameter. You can do this configuration in one of two ways:

- Globally in the `aifunc.Conf` class. Example:

    ```python
    aifunc.default_conf.embedding_deployment_name = "<embedding deployment name>"
    ```

- Individually in each AI function call. Example:

    ```python
    df["embedding"] = df["text"].ai.embed(
        conf=Conf(embedding_deployment_name="<embedding deployment name>"),
    )
    ```

### Configure a custom model endpoint

By default, AI functions use the Fabric LLM endpoint API for unified billing and easy setup.
You may choose to use your own model endpoint by setting up an Azure OpenAI or OpenAI-compatible client with your endpoint and key. The following example shows how to bring your own Microsoft AI Foundry (formerly Azure OpenAI) resource using `aifunc.setup`:

```python
from openai import AzureOpenAI

# Example to create client for Microsoft AI Foundry OpenAI models
client = AzureOpenAI(
    azure_endpoint="https://<ai-foundry-resource>.openai.azure.com/",
    api_key="<API_KEY>",
    api_version=aifunc.session.api_version,  # Default "2025-04-01-preview"
    max_retries=aifunc.session.max_retries,  # Default: sys.maxsize ~= 9e18
)
aifunc.setup(client)  # Set the client for all functions.
```

> [!TIP]
> - You can configure a custom AI Foundry resource to use models beyond OpenAI.

The following code sample uses placeholder values to show you how to override the built-in Fabric AI endpoint with a custom Microsoft AI Foundry resource to use models beyond OpenAI:

> [!IMPORTANT]
> - Support for Microsoft AI Foundry models is limited to  models that support `Chat Completions` API and accept `response_format` parameter with JSON schema
> - Output may vary depending on the behavior of the selected AI model. Please explore the capabilities of other models with appropriate caution
> - The embedding based AI functions `ai.embed` and `ai.similarity` aren't supported when using an AI Foundry resource

```python
from openai import OpenAI

# Example to create client for Azure AI Foundry models
client = OpenAI(
    base_url="https://<ai-foundry-resource>.services.ai.azure.com/openai/v1/",
    api_key="<API_KEY>",
    max_retries=aifunc.session.max_retries,  # Default: sys.maxsize ~= 9e18
)
aifunc.setup(client)  # Set the client for all functions.

aifunc.default_conf.model_deployment_name = "grok-4-fast-non-reasoning"
```

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
