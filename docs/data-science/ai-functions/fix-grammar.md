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

The `ai.fix_grammar` function uses Generative AI to correct the spelling, grammar, and punctuation of input text—all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.fix_grammar` with pandas

[TBD]

### Syntax

```python
df["corrections"] = df["text"].ai.fix_grammar()
```

### Parameters

None

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing corrected text for each row of input text. If the input text is `null`, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "oh yeah, she and me go weigh back!",
        "You SUre took you'RE sweetthyme!",
        "teh time has come at last."
    ], columns=["text"])

df["corrections"] = df["text"].ai.fix_grammar()
display(df)
```

## Use `ai.fix_grammar` with PySpark

[TBD]

### Syntax

```python
df.ai.fix_grammar(input_col="text", output_col="corrections")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be corrected for spelling, grammar, and punctuation |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store corrected text for each row of input text |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing corrected text for each row of the input column. If the input text is `null`, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("oh yeah, she and me go weigh back!",),
        ("You SUre took you'RE sweetthyme!",),
        ("teh time has come at last.",)
    ], ["text"])

results = df.ai.fix_grammar(input_col="text", output_col="corrections")
display(results)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
