---
title: How to train models with scikit-learn
description: Learn how to train models with scikit-learn, a popular open-source machine learning framework that's frequently used for supervised and unsupervised learning.
ms.reviewer: ssalgado
ms.author: negust
author: nelgson
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Train models with scikit-learn
---

# How to train models with scikit-learn in Microsoft Fabric

Scikit-learn ([scikit-learn.org](https://scikit-learn.org)) is a popular, open-source machine learning framework. It's frequently used for supervised and unsupervised learning. It also provides various tools for model fitting, data preprocessing, model selection, model evaluation, and more.  



In this section, we'll go through an example of how you can train and track the iterations of your Scikit-Learn model.

## Install scikit-learn

To get started with scikit-learn, you must ensure that it's installed within your notebook. You can install or upgrade the version of scikit-learn on your environment using the following command:

```shell
%pip install scikit-learn
```

Next, we'll create a machine learning experiment using the MLFLow API. The MLflow set_experiment() API will create a new machine learning experiment if it doesn't already exist.

```python
import mlflow

mlflow.set_experiment("sample-sklearn")
```

## Train a scikit-learn model

After the experiment has been created, we'll create a sample dataset and create a logistic regression model. We'll also start a MLflow run and track the metrics, parameters, and final logistic regression model. Once we've generated the final model, we'll also save the resulting model for additional tracking.

```python
import mlflow.sklearn
import numpy as np
from sklearn.linear_model import LogisticRegression
from mlflow.models.signature import infer_signature

with mlflow.start_run() as run:

    lr = LogisticRegression()
    X = np.array([-2, -1, 0, 1, 2, 1]).reshape(-1, 1)
    y = np.array([0, 0, 1, 1, 1, 0])
    lr.fit(X, y)
    score = lr.score(X, y)
    signature = infer_signature(X, y)

    print("log_metric.")
    mlflow.log_metric("score", score)

    print("log_params.")
    mlflow.log_param("alpha", "alpha")

    print("log_model.")
    mlflow.sklearn.log_model(lr, "sklearn-model", signature=signature)
    print("Model saved in run_id=%s" % run.info.run_id)

    print("register_model.")
    mlflow.register_model(

        "runs:/{}/sklearn-model".format(run.info.run_id), "sample-sklearn"
    )
    print("All done")
```

## Load and evaluate the model on a sample dataset

Once the model is saved, it can also be loaded for inferencing. To do this, we'll load the model and run the inference on a sample dataset.

```python
# Inference with loading the logged model
from synapse.ml.predict import MLflowTransformer

spark.conf.set("spark.synapse.ml.predict.enabled", "true")

model = MLflowTransformer(
    inputCols=["x"],
    outputCol="prediction",
    modelName="sample-sklearn",
    modelVersion=1,
)

test_spark = spark.createDataFrame(
    data=np.array([-2, -1, 0, 1, 2, 1]).reshape(-1, 1).tolist(), schema=["x"]
)

batch_predictions = model.transform(test_spark)

batch_predictions.show()
```

## Related content

- Learn about [machine learning models](machine-learning-model.md).
- Learn about [machine learning experiments](machine-learning-experiment.md).
