---
title: Use ai.generate_response with pandas
description: Learn how to generate custom text responses based on your own instruction by using the ai.generate_response function with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.generate_response with pandas

The `ai.generate_response` function creates custom text from your prompt and row data.

> [!NOTE]
> - This article covers `ai.generate_response` with pandas. For PySpark, see [Use ai.generate_response with PySpark](../pyspark/generate-response.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.generate_response` function extends [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) and [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html). For DataFrame calls, use a literal prompt to include all columns or a template prompt to include only columns in braces, such as `{product}`.

The function returns a pandas Series that contains custom text responses for each row of input. The text responses can be stored in a new DataFrame column.

> [!TIP]
>
> Learn how to craft more effective prompts to get higher-quality responses by following the [OpenAI prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering).

## Syntax

# [Generate responses with a simple prompt](#tab/simple-prompt)

```python
df["response"] = df.ai.generate_response(
    prompt="Instructions for a custom response based on all column values",
)
```

# [Generate responses with a template prompt](#tab/template-prompt)

```python
df["response"] = df.ai.generate_response(
    prompt="Instructions for a custom response based on specific {column1} and {column2} values",
    is_prompt_template=True,
)
```

---

## Parameters

| Name | Description |
|--- |---|
| `prompt` <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) that contains prompt instructions to apply to input text values for custom responses. |
| `is_prompt_template` <br> Optional | A [Boolean](https://docs.python.org/3/library/stdtypes.html#boolean-type-bool) that indicates whether the prompt is a format string. When `True`, the function uses only columns named in braces. When `False`, it uses all columns as row context. |
| `response_format` <br> Optional | `None`, a [dictionary](https://docs.python.org/3/library/stdtypes.html#dict), a [string](https://docs.python.org/3/library/stdtypes.html#str), or a class based on [Pydantic's BaseModel](https://docs.pydantic.dev/latest/concepts/models/) that specifies the expected structure of the model's response. See [Response format options](#response-format-options). |

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains custom text responses for each input row.

## Response format options

Use `response_format` to control response structure. It corresponds to OpenAI [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

| Format | Description |
|--------|-------------|
| `None` (default) | Let the LLM decide response format based on the instructions and input data, which can vary per row. Responses can be plain text or JSON dict with varying fields. |
| `"text"` or `{"type": "text"}` | Forces plain text responses for all rows. |
| `"json_object"` or `{"type": "json_object"}` | Returns a JSON dictionary in text form where the LLM decides the fields. Requires the word "json" in your prompt. |
| `{"type": "json_schema", ...}` | Returns a JSON dictionary that conforms to your custom [JSON Schema](https://json-schema.org/). Provides precise control over response structure. |
| Class based on [Pydantic's `BaseModel`](https://docs.pydantic.dev/latest/concepts/models/) | Returns a JSON string that conforms to your Pydantic model definition. Pydantic is a dependency of the OpenAI package. Under the hood, the Pydantic BaseModel is automatically converted to a JSON schema and functions equivalently to the `json_schema` option. |

> [!NOTE]
> The `json_schema` and Pydantic `BaseModel` options are equivalent. Use Pydantic when you want Python type hints and validation.

## Examples

### [Generate responses with a simple prompt](#tab/simple-prompt)

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

Output:

:::image type="content" source="../../media/ai-functions/generate-response-simple-example-output.png" alt-text="Screenshot showing a data frame with columns 'product' and 'response'. The 'response' column contains a punchy subject line for the product." lightbox="../../media/ai-functions/generate-response-simple-example-output.png":::

### [Generate responses with a template prompt](#tab/template-prompt)

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

Output:

:::image type="content" source="../../media/ai-functions/generate-response-template-example-output.png" alt-text="Screenshot showing a data frame with columns 'product' and 'response'. The 'response' column contains a punchy subject line for the product." lightbox="../../media/ai-functions/generate-response-template-example-output.png":::

---

### Response format example

The following example requests plain text, a JSON object, a custom JSON Schema, and a Pydantic model.

```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([
        ("Alex Rivera is a 24-year-old soccer midfielder from Barcelona who scored 12 goals last season."),
        ("Jordan Smith, a 29-year-old basketball guard from Chicago, averaged 22 points per game."),
        ("William O'Connor is a 22-year-old tennis player from Dublin who won 3 ATP titles this year.")
    ], columns=["bio"])

# response_format : text
df["card_text"] = df.ai.generate_response(
    "Create a player card with the player's details and a motivational quote", 
    response_format={"type": "text"},
)

# response_format : json object
df["card_json_object"] = df.ai.generate_response(
    "Create a player card with the player's details and a motivational quote in JSON", 
    response_format={"type": "json_object"},  # Requires word "json" in the prompt
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

# Pydantic is a dependency of the OpenAI package, so it's available when openai is installed.
# You can also install Pydantic via `%pip install pydantic` if it's not already present.
from pydantic import BaseModel, Field

class PlayerCardSchema(BaseModel):
    name: str
    age: int
    sport: str
    position: str
    hometown: str
    stats: str = Field(description="Key performance metrics or achievements")
    motivational_quote: str

# response_format : pydantic BaseModel
df["card_pydantic"] = df.ai.generate_response(
    "Create a player card with the player's details and a motivational quote",
    response_format=PlayerCardSchema,
)

display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/generate-response-format-example-output.png" alt-text="Screenshot showing a data frame with a 'bio' column, and a new column for each specified format, with its corresponding formatted output." lightbox="../../media/ai-functions/generate-response-format-example-output.png":::

## Multimodal input

To generate responses from images, PDFs, or text files, mark file path columns as path inputs. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

For **Series-level** calls, set `column_type="path"`:

```python
# This code uses AI. Always review output for mistakes.

animal_urls = [
    "<image-url-golden-retriever>",  # Replace with URL to an image of a golden retriever
    "<image-url-giant-panda>",  # Replace with URL to an image of a giant panda
    "<image-url-bald-eagle>",  # Replace with URL to an image of a bald eagle
]
animal_df = pd.DataFrame({"file_path": animal_urls})

animal_df["animal_name"] = animal_df["file_path"].ai.generate_response(
    prompt="What type of animal is in this image? Give me only the animal's common name.",
    column_type="path",
)
display(animal_df)
```

For **DataFrame-level** calls, use `column_type_dict` to specify which columns contain file paths:

```python
# This code uses AI. Always review output for mistakes.

animal_df["description"] = animal_df.ai.generate_response(
    prompt="Describe this animal's natural habitat and one interesting fact about it.",
    column_type_dict={"file_path": "path"},
)
display(animal_df)
```

## Related content

- Use [ai.generate_response with PySpark](../pyspark/generate-response.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
