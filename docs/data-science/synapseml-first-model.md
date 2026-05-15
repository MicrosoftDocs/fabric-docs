---
ai-usage: ai-assisted
author: s-polly
description: Get a quick introduction to building a machine learning model with SynapseML.
ms.author: scottpolly
ms.collection: ce-skilling-ai-copilot
ms.date: 05/13/2026
ms.reviewer: ruxu
ms.topic: how-to
ms.update-cycle: 180-days
reviewer: ruixinxu
title: Build a model with SynapseML
---

# Build a model with SynapseML

This article shows you how to build a machine learning model with SynapseML in a Microsoft Fabric notebook. You create a training pipeline that uses text featurization and LightGBM regression to predict book ratings from review text. You also learn how to use Foundry Tools for prebuilt sentiment analysis.

> [!div class="checklist"]
> * Create a Fabric notebook and attach a lakehouse
> * Import libraries and load data
> * Build and train a text featurization and LightGBM regression pipeline
> * Generate predictions
> * (Optional) Run Foundry Tools sentiment analysis

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

- [Create a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) in your Fabric workspace.
- [Attach a lakehouse to the notebook](../data-engineering/lakehouse-notebook-explore.md#add-or-remove-a-lakehouse). In the **Explorer** pane, expand **Lakehouses**, and then select **Add**.
- (Optional) To run the [sentiment analysis step](#optional-use-foundry-tools-for-sentiment-analysis), you need:
  - A Foundry Tools key. Follow the instructions in [Quickstart: Create a multi-service resource for Foundry Tools](/azure/ai-services/multi-service-resource).
  - An [Azure Key Vault instance](/azure/key-vault/general/quick-create-portal) with your Foundry Tools key stored as a secret.

## Set up the environment

In your notebook, import SynapseML libraries and initialize your Spark session.

```python
from pyspark.sql import SparkSession
from synapse.ml.core.platform import *

spark = SparkSession.builder.getOrCreate()
```

**Verification:** Run the following cell to confirm Spark is running:

```python
print(f"Spark version: {spark.version}")
```

Expected output:

```output
Spark version: 3.4.1
```

> [!NOTE]
> The exact Spark version depends on your Fabric runtime. Any version 3.4 or later is expected.

## Load a dataset

Load the book reviews dataset and split it into training and test sets. The dataset contains two columns: `rating` (integer 1-5) and `text` (review content).

```python
train, test = (
    spark.read.parquet(
        "wasbs://publicwasb@mmlspark.blob.core.windows.net/BookReviewsFromAmazon10K.parquet"
    )
    .limit(1000)
    .cache()
    .randomSplit([0.8, 0.2])
)

display(train)
```

**Verification:** Run the following cell to confirm the data loaded correctly:

```python
print(f"Training rows: {train.count()}, Test rows: {test.count()}")
print(f"Columns: {train.columns}")
train.printSchema()
```

Expected output:

```output
Training rows: ~800, Test rows: ~200
Columns: ['rating', 'text']
root
 |-- rating: integer (nullable = false)
 |-- text: string (nullable = false)
```

> [!NOTE]
> The exact row counts vary because `randomSplit` is non-deterministic. Expect approximately 800 training rows and 200 test rows.

## Create the training pipeline

Create a pipeline that featurizes the review text with `TextFeaturizer` and predicts the rating with `LightGBMRegressor`.

```python
from pyspark.ml import Pipeline
from synapse.ml.featurize.text import TextFeaturizer
from synapse.ml.lightgbm import LightGBMRegressor

model = Pipeline(
    stages=[
        TextFeaturizer(inputCol="text", outputCol="features"),
        LightGBMRegressor(featuresCol="features", labelCol="rating", dataTransferMode="bulk")
    ]
).fit(train)
```

**Verification:** Run the following cell to confirm the pipeline trained:

```python
print(f"Pipeline stages: {len(model.stages)}")
print(f"Stage 1: {type(model.stages[0]).__name__}")
print(f"Stage 2: {type(model.stages[1]).__name__}")
```

Expected output:

```output
Pipeline stages: 2
Stage 1: TextFeaturizerModel
Stage 2: LightGBMRegressionModel
```

## Predict the output of the test data

Call the `transform` method on the model to predict ratings for the test data and display the results.

```python
predictions = model.transform(test)
display(predictions)
```

**Verification:** Run the following cell to confirm predictions were generated:

```python
print(f"Prediction columns: {predictions.columns}")
print(f"Prediction count: {predictions.count()}")
predictions.select("rating", "prediction").show(5)
```

Expected output:

```output
Prediction columns: ['rating', 'text', 'features', 'prediction']
Prediction count: ~200
+------+------------------+
|rating|        prediction|
+------+------------------+
|     2| 2.456...|
|     5| 3.891...|
...
```

> [!NOTE]
> The `prediction` column contains the model's predicted rating (a float). Compare it against the actual `rating` column to assess model performance.

## (Optional) Use Foundry Tools for sentiment analysis

If you want to analyze the sentiment of your book reviews, you can use SynapseML's integration with Foundry Tools. This step uses the prebuilt `TextSentiment` model to classify text sentiment, which is a different task than the rating prediction in the previous steps.

> [!IMPORTANT]
> This step requires a Foundry Tools key stored in Azure Key Vault. If you skipped those prerequisites, complete them first or skip this section.

Run the following code with these replacements:

- Replace `<your-secret-name>` with the name of your Foundry Tools key secret in Key Vault.
- Replace `<your-key-vault-name>` with the name of your Azure Key Vault instance.

```python
from synapse.ml.services import TextSentiment
from synapse.ml.core.platform import find_secret

sentiment_model = TextSentiment(
    textCol="text",
    outputCol="sentiment",
    subscriptionKey=find_secret("<your-secret-name>", "<your-key-vault-name>")
).setLocation("eastus")

sentiment_results = sentiment_model.transform(test)
display(sentiment_results)
```

> [!NOTE]
> Update the `setLocation` value if your Foundry Tools resource is in a different Azure region (for example, `"westus2"` or `"westeurope"`).

**Verification:** Run the following cell to confirm sentiment analysis completed:

```python
print(f"Sentiment columns: {sentiment_results.columns}")
sentiment_results.select("text", "sentiment").show(3, truncate=50)
```

Expected output:

```output
Sentiment columns: ['rating', 'text', 'sentiment']
+--------------------------------------------------+--------------------+
|                                              text|           sentiment|
+--------------------------------------------------+--------------------+
|Ok~ but I think the Keirsey Temperment Test is ...|[{mixed, ...}]      |
...
```

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|------------|
| `JAVA_GATEWAY_EXITED` error when creating SparkSession | Running code outside a Fabric notebook | Run this code in a Fabric notebook where Spark is preconfigured. Don't run locally without a Spark installation. |
| `Could not find <secret> in keyvault <vault>` | Key Vault name or secret name is incorrect, or notebook identity lacks access | Verify names match exactly. In the Azure portal, confirm your Fabric workspace identity has **Get** permission on Key Vault secrets. |
| `TextFeaturizer` returns empty features | Input text column is null or empty | Check for null values: `train.filter(train.text.isNull()).count()` - remove nulls before training. |
| `randomSplit` returns unexpected row counts | Spark's random splitting is non-deterministic | This is expected behavior. Set a seed for reproducibility: `.randomSplit([0.8, 0.2], seed=42)` |
| `AnalysisException: Path does not exist` | Network issue accessing the sample data blob | Verify network connectivity. In Fabric, confirm your workspace can access external Azure Blob Storage URLs. |
| Foundry Tools returns 401 or 403 | Invalid or expired subscription key | Generate a new key in the Azure portal under your Foundry Tools resource **Keys and Endpoint** section. Update the Key Vault secret. |
| `setLocation` returns 404 | Region mismatch | Set the location to match the Azure region where you created your Foundry Tools resource. |

## Clean up resources

If you created Azure resources for the optional Foundry Tools step and no longer need them, delete them to avoid charges:

1. In the Azure portal, delete the Foundry Tools multi-service resource.
1. In the Azure portal, delete the Key Vault instance.
1. In your Fabric workspace, delete the test notebook if you no longer need it.

## Related content

- [How to use LightGBM with SynapseML](lightgbm-overview.md)
- [How to use Foundry Tools with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
- [Quickstart: Create a multi-service resource for Foundry Tools](/azure/ai-services/multi-service-resource)