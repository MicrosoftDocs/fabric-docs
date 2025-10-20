---
title: Use ai.extract with pandas
description: Learn how to scan input text and extract information by using the ai.extract function with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.extract with pandas

The `ai.extract` function uses generative AI to scan input text and extract specific types of information designated by labels you choose (for example, locations or names). It uses only a single line of code.

> [!NOTE]
> - This article covers using *ai.extract* with pandas. To use *ai.extract* with PySpark, see [this article](../pyspark/extract.md).
> - See additional AI functions in [this overview article](../overview.md).
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

## Returns

The function returns a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) with a column for each specified entity type. The column or columns contain the entities extracted for each row of input text. If the function identifies more than one match for an entity, it returns only one of those matches. If no match is found, the result is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([
        "MJ Lee lives in Tuscon, AZ, and works as a software engineer for Microsoft.",
        "Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey."
    ], columns=["descriptions"])

df_entities = df["descriptions"].ai.extract("name", "profession", "city")
display(df_entities)
```

This example code cell provides the following output:
:::image type="content" source="../../media/ai-functions/extract-example-output.png" alt-text="Screenshot showing a new data frame with a 'name' column, a 'profession' column,  and a 'city' column. Each column contains the corresponding data extracted from the original data frame." lightbox="../../media/ai-functions/extract-example-output.png":::

## Related content

- Use [ai.extract with PySpark](../pyspark/extract.md).
- Detect sentiment with [ai.analyze_sentiment](./analyze-sentiment.md).
- Categorize text with [ai.classify](./classify.md).
- Fix grammar with [ai.fix_grammar](./fix-grammar.md).
- Answer custom user prompts with [ai.generate_response](./generate-response.md).
- Calculate similarity with [ai.similarity](./similarity.md).
- Summarize text with [ai.summarize](./summarize.md).
- Translate text with [ai.translate](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
