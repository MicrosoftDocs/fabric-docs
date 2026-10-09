---
title: Use ai.extract with PySpark
description: Learn how to scan input text and extract information by using the ai.extract function with PySpark.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use ai.extract with PySpark

The `ai.extract` function extracts fields such as names, locations, or custom entities from each input row.

> [!NOTE]
> - This article covers `ai.extract` with PySpark. For pandas, see [Use ai.extract with pandas](../pandas/extract.md).
> - For all AI Functions and prerequisites, see [AI Functions overview](../overview.md).
> - Change default configuration for [AI Functions with PySpark](./configuration.md).

## Overview

The `ai.extract` function is available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter, along with a list of entity types to extract from each row of text.

The function returns a new DataFrame, with a separate column for each specified entity type that contains extracted values for each input row.

### Schema-driven extraction

`aifunc.ExtractLabel` supports JSON Schema definitions for structured extraction. Beyond basic types (`string`, `number`, `integer`, and `boolean`), you can use:

- **Enums**: Constrain values to a fixed set (for example, `"enum": ["midfielder", "striker", "defender"]`).
- **Arrays**: Define element schemas via `items` (for example, `"type": "array", "items": {"type": "string"}`).
- **Objects with properties**: Specify nested fields with `properties` and their types.
- **Required fields**: Mark mandatory fields with `required` to ensure they're always present in the output.
- **No extra fields**: Set `additionalProperties=false` to prevent the model from returning fields outside the defined schema.
- **Nullable values**: Express nullable types (for example, `type=["string", "null"]`) for optional data.

When used in PySpark, `ai.extract` runs as a distributed Spark transformation across Fabric Spark partitions.

## Syntax

```python
from synapse.ml.spark import aifunc
```

> [!NOTE]
> The PySpark import path is `from synapse.ml.spark import aifunc`. For pandas, use `from synapse.ml import aifunc`.

```python
df.ai.extract(labels=["entity1", "entity2", "entity3"], input_col="input")
```

## Parameters

