---
title: ONNX - Inference on Spark
description: Use SynapseML to build a LightGBM model, convert it to ONNX format, then perform inference.
ms.topic: how-to
ms.custom: 
ms.author: scottpolly
author: s-polly
ms.reviewer: jessiwang
reviewer: JessicaXYWang
ms.date: 04/08/2025
---

# ONNX inference on Spark

In this example, you train a LightGBM model, and convert that model to the [ONNX](https://onnx.ai/) format. Once converted, you use the model to infer some test data on Spark.

This example uses these Python packages and versions:

- `onnxmltools==1.7.0`
- `lightgbm==3.2.1`

## Prerequisites

- Attach your notebook to a lakehouse. On the left side, select **Add** to add an existing lakehouse or create a lakehouse.
- You might need to install `onnxmltools`. To do this, add `!pip install onnxmltools==1.7.0` in a notebook code cell, and then run that cell.
- You might need to install `lightgbm`. To do this, add `!pip install lightgbm==3.2.1` in a notebook code cell, and then run that cell.

## Load the example data

To load the example data, add these code examples to cells in your notebook, and then run those cells:

```python
from pyspark.sql import SparkSession

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()

from synapse.ml.core.platform import *
```

```python
df = (
    spark.read.format("csv")
    .option("header", True)
    .option("inferSchema", True)
    .load(
        "wasbs://publicwasb@mmlspark.blob.core.windows.net/company_bankruptcy_prediction_data.csv"
    )
)

display(df)
```

The output should look similar to the following table. The specific columns shown, the number of rows, and the actual values in the table might differ:

| Interest Coverage Ratio | Net Income Flag | Equity to Liability |
| ----- | ----- | ----- |
| 0.5641 | 1.0 | 0.0165 |
| 0.5702 | 1.0 | 0.0208 |
| 0.5673 | 1.0 | 0.0165 |

## Use LightGBM to train a model

```python
from pyspark.ml.feature import VectorAssembler
from synapse.ml.lightgbm import LightGBMClassifier

feature_cols = df.columns[1:]
featurizer = VectorAssembler(inputCols=feature_cols, outputCol="features")

train_data = featurizer.transform(df)["Bankrupt?", "features"]

model = (
    LightGBMClassifier(featuresCol="features", labelCol="Bankrupt?", dataTransferMode="bulk")
    .setEarlyStoppingRound(300)
    .setLambdaL1(0.5)
    .setNumIterations(1000)
    .setNumThreads(-1)
    .setMaxDeltaStep(0.5)
    .setNumLeaves(31)
    .setMaxDepth(-1)
    .setBaggingFraction(0.7)
    .setFeatureFraction(0.7)
    .setBaggingFreq(2)
    .setObjective("binary")
    .setIsUnbalance(True)
    .setMinSumHessianInLeaf(20)
    .setMinGainToSplit(0.01)
)

model = model.fit(train_data)
```

## Convert the model to ONNX format

The following code exports the trained model to a LightGBM booster, and then converts the model to the ONNX format:

```python
import lightgbm as lgb
from lightgbm import Booster, LGBMClassifier


def convertModel(lgbm_model: LGBMClassifier or Booster, input_size: int) -> bytes:
    from onnxmltools.convert import convert_lightgbm
    from onnxconverter_common.data_types import FloatTensorType

    initial_types = [("input", FloatTensorType([-1, input_size]))]
    onnx_model = convert_lightgbm(
        lgbm_model, initial_types=initial_types, target_opset=9
    )
    return onnx_model.SerializeToString()


booster_model_str = model.getLightGBMBooster().modelStr().get()
booster = lgb.Booster(model_str=booster_model_str)
model_payload_ml = convertModel(booster, len(feature_cols))
```

After conversion, load the ONNX payload into an `ONNXModel`, and inspect the model inputs and outputs:

```python
from synapse.ml.onnx import ONNXModel

onnx_ml = ONNXModel().setModelPayload(model_payload_ml)

print("Model inputs:" + str(onnx_ml.getModelInputs()))
print("Model outputs:" + str(onnx_ml.getModelOutputs()))
```

Map the model input to the column name (FeedDict) of the input dataframe, and map the column names of the output dataframe to the model outputs (FetchDict):

```python
onnx_ml = (
    onnx_ml.setDeviceType("CPU")
    .setFeedDict({"input": "features"})
    .setFetchDict({"probability": "probabilities", "prediction": "label"})
    .setMiniBatchSize(5000)
)
```

## Use the model for inference

To perform inference with the model, the following code creates test data, and transforms the data through the ONNX model:

```python
from pyspark.ml.feature import VectorAssembler
import pandas as pd
import numpy as np

n = 1000 * 1000
m = 95
test = np.random.rand(n, m)
testPdf = pd.DataFrame(test)
cols = list(map(str, testPdf.columns))
testDf = spark.createDataFrame(testPdf)
testDf = testDf.union(testDf).repartition(200)
testDf = (
    VectorAssembler()
    .setInputCols(cols)
    .setOutputCol("features")
    .transform(testDf)
    .drop(*cols)
    .cache()
)

display(onnx_ml.transform(testDf))
```

The output should look similar to the following table, though the values and number of rows might differ:

| Index | Features | Prediction | Probability |
| ----- | ----- | ----- | ----- |
| 1 | `"{"type":1,"values":[0.105...` | 0 | `"{"0":0.835...` |
| 2 | `"{"type":1,"values":[0.814...` | 0 | `"{"0":0.658...` |

## Related content

- [How to use Kernel SHAP to explain a tabular classification model](tabular-shap-explainer.md)
- [How to use SynapseML for multivariate anomaly detection](isolation-forest-multivariate-anomaly-detection.md)
- [How to Build a Search Engine with SynapseML](create-a-multilingual-search-engine-from-forms.md)
