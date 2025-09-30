---
title: Translate Text with the ai.translate Function
description: Learn how to use the ai.translate function to translate input text into a new language of your choice.
ms.author: jburchel
author: jonburchel
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025
ms.search.form: AI functions
---

# Translate text with the ai.translate function

The `ai.translate` function uses generative AI to translate input text into a new language (of your choice). It uses only a single line of code.

AI functions improve data engineering by using the power of large language models in Microsoft Fabric. To learn more, see [this overview article](./overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - By default, the *gpt-4o-mini* model currently powers AI functions. Learn more about [billing and consumption rates](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with the built-in AI endpoint in Fabric.

## Use ai.translate with pandas

The `ai.translate` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To translate each input row into a target language of your choice, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column.

The function returns a pandas Series that contains translations, which you can store in a new DataFrame column.

> [!TIP]
> The `ai.translate` function was tested with 10 languages: Czech, English, Finnish, French, German, Greek, Italian, Polish, Spanish, and Swedish. Your results with other languages might vary.

### Syntax

```python
df["translations"] = df["text"].ai.translate("target_language")
```

### Parameters

| Name | Description |
|---|---|
| `to_lang` <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) representing the target language for text translations. |

### Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains translations for each row of input text. If the input text is `null`, the result is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
display(df)
```

## Use ai.translate with PySpark

The `ai.translate` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify an existing input column name as a parameter, along with a target language.

The function returns a new DataFrame with translations for each input text row, stored in an output column.

### Syntax

```python
df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
```

### Parameters

| Name | Description |
|---|---|
| `to_lang` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that represents the target language for text translations. |
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to translate. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column that stores translations for each input text row. If you don't set this parameter, a default name generates for the output column. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column that stores any OpenAI errors that result from processing each input text row. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, the value in this column is `null`. |

### Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains translations for the text in the input column row. If the input text is `null`, the result is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("Hello! How are you doing today?",),
        ("Tell me what you'd like to know, and I'll do my best to help.",),
        ("The only thing we have to fear is fear itself.",),
    ], ["text"])

translations = df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
display(translations)
```

## Related content

- Calculate similarity with [`ai.similarity`](./similarity.md).
- Categorize text with [`ai.classify`](./classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Learn more about the [full set of AI functions](./overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
