---
title: Extract entities with the `ai.extract` function
description: Learn how to use the `ai.extract` function, which invokes Generative AI to scan input text and extract specific types of information designated by labels you choose.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Extract entities with the `ai.extract` function

The `ai.extract` function uses Generative AI to scan input text and extract specific types of information designated by labels you choose (such as locations or names)—all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

> [!NOTE]
> This feature is in [preview](../../get-started/preview.md) in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and above:
>
> - Please be sure to review the prerequisites in [this overview article](ai-function-overview.md), including the [library installations](ai-function-overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - Although the underlying model can handle several languages, most of the AI functions have been optimized for use on English texts.
> - To learn about customizing the configuration of AI functions in Fabric, please visit [this article](ai-function-configuration.md).

## Use `ai.extract` with pandas

The `ai.extract` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. You can call the function on a text column of a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) to extract user-provided entity types from each row of input.

Unlike the other AI functions, `ai.extract` returns a pandas DataFrame (rather than a Series) with a separate column for each specified entity type extracted per row of input text.

### Syntax

```python
df_entities = df["text"].ai.extract("entity1", "entity2", "entity3")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | One or more [strings](https://docs.python.org/3/library/stdtypes.html#str) representing the set of entity types to be extracted from input text values. |

### Returns

A [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) with a column for each specified entity type. These column(s) contain the entities extracted for each row of input text. If more than one match for a given entity is identified, only one will be returned. If no match is found, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "MJ Lee lives in Tuscon, AZ, and works as a software engineer for Microsoft.",
        "Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey."
    ], columns=["descriptions"])

df_entities = df["descriptions"].ai.extract("name", "profession", "city")
display(df_entities)
```

## Use `ai.extract` with PySpark

The `ai.extract` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). The name of an existing input column must be specified as a parameter, along with a list of entity types to extract from each row of text.

The function returns a new DataFrame with a separate output column for each specified entity type extracted per row of input text.

### Syntax

```python
df.ai.extract(labels=["entity1", "entity2", "entity3"], input_col="text")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | An [array](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.ArrayType.html) of [strings](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) representing the set of entity types to be extracted from text values in the input column. |
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be scanned for the custom entities. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store any OpenAI errors that result from processing each row of input text. If this parameter is not set, a default name will be generated for the error column. If there are no errors for a row of input, the value in this column will be `null`. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column for each specified entity type. These column(s) contain the entities extracted for each row of text in the input column. If more than one match for a given entity is identified, only one will be returned. If no match is found, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("MJ Lee lives in Tuscon, AZ, and works as a software engineer for Microsoft.",),
        ("Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey.",)
    ], ["descriptions"])

df_entities = df.ai.extract(labels=["name", "profession", "city"], input_col="descriptions")
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
