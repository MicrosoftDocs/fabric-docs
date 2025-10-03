---
title: Use ai.translate with pandas
description: Learn how to use the ai.translate function to translate input text into a new language of your choice with pandas.
ms.author: jburchel
author: jonburchel
ms.reviewer: vimeland
reviewer: virginiaroman
ms.topic: how-to
ms.date: 09/19/2025
ms.search.form: AI functions
---

# Use ai.translate with pandas


The `ai.translate` function uses generative AI to translate input text into a new language (of your choice), with a single line of code.

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
 > - By default, the *gpt-4.1-mini* model currently powers AI functions. Learn more about [billing and consumption rates](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with the built-in AI endpoint in Fabric.

> [!NOTE]
> - This article covers using *ai.translate* with pandas. To use *ai.translate* with PySpark, see [this article](../pyspark/translate.md).
> - See additional AI functions in [this overview article](../overview.md).

## Overview

The `ai.translate` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. To translate each input row into a target language of your choice, call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column.

The function returns a pandas Series that contains translations, which you can store in a new DataFrame column.

> [!TIP]
> The `ai.translate` function was tested with 10 languages: Czech, English, Finnish, French, German, Greek, Italian, Polish, Spanish, and Swedish. Your results with other languages might vary.

## Syntax

```python
df["translations"] = df["text"].ai.translate("target_language")
```

## Parameters

| Name | Description |
|---|---|
| `to_lang` <br> Required | A [string](https://docs.python.org/3/library/stdtypes.html#str) representing the target language for text translations. |

## Returns

The function returns a [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains translations for each row of input text. If the input text is `null`, the result is `null`.

## Example

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
display(df)
```

This example code cell provides the following output:
:::image type="content" source="../../media/ai-functions/translate-example-output.png" alt-text="Screenshot showing a data frame with a 'text' column and a 'translations' column. The 'translations' column contains the English text in the 'text' column, translated in Spanish." lightbox="../../media/ai-functions/translate-example-output.png":::

## Related content

- Use [`ai.translate` with PySpark](../pyspark/translate.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Categorize text with [`ai.classify`](./classify.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- - Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Calculate similarity with [`ai.similarity`](./similarity.md).
- Summarize text with [`ai.summarize`](./summarize.md).

- Learn more about the [full set of AI functions](../overview.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
