---
title: 'Tutorial: Create, train, and evaluate an uplift model'
description: Review this notebook to learn how to create, train, and evaluate uplift models and apply uplift modeling techniques.
ms.reviewer: franksolomon
ms.author: narsam
author: narmeens
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/15/2023
#customer intent: As a data scientist, I want to build an uplift model so I can estimate causal impact.
---

# Tutorial: Create, train, and evaluate an uplift model

In this tutorial, you walk through an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. You learn how to create, train, and evaluate uplift models and apply uplift modeling techniques.

Uplift modeling is a family of causal inference technology that uses machine learning models to estimate the causal effect of a treatment on an individual's behavior. This type of modeling classifies individuals into these categories:

- *Persuadables* only respond positively to the treatment.
- *Sleeping dogs* have a strong negative response to the treatment.
- *Lost causes* never reach the outcome, even with the treatment.
- *Sure things* always reach the outcome with or without the treatment.

The goal is to identify the *persuadables*, avoid wasted effort on *sure things* and *lost causes*, and avoid bothering *sleeping dogs*.

Uplift modeling has these components:

- **Meta learner**: An algorithm that predicts the difference in an individual's behavior between when the individual does and doesn't undergo a treatment.
- **Uplift tree**: A tree-based algorithm that combines both treatment/control group assignment information and response information directly into decisions about splitting criteria for a node.
- **NN-based model**：A neural network model that usually works with observational data. It uses deep learning to help determine the distribution of a latent variable. The latent variable represents the cofounder in the uplift modeling.

Uplift modeling can work in these areas:

- In marketing, it can help identify persuadables who can potentially be swayed to try the treatment. The outreach to identify persuadables might involve a coupon or an online advertisement, for example.
- In medicine, it can help measure how a particular treatment can affect distinct groups. This measurement allows for optimized target selection, to maximize the impact.

The main steps in this tutorial are:

> [!div class="checklist"]
>
> - Upload the data into a lakehouse.
> - Perform exploratory analysis on the data.
> - Train a model.
> - Log and load the model by using MLflow.

## Prerequisites

