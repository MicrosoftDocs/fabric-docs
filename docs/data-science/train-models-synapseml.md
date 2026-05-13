---
title: How to train models with SynapseML
description: Train a classification model with SynapseML in a Microsoft Fabric notebook using the TrainClassifier and ComputeModelStatistics classes.
ms.author: scottpolly
author: s-polly
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: how-to
ms.date: 05/13/2026
ai-usage: ai-assisted
---

# How to train models with SynapseML

[SynapseML](https://microsoft.github.io/SynapseML/) extends the Apache Spark distributed computing framework with deep learning and data science tools, including:

- LightGBM for gradient boosting
- OpenCV for image processing
- Seamless integration with Spark ML pipelines

These tools enable powerful, scalable predictive and analytical models for many data sources.

In this article, you train a binary classification model on the Adult Census Income dataset, using the SynapseML `TrainClassifier` wrapper and evaluate it with `ComputeModelStatistics`.

## Quick start overview

| Step | Action | Estimated time |
|------|--------|----------------|
| 1 | Set up prerequisites (workspace, notebook) | 5 min |
| 2 | Import libraries | Less than 1 min |
| 3 | Download and load data | 1 to 2 min |
| 4 | Select features and split data | Less than 1 min |
| 5 | Train the model | 1 to 3 min |
| 6 | Score and evaluate | Less than 1 min |

## Prerequisites

Before you begin, make sure you have the following:

| Requirement | How to verify |
|---|---|
| A [Microsoft Fabric subscription](/fabric/enterprise/licenses) | You can access the Fabric portal at `https://app.fabric.microsoft.com` |
| A Fabric [workspace](/fabric/get-started/create-workspaces) with a capacity assigned | The workspace appears in the left navigation of the Fabric portal |
| A [lakehouse](/fabric/data-engineering/create-lakehouse) attached to your workspace | You can see the lakehouse in your workspace item list |
| A [Fabric notebook](/fabric/data-engineering/how-to-use-notebook) attached to the lakehouse | The notebook opens with a Spark session and shows the lakehouse in the Explorer pane |

> [!NOTE]
> Fabric notebooks provide a pre-configured Spark session (the `spark` variable) and an IPython kernel with common libraries pre-imported. You don't need to install SynapseML, PySpark, NumPy, or pandas separately.

## Step 1: Import libraries

In your Fabric notebook, create a new cell and import the required libraries:

```python
import numpy as np
import pandas as pd
```

**Expected output:** The cell completes with no errors. If you see an `ImportError`, verify that your notebook is attached to a lakehouse and running on a Fabric Spark runtime.

## Step 2: Download and load the data

Download the Adult Census Income dataset and load it into a Spark DataFrame. This dataset contains census features like education, marital status, and hours worked per week, along with an income label column.

```python
import os
import urllib.request

dataFile = "AdultCensusIncome.csv"
if not os.path.isfile(dataFile):
    urllib.request.urlretrieve(
        "https://mmlspark.azureedge.net/datasets/" + dataFile, dataFile
    )
data = spark.createDataFrame(
    pd.read_csv(dataFile, dtype={" hours-per-week": np.float64})
)
data.show(5)
```

> [!NOTE]
> The column names in this dataset include a leading space (for example, `" income"` rather than `"income"`). The code samples in this article preserve those names as-is to match the source CSV.

**Expected output:** A table showing five rows with 15 columns, including `age`, ` workclass`, ` education`, and ` income`. You should see 32,561 total rows:

```python
# Verification: confirm row count
print(f"Row count: {data.count()}")  # Expected: 32561
```

## Step 3: Select features and split the data

Select the feature columns and the label column (` income`), then split the data into training (75%) and test (25%) sets:

```python
data = data.select([" education", " marital-status", " hours-per-week", " income"])
train, test = data.randomSplit([0.75, 0.25], seed=123)
```

**Verification** - confirm the split produced the expected proportions:

```python
print(f"Training rows: {train.count()}")  # Expected: about 24,400
print(f"Test rows: {test.count()}")        # Expected: about 8,100
```

The exact counts might vary slightly, but training should contain approximately 75% of the total rows.

## Step 4: Train the model

Use the `TrainClassifier` class from `synapse.ml.train` to train a logistic regression classifier. `TrainClassifier` wraps a base SparkML classifier, handles string-valued feature columns automatically, and binarizes the label column.

```python
from synapse.ml.train import TrainClassifier
from pyspark.ml.classification import LogisticRegression

model = TrainClassifier(model=LogisticRegression(), labelCol=" income").fit(train)
```

**Expected output:** The cell completes without errors. The `model` variable contains a fitted `TrainedClassifierModel`.

**Verification:**

```python
print(f"Model type: {type(model).__name__}")  # Expected: TrainedClassifierModel
```

## Step 5: Score and evaluate the model

Score the model against the test set, then use the `ComputeModelStatistics` class to compute accuracy, Area Under the Curve (AUC), precision, and recall:

```python
from synapse.ml.train import ComputeModelStatistics

prediction = model.transform(test)
metrics = ComputeModelStatistics().transform(prediction)
metrics.select("accuracy").show()
```

**Expected output:** A single-row table showing the model's accuracy. For logistic regression on this dataset, expect an accuracy value around 0.84 (84%).

**Verification** - view all computed metrics:

```python
metrics.show()
```

You should see columns for `accuracy`, `precision`, `recall`, and `AUC`.

## Explore SynapseML classes

Use the Python `help()` function to view documentation for SynapseML classes:

```python
from synapse.ml.train import TrainClassifier
help(TrainClassifier)
```

## Troubleshooting

| Issue | Cause | Resolution |
|---|---|---|
| `AttributeError: module 'urllib' has no attribute 'request'` | Running code outside a Fabric notebook (plain Python script) | Change `import os, urllib` to `import os, urllib.request` |
| `KeyError` when selecting columns | Column names in this dataset include leading spaces | Ensure you use `" income"` (with the leading space), not `"income"` |
| `AnalysisException: cannot resolve column` | Column name mismatch | Run `data.columns` to inspect exact column names |
| `TrainClassifier` or `ComputeModelStatistics` import fails | Incorrect import path | Use `from synapse.ml.train import TrainClassifier`, not `from synapse.ml import TrainClassifier` |
| Spark session not available (`NameError: name 'spark' is not defined`) | Notebook not attached to lakehouse or Spark not started | Attach your notebook to a lakehouse and restart the session |
| Download fails with timeout or `URLError` | Network restrictions in your workspace | Upload the CSV to your lakehouse manually and read with `spark.read.csv("Files/AdultCensusIncome.csv", header=True, inferSchema=True)` |

## Clean up resources

The notebook doesn't create any persistent Azure resources beyond the lakehouse files. To clean up the downloaded CSV:

```python
import os
if os.path.isfile("AdultCensusIncome.csv"):
    os.remove("AdultCensusIncome.csv")
    print("Cleaned up AdultCensusIncome.csv")
```

## Related content

- [Explore and validate relationships in semantic models (preview)](semantic-link-validate-relationship.md)
- [Track models with MLflow](mlflow-autologging.md)
- [SynapseML documentation](https://microsoft.github.io/SynapseML/)
- [Machine learning model training in Fabric](/fabric/data-science/model-training-overview)
