---
title: Transform and Enrich Data with AI Functions
description: Learn how to transform and enrich data with lightweight, LLM-powered code by using AI Functions in Microsoft Fabric.
ms.reviewer: singhrana
reviewer: ranadeepsingh
ms.topic: how-to
ms.date: 06/10/2026
ms.search.form: AI Functions
ai-usage: ai-assisted
---

# Transform and enrich data with AI Functions

Microsoft Fabric AI Functions enable all business professionals (from developers to analysts) to transform and enrich their enterprise data using generative AI.

AI Functions use industry-leading large language models (LLMs) for summarization, classification, text generation, and more. With a single line of code, you can:

- [`ai.analyze_sentiment`](#detect-sentiment-with-aianalyze_sentiment): Detect the emotional state of input text.
- [`ai.classify`](#categorize-text-with-aiclassify): Categorize input text according to your labels.
- [`ai.embed`](#generate-vector-embeddings-with-aiembed): Generate vector embeddings for input text.
- [`ai.extract`](#extract-entities-with-aiextract): Extract specific types of information from input text (for example, locations or names).
- [`ai.fix_grammar`](#fix-grammar-with-aifix_grammar): Correct the spelling, grammar, and punctuation of input text.
- [`ai.generate_response`](#answer-custom-user-prompts-with-aigenerate_response): Generate responses based on your own instructions.
- [`ai.similarity`](#calculate-similarity-with-aisimilarity): Compare the meaning of input text with a single text value, or with text in another column.
- [`ai.summarize`](#summarize-text-with-aisummarize): Get summaries of input text.
- [`ai.translate`](#translate-text-with-aitranslate): Translate input text into another language.

You can incorporate these functions as part of data science and data engineering workflows, whether you're working with pandas or Spark. You can also use AI Functions in SQL queries and Dataflow Gen2. There's no detailed configuration and no complex infrastructure management. You don't need any specific technical expertise.

## Use AI Functions across Fabric experiences

AI Functions are available in multiple Fabric experiences:

- **Notebooks**: Use the pandas and PySpark APIs in this article to enrich DataFrames from data science and data engineering workflows.
- **Warehouse and SQL analytics endpoint**: Use [AI Functions in a warehouse or SQL analytics endpoint](../../data-warehouse/ai-functions.md) to call SQL-flavored functions such as `ai_summarize`, `ai_classify`, and `ai_generate_response` directly in T-SQL queries.
- **Dataflow Gen2**: Use [Fabric AI Prompt in Dataflow Gen2](../../data-factory/dataflow-gen2-ai-functions.md) to add AI-generated columns in Power Query.

## Use multimodal AI Functions

Multimodal AI Functions process images, PDFs, and text files alongside text data. Use them to summarize PDFs, classify images, extract fields from documents, and generate responses grounded in file content.

Supported file types include JPG/JPEG, PNG, static GIF, WebP, PDF, MD, TXT, CSV, TSV, JSON, XML, PY, and other text files. Most AI Functions can process file-path inputs when you set `column_type="path"` in pandas, or `input_col_type` or `col_types` in PySpark. For setup, examples, and helper functions, see [Use multimodal input with AI Functions](./multimodal-overview.md).

## Prerequisites

- To use AI Functions with the built-in AI endpoint in Fabric, your administrator needs to enable [the tenant switch for Copilot and other features that are powered by Azure OpenAI](../../admin/service-admin-portal-copilot.md).
- Depending on your location, you might need to enable a tenant setting for cross-geo processing. Learn more about [available regions for Azure OpenAI Service](../../fundamentals/copilot-fabric-overview.md#available-regions-for-azure-openai-service).
- You need a paid Fabric capacity (F2 or higher, or any P edition).

> [!NOTE]
>
> - AI Functions are supported in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
> - Python AI Functions for pandas and PySpark now default to `gpt-5-mini` with `reasoning_effort` set to `low`. Learn more about [billing and consumption rates](./billing.md).
> - AI Functions in Dataflow Gen2 and warehouse will receive the same model upgrade by the end of June 2026.
> - Although the underlying model can handle several languages, most AI Functions are optimized for English-language text.
> - AI Functions do not log or store user prompts, input data, outputs.

### Models and providers

AI Functions support broader models and providers beyond the default Azure OpenAI models. You can configure AI Functions to use any LLM that supports the `chat_completions` or `responses` API:

- Azure OpenAI models
- Microsoft Foundry models such as Qwen, Kimi, Grok, LLaMA, Mistral, and many more.

Model and provider selection is configurable through the AI Functions configuration. For details on how to set up and configure different models and providers, see the configuration documentation for [pandas](./pandas/configuration.md) and [PySpark](./pyspark/configuration.md).

## Getting started with AI Functions

AI Functions can be used with pandas (Python and PySpark runtimes), and with PySpark (PySpark runtime). The current production update uses SynapseML 1.1.3 and SynapseML-Internal 1.1.3.1 for AI Functions. The installation and import steps for each runtime are outlined in the following section.

### Performance and concurrency

AI Functions execute with a default concurrency of 200, allowing for faster parallel processing of AI operations. You can tune concurrency settings per workload to optimize performance based on your specific requirements. For more information on configuring concurrency and other performance-related settings, see the configuration documentation for [pandas](./pandas/configuration.md) and [PySpark](./pyspark/configuration.md).

### Install dependencies

- Pandas (Python runtime)
  - `synapseml_internal` and `synapseml_core` whl files are required.
  - The `openai` package isn't required for most pandas AI Functions usage. For the best pandas developer experience, you can install `openai` version 1.99.5 or later to use SDK-native client behavior and Pydantic response-format examples.
- Pandas (PySpark runtime)
  - No installation is required for most usage. You can optionally install `openai` version 1.99.5 or later to use SDK-native client behavior and Pydantic response-format examples.
- PySpark (PySpark runtime)
  - No installation required

# [pandas (PySpark runtime)](#tab/pandas-pyspark)

```python
# Optional: install openai version 1.99.5 or later for SDK-native client behavior.
%pip install -q openai 2>/dev/null
```

# [pandas (Python runtime)](#tab/pandas-python)

```python
# Install latest versions of AI Functions library whl
!wget -q https://aka.ms/fabric-aifunctions-whl -O synapseml_internal-latest-py3-none-any.whl
!wget -q https://aka.ms/fabric-synapseml-core-whl -O synapseml_core-latest-py3-none-any.whl

# openai version 1.99.5 or later is included for SDK-native client behavior.
# To keep the environment lightweight, remove "openai" from the install command.
%pip install -q openai synapseml_internal-latest-py3-none-any.whl synapseml_core-latest-py3-none-any.whl
```

---

### Import required libraries

The following code cell imports the AI Functions library and its dependencies.

# [pandas](#tab/pandas)

```python
# Required imports
import synapse.ml.aifunc as aifunc
import pandas as pd
```

# [PySpark](#tab/pyspark)

```python
import synapse.ml.spark.aifunc as aifunc

# SparkSession with accessor `spark` in PySpark environments is pre-setup and available for use
```

---

### Helper functions for file ingestion and schema

AI Functions include helper functions that streamline multimodal workflows by simplifying file ingestion and schema management:

- **`aifunc.load`**: Ingest files from a folder into a structured table. You can optionally provide a prompt to guide extraction or a schema for consistent structure.
- **`aifunc.list_file_paths`**: Enumerate file URLs and paths from a folder for use as input to any AI function.
- **`ai.infer_schema`**: Infer an extraction schema from file contents. The inferred schema is compatible with `ai.extract`, so you can pass it directly for structured data extraction.

For detailed syntax and examples, see [Use multimodal input with AI Functions](./multimodal-overview.md).

## Apply AI Functions

Each of the following functions allows you to invoke the built-in AI endpoint in Fabric to transform and enrich data with a single line of code. You can use AI Functions to analyze pandas DataFrames or Spark DataFrames. PySpark AI function calls (including `ai.extract`) run distributed across Fabric Spark clusters, enabling scalable processing of large datasets. For performance tuning options, see the [PySpark configuration](./pyspark/configuration.md) documentation.

> [!NOTE]
> Most AI Functions support file-path inputs via `column_type="path"` (pandas) or `input_col_type`/`col_types="path"` (PySpark). This enables direct processing of images and PDFs without loading raw bytes. For usage patterns, see [Use multimodal input with AI Functions](./multimodal-overview.md).

> [!TIP]
> Learn how to [customize the configuration](./pandas/configuration.md) of AI Functions.
>
> **Advanced configuration**: The default Python AI Functions model uses `gpt-5-mini` with `reasoning_effort="low"` and leaves `temperature` unset (`NOT_GIVEN`). For more sophisticated transformations, you can configure `gpt-5.1` or tune `reasoning_effort`. See the configuration pages for [pandas](./pandas/configuration.md) and [PySpark](./pyspark/configuration.md) for details on how to set these options.

### Detect sentiment with ai.analyze_sentiment

The `ai.analyze_sentiment` function invokes AI to identify whether the emotional state expressed by input text is positive, negative, mixed, or neutral. If AI can't make this determination, the output is left blank. For more detailed instructions about the use of `ai.analyze_sentiment` with pandas, see [this article](./pandas/analyze-sentiment.md). For `ai.analyze_sentiment` with PySpark, see [this article](./pyspark/analyze-sentiment.md).

#### Optional parameters

The `ai.analyze_sentiment` function supports additional optional parameters that allow you to customize the sentiment analysis behavior. These parameters provide more control over how sentiment is detected and reported. For details on available parameters, their descriptions, and default values, see the function-specific documentation for [pandas](./pandas/analyze-sentiment.md) and [PySpark](./pyspark/analyze-sentiment.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "The cleaning spray permanently stained my beautiful kitchen counter. Never again!",
        "I used this sunscreen on my vacation to Florida, and I didn't get burned at all. Would recommend.",
        "I'm torn about this speaker system. The sound was high quality, though it didn't connect to my roommate's phone.",
        "The umbrella is OK, I guess."
    ], columns=["reviews"])

df["sentiment"] = df["reviews"].ai.analyze_sentiment()
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("The cleaning spray permanently stained my beautiful kitchen counter. Never again!",),
        ("I used this sunscreen on my vacation to Florida, and I didn't get burned at all. Would recommend.",),
        ("I'm torn about this speaker system. The sound was high quality, though it didn't connect to my roommate's phone.",),
        ("The umbrella is OK, I guess.",)
    ], ["reviews"])

sentiment = df.ai.analyze_sentiment(input_col="reviews", output_col="sentiment")
display(sentiment)
```

---

:::image type="content" source="../media/ai-functions/analyze-sentiment-example-output.png" alt-text="Screenshot of a data frame with 'reviews' and 'sentiment' columns. The 'sentiment' column includes 'negative', 'positive', 'mixed', and 'neutral'." lightbox="../media/ai-functions/analyze-sentiment-example-output.png":::

### Categorize text with ai.classify

The `ai.classify` function invokes AI to categorize input text according to custom labels you choose. For more information about the use of `ai.classify` with pandas, go to [this article](./pandas/classify.md). For `ai.classify` with PySpark, see [this article](./pyspark/classify.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",
        "Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",
        "Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!"
    ], columns=["descriptions"])

df["category"] = df['descriptions'].ai.classify("kitchen", "bedroom", "garage", "other")
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",),
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",),
        ("Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!",)
    ], ["descriptions"])
    
categories = df.ai.classify(labels=["kitchen", "bedroom", "garage", "other"], input_col="descriptions", output_col="categories")
display(categories)
```

---

:::image type="content" source="../media/ai-functions/classify-example-output.png" alt-text="Screenshot of a data frame with 'descriptions' and 'category' columns. The 'category' column lists each description’s category name." lightbox="../media/ai-functions/classify-example-output.png":::

### Generate vector embeddings with ai.embed
The `ai.embed` function invokes AI to generate vector embeddings for input text. Vector embeddings are numerical representations of text that capture semantic meaning, making them useful for similarity search, retrieval workflows, and other machine learning tasks. The dimensionality of the embedding vectors depends on the selected model. For more detailed instructions about the use of `ai.embed` with pandas, see [this article](./pandas/embed.md). For `ai.embed` with PySpark, see [this article](./pyspark/embed.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",
        "Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",
        "Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!"
    ], columns=["descriptions"])
    
df["embed"] = df["descriptions"].ai.embed()
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",), 
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",), 
        ("Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!",) 
    ], ["descriptions"])

embed = df.ai.embed(input_col="descriptions", output_col="embed")
display(embed)
```

---

:::image type="content" source="../media/ai-functions/embed-example-output.png" alt-text="Screenshot of a data frame with columns 'descriptions' and 'embed'. The 'embed' column contains embed vectors for the descriptions." lightbox="../media/ai-functions/embed-example-output.png":::

### Extract entities with ai.extract

The `ai.extract` function invokes AI to scan input text and extract specific types of information that are designated by labels you choose (for example, locations or names). For more detailed instructions about the use of `ai.extract` with pandas, see [this article](./pandas/extract.md). For `ai.extract` with PySpark, see [this article](./pyspark/extract.md).

#### Structured labels

The `ai.extract` function supports structured label definitions through the `ExtractLabel` schema. You can provide labels with structured definitions that include not just the label name but also type information and attributes. Label definitions can combine simple label names (strings) with schema-bound objects via `ExtractLabel`. This structured approach improves extraction consistency and allows the function to return correspondingly structured output columns. For example, you can specify labels with additional metadata to guide the extraction process more precisely.

`ExtractLabel` accepts full JSON Schema definitions and enforces structure on extracted output. Supported schema constructs include typed fields, enums, arrays (via `items`), objects with `properties`, nullable values (for example, `type=["string", "null"]`), `required` properties, and `additionalProperties=false` to disallow extra fields. The returned columns (or structs) adhere to the provided schema. When a strict schema is provided (for example, with `required` properties or `additionalProperties=false`), outputs that don't conform are surfaced as exceptions in the result and reflected in `ai.stats`.

You can also author schemas as Pydantic models and convert them to JSON Schema for use with `ExtractLabel`. For detailed examples and usage patterns, see the documentation for [pandas](./pandas/extract.md) and [PySpark](./pyspark/extract.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "MJ Lee lives in Tucson, AZ, and works as a software engineer for Microsoft.",
        "Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey."
    ], columns=["descriptions"])

df_entities = df["descriptions"].ai.extract("name", "profession", "city")
display(df_entities)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("MJ Lee lives in Tucson, AZ, and works as a software engineer for Microsoft.",),
        ("Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey.",)
    ], ["descriptions"])

df_entities = df.ai.extract(labels=["name", "profession", "city"], input_col="descriptions")
display(df_entities)
```

---

:::image type="content" source="../media/ai-functions/extract-example-output.png" alt-text="Screenshot showing a new data frame with the columns 'name', 'profession',  and 'city', containing the data extracted from the original data frame." lightbox="../media/ai-functions/extract-example-output.png":::

### Fix grammar with ai.fix_grammar

The `ai.fix_grammar` function invokes AI to correct the spelling, grammar, and punctuation of input text. For more detailed instructions about the use of `ai.fix_grammar` with pandas, see [this article](./pandas/fix-grammar.md). For `ai.fix_grammar` with PySpark, see [this article](./pyspark/fix-grammar.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "There are an error here.",
        "She and me go weigh back. We used to hang out every weeks.",
        "The big picture are right, but you're details is all wrong."
    ], columns=["text"])

df["corrections"] = df["text"].ai.fix_grammar()
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("There are an error here.",),
        ("She and me go weigh back. We used to hang out every weeks.",),
        ("The big picture are right, but you're details is all wrong.",)
    ], ["text"])

corrections = df.ai.fix_grammar(input_col="text", output_col="corrections")
display(corrections)
```

---

:::image type="content" source="../media/ai-functions/fix-grammar-example-output.png" alt-text="Screenshot showing a  data frame with a 'text' column and a 'corrections' column, which has the text from the text column with corrected grammar." lightbox="../media/ai-functions/fix-grammar-example-output.png":::

### Answer custom user prompts with ai.generate_response

The `ai.generate_response` function invokes AI to generate custom text based on your own instructions. For more detailed instructions about the use of `ai.generate_response` with pandas, see [this article](./pandas/generate-response.md). For `ai.generate_response` with PySpark, see [this article](./pyspark/generate-response.md).

#### Optional parameters

The `ai.generate_response` function supports a `response_format` parameter that allows you to request structured JSON output. You can specify `response_format='json'` to receive responses in JSON format. Additionally, you can provide a JSON schema to enforce a specific output structure, ensuring the generated response conforms to your expected data shape. This is particularly useful when you need predictable, machine-readable output from the AI function. For detailed examples and usage patterns, see the documentation for [pandas](./pandas/generate-response.md) and [PySpark](./pyspark/generate-response.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        ("Scarves"),
        ("Snow pants"),
        ("Ski goggles")
    ], columns=["product"])

df["response"] = df.ai.generate_response("Write a short, punchy email subject line for a winter sale.")
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("Scarves",),
        ("Snow pants",),
        ("Ski goggles",)
    ], ["product"])

responses = df.ai.generate_response(prompt="Write a short, punchy email subject line for a winter sale.", output_col="response")
display(responses)
```

---

:::image type="content" source="../media/ai-functions/generate-response-simple-example-output.png" alt-text="Screenshot showing a data frame with columns 'product' and 'response'. The 'response' column contains a punchy subject line for the product." lightbox="../media/ai-functions/generate-response-simple-example-output.png":::

### Calculate similarity with ai.similarity

The `ai.similarity` function compares each input text value either to one common reference text or to the corresponding value in another column (pairwise mode). The output similarity score values are relative, and they can range from `-1` (opposites) to `1` (identical). A score of `0` indicates that the values are unrelated in meaning. For more detailed instructions about the use of `ai.similarity` with pandas, see [this article](./pandas/similarity.md). For `ai.similarity` with PySpark, see [this article](./pyspark/similarity.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([ 
        ("Bill Gates", "Technology"), 
        ("Satya Nadella", "Healthcare"), 
        ("Joan of Arc", "Agriculture") 
    ], columns=["names", "industries"])
    
df["similarity"] = df["names"].ai.similarity(df["industries"])
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("Bill Gates", "Technology"), 
        ("Satya Nadella", "Healthcare"), 
        ("Joan of Arc", "Agriculture")
    ], ["names", "industries"])

