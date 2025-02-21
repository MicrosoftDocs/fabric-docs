---
title: Translate text with the `ai.translate` function
description: Learn how to use the `ai.translate` function, which invokes Generative AI to translate input text to a new language of your choosing.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Translate text with the `ai.translate` function

The `ai.translate` function uses Generative AI to translate input text to a new language of your choosing, all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

> [!NOTE]
> This feature is in [preview](../../get-started/preview.md) in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and above:
>
> - Please be sure to review the prerequisites in [this overview article](ai-function-overview.md), including the [library installations](ai-function-overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - Although the underlying model can handle several languages, most of the AI functions have been optimized for use on English texts.
> - To learn about customizing the configuration of AI functions in Fabric, please visit [this article](ai-function-configuration.md).

The `ai.translate` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. You can call the function on a text column of a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) to translate each row of input into a user-specified target language. 

The function returns a pandas Series containing translations, which can be stored in a new column of the DataFrame.

### Syntax

```python
df["translations"] = df["text"].ai.translate("target_language")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`to_lang`** <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) representing the target language for text translations. |

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing translations for each row of input text. If the input text is `null`, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
display(df)
```

## Use `ai.translate` with PySpark

The `ai.translate` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). The name of an existing input column must be specified as a parameter, along with a target language.

The function returns a new DataFrame with translations for each row of input text stored in an ouput column.

### Syntax

```python
df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`to_lang`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) representing the target language for text translations. |
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be translated. |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store translations for each row of input text. If this parameter is not set, a default name will be generated for the output column. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store any OpenAI errors that result from processing each row of input text. If this parameter is not set, a default name will be generated for the error column. If there are no errors for a row of input, the value in this column will be `null`. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing translations for each row of text in the input column. If the input text is `null`, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Hello! How are you doing today?",),
        ("Tell me what you'd like to know, and I'll do my best to help.",),
        ("The only thing we have to fear is fear itself.",),
    ], ["text"])

translations = df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
display(translations)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
