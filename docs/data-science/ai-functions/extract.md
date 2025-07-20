---
title: Extract entities with the `ai.extract` function
description: Learn how to use the `ai.extract` function to scan input text and extract information.
ms.author: scottpolly
author: s-polly
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Extract entities with the `ai.extract` function

The `ai.extract` function uses Generative AI to scan input text and extract specific types of information designated by labels you choose—for example, locations or names—all with a single line of code.

AI functions turbocharge data engineering by putting the power of Fabric's built-in large languages models into your hands. To learn more, visit [this overview article](./overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and higher.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - By default, AI functions are currently powered by the **gpt-3.5-turbo (0125)** model. To learn more about billing and consumption rates, visit [this article](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with Fabric's built-in AI endpoint.

## Use `ai.extract` with pandas

The `ai.extract` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. Call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column to extract custom entity types from each row of input.

Unlike other AI functions, `ai.extract` returns a pandas DataFrame, instead of a Series, with a separate column for each specified entity type that contains extracted values for each input row.

### Syntax

```python
df_entities = df["text"].ai.extract("entity1", "entity2", "entity3")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | One or more [strings](https://docs.python.org/3/library/stdtypes.html#str) representing the set of entity types to be extracted from the input text values. |

### Returns

The function returns a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) with a column for each specified entity type. The column or columns contain the entities extracted for each row of input text. If the function identifies more than one match for a given entity, it returns only one of those matches. If no match is found, the result is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "MJ Lee lives in Tuscon, AZ, and works as a software engineer for Microsoft.",
        "Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey."
    ], columns=["descriptions"])

df_entities = df["descriptions"].ai.extract("name", "profession", "city")
display(df_entities)
```

## Use `ai.extract` with PySpark

The `ai.extract` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). The name of an existing input column must be specified as a parameter, along with a list of entity types to extract from each row of text.

The function returns a new DataFrame, with a separate column for each specified entity type that contains extracted values for each input row.

### Syntax

```python
df.ai.extract(labels=["entity1", "entity2", "entity3"], input_col="text")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`labels`** <br> Required | An [array](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.ArrayType.html) of [strings](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that represents the set of entity types to be extracted from the text values in the input column. |
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to be scanned for the custom entities. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each input text row. If this parameter isn't set, a default name is generated for the error column. If an input row has no errors, the value in this column is `null`. |

### Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column for each specified entity type. The column or columns contain the entities extracted for each row of input text. If the function identifies more than one match for a given entity, it returns only one of those matches. If no match is found, the result is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("MJ Lee lives in Tuscon, AZ, and works as a software engineer for Microsoft.",),
        ("Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey.",)
    ], ["descriptions"])

df_entities = df.ai.extract(labels=["name", "profession", "city"], input_col="descriptions")
display(df_entities)
```

## Related content

- Calculate similarity with [`ai.similarity`](./similarity.md).
- Categorize text with [`ai.classify`](./classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Learn more about the full set of AI functions [here](./overview.md).
- Learn how to customize the configuration of AI functions [here](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
