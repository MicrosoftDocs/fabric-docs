---
title: Classification tasks using SynapseML
description: Perform the same classification task with and without SynapseML.
ms.topic: how-to
ms.custom: 
ms.author: scottpolly
author: s-polly
ms.reviewer: jessiwang
reviewer: JessicaXYWang
ms.date: 04/23/2025
---

# Classification tasks using SynapseML

This article shows how to perform a specific classification task with two methods. One method uses plain **`pyspark`**, and one method uses the **`synapseml`** library. Although the methods yield the same performance, they highlight the simplicity of `synapseml` as compared to `pyspark`.

The task described in this article predicts whether or not a specific customer review of book sold on Amazon is good (rating > 3) or bad, based on the review text. To build the task, you train **LogisticRegression** learners with different hyperparameters, and then choose the best model.

## Prerequisites

Attach your notebook to a lakehouse. On the left side, you can select **Add** to add an existing lakehouse, or you can create a new lakehouse.

## Setup

Import the necessary Python libraries, and get a Spark session:

```python
from pyspark.sql import SparkSession

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()
```

## Read the data

Download, and read in the data:

```python
rawData = spark.read.parquet(
    "wasbs://publicwasb@mmlspark.blob.core.windows.net/BookReviewsFromAmazon10K.parquet"
)
rawData.show(5)
```

## Extract features and process data

Real data has more complexity, compared to the dataset we downloaded earlier. A dataset often has features of multiple types - for example, text, numeric, and categorical. To show the difficulties of working with these datasets, add two numerical features to the dataset: the **word count** of the review and the **mean word length**:

```python
from pyspark.sql.functions import udf
from pyspark.sql.types import *


def wordCount(s):
    return len(s.split())


def wordLength(s):
    import numpy as np

    ss = [len(w) for w in s.split()]
    return round(float(np.mean(ss)), 2)


wordLengthUDF = udf(wordLength, DoubleType())
wordCountUDF = udf(wordCount, IntegerType())
```

```python
from synapse.ml.stages import UDFTransformer

wordLength = "wordLength"
wordCount = "wordCount"
wordLengthTransformer = UDFTransformer(
    inputCol="text", outputCol=wordLength, udf=wordLengthUDF
)
wordCountTransformer = UDFTransformer(
    inputCol="text", outputCol=wordCount, udf=wordCountUDF
)
```

```python
from pyspark.ml import Pipeline

data = (
    Pipeline(stages=[wordLengthTransformer, wordCountTransformer])
    .fit(rawData)
    .transform(rawData)
    .withColumn("label", rawData["rating"] > 3)
    .drop("rating")
)
```

```python
data.show(5)
```

## Classify using pyspark

To choose the best LogisticRegression classifier using the `pyspark` library, you must *explicitly* perform these steps:

1. Process the features
   - Tokenize the text column
   - Hash the tokenized column into a vector using hashing
   - Merge the numeric features with the vector
1. To process the label column, cast that column into the proper type
1. Train multiple LogisticRegression algorithms on the `train` dataset, with different hyperparameters
1. Compute the area under the ROC curve for each of the trained models, and select the model with the highest metric as computed on the `test` dataset
1. Evaluate the best model on the `validation` set

```python
from pyspark.ml.feature import Tokenizer, HashingTF
from pyspark.ml.feature import VectorAssembler

# Featurize text column
tokenizer = Tokenizer(inputCol="text", outputCol="tokenizedText")
numFeatures = 10000
hashingScheme = HashingTF(
    inputCol="tokenizedText", outputCol="TextFeatures", numFeatures=numFeatures
)
tokenizedData = tokenizer.transform(data)
featurizedData = hashingScheme.transform(tokenizedData)

# Merge text and numeric features in one feature column
featureColumnsArray = ["TextFeatures", "wordCount", "wordLength"]
assembler = VectorAssembler(inputCols=featureColumnsArray, outputCol="features")
assembledData = assembler.transform(featurizedData)

# Select only columns of interest
# Convert rating column from boolean to int
processedData = assembledData.select("label", "features").withColumn(
    "label", assembledData.label.cast(IntegerType())
)
```

```python
from pyspark.ml.evaluation import BinaryClassificationEvaluator
from pyspark.ml.classification import LogisticRegression

# Prepare data for learning
train, test, validation = processedData.randomSplit([0.60, 0.20, 0.20], seed=123)

# Train the models on the 'train' data
lrHyperParams = [0.05, 0.1, 0.2, 0.4]
logisticRegressions = [
    LogisticRegression(regParam=hyperParam) for hyperParam in lrHyperParams
]
evaluator = BinaryClassificationEvaluator(
    rawPredictionCol="rawPrediction", metricName="areaUnderROC"
)
metrics = []
models = []

# Select the best model
for learner in logisticRegressions:
    model = learner.fit(train)
    models.append(model)
    scoredData = model.transform(test)
    metrics.append(evaluator.evaluate(scoredData))
bestMetric = max(metrics)
bestModel = models[metrics.index(bestMetric)]

# Get AUC on the validation dataset
scoredVal = bestModel.transform(validation)
print(evaluator.evaluate(scoredVal))
```

## Classify using SynapseML

The `synapseml` option involves simpler steps:

1. The **`TrainClassifier`** Estimator internally featurizes the data, as long as the columns selected in the `train`, `test`, `validation` dataset represent the features

1. The **`FindBestModel`** Estimator finds the best model from a pool of trained models. To do this, it finds the model that performs best on the `test` dataset given the specified metric

1. The **`ComputeModelStatistics`** Transformer computes the different metrics on a scored dataset (in our case, the `validation` dataset) at the same time

```python
from synapse.ml.train import TrainClassifier, ComputeModelStatistics
from synapse.ml.automl import FindBestModel

# Prepare data for learning
train, test, validation = data.randomSplit([0.60, 0.20, 0.20], seed=123)

# Train the models on the 'train' data
lrHyperParams = [0.05, 0.1, 0.2, 0.4]
logisticRegressions = [
    LogisticRegression(regParam=hyperParam) for hyperParam in lrHyperParams
]
lrmodels = [
    TrainClassifier(model=lrm, labelCol="label", numFeatures=10000).fit(train)
    for lrm in logisticRegressions
]

# Select the best model
bestModel = FindBestModel(evaluationMetric="AUC", models=lrmodels).fit(test)


# Get AUC on the validation dataset
predictions = bestModel.transform(validation)
metrics = ComputeModelStatistics().transform(predictions)
print(
    "Best model's AUC on validation set = "
    + "{0:.2f}%".format(metrics.first()["AUC"] * 100)
)
```

## Related content

- [How to use the k-NN (K-Nearest-Neighbors) model with SynapseML](conditional-k-nearest-neighbors-exploring-art.md)
- [How to use ONNX with SynapseML - Deep Learning](onnx-overview.md)
- [How to use Kernel SHAP to explain a tabular classification model](tabular-shap-explainer.md)
