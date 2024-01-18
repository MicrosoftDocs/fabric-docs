---
title: Outlier and Anomaly Detection
description: Use SynapseML on Apache Spark for multivariate anomaly detection with Isolation Forest model.
ms.topic: overview
ms.custom: build-2023
ms.reviewer: jessiwang
author: JessicaXYWang
ms.author: jessiwang
ms.date: 05/08/2023
---
# Recipe: Multivariate Anomaly Detection with Isolation Forest
This recipe shows how you can use SynapseML on Apache Spark for multivariate anomaly detection. Multivariate anomaly detection allows for the detection of anomalies among many variables or timeseries, taking into account all the inter-correlations and dependencies between the different variables. In this scenario, we use SynapseML to train an Isolation Forest model for multivariate anomaly detection, and we then use to the trained model to infer multivariate anomalies within a dataset containing synthetic measurements from three IoT sensors.

To learn more about the Isolation Forest model, refer to the original paper by [Liu _et al._](https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf?q=isolation-forest).

## Prerequisites

* Attach your notebook to a lakehouse. On the left side, select **Add** to add an existing lakehouse or create a lakehouse.

## Library imports


```python
from IPython import get_ipython
from IPython.terminal.interactiveshell import TerminalInteractiveShell
import uuid
import mlflow

from pyspark.sql import functions as F
from pyspark.ml.feature import VectorAssembler
from pyspark.sql.types import *
from pyspark.ml import Pipeline

from synapse.ml.isolationforest import *

from synapse.ml.explainers import *
```


```python
%matplotlib inline
```


```python
from pyspark.sql import SparkSession

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()

from synapse.ml.core.platform import *

if running_on_synapse():
    shell = TerminalInteractiveShell.instance()
    shell.define_macro("foo", """a,b=10,20""")

```

## Input data


```python
# Table inputs
timestampColumn = "timestamp"  # str: the name of the timestamp column in the table
inputCols = [
    "sensor_1",
    "sensor_2",
    "sensor_3",
]  # list(str): the names of the input variables

# Training Start time, and number of days to use for training:
trainingStartTime = (
    "2022-02-24T06:00:00Z"  # datetime: datetime for when to start the training
)
trainingEndTime = (
    "2022-03-08T23:55:00Z"  # datetime: datetime for when to end the training
)
inferenceStartTime = (
    "2022-03-09T09:30:00Z"  # datetime: datetime for when to start the training
)
inferenceEndTime = (
    "2022-03-20T23:55:00Z"  # datetime: datetime for when to end the training
)

# Isolation Forest parameters
contamination = 0.021
num_estimators = 100
max_samples = 256
max_features = 1.0

```

## Read data


```python
df = (
    spark.read.format("csv")
    .option("header", "true")
    .load(
        "wasbs://publicwasb@mmlspark.blob.core.windows.net/generated_sample_mvad_data.csv"
    )
)
```

cast columns to appropriate data types


```python
df = (
    df.orderBy(timestampColumn)
    .withColumn("timestamp", F.date_format(timestampColumn, "yyyy-MM-dd'T'HH:mm:ss'Z'"))
    .withColumn("sensor_1", F.col("sensor_1").cast(DoubleType()))
    .withColumn("sensor_2", F.col("sensor_2").cast(DoubleType()))
    .withColumn("sensor_3", F.col("sensor_3").cast(DoubleType()))
    .drop("_c5")
)

display(df)
```

## Training data preparation


```python
# filter to data with timestamps within the training window
df_train = df.filter(
    (F.col(timestampColumn) >= trainingStartTime)
    & (F.col(timestampColumn) <= trainingEndTime)
)
display(df_train)
```

## Test data preparation


```python
# filter to data with timestamps within the inference window
df_test = df.filter(
    (F.col(timestampColumn) >= inferenceStartTime)
    & (F.col(timestampColumn) <= inferenceEndTime)
)
display(df_test)
```

## Train Isolation Forest model


```python
isolationForest = (
    IsolationForest()
    .setNumEstimators(num_estimators)
    .setBootstrap(False)
    .setMaxSamples(max_samples)
    .setMaxFeatures(max_features)
    .setFeaturesCol("features")
    .setPredictionCol("predictedLabel")
    .setScoreCol("outlierScore")
    .setContamination(contamination)
    .setContaminationError(0.01 * contamination)
    .setRandomSeed(1)
)
```

Next, we create an ML pipeline to train the Isolation Forest model. We also demonstrate how to create an MLflow experiment and register the trained model.

MLflow model registration is strictly only required if accessing the trained model at a later time. For training the model, and performing inferencing in the same notebook, the model object model is sufficient.


```python
va = VectorAssembler(inputCols=inputCols, outputCol="features")
pipeline = Pipeline(stages=[va, isolationForest])
model = pipeline.fit(df_train)
```

## Perform inferencing

Load the trained Isolation Forest Model

Perform inferencing


```python
df_test_pred = model.transform(df_test)
display(df_test_pred)
```

## Premade Anomaly Detector
[**Azure AI Anomaly Detector**](https://azure.microsoft.com//products/ai-services/ai-anomaly-detector)
- Anomaly status of latest point: generates a model using preceding points and determines whether the latest point is anomalous ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/anomaly/DetectLastAnomaly.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.anomaly.html#module-synapse.ml.cognitive.anomaly.DetectLastAnomaly))
- Find anomalies: generates a model using an entire series and finds anomalies in the series ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/anomaly/DetectAnomalies.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.anomaly.html#module-synapse.ml.cognitive.anomaly.DetectAnomalies))


## Related content

- [How to Build a Search Engine with SynapseML](create-a-multilingual-search-engine-from-forms.md)
- [How to use SynapseML and Azure AI services for multivariate anomaly detection - Analyze time series](multivariate-anomaly-detection.md)
- [How to use SynapseML to tune hyperparameters](hyperparameter-tuning-fighting-breast-cancer.md)
