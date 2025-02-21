---
title: Fix grammar with the `ai.fix_grammar` function
description: Learn how to use the `ai.fix_grammar` function, which invokes Generative AI to correct the spelling, grammar, and punctuation of input text.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Fix grammar with the `ai.fix_grammar` function

The `ai.fix_grammar` function uses Generative AI to correct the spelling, grammar, and punctuation of input text—all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

> [!NOTE]
> This feature is in [preview](../../get-started/preview.md):
>
> - Please be sure to review the prerequisites and limitations in [this overview article](ai-function-overview.md), including the [library installations](ai-function-overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - AI functions are supported in the Fabric 3.5 runtime.
> - Currently, the default language model powering these funtions is **gpt-3.5-turbo-0125**, and the default embedding model is **text-embedding-ada-002**.
> - Although the default model can handle several languages, most of the AI functions have been optimized for use on English texts.
> - To learn about customizing the configuration of AI functions in Fabric, please visit [this article](ai-function-configuration.md).

## Use `ai.fix_grammar` with pandas

The `ai.fix_grammar` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. You can call the function on a text column of a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) to correct the spelling, grammar, and punctuation of each row of input. 

The function returns a pandas Series containing corrected text values, which can be stored in a new column of the DataFrame.

### Syntax

```python
df["corrections"] = df["text"].ai.fix_grammar()
```

### Parameters

None

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing corrected text for each row of input text. If the input text is `null`, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

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

The function returns a new DataFrame with corrected text for each row of input text stored in an ouput column.

### Syntax

```python
df.ai.fix_grammar(input_col="text", output_col="corrections")
```

### Parameters

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be corrected for spelling, grammar, and punctuation. |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store corrected text for each row of input text. If this parameter is not set, a default name will be generated for the output column. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store any OpenAI errors that result from processing each row of input text. If this parameter is not set, a default name will be generated for the error column. If there are no errors for a row of input, the value in this column will be `null`. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing corrected text for each row of text in the input column. If the input text is `null`, the result will be `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("There are an error here.",),
        ("She and me go weigh back. We used to hang out every weeks.",),
        ("The big picture are right, but you're details is all wrong.",)
    ], ["text"])

results = df.ai.fix_grammar(input_col="text", output_col="corrections")
display(results)
```

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
