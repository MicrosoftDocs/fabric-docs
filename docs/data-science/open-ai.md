---
title: Azure OpenAI for big data
description: Use Azure OpenAI Service to solve a large number of natural language tasks through prompting the completion API.
ms.topic: how-to
ms.custom: 
ms.author: ssalgado
author: ssalgadodev
ms.reviewer: jessiwang
reviewer: JessicaXYWang
ms.date: 06/30/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Azure OpenAI for big data

The Azure OpenAI service can be used to solve a large number of natural language tasks through prompting the completion API. To make it easier to scale your prompting workflows from a few examples to large datasets of examples, we integrated the Azure OpenAI service with the distributed machine learning library [SynapseML](https://www.microsoft.com/en-us/research/blog/synapseml-a-simple-multilingual-and-massively-parallel-machine-learning-library/). This integration makes it easy to use the [Apache Spark](https://spark.apache.org/) distributed computing framework to process millions of prompts with the OpenAI service. This tutorial shows how to apply large language models at a distributed scale using Azure OpenAI and Azure Synapse Analytics. 

## Prerequisites

The key prerequisites for this quickstart include a working Azure OpenAI resource, and an Apache Spark cluster with SynapseML installed. 

[!INCLUDE [prerequisites](includes/prerequisites.md)]
* Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
* Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks).
* An Azure OpenAI resource: [Request Access to Azure OpenAI Service](https://customervoice.microsoft.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR7en2Ais5pxKtso_Pz4b1_xUOFA5Qk1UWDRBMjg0WFhPMkIzTzhKQ1dWNyQlQCN0PWcu) before [creating a resource](/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource)


## Import this guide as a notebook

The next step is to add this code into your Spark cluster. You can either create a notebook in your Spark platform and copy the code into this notebook to run the demo. Or download the notebook and import it into Synapse Analytics

1. [Download this demo as a notebook](https://github.com/microsoft/SynapseML/blob/2abfbdaadded0eff17ee0e5ea1908758e6d7a222/docs/Explore%20Algorithms/OpenAI/OpenAI.ipynb) (select **Raw**, then save the file)
1. Import the notebook [into the Synapse Workspace](/en-us/azure/synapse-analytics/spark/apache-spark-development-using-notebooks#create-a-notebook) or if using Fabric [import into the Fabric Workspace](/en-us/fabric/data-engineering/how-to-use-notebook)
1. Install SynapseML on your cluster. See the installation instructions for Synapse at the bottom of [the SynapseML website](https://microsoft.github.io/SynapseML/). If you are using Fabric, check [Installation Guide](/en-us/fabric/data-science/install-synapseml). This requires pasting an extra cell at the top of the notebook you imported. 
1. Connect your notebook to a cluster and follow along, editing and running the cells.

## Fill in service information

Next, edit the cell in the notebook to point to your service. In particular set the `service_name`, `deployment_name`, `location`, and `key` variables to match them to your OpenAI service:


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
deployment_name = "gpt-35-turbo"
deployment_name_embeddings = "text-embedding-ada-002"

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
        ("The best code is code thats",),
        ("SynapseML is ",),
    ]
).toDF("prompt")
```

## Create the OpenAICompletion Apache Spark Client

To apply the OpenAI Completion service to your dataframe you created, create an OpenAICompletion object, which serves as a distributed client. Parameters of the service can be set either with a single value, or by a column of the dataframe with the appropriate setters on the `OpenAICompletion` object. Here we're setting `maxTokens` to 200. A token is around four characters, and this limit applies to the sum of the prompt and the result. We're also setting the `promptCol` parameter with the name of the prompt column in the dataframe.


```python
from synapse.ml.cognitive import OpenAICompletion

completion = (
    OpenAICompletion()
    .setSubscriptionKey(key)
    .setDeploymentName(deployment_name)
    .setCustomServiceName(service_name)
    .setMaxTokens(200)
    .setPromptCol("prompt")
    .setErrorCol("error")
    .setOutputCol("completions")
)
```

## Transform the dataframe with the OpenAICompletion Client

After completing dataframe and the completion client, you can transform your input dataset and add a column called `completions` with all of the information the service adds. Select just the text for simplicity.


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

Your output should look something like this. The completion text will be different from the sample. 

| **prompt**                       | **error**     | **text**                                                                                                                                  |
|:----------------------------:    |:----------:    |:-------------------------------------------------------------------------------------------------------------------------------------:    |
| Hello my name is                | null          | Makaveli I'm eighteen years old and I want to   be a rapper when I grow up I love writing and making music I'm from Los   Angeles, CA     |
| The best code is code thats     | null          | understandable This is a subjective statement,   and there is no definitive answer.                                                       |
| SynapseML is                    | null          | A machine learning algorithm that is able to learn how to predict the future outcome of events.                                           |

## More Usage Examples

### Generating Text Embeddings

In addition to completing text, we can also embed text for use in downstream algorithms or vector retrieval architectures. Creating embeddings allows you to search and retrieve documents from large collections and can be used when prompt engineering isn't sufficient for the task. For more information on using `OpenAIEmbedding`, see our [embedding guide](https://microsoft.github.io/SynapseML/docs/Explore%20Algorithms/OpenAI/).


```python
from synapse.ml.cognitive import OpenAIEmbedding

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

### Chat Completion

Models such as ChatGPT and GPT-4 are capable of understanding chats instead of single prompts. The `OpenAIChatCompletion` transformer exposes this functionality at scale.


```python
from synapse.ml.cognitive import OpenAIChatCompletion
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
                make_message("user", "Whats your favorite color"),
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

The example makes several requests to the service, one for each prompt. To complete multiple prompts in a single request, use batch mode. First, in the OpenAICompletion object, instead of setting the Prompt column to "Prompt", specify "batchPrompt" for the BatchPrompt column.
To do so, create a dataframe with a list of prompts per row.

As of this writing there's currently a limit of 20 prompts in a single request, and a hard limit of 2048 "tokens", or approximately 1500 words.


```python
batch_df = spark.createDataFrame(
    [
        (["The time has come", "Pleased to", "Today stocks", "Here's to"],),
        (["The only thing", "Ask not what", "Every litter", "I am"],),
    ]
).toDF("batchPrompt")
```

Next we create the OpenAICompletion object. Rather than setting the prompt column, set the batchPrompt column if your column is of type `Array[String]`.


```python
batch_completion = (
    OpenAICompletion()
    .setSubscriptionKey(key)
    .setDeploymentName(deployment_name)
    .setCustomServiceName(service_name)
    .setMaxTokens(200)
    .setBatchPromptCol("batchPrompt")
    .setErrorCol("error")
    .setOutputCol("completions")
)
```

In the call to transform, a request will be made per row. Since there are multiple prompts in a single row, each request is sent with all prompts in that row. The results contain a row for each row in the request.


```python
completed_batch_df = batch_completion.transform(batch_df).cache()
display(completed_batch_df)
```

### Using an automatic minibatcher

If your data is in column format, you can transpose it to row format using SynapseML's `FixedMiniBatcherTransformer`.


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

The Azure OpenAI service can solve many different natural language tasks through [prompt engineering](/en-us/azure/ai-services/openai/how-to/completions). Here, we show an example of prompting for language translation:


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

Here, we prompt GPT-3 for general-knowledge question answering:


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
- [How to use SynapseML and Azure AI services for multivariate anomaly detection - Analyze time series](multivariate-anomaly-detection.md)
- [How to use Kernel SHAP to explain a tabular classification model](tabular-shap-explainer.md)
