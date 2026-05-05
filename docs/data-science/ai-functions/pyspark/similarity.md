---
title: Use ai.similarity with PySpark
description: Learn how to compare string values and calculate semantic similarity scores by using the ai.similarity function with PySpark.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI functions
---

# Use ai.similarity with PySpark


The `ai.similarity` function uses generative AI to compare two string expressions and then calculate a semantic similarity score. It uses only a single line of code. You can compare text values from one column of a DataFrame with a single common text value or with pairwise text values in another column.

> [!NOTE]
> - This article covers using *ai.similarity* with PySpark. To use *ai.similarity* with pandas, see [this article](../pandas/similarity.md).
> - See other AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

## Overview

The `ai.similarity` function is available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter. You must also specify a single common text value for comparisons, or the name of another column for pairwise comparisons.

The function returns a new DataFrame that includes similarity scores for each row of input text that's in an output column.

## Syntax

# [Compare with a single value](#tab/similarity-single)

```python
df.ai.similarity(input_col="col1", other="value", output_col="similarity")
```

# [Compare with pairwise values](#tab/similarity-pairwise)

```python
df.ai.similarity(input_col="col1", other_col="col2", output_col="similarity")
```

---

## Parameters

| Name | Description |
|---|---|
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to use for computing similarity scores. |
| `other` or `other_col` <br> Required | Only one of these parameters is required. The `other` parameter is a [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains a single common text value used to compute similarity scores for each row of input. The `other_col` parameter is a [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that designates the name of a second existing column, with text values used to compute pairwise similarity scores. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store calculated similarity scores for each input text row. If you don't set this parameter, a default name generates for the output column. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column that stores any OpenAI errors that result from processing each input text row. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, this column has a `null` value. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains generated similarity scores for each input text row. The output similarity scores are relative, and they're best used for ranking. Score values can range from `-1*` (opposites) to `1` (identical). A score of `0` indicates that the values are unrelated in meaning.

## Example

# [Compare with a single value](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("Bill Gates",), 
        ("Sayta Nadella",), 
        ("Joan of Arc",) 
    ], ["names"])

similarity = df.ai.similarity(input_col="names", other="Microsoft", output_col="similarity")
display(similarity)
```

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/similarity-single-example-output.png" alt-text="Screenshot of a data frame with columns 'name' and 'similarity'. The 'similarity' column contains similarity scores for the names and input word." lightbox="../../media/ai-functions/similarity-single-example-output.png":::

# [Compare with pairwise values](#tab/similarity-pairwise)

```python
# This code uses AI. Always review output for mistakes.

df = spark.createDataFrame([
        ("Bill Gates", "Technology"), 
        ("Satya Nadella", "Healthcare"), 
        ("Joan of Arc", "Agriculture")
    ], ["names", "industries"])

similarity = df.ai.similarity(input_col="names", other_col="industries", output_col="similarity")
display(similarity)
```

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/similarity-pairwise-example-output.png" alt-text="Screenshot of a data frame with columns 'names', 'industries', and 'similarity'. The 'similarity' column has similarity scores for name and industry." lightbox="../../media/ai-functions/similarity-pairwise-example-output.png":::

---

## Related content

- Use [ai.similarity with pandas](../pandas/similarity.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Generate vector embeddings with [ai.embed](./embed.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md)
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
