---
title: Use ai.classify with pandas
description: Learn how to categorize input text according to custom labels by using the ai.classify function with pandas.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI functions
---

# Use ai.classify with pandas


The `ai.classify` function uses generative AI to categorize input text according to custom labels you choose, with a single line of code.

> [!NOTE]
> - This article covers using *ai.classify* with pandas. To use *ai.classify* with PySpark, see [this article](../pyspark/classify.md).
> - See other AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

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

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/classify-example-output.png" alt-text="Screenshot of a data frame with 'descriptions' and 'category' columns. The 'category' column lists each description’s category name." lightbox="../../media/ai-functions/classify-example-output.png":::

## Multimodal input

The `ai.classify` function supports file-based multimodal input. You can classify images, PDFs, and text files by setting `column_type="path"` when your column contains file path strings. Supported file types for `column_type="path"` include JPG/JPEG, PNG, GIF, WebP (images), PDF (documents), and common text formats such as MD, TXT, CSV, JSON, and XML. For more information about supported file types and setup, see [Use multimodal input with AI functions](../multimodal-overview.md).

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

You can also use `aifunc.load` to ingest files from a folder into a DataFrame, then classify the resulting file-path column:

```python
# This code uses AI. Always review output for mistakes.

df, schema = aifunc.load("/lakehouse/default/Files")
df["category"] = df["file_path"].ai.classify("Master", "PhD", "Bachelor", "Other")
display(df)
```

When you use `aifunc.load`, the file-path column contains `yarl.URL` objects that are automatically detected. For plain string URLs, set `column_type="path"`.

> [!TIP]
> The AI functions progress bar cost calculator can be configured with modes such as `basic`, `stats`, or `disable` to provide real-time token and capacity usage estimates when running `ai.classify` in notebooks. For details, see [Configure AI functions](./configuration.md).

## Related content

- Use [ai.classify with PySpark](../pyspark/classify.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Generate vector embeddings with [ai.embed](./embed.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Use [multimodal input with AI functions](../multimodal-overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
