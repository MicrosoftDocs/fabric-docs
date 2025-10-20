---
title: Use ai.extract with PySpark
description: Learn how to scan input text and extract information by using the ai.extract function with PySpark.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.extract with PySpark


The `ai.extract` function uses generative AI to scan input text and extract specific types of information designated by labels you choose (for example, locations or names). It uses only a single line of code.

> [!NOTE]
> - This article covers using *ai.extract* with PySpark. To use *ai.extract* with pandas, see [this article](../pandas/extract.md).
> - See additional AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

## Overview
The `ai.extract` function is available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter, along with a list of entity types to extract from each row of text.

The function returns a new DataFrame, with a separate column for each specified entity type that contains extracted values for each input row.

## Syntax

```python
df.ai.extract(labels=["entity1", "entity2", "entity3"], input_col="input")
```

## Parameters

| Name | Description |
|---|---|
| `labels` <br> Required | An [array](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.ArrayType.html) of [strings](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that represents the set of entity types to extract from the text values in the input column. |
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to scan for the custom entities. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each input text row. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, the value in this column is `null`. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column for each specified entity type. The column or columns contain the entities extracted for each row of input text. If the function identifies more than one match for an entity, it returns only one of those matches. If no match is found, the result is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("MJ Lee lives in Tuscon, AZ, and works as a software engineer for Microsoft.",),
        ("Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey.",)
    ], ["descriptions"])

df_entities = df.ai.extract(labels=["name", "profession", "city"], input_col="descriptions")
display(df_entities)
```

This example code cell provides the following output:
:::image type="content" source="../../media/ai-functions/extract-example-output.png" alt-text="Screenshot showing a new data frame with a 'name' column, a 'profession' column,  and a 'city' column. Each column contains the corresponding data extracted from the original data frame." lightbox="../../media/ai-functions/extract-example-output.png":::


## Related content
- Use [ai.extract with pandas](../pandas/extract.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
