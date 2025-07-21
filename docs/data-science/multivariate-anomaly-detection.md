---
title: Analyze time series
description: Use SynapseML and Azure AI services for multivariate anomaly detection.
ms.topic: overview
ms.custom: sfi-ropc-nochange
ms.author: scottpolly
author: s-polly
ms.reviewer: jessiwang
reviewer: JessicaXYWang
ms.date: 07/16/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Recipe: Azure AI services - Multivariate Anomaly Detection

This recipe shows how to use SynapseML and Azure AI services, on Apache Spark, for multivariate anomaly detection. Multivariate anomaly detection involves detection of anomalies among many variables or time series, while accounting for all the inter-correlations and dependencies between the different variables. This scenario uses SynapseML and the Azure AI services to train a model for multivariate anomaly detection. We then use the model to infer multivariate anomalies within a dataset that contains synthetic measurements from three IoT sensors.

> [!IMPORTANT]
> Starting September, 20, 2023, you can't create new Anomaly Detector resources. The Anomaly Detector service will be retired on October 1, 2026.

For more information about the Azure AI Anomaly Detector, visit the [Anomaly Detector](/azure/ai-services/anomaly-detector/) information resource.

## Prerequisites

* An Azure subscription - [Create one for free](https://azure.microsoft.com/free/)
* Attach your notebook to a lakehouse. On the left side, select **Add** to add an existing lakehouse or create a lakehouse.

## Setup

Starting with an existing `Anomaly Detector` resource, you can explore ways to handle data of various forms. The catalog of services within Azure AI provides several options:

- [Decision](https://azure.microsoft.com//products/ai-services/ai-anomaly-detector)
- [Document Intelligence](https://azure.microsoft.com/products/ai-services/ai-document-intelligence/)
- [Language](https://azure.microsoft.com/products/ai-services/text-analytics/)
- [Speech](https://azure.microsoft.com/products/ai-services/ai-speech/)
- [Translation](https://azure.microsoft.com/products/ai-services/ai-translator)
- [Vision](https://azure.microsoft.com/products/ai-services/ai-vision/)
- [Web search](https://www.microsoft.com/bing/apis/bing-image-search-api)

### Create an Anomaly Detector resource

- In the Azure portal, select **Create** in your resource group, and then type **Anomaly Detector**. Select the Anomaly Detector resource.
- Name the resource, and ideally use the same region as the rest of your resource group. Use the default options for the rest, and then select **Review + Create** and then **Create**.
- After you create the Anomaly Detector resource, open it, and select the `Keys and Endpoints` panel in the left nav. Copy the key for the Anomaly Detector resource into the `ANOMALY_API_KEY` environment variable, or store it in the `anomalyKey` variable.

### Create a Storage Account resource

To save intermediate data, you must create an Azure Blob Storage Account. Within that storage account, create a container for storing the intermediate data. Make note of the container name, and copy the connection string to that container. You need it to later populate the `containerName` variable and the `BLOB_CONNECTION_STRING` environment variable.

### Enter your service keys

First, set up the environment variables for our service keys. The next cell sets the `ANOMALY_API_KEY` and the `BLOB_CONNECTION_STRING` environment variables, based on the values stored in our Azure Key Vault. If you run this tutorial in your own environment, be sure to set these environment variables before you proceed:

```python
import os
from pyspark.sql import SparkSession
from synapse.ml.core.platform import find_secret

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()
```

Read the `ANOMALY_API_KEY` and `BLOB_CONNECTION_STRING` environment variables, and set the `containerName` and `location` variables:

```python
# An Anomaly Dectector subscription key
anomalyKey = find_secret("anomaly-api-key") # use your own anomaly api key
# Your storage account name
storageName = "anomalydetectiontest" # use your own storage account name
# A connection string to your blob storage account
storageKey = find_secret("madtest-storage-key") # use your own storage key
# A place to save intermediate MVAD results
intermediateSaveDir = (
    "wasbs://madtest@anomalydetectiontest.blob.core.windows.net/intermediateData"
)
# The location of the anomaly detector resource that you created
location = "westus2"
```

Connect to our storage account, so that the anomaly detector can save intermediate results in that storage account:

```python
spark.sparkContext._jsc.hadoopConfiguration().set(
    f"fs.azure.account.key.{storageName}.blob.core.windows.net", storageKey
)
```

Import all the necessary modules:

```python
import numpy as np
import pandas as pd

import pyspark
from pyspark.sql.functions import col
from pyspark.sql.functions import lit
from pyspark.sql.types import DoubleType
import matplotlib.pyplot as plt

import synapse.ml
from synapse.ml.cognitive import *
```

Read the sample data into a Spark DataFrame:

```python
df = (
    spark.read.format("csv")
    .option("header", "true")
    .load("wasbs://publicwasb@mmlspark.blob.core.windows.net/MVAD/sample.csv")
)

df = (
    df.withColumn("sensor_1", col("sensor_1").cast(DoubleType()))
    .withColumn("sensor_2", col("sensor_2").cast(DoubleType()))
    .withColumn("sensor_3", col("sensor_3").cast(DoubleType()))
)

# Let's inspect the dataframe:
df.show(5)
```

We can now create an `estimator` object, which we use to train our model. We specify the start and end times for the training data. We also specify the input columns to use, and the name of the column that contains the timestamps. Finally, we specify the number of data points to use in the anomaly detection sliding window, and we set the connection string to the Azure Blob Storage Account:

```python
trainingStartTime = "2020-06-01T12:00:00Z"
trainingEndTime = "2020-07-02T17:55:00Z"
timestampColumn = "timestamp"
inputColumns = ["sensor_1", "sensor_2", "sensor_3"]

estimator = (
    FitMultivariateAnomaly()
    .setSubscriptionKey(anomalyKey)
    .setLocation(location)
    .setStartTime(trainingStartTime)
    .setEndTime(trainingEndTime)
    .setIntermediateSaveDir(intermediateSaveDir)
    .setTimestampCol(timestampColumn)
    .setInputCols(inputColumns)
    .setSlidingWindow(200)
)
```

Let's fit the `estimator` to the data:

```python
model = estimator.fit(df)
```

Once the training is done, we can use the model for inference. The code in the next cell specifies the start and end times for the data in which we'd like to detect the anomalies:

```python
inferenceStartTime = "2020-07-02T18:00:00Z"
inferenceEndTime = "2020-07-06T05:15:00Z"

result = (
    model.setStartTime(inferenceStartTime)
    .setEndTime(inferenceEndTime)
    .setOutputCol("results")
    .setErrorCol("errors")
    .setInputCols(inputColumns)
    .setTimestampCol(timestampColumn)
    .transform(df)
)

result.show(5)
```

In the previous cell, `.show(5)` showed us the first five dataframe rows. The results were all `null` because they landed outside the inference window.

To show the results only for the inferred data, select the needed columns. We can then order the rows in the dataframe by ascending order, and filter the result to show only the rows in the inference window range. Here, `inferenceEndTime` matches the last row in the dataframe, so can ignore it.

Finally, to better plot the results, convert the Spark dataframe to a Pandas dataframe:

```python
rdf = (
    result.select(
        "timestamp",
        *inputColumns,
        "results.contributors",
        "results.isAnomaly",
        "results.severity"
    )
    .orderBy("timestamp", ascending=True)
    .filter(col("timestamp") >= lit(inferenceStartTime))
    .toPandas()
)

rdf
```

Format the `contributors` column that stores the contribution score from each sensor to the detected anomalies. The next cell handles this, and splits the contribution score of each sensor into its own column:

```python
def parse(x):
    if type(x) is list:
        return dict([item[::-1] for item in x])
    else:
        return {"series_0": 0, "series_1": 0, "series_2": 0}

rdf["contributors"] = rdf["contributors"].apply(parse)
rdf = pd.concat(
    [rdf.drop(["contributors"], axis=1), pd.json_normalize(rdf["contributors"])], axis=1
)
rdf
```

We now have the contribution scores of sensors 1, 2, and 3 in the `series_0`, `series_1`, and `series_2` columns respectively.

To plot the results, run the next cell. The `minSeverity` parameter specifies the minimum severity of the anomalies to plot:

```python
minSeverity = 0.1

####### Main Figure #######
plt.figure(figsize=(23, 8))
plt.plot(
    rdf["timestamp"],
    rdf["sensor_1"],
    color="tab:orange",
    linestyle="solid",
    linewidth=2,
    label="sensor_1",
)
plt.plot(
    rdf["timestamp"],
    rdf["sensor_2"],
    color="tab:green",
    linestyle="solid",
    linewidth=2,
    label="sensor_2",
)
plt.plot(
    rdf["timestamp"],
    rdf["sensor_3"],
    color="tab:blue",
    linestyle="solid",
    linewidth=2,
    label="sensor_3",
)
plt.grid(axis="y")
plt.tick_params(axis="x", which="both", bottom=False, labelbottom=False)
plt.legend()

anoms = list(rdf["severity"] >= minSeverity)
_, _, ymin, ymax = plt.axis()
plt.vlines(np.where(anoms), ymin=ymin, ymax=ymax, color="r", alpha=0.8)

plt.legend()
plt.title(
    "A plot of the values from the three sensors with the detected anomalies highlighted in red."
)
plt.show()

####### Severity Figure #######
plt.figure(figsize=(23, 1))
plt.tick_params(axis="x", which="both", bottom=False, labelbottom=False)
plt.plot(
    rdf["timestamp"],
    rdf["severity"],
    color="black",
    linestyle="solid",
    linewidth=2,
    label="Severity score",
)
plt.plot(
    rdf["timestamp"],
    [minSeverity] * len(rdf["severity"]),
    color="red",
    linestyle="dotted",
    linewidth=1,
    label="minSeverity",
)
plt.grid(axis="y")
plt.legend()
plt.ylim([0, 1])
plt.title("Severity of the detected anomalies")
plt.show()

####### Contributors Figure #######
plt.figure(figsize=(23, 1))
plt.tick_params(axis="x", which="both", bottom=False, labelbottom=False)
plt.bar(
    rdf["timestamp"], rdf["series_0"], width=2, color="tab:orange", label="sensor_1"
)
plt.bar(
    rdf["timestamp"],
    rdf["series_1"],
    width=2,
    color="tab:green",
    label="sensor_2",
    bottom=rdf["series_0"],
)
plt.bar(
    rdf["timestamp"],
    rdf["series_2"],
    width=2,
    color="tab:blue",
    label="sensor_3",
    bottom=rdf["series_0"] + rdf["series_1"],
)
plt.grid(axis="y")
plt.legend()
plt.ylim([0, 1])
plt.title("The contribution of each sensor to the detected anomaly")
plt.show()
```

:::image source="media/cognitive-services-multivariate-anomaly-detection/multivariate-anomaly-detection-plot.png" alt-text="Screenshot of multivariate anomaly detection results plot.":::

The plots show the raw data from the sensors (inside the inference window) in orange, green, and blue. The red vertical lines in the first figure show the detected anomalies that have a severity greater than or equal to `minSeverity`.

The second plot shows the severity score of all the detected anomalies, with the `minSeverity` threshold shown in the dotted red line.

Finally, the last plot shows the contribution of the data from each sensor to the detected anomalies. It helps us diagnose and understand the most likely cause of each anomaly.

## Related content

- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use AI services with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to use SynapseML to tune hyperparameters](hyperparameter-tuning-fighting-breast-cancer.md)