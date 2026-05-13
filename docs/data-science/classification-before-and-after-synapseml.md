---
title: Classification tasks using SynapseML
description: Perform the same classification task with and without SynapseML to compare code complexity and results.
ms.topic: how-to
ms.author: scottpolly
author: s-polly
ms.reviewer: ruxu
reviewer: ruixinxu
ms.date: 05/13/2026
ai-usage: ai-assisted
---

# Classification tasks using SynapseML

This article shows how to perform a text classification task with two methods. One method uses plain `pyspark`, and the other uses the `synapseml` library. Both methods yield the same performance, but highlight how SynapseML reduces code complexity compared to `pyspark`.

The task predicts whether a customer review of a book sold on Amazon is good (rating > 3) or bad, based on the review text. You train **LogisticRegression** learners with different hyperparameters, and then choose the best model.

## Quick start

| Step | Description | Estimated time |
|------|-------------|----------------|
| 1 | Set up prerequisites and attach lakehouse | 5 minutes |
| 2 | Load and explore the data | 1 minute |
| 3 | Extract text features | 1 minute |
| 4 | Classify with pyspark (manual featurization) | 3 minutes |
| 5 | Classify with SynapseML (automatic featurization) | 2 minutes |

## Prerequisites

Before you start, make sure you have the following:

