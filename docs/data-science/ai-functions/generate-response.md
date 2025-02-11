---
title: Answer custom user prompts with the `ai.generate_response` function
description: Learn how to use the `ai.generate_response` function, which invokes Generative AI to generate custom text responses based on your own instructions.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Answer custom user prompts with the `ai.generate_response` function

The `ai.generate_response` function uses Generative AI to generate custom text responses based on your own instructions—all in just a single line of Python or PySpark code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.generate_response` with Python

[TBD]

## Use `ai.generate_response` with PySpark

[TBD]

### Syntax

```python
df.ai.generate_response(prompt="instructions", output_col="response")
```

### Inputs

| **Name** | **Description** |
|---|---|
| **`prompt`** <br> Required | TBD |
| **`is_prompt_template`** <br> Optional | TBD |
| **`output_col`** <br> Optional | TBD |

### Returns

[TBD]

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("apple", "fruits"),
        ("blue", "colors"),
        ("lizard", "reptile"),
    ], ["example", "category"])

results = df.ai.gen(template="Complete this comma separated list of 5 {category}: {example}, ", output_col="list")
display(results)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze_sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
