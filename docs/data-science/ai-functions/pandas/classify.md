---
title: Use ai.classify with pandas
description: Learn how to categorize input text according to custom labels by using the ai.classify function with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.classify with pandas

The `ai.classify` function uses generative AI to categorize input text according to custom labels you choose, with a single line of code.

See additional AI functions in [this overview article](../overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - By default, the *gpt-4o-mini* model currently powers AI functions. Learn more about [billing and consumption rates](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with the built-in AI endpoint in Fabric.

### Overview

The `ai.classify` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To assign user-provided labels to each input row, call the function on a text column of a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

The function returns a pandas Series that contains classification labels, which can be stored in a new DataFrame column.

> [!TIP]
> We recommend using the `ai.classify` function with at least two input labels.

### Syntax

```python
df["classification"] = df["input"].ai.classify("category1", "category2", "category3")
```

### Parameters

| Name | Description |
|---|---|
| **`labels`** <br> Required | One or more [strings](https://docs.python.org/3/library/stdtypes.html#str) that represent the set of classification labels to match to input text values. |

### Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains a classification label for each input text row. If a text value can't be classified, the corresponding label is `null`.

### Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([
        "This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",
        "Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",
        "Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!"
    ], columns=["descriptions"])

df["category"] = df['descriptions'].ai.classify("kitchen", "bedroom", "garage", "other")
display(df)
```

This example code cell provides the following output:
:::image type="content" source="../../media/ai-functions/classify-example-output.png" alt-text="Screenshot showing a data frame with a 'descriptions' column and a 'category' column. the 'category' column contains the category name of the description in the corresponding row." lightbox="../../media/ai-functions/classify-example-output.png":::

## Related content
- Use [`ai.classify` with PySpark](../pyspark/classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Calculate similarity with [`ai.similarity`](./similarity.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
