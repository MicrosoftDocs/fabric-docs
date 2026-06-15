---
title: Use ai.analyze_sentiment with pandas
description: Learn how to detect the emotional state of input text by using the ai.analyze_sentiment function with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.analyze_sentiment with pandas

The `ai.analyze_sentiment` function labels each input row as positive, negative, mixed, or neutral. You can also provide custom labels. If the function can't determine sentiment, it leaves the output blank.

> [!NOTE]
> - This article covers `ai.analyze_sentiment` with pandas. For PySpark, see [Use ai.analyze_sentiment with PySpark](../pyspark/analyze-sentiment.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.analyze_sentiment` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To detect the sentiment of each input row, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column.

The function returns a pandas Series that contains sentiment labels, which can be stored in a new column of the DataFrame.

## Syntax

```python
# Default sentiment labels
df["sentiment"] = df["input"].ai.analyze_sentiment()

# Custom sentiment labels
df["sentiment"] = df["input"].ai.analyze_sentiment("label2", "label2", "label3")
```

## Parameters

| Name | Description |
|---|---|
| **`labels`** <br> Optional | One or more [strings](https://docs.python.org/3/library/stdtypes.html#str) that represent the set of sentiment labels to match to input text values. |

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains sentiment labels for each input text row. The default sentiment labels include `positive`, `negative`, `neutral`, or `mixed`. If custom labels are specified, those labels are used instead. If a sentiment can't be determined, the return value is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "The cleaning spray permanently stained my beautiful kitchen counter. Never again!",
        "I used this sunscreen on my vacation to Florida, and I didn't get burned at all. Would recommend.",
        "I'm torn about this speaker system. The sound was high quality, though it didn't connect to my roommate's phone.",
        "The umbrella is OK, I guess."
    ], columns=["reviews"])

df["sentiment"] = df["reviews"].ai.analyze_sentiment()
display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/analyze-sentiment-example-output.png" alt-text="Screenshot of a data frame with 'reviews' and 'sentiment' columns. The 'sentiment' column includes 'negative', 'positive', 'mixed', and 'neutral'." lightbox="../../media/ai-functions/analyze-sentiment-example-output.png":::

## Multimodal input

To analyze sentiment in images, PDFs, or text files, set `column_type="path"` when the input column contains file path strings. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

animal_urls = [
    "<image-url-golden-retriever>",  # Replace with URL to an image of a golden retriever
    "<image-url-giant-panda>",  # Replace with URL to an image of a giant panda
    "<image-url-bald-eagle>",  # Replace with URL to an image of a bald eagle
]
animal_df = pd.DataFrame({"file_path": animal_urls})

animal_df["sentiment"] = animal_df["file_path"].ai.analyze_sentiment(column_type="path")
display(animal_df)
```

## Related content

- Use [ai.analyze_sentiment with PySpark](../pyspark/analyze-sentiment.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
