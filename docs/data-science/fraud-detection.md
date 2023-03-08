---
title: Create, evaluate, and deploy a fraud detection model
description: An e2e sample for building a model to detect credit card fraud.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.subservice: data-science
ms.topic: tutorial
ms.date: 02/10/2023
---

# Creating, evaluating, and deploying a fraud detection model

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

In this notebook, we'll demonstrate data engineering and data science work flow with an e2e sample. The scenario is to build a model for detecting fraud credit card transactions.

## Step 1: Load the data

The dataset contains transactions made by credit cards in September 2013 by European cardholders.

This dataset presents transactions that occurred in two days, where we have 492 frauds out of 284,807 transactions. The dataset is highly unbalanced, the positive class (frauds) account for 0.172% of all transactions.

It contains only numerical input variables, which are the result of a PCA transformation. Unfortunately, due to confidentiality issues, we can't provide the original features and more background information about the data. Features V1, V2, … V28 are the principal components obtained with PCA, the only features that haven't been transformed with PCA are 'Time' and 'Amount'. Feature 'Time' contains the seconds elapsed between each transaction and the first transaction in the dataset. The feature 'Amount' is the transaction Amount, this feature can be used for example-dependent cost-sensitive learning. Feature 'Class' is the response variable, and it takes value 1 in case of fraud and 0 otherwise.

Given the class imbalance ratio, we recommend measuring the accuracy using the Area Under the Precision-Recall Curve (AUPRC). Confusion matrix accuracy isn't meaningful for unbalanced classification.

- creditcard.csv

| "Time" | "V1" | "V2" | "V3" | "V4" | "V5" | "V6" | "V7" | "V8" | "V9" | "V10" | "V11" | "V12" | "V13" | "V14" | "V15" | "V16" | "V17" | "V18" | "V19" | "V20" | "V21" | "V22" | "V23" | "V24" | "V25" | "V26" | "V27" | "V28" | "Amount" | "Class" |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | -1.3598071336738 | -0.0727811733098497 | 2.53634673796914 | 1.37815522427443 | -0.338320769942518 | 0.462387777762292 | 0.239598554061257 | 0.0986979012610507 | 0.363786969611213 | 0.0907941719789316 | -0.551599533260813 | -0.617800855762348 | -0.991389847235408 | -0.311169353699879 | 1.46817697209427 | -0.470400525259478 | 0.207971241929242 | 0.0257905801985591 | 0.403992960255733 | 0.251412098239705 | -0.018306777944153 | 0.277837575558899 | -0.110473910188767 | 0.0669280749146731 | 0.128539358273528 | -0.189114843888824 | 0.133558376740387 | -0.0210530534538215 | 149.62 | "0" |
| 0 | 1.19185711131486 | 0.26615071205963 | 0.16648011335321 | 0.448154078460911 | 0.0600176492822243 | -0.0823608088155687 | -0.0788029833323113 | 0.0851016549148104 | -0.255425128109186 | -0.166974414004614 | 1.61272666105479 | 1.06523531137287 | 0.48909501589608 | -0.143772296441519 | 0.635558093258208 | 0.463917041022171 | -0.114804663102346 | -0.183361270123994 | -0.145783041325259 | -0.0690831352230203 | -0.225775248033138 | -0.638671952771851 | 0.101288021253234 | -0.339846475529127 | 0.167170404418143 | 0.125894532368176 | -0.00898309914322813 | 0.0147241691924927 | 2.69 | "0" |

### Install libraries

In this notebook, we'll use `imblearn` that first needs to be installed. The PySpark kernel will be restarted after `%pip install`, thus we need to install it before we run any other cells.

```shell
# install imblearn for SMOTE
%pip install imblearn
```

**By defining below parameters, we can apply this notebook on different datasets easily.**

```python
IS_CUSTOM_DATA = False  # if True, dataset has to be uploaded manually

TARGET_COL = "Class"  # target column name
IS_SAMPLE = False  # if True, use only <SAMPLE_ROWS> rows of data for training, otherwise use all data
SAMPLE_ROWS = 5000  # if IS_SAMPLE is True, use only this number of rows for training

DATA_FOLDER = "Files/fraud-detection/"  # folder with data files
DATA_FILE = "creditcard.csv"  # data file name

EXPERIMENT_NAME = "aisample-fraud"  # mlflow experiment name
```

### Download dataset and upload to Lakehouse

**Please add a Lakehouse to the notebook before running it.**

