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

The `ai.classify` function uses Generative AI to categorize input text according to custom labels you choose—all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.classify` with pandas

[TBD]

### Syntax

```python
df["categories"] = df["text"].ai.classify("category1", "category2", "category3")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | A [list](https://docs.python.org/3/library/stdtypes.html#lists) of [strings](https://docs.python.org/3/library/stdtypes.html#str) representing the set of classification labels to be matched to input text values |

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing classification labels for each row of input text. If a text value cannot be classified, the corresponding label will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "This duvet, lovingly hand-crafted from all-natural polyester, is perfect for a good night's sleep.",
        "Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",
        "Enjoy this *BREAND NEW CAR!* A compact SUV perfect for the light commuter!"
    ], columns=["descriptions"])

df["categories"] = df['descriptions'].ai.classify("kitchen", "bedroom", "garage", "other")
display(df)
```

## Use `ai.classify` with PySpark

[TBD]

### Syntax

```python
df.ai.classify(labels=["category1", "category2", "category3"], input_col="text", output_col="categories")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | An [array](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.ArrayType.html) of [strings](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) representing the set of classification labels to be matched to text values in your input column |
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be classified according to your custom labels |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store classification label for each row of input text |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing classification labels that match the text values from each row of the input column. If a text value cannot be classified, the corresponding label will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural polyester, is perfect for a good night's sleep.",),
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",),
        ("Enjoy this *BREAND NEW CAR!* A compact SUV perfect for the light commuter!",)
    ], ["description"])
    
categories = df.ai.classify(labels=["kitchen", "bedroom", "garage", "other"], input_col="description", output_col="categories")
display(categories)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
