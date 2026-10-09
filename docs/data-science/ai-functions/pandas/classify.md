---
title: Use ai.classify with pandas
description: Learn how to categorize input text according to custom labels by using the ai.classify function with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.classify with pandas

The `ai.classify` function categorizes each input row by using the labels you provide.

> [!NOTE]
> - This article covers `ai.classify` with pandas. For PySpark, see [Use ai.classify with PySpark](../pyspark/classify.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.classify` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To assign user-provided labels to each input row, call the function on a text column of a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

The function returns a pandas Series that contains classification labels, which can be stored in a new DataFrame column.

> [!TIP]
> We recommend using the `ai.classify` function with at least two input labels.

## Syntax

```python
df["classification"] = df["input"].ai.classify("category1", "category2", "category3")
```

## Parameters

| Name | Description |
|---|---|
| **`labels`** <br> Required | One or more [strings](https://docs.python.org/3/library/stdtypes.html#str) that represent the set of classification labels to match to input text values. |

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains a classification label for each input text row. If a text value can't be classified, the corresponding label is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([
        "This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",
        "Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",
        "Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!"
    ], columns=["descriptions"])

df["category"] = df['descriptions'].ai.classify("kitchen", "bedroom", "garage", "other")
display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/classify-example-output.png" alt-text="Screenshot of a data frame with 'descriptions' and 'category' columns. The 'category' column lists each description’s category name." lightbox="../../media/ai-functions/classify-example-output.png":::

## Multimodal input

To classify images, PDFs, or text files, set `column_type="path"` when the input column contains file path strings. For supported file types and setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

file_path_series = aifunc.list_file_paths("/lakehouse/default/Files")
custom_df = pd.DataFrame({"file_path": file_path_series})

custom_df["highest_degree"] = custom_df["file_path"].ai.classify(
    "Master", "PhD", "Bachelor", "Other",
)
display(custom_df)
```

> [!NOTE]
> When you use `aifunc.list_file_paths()` to create your file path column, the returned `yarl.URL` objects are automatically detected as file paths. You only need to specify `column_type="path"` when your column contains plain string URLs.

You can also use `aifunc.load` to ingest files into a DataFrame, then classify the file-path column:

```python
# This code uses AI. Always review output for mistakes.

df, schema = aifunc.load("/lakehouse/default/Files")
df["category"] = df["file_path"].ai.classify("Master", "PhD", "Bachelor", "Other")
display(df)
```

When you use `aifunc.load`, the file-path column contains `yarl.URL` objects that are automatically detected. For plain string URLs, set `column_type="path"`.

## Related content

- Use [ai.classify with PySpark](../pyspark/classify.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