```python
if not IS_CUSTOM_DATA:
    # Download demo data files into lakehouse if not exist
    import os, requests

    remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/Credit_Card_Fraud_Detection"
    fname = "creditcard.csv"
    download_path = f"/lakehouse/default/{DATA_FOLDER}/raw"

    if not os.path.exists("/lakehouse/default"):
        raise FileNotFoundError(
            "Default lakehouse not found, please add a lakehouse and restart the session."
        )
    os.makedirs(download_path, exist_ok=True)
    if not os.path.exists(f"{download_path}/{fname}"):
        r = requests.get(f"{remote_url}/{fname}", timeout=30)
        with open(f"{download_path}/{fname}", "wb") as f:
            f.write(r.content)
    print("Downloaded demo data files into lakehouse.")
```

```python
# to record the notebook running time
import time

ts = time.time()
```

### Read data from Lakehouse

```python
df = (
    spark.read.format("csv")
    .option("header", "true")
    .option("inferSchema", True)
    .load(f"{DATA_FOLDER}/raw/{DATA_FILE}")
    .cache()
)
```

## Step 2. Exploratory data analysis

### Display raw data

We can explore the raw data with `display`, do some basic statistics or even show chart views.

```python
display(df)
```

```python
# print dataset basic info
print("records read: " + str(df.count()))
print("Schema: ")
df.printSchema()
```

### Cast columns into the correct types

```python
import pyspark.sql.functions as F

df_columns = df.columns
df_columns.remove(TARGET_COL)

# to make sure the TARGET_COL is the last column
df = df.select(df_columns + [TARGET_COL]).withColumn(
    TARGET_COL, F.col(TARGET_COL).cast("int")
)

if IS_SAMPLE:
    df = df.limit(SAMPLE_ROWS)
```

## Step 3. Model development and deploy

So far, we've explored the dataset, checked the scheme, adjusted the columns order, and casted the columns into correct types.

Next, we'll train a lightgbm model to classify fraud transactions.

### Prepare training and testing data

```python
# Split the dataset into train and test
train, test = df.randomSplit([0.85, 0.15], seed=42)
```

```python
# Merge Columns
from pyspark.ml.feature import VectorAssembler

feature_cols = df.columns[:-1]
featurizer = VectorAssembler(inputCols=feature_cols, outputCol="features")
train_data = featurizer.transform(train)[TARGET_COL, "features"]
test_data = featurizer.transform(test)[TARGET_COL, "features"]
```

### Check data volume and imbalance

```python
display(train_data.groupBy(TARGET_COL).count())
```

### Handle imbalanced data

We'll apply [SMOTE](https://arxiv.org/abs/1106.1813) (Synthetic Minority Over-sampling Technique) to automatically handle imbalance data. A dataset is imbalanced if the classification categories aren't approximately equally represented. Often real-world data sets are predominately composed of "normal" examples with only a small percentage of "abnormal" or "interesting" examples. It's also the case that the cost of misclassifying an abnormal (interesting) example as a normal example is often much higher than the cost of the reverse error. Under-sampling of the majority (normal) class has been proposed as a good means of increasing the sensitivity of a classifier to the minority class. This paper shows that a combination of our method of over-sampling the minority (abnormal) class and under-sampling the majority (normal) class can achieve better classifier performance (in ROC space) than only under-sampling the majority class.

#### Apply SMOTE for new train_data

imblearn only works for pandas dataframe, not pyspark dataframe.

```python
from pyspark.ml.functions import vector_to_array, array_to_vector
import numpy as np
from collections import Counter
from imblearn.over_sampling import SMOTE

train_data_array = train_data.withColumn("features", vector_to_array("features"))

train_data_pd = train_data_array.toPandas()

X = train_data_pd["features"].to_numpy()
y = train_data_pd[TARGET_COL].to_numpy()
print("Original dataset shape %s" % Counter(y))

X = np.array([np.array(x) for x in X])

sm = SMOTE(random_state=42)
X_res, y_res = sm.fit_resample(X, y)
print("Resampled dataset shape %s" % Counter(y_res))

new_train_data = tuple(zip(X_res.tolist(), y_res.tolist()))
dataColumns = ["features", TARGET_COL]
new_train_data = spark.createDataFrame(data=new_train_data, schema=dataColumns)
new_train_data = new_train_data.withColumn("features", array_to_vector("features"))
```

### Define the model

With our data in place, we can now define the model. We'll apply lightgbm model in this notebook.

We'll leverage SynapseML to implement the model within a few lines of code.

