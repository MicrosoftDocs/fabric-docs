---
title: Use ai.translate with pandas
description: Learn how to use the ai.translate function to translate input text into a new language of your choice with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.translate with pandas

The `ai.translate` function translates each input row into the target language you choose.

> [!NOTE]
> - This article covers `ai.translate` with pandas. For PySpark, see [Use ai.translate with PySpark](../pyspark/translate.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.translate` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To translate each input row into a target language of your choice, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column.

The function returns a pandas Series that contains translations, which you can store in a new DataFrame column.

> [!TIP]
> The `ai.translate` function was tested with 10 languages: Czech, English, Finnish, French, German, Greek, Italian, Polish, Spanish, and Swedish. Your results with other languages might vary.

## Syntax

```python
df["translations"] = df["text"].ai.translate("target_language")
```

## Parameters

| Name | Description |
|---|---|
| `to_lang` <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) representing the target language for text translations. |

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains translations for each row of input text. If the input text is `null`, the result is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/translate-example-output.png" alt-text="Screenshot of a data frame with columns 'text' and 'translations'. The 'translations' column contains the text translated to Spanish." lightbox="../../media/ai-functions/translate-example-output.png":::

## Multimodal input

To translate images, PDFs, or text files, set `column_type="path"` when the input column contains file path strings. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

custom_df["chinese_version"] = custom_df["file_path"].ai.translate(
    "Chinese",
    column_type="path",
)
display(custom_df)
```

## Related content

- Use [ai.translate with PySpark](../pyspark/translate.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
