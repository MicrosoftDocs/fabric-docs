---
title: Use ai.extract with pandas
description: Learn how to scan input text and extract information by using the ai.extract function with pandas.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI functions
---

# Use ai.extract with pandas

The `ai.extract` function uses generative AI to scan input text and extract specific types of information designated by labels you choose (for example, locations or names). It uses only a single line of code.

> [!NOTE]
> - This article covers using *ai.extract* with pandas. To use *ai.extract* with PySpark, see [this article](../pyspark/extract.md).
> - See other AI functions in [this overview article](../overview.md).
> - Learn how to customize the [configuration of AI functions](./configuration.md).

## Overview

The `ai.extract` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To extract custom entity types from each row of input, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column.

Unlike other AI functions, `ai.extract` returns a pandas DataFrame, instead of a Series, with a separate column for each specified entity type that contains extracted values for each input row.

## Syntax

```python
df_entities = df["text"].ai.extract("entity1", "entity2", "entity3")
```

## Parameters

| Name | Description |
|---|---|
| `labels` <br> Required | One or more [strings](https://docs.python.org/3/library/stdtypes.html#str) that represent the set of entity types to extract from the input text values. |
| `aifunc.ExtractLabel` <br> Optional | One or more label definitions describing the fields to extract. For more information, refer to the ExtractLabel Parameters table. |

### ExtractLabel Parameters
| Name | Description |
|---|---|
| `label` <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) that represents the entity to extract from the input text values. |
| `description` <br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that adds extra context for the AI model. It can include requirements, context, or instructions for the AI to consider while performing the extraction. |
| `max_items` <br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that specifies the maximum number of items to extract for this label. |
| `type` <br> Optional | JSON schema type for the extracted value. Supported types for this class include `string`, `number`, `integer`, `boolean`, `object`, and `array`. |
| `properties` <br> Optional | More JSON schema properties for the type as a dictionary. It can include supported properties like "items" for arrays, "properties" for objects, "enum" for enum types, and more. [See Supported properties here](https://developers.openai.com/api/docs/guides/structured-outputs#supported-schemas).|
| `raw_col` <br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that sets the column name for the raw LLM response. The raw response provides a list of dictionary pairs for every entity label, including "reason" and "extraction_text". |

## Returns

The function returns a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) with a column for each specified entity type. The column or columns contain the entities extracted for each row of input text. If the function identifies more than one match for an entity, it returns only one of those matches. If no match is found, the result is `null`.

The default return type is a list of strings for each label. If users choose to specify a different type in the `aifunc.ExtractLabel` configuration, such as "type=integer", then the output will be a list of Python `int` values. If users specify "max_items=1" in the `aifunc.ExtractLabel` configuration, then only one element of the type is returned for that label.

## Example

# [labels only](#tab/labels)

```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([
        "MJ Lee lives in Tucson, AZ, and works as a software engineer for Contoso.",
        "Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey."
    ], columns=["descriptions"])

df_entities = df["descriptions"].ai.extract("name", "profession", "city")
display(df_entities)
```

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/extract-example-output.png" alt-text="Screenshot showing a new data frame with the columns 'name', 'profession',  and 'city', containing the data extracted from the original data frame." lightbox="../../media/ai-functions/extract-example-output.png":::

# [ExtractLabel](#tab/extract-label)
```python
# This code uses AI. Always review output for mistakes.

df = pd.DataFrame([
        "Alex Rivera, a 24-year-old midfielder from Barcelona, scored 12 goals last season, with an impressive 5 goals in one game.",
        "Jordan Smith, a 29-year-old striker from Manchester, scored exactly 1 goal in every game, for a total of 34 goals."
    ], columns=["bio"])

df["goals"] = df["bio"].ai.extract(
    aifunc.ExtractLabel(
        label = "goals", 
        description = "total goals only", 
        max_items = 1, 
        type = "integer"
    )
)
display(df)
```

This example code cell provides the following output:

:::image type="content" source="../../media/ai-functions/extract-extract-label-example-output.png" alt-text="Screenshot showing a data frame with the columns 'bio' and 'goals', containing the data extracted from the original data frame." lightbox="../../media/ai-functions/extract-extract-label-example-output.png":::

---

## Related content

- Use [ai.extract with PySpark](../pyspark/extract.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Generate vector embeddings with [ai.embed](./embed.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
