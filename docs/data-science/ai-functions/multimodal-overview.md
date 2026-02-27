---
title: Use multimodal input with AI functions
description: Learn how to use file-based multimodal input, such as images, PDFs, and text files, with AI functions in Microsoft Fabric.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 02/18/2026
ms.search.form: AI functions
ai-usage: ai-assisted
---

# Use multimodal input with AI functions (Preview)

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

AI functions can process files—images, PDFs, and text files—in addition to text. With multimodal input, you can classify documents, summarize PDFs, extract information from images, and more, all with the same AI function interface you already use for text.

Multimodal input works with these existing AI functions:

- [`ai.analyze_sentiment`](#detect-sentiment-from-files-with-aianalyze_sentiment)
- [`ai.classify`](#classify-files-with-aiclassify)
- [`ai.extract`](#extract-entities-from-files-with-aiextract)
- [`ai.fix_grammar`](#fix-grammar-in-files-with-aifix_grammar)
- [`ai.generate_response`](#answer-custom-prompts-from-files-with-aigenerate_response)
- [`ai.summarize`](#summarize-files-with-aisummarize)
- [`ai.translate`](#translate-files-with-aitranslate)

Multimodal input also introduces three new functions:

- [`aifunc.load`](#load-files-into-a-table-with-aifuncload): Load files from a folder and generate a structured table.
- [`aifunc.list_file_paths`](#list-files-with-aifunclist_file_paths): Get a collection of file paths from a folder.
- [`ai.infer_schema`](#infer-schema-from-files-with-aiinfer_schema): Infer a common schema from file contents.

## Supported file types

Multimodal AI functions support the following file types:

- **Images**: jpg, jpeg, png, static gif, webp
- **Documents**: pdf
- **Text files**: md, txt, csv, tsv, json, xml, py, and other text files

## Supported URL protocols

Multimodal inputs are provided as string with one of the following URL protocols:

- local file paths
- http(s)
- wasbs
- abfs(s)

## Prerequisites

Multimodal AI functions share the same prerequisites as text-based AI functions. For the full list, see [Prerequisites](./overview.md#prerequisites).

## Set up your files

Organize your files in a folder that can be referenced by a path or a glob-style string.

### Example
You can store files in a Lakehouse attached to your notebook.

# [pandas](#tab/pandas)

```python
folder_path = "/lakehouse/default/Files"
```

# [PySpark](#tab/pyspark)

```python
folder_path = "abfss://path_to_your_lakehouse"
# or
folder_path = "Files"
```

---

## Load your files
To use AI functions with multimodal input, you may either load the file contents into a structured table or reference the file paths directly in your DataFrame. The following examples show both approaches.

### Load files into a table
Use the `aifunc.load` function to read files from a folder and generate a structured table. The function can infer the table structure on its own, or you can provide a prompt to guide the extraction, or a schema for consistent structure. This approach is useful when you want the AI to extract specific information from the files and present it in a structured format.

# [pandas](#tab/pandas)

```python
df, schema = aifunc.load(folder_path)
# or
df, schema = aifunc.load(folder_path, prompt="Give me candidate's name and the most recent company they worked for.")
display(df)
```

# [PySpark](#tab/pyspark)

```python
df, schema = aifunc.load(folder_path)
# or
df, schema = aifunc.load(folder_path, prompt="Give me candidate's name and the most recent company they worked for.")
display(df)
```

---

### Load file paths into a column
Alternatively, you can use `aifunc.list_file_paths` to get a list of file paths from a folder and load them into a DataFrame column. This approach is useful when you want to run AI functions across each file.

# [pandas](#tab/pandas)

```python
file_path_series = aifunc.list_file_paths(folder_path)
df = pd.DataFrame({"file_path": file_path_series}).reset_index(drop=True)
display(df)
```
# [PySpark](#tab/pyspark)

```python
df = aifunc.list_file_paths(folder_path)
display(df)
```

---

> [!IMPORTANT]
> When your file paths are stored as string URLs in a DataFrame column, you must explicitly tell the AI function to treat the values as file paths rather than plain text.

# [pandas](#tab/pandas)

For **Series-level** AI functions (operating on a single column), set the `column_type` parameter:

```python
df["result"] = df["file_path"].ai.analyze_sentiment(column_type="path")
```

For **DataFrame-level** AI functions (operating on multiple columns), use the `column_type_dict` parameter:

```python
df["result"] = df.ai.generate_response(
    prompt="Describe the content.",
    column_type_dict={"file_path": "path"},
)
```

> [!NOTE]
> If you use `aifunc.list_file_paths()` to create your file path column, the returned `yarl.URL` objects are automatically detected as file paths. You only need to specify `column_type="path"` when your column contains plain string URLs.

# [PySpark](#tab/pyspark)

For **single-column** AI functions, set the `input_col_type` parameter:

```python
results = df.ai.analyze_sentiment(input_col="file_path", input_col_type="path", output_col="sentiment")
```

For **DataFrame-level** AI functions (operating on multiple columns), use the `col_types` parameter:

```python
results = df.ai.generate_response(
    prompt="Describe the content.",
    col_types={"file_path": "path"},
    output_col="response",
)
```

---

## New multimodal functions

### Load files into a table with aifunc.load

The `aifunc.load` function reads all files from a folder path and generates a structured table from their contents. You can optionally provide a prompt to guide the extraction, or a schema for consistent structure.

#### Syntax

# [pandas](#tab/pandas)

```python
df, schema = aifunc.load(folder_path, prompt=None, schema=None)
```

# [PySpark](#tab/pyspark)

```python
df, schema = aifunc.load(folder_path, prompt=None, schema=None)
```

---

#### Parameters

| Name | Description |
|---|---|
| `folder_path` <br> Required | A string path to a folder or a glob-style pattern matching files. |
| `prompt` <br> Optional | A string that guides the table generation process. Use it to specify which fields to extract from the files. |
| `schema` <br> Optional | A schema object (returned by a previous `load` call) that defines the table structure. When provided, the function uses this schema directly. |

#### Returns

A tuple of `(DataFrame, schema)`. The DataFrame contains the structured data extracted from the files. The schema can be reused in subsequent `load` calls for consistent results.

#### Example

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

# Basic load – let the AI infer the table structure
df, schema = aifunc.load(folder_path)
display(df)
```

```python
# This code uses AI. Always review output for mistakes.

# Guided load – provide a prompt to specify what to extract
guided_df, guided_schema = aifunc.load(
    folder_path,
    prompt="Give me candidate's name and the most recent company they worked for.",
)
display(guided_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

# Basic load – let the AI infer the table structure
df, schema = aifunc.load(folder_path)
display(df)
```

```python
# This code uses AI. Always review output for mistakes.

# Guided load – provide a prompt to specify what to extract
guided_df, guided_schema = aifunc.load(
    folder_path,
    prompt="Give me candidate's name and the most recent company they worked for.",
)
display(guided_df)
```

---

### List files with aifunc.list_file_paths

The `aifunc.list_file_paths` function fetches all valid file paths from a specified folder. You can use the returned file paths as input to any multimodal AI function. The function also supports glob-style patterns.

#### Syntax

# [pandas](#tab/pandas)

```python
file_path_series = aifunc.list_file_paths(folder_path)
```

# [PySpark](#tab/pyspark)

```python
file_path_df = aifunc.list_file_paths(folder_path)
```

---

#### Parameters

| Name | Description |
|---|---|
| `folder_path` <br> Required | A string path to a folder or a glob-style pattern matching files. |

#### Returns

# [pandas](#tab/pandas)

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) of `yarl.URL` objects, indexed by their string representations. These `yarl.URL` objects are automatically treated as file paths by AI functions, so you don't need to specify `column_type="path"`.

# [PySpark](#tab/pyspark)

A [Spark DataFrame](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html) with a `file_path` column containing the URLs of the matched files.

---

#### Example

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

file_path_series = aifunc.list_file_paths(folder_path)
custom_df = pd.DataFrame({"file_path": file_path_series}).reset_index(drop=True)
display(custom_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

custom_df = aifunc.list_file_paths(folder_path)
display(custom_df)
```

---

### Infer schema from files with ai.infer_schema

The `ai.infer_schema` function infers a common schema from file contents. The inferred schema is represented as a list of `aifunc.ExtractLabel` objects that you can pass directly to `ai.extract` for structured data extraction.

#### Syntax

# [pandas](#tab/pandas)

```python
schema = df["file_path"].ai.infer_schema(column_type="path")
```

# [PySpark](#tab/pyspark)

```python
schema = df.ai.infer_schema(input_col="file_path", input_col_type="path")
```

---

#### Parameters

# [pandas](#tab/pandas)

| Name | Description |
|---|---|
| `prompt` <br> Optional | A string to guide schema inference. If not provided, the function infers the schema from the file contents alone. |
| `n_samples` <br> Optional | An integer specifying how many items to sample for inference. Default is `3`. |
| `column_type` <br> Optional | Set to `"path"` to treat column values as file paths. |

# [PySpark](#tab/pyspark)

| Name | Description |
|---|---|
| `input_col` <br> Required | A string that contains the name of the column with file path values. |
| `input_col_type` <br> Optional | Set to `"path"` to treat column values as file paths. |
| `prompt` <br> Optional | A string to guide schema inference. If not provided, the function infers the schema from the file contents alone. |
| `n_samples` <br> Optional | An integer specifying how many items to sample for inference. Default is `3`. |

---

#### Returns

A list of `aifunc.ExtractLabel` objects that describe the inferred schema. You can pass this list to `ai.extract` to extract structured data from files.

#### Example

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

# Infer a schema from file contents
schema = df["file_path"].ai.infer_schema(column_type="path")
for label in schema:
    print(label)

# Use the inferred schema with ai.extract
extracted_df = df["file_path"].ai.extract(*schema, column_type="path")
display(extracted_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

# Infer a schema from file contents
schema = df.ai.infer_schema(input_col="file_path", input_col_type="path")
for label in schema:
    print(label)

# Use the inferred schema with ai.extract
extracted_df = df.ai.extract(labels=schema, input_col="file_path", input_col_type="path")
display(extracted_df)
```

---

## Use multimodal input with existing AI functions

The following examples show how to use multimodal input with each of the supported AI functions.

### Detect sentiment from files with ai.analyze_sentiment

For more information about `ai.analyze_sentiment`, see the detailed documentation for [pandas](./pandas/analyze-sentiment.md) and [PySpark](./pyspark/analyze-sentiment.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

pokemon_urls = [
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/145.png",
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png",
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png",
]
pokemon_df = pd.DataFrame({"file_path": pokemon_urls})

pokemon_df["sentiment"] = pokemon_df["file_path"].ai.analyze_sentiment(column_type="path")
display(pokemon_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

pokemon_urls = [
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/145.png",
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png",
    "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/006.png",
]
pokemon_df = spark.createDataFrame([(u,) for u in pokemon_urls], ["file_path"])

results = pokemon_df.ai.analyze_sentiment(
    input_col="file_path",
    input_col_type="path",
    output_col="sentiment",
)
display(results)
```

---

### Classify files with ai.classify

For more information about `ai.classify`, see the detailed documentation for [pandas](./pandas/classify.md) and [PySpark](./pyspark/classify.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

custom_df["highest_degree"] = custom_df["file_path"].ai.classify(
    "Master", "PhD", "Bachelor", "Other",
    column_type="path",
)
display(custom_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

results = custom_df.ai.classify(
    labels=["Master", "PhD", "Bachelor", "Other"],
    input_col="file_path",
    input_col_type="path",
    output_col="highest_degree",
)
display(results)
```

---

### Extract entities from files with ai.extract

For more information about `ai.extract`, see the detailed documentation for [pandas](./pandas/extract.md) and [PySpark](./pyspark/extract.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

extracted = custom_df["file_path"].ai.extract(
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
    column_type="path",
)
display(extracted)
```

# [PySpark](#tab/pyspark)

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

---

### Fix grammar in files with ai.fix_grammar

For more information about `ai.fix_grammar`, see the detailed documentation for [pandas](./pandas/fix-grammar.md) and [PySpark](./pyspark/fix-grammar.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

custom_df["corrections"] = custom_df["file_path"].ai.fix_grammar(column_type="path")
display(custom_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

results = custom_df.ai.fix_grammar(
    input_col="file_path",
    input_col_type="path",
    output_col="corrections",
)
display(results)
```

---

### Answer custom prompts from files with ai.generate_response

For more information about `ai.generate_response`, see the detailed documentation for [pandas](./pandas/generate-response.md) and [PySpark](./pyspark/generate-response.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

# Series-level: generate a response from each file
pokemon_df["trainer"] = pokemon_df["file_path"].ai.generate_response(
    prompt="Tell me the most famous trainer who used this Pokemon. Give me only the trainer's name.",
    column_type="path",
)
display(pokemon_df)
```

```python
# This code uses AI. Always review output for mistakes.

# DataFrame-level: use all columns as context
pokemon_df["story"] = pokemon_df.ai.generate_response(
    prompt="Tell me the original story about this Pokemon and its trainer.",
    column_type_dict={"file_path": "path"},
)
display(pokemon_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

# Generate a response from each file
results = pokemon_df.ai.generate_response(
    prompt="Tell me the most famous trainer who used this Pokemon. Give me only the trainer's name.",
    col_types={"file_path": "path"},
    output_col="trainer",
)
display(results)
```

```python
# This code uses AI. Always review output for mistakes.

# DataFrame-level: use all columns as context
results = pokemon_df.ai.generate_response(
    prompt="Is this pokemon larger than a human?",
    col_types={"file_path": "path"},
    output_col="is_larger_than_human",
)
display(results)
```

---

### Summarize files with ai.summarize

For more information about `ai.summarize`, see the detailed documentation for [pandas](./pandas/summarize.md) and [PySpark](./pyspark/summarize.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

# Summarize file content from a single column
custom_df["summary"] = custom_df["file_path"].ai.summarize(
    instructions="Talk like a pirate! You only have one minute",
    column_type="path",
)
display(custom_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

# Summarize file content from a single column
results = custom_df.ai.summarize(
    instructions="Talk like a pirate! You only have one minute",
    input_col="file_path",
    input_col_type="path",
    output_col="summary",
)
display(results)
```

---

You may summarize values across all columns in a DataFrame by omitting the input column and specifying file path columns with `column_type_dict` (pandas) or `col_types` (PySpark):

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

custom_df["summary"] = custom_df.ai.summarize(
    column_type_dict={"file_path": "path"},
)
display(custom_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

results = custom_df.ai.summarize(
    col_types={"file_path": "path"},
    output_col="summary",
)
display(results)
```

---

### Translate files with ai.translate

For more information about `ai.translate`, see the detailed documentation for [pandas](./pandas/translate.md) and [PySpark](./pyspark/translate.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

custom_df["chinese_version"] = custom_df["file_path"].ai.translate(
    "Chinese",
    column_type="path",
)
display(custom_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

results = custom_df.ai.translate(
    to_lang="Chinese",
    input_col="file_path",
    input_col_type="path",
    output_col="chinese_version",
)
display(results)
```

---

## Related content

- Learn more about the [full set of AI functions](./overview.md).
- Detect sentiment with [`ai.analyze_sentiment` in pandas](./pandas/analyze-sentiment.md) or [`ai.analyze_sentiment` in PySpark](./pyspark/analyze-sentiment.md).
- Categorize text with [`ai.classify` in pandas](./pandas/classify.md) or [`ai.classify` in PySpark](./pyspark/classify.md).
- Extract entities with [`ai.extract` in pandas](./pandas/extract.md) or [`ai.extract` in PySpark](./pyspark/extract.md).
- Fix grammar with [`ai.fix_grammar` in pandas](./pandas/fix-grammar.md) or [`ai.fix_grammar` in PySpark](./pyspark/fix-grammar.md).
- Answer custom user prompts with [`ai.generate_response` in pandas](./pandas/generate-response.md) or [`ai.generate_response` in PySpark](./pyspark/generate-response.md).
- Summarize text with [`ai.summarize` in pandas](./pandas/summarize.md) or [`ai.summarize` in PySpark](./pyspark/summarize.md).
- Translate text with [`ai.translate` in pandas](./pandas/translate.md) or [`ai.translate` in PySpark](./pyspark/translate.md).
- Customize the [configuration of AI functions in pandas](./pandas/configuration.md) or the [configuration of AI functions in PySpark](./pyspark/configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
