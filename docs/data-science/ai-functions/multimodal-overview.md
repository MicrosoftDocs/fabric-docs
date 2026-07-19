---
title: Use multimodal input with AI Functions
description: Learn how to use file-based multimodal input, such as images, PDFs, and text files, with AI Functions in Microsoft Fabric.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 06/10/2026
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Use multimodal input with AI Functions (Preview)

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

AI Functions apply one-line, LLM-powered transformations to large pandas or PySpark DataFrames with high concurrency by default. With multimodal input, you can also process images, PDFs, and text files to classify documents, summarize PDFs, extract information from images, and more.

Use this table to jump to multimodal examples and detailed documentation.

| Function | Description | Detailed documentation |
| --- | --- | --- |
| `ai.analyze_sentiment` | Detect sentiment in files. [Example](#multimodal-ai-analyze-sentiment). | [pandas](./pandas/analyze-sentiment.md), [PySpark](./pyspark/analyze-sentiment.md) |
| `ai.classify` | Classify files by using your labels. [Example](#multimodal-ai-classify). | [pandas](./pandas/classify.md), [PySpark](./pyspark/classify.md) |
| `ai.extract` | Extract fields from files. [Example](#multimodal-ai-extract). | [pandas](./pandas/extract.md), [PySpark](./pyspark/extract.md) |
| `ai.fix_grammar` | Correct spelling, grammar, and punctuation in files. [Example](#multimodal-ai-fix-grammar). | [pandas](./pandas/fix-grammar.md), [PySpark](./pyspark/fix-grammar.md) |
| `ai.generate_response` | Generate responses grounded in file content. [Example](#multimodal-ai-generate-response). | [pandas](./pandas/generate-response.md), [PySpark](./pyspark/generate-response.md) |
| `ai.summarize` | Summarize file content. [Example](#multimodal-ai-summarize). | [pandas](./pandas/summarize.md), [PySpark](./pyspark/summarize.md) |
| `ai.translate` | Translate file content. [Example](#multimodal-ai-translate). | [pandas](./pandas/translate.md), [PySpark](./pyspark/translate.md) |
| `aifunc.load` | Load files from a folder into a structured table. [Example](#multimodal-aifunc-load). | [Syntax and parameters](#multimodal-aifunc-load) |
| `aifunc.list_file_paths` | Get file paths from a folder. [Example](#multimodal-aifunc-list-file-paths). | [Syntax and parameters](#multimodal-aifunc-list-file-paths) |
| `ai.infer_schema` | Infer an extraction schema from file contents. [Example](#multimodal-ai-infer-schema). | [Syntax and parameters](#multimodal-ai-infer-schema) |

## Supported file types

Multimodal AI Functions support the following file types:

- **Images**: jpg, jpeg, png, static gif, webp
- **Documents**: pdf
- **Text files**: md, txt, csv, tsv, json, xml, py, and other text files

> [!NOTE]
>
> - Multimodal calls with file-path inputs work with the `responses` API, which is the default. Don't set `api_type` to `chat_completions` for file-path inputs.
> - Office file formats (such as .docx, .pptx, and .xlsx) aren't currently supported.
> - You can convert .docx and .pptx files to PDF and .xlsx files to CSV before using them with multimodal AI Functions.
> - Each input file is limited to 50 MB in size.

## Supported URL protocols

Multimodal inputs are strings that use one of these URL protocols:

- local file paths
- http(s)
- wasbs
- abfs(s)

## Prerequisites

Multimodal AI Functions share the same prerequisites as text-based AI Functions. For the full list, see [Prerequisites](./overview.md#prerequisites).

## Set up your files

Organize your files in a folder that can be referenced by a path or a glob-style string.

> [!TIP]
> Use the [AI Functions Starter Notebooks](https://aka.ms/fabric-aifunctions-starter-notebooks) for end-to-end AI Functions examples that use all AI Functions. The starter notebooks include one notebook for pandas and one notebook for PySpark.

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

To use AI Functions with multimodal input, you can either load the file contents into a structured table or reference the file paths directly in your DataFrame. The following examples show both approaches.

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

Alternatively, you can use `aifunc.list_file_paths` to get a list of file paths from a folder and load them into a DataFrame column. This approach is useful when you want to run AI Functions across each file.

> [!NOTE]
> Most multimodal functions accept file paths with `column_type="path"` in pandas or `input_col_type`/`col_types="path"` in PySpark.

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

For **Series-level** AI Functions (operating on a single column), set the `column_type` parameter:

```python
df["result"] = df["file_path"].ai.analyze_sentiment(column_type="path")
```

For **DataFrame-level** AI Functions (operating on multiple columns), use the `column_type_dict` parameter:

```python
df["result"] = df.ai.generate_response(
    prompt="Describe the content.",
    column_type_dict={"file_path": "path"},
)
```

> [!NOTE]
> If you use `aifunc.list_file_paths()` to create your file path column, the returned `yarl.URL` objects are automatically detected as file paths. You only need to specify `column_type="path"` when your column contains plain string URLs.

# [PySpark](#tab/pyspark)

For **single-column** AI Functions, set the `input_col_type` parameter:

```python
results = df.ai.analyze_sentiment(input_col="file_path", input_col_type="path", output_col="sentiment")
```

For **DataFrame-level** AI Functions (operating on multiple columns), use the `col_types` parameter:

```python
results = df.ai.generate_response(
    prompt="Describe the content.",
    col_types={"file_path": "path"},
    output_col="response",
)
```

---

## New multimodal functions

<a id="multimodal-aifunc-load"></a>

### aifunc.load: Load files into a table

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
| --- | --- |
| `folder_path` (Required) | A string path to a folder or a glob-style pattern matching files. |
| `prompt` (Optional) | A string that guides the table generation process. Use it to specify which fields to extract from the files. |
| `schema` (Optional) | A schema object (returned by a previous `load` call) that defines the table structure. When provided, the function uses this schema directly. |

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

<a id="multimodal-aifunc-list-file-paths"></a>

### aifunc.list_file_paths: List files

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
| --- | --- |
| `folder_path` (Required) | A string path to a folder or a glob-style pattern matching files. |

#### Returns

# [pandas](#tab/pandas)

A [pandas Series](https://pandas.pydata.org/docs/reference/api/pandas.Series.html) of `yarl.URL` objects, indexed by their string representations. These `yarl.URL` objects are automatically treated as file paths by AI Functions, so you don't need to specify `column_type="path"`.

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

<a id="multimodal-ai-infer-schema"></a>

### ai.infer_schema: Infer schema from files

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
| --- | --- |
| `prompt` (Optional) | A string to guide schema inference. If not provided, the function infers the schema from the file contents alone. |
| `n_samples` (Optional) | An integer specifying how many items to sample for inference. Default is `3`. |
| `column_type` (Optional) | Set to `"path"` to treat column values as file paths. |

# [PySpark](#tab/pyspark)

| Name | Description |
| --- | --- |
| `input_col` (Required) | A string that contains the name of the column with file path values. |
| `input_col_type` (Optional) | Set to `"path"` to treat column values as file paths. |
| `prompt` (Optional) | A string to guide schema inference. If not provided, the function infers the schema from the file contents alone. |
| `n_samples` (Optional) | An integer specifying how many items to sample for inference. Default is `3`. |

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

## Use multimodal input with existing AI Functions

The following examples show how to use multimodal input with each of the supported AI Functions.

<a id="multimodal-ai-analyze-sentiment"></a>

### ai.analyze_sentiment: Detect sentiment from files

For full parameters, see [pandas](./pandas/analyze-sentiment.md) or [PySpark](./pyspark/analyze-sentiment.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

animal_urls = [
    "<image-url-golden-retriever>",  # Replace with URL to an image of a golden retriever
    "<image-url-giant-panda>",  # Replace with URL to an image of a giant panda
    "<image-url-bald-eagle>",  # Replace with URL to an image of a bald eagle
]
animal_df = pd.DataFrame({"file_path": animal_urls})

animal_df["sentiment"] = animal_df["file_path"].ai.analyze_sentiment(column_type="path")
display(animal_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

animal_urls = [
    "<image-url-golden-retriever>",  # Replace with URL to an image of a golden retriever
    "<image-url-giant-panda>",  # Replace with URL to an image of a giant panda
    "<image-url-bald-eagle>",  # Replace with URL to an image of a bald eagle
]
animal_df = spark.createDataFrame([(u,) for u in animal_urls], ["file_path"])

results = animal_df.ai.analyze_sentiment(
    input_col="file_path",
    input_col_type="path",
    output_col="sentiment",
)
display(results)
```

---

<a id="multimodal-ai-classify"></a>

### ai.classify: Classify files

For full parameters, see [pandas](./pandas/classify.md) or [PySpark](./pyspark/classify.md).

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

<a id="multimodal-ai-extract"></a>

### ai.extract: Extract entities from files

For full parameters, see [pandas](./pandas/extract.md) or [PySpark](./pyspark/extract.md).

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

<a id="multimodal-ai-fix-grammar"></a>

### ai.fix_grammar: Fix grammar in files

For full parameters, see [pandas](./pandas/fix-grammar.md) or [PySpark](./pyspark/fix-grammar.md).

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

<a id="multimodal-ai-generate-response"></a>

### ai.generate_response: Apply custom prompts to files

For full parameters, see [pandas](./pandas/generate-response.md) or [PySpark](./pyspark/generate-response.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

# Series-level: generate a response from each file
animal_df["animal_name"] = animal_df["file_path"].ai.generate_response(
    prompt="What type of animal is in this image? Give me only the animal's common name.",
    column_type="path",
)
display(animal_df)
```

```python
# This code uses AI. Always review output for mistakes.

# DataFrame-level: use all columns as context
animal_df["description"] = animal_df.ai.generate_response(
    prompt="Describe this animal's natural habitat and one interesting fact about it.",
    column_type_dict={"file_path": "path"},
)
display(animal_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

# Generate a response from each file
results = animal_df.ai.generate_response(
    prompt="What type of animal is in this image? Give me only the animal's common name.",
    col_types={"file_path": "path"},
    output_col="animal_name",
)
display(results)
```

```python
# This code uses AI. Always review output for mistakes.

# DataFrame-level: use all columns as context
results = animal_df.ai.generate_response(
    prompt="Describe this animal's natural habitat and one interesting fact about it.",
    col_types={"file_path": "path"},
    output_col="description",
)
display(results)
```

---

<a id="multimodal-ai-summarize"></a>

### ai.summarize: Summarize files

For full parameters, see [pandas](./pandas/summarize.md) or [PySpark](./pyspark/summarize.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

# Summarize file content from a single column
custom_df["summary"] = custom_df["file_path"].ai.summarize(
    instructions="Summarize this file in one sentence for a support analyst.",
    column_type="path",
)
display(custom_df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes.

# Summarize file content from a single column
results = custom_df.ai.summarize(
    instructions="Summarize this file in one sentence for a support analyst.",
    input_col="file_path",
    input_col_type="path",
    output_col="summary",
)
display(results)
```

---

You can summarize values across all columns in a DataFrame by omitting the input column and specifying file path columns with `column_type_dict` (pandas) or `col_types` (PySpark):

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

<a id="multimodal-ai-translate"></a>

### ai.translate: Translate files

For full parameters, see [pandas](./pandas/translate.md) or [PySpark](./pyspark/translate.md).

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

## Evaluate output quality

Use the [AI Functions Eval Notebooks](https://aka.ms/fabric-aifunctions-eval-notebooks) for structured workflows that use LLM-as-a-Judge to assess multimodal outputs and compute metrics such as accuracy, precision, recall, F1, coherence, consistency, and relevance. You can use these workflows to validate the quality of classification, extraction, summarization, and other AI function results before moving to production.

## Monitor cost and capacity usage

Use [Billing for AI Functions](./billing.md) to understand costs, runtime usage, and capacity monitoring.

## Related content

- Learn more about [AI Functions](./overview.md).
- Try the [AI Functions Starter Notebooks](https://aka.ms/fabric-aifunctions-starter-notebooks).
- Evaluate output quality with the [AI Functions Eval Notebooks](https://aka.ms/fabric-aifunctions-eval-notebooks).
- Customize AI Functions with [pandas](./pandas/configuration.md) or [PySpark](./pyspark/configuration.md).
- Understand [billing for AI Functions](./billing.md).
