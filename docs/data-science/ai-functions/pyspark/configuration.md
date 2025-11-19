---
title: Customize AI functions with PySpark
description: Learn how to configure AI functions in Fabric for custom use. For example, modifying the underlying LLM or other related settings with PySpark.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
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

If you're working with AI functions in PySpark, you can use the `OpenAIDefaults` class to configure the underlying AI model used by all functions. Settings that can  only be applied per function call are specified in the following section.

| Parameter | Description | Default |
|---|---|---|
| `concurrency` | An [int](https://docs.python.org/3/library/functions.html#int) that designates the maximum number of rows to process in parallel with asynchronous requests to the model. Higher values speed up processing time (if your capacity can accommodate it). It can be set up to 1,000. This value must be set per individual AI function call. In spark, this concurrency value is for each worker. | `50` |
| `deployment_name` | A string value that designates the name of the underlying model. You can choose from [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service). This value can also be set to a custom model deployment in Azure OpenAI or Azure AI Foundry. In the Azure portal, this value appears under **Resource Management** > **Model Deployments**. In the Azure AI Foundry portal, the value appears on the **Deployments** page.  | `gpt-4.1-mini` |
| `reasoning_effort` | Part of OpenAIDefaults. Used by gpt-5 series models for number of reasoning tokens they should use. Can be set to None or a string value of "minimal", "low", "medium", or "high". | None |
| `subscription_key` | An API key used for authentication with your large language model (LLM) resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. | N/A |
| `temperature` | A numeric value between **0.0** and **1.0**. Higher temperatures increase the randomness or creativity of the underlying model's outputs. | `0.0` |
| `top_p` | Part of OpenAIDefaults. A [float](https://docs.python.org/3/library/functions.html#float) between 0 and 1. A lower value (for example, 0.1) restricts the model to consider only the most probable tokens, making the output more deterministic. A higher value (for example, 0.9) allows for more diverse and creative outputs by including a broader range of tokens. | None |
| `URL`| A URL that designates the endpoint of your LLM resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. For example: `https://your-openai-endpoint.openai.azure.com/`. | N/A |
| `verbosity` | Part of OpenAIDefaults. Used by gpt-5 series models for output length. Can be set to None or a string value of "low", "medium", or "high". | None |

The following code sample shows how to configure `concurrency` for an individual function call.

```python
df = spark.createDataFrame([
        ("There are an error here.",),
        ("She and me go weigh back. We used to hang out every weeks.",),
        ("The big picture are right, but you're details is all wrong.",)
    ], ["text"])

results = df.ai.fix_grammar(input_col="text", output_col="corrections", concurrency=200)
display(results)
```

The following code sample shows how to configure the `gpt-5` model for all functions.

```python
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()

defaults.set_deployment_name("gpt-5")
defaults.reset_temperature()  # gpt-5 does not take temperature as a parameter
defaults.reset_top_p()  # gpt-5 does not take temperature as a parameter
defaults.set_verbosity("medium")
defaults.set_reasoning_effort("low")
```

You can retrieve and print each of the `OpenAIDefaults` parameters with the following code sample:

```python
print(defaults.get_deployment_name())
print(defaults.get_subscription_key())
print(defaults.get_URL())
print(defaults.get_temperature())
```

You can also reset the parameters as easily as you modified them. The following code sample resets the AI functions library so that it uses the default Fabric LLM endpoint:

```python
defaults.reset_deployment_name()
defaults.reset_subscription_key()
defaults.reset_URL()
defaults.reset_temperature()
```

## Custom models

### Choose another supported AI model

Set the `deployment_name` to one of the [models supported by Fabric](../../ai-services/ai-services-overview.md#azure-openai-service). For example:

```python
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()

defaults.set_deployment_name("deployment-name")
```

### Configure a custom model endpoint

By default, AI functions use the Fabric LLM endpoint. You can also use your own model endpoint by setting up an Azure OpenAI or AsyncOpenAI-compatible client with your endpoint and key. The following code sample uses placeholder values to show you how to override the built-in Fabric AI endpoint with a custom Azure OpenAI LLM deployment:

```python
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()

defaults.set_deployment_name("your-deployment-name")
defaults.set_subscription_key("your-subscription-key")
defaults.set_URL("https://your-openai-endpoint.openai.azure.com/")
defaults.set_temperature(0.05)
```

The following code sample uses placeholder values to show you how to override the built-in Fabric AI endpoint with a custom AI Foundry resource to use models beyond OpenAI:

> [!IMPORTANT]
> - Support for Azure AI Foundry models is limited to  models that support `Chat Completions` API and accept `response_format` parameter with JSON schema
> - Output may vary depending on the behavior of the selected AI model. Please explore the capabilities of other models with appropriate caution
> - The `ai.similarity` function isn't supported when using an AI Foundry resource

```python
import synapse.ml.spark.aifunc.DataFrameExtensions
from synapse.ml.services.openai import OpenAIDefaults

defaults = OpenAIDefaults()
defaults.set_URL("https://your-ai-foundry-resource.services.ai.azure.com/") # Use your AI Foundry Endpoint
defaults.set_subscription_key(os.getenv("AI_Foundry_API_Key")) # Use your AI Foundry API Key
defaults.set_api_version("2024-05-01-preview")
defaults.set_model("grok-4-fast-reasoning") # Deployment Name
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
