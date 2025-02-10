---
title: TBD
description: TBD.
ms.author: franksolomon
author: fbsolo-ms1
ms.reviewer: erenorbey
reviewer: orbey
ms.topic: TBD
ms.custom: TBD
ms.date: TBD

ms.search.form: TBD
---

# Transform and enrich data in seconds with AI functions (Preview)
Microsoft Fabric empowers all users—from developers to business analysts—to derive more value from their enterprise data using Generative AI, with experiences like [Copilot](../../get-started/copilot-notebooks-overview.md) and the [AI skill](../how-to-create-ai-skill.md). Thanks to a new set of AI functions for text analytics, Fabric users can now harness the power of industry-leading LLMs to transform and enrich data out of the box with lightweight, user-friendly code. There's no need for custom configuration, complex infrastructure management, or even specific technical expertise.

AI functions, currently in public preview, allow you to complete the following tasks in a single line of Python or PySpark code, with support for more languages in the works:

- [**Calculate similarity**](#calculate-similarity): Compare the meanings of input text against corresponding text in another column (or against a single string).
- [**Categorize text**](#categorize-text): Classify input text values according to labels you choose.
- [**Detect sentiment**](#detect-sentiment): Identify the emotional state expressed by input text.
- [**Extract entities**](#extract-entities): Find specific types of information, such as locations or names, within input text.
- [**Fix grammar**](#fix-grammar): Correct the spelling, grammar, and punctuation of input text.
- [**Summarize text**](#summarize-text): Get summaries of input text.
- [**Translate**](#translate): Translate text into another language.
- [**Use a custom prompt**](#use-a-custom-prompt): Generate responses based on your own instructions.

Whether you're looking to translate product reviews from one language into another or to generate action items with custom text prompts, AI functions put the power of Fabric's native LLM into your hands, accelerating data transformation and discovery regardless of your level of experience.

## Prerequisites
[Standard]

## Limitations
[Standard]

## Getting started with AI functions
To access the AI functions library in a Fabric notebook, you need to install some custom packages. In a future release, this step will be handled for you. Until then, all you need to do is copy and run the following cells in Python or PySpark.

The first cell will install the AI functions library and its dependencies.

# [Python](#tab/pandas)
```python
# Install fixed version of packages
%pip install openai==1.30
%pip install --force-reinstall httpx==0.27.0

# Install latest version of SynapseML-core
%pip install --force-reinstall https://mmlspark.blob.core.windows.net/pip/1.0.9/synapseml_core-1.0.9-py2.py3-none-any.whl

# Install SynapseML-Internal .whl with AI functions library from blob storage:
%pip install --force-reinstall https://mmlspark.blob.core.windows.net/pip/1.0.9.0-spark3.4-4-fe616c4b-SNAPSHOT/synapseml_internal-1.0.9.0.dev1-py2.py3-none-any.whl
```

# [PySpark](#tab/pandas)
```python
%%configure -f
{
    "name": "synapseml",
    "conf": {
        "spark.jars.packages": "com.microsoft.azure:synapseml_2.12:1.0.9-spark3.5,com.microsoft.azure:synapseml-internal_2.12:1.0.9.0-spark3.5",
        "spark.jars.repositories": "https://mmlspark.azureedge.net/maven",
        "spark.jars.excludes": "org.scala-lang:scala-reflect,org.apache.spark:spark-tags_2.12,org.scalactic:scalactic_2.12,org.scalatest:scalatest_2.12,com.fasterxml.jackson.core:jackson-databind",
        "spark.yarn.user.classpath.first": "true",
        "spark.sql.parquet.enableVectorizedReader": "false"
    }
}
```
---

The second cell will import the AI functions library and its dependencies (plus an optional library in Python for displaying dynamic progress bars to track the status of every operation you apply).

# [Python](#tab/pandas)
```python
# Required imports
import synapse.ml.aifunc as aifunc
import pandas as pd
import openai

# Optional import for progress bars
from tqdm.auto import tqdm
tqdm.pandas()
```

# [PySpark](#tab/pandas)
```python
from synapse.ml.spark.aifunc.DataFrameExtensions import AIFunctions
from synapse.ml.services.openai import OpenAIDefaults
defaults = OpenAIDefaults()
defaults.set_deployment_name("gpt-35-turbo-0125")
```
---

## Applying AI functions
Each of the following functions allows you to invoke Fabric's native LLM endpoint to transform and enrich data with state-of-the-art Generative AI. You can use AI functions to analyze pandas DataFrames with Python code or Spark DataFrames with PySpark code. Support for additional programming languages will be available in the future.

### [Calculate similarity](similarity.md)
The `ai.similarity` function invokes AI to compare input text values to corresponding text values in another column or to a single text value. Similarity scores can range from -1 (opposites) to 1 (identical), with 0 indicating that the values are completely unrelated in meaning. For more detailed instructions on how to use `ai.similarity`, please visit [this dedicated article](similarity.md).

#### Examples:
# [Python](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([ 
        ("Jean Luc Picard", "Peppa Pig"), 
        ("William T. Riker", "Barney"), 
        ("Dolores O'Riordan", "Sinéad O'Connor"), 
        ("Sherlock Holmes", "a fictional victorian London-based consulting detective") 
    ], columns=["name", "comparison"])
    
df["similarity"] = df["name"].ai.similarity(df["comparison"])
display(df)
```

# [PySpark](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Jean Luc Picard", "Peppa Pig"), 
        ("William T. Riker", "Barney"), 
        ("Dolores O'Riordan", "Sinéad O'Connor"), 
        ("Sherlock Holmes", "a fictional victorian London-based consulting detective") 
    ], ["name", "comparison"])

similarity = df.ai.similarity(input_col="name", other_col="comparison", output_col="similarity")
display(similarity)
```
---

### [Categorize text](classify.md)
The `ai.classify` function invokes AI to categorize input text according to custom labels you choose. For more detailed instructions on how to use `ai.classify`, please visit [this dedicated article](classify.md).

#### Examples:
# [Python](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "This duvet, lovingly hand-crafted from all-natural polyester, is perfect for a good night's sleep.",
        "Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",
        "Enjoy this *BREAND NEW CAR!* A compact SUV perfect for the light commuter!"
    ], columns=["description"])

df["category"] = df['description'].ai.classify("kitchen", "bedroom", "garage", "other")
display(df)
```

# [PySpark](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("This duvet, lovingly hand-crafted from all-natural polyester, is perfect for a good night's sleep.",),
        ("Tired of friends judging your baking? With these handy-dandy measuring cups, you'll create culinary delights.",),
        ("Enjoy this *BREAND NEW CAR!* A compact SUV perfect for the light commuter!",)
    ], ["description"])
    
categories = df.ai.classify(labels=["kitchen", "bedroom", "garage", "other"], input_col="description", output_col="category")
display(categories)
```
---

### [Detect sentiment](analyze-sentiment.md)
The `ai.analyze_sentiment` function invokes AI to identify whether the emotional state expressed by input text is positive, negative, mixed, or neutral. If it can’t be determined, the sentiment is left blank. For more detailed instructions on how to use `ai.analyze_sentiment`, please visit [this dedicated article](analyze-sentiment.md).

#### Examples:
# [Python](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "This was the worst product ever. It went crazy and destroyed my beautiful kitchen counter. Shame!",
        "This cream was the best ever! It restored the pinkish hue to my cheeks and gave me a new outlook on life. Thank you!",
        "I'm not sure about this blow-torch. On the one hand, I did complete my iron-sculpture, but on the other hand my hair caught on fire.",
        "It's OK I suppose."
    ], columns=["review"])

df["sentiment"] = df["review"].ai.analyze_sentiment()
display(df)
```

# [PySpark](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("This was the worst product ever. It went crazy and destroyed my beautiful kitchen counter. Shame!",),
        ("This cream was the best ever! It restored the pinkish hue to my cheeks and gave me a new outlook on life. Thank you!!",),
        ("I'm not sure about this blow-torch. On the one hand, I did complete my iron-sculpture, but on the other hand my hair caught on fire.",),
        ("It's OK I suppose.",)
    ], ["review"])

sentiment = df.ai.analyze_sentiment(input_col="review", output_col="sentiment")
display(sentiment)
```
---

### [Extract entities](extract.md)
The `ai.extract` function invokes AI to find specific types of information designated by labels you choose (such as locations or names) within input text. For more detailed instructions on how to use `ai.extract`, please visit [this dedicated article](extract.md).

#### Examples:
# [Python](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "My name is MJ Lee. I live in a house on 1234 Roderick Lane in Plainville, CT, with two cats.",
        "Kris Turner's house at 1500 Smith Avenue is the biggest on the block!"
    ], columns=["description"])

