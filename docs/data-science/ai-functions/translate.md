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

The `ai.translate` function uses Generative AI to translate input text to a new language of your choosing, all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Use `ai.translate` with pandas

[TBD]

### Syntax

```python
df["translations"] = df["text"].ai.translate("target_language")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`to_lang`** <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) representing the target language for text translations |

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing translations for each row of input text. If the input text is `null`, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "Where is the bus?", 
        "The bus is on the beach."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
display(df)
```

## Use `ai.translate` with PySpark

[TBD]

### Syntax

```python
df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`to_lang`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) representing the target language for text translations |
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be translated |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store translations for each row of input text |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing translations for each row of original text in the input column. If the input text is `null`, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Where is the bus?",),
        ("The bus is on the beach.",),
    ], ["text"])

translations = df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
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