| Name | Description |
|---|---|
| `labels` <br> Required | An [array](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.ArrayType.html) of [strings](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that represents the set of entity types to extract from the text values in the input column. |
| `input_col` <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to scan for the custom entities. |
| `aifunc.ExtractLabel` <br> Optional | One or more label definitions describing the fields to extract. See [ExtractLabel parameters](#extractlabel-parameters). |
| `error_col` <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store any OpenAI errors that result from processing each input text row. If you don't set this parameter, a default name generates for the error column. If an input row has no errors, the value in this column is `null`. |

### ExtractLabel parameters

| Name | Description |
|---|---|
| `label` <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) that represents the entity to extract from the input text values. |
| `description` <br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that adds extra context for the AI model. It can include requirements, context, or instructions for the AI to consider while performing the extraction. |
| `max_items` <br> Optional | An [int](https://docs.python.org/3/library/functions.html#int) that specifies the maximum number of items to extract for this label. |
| `type` <br> Optional | JSON schema type for the extracted value. Supported types for this class include `string`, `number`, `integer`, `boolean`, `object`, and `array`. |
| `properties` <br> Optional | Additional JSON Schema properties for the type, such as `items`, `properties`, `enum`, `required`, and `additionalProperties`. Express nullable values with `type=["string", "null"]`. See [Structured Outputs: Supported schemas](https://developers.openai.com/api/docs/guides/structured-outputs#supported-schemas). |
| `raw_col` <br> Optional | A [string](https://docs.python.org/3/library/stdtypes.html#str) that sets the column name for the raw LLM response. The raw response provides a list of dictionary pairs for every entity label, including "reason" and "extraction_text". |

## Returns

The function returns a [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column for each specified entity type. The column or columns contain the entities extracted for each row of input text. If no match is found, the result is `null`.

The default return type is a list of strings for each label. When `max_items` isn't specified, multiple matches are returned as a list. If you specify a different type in the `aifunc.ExtractLabel` configuration (for example, `type="integer"`), the output is a list of values of that type. If you specify `max_items=1`, a single-element list is produced for that label. The element type of each list follows the schema you provide.

## Example

# [labels only](#tab/labels)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("MJ Lee lives in Tucson, AZ, and works as a software engineer for Contoso.",),
        ("Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey.",)
    ], ["descriptions"])

df_entities = df.ai.extract(labels=["name", "profession", "city"], input_col="descriptions")
display(df_entities)
```

Output:

:::image type="content" source="../../media/ai-functions/extract-example-output.png" alt-text="Screenshot showing a new data frame with the columns 'name', 'profession',  and 'city', containing the data extracted from the original data frame." lightbox="../../media/ai-functions/extract-example-output.png":::

## [ExtractLabel](#tab/extract-label)

```python
# This code uses AI. Always review output for mistakes.

df = spark.createDataFrame([
        ("Alex Rivera, a 24-year-old midfielder from Barcelona, scored 12 goals last season, with an impressive 5 goals in one game.",),
        ("Jordan Smith, a 29-year-old striker from Manchester, scored exactly 1 goal in every game, for a total of 34 goals.",)
    ], ["bio"])

df = df.ai.extract(
        aifunc.ExtractLabel(
            label = "goals", 
            description = "total goals only", 
            max_items = 1, 
            type = "integer"
        ), 
        input_col="bio"
    )
display(df)
```

Output:

:::image type="content" source="../../media/ai-functions/extract-extract-label-example-output.png" alt-text="Screenshot showing a data frame with the columns 'bio' and 'goals', containing the data extracted from the original data frame." lightbox="../../media/ai-functions/extract-extract-label-example-output.png":::

## [Schema-driven ExtractLabel](#tab/schema-extract-label)

The following example uses JSON Schema to extract structured player statistics:

```python
# This code uses AI. Always review output for mistakes.

df = spark.createDataFrame([
        ("Alex Rivera, a 24-year-old midfielder from Barcelona, scored 12 goals last season.",),
        ("Jordan Smith, a 29-year-old striker from Manchester, scored 34 goals in all competitions.",)
    ], ["bio"])

df = df.ai.extract(
        aifunc.ExtractLabel(
            label="player_stats",
            type="object",
            properties={
                "name": {"type": "string"},
                "position": {"type": "string", "enum": ["midfielder", "striker", "defender", "goalkeeper"]},
                "goals": {"type": "integer"}
            },
            required=["name", "goals"],
            additionalProperties=False,
            max_items=1,
        ),
        input_col="bio"
    )
display(df)
```

You can also extract arrays of structured objects. The following example extracts a list of skills, each constrained to an enum:

```python
# This code uses AI. Always review output for mistakes.

df = spark.createDataFrame([
        ("Jordan is skilled in Python, SQL, and machine learning.",),
        ("Alex specializes in data engineering and cloud architecture.",)
    ], ["profile"])

df = df.ai.extract(
        aifunc.ExtractLabel(
            label="skills",
            type="array",
            properties={
                "items": {"type": "string"}
            },
        ),
        input_col="profile"
    )
display(df)
```

The resulting DataFrame enforces the types and structure defined in the schema. Outputs that don't conform to a strict schema (for example, when `required` or `additionalProperties=false` is set) are surfaced as exceptions and reflected in `ai.stats`.

---

## Multimodal input

To extract fields from images, PDFs, or text files, set `input_col_type="path"`. For setup, see [Use multimodal input with AI Functions](../multimodal-overview.md).

```python
# This code uses AI. Always review output for mistakes.

extracted = custom_df.ai.extract(
    labels=[
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
    ],
    input_col="file_path",
    input_col_type="path",
)
display(extracted)
```

## Related content

- Use [ai.extract with pandas](../pandas/extract.md).
- Learn more about [AI Functions](../overview.md).
- Use [multimodal input with AI Functions](../multimodal-overview.md).
- Change default configuration for [AI Functions with PySpark](./configuration.md).
- Understand [billing for AI Functions](../billing.md).
