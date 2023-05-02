---
title: How to train models with SynapseML
description: Learn how to train models with SynapseML
ms.reviewer: jessiwang
ms.author: jessiwang
author: jessiwang
ms.topic: how-to
ms.date: 04/10/2023
---
# How to train models with SynapseML

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

[SynapseML](https://microsoft.github.io/SynapseML/) is an ecosystem of tools aimed towards expanding the distributed computing framework Apache Spark in several new directions. SynapseML adds many deep learning and data science tools to the Spark ecosystem, including seamless integration of Spark Machine Learning pipelines with Microsoft Cognitive Toolkit (CNTK), LightGBM and OpenCV. These tools enable powerful and highly scalable predictive and analytical models for many types of datasources.

In this section, we'll go through an example of how you can train your SynapseML model.

## Importing Packages

Start by importing numpy and pandas as they'll be used in the sample.

```python
import numpy as np
import pandas as pd
```

## Reading in Data

In a typical Spark application, you'll likely work with huge datasets stored on a distributed file system, such as HDFS. However, to keep this tutorial simple and quick, we'll copy over a small dataset from a URL. We then read this data into memory using Pandas CSV reader, and distribute the data as a Spark DataFrame. Finally, we show the first 5 rows of the dataset.

```python
dataFile = "AdultCensusIncome.csv"
import os, urllib
if not os.path.isfile(dataFile):
    urllib.request.urlretrieve("https://mmlspark.azureedge.net/datasets/" + dataFile, dataFile)
data = spark.createDataFrame(pd.read_csv(dataFile, dtype={" hours-per-week": np.float64}))
data.show(5)
```

## Selecting Features and Splitting Data to Train and Test Sets

Next, select some features to use in our model. You can try out different
features, but you should include `" income"` as it is the label column the model is trying to predict. We then split the data into a `train` and `test` sets.

```python
data = data.select([" education", " marital-status", " hours-per-week", " income"])
train, test = data.randomSplit([0.75, 0.25], seed=123)
```

## Training a Model

To train the classifier model, we use the `synapse.ml.TrainClassifier` class. It takes in training data and a base SparkML classifier, maps the data into the format expected by the base classifier algorithm, and fits a model.

```python
from synapse.ml.train import TrainClassifier
from pyspark.ml.classification import LogisticRegression
model = TrainClassifier(model=LogisticRegression(), labelCol=" income").fit(train)
```

`TrainClassifier` implicitly handles string-valued columns and
binarizes the label column.

## Scoring and Evaluating the Model

Finally, let's score the model against the test set, and use the `synapse.ml.ComputeModelStatistics` class to compute metrics such as accuracy, AUC, precision, and recall from the scored data.

```python
from synapse.ml.train import ComputeModelStatistics
prediction = model.transform(test)
metrics = ComputeModelStatistics().transform(prediction)
metrics.select('accuracy').show()
```

And that's it! you've build your first machine learning model using the SynapseML
package. For help on SynapseML classes and methods, you can use Python's help() function.

```python
help(synapse.ml.train.TrainClassifier)
```