```python
from synapse.ml.lightgbm import LightGBMClassifier

model = LightGBMClassifier(
    objective="binary", featuresCol="features", labelCol=TARGET_COL, isUnbalance=True
)
smote_model = LightGBMClassifier(
    objective="binary", featuresCol="features", labelCol=TARGET_COL, isUnbalance=False
)
```

### Model training

```python
model = model.fit(train_data)
smote_model = smote_model.fit(new_train_data)
```

### Model explanation

Here we can show the importance of each column.

```python
import pandas as pd
import matplotlib.pyplot as plt

feature_importances = model.getFeatureImportances()
fi = pd.Series(feature_importances, index=feature_cols)
fi = fi.sort_values(ascending=True)
f_index = fi.index
f_values = fi.values

# print feature importances
print("f_index:", f_index)
print("f_values:", f_values)

# plot
x_index = list(range(len(fi)))
x_index = [x / len(fi) for x in x_index]
plt.rcParams["figure.figsize"] = (20, 20)
plt.barh(
    x_index, f_values, height=0.028, align="center", color="tan", tick_label=f_index
)
plt.xlabel("importances")
plt.ylabel("features")
plt.show()
```

### Model evaluation

```python
predictions = model.transform(test_data)
predictions.limit(10).toPandas()
```

```python
from synapse.ml.train import ComputeModelStatistics

metrics = ComputeModelStatistics(
    evaluationMetric="classification", labelCol=TARGET_COL, scoredLabelsCol="prediction"
).transform(predictions)
display(metrics)
```

```python
# collect confusion matrix value
cm = metrics.select("confusion_matrix").collect()[0][0].toArray()
print(cm)
```

```python
# plot confusion matrix
import seaborn as sns

sns.set(rc={"figure.figsize": (6, 4.5)})
ax = sns.heatmap(cm, annot=True, fmt=".20g")
ax.set_title("Confusion Matrix")
ax.set_xlabel("Predicted label")
ax.set_ylabel("True label")
```

```python
from pyspark.ml.evaluation import BinaryClassificationEvaluator


def evaluate(predictions):
    """
    Evaluate the model by computing AUROC and AUPRC with the predictions.
    """

    # initialize the binary evaluator
    evaluator = BinaryClassificationEvaluator(
        rawPredictionCol="prediction", labelCol=TARGET_COL
    )

    _evaluator = lambda metric: evaluator.setMetricName(metric).evaluate(predictions)

    # calculate AUROC, baseline 0.5
    auroc = _evaluator("areaUnderROC")
    print(f"AUROC: {auroc:.4f}")

    # calculate AUPRC, baseline positive rate (0.172% in the demo data)
    auprc = _evaluator("areaUnderPR")
    print(f"AUPRC: {auprc:.4f}")

    return auroc, auprc
```

```python
# evaluate the original model
auroc, auprc = evaluate(predictions)
```

```python
# evaluate the SMOTE model
new_predictions = smote_model.transform(test_data)
new_auroc, new_auprc = evaluate(new_predictions)
```

```python
if new_auprc > auprc:
    # Using model trained on SMOTE data if it has higher AUPRC
    model = smote_model
    auprc = new_auprc
    auroc = new_auroc
```

### Log and load model with MLflow

Now we get a pretty good model, we can save it for later use. Here we use MLflow to log metrics/models, and load models back for prediction.

```python
# setup mlflow
import mlflow

mlflow.set_experiment(EXPERIMENT_NAME)
```

```python
# log model, metrics and params
with mlflow.start_run() as run:
    print("log model:")
    mlflow.spark.log_model(
        model,
        f"{EXPERIMENT_NAME}-lightgbm",
        registered_model_name=f"{EXPERIMENT_NAME}-lightgbm",
        dfs_tmpdir="Files/spark",
    )

    print("log metrics:")
    mlflow.log_metrics({"AUPRC": auprc, "AUROC": auroc})

    print("log parameters:")
    mlflow.log_params({"DATA_FILE": DATA_FILE})

    model_uri = f"runs:/{run.info.run_id}/{EXPERIMENT_NAME}-lightgbm"
    print("Model saved in run %s" % run.info.run_id)
    print(f"Model URI: {model_uri}")
```

```python
# load model back
loaded_model = mlflow.spark.load_model(model_uri, dfs_tmpdir="Files/spark")
```

## Step 4. Save prediction results

### Model deploy and prediction

```python
batch_predictions = loaded_model.transform(test_data)
```

```python
# code for saving predictions into lakehouse
batch_predictions.write.format("delta").mode("overwrite").save(
    f"{DATA_FOLDER}/predictions/batch_predictions"
)
```

```python
print(f"Full run cost {int(time.time() - ts)} seconds.")
```
