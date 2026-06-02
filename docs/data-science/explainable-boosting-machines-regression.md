---
title: Train regression models using explainable boosting machines
description: Learn how to train regression models using explainable boosting machines
ms.author: scottpolly
author: s-polly
ms.reviewer: ruxu
reviewer: ruixinxu
ms.topic: how-to
ms.date: 05/13/2026
---

# Train explainable boosting machines - regression

This article explains how to use explainable boosting machines (EBM) in Microsoft Fabric to train regression models. An EBM is a machine learning technique that combines the power of gradient boosting with an emphasis on model interpretability. An EBM creates a blend of decision trees, similar to gradient boosting, but with a unique focus on generating human-readable models. EBMs provide both accurate predictions and clear, intuitive explanations for those predictions. EBMs are well-suited for applications that involve healthcare, finance, and regulatory compliance, where understanding the underlying factors that drive model decisions is essential.

In SynapseML, you can use a scalable implementation of explainable boosting machines - powered by Apache Spark - to train new models. This tutorial describes how to use Apache Spark to apply the scalability and interpretability of explainable boosting machines within Microsoft Fabric. 


## Benefits of explainable boosting machines

An EBM offers a unique blend of interpretability and predictive power, which makes it an ideal choice when transparency and comprehensibility of machine learning models are crucial. With EBMs, users can build valuable insights into the underlying factors that drive predictions, and they can then understand why a model makes specific decisions or predictions. This is essential to build trust in AI systems.

Their ability to uncover complex relationships within the data, while providing clear and interpretable results, makes EBMs highly useful in finance, healthcare, and fraud detection. In these areas, model explainability is not only useful but often a regulatory requirement. Ultimately, an EBM can balance model performance and transparency, ensuring accurate, understandable, and accountable AI solutions.

## Prerequisites

[!INCLUDE [Prerequisites](includes/prerequisites.md)]

* Use Fabric Runtime 1.3 or later for SynapseML EBM support.
* Select **+** and then **Notebook** to create a new notebook in your workspace.

> [!NOTE]
> In Fabric notebooks, the Spark session (`spark`) and `display()` function are available by default.

## Set up MLflow

MLflow allows you to track the parameters and outcomes of the model. The following code snippet shows how to use MLflow for experimentation and tracking. The `ebm-wine-recognition-regression` value is the name of the experiment that logs the information.

```python
# Import MLflow
import mlflow

# Create a new experiment for the EBM regression example.
mlflow.set_experiment("ebm-wine-recognition-regression")
```

Run the following code to verify that the experiment was created:

```python
experiment = mlflow.get_experiment_by_name("ebm-wine-recognition-regression")
assert experiment is not None, "Experiment creation failed"
print(f"Experiment '{experiment.name}' created with ID: {experiment.experiment_id}")
```

## Load data

The following code snippet loads and prepares the standard **Wine Recognition dataset** from scikit-learn. The dataset contains 178 samples with 13 numeric features that describe chemical properties of wine. Although the dataset was designed for classification, this example uses the numeric target values to demonstrate an EBM regression workflow. The code converts the Pandas dataframe returned by scikit-learn to a Spark dataframe, as the Spark ML-style trainers require:

```python
import sklearn

# Load the Wine Recognition dataset using the as_frame argument for Pandas compatibility.
bunch = sklearn.datasets.load_wine(as_frame=True)

# Extract the data into a Pandas dataframe.
pandas_df = bunch['data'].copy()

# Add the target variable to the Pandas dataframe.
pandas_df['target'] = bunch['target']

# Convert the Pandas dataframe to a Spark dataframe.
df = spark.createDataFrame(pandas_df)

# Display the resulting Spark dataframe.
display(df)
```

Run the following code to verify that the dataframe has the expected shape:

```python
row_count = df.count()
col_count = len(df.columns)
assert row_count == 178, f"Expected 178 rows, got {row_count}"
assert col_count == 14, f"Expected 14 columns, got {col_count}"
print(f"Dataset loaded: {row_count} rows, {col_count} columns")
```

## Prepare data

For Spark ML-style learners, it's essential to organize the features within a vector-valued column. In this example, the column is named **features**. This column includes all the columns from the loaded dataframe, except for the target variable. This code snippet shows how to use the `VectorAssembler` resource to structure the features correctly for subsequent Spark ML-based modeling:

```python
from pyspark.ml.feature import VectorAssembler

# Define the name of the target variable column.
labelColumnName = 'target'

# Create a VectorAssembler to consolidate features.
assembler = VectorAssembler(outputCol='features')

# Specify the input columns, excluding the target column.
assembler.setInputCols([c for c in df.columns if c != labelColumnName])

# Transform the dataframe to include the 'features' column.
df_with_features = assembler.transform(df)
```

Run the following code to verify that the features column was created with the correct length:

```python
first_row = df_with_features.select("features").first()
feature_length = len(first_row['features'])
assert feature_length == 13, f"Expected 13 features, got {feature_length}"
print(f"Feature vector created with {feature_length} elements")
```

## Train the model

The following code snippet uses the Synapse ML library to start the EBM regression model creation process. It first initializes the EBM regression estimator, specifying that a regression task needs it. It then sets the label column name to ensure the model knows which column to predict. Finally, it fits the model to the preprocessed dataset:

