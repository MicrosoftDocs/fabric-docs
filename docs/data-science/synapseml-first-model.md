---
title: SynapseMl first model
description: A quick introduction to building your first machine learning model with SynapseML
ms.topic: overview
ms.custom: build-2023
ms.reviewer: jessiwang
author: JessicaXYWang
ms.author: jessiwang
ms.date: 05/08/2023
---

# Your First SynapseML Model
This tutorial provides a brief introduction to building your first machine learning model using SynapseML, demonstrating how SynapseML makes it easy to do complex machine learning tasks. We use SynapseML to create a small ML training pipeline with a featurization stage and LightGBM regression stage to predict ratings based on review text from a dataset containing book reviews from Amazon. Finally we showcase how SynapseML makes it easy to use prebuilt models to solve problems without having to re-solve them yourself.

## Prerequisites

* Attach your notebook to a lakehouse. On the left side, select **Add** to add an existing lakehouse or create a lakehouse.
* Cognitive Services Key. To obtain a Cognitive Services key, follow the [Quickstart](/azure/cognitive-services/cognitive-services-apis-create-account).

## Set up your Environment
Import SynapseML libraries and initialize your spark session.


```python
from pyspark.sql import SparkSession
from synapse.ml.core.platform import *

spark = SparkSession.builder.getOrCreate()


```

## Load a Dataset
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

## Make our Model
Create a simple pipeline to featurize the data using the `TextFeaturizer` from `synapse.ml.featurize.text` and derive a rating from the `LightGBMRegressor`.


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

## Predict
call the `transform` function on the model to predict and display the output dataframe!


```python
display(model.transform(test))
```

## Alternate route - Let the Cognitive Services handle it!
For tasks like this that have a prebuilt solution, try using SynapseML's integration with Cognitive Services to transform your data in one step.


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

## Next steps

- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use Cognitive Services with SynapseML](overview-cognitive-services.md)
- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
