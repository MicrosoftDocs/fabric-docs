---
title: Customize AI Functions with PySpark
description: Learn how to configure AI Functions in Fabric for custom use. For example, modifying the underlying LLM or other related settings with PySpark.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 06/10/2026
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Customize AI Functions with PySpark

AI Functions work out of the box with default model settings. Use these settings to change models, concurrency, chaining, stats, or endpoint configuration for PySpark.

> [!NOTE]
>
> - This article covers PySpark. For pandas, see [Customize AI Functions with pandas](../pandas/configuration.md).
> - For all AI Functions, see [AI Functions overview](../overview.md).

## Configurations

If you're working with AI Functions in PySpark, you can use the `OpenAIDefaults` class to configure the underlying AI model used by all functions. Settings that can only be applied per function call are specified in the last column of the following table.

> [!NOTE]
>
> - Global PySpark AI function configurations are set by calling functions of an object of class `OpenAIDefaults()`. An object of this class is created for use as `aifunc.default_conf` when you import the PySpark AI Functions library `import synapse.ml.spark.aifunc as aifunc`. You can modify the parameters of this object to change the default settings for all AI function calls in your notebook session.
> - When passing one of these configurations as parameter to a PySpark AI Function call, the global configuration is renamed to use camelCase instead of snake_case and the parameter is passed without the `set_` prefix. For example, `aifunc.default_conf.set_deployment_name("gpt-5.1")` would be passed as `deploymentName="gpt-5.1"` in the function call.

