---
title: Summarize text with the `ai.summarize` function
description: Learn how to use the `ai.summarize` function, which invokes Generative AI to generate summaries of input text (either values in a single column of a DataFrame or rows in the entire DataFrame).
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Summarize text with the `ai.summarize` function

The `ai.summarize` function uses Generative AI to generate summaries of input text (either values in a single column of a DataFrame or rows in the entire DataFrame)—all in just a single line of Python or PySpark code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.summarize` with Python

[TBD]

## Use `ai.summarize` with PySpark

[TBD]

### Syntax

```python
df.ai.summarize(input_col="text", output_col="summary")
```

### Inputs

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Optional | TBD |
| **`output_col`** <br> Optional | TBD |

### Returns

[TBD]

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("""
        Well, that goat was a mighty fine old goat, I did always say. I never had to
        mow the lawn once as a boy, and let me tell you, did I appreciate it! Now
        that goat -- a billy-goat, did I mention? -- anyway, his name was Goaty. No,
        no, I know what you're thinking, not goatee like the facial hair-style --
        though he did awful look like he had one. Literally "Goat-ee." Emphasis on
        the goat, don't you know. Anyway, we used to keep him in a little pen, where
        he would bleat his little goat heart out, as he happily munched on grass.
        """,),
        ("""
        Pursuant to subsection 2, paragraph 7, we find that the alleged business
        expense was undertaken under questionable judgment. The employee in question 
        was found to have purchased five lots of moisturizer due to a misunderstanding 
        about the humidity in Cleveland, Ohio, and through a series of poor decisions,
        he made the purchase. Compounding this error was his misapprehension that
        the cream was infused with diamond dust to give it an extra sparkle, thereby
        justifying, at least in his mind, its exorbitant cost. The board recommends
        immediate disciplinary action.
        """,)
    ], ["input"])

summaries = df.ai.summarize(input_col="input", output_col="summary")
display(summaries)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze_sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
