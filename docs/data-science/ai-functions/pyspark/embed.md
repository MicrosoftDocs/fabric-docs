---
title: Use ai.embed with PySpark
description: Learn how to convert text into numeric vectors that capture its meaning and context by using the ai.embed function with PySpark.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI functions
---

# Use ai.embed with PySpark

The `ai.embed` function uses generative AI to convert text into vector embeddings. These vectors let AI understand relationships between texts, so you can search, group, and compare content based on meaning rather than exact wording. With a single line of code, you can generate vector embeddings from a column in a DataFrame.

> [!NOTE]
> - This article covers using *ai.embed* with PySpark. To use *ai.embed* with pandas, see [this article](../pandas/embed.md).
> - See other AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

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

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains generated embeddings for each input text row.
Embeddings are of the type [pyspark.ml.linalg.DenseVector])https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.ml.linalg.DenseVector.html#densevector).
The number of elements in the DenseVector depends on the embedding model's dimensions, which are [configurable in AI functions](./configuration.md)

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

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/embed-example-output.png" alt-text="Screenshot of a data frame with columns 'descriptions' and 'embed'. The 'embed' column contains embeddings for the descriptions." lightbox="../../media/ai-functions/embed-example-output.png":::

## Related content

- Use [ai.embed with pandas](../pandas/embed.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