| Requirement | Details | How to verify |
|---|---|---|
| Microsoft Fabric workspace | A workspace backed by a Fabric capacity (F2 or higher, or trial capacity) | Open [Fabric portal](https://app.fabric.microsoft.com) and confirm your workspace appears |
| Fabric notebook | Create or open a notebook in your workspace | Select **New** > **Notebook** in your workspace |
| Attached lakehouse | The notebook must be attached to a lakehouse | In the notebook, select **Add** on the left pane to attach an existing lakehouse or create a new one |
| Fabric Runtime 1.2+ | Runtime includes PySpark, SynapseML, and NumPy preinstalled | In the notebook, select **Environment** in the ribbon to verify the runtime version |

> [!NOTE]
> All libraries used in this article (`pyspark`, `synapseml`, `numpy`) are preinstalled in the Fabric Spark runtime. You don't need to install any packages.

## Load and explore the data

In Fabric notebooks, a Spark session is already available as the `spark` variable. Load the Amazon book reviews dataset from a public Azure Blob Storage location:

```python
rawData = spark.read.parquet(
    "wasbs://publicwasb@mmlspark.blob.core.windows.net/BookReviewsFromAmazon10K.parquet"
)
rawData.show(5)
```

**Expected output:**

```output
+--------------------+------+
|                text|rating|
+--------------------+------+
|One of the } } } ...|   4.0|
|This is a MDI too...|   3.0|
|...                 |   ...|
+--------------------+------+
only showing top 5 rows
```

Verify that the dataset loaded correctly:

```python
print(f"Row count: {rawData.count()}")
print(f"Columns: {rawData.columns}")
assert rawData.count() == 10000, "Expected 10,000 rows"
assert set(rawData.columns) == {"text", "rating"}, "Expected columns: text, rating"
print("Data loaded successfully")
```

**Expected output:**

```output
Row count: 10000
Columns: ['text', 'rating']
Data loaded successfully
```

## Extract features and process data

Real data often has features of multiple types, for example, text, numeric, and categorical. To demonstrate working with mixed feature types, add two numerical features to the dataset: the **word count** of the review and the **mean word length**.

### Define user-defined functions (UDFs)

```python
from pyspark.sql.functions import udf
from pyspark.sql.types import IntegerType, DoubleType
import numpy as np


def calc_word_count(s):
    return len(s.split())


def calc_word_length(s):
    ss = [len(w) for w in s.split()]
    return round(float(np.mean(ss)), 2)


wordLengthUDF = udf(calc_word_length, DoubleType())
wordCountUDF = udf(calc_word_count, IntegerType())
```

### Apply UDFs with SynapseML UDFTransformer

Use the `UDFTransformer` from SynapseML to wrap the UDFs into pipeline-compatible transformers:

```python
from synapse.ml.stages import UDFTransformer

wordLengthTransformer = UDFTransformer(
    inputCol="text", outputCol="wordLength", udf=wordLengthUDF
)
wordCountTransformer = UDFTransformer(
    inputCol="text", outputCol="wordCount", udf=wordCountUDF
)
```

### Run the feature pipeline

Apply both transformers and create a binary label column from the rating:

```python
from pyspark.ml import Pipeline

data = (
    Pipeline(stages=[wordLengthTransformer, wordCountTransformer])
    .fit(rawData)
    .transform(rawData)
    .withColumn("label", rawData["rating"] > 3)
    .drop("rating")
)
```

Verify the feature extraction:

```python
data.show(5)
print(f"Columns: {data.columns}")
assert "wordLength" in data.columns, "wordLength column missing"
assert "wordCount" in data.columns, "wordCount column missing"
assert "label" in data.columns, "label column missing"
assert "rating" not in data.columns, "rating column should be dropped"
print("Feature extraction successful")
```

**Expected output:**

```output
+--------------------+----------+---------+-----+
|                text|wordLength|wordCount|label|
+--------------------+----------+---------+-----+
|One of the } } } ...|      3.72|       30| true|
|This is a MDI too...|      4.25|       12|false|
|...                 |       ...|      ...|  ...|
+--------------------+----------+---------+-----+

Columns: ['text', 'wordLength', 'wordCount', 'label']
Feature extraction successful
```

## Classify using pyspark

To choose the best LogisticRegression classifier using the `pyspark` library, you must explicitly perform these steps:

1. Process the features:
   - Tokenize the text column.
   - Hash the tokenized column into a vector by using hashing.
   - Merge the numeric features with the vector.
1. Cast the label column from boolean to integer type.
1. Train multiple LogisticRegression algorithms on the `train` dataset with different hyperparameters.
1. Compute the Area Under the ROC Curve (AUC) for each trained model and select the model with the highest metric on the `test` dataset.
1. Evaluate the best model on the `validation` set.

### Featurize and prepare the data

```python
from pyspark.ml.feature import Tokenizer, HashingTF, VectorAssembler
from pyspark.sql.types import IntegerType

# Tokenize the text column
tokenizer = Tokenizer(inputCol="text", outputCol="tokenizedText")
numFeatures = 10000
hashingScheme = HashingTF(
    inputCol="tokenizedText", outputCol="TextFeatures", numFeatures=numFeatures
)
tokenizedData = tokenizer.transform(data)
featurizedData = hashingScheme.transform(tokenizedData)

# Merge text and numeric features into one feature column
featureColumnsArray = ["TextFeatures", "wordCount", "wordLength"]
assembler = VectorAssembler(inputCols=featureColumnsArray, outputCol="features")
assembledData = assembler.transform(featurizedData)

# Select only the label and features columns, cast label to integer
processedData = assembledData.select("label", "features").withColumn(
    "label", assembledData.label.cast(IntegerType())
)
```

Verify the featurized data:

```python
print(f"Feature vector size: {processedData.first()['features'].size}")
print(f"Label values: {sorted(processedData.select('label').distinct().rdd.flatMap(lambda x: x).collect())}")
assert processedData.first()["features"].size == 10002, "Expected 10000 text + 2 numeric features"
print("Featurization successful")
```

**Expected output:**

```output
Feature vector size: 10002
Label values: [0, 1]
Featurization successful
```

### Train and evaluate models

```python
from pyspark.ml.evaluation import BinaryClassificationEvaluator
from pyspark.ml.classification import LogisticRegression

# Split the data into train, test, and validation sets
train, test, validation = processedData.randomSplit([0.60, 0.20, 0.20], seed=123)

# Train models with different regularization parameters
lrHyperParams = [0.05, 0.1, 0.2, 0.4]
logisticRegressions = [
    LogisticRegression(regParam=hyperParam) for hyperParam in lrHyperParams
]
evaluator = BinaryClassificationEvaluator(
    rawPredictionCol="rawPrediction", metricName="areaUnderROC"
)
metrics = []
models = []

# Train each model and evaluate on the test set
for learner in logisticRegressions:
    model = learner.fit(train)
    models.append(model)
    scoredData = model.transform(test)
    metrics.append(evaluator.evaluate(scoredData))

bestMetric = max(metrics)
bestModel = models[metrics.index(bestMetric)]

# Evaluate the best model on the validation dataset
scoredVal = bestModel.transform(validation)
validationAUC = evaluator.evaluate(scoredVal)
print(f"Best model's AUC on validation set = {validationAUC:.4f}")
```

Verify the results:

```python
print(f"Number of models trained: {len(models)}")
print(f"Best regularization parameter: {lrHyperParams[metrics.index(bestMetric)]}")
print(f"Test AUC scores: {[f'{m:.4f}' for m in metrics]}")
assert 0.5 < validationAUC <= 1.0, f"AUC {validationAUC} is outside expected range (0.5, 1.0]"
print(f"pyspark classification complete - AUC: {validationAUC:.4f}")
```

**Expected output (approximate values):**

```output
Number of models trained: 4
Best regularization parameter: 0.05
Test AUC scores: ['0.7521', '0.7465', '0.7280', '0.6876']
pyspark classification complete - AUC: 0.7480
```

> [!NOTE]
> The exact AUC values depend on the random split. Expect values between 0.65 and 0.85.

## Classify using SynapseML

The `synapseml` approach achieves the same result with fewer steps. SynapseML handles featurization internally, which reduces the code you need to write:

1. The `TrainClassifier` estimator internally featurizes the data, as long as the columns in the `train`, `test`, and `validation` datasets represent the features.
1. The `FindBestModel` estimator finds the best model from a pool of trained models by evaluating performance on the `test` dataset with the specified metric.
1. The `ComputeModelStatistics` transformer computes multiple metrics on a scored dataset (in this case, the `validation` dataset) at the same time.

```python
from synapse.ml.train import TrainClassifier, ComputeModelStatistics
from synapse.ml.automl import FindBestModel
from pyspark.ml.classification import LogisticRegression

# Split the raw feature data (SynapseML handles featurization internally)
train, test, validation = data.randomSplit([0.60, 0.20, 0.20], seed=123)

# Train models with different regularization parameters
lrHyperParams = [0.05, 0.1, 0.2, 0.4]
logisticRegressions = [
    LogisticRegression(regParam=hyperParam) for hyperParam in lrHyperParams
]
lrmodels = [
    TrainClassifier(model=lrm, labelCol="label", numFeatures=10000).fit(train)
    for lrm in logisticRegressions
]

# Select the best model based on AUC
bestModel = FindBestModel(evaluationMetric="AUC", models=lrmodels).fit(test)

# Compute metrics on the validation dataset
predictions = bestModel.transform(validation)
metrics = ComputeModelStatistics().transform(predictions)
print(
    "Best model's AUC on validation set = "
    + "{0:.2f}%".format(metrics.first()["AUC"] * 100)
)
```

Verify the SynapseML results:

```python
auc_value = metrics.first()["AUC"]
print(f"Available metrics: {metrics.columns}")
assert 0.5 < auc_value <= 1.0, f"AUC {auc_value} is outside expected range (0.5, 1.0]"
print(f"SynapseML classification complete - AUC: {auc_value:.4f}")
```

**Expected output (approximate values):**

```output
Best model's AUC on validation set = 74.80%
Available metrics: ['evaluation_type', 'confusion_matrix', 'accuracy', 'precision', 'recall', 'AUC']
SynapseML classification complete - AUC: 0.7480
```

> [!NOTE]
> The pyspark and SynapseML approaches should produce similar AUC values, since they train the same model type with the same hyperparameters on the same data.

## Compare the two approaches

| Aspect | pyspark | SynapseML |
|--------|---------|-----------|
| Feature processing | Manual (Tokenizer to HashingTF to VectorAssembler) | Automatic (handled by `TrainClassifier`) |
| Model selection | Manual loop with evaluator | Built-in `FindBestModel` |
| Metrics computation | Single metric per evaluation call | Multiple metrics with `ComputeModelStatistics` |
| Lines of code | About 30 lines | About 15 lines |
| Result | Same AUC | Same AUC |

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|------------|
| `AnalysisException: Path does not exist` | The public blob storage URL is temporarily unavailable | Wait a few minutes and retry. Verify connectivity by running `spark.read.parquet("wasbs://publicwasb@mmlspark.blob.core.windows.net/BookReviewsFromAmazon10K.parquet").count()` |
| `IllegalArgumentException: Field "features" does not exist` | The feature column names don't match between transformers | Verify column names by running `data.columns` before the VectorAssembler step |
| `NameError: name 'LogisticRegression' is not defined` | Missing import statement | Add `from pyspark.ml.classification import LogisticRegression` at the top of the cell |
| `ModuleNotFoundError: No module named 'synapse.ml'` | Notebook isn't using Fabric Spark runtime | Verify the notebook uses Fabric Runtime 1.2 or later. Select **Environment** in the ribbon to check. |
| Low AUC (below 0.6) | Data split issue or convergence problems | Verify the label distribution with `data.groupBy("label").count().show()`. Expect a roughly balanced dataset. |
| `Py4JJavaError: An error occurred while calling` | Java/Spark internal error | Check the Spark UI for detailed error logs. Restart the Spark session by selecting **Session** > **Stop session**, then rerun all cells. |

## Clean up resources

If you created a new lakehouse for this article and no longer need it:

1. In your workspace, right-click the lakehouse name.
1. Select **Delete**.
1. Confirm the deletion.

The notebook remains in your workspace unless you delete it separately.

## Related content

- [How to use the k-NN (K-Nearest-Neighbors) model with SynapseML](conditional-k-nearest-neighbors-exploring-art.md)
- [How to use ONNX with SynapseML - Deep Learning](onnx-overview.md)
- [How to use Kernel SHAP to explain a tabular classification model](tabular-shap-explainer.md)
