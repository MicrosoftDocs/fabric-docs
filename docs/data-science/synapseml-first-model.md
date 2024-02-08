---
title: SynapseMl first model
description: A quick introduction to building your first machine learning model with SynapseML.
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.reviewer: mopeakande
author: JessicaXYWang
ms.author: jessiwang
ms.date: 06/02/2023
---

# Build your first SynapseML model
This article introduces how to build your first machine learning model using SynapseML and demonstrates how SynapseML simplifies complex machine learning tasks. We use SynapseML to create a small ML training pipeline that includes a featurization stage and a LightGBM regression stage. The pipeline predicts ratings based on review text from a dataset of Amazon book reviews. Finally, we showcase how SynapseML simplifies the use of prebuilt models to solve ML problems.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

* Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
* Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks).
* Attach your notebook to a lakehouse. On the left side of your notebook, select **Add** to add an existing lakehouse or create a new one.
* Obtain an Azure AI services key by following the [Quickstart: Create a multi-service resource for Azure AI services](/azure/ai-services/multi-service-resource) quickstart. You'll need this key for the [Use Azure AI services to transform data in one step](#use-azure-ai-services-to-transform-data-in-one-step) section of this article.

## Set up the environment
Import SynapseML libraries and initialize your Spark session.


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
        LightGBMRegressor(featuresCol="features", labelCol="rating"),
    ]
).fit(train)
```

## Predict the output of the test data
Call the `transform` function on the model to predict and display the output of the test data as a dataframe.


```python
display(model.transform(test))
```

## Use Azure AI services to transform data in one step
Alternatively, for these kinds of tasks that have a prebuilt solution, you can use SynapseML's integration with Azure AI services to transform your data in one step.


```python
from synapse.ml.cognitive import TextSentiment
from synapse.ml.core.platform import find_secret

model = TextSentiment(
    textCol="text",
    outputCol="sentiment",
    subscriptionKey=find_secret("cognitive-api-key"), # Replace it with your cognitive service key, check prerequisites for more details
).setLocation("eastus")

display(model.transform(test))
```

## Related content

- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use Azure AI services with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
- [Quickstart: Create a multi-service resource for Azure AI services](/azure/ai-services/multi-service-resource)
