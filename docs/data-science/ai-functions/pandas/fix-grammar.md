---
title: Use ai.fix_grammar with pandas
description: Learn how to correct the spelling, grammar, and punctuation of input text by using the ai.fix_grammar function with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.fix_grammar with pandas

The `ai.fix_grammar` function corrects spelling, grammar, and punctuation in each input row.

> [!NOTE]
> - This article covers `ai.fix_grammar` with pandas. For PySpark, see [Use ai.fix_grammar with PySpark](../pyspark/fix-grammar.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.fix_grammar` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To correct the spelling, grammar, and punctuation of each row of input, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column.

The function returns a pandas Series that contains corrected text values, which can be stored in a new DataFrame column.

## Syntax

```python
df["corrections"] = df["input"].ai.fix_grammar()
```

## Parameters

None.

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains corrected text for each input text row. If the input text is `null`, the result is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "There are an error here.",
        "She and me go weigh back. We used to hang out every weeks.",
        "The big picture are right, but you're details is all wrong."
    ], columns=["text"])

df["corrections"] = df["text"].ai.fix_grammar()
display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/fix-grammar-example-output.png" alt-text="Screenshot showing a  data frame with a 'text' column and a 'corrections' column, which has the text from the text column with corrected grammar." lightbox="../../media/ai-functions/fix-grammar-example-output.png":::

## Multimodal input

To fix grammar in PDFs or text files, set `column_type="path"` when the input column contains file path strings. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

custom_df["corrections"] = custom_df["file_path"].ai.fix_grammar(column_type="path")
display(custom_df)
```

## Related content

- Use [ai.fix_grammar with PySpark](../pyspark/fix-grammar.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
