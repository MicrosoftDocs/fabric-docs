---
title: Transform and Enrich Data with AI Functions
description: Learn how to transform and enrich data with lightweight, LLM-powered code by using AI functions in Microsoft Fabric.
ms.reviewer: vimeland
ms.topic: how-to
ms.date: 11/13/2025
ms.search.form: AI functions
ai-usage: ai-assisted
---

# Transform and enrich data with AI functions

Microsoft Fabric AI Functions enable all business professionals (from developers to analysts) to transform and enrich their enterprise data using generative AI.

AI functions use industry-leading large language models (LLMs) for summarization, classification, text generation, and more. With a single line of code, you can:

- [`ai.analyze_sentiment`](#detect-sentiment-with-aianalyze_sentiment): Detect the emotional state of input text.
- [`ai.classify`](#categorize-text-with-aiclassify): Categorize input text according to your labels.
- [`ai.embed`](#generate-vector-embeddings-with-aiembed): Generate vector embeddings for input text.
- [`ai.extract`](#extract-entities-with-aiextract): Extract specific types of information from input text (for example, locations or names).
- [`ai.fix_grammar`](#fix-grammar-with-aifix_grammar): Correct the spelling, grammar, and punctuation of input text.
- [`ai.generate_response`](#answer-custom-user-prompts-with-aigenerate_response): Generate responses based on your own instructions.
- [`ai.similarity`](#calculate-similarity-with-aisimilarity): Compare the meaning of input text with a single text value, or with text in another column.
- [`ai.summarize`](#summarize-text-with-aisummarize): Get summaries of input text.
- [`ai.translate`](#translate-text-with-aitranslate): Translate input text into another language.

You can incorporate these functions as part of data science and data engineering workflows, whether you're working with pandas or Spark. There's no detailed configuration and no complex infrastructure management. You don't need any specific technical expertise.

## Prerequisites

- To use AI functions with the built-in AI endpoint in Fabric, your administrator needs to enable [the tenant switch for Copilot and other features that are powered by Azure OpenAI](../../admin/service-admin-portal-copilot.md).
- Depending on your location, you might need to enable a tenant setting for cross-geo processing. Learn more about [available regions for Azure OpenAI Service](../../get-started/copilot-fabric-overview.md#available-regions-for-azure-openai-service).
- You need a paid Fabric capacity (F2 or higher, or any P edition).

> [!NOTE]
>
> - AI functions are supported in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
 > - Unless you configure a different model, AI functions default to *gpt-4.1-mini*. Learn more about [billing and consumption rates](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts."

### Models and providers

AI functions now support broader models and providers beyond the default Azure OpenAI models. You can configure AI functions to use:

- Azure OpenAI models
- Azure AI Foundry resources (including models such as Claude and LLaMA)

Model and provider selection is configurable through the AI functions configuration. For details on how to set up and configure different models and providers, see the configuration documentation for [pandas](./pandas/configuration.md) and [PySpark](./pyspark/configuration.md).

## Getting started with AI functions

AI Functions can be used with pandas (Python and PySpark runtimes), and with PySpark (PySpark runtime). The required installation and import steps for each are outlined in the following section, followed by the corresponding commands.

### Performance and concurrency

AI functions now execute with increased default concurrency of 200, allowing for faster parallel processing of AI operations. You can tune concurrency settings per workload to optimize performance based on your specific requirements. For more information on configuring concurrency and other performance-related settings, see the configuration documentation for [pandas](./pandas/configuration.md) and [PySpark](./pyspark/configuration.md).

### Install dependencies

- Pandas (Python runtime)
  - `synapseml_internal` and `synapseml_core` whl files installation required (commands provided in the following code cell)
  - `openai` package installation required (command provided in the following code cell)
- Pandas (PySpark runtime)
  - `openai` package installation required (command provided in the following code cell)
- PySpark (PySpark runtime)
  - No installation required

# [pandas (PySpark runtime)](#tab/pandas-pyspark)

```python
# The pandas AI functions package requires OpenAI version 1.99.5 or later
%pip install -q --force-reinstall openai==1.99.5 2>/dev/null
```

# [pandas (Python runtime)](#tab/pandas-python)

```python
# Install latest versions of AI functions library whl
!wget -q https://aka.ms/fabric-aifunctions-whl -O synapseml_internal-latest-py3-none-any.whl
!wget -q https://aka.ms/fabric-synapseml-core-whl -O synapseml_core-latest-py3-none-any.whl

# The pandas AI functions package requires OpenAI version 1.99.5 or later
%pip install -q --force-reinstall openai==1.99.5 synapseml_internal-latest-py3-none-any.whl synapseml_core-latest-py3-none-any.whl

```

---

### Import required libraries

The following code cell imports the AI functions library and its dependencies.

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

## Apply AI functions

Each of the following functions allows you to invoke the built-in AI endpoint in Fabric to transform and enrich data with a single line of code. You can use AI functions to analyze pandas DataFrames or Spark DataFrames.

> [!TIP]
> Learn how to [customize the configuration](./pandas/configuration.md) of AI functions.
> 
> **Advanced configuration**: When using gpt-5 family models, you can configure advanced options such as `reasoning_effort` and `verbosity`. See the configuration pages for [pandas](./pandas/configuration.md) and [PySpark](./pyspark/configuration.md) for details on how to set these options.

### Detect sentiment with ai.analyze_sentiment

The `ai.analyze_sentiment` function invokes AI to identify whether the emotional state expressed by input text is positive, negative, mixed, or neutral. If AI can't make this determination, the output is left blank. For more detailed instructions about the use of `ai.analyze_sentiment` with pandas, see [this article](./pandas/analyze-sentiment.md). For `ai.analyze_sentiment` with PySpark, see [this article](./pyspark/analyze-sentiment.md).

#### Optional parameters

The `ai.analyze_sentiment` function now supports additional optional parameters that allow you to customize the sentiment analysis behavior. These parameters provide more control over how sentiment is detected and reported. For details on available parameters, their descriptions, and default values, see the function-specific documentation for [pandas](./pandas/analyze-sentiment.md) and [PySpark](./pyspark/analyze-sentiment.md).

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

The `ai.extract` function supports structured label definitions through the ExtractLabel schema. You can provide labels with structured definitions that include not just the label name but also type information and attributes. This structured approach improves extraction consistency and allows the function to return correspondingly structured output columns. For example, you can specify labels with additional metadata to guide the extraction process more precisely. See the detailed documentation for [pandas](./pandas/extract.md) and [PySpark](./pyspark/extract.md) for examples of using structured labels.

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

The `ai.generate_response` function now supports a `response_format` parameter that allows you to request structured JSON output. You can specify `response_format='json'` to receive responses in JSON format. Additionally, you can provide a JSON schema to enforce a specific output structure, ensuring the generated response conforms to your expected data shape. This is particularly useful when you need predictable, machine-readable output from the AI function. For detailed examples and usage patterns, see the documentation for [pandas](./pandas/generate-response.md) and [PySpark](./pyspark/generate-response.md).

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

The `ai.summarize` function invokes AI to generate summaries of input text (either values from a single column of a DataFrame, or row values across all the columns). For more detailed instructions about the use of `ai.summarize` with pandas, see [this article](./pandas/summarize.md). For `ai.summarize` with PySpark, see [this article](./pyspark/summarize.md).

#### Customizing summaries with instructions

The `ai.summarize` function now supports an `instructions` parameter that allows you to steer the tone, length, and focus of the generated summaries. You can provide custom instructions to guide how the summary should be created, such as specifying a particular style, target audience, or level of detail. When instructions are not provided, the function uses default summarization behavior. For examples of using the `instructions` parameter, see the detailed documentation for [pandas](./pandas/summarize.md) and [PySpark](./pyspark/summarize.md).

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

## View usage statistics with ai.stats

Fabric AI functions provide a built-in way to inspect usage and execution statistics for any AI-generated Series or DataFrame. You can access these metrics by calling `ai.stats` on the result returned by an AI function.

`ai.stats` returns a DataFrame with the following columns:

- num_successful – Number of rows processed successfully by the AI function.
- num_exceptions – Number of rows that encountered an exception during execution. These rows are represented as instances of `aifunc.ExceptionResult`.
- num_unevaluated – Number of rows that were not processed because an earlier exception made it impossible to continue evaluation. These rows are instances of aifunc.NotEvaluatedResult.
- num_harmful – Number of rows blocked by the Azure OpenAI content filter. These rows are instances of `aifunc.FilterResult`.
- prompt_tokens – Total number of input tokens used for the AI function call.
- completion_tokens – Total number of output tokens generated by the model.

> [!TIP]
> You can call `ai.stats` on any Series or DataFrame returned by an AI function. This can help you track usage, understand error patterns, and monitor token consumption.

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

- Customize the [configuration of AI functions in pandas](./pandas/configuration.md) or the [configuration of AI functions in PySpark](./pyspark/configuration.md) .
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
