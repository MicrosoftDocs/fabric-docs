---
title: Categorize text with the `ai.classify` function
description: Learn how to use the `ai.classify` function, which invokes Generative AI to categorize input text according to custom labels you choose.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Categorize text with the `ai.classify` function

The `ai.classify` function uses Generative AI to categorize input text according to custom labels you choose—all in just a single line of Python or PySpark code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.classify` with Python

[TBD]

## Use `ai.classify` with PySpark

[TBD]

### Syntax

```python
df.ai.classify(labels=["category1", "category2", "category3"], input_col="text", output_col="category")
```

### Inputs

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | TBD |
| **`input_col`** <br> Required | TBD |
| **`output_col`** <br> Optional | TBD |

### Returns

[TBD]

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural polyester, is perfect for a good night's sleep.",),
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",),
        ("Enjoy this *BREAND NEW CAR!* A compact SUV perfect for the light commuter!",)
    ], ["description"])
    
categories = df.ai.classify(labels=["kitchen", "bedroom", "garage", "other"], input_col="description", output_col="category")
display(categories)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze_sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
