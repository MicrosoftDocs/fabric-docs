---
title: Create, evaluate, and deploy a fraud detection model
description: This demonstration shows the data engineering and data science workflow for building a model that detects credit card fraud.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: tutorial
ms.date: 05/23/2023
---

# Create, evaluate, and deploy a fraud detection model in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, we'll demonstrate data engineering and data science workflows with an end-to-end example that builds a model for detecting fraudulent credit card transactions. The steps you'll take are:

> [!div class="checklist"]
> * Upload the data into a Lakehouse
> * Perform exploratory data analysis on the data
> * Prepare the data by handling class imbalance
> * Train a model and log it with MLflow
> * Deploy the model and save prediction results

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
- Open the sample notebook or create a new notebook.
    - Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) if you want to copy/paste code into cells.
    - Or, Select **Use a sample** > **Fraud detection** to open the sample notebook.
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

## Step 1: Load the data

The dataset contains credit card transactions made by European cardholders in September 2013 over the course of two days. Out of 284,807 transactions, 492 are fraudulent. The positive class (fraud) accounts for a mere 0.172% of the data, thereby making the dataset highly unbalanced.

### Input and response variables

The dataset contains only numerical input variables, which are the result of a Principal Component Analysis (PCA) transformation on the original features. To protect confidentiality, we can't provide the original features or more background information about the data. The only features that haven't been transformed with PCA are "Time" and "Amount".

- Features "V1, V2, … V28" are the principal components obtained with PCA.
- "Time" contains the seconds elapsed between each transaction and the first transaction in the dataset.
- "Amount" is the transaction amount. This feature can be used for example-dependent cost-sensitive learning.
- "Class" is the response variable, and it takes the value `1` for fraud and `0` otherwise.

Given the class imbalance ratio, we recommend measuring the accuracy using the Area Under the Precision-Recall Curve (AUPRC). Using a confusion matrix to evaluate accuracy isn't meaningful for unbalanced classification.

The following snippet shows a portion of the _creditcard.csv_ data.

| "Time" | "V1" | "V2" | "V3" | "V4" | "V5" | "V6" | "V7" | "V8" | "V9" | "V10" | "V11" | "V12" | "V13" | "V14" | "V15" | "V16" | "V17" | "V18" | "V19" | "V20" | "V21" | "V22" | "V23" | "V24" | "V25" | "V26" | "V27" | "V28" | "Amount" | "Class" |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | -1.3598071336738 | -0.0727811733098497 | 2.53634673796914 | 1.37815522427443 | -0.338320769942518 | 0.462387777762292 | 0.239598554061257 | 0.0986979012610507 | 0.363786969611213 | 0.0907941719789316 | -0.551599533260813 | -0.617800855762348 | -0.991389847235408 | -0.311169353699879 | 1.46817697209427 | -0.470400525259478 | 0.207971241929242 | 0.0257905801985591 | 0.403992960255733 | 0.251412098239705 | -0.018306777944153 | 0.277837575558899 | -0.110473910188767 | 0.0669280749146731 | 0.128539358273528 | -0.189114843888824 | 0.133558376740387 | -0.0210530534538215 | 149.62 | "0" |
| 0 | 1.19185711131486 | 0.26615071205963 | 0.16648011335321 | 0.448154078460911 | 0.0600176492822243 | -0.0823608088155687 | -0.0788029833323113 | 0.0851016549148104 | -0.255425128109186 | -0.166974414004614 | 1.61272666105479 | 1.06523531137287 | 0.48909501589608 | -0.143772296441519 | 0.635558093258208 | 0.463917041022171 | -0.114804663102346 | -0.183361270123994 | -0.145783041325259 | -0.0690831352230203 | -0.225775248033138 | -0.638671952771851 | 0.101288021253234 | -0.339846475529127 | 0.167170404418143 | 0.125894532368176 | -0.00898309914322813 | 0.0147241691924927 | 2.69 | "0" |

### Install libraries

For this tutorial, we need to install the `imblearn` library. The PySpark kernel will be restarted after running `%pip install`, thus we need to install the library before we run any other cells.

```shell
# install imblearn for SMOTE
%pip install imblearn
```

By defining the following parameters, we can apply the notebook on different datasets easily.

```python
IS_CUSTOM_DATA = False  # if True, dataset has to be uploaded manually

TARGET_COL = "Class"  # target column name
IS_SAMPLE = False  # if True, use only <SAMPLE_ROWS> rows of data for training, otherwise use all data
SAMPLE_ROWS = 5000  # if IS_SAMPLE is True, use only this number of rows for training

DATA_FOLDER = "Files/fraud-detection/"  # folder with data files
DATA_FILE = "creditcard.csv"  # data file name

EXPERIMENT_NAME = "aisample-fraud"  # mlflow experiment name
```

