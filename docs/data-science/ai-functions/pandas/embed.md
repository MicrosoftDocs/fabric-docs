---
title: Use ai.embed with pandas
description: Learn how to convert text into numeric vectors that capture its meaning and context by using the ai.embed function with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.embed with pandas

The `ai.embed` function converts text into vector embeddings that represent meaning. Use embeddings to search, group, and compare content by meaning instead of exact wording.

> [!NOTE]
> - This article covers `ai.embed` with pandas. For PySpark, see [Use ai.embed with PySpark](../pyspark/embed.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.embed` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class.

To generate vector embeddings of each input row, call the function on either a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) or a text column of [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

The function returns a pandas Series that contains embeddings, which can be stored in a new DataFrame column.

## Syntax

```python
df["embed"] = df["col1"].ai.embed()
```

## Parameters

None.

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains embeddings as [numpy array of float-32](https://numpy.org/doc/stable/reference/arrays.scalars.html#numpy.float32) values for each input row. The array size depends on the embedding model dimensions, which are [configurable in AI Functions](./configuration.md).

## Example

```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([
        "This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",
        "Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",
        "Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!"
    ], columns=["descriptions"])
    
df["embed"] = df["descriptions"].ai.embed()
display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/embed-example-output.png" alt-text="Screenshot of a data frame with columns 'descriptions' and 'embed'. The 'embed' column contains embeddings for the descriptions." lightbox="../../media/ai-functions/embed-example-output.png":::

## Related content

- Use [ai.embed with PySpark](../pyspark/embed.md).
- Learn more about [AI Functions](../overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
