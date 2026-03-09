---
title: Customize AI functions with PySpark
description: Learn how to configure AI functions in Fabric for custom use. For example, modifying the underlying LLM or other related settings with PySpark.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI functions
---

# Customize AI functions with PySpark

AI functions are designed to work out of the box, with the underlying model and settings configured by default. Users who want more flexible configurations, however, can customize their solutions with a few extra lines of code.

> [!IMPORTANT]
> - AI functions are for use in [Fabric Runtime 1.3 (Spark 3.5)](../../../data-engineering/runtime-1-3.md) and later.
> - Review the prerequisites in [this overview article](../overview.md), including the [library installations](../overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.

> [!NOTE]
> - This article covers customizing AI functions with PySpark. To customize AI functions with pandas, see [this article](../pandas/configuration.md).
> - See all AI functions in [this overview article](../overview.md).

## Configurations

If you're working with AI functions in PySpark, you can use the `OpenAIDefaults` class to configure the underlying AI model used by all functions. Settings that can ONLY be applied per function call are specified in the last column of the table below.

> [!NOTE]
> - Global PySpark AI function configurations are set by calling functions of an object of class `OpenAIDefaults()`. An object of this class is created for use as `aifunc.default_conf` when you import the PySpark AI functions library `import synapse.ml.spark.aifunc as aifunc`. You can modify the parameters of this object to change the default settings for all AI function calls in your notebook session.
> - When passing one of these configurations as parameter to a PySpark AI Function call, the global configuration is renamed to use camelCase instead of snake_case and the parameter is passed without the "set_" prefix. For example, `aifunc.default_conf.set_deployment_name("gpt-5")` would be passed as `deploymentName="gpt-5"` in the function call.

| Parameter | Description | Default | Global or Per-Function Parameter |
|---|---|---|---|
| `api_type` | A [string](https://docs.python.org/3/library/stdtypes.html#str) value that designates the type of API to call on the underlying model. The default value is `responses`, which is compatible with OpenAI models. You may set this value to `chat_completions` to use LLMs compatible with the chat completions API, such as non-OpenAI models hosted on Microsoft Foundry. | `responses` | Both |
| `concurrency` | An [int](https://docs.python.org/3/library/functions.html#int) that designates the maximum number of rows to process in parallel with asynchronous requests to the model. Higher values speed up processing time (if your capacity can accommodate it). It can be set up to 1,000. This value must be set per individual AI function call. In spark, this concurrency value is for each worker. | `50` | Function parameter |
| `deployment_name` | A [string](https://docs.python.org/3/library/stdtypes.html#str) value that designates the name of the underlying model. You can choose from [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service). This value can also be set to a custom model deployment in Azure OpenAI or Microsoft Foundry. In the Azure portal, this value appears under **Resource Management** > **Model Deployments**. In the Foundry portal, the value appears on the **Deployments** page.  | `gpt-4.1-mini` | Both |
| `embedding_deployment_name` | A [string](https://docs.python.org/3/library/stdtypes.html#str) value that designates the name of the embedding model deployment that powers AI functions. | `text-embedding-ada-002` | Global |
| `reasoning_effort` | A [string](https://docs.python.org/3/library/stdtypes.html#str) used by gpt-5 series models for number of reasoning tokens they should use. Can be set to None or a string value of "minimal", "low", "medium", or "high". | None | Both |
| `subscription_key` | A [string](https://docs.python.org/3/library/stdtypes.html#str) API key used for authentication with your large language model (LLM) resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. | N/A | Both |
| `temperature` | A [float](https://docs.python.org/3/library/functions.html#float) value between **0.0** and **1.0**. Higher temperatures increase the randomness or creativity of the underlying model's outputs. | `0.0` | Both |
| `top_p` | A [float](https://docs.python.org/3/library/functions.html#float) between 0 and 1. A lower value (for example, 0.1) restricts the model to consider only the most probable tokens, making the output more deterministic. A higher value (for example, 0.9) allows for more diverse and creative outputs by including a broader range of tokens. | None | Both |
| `URL`| A [string](https://docs.python.org/3/library/stdtypes.html#str) URL that designates the endpoint of your LLM resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. For example: `https://your-openai-endpoint.openai.azure.com/`. | N/A | Both |
| `verbosity` | A [string](https://docs.python.org/3/library/stdtypes.html#str) used by gpt-5 series models for output length. Can be set to None or a string value of "low", "medium", or "high". | None | Both |

### Configure reasoning models

The following code sample shows how to configure the `gpt-5` and other reasoning models for all functions.

```python
aifunc.default_conf.set_deployment_name("gpt-5")
aifunc.default_conf.set_api_type("chat_completions")  # To get around a bug when using gpt-5 with default "responses" api
aifunc.default_conf.set_reasoning_effort("low")  # "minimal", "low", "medium", "high"
aifunc.default_conf.set_verbosity("low")  # "low", "medium", "high"
aifunc.default_conf.set_temperature(1)  # gpt-5 only accepts default value of temperature
aifunc.default_conf.set_top_p(1)  # gpt-5 only accepts default value of top_p
```

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

You may reset the parameters as easily as you modified them. The following code sample resets the AI functions library so that it uses the default Fabric LLM endpoint:

```python
aifunc.default_conf.reset_deployment_name()
aifunc.default_conf.reset_subscription_key()
aifunc.default_conf.reset_URL()
aifunc.default_conf.reset_temperature()
```

## Custom models

### Choose another supported large language model

Set the `deployment_name` to one of the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service).

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

By default, AI functions use the Fabric LLM endpoint API for unified billing and easy setup.
You may choose to use your own model endpoint by setting up an Azure OpenAI or AsyncOpenAI-compatible client with your endpoint and key. The following code sample uses placeholder values to show you how to override the built-in Fabric AI endpoint with your own Foundry or Azure OpenAI resource's model deployments:

```python
aifunc.default_conf.set_URL("https://<ai-foundry-resource>.openai.azure.com/")
aifunc.default_conf.set_subscription_key("<API_KEY>")
```

The following code sample uses placeholder values to show you how to override the built-in Fabric AI endpoint with a custom Foundry resource to use models beyond OpenAI:

> [!IMPORTANT]
> - Support for Foundry models is limited to  models that support `Chat Completions` API and accept `response_format` parameter with JSON schema
> - Output may vary depending on the behavior of the selected AI model. Please explore the capabilities of other models with appropriate caution
> - The embedding based AI functions `ai.embed` and `ai.similarity` aren't supported when using a Foundry resource

```python
aifunc.default_conf.set_URL("https://<ai-foundry-resource>.services.ai.azure.com")  # Use your Foundry Endpoint
aifunc.default_conf.set_subscription_key("<API_KEY>")
aifunc.default_conf.set_deployment_name("grok-4-fast-non-reasoning")
```

## Related content

- Customize [AI functions configurations with pandas](../pandas/configuration.md).
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
