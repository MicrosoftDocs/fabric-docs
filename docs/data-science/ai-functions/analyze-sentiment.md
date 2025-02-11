---
title: Detect sentiment with the `ai.analyze_sentiment` function
description: Learn how to use the `ai.analyze_sentiment` function, which invokes Generative AI to detect whether the emotional state expressed by input text is positive, negative, mixed, or neutral.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Detect sentiment with the `ai.analyze_sentiment` function

The `ai.analyze_sentiment` function uses Generative AI to detect whether the emotional state expressed by input text is positive, negative, mixed, or neutral—all in just a single line of Python or PySpark code. If the sentiment can’t be determined, the output is left blank.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.analyze_sentiment` with Python

[TBD]

## Use `ai.analyze_sentiment` with PySpark

[TBD]

### Syntax

```python
df.ai.analyze_sentiment(input_col="text", output_col="sentiment")
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
        ("This was the worst product ever. It went crazy and destroyed my beautiful kitchen counter. Shame!",),
        ("This cream was the best ever! It restored the pinkish hue to my cheeks and gave me a new outlook on life. Thank you!!",),
        ("I'm not sure about this blow-torch. On the one hand, I did complete my iron-sculpture, but on the other hand my hair caught on fire.",),
        ("It's OK I suppose.",)
    ], ["review"])

sentiment = df.ai.analyze_sentiment(input_col="review", output_col="sentiment")
display(sentiment)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
