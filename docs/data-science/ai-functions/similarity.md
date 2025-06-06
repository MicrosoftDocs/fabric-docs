---
title: Calculate similarity with the `ai.similarity` function
description: Learn how to use the `ai.similarity` function to compare string values and calculate semantic similarity scores.
ms.author: scottpolly
author: s-polly
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Calculate similarity with the `ai.similarity` function

The `ai.similarity` function uses Generative AI to compare two string expressions and then calculate a semantic similarity score—all with a single line of code. You can compare text values from one column of a DataFrame with a single common text value or with pairwise text values in another column.

AI functions turbocharge data engineering by putting the power of Fabric's built-in large languages models into your hands. To learn more, visit [this overview article](./overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../get-started/preview.md), for use in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and higher.
>
> - Review the prerequisites in [this overview article](./overview.md), including the [library installations](./overview.md#getting-started-with-ai-functions) that are temporarily required to use AI functions.
> - By default, AI functions are currently powered by the **gpt-3.5-turbo (0125)** model. To learn more about billing and consumption rates, visit [this article](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with Fabric's built-in AI endpoint.

## Use `ai.similarity` with pandas

The `ai.similarity` function extends the [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) class. Call the function on a [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) text column to calculate the semantic similarity of each input row with respect to a single common text value. Alternatively, the function can calculate the semantic similarity of each row with respect to corresponding pairwise values in another column that has the same dimensions as the input column.

The function returns a pandas Series containing similarity scores, which can be stored in a new DataFrame column.

### Syntax

# [Comparing with a single value](#tab/similarity-single)

```python
df["similarity"] = df["col1"].ai.similarity("value")
```

# [Comparing with pairwise values](#tab/similarity-pairwise)

```python
df["similarity"] = df["col1"].ai.similarity(df["col2"])
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`other`** <br> Required | Either a [string](https://docs.python.org/3/library/stdtypes.html#str) that contains a single common text value, which is used to compute similarity scores for each input row, OR another [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) with the same dimensions as the input, which contains text values that are used to compute pairwise similarity scores for each input row. |

### Returns

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) that contains similarity scores for each input text row. The output similarity scores are relative, and they're best used for ranking. Scores can range from **-1** (opposites) to **1** (identical). A score of **0** indicates that the values are unrelated in meaning.

### Example

# [Comparing with a single value](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = pd.DataFrame([ 
        ("Bill Gates"), 
        ("Satya Nadella"), 
        ("Joan of Arc")
    ], columns=["name"])
    
df["similarity"] = df["name"].ai.similarity("Microsoft")
display(df)
```

# [Comparing with pairwise values](#tab/similarity-pairwise)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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

The `ai.similarity` function is also available for [Spark DataFrames](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html). You must specify the name of an existing input column as a parameter. You must also specify a single common text value for comparisons, or the name of another column for pairwise comparisons.

The function returns a new DataFrame, with similarity scores for each row of input text stored in an output column.

### Syntax

# [Comparing with a single value](#tab/similarity-single)

```python
df.ai.similarity(input_col="col1", other="value", output_col="similarity")
```

# [Comparing with pairwise values](#tab/similarity-pairwise)

```python
df.ai.similarity(input_col="col1", other_col="col2", output_col="similarity")
```

---

### Parameters

| **Name** | **Description** |
|---|---|
| **`input_col`** <br> Required | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of an existing column with input text values to be used for computing similarity scores. |
| **`other`** or **`other_col`** <br> Required | Only one of these parameters is required. The `other` parameter is a [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains a single common text value used to compute similarity scores with respect to each row of input. The `other_col` parameter is a [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that designates the name of a second existing column, with text values used to compute pairwise similarity scores. |
| **`output_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column to store calculated similarity scores for each input text row. If this parameter isn't set, a default name is generated for the output column. |
| **`error_col`** <br> Optional | A [string](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.types.StringType.html) that contains the name of a new column that stores any OpenAI errors that result from processing each input text row. If this parameter isn't set, a default name is generated for the error column. If an input row has no errors, this column has a `null` value. |

### Returns

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a new column that contains generated similarity scores for each input text row. The output similarity scores are relative, and they're best used for ranking. Scores can range from **-1** (opposites) to **1** (identical). A score of **0** indicates that the values are unrelated in meaning.

### Example

# [Comparing with a single value](#tab/similarity-single)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Bill Gates",), 
        ("Sayta Nadella",), 
        ("Joan of Arc",) 
    ], ["names"])

similarity = df.ai.similarity(input_col="names", other="Microsoft", output_col="similarity")
display(similarity)
```

# [Comparing with pairwise values](#tab/similarity-pairwise)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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

- Categorize text with [`ai.classify`](./classify.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Learn more about the full set of AI functions [here](./overview.md).
- Learn how to customize the configuration of AI functions [here](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
