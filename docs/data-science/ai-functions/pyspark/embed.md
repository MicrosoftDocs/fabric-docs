---
title: Use ai.embed with PySpark
description: Learn how to convert text into numeric vectors that capture its meaning and context by using the ai.embed function with PySpark.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.embed with PySpark

The `ai.embed` function converts text into vector embeddings that represent meaning. Use embeddings to search, group, and compare content by meaning instead of exact wording.

> [!NOTE]
> - This article covers `ai.embed` with PySpark. For pandas, see [Use ai.embed with pandas](../pandas/embed.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with PySpark](./configuration.md).

## Overview

The `ai.embed` function is available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter.

The function returns a new DataFrame that includes embeddings for each row of input text, in an output column.

## Syntax

```python
df.ai.embed(input_col="col1", output_col="embed")
```

## Parameters

| Name | Description |
|---|---|
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to use for computing embeddings. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store calculated embeddings for each input text row. If you don't set this parameter, a default name generates for the output column. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column that stores any OpenAI errors that result from processing each input text row. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, this column has a `null` value. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column that contains generated embeddings for each input row. Embeddings are [`pyspark.ml.linalg.DenseVector`](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.ml.linalg.DenseVector.html#densevector) values. Vector size depends on the embedding model dimensions, which are [configurable in AI Functions](./configuration.md).

## Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",), 
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",), 
        ("Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!",) 
    ], ["descriptions"])

embed = df.ai.embed(input_col="descriptions", output_col="embed")
display(embed)
```

Output:

:::image type="content" source="../../media/ai-functions/embed-example-output.png" alt-text="Screenshot of a data frame with columns 'descriptions' and 'embed'. The 'embed' column contains embeddings for the descriptions." lightbox="../../media/ai-functions/embed-example-output.png":::

## Related content

- Use [ai.embed with pandas](../pandas/embed.md).
- Learn more about [AI Functions](../overview.md).
- Change default configuration for [AI Functions with PySpark](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
