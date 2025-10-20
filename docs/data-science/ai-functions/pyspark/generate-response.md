---
title: Use ai.generate_response with PySpark
description: Learn how to generate custom text responses based on your own instruction by using the ai.generate_response function with PySpark.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.generate_response with PySpark


The `ai.generate_response` function uses generative AI to generate custom text responses that are based on your own instructions, with a single line of code.

> [!NOTE]
> - This article covers using *ai.generate_response* with PySpark. To use *ai.generate_response* with pandas, see [this article](../pandas/generate-response.md).
> - See additional AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

## Overview

The `ai.generate_response` function is available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter. You must also specify a string-based prompt, and a Boolean that indicates whether that prompt should be treated as a format string.

The function returns a new DataFrame, with custom responses for each input text row stored in an output column.

> [!TIP]
>
> Learn how to craft more effective prompts to get higher-quality responses by following [OpenAI's prompting tips for gpt-4.1](https://cookbook.openai.com/examples/gpt4-1_prompting_guide#2-long-context).

## Syntax

# [Generate responses with a simple prompt](#tab/simple-prompt)

```python
df.ai.generate_response(prompt="Instructions for a custom response based on all column values", output_col="response")
```

# [Generate responses with a template prompt](#tab/template-prompt)

```python
df.ai.generate_response(prompt="Instructions for a custom response based on specific {column1} and {column2} values", is_prompt_template=True, output_col="response")
```

---

## Parameters

| Name | Description |
|---|---|
| `prompt` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains prompt instructions. These instructions are applied to input text values for custom responses. |
| `is_prompt_template` <br> Optional | A [Boolean](https://docs.python.org/3/library/stdtypes.html#boolean-type-bool) that indicates whether the prompt is a format string or a literal string. If this parameter is set to `True`, then the function considers only the specific row values from each column that appears in the format string. In this case, those column names must appear between curly braces, and other columns are ignored. If this parameter is set to its default value of `False`, then the function considers all column values as context for each input row. |
| `output_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store custom responses for each row of input text. If you don't set this parameter, a default name generates for the output column. |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each row of input text. If you don't set this parameter, a default name generates for the error column. If there are no errors for a row of input, the value in this column is `null`. |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) that includes a new column that contains custom text responses to the prompt for each input text row.

## Example

# [Generate responses with a simple prompt](#tab/simple-prompt)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("Scarves",),
        ("Snow pants",),
        ("Ski goggles",)
    ], ["product"])

responses = df.ai.generate_response(prompt="Write a short, punchy email subject line for a winter sale.", output_col="response")
display(responses)
```

# [Generate responses with a template prompt](#tab/template-prompt)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("001", "Scarves", "Boots", "2021"),
        ("002", "Snow pants", "Sweaters", "2010"),
        ("003", "Ski goggles", "Helmets", "2015")
    ], ["id", "product", "product_rec", "yr_introduced"])

responses = df.ai.generate_response(prompt="Write a short, punchy email subject line for a winter sale on the {product}.", is_prompt_template=True, output_col="response")
display(responses)
```

The example code cell with a simple prompt provides the following output:
:::image type="content" source="../../media/ai-functions/generate-response-simple-example-output.png" alt-text="Screenshot showing a data frame with a 'product' column and a 'response' column. The 'response' column contains a punchy subject line for the product in the corresponding row." lightbox="../../media/ai-functions/generate-response-simple-example-output.png":::

The example code cell with a template prompt provides the following output:
:::image type="content" source="../../media/ai-functions/generate-response-template-example-output.png" alt-text="Screenshot showing a data frame with all the columns specified along with a 'response column'. The 'response' column contains a punchy subject line for the product in the 'product' column." lightbox="../../media/ai-functions/generate-response-template-example-output.png":::


## Related content

- Use [ai.generate_response with pandas](../pandas/generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Categorize text with [ai.classify](./classify.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).
- Learn more about the [full set of AI functions](./overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
