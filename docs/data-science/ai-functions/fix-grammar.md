---
title: Fix grammar with the `ai.fix_grammar` function
description: Learn how to use the `ai.fix_grammar` to correct the spelling, grammar, and punctuation of input text.
ms.author: scottpolly
author: s-polly
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Fix grammar with the `ai.fix_grammar` function

The `ai.fix_grammar` function uses Generative AI to correct the spelling, grammar, and punctuation of input text—all with a single line of code.

AI functions turbocharge data engineering by putting the power of Fabric's built-in large languages models into your hands. To learn more, visit [this overview article](./overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and higher.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - By default, AI functions are currently powered by the **gpt-4o-mini** model. To learn more about billing and consumption rates, visit [this article](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with Fabric's built-in AI endpoint.

## Use `ai.fix_grammar` with pandas

The `ai.fix_grammar` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. Call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column to correct the spelling, grammar, and punctuation of each row of input.

The function returns a pandas Series that contains corrected text values, which can be stored in a new DataFrame column.

### Syntax

```python
df["corrections"] = df["text"].ai.fix_grammar()
```

### Parameters

None

### Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains corrected text for each input text row. If the input text is `null`, the result is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "There are an error here.",
        "She and me go weigh back. We used to hang out every weeks.",
        "The big picture are right, but you're details is all wrong."
    ], columns=["text"])

df["corrections"] = df["text"].ai.fix_grammar()
display(df)
```

## Use `ai.fix_grammar` with PySpark

The `ai.fix_grammar` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). The name of an existing input column must be specified as a parameter.

The function returns a new DataFrame, with corrected text for each input text row stored in an output column.

### Syntax

```python
df.ai.fix_grammar(input_col="text", output_col="corrections")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be corrected for spelling, grammar, and punctuation. |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store corrected text for each row of input text. If this parameter isn't set, a default name is generated for the output column. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store any OpenAI errors that result from processing each row of input text. If this parameter isn't set, a default name is generated for the error column. If there are no errors for a row of input, the value in this column is `null`. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing corrected text for each row of text in the input column. If the input text is `null`, the result is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("There are an error here.",),
        ("She and me go weigh back. We used to hang out every weeks.",),
        ("The big picture are right, but you're details is all wrong.",)
    ], ["text"])

results = df.ai.fix_grammar(input_col="text", output_col="corrections")
display(results)
```

## Related content

- Calculate similarity with [`ai.similarity`](./similarity.md).
- Categorize text with [`ai.classify`](./classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Extract entities with [`ai_extract`](./extract.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Learn more about the full set of AI functions [here](./overview.md).
- Learn how to customize the configuration of AI functions [here](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
