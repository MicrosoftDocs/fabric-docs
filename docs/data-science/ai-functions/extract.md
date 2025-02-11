---
title: Extract entities with the `ai.extract` function
description: Learn how to use the `ai.extract` function, which invokes Generative AI to scan input text and pull out specific types of information designated by labels you choose.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Extract entities with the `ai.extract` function

The `ai.extract` function uses Generative AI to scan input text and pull out specific types of information designated by labels you choose (such as locations or names)—all in just a single line of Python or PySpark code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.extract` with Python

[TBD]

## Use `ai.extract` with PySpark

[TBD]

### Syntax

```python
df.ai.extract(labels=["entity1", "entity2", "entity3"], with_raw="raw_json", input_col="text")
```

### Inputs

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | TBD |
| **`input_col`** <br> Required | TBD |
| **`with_raw`** <br> Optional | TBD |

### Returns

[TBD]

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("My name is MJ Lee. I live in a house on 1234 Roderick Lane in Plainville, CT, with two cats.",),
        ("Kris Turner's house at 1500 Smith Avenue is the biggest on the block!",)
    ], ["description"])

entities = df.ai.extract(labels=["name", "address"], input_col="description")
display(entities)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze_sentiment.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