similarity = df.ai.similarity(input_col="names", other_col="industries", output_col="similarity")
display(similarity)
```

---

:::image type="content" source="../media/ai-functions/similarity-pairwise-example-output.png" alt-text="Screenshot of a data frame with columns 'names', 'industries', and 'similarity'. The 'similarity' column has similarity scores for the name and industry." lightbox="../media/ai-functions/similarity-pairwise-example-output.png":::

### Summarize text with ai.summarize

The `ai.summarize` function invokes AI to generate summaries of input text, supported file-based multimodal input, values from a single DataFrame column, or row values across all columns. For more detailed instructions about the use of `ai.summarize` with pandas, see [this article](./pandas/summarize.md). For `ai.summarize` with PySpark, see [this article](./pyspark/summarize.md).

#### Customizing summaries with instructions

The `ai.summarize` function supports an `instructions` parameter that allows you to steer the tone, length, and focus of the generated summaries. You can provide custom instructions to guide how the summary should be created, such as specifying a particular style, target audience, or level of detail. When instructions aren't provided, the function uses default summarization behavior. For examples of using the `instructions` parameter, see the detailed documentation for [pandas](./pandas/summarize.md) and [PySpark](./pyspark/summarize.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.

df= pd.DataFrame([
        ("Microsoft Teams", "2017",
        """
        The ultimate messaging app for your organization—a workspace for real-time 
        collaboration and communication, meetings, file and app sharing, and even the 
        occasional emoji! All in one place, all in the open, all accessible to everyone.
        """),
        ("Microsoft Fabric", "2023",
        """
        An enterprise-ready, end-to-end analytics platform that unifies data movement, 
        data processing, ingestion, transformation, and report building into a seamless, 
        user-friendly SaaS experience. Transform raw data into actionable insights.
        """)
    ], columns=["product", "release_year", "description"])

df["summaries"] = df["description"].ai.summarize()
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("Microsoft Teams", "2017",
        """
        The ultimate messaging app for your organization—a workspace for real-time 
        collaboration and communication, meetings, file and app sharing, and even the 
        occasional emoji! All in one place, all in the open, all accessible to everyone.
        """,),
        ("Microsoft Fabric", "2023",
        """
        An enterprise-ready, end-to-end analytics platform that unifies data movement, 
        data processing, ingestion, transformation, and report building into a seamless, 
        user-friendly SaaS experience. Transform raw data into actionable insights.
        """,)
    ], ["product", "release_year", "description"])

summaries = df.ai.summarize(input_col="description", output_col="summary")
display(summaries)
```

