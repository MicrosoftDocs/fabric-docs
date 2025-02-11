---
title: Translate text with the `ai.translate` function
description: Learn how to use the `ai.translate` function, which invokes Generative AI to translate input text to a new language of your choosing.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Translate text with the `ai.translate` function

The `ai.translate` function uses Generative AI to translate input text to a new language of your choosing, all in just a single line of Python or PySpark code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.translate` with Python

[TBD]

## Use `ai.translate` with PySpark

[TBD]

### Syntax

```python
df.ai.translate(to_lang="spanish", input_col="text", output_col="translation")
```

### Inputs

| **Name** | **Description** |
|---|---|
| **`to_lang`** <br> Required | TBD |
| **`input_col`** <br> Optional | TBD |
| **`output_col`** <br> Optional | TBD |

### Returns

[TBD]

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Where is the bus?",),
        ("The bus is on the beach.",),
    ], ["input_text"])

translations = df.ai.translate(to_lang="spanish", input_col="input_text", output_col="translation")
display(translations)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
