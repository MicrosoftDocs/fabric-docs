---
title: Use ai.translate with PySpark
description: Learn how to use the ai.translate function to translate input text into a new language of your choice with PySpark.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.translate with PySpark


The `ai.translate` function uses generative AI to translate input text into a new language (of your choice), with a single line of code.

> [!NOTE]
> - This article covers using *ai.translate* with PySpark. To use *ai.translate* with pandas, see [this article](../pandas/translate.md).
> - See additional AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("Hello! How are you doing today?",),
        ("Tell me what you'd like to know, and I'll do my best to help.",),
        ("The only thing we have to fear is fear itself.",),
    ], ["text"])

translations = df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
display(translations)
```

This example code cell provides the following output:
:::image type="content" source="../../media/ai-functions/translate-example-output.png" alt-text="Screenshot showing a data frame with a 'text' column and a 'translations' column. The 'translations' column contains the English text in the 'text' column, translated in Spanish." lightbox="../../media/ai-functions/translate-example-output.png":::


## Related content

- Use [ai.translate with pandas](../pandas/translate.md).
- Categorize text with [ai.classify](./classify.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Summarize text with [ai.summarize](./summarize.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Learn more about the [full set of AI functions](./overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