```python
# Import the EBMRegression estimator from Synapse ML.
from synapse.ml.ebm import EbmRegression

# Create an instance of the EBMRegression estimator.
estimator = EbmRegression()

# Set the label column for the regression task.
estimator.setLabelCol(labelColumnName)

# Fit the EBM regression model to the prepared dataset.
model = estimator.fit(df_with_features)
```

Run the following code to verify that the model can generate predictions:

```python
predictions = model.transform(df_with_features)
pred_count = predictions.count()
assert pred_count == 178, f"Expected 178 predictions, got {pred_count}"
assert "prediction" in predictions.columns, "Prediction column missing"
print(f"Model trained. Predictions generated for {pred_count} rows.")
```

Log the run metadata with MLflow:

```python
with mlflow.start_run():
    mlflow.log_param("model_type", "EbmRegression")
    mlflow.log_param("label_column", labelColumnName)
    mlflow.log_param("num_features", 13)
    mlflow.log_metric("training_rows", pred_count)
```

## View global explanations

You can obtain the visualization wrapper, and utilize the ```interpret``` library's ```show``` method, to visualize the overall explanation of the model. The visualization wrapper acts as a bridge to facilitate the visualization experience of the model. The following code snippet shows how to do it:

```python
# Get the visualization wrapper for the model.
wrap = model.getVizWrapper()

# Generate the global explanation.
explanation = wrap.explain_global()
```

Run the following code to verify that the explanation object was generated:

```python
assert explanation is not None, "Global explanation generation failed"
print(f"Global explanation generated with data for {len(explanation.data()['names'])} features")
```

Next, import the ```interpret``` library, and use the ```show``` method to display the explanation:

```python
import interpret
interpret.show(explanation)
```

The term "**importances**" shown in the following image represents the mean absolute contribution (score) of each term (feature or interaction) toward predictions. These contributions are averaged across the training dataset, to account for the number of samples in each bin and the sample weights (if applicable). The explanation displays the top 15 most-important terms.

:::image type="content" source="media/model-training/global-explanations-ebm.png" alt-text="Screenshot of global explanations showing feature importances for the EBM regression model." lightbox="media/model-training/global-explanations-ebm.png":::

## View local explanations

The provided explanations operate at a global level, but in some scenarios, per-feature outputs are also valuable. Both the trainer and the model offer the capability to set the `featureScoresCol` column, which, when populated, introduces another vector-valued column. Each vector in this column matches the length of the feature column, and each value corresponds to the feature at the same index. These values represent the contribution of each feature value to the final output of the model.

Unlike global explanations, there's currently no direct integration with the `interpret` visualization for per-feature outputs. This is because global visualizations scale primarily with the number of features (a typically small value), while local explanations scale with the row count (which, for a Spark dataframe, can be substantial).

The following code snippet shows how to set up and use the `featureScoresCol` column:

```python
# Set the featureScoresCol to include per-feature outputs.
prediction = model.setFeatureScoresCol("featurescores").transform(df_with_features)

# For small datasets, you can collect the results to a single machine without issues.
# For larger datasets, use caution when collecting all rows locally.
# In this example, convert to Pandas for easy local inspection.
predictions_pandas = prediction.toPandas()
predictions_list = prediction.collect()
```

Print the first example details:

```python
# Extract the first example from the collected predictions.
first = predictions_list[0]

# Print the lengths of the features and feature scores.
print('Length of the features is', len(first['features']), 'while the feature scores have length', len(first['featurescores']))

# Print the values of the features and feature scores.
print('Features are', first['features'])
print('Feature scores are', first['featurescores'])
```

Run the following code to verify that the feature scores have the expected shape:

```python
assert len(first['features']) == len(first['featurescores']), "Feature and score lengths don't match"
assert len(first['featurescores']) == 13, f"Expected 13 scores, got {len(first['featurescores'])}"
print(f"Feature scores verified: {len(first['featurescores'])} scores for {len(first['features'])} features")
```

The code snippet showed how to access and print the feature and corresponding feature scores for the first example in the predictions. This code produces the following output:

```text
Length of the features is 13 while the feature scores have length 13
Features are [14.23, 1.71, 2.43, 15.6, 127.0, 2.8, 3.06, 0.28, 2.29, 5.64, 1.04, 3.92, 1065.0]
Feature scores are [-0.05929027436479602,-0.06788488062509922,-0.0385850430666259,-0.2761907140329337,-0.0423377816119861,0.03582834632321236,0.07759833436021146,-0.08428610897153033,-0.01322508472067107,-0.05477604157900576,0.08087667928468423,0.09010794901713073,-0.09521961842295387]
```

## Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|------------|
| `ModuleNotFoundError: No module named 'synapse.ml.ebm'` | The notebook isn't using a Fabric runtime that includes EBM support. | Use Fabric Runtime 1.3 or later in the workspace Spark settings. |
| `interpret.show()` displays no output | The notebook doesn't render the inline visualization. | Use `explanation.data()` to inspect the explanation data directly. |
| Out-of-memory error during `prediction.collect()` | The dataset is too large to collect to the driver. | Use `prediction.limit(100).toPandas()` for local inspection instead of collecting all rows. |
| `AnalysisException` for the `features` column | The `VectorAssembler` transformation was skipped or failed. | Run the **Prepare data** cell again and verify that `df_with_features` contains the `features` column. |

## Related content

- [InterpretML explainable boosting machine: How it works](https://interpret.ml/docs/ebm.html#how-it-works)
- [Track models with MLflow](mlflow-autologging.md)
