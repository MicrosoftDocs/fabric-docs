---
title: Use ai.analyze_sentiment with PySpark
description: Learn how to detect the emotional state of input text by using the ai.analyze_sentiment function with PySpark.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.analyze_sentiment with PySpark

The `ai.analyze_sentiment` function uses generative AI to detect the emotional state of the input text, with a single line of code. It can detect whether the emotional state of the input is positive, negative, mixed, or neutral. It can also detect the emotional state according to your specified labels. If the function can't determine the sentiment, it leaves the output blank.

> [!NOTE]
> - This article covers using *ai.analyze_sentiment* with PySpark. To use *ai.analyze_sentiment* with pandas, see [this article](../pandas/analyze-sentiment.md).
> - See additional AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

## Overview

The `ai.analyze_sentiment` function is  available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter.

The function returns a new DataFrame, with sentiment labels for each input text row stored in an output column.

## Syntax

```python
# Default sentiment labels
df.ai.analyze_sentiment(input_col="input", output_col="sentiment")

# Custom sentiment labels
df.ai.analyze_sentiment(input_col="input", output_col="sentiment", labels=["happy", "angry", "indifferent"])
```

## Parameters

| Name | Description |
|---|---|
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to analyze for sentiment. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store the sentiment label for each row of input text. If you don't set this parameter, a default name generates for the output column. |
| `labels` <br> Optional | One or more [strings](https://docs.python.org/3/library/stdtypes.html#str) that represent the set of sentiment labels to match to input text values. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each row of input text. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, the value in this column is `null`. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains sentiment labels that match each row of text in the input column. The default sentiment labels include `positive`, `negative`, `neutral`, or `mixed`. If custom labels are specified, those labels will be used instead. If a sentiment can't be determined, the return value is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("The cleaning spray permanently stained my beautiful kitchen counter. Never again!",),
        ("I used this sunscreen on my vacation to Florida, and I didn't get burned at all. Would recommend.",),
        ("I'm torn about this speaker system. The sound was high quality, though it didn't connect to my roommate's phone.",),
        ("The umbrella is OK, I guess.",)
    ], ["reviews"])

sentiment = df.ai.analyze_sentiment(input_col="reviews", output_col="sentiment")
display(sentiment)
```

This example code cell provides the following output:
:::image type="content" source="../../media/ai-functions/analyze-sentiment-example-output.png" alt-text="Screenshot showing a data frame with a 'reviews' column and a 'sentiment' column. the 'sentiment' column contains values 'negative', 'positive', 'mixed', and 'neutral', according to the emotional state of the review in the corresponding row." lightbox="../../media/ai-functions/analyze-sentiment-example-output.png":::

## Related content
- Use [`ai.analyze_sentiment` with pandas](../pandas/analyze-sentiment.md).
- Categorize text with [`ai.classify`](./classify.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Calculate similarity with [`ai.similarity`](./similarity.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
