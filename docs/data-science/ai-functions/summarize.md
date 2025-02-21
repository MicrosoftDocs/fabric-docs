---
title: Summarize text with the `ai.summarize` function
description: Learn how to use the `ai.summarize` function, which invokes Generative AI to provide summaries of input text (either values from a single column of a DataFrame or values across all its columns, row by row).
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Summarize text with the `ai.summarize` function

The `ai.summarize` function uses Generative AI to generate summaries of input text (either values from a single column of a DataFrame or values across all columns, row by row)—all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md) in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and above:
>
> - Please be sure to review the prerequisites in [this overview article](ai-function-overview.md), including the [library installations](ai-function-overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - Although the underlying model can handle several languages, most of the AI functions have been optimized for use on English texts.
> - To learn about customizing the configuration of AI functions, please visit [this article](ai-function-configuration.md).

## Use `ai.summarize` with pandas

The `ai.summarize` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. You can call the function on a text column of a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) to summarize each row of input from that column alone. As an alternative, the `ai.summarize` function can also be called on an entire DataFrame to summarize values across all columns, row by row.

The function returns a pandas Series containing summaries, which can be stored in a new column of the DataFrame.

### Syntax

# [Summarizing values from a single column](#tab/column-summary)

```python
df["summaries"] = df["text"].ai.summarize()
```

# [Summarizing values across all columns](#tab/dataframe-summary)

```python
df["summaries"] = df.ai.summarize()
```

---

### Parameters

None

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing summaries for each row of input text. If the input text is `null`, the result will be `null`.

### Example

# [Summarizing values from a single column](#tab/column-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df= pd.DataFrame([
        ("Microsoft Teams", "2017",
        """
        The ultimate messaging app for your organization—a workspace for real-time 
        collaboration and communication, meetings, file and app sharing, and even the 
        occasional emoji! All in one place, all in the open, all accessible to everyone.
        """),
        ("Microsoft Fabric", "2023",
        """
        An enterprise-ready, end-to-end analytics platform that unifies data movement, 
        data processing, ingestion, transformation, and report building into a seamless, 
        user-friendly SaaS experience. Transform raw data into actionable insights.
        """)
    ], columns=["product", "release_year", "description"])

df["summaries"] = df["description"].ai.summarize()
display(df)
```

# [Summarizing values across all columns](#tab/dataframe-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df= pd.DataFrame([
        ("Microsoft Teams", "2017",
        """
        The ultimate messaging app for your organization—a workspace for real-time 
        collaboration and communication, meetings, file and app sharing, and even the 
        occasional emoji! All in one place, all in the open, all accessible to everyone.
        """),
        ("Microsoft Fabric", "2023",
        """
        An enterprise-ready, end-to-end analytics platform that unifies data movement, 
        data processing, ingestion, transformation, and report building into a seamless, 
        user-friendly SaaS experience. Transform raw data into actionable insights.
        """)
    ], columns=["product", "release_year", "description"])

df["summaries"] = df.ai.summarize()
display(df)
```

---

## Use `ai.summarize` with PySpark

The `ai.summarize` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). If the name of an existing input column is specified as a parameter, the function summarizes each value from that column alone. Otherwise, the function summarizes text values across all columns of the DataFrame, row by row.

The function returns a new DataFrame with summaries for each row of input text (from a single column or across all columns) stored in an ouput column.

### Syntax

# [Summarizing values from a single column](#tab/column-summary)

```python
df.ai.summarize(input_col="text", output_col="summaries")
```

# [Summarizing values across all columns](#tab/dataframe-summary)

```python
df.ai.summarize(output_col="summaries")
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be summarized. If this parameter is not set, the function will summarize the entire DataFrame rather than a specific column. |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store summaries for each row of input text. If this parameter is not set, a default name will be generated for the output column. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store any OpenAI errors that result from processing each row of input text. If this parameter is not set, a default name will be generated for the error column. If there are no errors for a row of input, the value in this column will be `null`. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing summarized text for each row of text in the input column. If the input text is `null`, the result will be `null`. If no input column is specified, the function will summarize the entire DataFrame.

### Example

# [Summarizing values from a single column](#tab/column-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

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

# [Summarizing values across all columns](#tab/dataframe-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

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

---

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
