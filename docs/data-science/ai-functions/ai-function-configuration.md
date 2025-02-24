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

AI functions are designed to work out of the box in Fabric notebooks, with the underlying language model and its associated settings configured by default. Users who want more flexible configurations, however, can customize their solutions with a few extra lines of code.

## Customizing AI funtions with pandas

## Customizing AI functions with PySpark

If you're using AI functions with PySpark, you can use the `OpenAIDefaults` TBD to modify the underlying language model wi

- **Config 1**: TBD
- **Config 2**: TBD
- **Config 3**: TBD
- **Config 4**: TBD

```python
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()

# TBD COMMENT

defaults.set_deployment_name("gpt-35-turbo-0125")
defaults.set_subscription_key(aoai_key)
defaults.set_URL("https://synapseml-openai-2.openai.azure.com/")
defaults.set_temperature(0.05)

print(defaults.get_deployment_name())
print(defaults.get_subscription_key())
print(defaults.get_URL())
print(defaults.get_temperature())
```

Each of the modifiable parameters can be reset as follows:

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