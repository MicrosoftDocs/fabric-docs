---
title: Use ai.translate with PySpark
description: Learn how to use the ai.translate function to translate input text into a new language of your choice with PySpark.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.translate with PySpark

The `ai.translate` function translates each input row into the target language you choose.

> [!NOTE]
> - This article covers `ai.translate` with PySpark. For pandas, see [Use ai.translate with pandas](../pandas/translate.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with PySpark](./configuration.md).

## Overview

The `ai.translate` function is available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify an existing input column name as a parameter, along with a target language.

The function returns a new DataFrame with translations for each input text row, stored in an output column.

## Syntax

```python
df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
```

## Parameters

| Name | Description |
|---|---|
| `to_lang` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that represents the target language for text translations. |
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to translate. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column that stores translations for each input text row. If you don't set this parameter, a default name generates for the output column. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column that stores any OpenAI errors that result from processing each input text row. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, the value in this column is `null`. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains translations for the text in the input column row. If the input text is `null`, the result is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes.

df = spark.createDataFrame([
        ("Hello! How are you doing today?",),
        ("Tell me what you'd like to know, and I'll do my best to help.",),
        ("The only thing we have to fear is fear itself.",),
    ], ["text"])

translations = df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
display(translations)
```

Output:

:::image type="content" source="../../media/ai-functions/translate-example-output.png" alt-text="Screenshot of a data frame with columns 'text' and 'translations'. The 'translations' column contains the text translated to Spanish." lightbox="../../media/ai-functions/translate-example-output.png":::

## Multimodal input

To translate images, PDFs, or text files, set `input_col_type="path"`. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

results = custom_df.ai.translate(
    to_lang="Chinese",
    input_col="file_path",
    input_col_type="path",
    output_col="chinese_version",
)
display(results)
```

## Related content

- Use [ai.translate with pandas](../pandas/translate.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with PySpark](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
