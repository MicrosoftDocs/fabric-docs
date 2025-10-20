---
title: Use ai.analyze_sentiment with pandas
description: Learn how to detect the emotional state of input text by using the ai.analyze_sentiment function with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.analyze_sentiment with pandas

The `ai.analyze_sentiment` function uses generative AI to detect the emotional state of the input text, with a single line of code. It can detect whether the emotional state of the input is positive, negative, mixed, or neutral. It can also detect the emotional state according to your specified labels. If the function can't determine the sentiment, it leaves the output blank.

> [!NOTE]
> - This article covers using *ai.analyze_sentiment* with pandas. To use *ai.analyze_sentiment* with PySpark, see [this article](../pyspark/analyze-sentiment.md).
> - See additional AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

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

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains sentiment labels for each input text row. The default sentiment labels include `positive`, `negative`, `neutral`, or `mixed`. If custom labels are specified, those labels will be used instead. If a sentiment can't be determined, the return value is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([
        "The cleaning spray permanently stained my beautiful kitchen counter. Never again!",
        "I used this sunscreen on my vacation to Florida, and I didn't get burned at all. Would recommend.",
        "I'm torn about this speaker system. The sound was high quality, though it didn't connect to my roommate's phone.",
        "The umbrella is OK, I guess."
    ], columns=["reviews"])

df["sentiment"] = df["reviews"].ai.analyze_sentiment()
display(df)
```
This example code cell provides the following output:
:::image type="content" source="../../media/ai-functions/analyze-sentiment-example-output.png" alt-text="Screenshot showing a data frame with a 'reviews' column and a 'sentiment' column. the 'sentiment' column contains values 'negative', 'positive', 'mixed', and 'neutral', according to the emotional state of the review in the corresponding row." lightbox="../../media/ai-functions/analyze-sentiment-example-output.png":::


## Related content
- Use [ai.analyze_sentiment with PySpark](../pyspark/analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
