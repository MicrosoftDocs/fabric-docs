---
title: Create, train, and evaluate an uplift model
description: AI sample for creating, training, and evaluating an uplift model.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.subservice: data-science
ms.topic: tutorial
ms.date: 02/10/2023
---

# Creating, training and evaluating uplift models

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this notebook, we demonstrate how to create, train and evaluate uplift models and apply uplift modeling technique.

- What is uplift modeling?

    It's a family of causal inference technology that uses machine learning models to estimate the causal impact of some treatment on an individual's behavior.

  - **Persuadables** only respond positive to the treatment
  - **Sleeping-dogs** have a strong negative response to the treatment
  - **Lost Causes** never reach the outcome even with the treatment
  - **Sure Things** always reach the outcome with or without the treatment

  The goal of uplift modeling is to identify the "persuadables", not waste efforts on "sure things" and "lost causes", and avoid bothering "sleeping dogs"

- How does uplift modeling work?

  - **Meta Learner**: predicts the difference between an individual's behavior when there's a treatment and when there's no treatment
  - **Uplift Tree**: a tree-based algorithm where the splitting criterion is based on differences in uplift
  - **NN-based Model**：a neural network model that usually works with observational data

- Where can uplift modeling work?

  - Marketing: help to identify persuadables to apply a treatment such as a coupon or an online advertisement
  - Medical Treatment: help to understand how a treatment can impact certain groups differently

## Step 1: Load the data

### Notebook configurations

By defining below parameters, we can apply this notebook on different datasets easily.

```python
IS_CUSTOM_DATA = False  # if True, dataset has to be uploaded manually by user
DATA_FOLDER = "Files/uplift-modelling"
DATA_FILE = "criteo-research-uplift-v2.1.csv"

# data schema
FEATURE_COLUMNS = [f"f{i}" for i in range(12)]
TREATMENT_COLUMN = "treatment"
LABEL_COLUMN = "visit"

EXPERIMENT_NAME = "aisample-upliftmodelling"  # mlflow experiment name
```

### Import dependencies

```python
import pyspark.sql.functions as F
from pyspark.sql.window import Window
from pyspark.sql.types import *

import numpy as np
import pandas as pd

import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.style as style
import seaborn as sns

%matplotlib inline


from synapse.ml.featurize import Featurize
from synapse.ml.core.spark import FluentAPI
from synapse.ml.lightgbm import *
from synapse.ml.train import ComputeModelStatistics

import os
import gzip

import mlflow
```

### Download dataset and upload to Lakehouse

**Please add a Lakehouse to the notebook before running it.**

- Dataset description: This dataset was created by The Criteo AI Lab. The dataset consists of 13M rows, each one representing a user with 12 features, a treatment indicator and 2 binary labels (visits and conversions).
  - f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11: feature values (dense, float)
  - treatment: treatment group (1 = treated, 0 = control) which indicates if a customer was targeted by advertising randomly
  - conversion: whether a conversion occurred for this user (binary, label)
  - visit: whether a visit occurred for this user (binary, label)