| Parameter | Description | Default | Global or Per-Function Parameter |
| --- | --- | --- | --- |
| `api_type` | A [string](https://docs.python.org/3/library/stdtypes.html#str) value that designates the type of API to call on the underlying model. The default value is `responses`. Set this value to `chat_completions` to use LLMs compatible with the chat completions API, such as non-OpenAI models hosted on Microsoft Foundry. | `responses` | Both |
| `concurrency` | An [int](https://docs.python.org/3/library/functions.html#int) that designates the maximum number of rows to process in parallel with asynchronous requests to the model. Higher values speed up processing time (if your capacity can accommodate it). It can be set up to 1,000. This value must be set per individual AI function call. In Spark, this concurrency value is for each worker. | `200` | Function parameter |
| `deployment_name` | A [string](https://docs.python.org/3/library/stdtypes.html#str) value that designates the name of the underlying model. You can choose from [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service). This value can also be set to a custom model deployment in Azure OpenAI or Microsoft Foundry. In the Azure portal, this value appears under **Resource Management** > **Model Deployments**. In the Foundry portal, the value appears on the **Deployments** page. | `gpt-5-mini` | Both |
| `embedding_deployment_name` | A [string](https://docs.python.org/3/library/stdtypes.html#str) value that designates the name of the embedding model deployment that powers AI Functions. | `text-embedding-ada-002` | Global |
| `reasoning_effort` | A [string](https://docs.python.org/3/library/stdtypes.html#str) used by GPT-5 series models to control how many reasoning tokens they use. Can be set to `None` or a string value of `"minimal"`, `"low"`, `"medium"`, or `"high"`. | `"low"` | Both |
| `subscription_key` | A [string](https://docs.python.org/3/library/stdtypes.html#str) API key used for authentication with your large language model (LLM) resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. | N/A | Both |
| `temperature` | A [float](https://docs.python.org/3/library/functions.html#float) value between **0.0** and **1.0**. Higher temperatures increase the randomness or creativity of the underlying model's outputs. GPT-5 series models support only the model default. | None | Both |
| `top_p` | A [float](https://docs.python.org/3/library/functions.html#float) between 0 and 1. A lower value (for example, 0.1) restricts the model to consider only the most probable tokens, making the output more deterministic. A higher value (for example, 0.9) allows for more diverse and creative outputs by including a broader range of tokens. | None | Both |
| `URL` | A [string](https://docs.python.org/3/library/stdtypes.html#str) URL that designates the endpoint of your LLM resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. For example: `https://your-openai-endpoint.openai.azure.com/`. | N/A | Both |
| `verbosity` | A [string](https://docs.python.org/3/library/stdtypes.html#str) used by GPT-5 series models for output length. Can be set to `None` or a string value of `"low"`, `"medium"`, or `"high"`. | None | Both |

### Configure reasoning models

The following code sample shows how to configure `gpt-5.1` or another reasoning model. The default `gpt-5-mini` model already uses `"low"` reasoning effort and leaves `temperature` unset.

```python
aifunc.default_conf.set_deployment_name("gpt-5.1")
aifunc.default_conf.set_reasoning_effort("medium")  # "minimal", "low", "medium", "high"
aifunc.default_conf.set_verbosity("low")  # "low", "medium", "high"
```

## Chain AI Functions and view stats

PySpark AI Functions return DataFrames that keep the `df.ai` accessor bound to the result schema. You can chain transformations without computing an intermediate DataFrame.

```python
output = (
    df
    .ai.summarize(input_col="review_text", output_col="summary")
    .ai.classify(
        labels=["service", "cleanliness", "location", "other"],
        input_col="summary",
        output_col="category",
    )
)
```

After any AI function call, access `df.ai.stats` on the result DataFrame to view token usage and execution statistics, including `input_tokens`, `output_tokens`, `cached_tokens`, and `reasoning_tokens`.

### Configure concurrency

The following code sample shows how to configure `concurrency` for an individual function call.

```python
df = spark.createDataFrame([
        ("There are an error here.",),
        ("She and me go weigh back. We used to hang out every weeks.",),
        ("The big picture are right, but you're details is all wrong.",),
    ], ["text"])

results = df.ai.fix_grammar(
    input_col="text",
    output_col="corrections",
    concurrency=200,
)
display(results)
```

### Retrieve and reset parameters

You can retrieve and print each of the `OpenAIDefaults` parameters with the following code sample:

```python
print(aifunc.default_conf.get_deployment_name())
print(aifunc.default_conf.get_subscription_key())
print(aifunc.default_conf.get_URL())
print(aifunc.default_conf.get_temperature())
```

You can reset the parameters as easily as you modified them. The following code sample resets the AI Functions library so that it uses the default Fabric LLM endpoint:

```python
aifunc.default_conf.reset_deployment_name()
aifunc.default_conf.reset_subscription_key()
aifunc.default_conf.reset_URL()
aifunc.default_conf.reset_temperature()
```

## Custom models

### Choose another supported large language model

Set the `deployment_name` to one of the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service).

The older GPT-4.1 model series is being retired. If you pinned PySpark AI Functions pipelines to `gpt-4.1`, migrate them to `gpt-5.1`. If you pinned pipelines to `gpt-4.1-mini`, migrate them to `gpt-5-mini`.

- Globally in the `OpenAIDefaults()` object:

    ```python
    aifunc.default_conf.set_deployment_name("<model deployment name>")
    ```

- Individually in each AI function call:

    ```python
    results = df.ai.translate(
        to_lang="spanish",
        input_col="text",
        output_col="out",
        error_col="error_col",
        deploymentName="<model deployment name>",
    )
    ```

### Choose another supported embedding model

Set the `embedding_deployment_name` to one of the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service) when using `ai.embed` or `ai.similarity` functions.

- Globally in the `OpenAIDefaults()` object:

    ```python
    aifunc.default_conf.set_embedding_deployment_name("<embedding deployment name>")
    ```

- Individually in each AI function call:

    ```python
    results = df.ai.embed(
        input_col="english",
        output_col="out",
        deploymentName="<embedding deployment name>",
    )
    ```

### Configure a custom model endpoint

By default, AI Functions use the Fabric LLM endpoint API for unified billing and easy setup.
You can use your own model endpoint by setting up an Azure OpenAI or AsyncOpenAI-compatible client with your endpoint and key. The following code sample uses placeholder values to show you how to override the built-in Fabric AI endpoint with your own Foundry or Azure OpenAI resource's model deployments:

```python
aifunc.default_conf.set_URL("https://<ai-foundry-resource>.openai.azure.com/")
aifunc.default_conf.set_subscription_key("<API_KEY>")
```

The following code sample uses placeholder values to show you how to override the built-in Fabric AI endpoint with a custom Foundry resource to use models beyond OpenAI:

> [!IMPORTANT]
>
> - Support for Foundry models is limited to  models that support `Chat Completions` API and accept `response_format` parameter with JSON schema
> - Output might vary depending on the behavior of the selected AI model. Explore the capabilities of other models with appropriate caution.
> - The embedding based AI Functions `ai.embed` and `ai.similarity` aren't supported when using a Foundry resource

```python
aifunc.default_conf.set_URL("https://<ai-foundry-resource>.services.ai.azure.com")  # Use your Foundry Endpoint
aifunc.default_conf.set_subscription_key("<API_KEY>")
aifunc.default_conf.set_deployment_name("grok-4-fast-non-reasoning")
```

## Related content

- Customize [AI Functions with pandas](../pandas/configuration.md).
- Learn more about [AI Functions](../overview.md).
- Understand [billing for AI Functions](../billing.md).
