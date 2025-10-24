---
title: Train models with scikit-learn in Microsoft Fabric
description: Learn how to train models with scikit-learn, a popular open-source machine learning framework frequently used for supervised and unsupervised learning.
ms.author: scottpolly
author: s-polly
ms.reviewer: negust
reviewer: nelgson
ms.topic: how-to
ms.custom:
ms.date: 09/30/2025
ms.search.form: Train models with scikit-learn

#customer intent: As a developer, I want to use scikit-learn in Microsoft Fabric so that I can train models for supervised and unsupervised learning.
---

# Train models with scikit-learn in Microsoft Fabric

This article describes how to train and track the iterations of a scikit-learn model. [Scikit-learn](https://scikit-learn.org/stable/) is a popular open-source machine learning framework frequently used for supervised and unsupervised learning. The framework provides tools for model fitting, data preprocessing, model selection, model evaluation, and more.

## Prerequisites

Install or upgrade scikit-learn in your notebook with the following command:

```shell
pip install scikit-learn
```

## Set up a machine learning experiment

Create a machine learning experiment with the MLflow API. The MLflow `set_experiment()` function creates a machine learning experiment named `sample-sklearn` if it doesn't exist. 

Run the following code to create the experiment:

```python
import mlflow

mlflow.set_experiment("sample-sklearn")
```

## Train a scikit-learn model

After you set up the experiment, create a sample dataset and train a logistic regression model. The following code starts an MLflow run and tracks metrics, parameters, and the final logistic regression model. After you generate the final model, save it to track it.

Run the following code to create the sample dataset and train the logistic regression model:

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

After you save the model, load it for inference.

Run the following code in your notebook to load the model and generate predictions on a sample dataset:

```python
# Run inference with the logged model
import numpy as np
from synapse.ml.predict import MLFlowTransformer

spark.conf.set("spark.synapse.ml.predict.enabled", "true")

model = MLFlowTransformer(
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

- Explore [machine learning models](machine-learning-model.md).
- Create [machine learning experiments](machine-learning-experiment.md). 
