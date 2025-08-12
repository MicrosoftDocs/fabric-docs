---
title: Answer custom user prompts with the `ai.generate_response` function
description: Learn how to use the `ai.generate_response` function to generate custom text responses based on your own instructions.
ms.author: scottpolly
author: s-polly
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Answer custom user prompts with the `ai.generate_response` function

The `ai.generate_response` function uses Generative AI to generate custom text responses based on your own instructions—all with a single line of code.

AI functions turbocharge data engineering by putting the power of Fabric's built-in large languages models into your hands. To learn more, visit [this overview article](./overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and higher.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - By default, AI functions are currently powered by the **gpt-4o-mini** model. To learn more about billing and consumption rates, visit [this article](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with Fabric's built-in AI endpoint.

## Use `ai.generate_response` with pandas

The `ai.generate_response` function extends the [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) class. The `ai.generate_response` function differs from the other AI functions, because those functions extend the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. Call this function on an entire pandas DataFrame to generate custom text responses row by row. Your prompt can be a literal string, in which case the function considers all columns of the DataFrame while generating responses. Or your prompt can be a format string, in which case the function considers only those column values that appear between curly braces in the prompt.

The function returns a pandas Series that contains custom text responses for each row of input. The text responses can be stored in a new DataFrame column.

### Syntax

# [Generating responses with a simple prompt](#tab/simple-prompt)

```python
df["response"] = df.ai.generate_response(prompt="Instructions for a custom response based on all column values")
```

# [Generating responses with a template prompt](#tab/template-prompt)

```python
df["response"] = df.ai.generate_response(prompt="Instructions for a custom response based on specific {column1} and {column2} values", is_prompt_template=True)
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`prompt`** <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) that contains prompt instructions to be applied to input text values for custom responses. |
| **`is_prompt_template`** <br> Optional | A [boolean](https://docs.python.org/3/library/stdtypes.html#boolean-type-bool) that indicates whether the prompt is a format string or a literal string. If this parameter is set to `True`, then the function considers only the specific row values from each column name that appears in the format string. In this case, those column names must appear between curly braces, and other columns are ignored. If this parameter is set to its default value of `False`, then the function considers all column values as context for each input row. |

### Returns

The function returns a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) that contains custom text responses to the prompt for each input text row.

### Example

# [Generating responses with a simple prompt](#tab/simple-prompt)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        ("Scarves"),
        ("Snow pants"),
        ("Ski goggles")
    ], columns=["product"])

df["response"] = df.ai.generate_response("Write a short, punchy email subject line for a winter sale.")
display(df)
```

# [Generating responses with a template prompt](#tab/template-prompt)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        ("001", "Scarves", "Boots", "2021"),
        ("002", "Snow pants", "Sweaters", "2010"),
        ("003", "Ski goggles", "Helmets", "2015")
    ], columns=["id", "product", "product_rec", "yr_introduced"])

df["response"] = df.ai.generate_response("Write a short, punchy email subject line for a winter sale on the {product}.", is_prompt_template=True)
display(df)
```

---

## Use `ai.generate_response` with PySpark

The `ai.generate_response` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter. You must also specify a string-based prompt, and a boolean that indicates whether that prompt should be treated as a format string.

The function returns a new DataFrame, with custom responses for each input text row stored in an output column.

### Syntax

# [Generating responses with a simple prompt](#tab/simple-prompt)

```python
df.ai.generate_response(prompt="Instructions for a custom response based on all column values", output_col="response")
```

# [Generating responses with a template prompt](#tab/template-prompt)

```python
df.ai.generate_response(prompt="Instructions for a custom response based on specific {column1} and {column2} values", is_prompt_template=True, output_col="response")
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`prompt`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains prompt instructions to be applied to input text values, for custom responses. |
| **`is_prompt_template`** <br> Optional | A [boolean](https://docs.python.org/3/library/stdtypes.html#boolean-type-bool) that indicates whether the prompt is a format string or a literal string. If this parameter is set to `True`, then the function considers only the specific row values from each column that appears in the format string. In this case, those column names must appear between curly braces, and other columns are ignored. If this parameter is set to its default value of `False`, then the function considers all column values as context for each input row. |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store custom responses for each row of input text. If this parameter isn't set, a default name is generated for the output column. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each row of input text. If this parameter isn't set, a default name is generated for the error column. If there are no errors for a row of input, the value in this column is `null`. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column that contains custom text responses to the prompt for each input text row.

### Example

# [Generating responses with a simple prompt](#tab/simple-prompt)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Scarves",),
        ("Snow pants",),
        ("Ski goggles",)
    ], ["product"])

responses = df.ai.generate_response(prompt="Write a short, punchy email subject line for a winter sale.", output_col="response")
display(responses)
```

# [Generating responses with a template prompt](#tab/template-prompt)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("001", "Scarves", "Boots", "2021"),
        ("002", "Snow pants", "Sweaters", "2010"),
        ("003", "Ski goggles", "Helmets", "2015")
    ], ["id", "product", "product_rec", "yr_introduced"])

responses = df.ai.generate_response(prompt="Write a short, punchy email subject line for a winter sale on the {product}.", is_prompt_template=True, output_col="response")
display(responses)
```

---

## Related content

- Calculate similarity with [`ai.similarity`](./similarity.md).
- Categorize text with [`ai.classify`](./classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).
- Learn more about the full set of AI functions [here](./overview.md).
- Learn how to customize the configuration of AI functions [here](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
