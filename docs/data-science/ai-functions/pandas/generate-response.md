---
title: Use ai.generate_response with pandas
description: Learn how to generate custom text responses based on your own instruction by using the ai.generate_response function with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.generate_response with pandas


The `ai.generate_response` function uses generative AI to generate custom text responses that are based on your own instructions, with a single line of code.

> [!NOTE]
> - This article covers using *ai.generate_response* with pandas. To use *ai.generate_response* with PySpark, see [this article](../pyspark/generate-response.md).
> - See other AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

## Overview

The `ai.generate_response` function can extend the [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) class and the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class.

To generate custom text responses row by row, you can either call this function on a pandas series or an entire pandas DataFrame.

If calling the function on an entire pandas DataFrame, your prompt can be a literal string, and the function considers all columns of the DataFrame while generating responses. Your prompt can also be a format string, where the function considers only those column values that appear between curly braces in the prompt.

The function returns a pandas Series that contains custom text responses for each row of input. The text responses can be stored in a new DataFrame column.

> [!TIP]
>
> Learn how to craft more effective prompts to get higher-quality responses by following [OpenAI's prompting tips for gpt-4.1](https://cookbook.openai.com/examples/gpt4-1_prompting_guide#2-long-context).

## Syntax

# [Generate responses with a simple prompt](#tab/simple-prompt)

```python
df["response"] = df.ai.generate_response(prompt="Instructions for a custom response based on all column values")
```

# [Generate responses with a template prompt](#tab/template-prompt)

```python
df["response"] = df.ai.generate_response(prompt="Instructions for a custom response based on specific {column1} and {column2} values", is_prompt_template=True)
```

---

## Parameters

| Name | Description |
|--- |---|
| `prompt` <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) that contains prompt instructions to apply to input text values for custom responses. |
| `is_prompt_template` <br> Optional | A [Boolean](https://docs.python.org/3/library/stdtypes.html#boolean-type-bool) that indicates whether the prompt is a format string or a literal string. If this parameter is set to `True`, then the function considers only the specific row values from each column name that appears in the format string. In this case, those column names must appear between curly braces, and other columns are ignored. If this parameter is set to its default value of `False`, then the function considers all column values as context for each input row. |
| `response_format` <br> Optional | A [dictionary](https://docs.python.org/3/library/stdtypes.html#dict) that specifies the expected structure of the model’s response. The `type` field can be set to "text" for free-form text, "json_object" to ensure the output is a valid JSON object, or a custom JSON Schema to enforce a specific response structure. If this parameter isn't provided, the response is returned as plain text. |

## Returns

The function returns a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) that contains custom text responses to the prompt for each input text row.

## Example

# [Generate responses with a simple prompt](#tab/simple-prompt)

```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([
        ("Scarves"),
        ("Snow pants"),
        ("Ski goggles")
    ], columns=["product"])

df["response"] = df.ai.generate_response("Write a short, punchy email subject line for a winter sale.")
display(df)
```

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/generate-response-simple-example-output.png" alt-text="Screenshot showing a data frame with columns 'product' and 'response'. The 'response' column contains a punchy subject line for the product." lightbox="../../media/ai-functions/generate-response-simple-example-output.png":::

# [Generate responses with a template prompt](#tab/template-prompt)

```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([
        ("001", "Scarves", "Boots", "2021"),
        ("002", "Snow pants", "Sweaters", "2010"),
        ("003", "Ski goggles", "Helmets", "2015")
    ], columns=["id", "product", "product_rec", "yr_introduced"])

df["response"] = df.ai.generate_response("Write a short, punchy email subject line for a winter sale on the {product}.", is_prompt_template=True)
display(df)
```

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/generate-response-template-example-output.png" alt-text="Screenshot showing a data frame with columns 'product' and 'response'. The 'response' column contains a punchy subject line for the product." lightbox="../../media/ai-functions/generate-response-template-example-output.png":::

---

### Response format example

The following example shows how to use the `response_format` parameter to specify different response formats, including plain text, a JSON object, and a custom JSON schema.

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([
        ("Alex Rivera is a 24-year-old soccer midfielder from Barcelona who scored 12 goals last season."),
        ("Jordan Smith, a 29-year-old basketball guard from Chicago, averaged 22 points per game."),
        ("William O'Connor is a 22-year-old tennis player from Dublin who won 3 ATP titles this year.")
    ], columns=["bio"])

# response_format : text
df["card_text"] = df.ai.generate_response(
    "Create a player card with the player's details and a motivational quote", 
    response_format={"type": "text"}
)

# response_format : json object
df["card_json_object"] = df.ai.generate_response(
    "Create a player card with the player's details and a motivational quote in JSON", 
    response_format={"type": "json_object"} # Requires "json" in the prompt
)

# response_format : specified json schema
df["card_json_schema"] = df.ai.generate_response(
    "Create a player card with the player's details and a motivational quote", 
    response_format={
        "type": "json_schema",
            "json_schema": {
            "name": "player_card_schema",
            "strict": True,
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "age": {"type": "integer"},
                    "sport": {"type": "string"},
                    "position": {"type": "string"},
                    "hometown": {"type": "string"},
                    "stats": {"type": "string", "description": "Key performance metrics or achievements"},
                    "motivational_quote": {"type": "string"}
                },
                "required": ["name", "age", "sport", "position", "hometown", "stats", "motivational_quote"],
                "additionalProperties": False,
            },
        },
    },
)

display(df)
```

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/generate-response-format-example-output.png" alt-text="Screenshot showing a data frame with a 'bio' column, and a new column for each specified format, with its corresponding formatted output." lightbox="../../media/ai-functions/generate-response-format-example-output.png":::

## Related content

- Use [ai.generate_response with PySpark](../pyspark/generate-response.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Generate vector embeddings with [ai.embed](./embed.md).
- Extract entities with [ai_extract](./extract.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
