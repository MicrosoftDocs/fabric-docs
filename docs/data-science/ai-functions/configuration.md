---
title: Customize the configuration of AI functions
description: Learn how to configure AI functions in Fabric for custom use, modifying the underlying LLM or other related settings.
ms.author: scottpolly
author: s-polly
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Customize the configuration of AI functions

AI functions, currently in public preview, allow users to harness the power of Fabric's native large language models (LLMs) to [transform and enrich their enterprise data](./overview.md). They're designed to work out-of-the-box, with the underlying model and settings configured by default. Users who want more flexible configurations, however, can customize their solutions with a few extra lines of code.

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and higher.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with Fabric's built-in AI endpoint.

## Customizing AI functions with pandas

By default, AI functions are powered by Fabric's built-in AI endpoint. The LLM's settings are globally configured in the `aifunc.Conf` class. If you work with AI functions in pandas, you can use the `aifunc.Conf` class to modify some or all of these settings:

| **Parameter** | **Description** | **Default** |
|---|---|---|
| **`model_deployment_name`**<br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that designates the name of the language model deployment that powers AI functions. You can choose from the [models supported by Fabric](../ai-services/ai-services-overview.md#azure-openai-service). | **gpt-4o-mini** |
| **`embedding_deployment_name`**<br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that designates the name of the embedding model deployment that powers AI functions. | **text-embedding-ada-002** |
| **`temperature`**<br> Optional | A [float](https://docs.python.org/3/library/functions.html#float) between **0.0** and **1.0** that designates the temperature of the underlying model. Higher temperatures increase the randomness or creativity of the model's outputs. | **0.0** |
| **`seed`**<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the seed to use for the response of the underlying model. The default behavior randomly picks a seed value for each row. The choice of a constant value improves the reproducibility of your experiments. | **openai.NOT_GIVEN** |
| **`timeout`**<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the number of seconds before an AI function raises a time-out error. By default, there's no time-out. | **None** |
| **`max_concurrency`**<br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that designates the maximum number of rows to be processed in parallel with asynchronous requests to the model. Higher values speed up processing time (if your capacity can accommodate it). | **4** |

The next code sample shows how to override `aifunc.Conf` settings globally, so that they apply to all AI function calls in a given session:

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

aifunc.default_conf.temperature = 0.5 # Default: 0.0
aifunc.default_conf.max_concurrency = 10 # Default: 4

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
df["sentiment"] = df["text"].ai.analyze_sentiment()
display(df)
```

You can also customize these settings for each individual function call. Each AI function accepts an optional `conf` parameter. The next code sample modifies the default `aifunc` settings for only the `ai.translate` function call, using a custom temperature value. (The `ai.analyze_sentiment` call still uses the default values, because no custom values are set.)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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

To substitute a custom Azure OpenAI LLM resource in place of the native Fabric LLM, you can use the `aifunc.setup` function with your own client, as shown in the next code sample:

```python
from openai import AzureOpenAI

# Example of creating a custom client
client = AzureOpenAI(
    api_key="your-api-key",
    azure_endpoint="https://your-openai-endpoint.openai.azure.com/",
    api_version=aifunc.session.api_version,  # Default "2024-10-21"
    max_retries=aifunc.session.max_retries,  # Default: sys.maxsize ~= 9e18
)

aifunc.setup(client)  # Set the client for all functions
```

## Customizing AI functions with PySpark

If you're working with AI functions in PySpark, you can use the `OpenAIDefaults` class to modify the underlying language model that powers the functions. As an example, the following code sample uses placeholder values to show how you can override the built-in Fabric AI endpoint with a custom Azure OpenAI LLM deployment:

```python
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()

defaults.set_deployment_name("your-deployment-name")
defaults.set_subscription_key("your-subscription-key")
defaults.set_URL("https://your-openai-endpoint.openai.azure.com/")
defaults.set_temperature(0.05)
```

You can substitute your own values for the deployment name, subscription key, endpoint URL, and custom temperature value:

| **Parameter** | **Description** |
|---|---|
| **`deployment_name`** | A string value that designates the custom name of your model deployment in Azure OpenAI or Azure AI Foundry. In the Azure portal, this value appears under **Resource Management > Model Deployments**. In the Azure AI Foundry portal, the value appears on the **Deployments** page. You can choose from the [models supported by Fabric](../ai-services/ai-services-overview.md#azure-openai-service). By default, the native Fabric LLM endpoint deployment is set to **gpt-4o-mini**. |
| **`subscription_key`** | An API key used for authentication with your LLM resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. |
| **`URL`**| A URL designating the endpoint of your LLM resource. In the Azure portal, this value appears in the **Keys and Endpoint** section. For example: "https://your-openai-endpoint.openai.azure.com/". |
| **`temperature`** | A numeric value between **0.0** and **1.0**. Higher temperatures increase the randomness or creativity of the underlying model's outputs. By default, the Fabric LLM endpoint's temperature is set to **0.0**. |

You can retrieve and print each of the `OpenAIDefaults` parameters with the next code sample:

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

## Related content

- Calculate similarity with [`ai.similarity`](./similarity.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Categorize text with [`ai.classify`](./classify.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Learn more about the full set of AI functions [here](./overview.md).
- Did we miss a feature you need? Let us know! Suggest it at the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/)
