---
title: Use ai.classify with PySpark
description: Learn how to categorize input text according to custom labels by using the ai.classify function with PySpark.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.classify with PySpark

The `ai.classify` function categorizes each input row by using the labels you provide.

> [!NOTE]
> - This article covers `ai.classify` with PySpark. For pandas, see [Use ai.classify with pandas](../pandas/classify.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with PySpark](./configuration.md).

## Overview

The `ai.classify` function is available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter, along with a list of classification labels.

The function returns a new DataFrame with labels that match each row of input text, stored in an output column.

## Syntax

```python
df.ai.classify(labels=["category1", "category2", "category3"], input_col="text", output_col="classification")
```

## Parameters

| Name | Description |
|---|---|
| `labels` <br> Required | An [array](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.ArrayType.html) of [strings](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that represents the set of classification labels to match to text values in the input column. |
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to classify according to the custom labels. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column where you want to store a classification label for each input text row. If you don't set this parameter, a default name is generated for the output column. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column. The new column stores any OpenAI errors that result from processing each row of input text. If you don't set this parameter, a default name is generated for the error column. If there are no errors for a row of input, the value in this column is `null`. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains classification labels that match each input text row. If a text value can't be classified, the corresponding label is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",),
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",),
        ("Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!",)
    ], ["descriptions"])
    
categories = df.ai.classify(labels=["kitchen", "bedroom", "garage", "other"], input_col="descriptions", output_col="categories")
display(categories)
```

Output:

:::image type="content" source="../../media/ai-functions/classify-example-output.png" alt-text="Screenshot of a data frame with 'descriptions' and 'category' columns. The 'category' column lists each description’s category name." lightbox="../../media/ai-functions/classify-example-output.png":::

## Multimodal input

To classify images, PDFs, or text files, set `input_col_type="path"`. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

results = custom_df.ai.classify(
    labels=["Master", "PhD", "Bachelor", "Other"],
    input_col="file_path",
    input_col_type="path",
    output_col="highest_degree",
)
display(results)
```

## Related content

- Use [ai.classify with pandas](../pandas/classify.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with PySpark](./configuration.md).
- Understand [billing for AI Functions](../billing.md).