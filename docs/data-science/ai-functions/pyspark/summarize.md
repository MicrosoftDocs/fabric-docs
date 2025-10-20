---
title: Use ai.summarize with PySpark
description: Learn how to to produce summaries of input text by using the ai.summarize function with PySpark.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.summarize with PySpark


The `ai.summarize` function uses generative AI to produce summaries of input text, with a single line of code. The function can either summarize values from one column of a DataFrame or values across all the columns.

> [!NOTE]
> - This article covers using *ai.summarize* with PySpark. To use *ai.summarize* with pandas, see [this article](../pandas/summarize.md).
> - See additional AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

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
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store summaries for each input text row. If you don't set this parameter, a default name generates for the output column. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each input text row. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, the value in this column is `null`. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains summarized text for each input text row. If the input text is `null`, the result is `null`. If no input column is specified, the function summarizes values across all columns in the DataFrame.

## Example

# [Summarize values from a single column](#tab/column-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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

# [Summarize values across all columns](#tab/dataframe-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/.

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

The example code cell with a single value provides the following output:
:::image type="content" source="../../media/ai-functions/summarize-single-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the 'description' column only, in the corresponding row." lightbox="../../media/ai-functions/summarize-single-example-output.png":::

The example code cell with pairwise values provides the following output:
:::image type="content" source="../../media/ai-functions/summarize-all-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the information across all the columns in the corresponding row." lightbox="../../media/ai-functions/summarize-all-example-output.png":::


## Related content

- Use [ai.summarize with pandas](../pandas/summarize.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Categorize text with [ai.classify](./classify.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Translate text with [ai.translate](./translate.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Learn more about the [full set of AI functions](./overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