### Download the dataset and upload to a Lakehouse

Before running the notebook, you must add a Lakehouse to it. The Lakehouse is used to store the data for this example. To add a Lakehouse, see [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

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

### Read data from the Lakehouse

```python
df = (
    spark.read.format("csv")
    .option("header", "true")
    .option("inferSchema", True)
    .load(f"{DATA_FOLDER}/raw/{DATA_FILE}")
    .cache()
)
```

## Step 2. Perform exploratory data analysis

In this section, we'll explore the data, check its schema, reorder its columns, and cast the columns into the correct data types.

### Display raw data

We can use `display` to explore the raw data, calculate some basic statistics, or even show chart views.

```python
display(df)
```

Print some information about the data, such as the schema.

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

## Step 3. Develop and deploy a model

In this section, we'll train a LightGBM model to classify fraudulent transactions.

### Prepare training and testing data

Begin by splitting the data into training and testing sets.

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

Check the data volume and imbalance in the training set.

```python
display(train_data.groupBy(TARGET_COL).count())
```

### Handle imbalanced data

As often happens with real-world data, this data has a class-imbalance problem, since the positive class (fraudulent transactions) accounts for only 0.172% of all transactions. We'll apply [SMOTE](https://arxiv.org/abs/1106.1813) (Synthetic Minority Over-sampling Technique) to automatically handle class imbalance in the data. The SMOTE method oversamples the minority class and undersamples the majority class for improved classifier performance.

Let's apply SMOTE to the training data:

> [!NOTE]
> `imblearn` only works for pandas DataFrames, not PySpark DataFrames.

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

With our data in place, we can now define the model. We'll use a LightGBM classifier and use SynapseML to implement the model with a few lines of code.

```python
from synapse.ml.lightgbm import LightGBMClassifier

model = LightGBMClassifier(
    objective="binary", featuresCol="features", labelCol=TARGET_COL, isUnbalance=True
)
smote_model = LightGBMClassifier(
    objective="binary", featuresCol="features", labelCol=TARGET_COL, isUnbalance=False
)
```

### Train the model

```python
model = model.fit(train_data)
smote_model = smote_model.fit(new_train_data)
```

### Explain the model

Here we can show the importance that the model assigns to each feature in the training data.

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

### Evaluate the model

Generate model predictions:

```python
predictions = model.transform(test_data)
predictions.limit(10).toPandas()
```

Display model metrics:

```python
from synapse.ml.train import ComputeModelStatistics

metrics = ComputeModelStatistics(
    evaluationMetric="classification", labelCol=TARGET_COL, scoredLabelsCol="prediction"
).transform(predictions)
display(metrics)
```

Create a confusion matrix:

```python
# collect confusion matrix value
cm = metrics.select("confusion_matrix").collect()[0][0].toArray()
print(cm)
```

Plot the confusion matrix:

```python
# plot confusion matrix
import seaborn as sns

sns.set(rc={"figure.figsize": (6, 4.5)})
ax = sns.heatmap(cm, annot=True, fmt=".20g")
ax.set_title("Confusion Matrix")
ax.set_xlabel("Predicted label")
ax.set_ylabel("True label")
```

Define a function to evaluate the model:

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

Evaluate the original model:

```python
# evaluate the original model
auroc, auprc = evaluate(predictions)
```

Evaluate the SMOTE model:

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

### Log and load the model with MLflow

Now that we have a decent working model, we can save it for later use. Here we use MLflow to log metrics and models, and load the models back for prediction.

Set up MLflow:

```python
# setup mlflow
import mlflow

mlflow.set_experiment(EXPERIMENT_NAME)
```

Log model, metrics, and parameters:

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

Reload the model:

```python
# load model back
loaded_model = mlflow.spark.load_model(model_uri, dfs_tmpdir="Files/spark")
```

## Step 4. Save prediction results

In this section, we'll deploy the model and save the prediction results.
### Model deploy and prediction

```python
batch_predictions = loaded_model.transform(test_data)
```

Save predictions into the Lakehouse:

```python
# code for saving predictions into lakehouse
batch_predictions.write.format("delta").mode("overwrite").save(
    f"{DATA_FOLDER}/predictions/batch_predictions"
)
```

```python
print(f"Full run cost {int(time.time() - ts)} seconds.")
```

## Next Steps

- [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training/model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)


