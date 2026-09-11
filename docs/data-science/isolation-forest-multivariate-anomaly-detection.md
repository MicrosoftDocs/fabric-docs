---
title: Multivariate Anomaly Detection with Isolation Forest
description: Use SynapseML on Apache Spark for multivariate anomaly detection with Isolation Forest model.
ms.topic: how-to
ms.author: scottpolly
author: s-polly
ms.reviewer: scottpolly
reviewer: s-polly
ms.date: 07/23/2026
---
# Multivariate anomaly detection with isolation forest
This article shows how to use SynapseML on Apache Spark for multivariate anomaly detection. Multivariate anomaly detection detects anomalies among many variables or time series, taking into account all the inter-correlations and dependencies between the different variables. In this scenario, you use SynapseML to train an isolation forest model for multivariate anomaly detection, and then use the trained model to infer multivariate anomalies within a dataset containing synthetic measurements from three IoT sensors.

To learn more about the isolation forest model, see the original paper by [Liu _et al._](https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf?q=isolation-forest)

## Prerequisites

1. Get a [Microsoft Fabric subscription](../enterprise/licenses.md). Or, sign up for a free [Microsoft Fabric trial](../fundamentals/fabric-trial.md).
1. Attach your notebook to a lakehouse. On the left side, select **Add** to add an existing lakehouse or create a lakehouse.
1. SynapseML is preinstalled in Fabric PySpark runtimes (Runtime 1.3 or later recommended). To use a specific version, see [Install a different version of SynapseML on Fabric](install-synapseml.md).

## Library imports


```python
from pyspark.sql import functions as F
from pyspark.ml.feature import VectorAssembler
from pyspark.sql.types import DoubleType
from pyspark.ml import Pipeline

from synapse.ml.isolationforest import IsolationForest
```


```python
from pyspark.sql import SparkSession

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()
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
    "2022-03-09T09:30:00Z"  # datetime: datetime for when to start the inference
)
inferenceEndTime = (
    "2022-03-20T23:55:00Z"  # datetime: datetime for when to end the inference
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

Cast the columns to the appropriate data types.


```python
df = (
    df.orderBy(timestampColumn)
    .withColumn("timestamp", F.date_format(timestampColumn, "yyyy-MM-dd'T'HH:mm:ss'Z'"))
    .withColumn("sensor_1", F.col("sensor_1").cast(DoubleType()))
    .withColumn("sensor_2", F.col("sensor_2").cast(DoubleType()))
    .withColumn("sensor_3", F.col("sensor_3").cast(DoubleType()))
    .drop("_c5")  # drop the extra unlabeled column present in the source CSV
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

Next, create an ML pipeline to train the Isolation Forest model.

For training the model and performing inferencing in the same notebook, the model object is sufficient. To persist and reuse the model across sessions, register it with [MLflow in Microsoft Fabric](mlflow-autologging.md).


```python
va = VectorAssembler(inputCols=inputCols, outputCol="features")
pipeline = Pipeline(stages=[va, isolationForest])
model = pipeline.fit(df_train)
```

## Perform inferencing

Apply the trained model to the test data:


```python
df_test_pred = model.transform(df_test)
display(df_test_pred)
```

## Premade Anomaly Detector

> [!IMPORTANT]
> Microsoft is retiring the Azure AI Anomaly Detector service on October 1, 2026. Since September 20, 2023, you can't create new resources. For a supported alternative, see [Anomaly detection in Microsoft Fabric Real-Time Intelligence](../real-time-intelligence/anomaly-detection.md).

[**Azure AI Anomaly Detector**](https://azure.microsoft.com/products/ai-services/ai-anomaly-detector)

- Anomaly status of latest point: generates a model by using preceding points and determines whether the latest point is anomalous. See the [SynapseML GitHub repository](https://github.com/microsoft/SynapseML) for current API reference.
- Find anomalies: generates a model by using an entire series and finds anomalies in the series. See the [SynapseML GitHub repository](https://github.com/microsoft/SynapseML) for current API reference.


## Related content

- [How to Build a Search Engine with SynapseML](create-a-multilingual-search-engine-from-forms.md)
- [How to use SynapseML and Foundry Tools for multivariate anomaly detection - Analyze time series](multivariate-anomaly-detection.md)
- [How to use SynapseML to tune hyperparameters](hyperparameter-tuning-fighting-breast-cancer.md)
