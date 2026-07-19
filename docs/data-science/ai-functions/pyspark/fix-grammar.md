---
title: Use ai.fix_grammar with PySpark
description: Learn how to correct the spelling, grammar, and punctuation of input text by using the ai.fix_grammar function with PySpark.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.fix_grammar with PySpark

The `ai.fix_grammar` function corrects spelling, grammar, and punctuation in each input row.

> [!NOTE]
> - This article covers `ai.fix_grammar` with PySpark. For pandas, see [Use ai.fix_grammar with pandas](../pandas/fix-grammar.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with PySpark](./configuration.md).

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

Output:

:::image type="content" source="../../media/ai-functions/fix-grammar-example-output.png" alt-text="Screenshot showing a  data frame with a 'text' column and a 'corrections' column, which has the text from the text column with corrected grammar." lightbox="../../media/ai-functions/fix-grammar-example-output.png":::

## Multimodal input

To fix grammar in PDFs or text files, set `input_col_type="path"`. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

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
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with PySpark](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
