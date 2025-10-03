---
title: Use ai.similarity with pandas
description: Learn how to compare string values and calculate semantic similarity scores by using the ai.similarity function with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: erenorbey
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.similarity with pandas


The `ai.similarity` function uses generative AI to compare two string expressions and then calculate a semantic similarity score. It uses only a single line of code. You can compare text values from one column of a DataFrame with a single common text value or with pairwise text values in another column.

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
 > - By default, the *gpt-4.1-mini* model currently powers AI functions. Learn more about [billing and consumption rates](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with the built-in AI endpoint in Fabric.

> [!NOTE]
> - This article covers using *ai.similarity* with pandas. To use *ai.similarity* with PySpark, see [this article](../pyspark/similarity.md).
> - See additional AI functions in [this overview article](../overview.md).

## Overview

The `ai.similarity` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. 

To calculate the semantic similarity of each input row for a single common text value, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column. The function can also calculate the semantic similarity of each row for corresponding pairwise values in another column that has the same dimensions as the input column.

The function returns a pandas Series that contains similarity scores, which can be stored in a new DataFrame column.

## Syntax

# [Compare with a single value](#tab/similarity-single)

```python
df["similarity"] = df["col1"].ai.similarity("value")
```

# [Compare with pairwise values](#tab/similarity-pairwise)

```python
df["similarity"] = df["col1"].ai.similarity(df["col2"])
```

## Parameters

| Name | Description |
|---|---|
| **`other`** <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) that contains either: <br> - A single common text value, which is used to compute similarity scores for each input row. <br> - Another [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) with the same dimensions as the input. It contains text values to use to compute pairwise similarity scores for each input row. |

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains similarity scores for each input text row. The output similarity scores are relative, and they're best used for ranking. Score values can range from `-1` (opposites) to `1*` (identical). A score value of `0` indicates that the values are unrelated in meaning.

## Example

# [Compare with a single value](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([ 
        ("Bill Gates"), 
        ("Satya Nadella"), 
        ("Joan of Arc")
    ], columns=["name"])
    
df["similarity"] = df["name"].ai.similarity("Microsoft")
display(df)
```

# [Compare with pairwise values](#tab/similarity-pairwise)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([ 
        ("Bill Gates", "Microsoft"), 
        ("Satya Nadella", "Toyota"), 
        ("Joan of Arc", "Nike") 
    ], columns=["names", "companies"])
    
df["similarity"] = df["names"].ai.similarity(df["companies"])
display(df)
```

The example code cell with a single value provides the following output:
:::image type="content" source="../../media/ai-functions/similarity-single-example-output.png" alt-text="Screenshot showing a data frame with a 'name' column and a 'similarity' column. The 'similarity' column contains similarity scores for each input text row." lightbox="../../media/ai-functions/similarity-single-example-output.png":::

The example code cell with pairwise values provides the following output:
:::image type="content" source="../../media/ai-functions/similarity-pairwise-example-output.png" alt-text="Screenshot showing a data frame with a 'names' column, a 'companies' column, and a 'similarity' column. The 'similarity' column contains similarity scores for each name  for the corresponding value in the 'companies' column" lightbox="../../media/ai-functions/similarity-pairwise-example-output.png":::

## Related content

- Use [`ai.similarity` with PySpark](../pyspark/similarity.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Categorize text with [`ai.classify`](./classify.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
