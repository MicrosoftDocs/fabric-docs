---
title: Use ai.fix_grammar with PySpark
description: Learn how to correct the spelling, grammar, and punctuation of input text by using the ai.fix_grammar function with PySpark.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI functions
---

# Use ai.fix_grammar with PySpark


The `ai.fix_grammar` function uses generative AI to correct the spelling, grammar, and punctuation of input text, with a single line of code.

> [!NOTE]
> - This article covers using *ai.fix_grammar* with PySpark. To use *ai.fix_grammar* with pandas, see [this article](../pandas/fix-grammar.md).
> - See other AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

## Overview

The `ai.fix_grammar` function is available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter.

The function returns a new DataFrame that includes corrected text for each input text row, stored in an output column.

## Syntax

```python
df.ai.fix_grammar(input_col="input", output_col="corrections")
```

## Parameters

| Name | Description |
|---|---|
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to correct for spelling, grammar, and punctuation. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store corrected text for each row of input text. If you don't set this parameter, a default name generates for the output column. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each row of input text. If you don't set this parameter, a default name generates for the error column. If there are no errors for a row of input, the value in this column is `null`. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains corrected text for each row of text in the input column. If the input text is `null`, the result is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes.

df = spark.createDataFrame([
        ("There are an error here.",),
        ("She and me go weigh back. We used to hang out every weeks.",),
        ("The big picture are right, but you're details is all wrong.",)
    ], ["text"])

results = df.ai.fix_grammar(input_col="text", output_col="corrections")
display(results)
```

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/fix-grammar-example-output.png" alt-text="Screenshot showing a  data frame with a 'text' column and a 'corrections' column, which has the text from the text column with corrected grammar." lightbox="../../media/ai-functions/fix-grammar-example-output.png":::

## Multimodal input

The `ai.fix_grammar` function supports file-based multimodal input. You can fix grammar in the content of PDFs and text files by setting `input_col_type="path"`. For more information about supported file types and setup, see [Use multimodal input with AI functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

results = custom_df.ai.fix_grammar(
    input_col="file_path",
    input_col_type="path",
    output_col="corrections",
)
display(results)
```

## Related content

- Use [ai.fix_grammar with pandas](../pandas/fix-grammar.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Generate vector embeddings with [ai.embed](./embed.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Use [multimodal input with AI functions](../multimodal-overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