df = df["description"].ai.extract("name", "address")
display(df)
```

# [PySpark](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("My name is MJ Lee. I live in a house on 1234 Roderick Lane in Plainville, CT, with two cats.",),
        ("Kris Turner's house at 1500 Smith Avenue is the biggest on the block!",)
    ], ["description"])

entities = df.ai.extract(labels=["name", "address"], input_col="description")
display(entities)
```
---

### [Fix grammar](fix-grammar.md)
The `ai.fix_grammar` function invokes AI to correct the spelling, grammar, and punctuation of input text. For more detailed instructions on how to use `ai.fix_grammar`, please visit [this dedicated article](fix-grammar.md).

#### Examples:
# [Python](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "oh yeah, she and me go weigh back!",
        "You SUre took you'RE sweetthyme!",
        "teh time has come at last."
    ], columns=["raw_text"])

df["corrected"] = df["raw_text"].ai.fix_grammar()
display(df)
```

# [PySpark](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("oh yeah, she and me go weigh back!",),
        ("You SUre took you'RE sweetthyme!",),
        ("teh time has come at last.",)
    ], ["raw_text"])

results = df.ai.fix_grammar(input_col="raw_text", output_col="corrected")
display(results)
```
---

### [Summarize text](summarize.md)
The `ai.summarize` function invokes AI to generate summaries of input text (either values in a single column of a DataFrame or rows in the entire DataFrame). For more detailed instructions on how to use `ai.summarize`, please visit [this dedicated article](summarize.md).

