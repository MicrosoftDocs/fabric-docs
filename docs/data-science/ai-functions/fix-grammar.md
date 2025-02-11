---
title: Fix grammar with the `ai.fix_grammar` function
description: Learn how to use the `ai.fix_grammar` function, which invokes Generative AI to correct the spelling, grammar, and punctuation of input text.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Fix grammar with the `ai.fix_grammar` function

The `ai.fix_grammar` function uses Generative AI to correct the spelling, grammar, and punctuation of input text—all in just a single line of Python or PySpark code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.fix_grammar` with Python

[TBD]

## Use `ai.fix_grammar` with PySpark

[TBD]

### Syntax

```python
df.ai.fix_grammar(input_col="text", output_col="correction")
```

### Inputs

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Required | TBD |
| **`output_col`** <br> Optional | TBD |

### Returns

[TBD]

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("oh yeah, she and me go weigh back!",),
        ("You SUre took you'RE sweetthyme!",),
        ("teh time has come at last.",)
    ], ["raw_text"])

results = df.ai.fix_grammar(input_col="raw_text", output_col="corrected")
display(results)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze_sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
