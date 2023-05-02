---
title: SynapseMl first model
description: A quick introduction to building your first machine learning model with SynapseML
ms.topic: overview
ms.reviewer: jessiwang
author: jessiwang
ms.author: jessiwang
ms.date: 05/02/2023
---
# Your first SynapseML Model
This tutorial provides a brief introduction to building your first machine learning model using SynapseML, demonstrating how SynapseML makes it easy to do complex machine learning tasks. We'll use SynapseML to create a small ML training pipeline with a featurization stage and LightGBM regression stage to predict ratings based on review text from a dataset containing book reviews from Amazon. Finally we'll showcase how SynapseML makes it easy to leverage pre-built models to solve problems without having to re-solve them yourself.

## Step 1 - Set up your Environment
Import SynapseML libraries and initialize your spark session.


```python
from pyspark.sql import SparkSession
from synapse.ml.core.platform import *

spark = SparkSession.builder.getOrCreate()

from synapse.ml.core.platform import materializing_display as display
```

## Step 2 - Load a Dataset
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

## Step 3 - Make our Model
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

## Step 4 - Predict
call the `transform` function on the model to predict and display the output dataframe!


```python
display(model.transform(test))
```

## Alternate route - Let the Cognitive Services handle i!
For tasks like this that have a pre-built solution, try using SynapseML's integration with Cognitive Services to transform your data in one step.


```python
from synapse.ml.cognitive import TextSentiment
from synapse.ml.core.platform import find_secret

model = TextSentiment(
    textCol="text",
    outputCol="sentiment",
    subscriptionKey=find_secret("cognitive-api-key"),
).setLocation("eastus")

display(model.transform(test))
```
