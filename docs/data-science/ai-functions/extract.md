---
title: Extract entities with the `ai.extract` function
description: Learn how to use the `ai.extract` function, which invokes Generative AI to scan input text and extract specific types of information designated by labels you choose.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Extract entities with the `ai.extract` function

The `ai.extract` function uses Generative AI to scan input text and extract specific types of information designated by labels you choose (such as locations or names)—all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Prerequisites

[Standard]

## Limitations

[Standard]

## Use `ai.extract` with pandas

[TBD]

### Syntax

```python
df_entities = df["text"].ai.extract("entity1", "entity2", "entity3")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | A [list](https://docs.python.org/3/library/stdtypes.html#lists) of [strings](https://docs.python.org/3/library/stdtypes.html#str) representing the set of entity types to be extracted from input text values |
| **`with_raw`** <br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) containing the name of an optional new column to store the raw extracted JSON in the returned DataFrame. |

### Returns

A [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dtypes.html) with a dedicated column for each specified entity type. The entity column or columns contain the entities extracted from the text values in each row of the input column. If more than one match for a given entity is identified, only one will be returned. If no match is found, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "My name is MJ Lee. I live in a house on 1234 Roderick Lane in Plainville, CT, with two cats.",
        "Kris Turner's house at 1500 Smith Avenue is the biggest on the block!"
    ], columns=["descriptions"])

df_entities = df["descriptions"].ai.extract("name", "address")
display(df_entities)
```

## Use `ai.extract` with PySpark

[TBD]

### Syntax

```python
df.ai.extract(labels=["entity1", "entity2", "entity3"], input_col="text")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | An [array](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.ArrayType.html) of [strings](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) representing the set of entity types to be extracted from text values in your input column |
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be scanned for your custom entities |
| **`with_raw`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an optional new column to store the raw extracted JSON. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column for each specified entity type. The new column or columns contain the entities extracted from the text values in each row of the input column. If more than one match for a given entity is identified, only one will be returned. If no match is found, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("My name is MJ Lee. I live in a house on 1234 Roderick Lane in Plainville, CT, with two cats.",),
        ("Kris Turner's house at 1500 Smith Avenue is the biggest on the block!",)
    ], ["descriptions"])

df_entities = df.ai.extract(labels=["name", "address"], input_col="descriptions")
display(df_entities)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