- Dataset homepage: [https://ailab.criteo.com/criteo-uplift-prediction-dataset/](https://ailab.criteo.com/criteo-uplift-prediction-dataset/)

- Citation:

   ```
   @inproceedings{Diemert2018,
   author = {{Diemert Eustache, Betlei Artem} and Renaudin, Christophe and Massih-Reza, Amini},
   title={A Large Scale Benchmark for Uplift Modeling},
   publisher = {ACM},
   booktitle = {Proceedings of the AdKDD and TargetAd Workshop, KDD, London,United Kingdom, August, 20, 2018},
   year = {2018}
   }
   ```

   ```python
   if not IS_CUSTOM_DATA:
       # Download demo data files into lakehouse if not exist
       import os, requests

       remote_url = "http://go.criteo.net/criteo-research-uplift-v2.1.csv.gz"
       download_file = "criteo-research-uplift-v2.1.csv.gz"
       download_path = f"/lakehouse/default/{DATA_FOLDER}/raw"

       if not os.path.exists("/lakehouse/default"):
           raise FileNotFoundError(
               "Default lakehouse not found, please add a lakehouse and restart the session."
           )
       os.makedirs(download_path, exist_ok=True)
       if not os.path.exists(f"{download_path}/{DATA_FILE}"):
           r = requests.get(f"{remote_url}", timeout=30)
           with open(f"{download_path}/{download_file}", "wb") as f:
               f.write(r.content)
           with gzip.open(f"{download_path}/{download_file}", "rb") as fin:
               with open(f"{download_path}/{DATA_FILE}", "wb") as fout:
                   fout.write(fin.read())
       print("Downloaded demo data files into lakehouse.")
   ```

### Read data from Lakehouse

```python
raw_df = spark.read.csv(
    f"{DATA_FOLDER}/raw/{DATA_FILE}", header=True, inferSchema=True
).cache()

display(raw_df.limit(20))
```

## Step 2: Prepare the dataset

### Data exploration

- **The overall rate of users that visit/convert**

   ```python
   raw_df.select(
       F.mean("visit").alias("Percentage of users that visit"),
       F.mean("conversion").alias("Percentage of users that convert"),
       (F.sum("conversion") / F.sum("visit")).alias("Percentage of visitors that convert"),
   ).show()
   ```

- **The overall average treatment effect on visit**

   ```python
   raw_df.groupby("treatment").agg(
       F.mean("visit").alias("Mean of visit"),
       F.sum("visit").alias("Sum of visit"),
       F.count("visit").alias("Count"),
   ).show()
   ```

- **The overall average treatment effect on conversion**

   ```python
   raw_df.groupby("treatment").agg(
       F.mean("conversion").alias("Mean of conversion"),
       F.sum("conversion").alias("Sum of conversion"),
       F.count("conversion").alias("Count"),
   ).show()
   ```

### Split train-test dataset

```python
transformer = (
    Featurize().setOutputCol("features").setInputCols(FEATURE_COLUMNS).fit(raw_df)
)

df = transformer.transform(raw_df)
```

```python
train_df, test_df = df.randomSplit([0.8, 0.2], seed=42)

print("Size of train dataset: %d" % train_df.count())
print("Size of test dataset: %d" % test_df.count())

train_df.groupby(TREATMENT_COLUMN).count().show()
```

### Split treatment-control dataset

```python
treatment_train_df = train_df.where(f"{TREATMENT_COLUMN} > 0")
control_train_df = train_df.where(f"{TREATMENT_COLUMN} = 0")
```

## Step 3: Model training and evaluation

### Uplift modeling: T-Learner with LightGBM

```python
classifier = (
    LightGBMClassifier()
    .setFeaturesCol("features")
    .setNumLeaves(10)
    .setNumIterations(100)
    .setObjective("binary")
    .setLabelCol(LABEL_COLUMN)
)

treatment_model = classifier.fit(treatment_train_df)
control_model = classifier.fit(control_train_df)
```

### Predict on test dataset

```python
getPred = F.udf(lambda v: float(v[1]), FloatType())

test_pred_df = (
    test_df.mlTransform(treatment_model)
    .withColumn("treatment_pred", getPred("probability"))
    .drop("rawPrediction", "probability", "prediction")
    .mlTransform(control_model)
    .withColumn("control_pred", getPred("probability"))
    .drop("rawPrediction", "probability", "prediction")
    .withColumn("pred_uplift", F.col("treatment_pred") - F.col("control_pred"))
    .select(
        TREATMENT_COLUMN, LABEL_COLUMN, "treatment_pred", "control_pred", "pred_uplift"
    )
    .cache()
)

display(test_pred_df.limit(20))
```

### Model evaluation

Since actual uplift can't be observed for each individual, we measure the uplift over a group of customers.

- **Uplift Curve**: plots the real cumulative uplift across the population

First, we rank the test dataframe order by the predict uplift.

```python
test_ranked_df = test_pred_df.withColumn(
    "percent_rank", F.percent_rank().over(Window.orderBy(F.desc("pred_uplift")))
)

display(test_ranked_df.limit(20))
```

Next, we calculate the cumulative percentage of visits in each group (treatment or control).

```python
C = test_ranked_df.where(f"{TREATMENT_COLUMN} == 0").count()
T = test_ranked_df.where(f"{TREATMENT_COLUMN} != 0").count()

test_ranked_df = (
    test_ranked_df.withColumn(
        "control_label",
        F.when(F.col(TREATMENT_COLUMN) == 0, F.col(LABEL_COLUMN)).otherwise(0),
    )
    .withColumn(
        "treatment_label",
        F.when(F.col(TREATMENT_COLUMN) != 0, F.col(LABEL_COLUMN)).otherwise(0),
    )
    .withColumn(
        "control_cumsum",
        F.sum("control_label").over(Window.orderBy("percent_rank")) / C,
    )
    .withColumn(
        "treatment_cumsum",
        F.sum("treatment_label").over(Window.orderBy("percent_rank")) / T,
    )
)

display(test_ranked_df.limit(20))
```

Finally, we calculate the group's uplift at each percentage.

```python
test_ranked_df = test_ranked_df.withColumn(
    "group_uplift", F.col("treatment_cumsum") - F.col("control_cumsum")
).cache()

display(test_ranked_df.limit(20))
```

Now we can plot the uplift curve on the prediction of the test dataset. We need to convert the pyspark dataframe to pandas dataframe before plotting.

```python
def uplift_plot(uplift_df):
    """
    Plot the uplift curve
    """
    gain_x = uplift_df.percent_rank
    gain_y = uplift_df.group_uplift
    # plot the data
    plt.figure(figsize=(10, 6))
    mpl.rcParams["font.size"] = 8

    ax = plt.plot(gain_x, gain_y, color="#2077B4", label="Normalized Uplift Model")

    plt.plot(
        [0, gain_x.max()],
        [0, gain_y.max()],
        "--",
        color="tab:orange",
        label="Random Treatment",
    )
    plt.legend()
    plt.xlabel("Porportion Targeted")
    plt.ylabel("Uplift")
    plt.grid(b=True, which="major")

    return ax


test_ranked_pd_df = test_ranked_df.select(
    ["pred_uplift", "percent_rank", "group_uplift"]
).toPandas()
uplift_plot(test_ranked_pd_df)
```

:::image type="content" source="media\uplift-modeling\criteo-uplift-curve.png" alt-text="Chart showing a normalized uplift model curve versus random treatment." lightbox="media\uplift-modeling\criteo-uplift-curve.png":::

From the uplift curve in the previous example, we notice that the top 20% population ranked by our prediction have a large gain if they were given the treatment, which means they're the **persuadables**. Therefore, we can print the cutoff score at 20% percentage to identify the target customers.

```python
cutoff_percentage = 0.2
cutoff_score = test_ranked_pd_df.iloc[int(len(test_ranked_pd_df) * cutoff_percentage)][
    "pred_uplift"
]

print("Uplift score higher than {:.4f} are Persuadables".format(cutoff_score))
```

### Log and load model with MLflow

Now that we have a trained model, we can save it for later use. Here we use MLflow to log metrics and models. We can also use this API to load models for prediction.

```python
# setup mlflow
mlflow.set_experiment(EXPERIMENT_NAME)
```

```python
# log model, metrics and params
with mlflow.start_run() as run:
    print("log model:")
    mlflow.spark.log_model(
        treatment_model,
        f"{EXPERIMENT_NAME}-treatmentmodel",
        registered_model_name=f"{EXPERIMENT_NAME}-treatmentmodel",
        dfs_tmpdir="Files/spark",
    )

    mlflow.spark.log_model(
        control_model,
        f"{EXPERIMENT_NAME}-controlmodel",
        registered_model_name=f"{EXPERIMENT_NAME}-controlmodel",
        dfs_tmpdir="Files/spark",
    )

    model_uri = f"runs:/{run.info.run_id}/{EXPERIMENT_NAME}"
    print("Model saved in run %s" % run.info.run_id)
    print(f"Model URI: {model_uri}-treatmentmodel")
    print(f"Model URI: {model_uri}-controlmodel")
```

```python
# load model back
loaded_treatmentmodel = mlflow.spark.load_model(
    f"{model_uri}-treatmentmodel", dfs_tmpdir="Files/spark"
)
```
