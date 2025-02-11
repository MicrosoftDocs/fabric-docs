---
title: Calculate similarity with the `ai.similarity` function
description: Learn how to use the `ai.similarity` function, which invokes Generative AI to compare two string values and calculate a semantic similarity score.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Calculate similarity with the `ai.similarity` function

The `ai.similarity` function uses Generative AI to compare two string values and calculate a semantic similarity score—all in just a single line of Python or PySpark code. You can compare text values from one column of a DataFrame to pairwise values in another column or to a single text value. Similarity scores range from -1 (opposites) to 1 (identical), with 0 indicating that the values are completely unrelated in meaning.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.similarity` with Python

[TBD]

## Use `ai.similarity` with PySpark

[TBD]

### Syntax

```python
df.ai.similarity(input_col="col1", other_col="col2", output_col="similarity")
```

### Inputs

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Required | TBD |
| **`other_col`** <br> Optional | TBD |
| **`other`** <br> Optional | TBD |
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

- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze_sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
