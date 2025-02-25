---
title: Customize the configuration of AI functions in Fabric (Preview)
description: Learn how to configure AI funtions in Fabric for custom use, modifying the underlying LLM endpoint and other default settings.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Customize the configuration of AI functions in Fabric

[AI functions](ai-function-overview.md), which allow Fabric users to apply LLM-powered operations to their enterprise data in a single line of code, are designed to work out of the box in Fabric notebooks. The underlying language model and its settings are configured by default, but users who want more flexible configurations can customize their solutions with a few extra lines of code.

## Customizing AI functions with pandas

By default, AI functions are powered by the native Fabric LLM endpoint. If you're working with AI functions in pandas, you can use the `aifunc.Conf` class to modify some or all of the following underlying settings:

| **Parameter** | **Description** |
|---|---|
| **`model_deployment_name`** | A string value designating the name of the language model deployment that powers AI functions. By default, the native Fabric LLM endpoint uses **gpt-35-turbo-0125** |
| **`embedding_deployment_name`** | A string value designating the name of the embedding model deployment that powers AI functions. By default, the native Fabric LLM endpoint uses **text-embedding-ada-002**. |
| **`temperature`** | A float value between **0** and **1**. Higher temperatures will increase the randomness or creativity of the underlying model's outputs. By default, the Fabric LLM endpoint's temperature is set to **0**. |
| **`seed`** | An int value designating the seed to use for the underlying model's response. By default, this value is not specified. |
| **`timeout`** | An int value designating the number of seconds before an AI function raises a timeout error. By default, this value is not specified. |
| **`max_concurrency`** | An int value designating the maximum number of rows to be processed in parallel with asynchronous requests to the model. By default, this value is set to **4**. |

The following code sample shows to override `aifunc.Conf` settings globally, so that they will apply to multiple AI function calls in a given session:

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

from aifunc import Conf
aifunc.default_conf.temperature = 0.5 # Default: 0.0
aifunc.default_conf.max_concurrency = 1 # Default: 4

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
df["sentiment"] = df["text"].ai.analyze_sentiment()
display(df)
```

You can also customize these settings per individual function call, using the optional `conf` parameter for any AI function. This parameter accepts an instance of the `aifunc.Conf` class.

Unlike the example above, the code sample below modifies the default `aifunc` settings for only the `ai.translate` function call, using a custom temperature value. Please note that the `ai.analyze_sentiment` call still uses the defaults.

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

from aifunc import Conf

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish", conf=Conf(temperature=0.5))
df["sentiment"] = df["text"].ai.analyze_sentiment()
display(df)
```

If you want to substitute a [custom Azure Open AI LLM resource](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource) in place of the native Fabric LLM, you can the `aifunc.setup` function with your own client, as shown in the code sample below:

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

If you're working with AI functions in PySpark, you can use the `OpenAIDefaults` class to modify the underlying language model that powers the functions. As an example, the following code sample uses placeholder values to show how you can override the native Fabric LLM endpoint with a [custom Azure OpenAI LLM deployment](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource):

```python
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()

defaults.set_deployment_name("your-deployment-name")
defaults.set_subscription_key("your-subscription-key")
defaults.set_URL("https://your-openai-endpoint.openai.azure.com/")
defaults.set_temperature(0.05)
```

You can subsitute your own values for the deployment name, subscription key, endpoint URL, and custom temperature value:

| **Parameter** | **Description** |
|---|---|
| **`deployment_name`** | A string value designating the custom name of your model deployment in Azure Open AI or Azure AI Foundry. In the Azure portal, this value will appear under **Resource Management > Model Deployments**. In the Azure AI Foundry portal, the value will appear on the **Deployments** page. By default, the native Fabric LLM endpoint deployment is set to **gpt-35-turbo-0125**. |
| **`subscription_key`** | An API key used for authentication with your LLM resource. In the Azure portal, this value will appear in the **Keys and Endpoint** section. |
| **`URL`**| A URL designating the endpoint of your LLM resource. In the Azure portal, this value will appear in the **Keys and Endpoint** section. For example: "https://your-openai-endpoint.openai.azure.com/". |
| **`temperature`** | A numeric value between **0** and **1**. Higher temperatures will increase the randomness or creativity of the underlying model's outputs. By default, the Fabric LLM endpoint's temperature is set to **0**. |

Each of the `OpenAIDefaults` parameters can be retrieved and printed with the code below:

```python
print(defaults.get_deployment_name())
print(defaults.get_subscription_key())
print(defaults.get_URL())
print(defaults.get_temperature())
```

And you can reset the parameters as easily as you modified them. The code sample below will reset the AI functions library so that it uses the default Fabric LLM endpoint:

```python
defaults.reset_deployment_name()
defaults.reset_subscription_key()
defaults.reset_URL()
defaults.reset_temperature()
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Categorize text with [`ai.classify`](classify.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- Did we miss a feature you need? Let us know! Suggest it at the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/)