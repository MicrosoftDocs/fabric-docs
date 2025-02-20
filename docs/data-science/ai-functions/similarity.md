---
title: Calculate similarity with the `ai.similarity` function
description: Learn how to use the `ai.similarity` function, which invokes Generative AI to compare two string values and calculate a semantic similarity score.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/20/2025

ms.search.form: AI functions
---

# Calculate similarity with the `ai.similarity` function

The `ai.similarity` function uses Generative AI to compare two string expressions and calculate a semantic similarity score—all in just a single line of code. You can compare text values from one column of a DataFrame with a single common text value or pairwise with text values in another column of the same dimensions as the input. Similarity scores range from -1 (opposites) to 1 (identical), with 0 indicating that the values are completely unrelated in meaning.

To learn more about the full set of AI functions, which unlock dynamic insights by putting the power of Fabric's native LLM into your hands, please visit [this overview article](ai-function-overview.md).

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

## Use `ai.similarity` with pandas

[TBD]

### Syntax

# [Comparing against a single value](#tab/similarity-single)

```python
df["similarity"] = df["col1"].ai.similarity("value")
```

# [Comparing column values pairwise](#tab/similarity-pairwise)

```python
df["similarity"] = df["col1"].ai.similarity(df["col2"])
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`other`** <br> Required | A [string](https://docs/python.org/3/library/stdtypes.html#str) containing a single common text value for computing similarity scores with each row of input text, or another [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) with the same dimensions as the input, containing text values for computing pairwise similarity scores with each row of input text. |

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) containing similarity scores for each row of input text.

### Example

# [Comparing against a single value](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([ 
        ("Bill Gates"), 
        ("Satya Nadella"), 
        ("Joan of Arc")
    ], columns=["name"])
    
df["similarity"] = df["name"].ai.similarity("Microsoft")
display(df)
```

# [Comparing column values pairwise](#tab/similarity-pairwise)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([ 
        ("Bill Gates", "Microsoft"), 
        ("Satya Nadella", "Toyota"), 
        ("Joan of Arc", "Nike") 
    ], columns=["names", "companies"])
    
df["similarity"] = df["names"].ai.similarity(df["companies"])
display(df)
```

---

## Use `ai.similarity` with PySpark

[TBD]

### Syntax

# [Comparing against a single value](#tab/similarity-single)

```python
df.ai.similarity(input_col="col1", other="value", output_col="similarity")
```

# [Comparing column values pairwise](#tab/similarity-pairwise)

```python
df.ai.similarity(input_col="col1", other_col="col2", output_col="similarity")
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of an existing column with input text values to be used for computing similarity scores |
| **`other`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing a single common text value for computing similarity scores |
| **`other_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a second existing column with text values for computing pairwise similarity scores |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) containing the name of a new column to store calculated similarity scores for each row of input text |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column containing generated similarity scores for each row of input text.

### Example

# [Comparing against a single value](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Bill Gates",), 
        ("Sayta Nadella",), 
        ("Joan of Arc",) 
    ], ["names"])

similarity = df.ai.similarity(input_col="names", other="Microsoft", output_col="similarity")
display(similarity)
```

# [Comparing column values pairwise](#tab/similarity-pairwise)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Bill Gates", "Microsoft"), 
        ("Satya Nadella", "Toyota"), 
        ("Joan of Arc", "Nike")
    ], ["names", "companies"])

similarity = df.ai.similarity(input_col="names", other_col="companies", output_col="similarity")
display(similarity)
```

---

## Related content

- Categorize text with [`ai.classify`](classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](analyze-sentiment.md).
- Extract entities with [`ai_extract`](extract.md).
- Fix grammar with [`ai.fix_grammar`](fix-grammar.md).
- Summarize text with [`ai.summarize`](summarize.md).
- Translate text with [`ai.translate`](translate.md).
- Answer custom user prompts with [`ai.generate_response`](generate-response.md).
- To learn more about the full set of AI functions, please visit [this overview article](ai-function-overview.md).