#### Examples:
# [Python](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df= pd.DataFrame([
        """
        Well, that goat was a mighty fine old goat, I did always say. I never had to
        mow the lawn once as a boy, and let me tell you, did I appreciate it! Now
        that goat -- a billy-goat, did I mention? -- anyway, his name was Goaty. No,
        no, I know what you're thinking, not goatee like the facial hair-style --
        though he did awful look like he had one. Literally "Goat-ee." Emphasis on
        the goat, don't you know. Anyway, we used to keep him in a little pen, where
        he would bleat his little goat heart out, as he happily munched on grass.
        """,
        """
        Pursuant to subsection 2, paragraph 7, we find that the alleged business
        expense was undertaken under questionable judgment. The employee in question 
        was found to have purchased five lots of moisturizer due to a misunderstanding 
        about the humidity in Cleveland, Ohio, and through a series of poor decisions,
        he made the purchase. Compounding this error was his misapprehension that
        the cream was infused with diamond dust to give it an extra sparkle, thereby
        justifying, at least in his mind, its exorbitant cost. The board recommends
        immediate disciplinary action.
        """
    ], columns=["text"])

df["summary"] = df["text"].ai.summarize()
display(df)
```

# [PySpark](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("""
        Well, that goat was a mighty fine old goat, I did always say. I never had to
        mow the lawn once as a boy, and let me tell you, did I appreciate it! Now
        that goat -- a billy-goat, did I mention? -- anyway, his name was Goaty. No,
        no, I know what you're thinking, not goatee like the facial hair-style --
        though he did awful look like he had one. Literally "Goat-ee." Emphasis on
        the goat, don't you know. Anyway, we used to keep him in a little pen, where
        he would bleat his little goat heart out, as he happily munched on grass.
        """,),
        ("""
        Pursuant to subsection 2, paragraph 7, we find that the alleged business
        expense was undertaken under questionable judgment. The employee in question 
        was found to have purchased five lots of moisturizer due to a misunderstanding 
        about the humidity in Cleveland, Ohio, and through a series of poor decisions,
        he made the purchase. Compounding this error was his misapprehension that
        the cream was infused with diamond dust to give it an extra sparkle, thereby
        justifying, at least in his mind, its exorbitant cost. The board recommends
        immediate disciplinary action.
        """,)
    ], ["input"])

summaries = df.ai.summarize(input_col="input", output_col="summary")
display(summaries)
```
---

### [Translate](translate.md)
The `ai.translate` function invokes AI to translate input text to a new language of your choosing. For more detailed instructions on how to use `ai.translate`, please visit [this dedicated article](translate.md).

#### Examples:
# [Python](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = pd.DataFrame([
        "Where is the bus?", 
        "The bus is on the beach."
    ], columns=["input_text"])

df["translation"] = df["input_text"].ai.translate("spanish")
display(df)
```

# [PySpark](#tab/pandas)
```python
# This code uses AI. Always review output for mistakes. 
# Read terms: https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/

df = spark.createDataFrame([
        ("Where is the bus?",),
        ("The bus is on the beach.",),
    ], ["input_text"])

translations = df.ai.translate(to_lang="spanish", input_col="input_text", output_col="translation")
display(translations)
```
---

### [Use a custom prompt](generate-response.md)
The `ai.generate_response` function invokes AI to generate custom text based on your own instructions. For more detailed instructions on how to use `ai.generate_response`, please visit [this dedicated article](generate-response.md).

#### Examples:
# [Python](#tab/pandas)
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

# [PySpark](#tab/pandas)
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

## Customizing AI function configuration
AI functions are designed to work out of the box in Fabric notebooks, with the underlying LLM and settings set by default. Users who want more flexible configurations, however, can modify the following variables to customize their solutions:

- **Config 1**: TBD
- **Config 2**: TBD
- **Config 3**: TBD