---
title: Configure AI functions in Fabric for custom use (Preview)
description: Learn how to configure AI funtions in Fabric for custom use, modifying the underlying LLM and other default settings.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# TBD

AI functions, which allow users to apply LLM-powered transformations to their enterprise data in a single line of code, are designed to work out of the box in Fabric notebooks, with the underlying language model and its associated settings configured by default. Users who want more flexible configurations, however, can customize their solutions with a few extra lines of code.

## Customizing AI functions with pandas

## Customizing AI functions with PySpark

If you're working with AI functions in PySpark, you can use the `OpenAIDefaults` class to modify the underlying language model that powers the functions. The code sample below shows how to override the native Fabric LLM endpoint with your own Azure OpenAI LLM resource by specifying a deployment name, subscription key, URL, and custom temperature value.

You can learn more about creating your own Azure OpenAI resources [here](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal).

```python
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()

defaults.set_deployment_name("YOUR DEPLOYMENT HERE")
defaults.set_subscription_key("YOUR SUBSCRIPTION KEY HERE")
defaults.set_URL("YOUR URL HERE")
defaults.set_temperature(0.05)
```

Each of the modifiable parameters can be retrieved and printed with the code below:

```python
print(defaults.get_deployment_name())
print(defaults.get_subscription_key())
print(defaults.get_URL())
print(defaults.get_temperature())
```

And you can reset the parameters as easily as you modified them. The code sample below will revert the AI functions to use the native Fabric LLM endpoint:

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