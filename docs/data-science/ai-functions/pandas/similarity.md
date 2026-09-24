---
title: Use ai.similarity with pandas
description: Learn how to compare string values and calculate semantic similarity scores by using the ai.similarity function with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.similarity with pandas

The `ai.similarity` function compares text by meaning. Compare one column with a single reference value or with pairwise values in another column.

> [!NOTE]
> - This article covers `ai.similarity` with pandas. For PySpark, see [Use ai.similarity with PySpark](../pyspark/similarity.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.similarity` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. 

To calculate the semantic similarity of each input row for a single common text value, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column. The function can also calculate the semantic similarity of each row for corresponding pairwise values in another column that has the same dimensions as the input column.

The function returns a pandas Series that contains similarity scores, which can be stored in a new DataFrame column.

## Syntax

# [Compare with a single value](#tab/similarity-single)

```python
df["similarity"] = df["col1"].ai.similarity("value")
```

# [Compare with pairwise values](#tab/similarity-pairwise)

```python
df["similarity"] = df["col1"].ai.similarity(df["col2"])
```

---

## Parameters

| Name | Description |
|---|---|
| **`other`** <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) that contains either: <br> - A single common text value, which is used to compute similarity scores for each input row. <br> - Another [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) with the same dimensions as the input. It contains text values to use to compute pairwise similarity scores for each input row. |

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains similarity scores for each input text row. The output similarity scores are relative, and they're best used for ranking. Score values can range from `-1` (opposites) to `1` (identical). A score value of `0` indicates that the values are unrelated in meaning.

## Example

# [Compare with a single value](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([ 
        ("Bill Gates"), 
        ("Satya Nadella"), 
        ("Joan of Arc")
    ], columns=["name"])
    
df["similarity"] = df["name"].ai.similarity("Microsoft")
display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/similarity-single-example-output.png" alt-text="Screenshot of a data frame with columns 'name' and 'similarity'. The 'similarity' column contains similarity scores for the names and input word." lightbox="../../media/ai-functions/similarity-single-example-output.png":::

# [Compare with pairwise values](#tab/similarity-pairwise)

```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([ 
        ("Bill Gates", "Technology"), 
        ("Satya Nadella", "Healthcare"), 
        ("Joan of Arc", "Agriculture") 
    ], columns=["names", "industries"])
    
df["similarity"] = df["names"].ai.similarity(df["industries"])
display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/similarity-pairwise-example-output.png" alt-text="Screenshot of a data frame with columns 'names', 'industries', and 'similarity'. The 'similarity' column has similarity scores for name and industry." lightbox="../../media/ai-functions/similarity-pairwise-example-output.png":::

---

## Related content

- Use [ai.similarity with PySpark](../pyspark/similarity.md).
- Learn more about [AI Functions](../overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
