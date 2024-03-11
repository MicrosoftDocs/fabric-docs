---
title: Train regression models using explainable boosting machines (preview)
description: Learn how to train regression models using explainable boosting machines
ms.reviewer: mopeakande
ms.author: midesa
author: midesa
ms.topic: how-to
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Train explainable boosting machines - regression (preview)

In this article, you'll learn how to train regression models using explainable boosting machines (EBM) in Microsoft Fabric. An EBM is a machine learning technique that combines the power of gradient boosting with an emphasis on model interpretability. It creates an ensemble of decision trees, similar to gradient boosting, but with a unique focus on generating human-readable models. EBMs not only provide accurate predictions but also offer clear and intuitive explanations for those predictions. They're well-suited for applications where understanding the underlying factors driving model decisions is essential, such as healthcare, finance, and regulatory compliance.

In SynapseML, you can use a scalable implementation of explainable boosting machines, powered by Apache Spark, for training new models. This tutorial guides you through the process of applying the scalability and interpretability of explainable boosting machines within Microsoft Fabric by utilizing Apache Spark. Using explainable boosting machines with Microsoft Fabric is currently in preview.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Benefits of explainable boosting machines

 EBMs offer a unique blend of interpretability and predictive power, making them an ideal choice when transparency and comprehensibility of machine learning models are crucial. With EBMs, users can gain valuable insights into the underlying factors driving predictions, enabling them to understand why a model makes specific decisions or predictions, which is essential for building trust in AI systems.

Their ability to uncover complex relationships within the data while providing clear and interpretable results makes them invaluable in fields like finance, healthcare, and fraud detection. In these fields, model explainability isn't only desirable but often a regulatory requirement. Ultimately, opting for EBMs can strike a balance between model performance and transparency, ensuring that AI solutions are accurate, easily understandable, and accountable.

## Prerequisites

[!INCLUDE [Prerequisites](includes/prerequisites.md)]

* Create a new notebook in your workspace by selecting **+** and then **Notebook**.

## Import MLflow

MLflow allows you to track the model's parameters and outcomes. The following code snippet demonstrates how to use MLflow for experimentation and tracking purposes. The `ebm-wine-quality` value is the name of the experiment where the information is logged.

```python
# Import MLflow
import mlflow

# Create a new experiment for EBM Wine Quality
mlflow.set_experiment("ebm-wine-quality")

```

## Load data

The following code snippet loads and prepares the standard Wine Quality Data Set, which serves as a compact yet valuable dataset for regression tasks. It's important to highlight that the conversion process involves converting a Pandas dataframe (returned by Sklearn when using the as_frame argument) to a Spark dataframe, as required by Spark ML style trainers:

```python
import sklearn

# Load the Wine Quality Data Set using the as_frame argument for Pandas compatibility.
bunch = sklearn.datasets.load_wine(as_frame=True)

# Extract the data into a Pandas dataframe.
pandas_df = bunch['data']

# Add the target variable to the Pandas dataframe.
pandas_df['target'] = bunch['target']

# Convert the Pandas dataframe to a Spark dataframe.
df = spark.createDataFrame(pandas_df)

# Display the resulting Spark dataframe.
display(df)

```

This code snippet demonstrates how to load, manipulate, and convert the dataset for use with Spark-based machine learning tasks.

## Prepare data

As is customary with Spark ML-style learners, it's essential to organize the features within a vector-valued column. In this case, refer to this column as "features," which encompasses all the columns from the loaded dataframe except for the target variable:

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

This code snippet illustrates how to use the VectorAssembler to structure the features correctly for subsequent Spark ML-based modeling.

## Train the model

The following code initiates the process of creating an EBM regression model using the Synapse ML library. First, initialize the EBM regression estimator, specifying that it's intended for a regression task. Next, set the label column name to ensure the model knows which column to predict. Finally, fit the model to the preprocessed dataset:

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

## View global explanations

To visualize the model's overall explanation, you can obtain the visualization wrapper and utilize the ```interpret``` library's ```show``` method. The visualization wrapper acts as a bridge to facilitate the visualization experience of the model. Here's how you can do it:

```python
# Get the visualization wrapper for the model.
wrap = model.getVizWrapper()

# Generate the global explanation.
explanation = wrap.explain_global()

```

Next, import the ```interpret``` library and use the ```show``` method to display the explanation:

```python
import interpret
interpret.show(explanation)
```

The term "importances" represents the mean absolute contribution (score) of each term (feature or interaction) towards predictions. These contributions are averaged across the training dataset, taking into account the number of samples in each bin and sample weights (if applicable). The top 15 most important terms are displayed in the explanation.

:::image type="content" source="media/model-training/global-explanations-ebm.png" alt-text="Screenshot of global explanations." lightbox="media/model-training/global-explanations-ebm.png":::

## View local explanations

The provided explanations are at a global level, but there are scenarios where per-feature outputs are also valuable. Both the trainer and the model offer the capability to set the ```FeaturesScoresCol```, which, when populated, introduces another vector-valued column. Each vector within this column matches the length of the feature column, with each value corresponding to the feature at the same index. These values represent the contribution of each feature's value to the final output of the model.

Unlike global explanations, there's currently no direct integration with the ```interpret``` visualization for per-feature outputs. This is because global visualizations scale primarily with the number of features (which is typically small), while local explanations scale with the number of rows (which, if a Spark dataframe, can be substantial).

Here's how to set up and use the ```FeaturesScoresCol```:

```python
# Set the FeaturesScoresCol to include per-feature outputs.
prediction = model.setFeatureScoresCol("featurescores").transform(df_with_features)

# For small datasets, you can collect the results to a single machine without issues.
# However, for larger datasets, caution should be exercised when collecting all rows locally.
# In this example, we convert to Pandas for easy local inspection.
predictions_pandas = prediction.toPandas()
predictions_list = prediction.collect()

```

For illustration purposes, let's print the details of the first example:

```python
# Extract the first example from the collected predictions.

first = predictions_list[0]

# Print the lengths of the features and feature scores.
print('Length of the features is', len(first['features']), 'while the feature scores have length', len(first['featurescores']))

# Print the values of the features and feature scores.
print('Features are', first['features'])
print('Feature scores are', first['featurescores'])

```

This code snippet demonstrates how to access and print the feature values and corresponding feature scores for the first example in the predictions. This code produces the following output:

```html
Length of the features is 13 while the feature scores have length 13
Features are [14.23, 1.71, 2.43, 15.6, 127.0, 2.8, 3.06, 0.28, 2.29, 5.64, 1.04, 3.92, 1065.0]
Feature scores are [-0.06610139373422304, -0.06386890875478829, 0.006784629513340544, -0.27503132406909486, -0.017971992178296585, 0.027848245358365248, 0.08691003021839885, -0.09550122309042419, -0.0068259112648438175, -0.04053278237133137, 0.07148173894260551, 0.07739120309898403, -0.0867647572984993]

```

## Related content

- [InterpretML explainable boosting machine: How it works](https://interpret.ml/docs/ebm.html#how-it-works)
- [Track models with MLflow](mlflow-autologging.md)
