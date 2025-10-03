---
title: Use ai.fix_grammar with pandas
description: Learn how to correct the spelling, grammar, and punctuation of input text by using the ai.fix_grammar function with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.fix_grammar with pandas


The `ai.fix_grammar` function uses generative AI to correct the spelling, grammar, and punctuation of input text, with a single line of code.

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
 > - By default, the *gpt-4.1-mini* model currently powers AI functions. Learn more about [billing and consumption rates](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with the built-in AI endpoint in Fabric.

> [!NOTE]
> - This article covers using *ai.fix_grammar* with pandas. To use *ai.fix_grammar* with PySpark, see [this article](../pyspark/fix-grammar.md).
> - See additional AI functions in [this overview article](../overview.md).

## Overview

The `ai.fix_grammar` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To correct the spelling, grammar, and punctuation of each row of input, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column.

The function returns a pandas Series that contains corrected text values, which can be stored in a new DataFrame column.

## Syntax

```python
df["corrections"] = df["input"].ai.fix_grammar()
```

## Parameters

None

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains corrected text for each input text row. If the input text is `null`, the result is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([
        "There are an error here.",
        "She and me go weigh back. We used to hang out every weeks.",
        "The big picture are right, but you're details is all wrong."
    ], columns=["text"])

df["corrections"] = df["text"].ai.fix_grammar()
display(df)
```

This example code cell provides the following output:
:::image type="content" source="../../media/ai-functions/fix-grammar-example-output.png" alt-text="Screenshot showing a  data frame with a 'text' column and a 'corrections' column which has the text from the text column with corrected grammar." lightbox="../../media/ai-functions/fix-grammar-example-output.png":::

## Related content

- Use [`ai.fix-grammar` with PySpark](../pyspark/extract.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Categorize text with [`ai.classify`](./classify.md).
- Extract entities with [`ai_extract`](./extract.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Calculate similarity with [`ai.similarity`](./similarity.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