- Familiarity with [Microsoft Fabric notebooks](/fabric/data-engineering/how-to-use-notebook).
- A lakehouse to store data for this example. For more information, see [Add a lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

## Follow along in a notebook

You can follow along in a notebook in one of two ways:

- Open and run the built-in notebook in the Synapse Data Science experience.
- Upload your notebook from GitHub to the Synapse Data Science experience.

### Open the built-in notebook

**Uplift modeling** is the sample notebook that accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AIsample - Uplift Modeling.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Uplift%20Modelling.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/python/AIsample%20-%20Uplift%20Modeling.ipynb -->

## Step 1: Load the data

The following examples assume that you run the code from cells in a notebook. For information on creating and using notebooks, see [How to use notebooks](../data-engineering/how-to-use-notebook.md).

### Configure the notebook

Define the following parameters so that you can apply this notebook on different datasets:

```python
IS_CUSTOM_DATA = False  # If True, the user has to upload the dataset manually
DATA_FOLDER = "Files/uplift-modelling"
DATA_FILE = "criteo-research-uplift-v2.1.csv"

# Data schema
FEATURE_COLUMNS = [f"f{i}" for i in range(12)]
TREATMENT_COLUMN = "treatment"
LABEL_COLUMN = "visit"

EXPERIMENT_NAME = "aisample-upliftmodelling"  # MLflow experiment name
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

### Download the dataset and upload to the lakehouse

> [!IMPORTANT]
> Be sure to [add a lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks) before you run it.

This tutorial uses the [Criteo Uplift Prediction Dataset](https://ailab.criteo.com/criteo-uplift-prediction-dataset/) from Criteo AI Lab. The dataset has 13 million rows. Each row represents a user with 12 features, a treatment indicator, and two binary labels (conversions and visits). Here are the details:

- `f0`, `f1`, `f2`, `f3`, `f4`, `f5`, `f6`, `f7`, `f8`, `f9`, `f10`, `f11`: feature values (`dense`, `float`)
- `treatment`: treatment group (`1` = treated, `0` = control), which indicates if advertising randomly targeted a customer
- `conversion`: whether a conversion occurred for this user (`binary`, `label`)
- `visit`: whether a visit occurred for this user (`binary`, `label`)

Here's a citation for the dataset:

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
    # Download demo data files into the lakehouse if they don't exist
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

### Read data from the lakehouse

```python
raw_df = spark.read.csv(
    f"{DATA_FOLDER}/raw/{DATA_FILE}", header=True, inferSchema=True
).cache()

display(raw_df.limit(20))
```

## Step 2: Prepare the dataset

### Explore the data

Use this code for the overall rate of users who visit and convert:

```python
raw_df.select(
    F.mean("visit").alias("Percentage of users that visit"),
    F.mean("conversion").alias("Percentage of users that convert"),
    (F.sum("conversion") / F.sum("visit")).alias("Percentage of visitors that convert"),
).show()
```

Use this code for the overall average treatment effect on visits:

```python
raw_df.groupby("treatment").agg(
    F.mean("visit").alias("Mean of visit"),
    F.sum("visit").alias("Sum of visit"),
    F.count("visit").alias("Count"),
).show()
```

Use this code for the overall average treatment effect on conversion:

```python
raw_df.groupby("treatment").agg(
    F.mean("conversion").alias("Mean of conversion"),
    F.sum("conversion").alias("Sum of conversion"),
    F.count("conversion").alias("Count"),
).show()
```

### Split the training and testing datasets

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

### Split the treatment and control datasets

```python
treatment_train_df = train_df.where(f"{TREATMENT_COLUMN} > 0")
control_train_df = train_df.where(f"{TREATMENT_COLUMN} = 0")
```

## Step 3: Train and evaluate the model

### Conduct uplift modeling: T-Learner with LightGBM

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

### Predict on the testing dataset

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

### Evaluate the model

Because you can't observe uplift for each individual, measure the uplift over a group of customers. An *uplift curve* plots the real cumulative uplift across the population.

First, rank the test DataFrame order by the predicted uplift:

```python
test_ranked_df = test_pred_df.withColumn(
    "percent_rank", F.percent_rank().over(Window.orderBy(F.desc("pred_uplift")))
)

display(test_ranked_df.limit(20))
```

Calculate the cumulative percentage of visits in each group (treatment or control):

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

Calculate the group's uplift at each percentage:

```python
test_ranked_df = test_ranked_df.withColumn(
    "group_uplift", F.col("treatment_cumsum") - F.col("control_cumsum")
).cache()

display(test_ranked_df.limit(20))
```

Now, plot the uplift curve on the prediction of the testing dataset. You must convert the PySpark DataFrame to a pandas DataFrame before plotting.

```python
def uplift_plot(uplift_df):
    """
    Plot the uplift curve
    """
    gain_x = uplift_df.percent_rank
    gain_y = uplift_df.group_uplift
    # Plot the data
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
    plt.grid()

    return ax


test_ranked_pd_df = test_ranked_df.select(
    ["pred_uplift", "percent_rank", "group_uplift"]
).toPandas()
uplift_plot(test_ranked_pd_df)
```

:::image type="content" source="media\uplift-modeling\criteo-uplift-curve.png" alt-text="Chart that shows a normalized uplift model curve versus random treatment." lightbox="media\uplift-modeling\criteo-uplift-curve.png":::

From the uplift curve in this example, the top 20% population, ranked by your prediction, has a large gain with the treatment. This means they're the *persuadables*. You can print the cutoff score at 20% to identify the target customers:

```python
cutoff_percentage = 0.2
cutoff_score = test_ranked_pd_df.iloc[int(len(test_ranked_pd_df) * cutoff_percentage)][
    "pred_uplift"
]

print("Uplift score higher than {:.4f} are Persuadables".format(cutoff_score))
```

## Step 4: Log and load the model by using MLflow

Now that you have a trained model, save it for later use. In this example, MLflow logs metrics and models. You can also use this API to load models for prediction.

```python
# Set up MLflow
mlflow.set_experiment(EXPERIMENT_NAME)
```

```python
# Log models, metrics, and parameters
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
# Load the model back
loaded_treatmentmodel = mlflow.spark.load_model(
    f"{model_uri}-treatmentmodel", dfs_tmpdir="Files/spark"
)
```

<!-- nbend -->

## Related content

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
