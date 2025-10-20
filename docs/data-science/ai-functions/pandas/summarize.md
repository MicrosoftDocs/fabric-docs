---
title: Use ai.summarize with pandas
description: Learn how to to produce summaries of input text by using the ai.summarize function with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.summarize with pandas


The `ai.summarize` function uses generative AI to produce summaries of input text, with a single line of code. The function can either summarize values from one column of a DataFrame or values across all the columns.

> [!NOTE]
> - This article covers using *ai.summarize* with pandas. To use *ai.summarize* with PySpark, see [this article](../pyspark/summarize.md).
> - See additional AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

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

None

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains summaries for each input text row. If the input text is `null`, the result is `null`.

## Example

# [Summarize values from a single column](#tab/column-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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

# [Summarize values across all columns](#tab/dataframe-summary)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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

The example code cell with a single value provides the following output:
:::image type="content" source="../../media/ai-functions/summarize-single-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the 'description' column only, in the corresponding row." lightbox="../../media/ai-functions/summarize-single-example-output.png":::

The example code cell with pairwise values provides the following output:
:::image type="content" source="../../media/ai-functions/summarize-all-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the information across all the columns in the corresponding row." lightbox="../../media/ai-functions/summarize-all-example-output.png":::


## Related content

- Use [ai.summarize with PySpark](../pyspark/summarize.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
