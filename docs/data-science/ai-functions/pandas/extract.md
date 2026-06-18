---
title: Use ai.extract with pandas
description: Learn how to scan input text and extract information by using the ai.extract function with pandas.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.extract with pandas

The `ai.extract` function extracts fields such as names, locations, or custom entities from each input row.

> [!NOTE]
> - This article covers `ai.extract` with pandas. For PySpark, see [Use ai.extract with PySpark](../pyspark/extract.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with pandas](./configuration.md).

## Overview

The `ai.extract` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To extract custom entity types from each row of input, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column.

Unlike other AI Functions, `ai.extract` returns a pandas DataFrame, instead of a Series, with a separate column for each specified entity type that contains extracted values for each input row.

## Syntax

```python
df_entities = df["text"].ai.extract("entity1", "entity2", "entity3")
```

## Parameters

| Name | Description |
|---|---|
| `labels` <br> Required | One or more [strings](https://docs.python.org/3/library/stdtypes.html#str) that represent the set of entity types to extract from the input text values. |
| `aifunc.ExtractLabel` <br> Optional | One or more label definitions describing the fields to extract. See [ExtractLabel parameters](#extractlabel-parameters). |

### ExtractLabel parameters

| Name | Description |
|---|---|
| `label` <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) that represents the entity to extract from the input text values. |
| `description` <br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that adds extra context for the AI model. It can include requirements, context, or instructions for the AI to consider while performing the extraction. |
| `max_items` <br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that specifies the maximum number of items to extract for this label. |
| `type` <br> Optional | JSON schema type for the extracted value. Supported types for this class include `string`, `number`, `integer`, `boolean`, `object`, and `array`. |
| `properties` <br> Optional | Additional JSON Schema properties for the type, such as `items`, `properties`, and `enum`. See [Structured Outputs: Supported schemas](https://developers.openai.com/api/docs/guides/structured-outputs#supported-schemas). |
| `raw_col` <br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that sets the column name for the raw LLM response. The raw response provides a list of dictionary pairs for every entity label, including "reason" and "extraction_text". |

> [!TIP]
> Use `ai.infer_schema` to infer a label schema from file contents and pass the returned `aifunc.ExtractLabel` objects directly to `ai.extract`. For examples, see [Use multimodal input with AI Functions](../multimodal-overview.md).

## Returns

The function returns a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) with a column for each specified entity type. The column or columns contain the entities extracted for each row of input text. If the function identifies more than one match for an entity, it returns only one of those matches. If no match is found, the result is `null`.

The default return type is a list of strings for each label. If you set a type in `aifunc.ExtractLabel`, such as `type="integer"`, the output is a list of Python `int` values. If you set `max_items=1`, the function returns one value for that label.

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

Output:

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

Output:

:::image type="content" source="../../media/ai-functions/extract-extract-label-example-output.png" alt-text="Screenshot showing a data frame with the columns 'bio' and 'goals', containing the data extracted from the original data frame." lightbox="../../media/ai-functions/extract-extract-label-example-output.png":::

---

## Multimodal input

To extract fields from images, PDFs, or text files, set `column_type="path"` when the input column contains plain string file paths. File paths returned by `aifunc.list_file_paths()` are detected automatically. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

extracted = custom_df["file_path"].ai.extract(
    aifunc.ExtractLabel(
        "name",
        description="The full name of the candidate, first letter capitalized.",
        max_items=1,
    ),
    "companies_worked_for",
    aifunc.ExtractLabel(
        "year_of_experience",
        description="The total years of professional work experience the candidate has, excluding internships.",
        type="integer",
        max_items=1,
    ),
    column_type="path",
)
display(extracted)
```

## Related content

- Use [ai.extract with PySpark](../pyspark/extract.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with pandas](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
