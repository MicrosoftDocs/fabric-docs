---
title: Hyperparameter tuning - Fighting Breast Cancer
description: Identify the best combination of hyperparameters for your chosen classifiers with SynapseML.
ms.topic: overview
ms.custom:
ms.author: scottpolly
author: s-polly
ms.reviewer: fsolomon
reviewer: JessicaXYWang

ms.date: 04/04/2025
---

# HyperParameterTuning - fighting breast cancer

This tutorial shows how to use SynapseML to identify the best combination of hyperparameters for chosen classifiers, to build more accurate and reliable models. The tutorial shows how to perform distributed randomized grid search hyperparameter tuning to build a model that identifies breast cancer.

## Set up the dependencies

Import pandas and set up a Spark session:

```python
import pandas as pd
from pyspark.sql import SparkSession

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()
```

Read the data, and split it into tuning and test sets:

```python
data = spark.read.parquet(
    "wasbs://publicwasb@mmlspark.blob.core.windows.net/BreastCancer.parquet"
).cache()
tune, test = data.randomSplit([0.80, 0.20])
tune.limit(10).toPandas()
```

Define the models to use:

```python
from synapse.ml.automl import TuneHyperparameters
from synapse.ml.train import TrainClassifier
from pyspark.ml.classification import (
    LogisticRegression,
    RandomForestClassifier,
    GBTClassifier,
)

logReg = LogisticRegression()
randForest = RandomForestClassifier()
gbt = GBTClassifier()
smlmodels = [logReg, randForest, gbt]
mmlmodels = [TrainClassifier(model=model, labelCol="Label") for model in smlmodels]
```

## Use AutoML to find the best model

Import the SynapseML AutoML classes from `synapse.ml.automl`. Specify the hyperparameters with `HyperparamBuilder`. Add either `DiscreteHyperParam` or `RangeHyperParam` hyperparameters. `TuneHyperparameters` randomly chooses values from a uniform distribution:

```python
from synapse.ml.automl import *

paramBuilder = (
    HyperparamBuilder()
    .addHyperparam(logReg, logReg.regParam, RangeHyperParam(0.1, 0.3))
    .addHyperparam(randForest, randForest.numTrees, DiscreteHyperParam([5, 10]))
    .addHyperparam(randForest, randForest.maxDepth, DiscreteHyperParam([3, 5]))
    .addHyperparam(gbt, gbt.maxBins, RangeHyperParam(8, 16))
    .addHyperparam(gbt, gbt.maxDepth, DiscreteHyperParam([3, 5]))
)
searchSpace = paramBuilder.build()
# The search space is a list of params to tuples of estimator and hyperparam
print(searchSpace)
randomSpace = RandomSpace(searchSpace)
```

Run TuneHyperparameters to get the best model:

```python
bestModel = TuneHyperparameters(
    evaluationMetric="accuracy",
    models=mmlmodels,
    numFolds=2,
    numRuns=len(mmlmodels) * 2,
    parallelism=1,
    paramSpace=randomSpace.space(),
    seed=0,
).fit(tune)
```

## Evaluate the model

View the parameters of the best model, and retrieve the underlying best model pipeline:

```python
print(bestModel.getBestModelInfo())
print(bestModel.getBestModel())
```

Score against the test set, and view the metrics:

```python
from synapse.ml.train import ComputeModelStatistics

prediction = bestModel.transform(test)
metrics = ComputeModelStatistics().transform(prediction)
metrics.limit(10).toPandas()
```

## Related content

- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use Azure AI services with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