---

:::image type="content" source="../media/ai-functions/summarize-single-example-output.png" alt-text="Screenshot showing a data frame. The 'summaries' column has a summary of the 'description' column only, in the corresponding row." lightbox="../media/ai-functions/summarize-single-example-output.png":::

### Translate text with ai.translate

The `ai.translate` function invokes AI to translate input text to a new language of your choice. For more detailed instructions about the use of `ai.translate` with pandas, see [this article](./pandas/translate.md). For `ai.translate` with PySpark, see [this article](./pyspark/translate.md).

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 

df = pd.DataFrame([
        "Hello! How are you doing today?", 
        "Tell me what you'd like to know, and I'll do my best to help.", 
        "The only thing we have to fear is fear itself."
    ], columns=["text"])

df["translations"] = df["text"].ai.translate("spanish")
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 

df = spark.createDataFrame([
        ("Hello! How are you doing today?",),
        ("Tell me what you'd like to know, and I'll do my best to help.",),
        ("The only thing we have to fear is fear itself.",),
    ], ["text"])

translations = df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
display(translations)
```

---

:::image type="content" source="../media/ai-functions/translate-example-output.png" alt-text="Screenshot of a data frame with columns 'text' and 'translations'. The 'translations' column contains the text translated to Spanish." lightbox="../media/ai-functions/translate-example-output.png":::

## Chain PySpark AI Functions

PySpark AI Functions return DataFrames that keep the `df.ai` accessor bound to the result schema. You can chain AI transformations without materializing an intermediate DataFrame between calls.

```python
# This code uses AI. Always review output for mistakes.

