---
title: Summarize text with the `ai.summarize` function
description: Learn how to use the `ai.summarize` function to produce summaries of input text (either values from a single column of a DataFrame or values across all the columns).
ms.author: jburchel
author: jonburchel
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025
ms.search.form: AI functions
---

# Summarize text with the `ai.summarize` function

The `ai.summarize` function uses Generative AI to product summaries of input text—either values from one column of a DataFrame or values across all the columns—with a single line of code.

AI functions turbocharge data engineering by putting the power of Fabric's built-in large languages models into your hands. To learn more, visit [this overview article](./overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and higher.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - By default, AI functions are currently powered by the **gpt-4o-mini** model. To learn more about billing and consumption rates, visit [this article](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with Fabric's built-in AI endpoint.

## Use `ai.summarize` with pandas

The `ai.summarize` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. Call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column to summarize each row value from that column alone. Alternatively, you can call the `ai.summarize` function on an entire DataFrame, to summarize values across all the columns.

The function returns a pandas Series that contains summaries, which can be stored in a new DataFrame column.

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

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains summaries for each input text row. If the input text is `null`, the result is `null`.

### Example

# [Summarizing values from a single column](#tab/column-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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

The `ai.summarize` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). If you specify the name of an existing input column as a parameter, the function summarizes each value from that column alone. Otherwise, the function summarizes values across all columns of the DataFrame, row by row.

The function returns a new DataFrame with summaries for each input text row, from a single column or across all the columns, stored in an output column.

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
| **`input_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to summarize. If this parameter isn't set, the function summarizes values across all columns in the DataFrame, instead of values from a specific column. |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store summaries for each input text row. If this parameter isn't set, a default name is generated for the output column. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each input text row. If this parameter isn't set, a default name is generated for the error column. If an input row has no errors, the value in this column is `null`. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column that contains summarized text for each input text row. If the input text is `null`, the result is `null`. If no input column is specified, the function summarizes values across all columns in the DataFrame.

### Example

# [Summarizing values from a single column](#tab/column-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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

- Calculate similarity with [`ai.similarity`](./similarity.md).
- Categorize text with [`ai.classify`](./classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Translate text with [`ai.translate`](./translate.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- To learn more about the full set of AI functions, visit [this overview article](./overview.md).
- Learn how to customize the configuration of AI functions [here](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
