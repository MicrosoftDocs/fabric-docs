---
title: Answer custom user prompts with the `ai.generate_response` function
description: Learn how to use the `ai.generate_response` function, which invokes Generative AI to generate custom text responses based on your own instructions.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Answer custom user prompts with the `ai.generate_response` function

The `ai.generate_response` function uses Generative AI to generate custom text responses based on your own instructions—all in just a single line of code.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Use `ai.generate_response` with pandas

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        ("apple", "fruits"),
        ("blue", "colors"),
        ("lizard", "reptiles")
    ], columns=["example", "category"])

df["list"] = df.ai.gen("Complete this comma-separated list of 5 {category}: {example}, ", is_format=True)
display(df)
```

### Syntax

# [With a standard prompt](#tab/standard-prompt)

```python
TBD
```

# [With a template prompt](#tab/similarity-single)

```python
TBD
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`prompt`** <br> Required | TBD |
| **`is_prompt_template`** <br> Optional | TBD |
| **`output_col`** <br> Optional | TBD |

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing TBD TBD TBD.

### Example

# [With a standard prompt](#tab/standard-prompt)

```python
TBD
```

# [With a template prompt](#tab/similarity-single)

```python
TBD
```

---

## Use `ai.generate_response` with PySpark

[TBD]

### Syntax

# [With a standard prompt](#tab/standard-prompt)

```python
df.ai.generate_response(prompt="instructions", output_col="response")
```

# [With a template prompt](#tab/similarity-single)

```python
df.ai.generate_response(prompt="instructions", output_col="response")
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`prompt`** <br> Required | TBD |
| **`is_prompt_template`** <br> Optional | TBD |
| **`output_col`** <br> Optional | TBD |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing TBD TBD TBD.

### Example

# [With a standard prompt](#tab/standard-prompt)

```python
TBD
```

# [With a template prompt](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("apple", "fruits"),
        ("blue", "colors"),
        ("lizard", "reptile"),
    ], ["example", "category"])

results = df.ai.gen(template="Complete this comma separated list of 5 {category}: {example}, ", output_col="list")
display(results)
```

---

## Related content

- Calculate similarity with [`ai.similarity`](similarity.md).
- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
