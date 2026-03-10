---
title: Azure OpenAI for big data
description: Use Azure OpenAI Service to solve a large number of natural language tasks through prompting the completion API.
ms.topic: how-to
ms.custom: dev-focus
ai-usage: ai-assisted
ms.author: scottpolly
author: s-polly
ms.reviewer: jessiwang
ms.date: 06/30/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Azure OpenAI for big data

You can use the Azure OpenAI service to solve many natural language tasks by prompting the completion API. To make it easier to scale your prompting workflows from a few examples to large datasets of examples, the Azure OpenAI service integrates with the distributed machine learning library [SynapseML](https://www.microsoft.com/research/blog/synapseml-a-simple-multilingual-and-massively-parallel-machine-learning-library/). By using this integration, you can use the [Apache Spark](https://spark.apache.org/) distributed computing framework to process millions of prompts with the OpenAI service. This tutorial shows how to apply large language models at a distributed scale by using Azure OpenAI and Microsoft Fabric.

## Prerequisites

The key prerequisites for this quickstart include a working Azure OpenAI resource and an Apache Spark cluster with SynapseML installed. 

[!INCLUDE [prerequisites](includes/prerequisites.md)]
* Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
* Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks).
* An Azure OpenAI resource - [create a resource](/azure/ai-foundry/openai/how-to/create-resource?pivots=web-portal#create-a-resource)


## Import this guide as a notebook

The next step is to add this code into your Spark cluster. You can either create a notebook in your Spark platform and copy the code into this notebook to run the demo. Or download the notebook and import it into Synapse Analytics.

1. [Download this demo as a notebook](https://github.com/microsoft/SynapseML/blob/master/docs/Explore%20Algorithms/OpenAI/OpenAI.ipynb) (select **Raw**, then save the file)
1. Import the notebook [into the Synapse Workspace](/en-us/azure/synapse-analytics/spark/apache-spark-development-using-notebooks#create-a-notebook) or if using Fabric [import into the Fabric Workspace](/en-us/fabric/data-engineering/how-to-use-notebook)
1. Install SynapseML on your cluster. See the installation instructions for Synapse at the bottom of [the SynapseML website](https://microsoft.github.io/SynapseML/). If you're using Fabric, check [Installation Guide](/en-us/fabric/data-science/install-synapseml). This step requires pasting an extra cell at the top of the notebook you imported. 
1. Connect your notebook to a cluster and follow along, editing and running the cells.

## Fill in service information

Next, edit the cell in the notebook to point to your service. Set the `service_name`, `deployment_name`, `location`, and `key` variables to match your OpenAI service:


```python
import os
from pyspark.sql import SparkSession
from synapse.ml.core.platform import running_on_synapse, find_secret

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()

if running_on_synapse():
    from notebookutils.visualization import display

# Fill in the following lines with your service information
# Learn more about selecting which embedding model to choose: https://openai.com/blog/new-and-improved-embedding-model
service_name = "synapseml-openai"
deployment_name = "gpt-4.1-mini"
deployment_name_embeddings = "text-embedding-3-small"

key = find_secret(
    "openai-api-key"
)  # please replace this line with your key as a string

assert key is not None and service_name is not None
```

## Create a dataset of prompts

Next, create a dataframe consisting of a series of rows, with one prompt per row. 

You can also load data directly from ADLS or other databases. For more information on loading and preparing Spark dataframes, see the [Apache Spark data loading guide](https://spark.apache.org/docs/latest/sql-data-sources.html).


```python
df = spark.createDataFrame(
    [
        ("Hello my name is",),
        ("The best code is code that's",),
        ("SynapseML is ",),
    ]
).toDF("prompt")
```

## Create the OpenAIPrompt Apache Spark client

To apply the Azure OpenAI service to your dataframe, create an `OpenAIPrompt` object, which acts as a distributed client. Set the service parameters with either a single value or a dataframe column by using the appropriate setters on the `OpenAIPrompt` object. In this example, set `maxTokens` to 200. A token is about four characters, and this limit applies to the sum of the prompt and the result. Set the `promptCol` parameter with the name of the prompt column in the dataframe.


```python
from synapse.ml.services.openai import OpenAIPrompt

completion = (
    OpenAIPrompt()
    .setSubscriptionKey(key)
    .setDeploymentName(deployment_name)
    .setCustomServiceName(service_name)
    .setMaxTokens(200)
    .setPromptCol("prompt")
    .setErrorCol("error")
    .setOutputCol("completions")
)
```

## Transform the dataframe by using the OpenAIPrompt client

After creating the dataframe and the prompt client, transform your input dataset and add a column named `completions` with all of the information the service adds. Select just the text for simplicity.


```python
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

Your output should look something like this. The completion text is different from the sample. 

| **prompt**                       | **error**     | **text**                                                                                                                                  |
|:----------------------------:    |:----------:    |:-------------------------------------------------------------------------------------------------------------------------------------:    |
| Hello my name is                | null          | Makaveli I'm 18 years old and I want to   be a rapper when I grow up I love writing and making music I'm from Los   Angeles, CA     |
| The best code is code that's    | null          | understandable This is a subjective statement,   and there's no definitive answer.                                                       |
| SynapseML is                    | null          | A machine learning algorithm that's able to learn how to predict the future outcome of events.                                           |

## More Usage Examples

### Generating text embeddings

In addition to completing text, you can also embed text for use in downstream algorithms or vector retrieval architectures. By creating embeddings, you can search and retrieve documents from large collections. Use this approach when prompt engineering isn't sufficient for the task. For more information on using `OpenAIEmbedding`, see the [embedding guide](https://microsoft.github.io/SynapseML/docs/Explore%20Algorithms/OpenAI/).


```python
from synapse.ml.services.openai import OpenAIEmbedding

embedding = (
    OpenAIEmbedding()
    .setSubscriptionKey(key)
    .setDeploymentName(deployment_name_embeddings)
    .setCustomServiceName(service_name)
    .setTextCol("prompt")
    .setErrorCol("error")
    .setOutputCol("embeddings")
)

display(embedding.transform(df))
```

### Chat completion

Models such as GPT-4o and GPT-4.1 understand chats instead of single prompts. The `OpenAIChatCompletion` transformer exposes this functionality at scale.


```python
from synapse.ml.services.openai import OpenAIChatCompletion
from pyspark.sql import Row
from pyspark.sql.types import *


def make_message(role, content):
    return Row(role=role, content=content, name=role)


chat_df = spark.createDataFrame(
    [
        (
            [
                make_message(
                    "system", "You are an AI chatbot with red as your favorite color"
                ),
                make_message("user", "What's your favorite color"),
            ],
        ),
        (
            [
                make_message("system", "You are very excited"),
                make_message("user", "How are you today"),
            ],
        ),
    ]
).toDF("messages")


chat_completion = (
    OpenAIChatCompletion()
    .setSubscriptionKey(key)
    .setDeploymentName(deployment_name)
    .setCustomServiceName(service_name)
    .setMessagesCol("messages")
    .setErrorCol("error")
    .setOutputCol("chat_completions")
)

display(
    chat_completion.transform(chat_df).select(
        "messages", "chat_completions.choices.message.content"
    )
)
```

### Improve throughput with request batching 

The example makes several requests to the service, one for each prompt. To complete multiple prompts in a single request, use batch mode. First, in the `OpenAIPrompt` object, instead of setting the Prompt column to "Prompt", specify "batchPrompt" for the BatchPrompt column.
To do so, create a dataframe with a list of prompts per row.


```python
batch_df = spark.createDataFrame(
    [
        (["The time has come", "Pleased to", "Today stocks", "Here's to"],),
        (["The only thing", "Ask not what", "Every litter", "I am"],),
    ]
).toDF("batchPrompt")
```

Next, create the `OpenAIPrompt` object. Rather than setting the prompt column, set the batchPrompt column if your column is of type `Array[String]`.


```python
batch_completion = (
    OpenAIPrompt()
    .setSubscriptionKey(key)
    .setDeploymentName(deployment_name)
    .setCustomServiceName(service_name)
    .setMaxTokens(200)
    .setBatchPromptCol("batchPrompt")
    .setErrorCol("error")
    .setOutputCol("completions")
)
```

In the call to transform, a request is made per row. Since each row contains multiple prompts, each request sends all prompts in that row. The results contain a row for each row in the request.


```python
completed_batch_df = batch_completion.transform(batch_df).cache()
display(completed_batch_df)
```

### Using an automatic minibatcher

If your data is in column format, you can transpose it to row format by using SynapseML's `FixedMiniBatcherTransformer`.


```python
from pyspark.sql.types import StringType
from synapse.ml.stages import FixedMiniBatchTransformer
from synapse.ml.core.spark import FluentAPI

completed_autobatch_df = (
    df.coalesce(
        1
    )  # Force a single partition so that our little 4-row dataframe makes a batch of size 4, you can remove this step for large datasets
    .mlTransform(FixedMiniBatchTransformer(batchSize=4))
    .withColumnRenamed("prompt", "batchPrompt")
    .mlTransform(batch_completion)
)

display(completed_autobatch_df)
```

### Prompt engineering for translation

The Azure OpenAI service can solve many different natural language tasks through [prompt engineering](/en-us/azure/ai-services/openai/how-to/completions). This example shows prompting for language translation:


```python
translate_df = spark.createDataFrame(
    [
        ("Japanese: Ookina hako \nEnglish: Big box \nJapanese: Midori tako\nEnglish:",),
        (
            "French: Quel heure et il au Montreal? \nEnglish: What time is it in Montreal? \nFrench: Ou est le poulet? \nEnglish:",
        ),
    ]
).toDF("prompt")

display(completion.transform(translate_df))
```

### Prompt for question answering

This example prompts the model for general-knowledge question answering:


```python
qa_df = spark.createDataFrame(
    [
        (
            "Q: Where is the Grand Canyon?\nA: The Grand Canyon is in Arizona.\n\nQ: What is the weight of the Burj Khalifa in kilograms?\nA:",
        )
    ]
).toDF("prompt")

display(completion.transform(qa_df))
```
## Related content

- [How to Build a Search Engine with SynapseML](create-a-multilingual-search-engine-from-forms.md)
- [How to use SynapseML and Foundry Tools for multivariate anomaly detection - Analyze time series](multivariate-anomaly-detection.md)
- [How to use Kernel SHAP to explain a tabular classification model](tabular-shap-explainer.md)
