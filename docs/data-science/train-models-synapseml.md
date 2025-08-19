---
title: How to train models with SynapseML
description: Learn how to train models with SynapseML
ms.author: scottpolly
author: s-polly
ms.reviewer: jessiwang
reviewer: JessicaXYWang
ms.topic: how-to
ms.custom: 
ms.date: 04/14/2025
---

# How to train models with SynapseML

The [SynapseML](https://microsoft.github.io/SynapseML/) tool ecosystem expands the Apache Spark distributed computing framework in several new spaces. SynapseML adds many deep learning and data science tools to the Spark ecosystem:

- Seamless integration of Spark Machine Learning pipelines with Microsoft Cognitive Toolkit (CNTK)
- LightGBM
- OpenCV

These tools make possible powerful and highly scalable predictive and analytical models, for many types of datasources.

This section describes how to train your SynapseML model.

## Prerequisites

Import numpy and pandas:

```python
import numpy as np
import pandas as pd
```

## Read in data

A typical Spark application involves huge datasets stored on a distributed file system - for example, HDFS. However, to simplify things here, copy over a small dataset from a URL. Then, read this data into memory with the Pandas CSV reader, and distribute the data as a Spark DataFrame. Finally, show the first five rows of the dataset:

```python
dataFile = "AdultCensusIncome.csv"
import os, urllib
if not os.path.isfile(dataFile):
    urllib.request.urlretrieve("https://mmlspark.azureedge.net/datasets/" + dataFile, dataFile)
data = spark.createDataFrame(pd.read_csv(dataFile, dtype={" hours-per-week": np.float64}))
data.show(5)
```

## Select features and split data, to train and test sets

Select some features to use in our model. You can try out different features, but you should include `" income"` because it's the label column the model tries to predict. Then split the data into `train` and `test` sets:

```python
data = data.select([" education", " marital-status", " hours-per-week", " income"])
train, test = data.randomSplit([0.75, 0.25], seed=123)
```

## Train a model

To train the classifier model, use the `synapse.ml.TrainClassifier` class. It takes in training data and a base SparkML classifier, maps the data into the format the base classifier algorithm expects, and fits a model:

```python
from synapse.ml.train import TrainClassifier
from pyspark.ml.classification import LogisticRegression
model = TrainClassifier(model=LogisticRegression(), labelCol=" income").fit(train)
```

`TrainClassifier` implicitly handles string-valued columns and binarizes the label column.

## Score and evaluate the model

Finally, score the model against the test set, and use the `synapse.ml.ComputeModelStatistics` class to compute:

- Accuracy
- AUC
- Precision
- Recall

Metrics from the scored data:

```python
from synapse.ml.train import ComputeModelStatistics
prediction = model.transform(test)
metrics = ComputeModelStatistics().transform(prediction)
metrics.select('accuracy').show()
```

That's it! You built your first machine learning model with the SynapseML package. Use the Python `help()` function for more information about SynapseML classes and methods:

```python
import synapse.ml.train.TrainClassifier
help(synapse.ml.train.TrainClassifier)
```

## Related content

- [Explore and validate relationships in semantic models (preview)](semantic-link-validate-relationship.md)
- [Track models with MLflow](mlflow-autologging.md)
