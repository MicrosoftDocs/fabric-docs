---
title: Build a model with SynapseML
description: Get a quick introduction to building a machine learning model with SynapseML.
ms.topic: how-to
ms.custom:
ms.author: ssalgado
author: ssalgadodev
ms.reviewer: jessiwang
reviewer: JessicaXYWang
ms.date: 08/15/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Build a model with SynapseML

This article describes how to build a machine learning model by using SynapseML, and demonstrates how SynapseML can simplify complex machine learning tasks. You use SynapseML to create a small machine learning training pipeline that includes a featurization stage and a LightGBM regression stage. The pipeline predicts ratings based on review text from a dataset of book reviews. You also see how SynapseML can simplify the use of prebuilt models to solve machine learning problems.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

## Prepare resources
Create the tools and resources you need to build the model and pipeline.

1. [Create a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks).
1. Attach your notebook to a lakehouse. To add an existing lakehouse or create a new one, expand **Lakehouses** under **Explorer** at left, and then select **Add**.
1. Get an Azure AI services key by following the instructions in [Quickstart: Create a multi-service resource for Azure AI services](/azure/ai-services/multi-service-resource).
1. [Create an Azure Key Vault instance](/azure/key-vault/general/quick-create-portal) and add your Azure AI services key to the key vault as a secret.
1. Make a note of your key vault name and secret name. You need this information to run the one-step transform later in this article.

## Set up the environment
In your notebook, import SynapseML libraries and initialize your Spark session.

```python
from pyspark.sql import SparkSession
from synapse.ml.core.platform import *

spark = SparkSession.builder.getOrCreate()
```

## Load a dataset
Load your dataset and split it into train and test sets.

```python
train, test = (
    spark.read.parquet(
        "wasbs://publicwasb@mmlspark.blob.core.windows.net/BookReviewsFromAmazon10K.parquet"
    )
    .limit(1000)
    .cache()
    .randomSplit([0.8, 0.2])
)

display(train)
```

## Create the training pipeline
Create a pipeline that featurizes data using `TextFeaturizer` from the `synapse.ml.featurize.text` library and derives a rating using the `LightGBMRegressor` function.

```python
from pyspark.ml import Pipeline
from synapse.ml.featurize.text import TextFeaturizer
from synapse.ml.lightgbm import LightGBMRegressor

model = Pipeline(
    stages=[
        TextFeaturizer(inputCol="text", outputCol="features"),
        LightGBMRegressor(featuresCol="features", labelCol="rating", dataTransferMode="bulk")
    ]
).fit(train)
```

## Predict the output of the test data
Call the `transform` function on the model to predict and display the output of the test data as a dataframe.

```python
display(model.transform(test))
```

## Use Azure AI services to transform data in one step
Alternatively, for these kinds of tasks that have a prebuilt solution, you can use SynapseML's integration with Azure AI services to transform your data in one step. Run the following code with these replacements:

- Replace `<secret-name>` with the name of your Azure AI Services key secret.
- Replace `<key-vault-name>` with the name of your key vault.

```python
from synapse.ml.services import TextSentiment
from synapse.ml.core.platform import find_secret

model = TextSentiment(
    textCol="text",
    outputCol="sentiment",
    subscriptionKey=find_secret("<secret-name>", "<key-vault-name>")
).setLocation("eastus")

display(model.transform(test))
```

## Related content

- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use Azure AI services with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
- [Quickstart: Create a multi-service resource for Azure AI services](/azure/ai-services/multi-service-resource)
