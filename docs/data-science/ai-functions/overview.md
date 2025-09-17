---
title: Transform and Enrich Data with AI Functions
description: Learn how to transform and enrich data with lightweight, LLM-powered code by using AI functions in Microsoft Fabric.
ms.author: jburchel
author: jonburchel
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 05/18/2025
ms.search.form: AI functions
---

# Transform and enrich data with AI functions (preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

With Microsoft Fabric, all business professionals (from developers to analysts) can get more value from their enterprise data through Generative AI. They can use experiences like [Copilot](../../get-started/copilot-notebooks-overview.md) and [Fabric data agents](../how-to-create-data-agent.md). Because of a new set of AI functions for data engineering, Fabric users can take advantage of industry-leading large language models (LLMs) to transform and enrich data.

AI functions use the power of generative AI for summarization, classification, text generation, and more. With a single line of code, users can:

- [Calculate similarity with `ai.similarity`](#calculate-similarity-with-aisimilarity): Compare the meaning of input text with a single common text value, or with corresponding text values in another column.
- [Categorize text with `ai.classify`](#categorize-text-with-aiclassify): Classify input text values according to labels you choose.
- [Detect sentiment with `ai.analyze_sentiment`](#detect-sentiment-with-aianalyze_sentiment): Identify the emotional state expressed by input text.
- [Extract entities with `ai.extract`](#extract-entities-with-aiextract): Find and extract specific types of information from input text (for example, locations or names).
- [Fix grammar with `ai.fix_grammar`](#fix-grammar-with-aifix_grammar): Correct the spelling, grammar, and punctuation of input text.
- [Summarize text with `ai.summarize`](#summarize-text-with-aisummarize): Get summaries of input text.
- [Translate text with `ai.translate`](#translate-text-with-aitranslate): Translate input text into another language.
- [Answer custom user prompts with `ai.generate_response`](#answer-custom-user-prompts-with-aigenerate_response): Generate responses based on your own instructions.

You can incorporate these functions as part of data-science and data-engineering workflows, whether you're working with pandas or Spark. There's no detailed configuration and no complex infrastructure management. You don't need any specific technical expertise.

## Prerequisites

- To use AI functions with the built-in AI endpoint in Fabric, your administrator needs to enable [the tenant switch for Copilot and other features that are powered by Azure OpenAI](../../admin/service-admin-portal-copilot.md).
- Depending on your location, you might need to enable a tenant setting for cross-geo processing. Learn more about [available regions for Azure OpenAI Service](../../get-started/copilot-fabric-overview.md#available-regions-for-azure-openai-service).
- You need a paid Fabric capacity (F2 or higher, or any P edition). Bring-your-own Azure OpenAI resources aren't supported on the Fabric trial edition.

> [!IMPORTANT]
>
> The Fabric trial edition doesn't support bring-your-own Azure OpenAI resources for AI functions. To connect a custom Azure OpenAI endpoint, upgrade to an F2 (or higher) or P capacity.

> [!NOTE]
>
> - AI functions are supported in [Fabric Runtime 1.3](../../data-engineering/runtime-1-3.md) and later.
> - Unless you configure a different model, AI functions default to *gpt-4o-mini (2024-07-18)*. Learn more about [billing and consumption rates](../ai-services/ai-services-overview.md).
> - Most of the AI functions are optimized for use on English-language texts.

## Getting started with AI functions

- Pandas AI Functions:
  - pandas AI functions require `openai` package to be installed regardless of the runtime.
  - In Python only runtime, you need to install the `synapseml_internal` and `synapseml_core` whl files using the installation commands provided below.
  - In PySpark runtime, AI functions are preinstalled.

- PySpark AI Functions
  - No package installation is required for PySpark AI functions.

The following code cells include all the necessary installation commands.

# [pandas (PySpark environment)](#tab/pandas-pyspark)

```python
# The pandas AI functions package requires OpenAI version 1.99.5 or later
%pip install -q --force-reinstall openai==1.99.5 2>/dev/null

# AI functions are preinstalled on the Fabric PySpark runtime
```

# [pandas (Python environment)](#tab/pandas-python)

```python
# The pandas AI functions package requires OpenAI version 1.99.5 or later
%pip install -q --force-reinstall openai==1.99.5 synapseml_internal-latest-py3-none-any.whl synapseml_core-latest-py3-none-any.whl

# Install latest versions of AI functions library whl
!wget -q https://aka.ms/fabric-aifunctions-whl -O synapseml_internal-latest-py3-none-any.whl
!wget -q https://aka.ms/fabric-synapseml-core-whl -O synapseml_core-latest-py3-none-any.whl
```

---

This code cell imports the AI functions library and its dependencies. The pandas cell also imports an optional Python library to display progress bars that track the status of every AI function call.

# [pandas](#tab/pandas)

```python
# Required imports
import synapse.ml.aifunc as aifunc
import pandas as pd

# Optional import for progress bars. In future versions, this import will be included by default
# Controlled by aifunc.default_conf.use_progress_bar and conf parameter of AI functions
from tqdm.auto import tqdm
tqdm.pandas()
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
> Learn how to [customize the configuration](./configuration.md) of AI functions.

### Calculate similarity with ai.similarity

The `ai.similarity` function compares each input text value either to one common reference text or to the corresponding value in another column (pairwise mode). The output similarity score values are relative, and they can range from `-1` (opposites) to `1` (identical). A score of `0` indicates that the values are unrelated in meaning. Get [detailed instructions](./similarity.md) about the use of `ai.similarity`.

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = pd.DataFrame([ 
        ("Bill Gates", "Microsoft"), 
        ("Satya Nadella", "Toyota"), 
        ("Joan of Arc", "Nike") 
    ], columns=["names", "companies"])
    
df["similarity"] = df["names"].ai.similarity(df["companies"])
display(df)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("Bill Gates", "Microsoft"), 
        ("Satya Nadella", "Toyota"), 
        ("Joan of Arc", "Nike")
    ], ["names", "companies"])

similarity = df.ai.similarity(input_col="names", other_col="companies", output_col="similarity")
display(similarity)
```

---

### Categorize text with ai.classify

The `ai.classify` function invokes AI to categorize input text according to custom labels you choose. For more information about the use of `ai.classify`, go to [this article](./classify.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",),
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",),
        ("Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!",)
    ], ["descriptions"])
    
categories = df.ai.classify(labels=["kitchen", "bedroom", "garage", "other"], input_col="descriptions", output_col="categories")
display(categories)
```

---

### Detect sentiment with ai.analyze_sentiment

The `ai.analyze_sentiment` function invokes AI to identify whether the emotional state expressed by input text is positive, negative, mixed, or neutral. If AI can't make this determination, the output is left blank. For more detailed instructions about the use of `ai.analyze_sentiment`, see [this article](./analyze-sentiment.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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

### Extract entities with ai.extract

The `ai.extract` function invokes AI to scan input text and extract specific types of information that are designated by labels you choose (for example, locations or names). For more detailed instructions about the use of `ai.extract`, see [this article](./extract.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("MJ Lee lives in Tucson, AZ, and works as a software engineer for Microsoft.",),
        ("Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey.",)
    ], ["descriptions"])

df_entities = df.ai.extract(labels=["name", "profession", "city"], input_col="descriptions")
display(df_entities)
```

---

### Fix grammar with ai.fix_grammar

The `ai.fix_grammar` function invokes AI to correct the spelling, grammar, and punctuation of input text. For more detailed instructions about the use of `ai.fix_grammar`, see [this article](./fix-grammar.md).

#### Sample usage

# [pandas](#tab/pandas)

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

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("There are an error here.",),
        ("She and me go weigh back. We used to hang out every weeks.",),
        ("The big picture are right, but you're details is all wrong.",)
    ], ["text"])

corrections = df.ai.fix_grammar(input_col="text", output_col="corrections")
display(corrections)
```

---

### Summarize text with ai.summarize

The `ai.summarize` function invokes AI to generate summaries of input text (either values from a single column of a DataFrame, or row values across all the columns). For more detailed instructions about the use of `ai.summarize`, see [this article](./summarize.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes.
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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

### Translate text with ai.translate

The `ai.translate` function invokes AI to translate input text to a new language of your choice. For more detailed instructions about the use of `ai.translate`, see [this article](./translate.md).

#### Sample usage

# [pandas](#tab/pandas)

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

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("Hello! How are you doing today?",),
        ("Tell me what you'd like to know, and I'll do my best to help.",),
        ("The only thing we have to fear is fear itself.",),
    ], ["text"])

translations = df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
display(translations)
```

---

### Answer custom user prompts with ai.generate_response

The `ai.generate_response` function invokes AI to generate custom text based on your own instructions. For more detailed instructions about the use of `ai.generate_response`, see [this article](./generate-response.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/.

df = spark.createDataFrame([
        ("Scarves",),
        ("Snow pants",),
        ("Ski goggles",)
    ], ["product"])

responses = df.ai.generate_response(prompt="Write a short, punchy email subject line for a winter sale.", output_col="response")
display(responses)
```

---

## Related content

- Calculate similarity with [`ai.similarity`](./similarity.md).
- Detect sentiment with [`ai.analyze_sentiment`](./analyze-sentiment.md).
- Categorize text with [`ai.classify`](./classify.md).
- Extract entities with [`ai.extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Customize the [configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
