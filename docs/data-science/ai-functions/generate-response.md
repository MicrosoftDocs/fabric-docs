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

The `ai.generate_response` function extends the [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class (unlike the other AI functions, which extend the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class). The function can be called on an entire pandas DataFrame. It returns a pandas Series containing custom text responses to a user-provided prompt for each row of input, which can be stored in a new column of the DataFrame.

### Syntax

# [Generating responses with a standard prompt](#tab/standard-prompt)

```python
df["response"] = df.ai.generate_response(prompt="Instructions for a custom response")
```

# [Generating responses with a template prompt](#tab/similarity-single)

```python
df["response"] = df.ai.generate_response(prompt="Instructions for a custom response based on specific {column1} and {column2} values", is_prompt_template=True)
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`prompt`** <br> Required | TBD |
| **`is_prompt_template`** <br> Optional | TBD |

### Returns

A [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing custom text responses to the prompt for each row of input text.

### Example

# [Generating responses with a standard prompt](#tab/standard-prompt)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        ("Sandals"),
        ("Polo shirts"),
        ("Water bottles")
    ], columns=["product"])

df["response"] = df.ai.generate_response("Write a snappy, enticing email subject line for a summer sale on the product.")
display(df)
```

# [Generating responses with a template prompt](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        ("001", "Sandals", "Flipflops", "2021"),
        ("002", "Polo shirts", "T-shirts", "2010"),
        ("003", "Water bottles", "Coolers", "2015")
    ], columns=["id", "product", "product_rec", "yr_introduced"])

df["response"] = df.ai.generate_response("Write a snappy, enticing email subject line for a summer sale on the {product}.", is_prompt_template=True)
display(df)
```

---

## Use `ai.generate_response` with PySpark

[TBD]

### Syntax

# [Generating responses with a standard prompt](#tab/standard-prompt)

```python
df.ai.generate_response(prompt="Instructions for a custom response", output_col="response")
```

# [Generating responses with a template prompt](#tab/similarity-single)

```python
df.ai.generate_response(prompt="Instructions for a custom response based on specific {column1} and {column2} values", is_prompt_template=True, output_col="response")
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`prompt`** <br> Required | TBD |
| **`is_prompt_template`** <br> Optional | TBD |
| **`output_col`** <br> Optional | TBD |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing custom text responses to the prompt for each row of text in the input column.

### Example

# [Generating responses with a standard prompt](#tab/standard-prompt)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Sandals",),
        ("Polo shirts",),
        ("Water bottles",)
    ], ["product"])

responses = df.ai.generate_response(prompt="Write a snappy, enticing email subject line for a summer sale on the product.", output_col="response")
display(responses)
```

# [Generating responses with a template prompt](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("001", "Sandals", "Flipflops", "2021"),
        ("002", "Polo shirts", "T-shirts", "2010"),
        ("003", "Water bottles", "Coolers", "2015")
    ], ["id", "product", "product_rec", "yr_introduced"])

responses = df.ai.generate_response(prompt="Write a snappy, enticing email subject line for a summer sale on the {product}.", is_prompt_template=True, output_col="response")
display(responses)
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
