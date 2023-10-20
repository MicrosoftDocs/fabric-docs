---
title: Use Azure openai with SynapseML
description: How to use prebuilt Azure openai in Fabric with SynapseML
ms.reviewer: mopeakande
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom: ignite-2023
ms.date: 10/18/2023
ms.search.form:
---

# Use Azure OpenAI in Fabric with SynapseML

This document shows examples of how to use Azure OpenAI in Fabric using SynapseML.


## Import package

``` python
import synapse.ml.core
from synapse.ml.cognitive.openai import *
```


## Chat

The ChatGPT and GPT-4 models are language models that are optimized for conversational interfaces.

`deployment_name` could be one of:

-   `gpt-35-turbo`
-   `gpt-35-turbo-16k`
-   `dv3`

``` python
df = spark.createDataFrame(
    [
        ("apple", "fruits"),
        ("mercedes", "cars"),
        ("cake", "dishes"),
        (None, "none")
    ]
).toDF("text", "category")
```


``` python
prompt = (
    OpenAIPrompt()
    .setDeploymentName("dv3") # deployment_name could be one of {gpt-35-turbo, gpt-35-turbo-16k, dv3}
    .setOutputCol("outParsed")
    .setTemperature(0.0)
    .setPromptTemplate("here is a comma separated list of 5 {category}: {text}, ")
    .setPostProcessing("csv")
)
result = prompt.transform(df)
display(result)
```

## Completions

The completions endpoint can be used for a wide variety of tasks. It provides a simple but powerful text-in, text-out interface to any of our
models. You input some text as a prompt, and the model generates a text completion that attempts to match whatever context or pattern you
gave it. For example, if you give the API the prompt, "As Descartes said, I think, therefore", it returns the completion " I am" with
high probability.

`deployment_name` could be one of:

-   `text-davinci-003`
-   `code-cushman-002`

``` python
df = spark.createDataFrame(
    [
        ("Hello my name is",),
        ("The best code is code thats",),
        ("SynapseML is ",),
    ]
).toDF("prompt")

deployment_name = "text-davinci-003" # deployment_name could be text-davinci-003 or code-cushman-002
completion = (
    OpenAICompletion()
    .setDeploymentName(deployment_name)
    .setMaxTokens(200)
    .setPromptCol("prompt")
    .setErrorCol("error")
    .setOutputCol("completions")
)
```

``` python
from pyspark.sql.functions import col

completed_df = completion.transform(df).cache()
display(
    completed_df.select(
        col("prompt"),
        col("error"),
        col("completions.choices.text").getItem(0).alias("text"),
    )
)
```


### All functionalities in one call

OpenAI contains numerous abilities including `Summarize Text`, `Classification`, `Natural Language to SQL`, `Code Generation`, `Translation`, etc.

This sample shows that we could use one single `OpenAICompletion` instance to complete all above tasks within one single `.transform()` call.


``` python
df = spark.createDataFrame(
    [
        ("A neutron star is the collapsed core of a massive supergiant star, which had a total mass of between 10 and 25 solar masses, possibly more if the star was especially metal-rich.[1] Neutron stars are the smallest and densest stellar objects, excluding black holes and hypothetical white holes, quark stars, and strange stars.[2] Neutron stars have a radius on the order of 10 kilometres (6.2 mi) and a mass of about 1.4 solar masses.[3] They result from the supernova explosion of a massive star, combined with gravitational collapse, that compresses the core past white dwarf star density to that of atomic nuclei.\n\nTl;dr",),
        ("Classify the following news article into 1 of the following categories: categories: [Business, Tech, Politics, Sport, Entertainment].\n news article: Donna Steffensen Is Cooking Up a New Kind of Perfection. The Internet’s most beloved cooking guru has a buzzy new book and a fresh new perspective:",),
        ("### Postgres SQL tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n### A query to list the names of the departments which employed more than 10 employees in the last 3 months",),
        ("Write a quick sort function using Python.",),
        ("Product description: A home milkshake maker\nSeed words: fast, healthy, compact.\nProduct names: HomeShaker, Fit Shaker, QuickShake, Shake Maker\n\nProduct description: A pair of shoes that can fit any foot size.\nSeed words: adaptable, fit, omni-fit.",),
        ("English: I do not speak French.\nFrench: Je ne parle pas français.\n\nEnglish: See you later!\nFrench: À tout à l'heure!\n\nEnglish: Where is a good restaurant?\nFrench: Où est un bon restaurant?\n\nEnglish: What rooms do you have available?\nFrench: Quelles chambres avez-vous de disponible?\n\nEnglish: I want to say nothing.\n",),
        ("There are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy. There are also loheckles, which are a grayish blue fruit and are very tart, a little bit like a lemon. Pounits are a bright green color and are more savory than sweet. There are also plenty of loopnovas which are a neon pink flavor and taste like cotton candy. Finally, there are fruits called glowls, which have a very sour and bitter taste which is acidic and caustic, and a pale orange tinge to them.\n\nPlease make a table summarizing the fruits from Goocrux\n| Fruit | Color | Flavor |\n| Neoskizzles | Purple | Sweet |\n| Loheckles | Grayish blue | Tart |",),
        ("The following is a list of companies and the categories they fall into\n\nFacebook: Social media, Technology\nLinkedIn: Social media, Technology, Enterprise, Careers\nUber: Transportation, Technology, Marketplace\nUnilever: Conglomerate, Consumer Goods\nMcdonalds: Food, Fast Food, Logistics, Restaurants\nFedEx:",)
    ]
).toDF("prompt")
```

``` python
from synapse.ml.cognitive.openai import OpenAICompletion
from pyspark.sql.functions import col

deployment_name = "text-davinci-003"
completion = (
    OpenAICompletion()
    .setDeploymentName(deployment_name)
    .setMaxTokens(200)
    .setPromptCol("prompt")
    .setErrorCol("error")
    .setOutputCol("completions")
)

completed_df = completion.transform(df).cache()
display(
    completed_df.select(
        col("prompt"),
        col("error"),
        col("completions.choices.text").getItem(0).alias("text"),
    )
)
```

## Embeddings

An embedding is a special format of data representation by machine learning models and algorithms. The embedding is an information dense representation of the semantic meaning of a piece of text. Each embedding is a vector of floating point numbers, such that the distance between two embeddings in the vector space is correlated with semantic similarity between two inputs in the original
format. For example, if two texts are similar, then their vector
representations should also be similar.

`deployment_name` could be `text-embedding-ada-002`.



``` python
embedding = (
    OpenAIEmbedding()
    .setDeploymentName("text-embedding-ada-002") # set deployment_name as text-embedding-ada-002
    .setTextCol("text")
    .setOutputCol("out")
)
display(embedding.transform(df))
```

## Next steps

- [Use prebuilt Anomaly Detector in Fabric with REST API](how-to-use-anomaly-detector-via-rest-api.md)
- [Use prebuilt Anomaly Detector in Fabric with SynapseML](how-to-use-anomaly-detector-via-synapseml.md)
- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics-via-rest-api.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics-via-synapseml.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator-via-rest-api.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator-via-synapseml.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-via-python-sdk.md)
