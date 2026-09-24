---
title: Use ai.summarize with pandas
description: Learn how to produce summaries of input text by using the ai.summarize function with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 05/12/2026
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.summarize with pandas

The `ai.summarize` function summarizes text from one column or across all columns in each row.

> [!NOTE]
> - This article covers `ai.summarize` with pandas. For PySpark, see [Use ai.summarize with PySpark](../pyspark/summarize.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.summarize` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To summarize each row value from that column alone, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column. You can also call the `ai.summarize` function on an entire DataFrame to summarize values across all the columns.

The function returns a pandas Series that contains summaries, which can be stored in a new DataFrame column.

## Syntax

# [Summarize values from a single column](#tab/column-summary)

```python
df["summaries"] = df["text"].ai.summarize()
```

# [Summarize values across all columns](#tab/dataframe-summary)

```python
df["summaries"] = df.ai.summarize()
```

---

## Parameters

| Name | Description |
|---|---|
| `instructions` <br> Optional | A string that provides more context for the AI model, such as output length, tone, audience, or focus. More precise instructions produce better results. |

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains summaries for each input text row. If the input text is `null`, the result is `null`.

## Example

# [Summarize values from a single column](#tab/column-summary)

```python
# This code uses AI. Always review output for mistakes.

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

Output:

:::image type="content" source="../../media/ai-functions/summarize-single-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the 'description' column only, in the corresponding row." lightbox="../../media/ai-functions/summarize-single-example-output.png":::

# [Summarize values across all columns](#tab/dataframe-summary)

```python
# This code uses AI. Always review output for mistakes.

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

Output:

:::image type="content" source="../../media/ai-functions/summarize-all-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the information across all the columns in the corresponding row." lightbox="../../media/ai-functions/summarize-all-example-output.png":::

---

## Customize summaries with instructions

Use the `instructions` parameter to control the tone, length, audience, or focus of generated summaries without changing the source text.

# [Summarize for an executive audience](#tab/pandas-instructions-column)

```python
# This code uses AI. Always review output for mistakes.

df["executive_summary"] = df["description"].ai.summarize(
    instructions="Write one concise sentence for a business executive. Focus on product value and avoid marketing language."
)
display(df)
```

# [Summarize across all columns](#tab/pandas-instructions-dataframe)

```python
# This code uses AI. Always review output for mistakes.

df["release_note"] = df.ai.summarize(
    instructions="Write one sentence that includes the product name, release year, and main customer benefit."
)
display(df)
```

---

## Multimodal input

To summarize images, PDFs, or text files, set `column_type="path"` when the input column contains file path strings. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

custom_df["summary"] = custom_df["file_path"].ai.summarize(
    instructions="Summarize this file in one sentence for a support analyst.",
    column_type="path",
)
display(custom_df)
```

## Related content

- Use [ai.summarize with PySpark](../pyspark/summarize.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
