---
title: Customize AI functions with PySpark
description: Learn how to configure AI functions in Fabric for custom use. For example, modifying the underlying LLM or other related settings with PySpark.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Customize AI functions with PySpark

AI functions are designed to work out of the box, with the underlying model and settings configured by default. Users who want more flexible configurations, however, can customize their solutions with a few extra lines of code.

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with the built-in AI endpoint in Fabric.

> [!NOTE]
> - This article covers customizing AI functions with PySpark. To customize AI functions with pandas, see [this article](../pandas/configuration.md).
> - See additional AI functions in [this overview article](../overview.md).

## Select a different model
By default, AI functions uses `gpt-4.1-mini`. To select a different model, you can do one of the following: 

1. Set the `deployment_name` parameter to one of the [models supported by Fabric](../ai-services/ai-services-overview.md#azure-openai-service) 

2. Bring your own Azure OpenAI resource
    - With PySpark, you can use the `OpenAIDefaults` class to modify the underlying language model that powers the functions. The following code sample uses placeholder values to show you how to override the built-in Fabric AI endpoint with a custom Azure OpenAI LLM deployment:

```python
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()

defaults.set_deployment_name("your-deployment-name")
defaults.set_subscription_key("your-subscription-key")
defaults.set_URL("https://your-openai-endpoint.openai.azure.com/")
defaults.set_temperature(0.05)
```

## Configurations

You can also substitute your own values for the deployment name, subscription key, endpoint URL, and custom temperature value:

| Parameter | Description |
|---|---|
| `deployment_name` | A string value that designates the custom name of your model deployment in Azure OpenAI or Azure AI Foundry. In the Azure portal, this value appears under **Resource Management** > **Model Deployments**. In the Azure AI Foundry portal, the value appears on the **Deployments** page. You can choose from the [models that Fabric supports](../ai-services/ai-services-overview.md#azure-openai-service). By default, the native Fabric LLM endpoint deployment is set to `gpt-4.1-mini`. |
| `subscription_key` | An API key used for authentication with your LLM resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. |
| `URL`| A URL that designates the endpoint of your LLM resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. For example: `https://your-openai-endpoint.openai.azure.com/`. |
| `temperature` | A numeric value between **0.0** and **1.0**. Higher temperatures increase the randomness or creativity of the underlying model's outputs. By default, the Fabric LLM endpoint's temperature is set to `0.0`. |
| `concurrency` | An [int](https://docs.python.org/3/library/functions.html#int) that designates the maximum number of rows to process in parallel with asynchronous requests to the model. Higher values speed up processing time (if your capacity can accommodate it). It can be set up to 1,000. | `200` |

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

> [!NOTE]
>
> The Fabric trial edition doesn't support bring-your-own Azure OpenAI resources for AI functions. To connect a custom Azure OpenAI endpoint, upgrade to an F2 (or higher) or P capacity.

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