---
title: Transform and enrich data seamlessly with AI functions
description: Learn how to use AI functions in Fabric to transform and enrich data with lightweight LLM-powered code.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: how-to
ms.date: 02/26/2025

ms.search.form: AI functions
---

# Transform and enrich data seamlessly with AI functions (Preview)

[!INCLUDE [feature-preview](../../includes/feature-preview-note.md)]

With Microsoft Fabric, all business professionals—from developers to analysts—can derive more value from their enterprise data through Generative AI, using experiences like [Copilot](../../get-started/copilot-notebooks-overview.md) and [Fabric data agents](../how-to-create-data-agent.md). Thanks to a new set of AI functions for data engineering, Fabric users can now harness the power of industry-leading large language models (LLMs) to transform and enrich data seamlessly.

AI functions harness the power of GenAI for summarization, classification, text generation, and so much more—all with a single line of code:

- [**Calculate similarity with `ai.similarity`**](#calculate-similarity-with-aisimilarity): Compare the meaning of input text with a single common text value, or with corresponding text values in another column.
- [**Categorize text with `ai.classify`**](#categorize-text-with-aiclassify): Classify input text values according to labels you choose.
- [**Detect sentiment with `ai.analyze_sentiment`**](#detect-sentiment-with-aianalyze_sentiment): Identify the emotional state expressed by input text.
- [**Extract entities with `ai.extract`**](#extract-entities-with-aiextract): Find and extract specific types of information from input text, for example locations or names.
- [**Fix grammar with `ai.fix_grammar`**](#fix-grammar-with-aifix_grammar): Correct the spelling, grammar, and punctuation of input text.
- [**Summarize text with `ai.summarize`**](#summarize-text-with-aisummarize): Get summaries of input text.
- [**Translate text with `ai.translate`**](#translate-text-with-aitranslate): Translate input text into another language.
- [**Answer custom user prompts with `ai.generate_response`**](#answer-custom-user-prompts-with-aigenerate_response): Generate responses based on your own instructions.

It's seamless to incorporate these functions as part of data-science and data-engineering workflows, whether you're working with pandas or Spark. There is no detailed configuration, no complex infrastructure management, and no specific technical expertise needed.

## Prerequisites

- To use AI functions with Fabric's built-in AI endpoint, your administrator needs to enable [the tenant switch for Copilot and other features powered by Azure OpenAI](../../admin/service-admin-portal-copilot.md).
- You also need an F2 or higher SKU or a P SKU. If you use a trial SKU, you can also bring your own Azure Open AI resource.
- Depending on your location, you may need to enable a tenant setting for cross-geo processing. Learn more [here](../../get-started/copilot-fabric-overview.md#available-regions-for-azure-openai-service).


> [!NOTE]
>
> - AI functions are supported in the [Fabric 1.3 runtime](../../data-engineering/runtime-1-3.md) and higher.
> - By default, AI functions are currently powered by the **gpt-3.5-turbo (0125)** model. To learn more about billing and consumption rates, visit [this article](../ai-services/ai-services-overview.md).
> - Although the underlying model can handle several languages, most of the AI functions are optimized for use on English-language texts.
> - During the initial rollout of AI functions, users are temporarily limited to 1,000 requests per minute with Fabric's built-in AI endpoint.

## Getting started with AI functions

Use of the AI functions library in a Fabric notebook currently requires certain custom packages. The following code installs and imports those packages. Afterward, you can use AI functions with pandas or PySpark, depending on your preference.

This code cell installs the AI functions library and its dependencies.

> [!WARNING]
> The PySpark configuration cell takes a few minutes to finish executing. We appreciate your patience.

# [pandas](#tab/pandas)

```python
# Install fixed version of packages
%pip install -q openai==1.30
%pip install -q --force-reinstall httpx==0.27.0

# Install latest version of SynapseML-core
%pip install -q --force-reinstall https://mmlspark.blob.core.windows.net/pip/1.0.9/synapseml_core-1.0.9-py2.py3-none-any.whl

# Install SynapseML-Internal .whl with AI functions library from blob storage:
%pip install -q --force-reinstall https://mmlspark.blob.core.windows.net/pip/1.0.10.0-spark3.4-6-0cb46b55-SNAPSHOT/synapseml_internal-1.0.10.0.dev1-py2.py3-none-any.whl
```

# [PySpark](#tab/pyspark)

```python
%%configure -f
{
    "name": "synapseml",
    "conf": {
        "spark.jars.packages": "com.microsoft.azure:synapseml_2.12:1.0.10-spark3.5,com.microsoft.azure:synapseml-internal_2.12:1.0.10.0-spark3.5",
        "spark.jars.repositories": "https://mmlspark.azureedge.net/maven",
        "spark.jars.excludes": "org.scala-lang:scala-reflect,org.apache.spark:spark-tags_2.12,org.scalactic:scalactic_2.12,org.scalatest:scalatest_2.12,com.fasterxml.jackson.core:jackson-databind",
        "spark.yarn.user.classpath.first": "true",
        "spark.sql.parquet.enableVectorizedReader": "false"
    }
}
```

---

This code cell imports the AI functions library and its dependencies. The pandas cell also imports an optional Python library to display progress bars that track the status of every AI function call.

# [pandas](#tab/pandas)

```python
# Required imports
import synapse.ml.aifunc as aifunc
import pandas as pd
import openai

# Optional import for progress bars
from tqdm.auto import tqdm
tqdm.pandas()
```

# [PySpark](#tab/pyspark)

```python
from synapse.ml.spark.aifunc.DataFrameExtensions import AIFunctions
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()
defaults.set_deployment_name("gpt-35-turbo-0125")
```

---

## Applying AI functions

Each of the following functions allows you to invoke Fabric's built-in AI endpoint to transform and enrich data with a single line of code. You can use AI functions to analyze pandas DataFrames or Spark DataFrames.

> [!TIP]
> To learn about customizing the configuration of AI functions, visit [this article](./configuration.md).

### Calculate similarity with `ai.similarity`

The `ai.similarity` function invokes AI to compare input text values with a single common text value, or with pairwise text values in another column. The output similarity scores are relative, and they can range from **-1** (opposites) to **1** (identical). A score of **0** indicates that the values are completely unrelated in meaning. For more detailed instructions about the use of `ai.similarity`, visit [this article](./similarity.md).

#### Sample usage

# [pandas](#tab/pandas)

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

# [PySpark](#tab/pyspark)

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

### Categorize text with `ai.classify`

The `ai.classify` function invokes AI to categorize input text according to custom labels you choose. For more information about the use of `ai.classify`, visit [this article](./classify.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural fabric, is perfect for a good night's sleep.",),
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",),
        ("Enjoy this *BRAND NEW CAR!* A compact SUV perfect for the professional commuter!",)
    ], ["descriptions"])
    
categories = df.ai.classify(labels=["kitchen", "bedroom", "garage", "other"], input_col="descriptions", output_col="categories")
display(categories)
```

---

### Detect sentiment with `ai.analyze_sentiment`

The `ai.analyze_sentiment` function invokes AI to identify whether the emotional state expressed by input text is positive, negative, mixed, or neutral. If AI can't make this determination, the output is left blank. For more detailed instructions about the use of `ai.analyze_sentiment`, visit [this article](./analyze-sentiment.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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

### Extract entities with `ai.extract`

The `ai.extract` function invokes AI to scan input text and extract specific types of information designated by labels you choose—for example, locations or names. For more detailed instructions about the use of `ai.extract`, visit [this article](./extract.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "MJ Lee lives in Tuscon, AZ, and works as a software engineer for Microsoft.",
        "Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey."
    ], columns=["descriptions"])

df_entities = df["descriptions"].ai.extract("name", "profession", "city")
display(df_entities)
```

# [PySpark](#tab/pyspark)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("MJ Lee lives in Tuscon, AZ, and works as a software engineer for Microsoft.",),
        ("Kris Turner, a nurse at NYU Langone, is a resident of Jersey City, New Jersey.",)
    ], ["descriptions"])

df_entities = df.ai.extract(labels=["name", "profession", "city"], input_col="descriptions")
display(df_entities)
```

---

### Fix grammar with `ai.fix_grammar`

The `ai.fix_grammar` function invokes AI to correct the spelling, grammar, and punctuation of input text. For more detailed instructions about the use of `ai.fix_grammar`, visit [this article](./fix-grammar.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("There are an error here.",),
        ("She and me go weigh back. We used to hang out every weeks.",),
        ("The big picture are right, but you're details is all wrong.",)
    ], ["text"])

corrections = df.ai.fix_grammar(input_col="text", output_col="corrections")
display(corrections)
```

---

### Summarize text with `ai.summarize`

The `ai.summarize` function invokes AI to generate summaries of input text (either values from a single column of a DataFrame, or row values across all the columns). For more detailed instructions about the use of `ai.summarize`, visit [this dedicated article](./summarize.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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

### Translate text with `ai.translate`

The `ai.translate` function invokes AI to translate input text to a new language of your choice. For more detailed instructions about the use of `ai.translate`, visit [this article](./translate.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Hello! How are you doing today?",),
        ("Tell me what you'd like to know, and I'll do my best to help.",),
        ("The only thing we have to fear is fear itself.",),
    ], ["text"])

translations = df.ai.translate(to_lang="spanish", input_col="text", output_col="translations")
display(translations)
```

---

### Answer custom user prompts with `ai.generate_response`
The `ai.generate_response` function invokes AI to generate custom text based on your own instructions. For more detailed instructions about the use of `ai.generate_response`, visit [this article](./generate-response.md).

#### Sample usage

# [pandas](#tab/pandas)

```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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
# Read terms: https://azure.microsoft.com/support/legal/preview-supplemental-terms/

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
- Extract entities with [`ai_extract`](./extract.md).
- Fix grammar with [`ai.fix_grammar`](./fix-grammar.md).
- Summarize text with [`ai.summarize`](./summarize.md).
- Translate text with [`ai.translate`](./translate.md).
- Answer custom user prompts with [`ai.generate_response`](./generate-response.md).
- Learn how to [customize the configuration of AI functions](./configuration.md).
- Did we miss a feature you need? Suggest it on the [Fabric Ideas forum](https://ideas.fabric.microsoft.com/).