output = (
    df
    .ai.summarize(input_col="review_text", output_col="summary")
    .ai.classify(
        labels=["service", "cleanliness", "location", "other"],
        input_col="summary",
        output_col="category",
    )
)
display(output)
```

## View usage statistics with ai.stats

Fabric AI Functions provide a built-in way to inspect usage and execution statistics for any AI-generated Series or DataFrame. You can access these metrics through `ai.stats` on the result returned by an AI function.

`ai.stats` returns a DataFrame with statistics such as:

- `num_successful`: Number of rows processed successfully by the AI function.
- `num_exceptions`: Number of rows that encountered an exception during execution. These rows are represented as instances of `aifunc.ExceptionResult`.
- `num_unevaluated`: Number of rows that weren't processed because an earlier exception made it impossible to continue evaluation. These rows are represented as instances of `aifunc.NotEvaluatedResult`.
- `num_harmful`: Number of rows blocked by the Azure OpenAI content filter. These rows are represented as instances of `aifunc.FilterResult`.
- `cached_tokens`: Total number of cached input tokens.
- `input_tokens`: Total number of input tokens used for the AI function call.
- `output_tokens`: Total number of output tokens generated by the model.
- `reasoning_tokens`: Total number of reasoning tokens used by reasoning models.
- `model`: Model deployment name used for the AI function call.

> [!TIP]
> You can access `ai.stats` on any Series or DataFrame returned by an AI function. This can help you track usage, understand error patterns, and monitor token consumption.

Rows that hit capacity limits are surfaced as instances of `aifunc.CapacityExceededResult`. In pandas workflows, use `aifunc.split_results` to separate successful outputs from nonresults, so you can inspect capacity-limited rows and retry them after capacity is available or the limit is addressed.

### Cost transparency

pandas AI Functions include a configurable progress bar. Set `progress_bar_mode="stats"` to show detailed token counts and capacity unit estimates during execution.

For PySpark AI Functions, use `df.ai.stats` on the result DataFrame to view token usage and execution statistics, including reasoning token counts.

For details, see the configuration documentation for [pandas](./pandas/configuration.md) and [PySpark](./pyspark/configuration.md).

The Fabric Capacity Metrics app includes a dedicated **AI Functions** operation that separates AI Functions usage from Spark and Dataflow Gen2, giving you clearer monitoring of AI-related capacity consumption. For more information, see [Billing for AI Functions](./billing.md).

## Evaluate and accelerate

Use the [AI Functions Starter Notebooks](https://aka.ms/fabric-aifunctions-starter-notebooks) for end-to-end AI Functions examples that use all AI Functions. The starter notebooks include one notebook for pandas and one notebook for PySpark. Use the [AI Functions Eval Notebooks](https://aka.ms/fabric-aifunctions-eval-notebooks) to assess output quality with LLM-as-a-Judge metrics such as accuracy, precision, recall, F1, coherence, consistency, and relevance before you deploy to production.

## Related content

- Detect sentiment with [`ai.analyze_sentiment in pandas`](./pandas/analyze-sentiment.md) or [`ai.analyze_sentiment in pyspark`](./pyspark/analyze-sentiment.md).
- Categorize text with [`ai.classify in pandas`](./pandas/classify.md) or [`ai.classify in PySpark`](./pyspark/classify.md).
- Generate vector embeddings with [`ai.embed in pandas`](./pandas/embed.md) or [`ai.embed in PySpark`](./pyspark/embed.md).
- Extract entities with [`ai.extract in pandas`](./pandas/extract.md) or [`ai.extract in PySpark`](./pyspark/extract.md).
- Fix grammar with [`ai.fix_grammar in pandas`](./pandas/fix-grammar.md) or [`ai.fix_grammar in PySpark`](./pyspark/fix-grammar.md).
- Answer custom user prompts with [`ai.generate_response in pandas`](./pandas/generate-response.md) or [`ai.generate_response in PySpark`](./pyspark/generate-response.md).
- Calculate similarity with [`ai.similarity in pandas`](./pandas/similarity.md) or [`ai.similarity in PySpark`](./pyspark/similarity.md).
- Summarize text with [`ai.summarize in pandas`](./pandas/summarize.md) or [`ai.summarize in PySpark`](./pyspark/summarize.md).
- Translate text with [`ai.translate in pandas`](./pandas/translate.md) or [`ai.translate in PySpark`](./pyspark/translate.md).
- Customize the [configuration of AI Functions in pandas](./pandas/configuration.md) or the [configuration of AI Functions in PySpark](./pyspark/configuration.md).
- Understand [billing for AI Functions](./billing.md).
- Use [multimodal input with AI Functions](./multimodal-overview.md) to process images, PDFs, and text files.
- Try the [AI Functions Starter Notebooks](https://aka.ms/fabric-aifunctions-starter-notebooks).
- Evaluate output quality with the [AI Functions Eval Notebooks](https://aka.ms/fabric-aifunctions-eval-notebooks).
- Use [AI Functions in a warehouse or SQL analytics endpoint](../../data-warehouse/ai-functions.md).
- Use [Fabric AI Prompt in Dataflow Gen2](../../data-factory/dataflow-gen2-ai-functions.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://community.fabric.microsoft.com/t5/Fabric-Ideas/idb-p/fbc_ideas).
