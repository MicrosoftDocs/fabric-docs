---
title: Detect sentiment with the `ai.analyze_sentiment` function
description: Learn how to use the `ai.analyze_sentiment` function to detect the emotional state of input text.
ms.author: scottpolly
author: s-polly
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Detect sentiment with the `ai.analyze_sentiment` function

The `ai.analyze_sentiment` function uses Generative AI to detect whether the emotional state expressed by input text is positive, negative, mixed, or neutral—all with a single line of code. If the function can't determine the sentiment, it leaves the output blank.

AI functions turbocharge data engineering by putting the power of Fabric's built-in large languages models into your hands. To learn more, visit [this overview article](./overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and higher.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - By default, AI functions are currently powered by the **gpt-3.5-turbo (0125)** model. To learn more about billing and consumption rates, visit [this article](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with Fabric's built-in AI endpoint.

## Use `ai.analyze_sentiment` with pandas

The `ai.analyze_sentiment` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. Call the function on [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column to detect the sentiment of each input row.

The function returns a pandas Series that contains sentiment labels, which can be stored in a new column of the DataFrame.

### Syntax

```python
df["sentiment"] = df["text"].ai.analyze_sentiment()
```

### Parameters

None

### Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains sentiment labels for each input text row. Each sentiment label is `positive`, `negative`, `neutral`, or `mixed`. If a sentiment can't be determined, the return value is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "The cleaning spray permanently stained my beautiful kitchen counter. Never again!",
        "I used this sunscreen on my vacation to Florida, and I didn't get burned at all. Would recommend.",
        "I'm torn about this speaker system. The sound was high quality, though it didn't connect to my roommate's phone.",
        "The umbrella is OK, I guess."
    ], columns=["reviews"])

df["sentiment"] = df["reviews"].ai.analyze_sentiment()
display(df)
```

## Use `ai.analyze_sentiment` with PySpark

The `ai.analyze_sentiment` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). The name of an existing input column must be specified as a parameter.

The function returns a new DataFrame, with sentiment labels for each input text row stored in an output column.

### Syntax

```python
df.ai.analyze_sentiment(input_col="text", output_col="sentiment")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to be analyzed for sentiment. |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store the sentiment label for each row of input text. If this parameter isn't set, a default name is generated for the output column. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each row of input text. If this parameter isn't set, a default name is generated for the error column. If an input row has no errors, the value in this column is `null`. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing sentiment labels that match each row of text in the input column. Each sentiment label is `positive`, `negative`, `neutral`, or `mixed`. If a sentiment can't be determined, the return value is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("The cleaning spray permanently stained my beautiful kitchen counter. Never again!",),
        ("I used this sunscreen on my vacation to Florida, and I didn't get burned at all. Would recommend.",),
        ("I'm torn about this speaker system. The sound was high quality, though it didn't connect to my roommate's phone.",),
        ("The umbrella is OK, I guess.",)
    ], ["reviews"])

sentiment = df.ai.analyze_sentiment(input_col="reviews", output_col="sentiment")
display(sentiment)
```

## Related content

- Calculate similarity with [`ai.similarity`](./similarity.md).
- Categorize text with [`ai.classify`](./classify.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Learn more about the full set of AI functions [here](./overview.md).
- Learn how to customize the configuration of AI functions [here](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
