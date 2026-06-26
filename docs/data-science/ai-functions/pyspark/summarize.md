---
title: Use ai.summarize with PySpark
description: Learn how to produce summaries of input text by using the ai.summarize function with PySpark.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 05/12/2026
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.summarize with PySpark

The `ai.summarize` function summarizes text from one column or across all columns in each row.

> [!NOTE]
> - This article covers `ai.summarize` with PySpark. For pandas, see [Use ai.summarize with pandas](../pandas/summarize.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with PySpark](./configuration.md).

## Overview

The `ai.summarize` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). If you specify the name of an existing input column as a parameter, the function summarizes each value from that column alone. Otherwise, the function summarizes values across all columns of the DataFrame, row by row.

The function returns a new DataFrame with summaries for each input text row, from a single column or across all the columns, stored in an output column.

## Syntax

# [Summarize values from a single column](#tab/column-summary)

```python
df.ai.summarize(input_col="text", output_col="summaries")
```

# [Summarize values across all columns](#tab/dataframe-summary)

```python
df.ai.summarize(output_col="summaries")
```

---

## Parameters

| Name | Description |
|---|---|
| `input_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to summarize. If you don't set this parameter, the function summarizes values across all columns in the DataFrame, instead of values from a specific column. |
| `instructions` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that provides more context for the AI model, such as output length, tone, audience, or focus. More precise instructions produce better results. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each input text row. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, the value in this column is `null`. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store summaries for each input text row. If you don't set this parameter, a default name generates for the output column. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains summarized text for each input text row. If the input text is `null`, the result is `null`. If no input column is specified, the function summarizes values across all columns in the DataFrame.

## Example

# [Summarize values from a single column](#tab/column-summary)

```python
# This code uses AI. Always review output for mistakes.

df = spark.createDataFrame([
        ("Microsoft Teams", "2017",
        """
        The ultimate messaging app for your organization—a workspace for real-time 
        collaboration and communication, meetings, file and app sharing, and even the 
        occasional emoji! All in one place, all in the open, all accessible to everyone.
        """,),
        ("Microsoft Fabric", "2023",
        """
        An enterprise-ready, end-to-end analytics platform that unifies data movement, 
        data processing, ingestion, transformation, and report building into a seamless, 
        user-friendly SaaS experience. Transform raw data into actionable insights.
        """,)
    ], ["product", "release_year", "description"])

summaries = df.ai.summarize(input_col="description", output_col="summaries")
display(summaries)
```

Output:

:::image type="content" source="../../media/ai-functions/summarize-single-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the 'description' column only, in the corresponding row." lightbox="../../media/ai-functions/summarize-single-example-output.png":::

# [Summarize values across all columns](#tab/dataframe-summary)

```python
# This code uses AI. Always review output for mistakes.

df = spark.createDataFrame([
        ("Microsoft Teams", "2017",
        """
        The ultimate messaging app for your organization—a workspace for real-time 
        collaboration and communication, meetings, file and app sharing, and even the 
        occasional emoji! All in one place, all in the open, all accessible to everyone.
        """,),
        ("Microsoft Fabric", "2023",
        """
        An enterprise-ready, end-to-end analytics platform that unifies data movement, 
        data processing, ingestion, transformation, and report building into a seamless, 
        user-friendly SaaS experience. Transform raw data into actionable insights.
        """,)
    ], ["product", "release_year", "description"])

summaries = df.ai.summarize(output_col="summaries")
display(summaries)
```

Output:

:::image type="content" source="../../media/ai-functions/summarize-all-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the information across all the columns in the corresponding row." lightbox="../../media/ai-functions/summarize-all-example-output.png":::

---

## Customize summaries with instructions

Use the `instructions` parameter to control the tone, length, audience, or focus of generated summaries without changing the source text.

# [Summarize for an executive audience](#tab/pyspark-instructions-column)

```python
# This code uses AI. Always review output for mistakes.

summaries = df.ai.summarize(
    input_col="description",
    output_col="executive_summary",
    instructions="Write one concise sentence for a business executive. Focus on product value and avoid marketing language.",
)
display(summaries)
```

# [Summarize across all columns](#tab/pyspark-instructions-dataframe)

```python
# This code uses AI. Always review output for mistakes.

summaries = df.ai.summarize(
    output_col="release_note",
    instructions="Write one sentence that includes the product name, release year, and main customer benefit.",
)
display(summaries)
```

---

## Multimodal input

To summarize images, PDFs, or text files, set `input_col_type="path"` for single-column mode, or `col_types` for DataFrame-level mode. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

# Summarize file content from a single column
results = custom_df.ai.summarize(
    instructions="Summarize this file in one sentence for a support analyst.",
    input_col="file_path",
    input_col_type="path",
    output_col="summary",
)
display(results)
```

You can also summarize values across all columns in a DataFrame by omitting the input column and using `col_types`:

```python
# This code uses AI. Always review output for mistakes.

results = custom_df.ai.summarize(
    col_types={"file_path": "path"},
    output_col="summary",
)
display(results)
```

## Related content

- Use [ai.summarize with pandas](../pandas/summarize.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with PySpark](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
