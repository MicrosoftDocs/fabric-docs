---
title: Train classification models using explainable boosting machines (preview)
description: Learn how to train classification models using explainable boosting machines
ms.reviewer: larryfr
ms.author: midesa
author: midesa
ms.topic: how-to
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Train explainable boosting machines - classification (preview)

In this article, you learn how to train classification models using explainable boosting machines (EBM). An explainable boosting machine is a machine learning technique that combines the power of gradient boosting with an emphasis on model interpretability. It creates an ensemble of decision trees, similar to gradient boosting, but with a unique focus on generating human-readable models. EBMs not only provide accurate predictions but also offer clear and intuitive explanations for those predictions. They're well-suited for applications where understanding the underlying factors driving model decisions is essential, such as healthcare, finance, and regulatory compliance.

In SynapseML, you can use a scalable implementation of an EBM, powered by Apache Spark, for training new models. This article guides you through the process of applying the scalability and interpretability of EBMs within Microsoft Fabric by utilizing Apache Spark. 

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

In this article, you walk through the process of acquiring and preprocessing data from Azure Open Datasets that records NYC Yellow Taxi trips. Then you train a predictive model with the ultimate objective of determining whether a given trip will occur or not.

## Benefits of explainable boosting machines

 EBMs offer a unique blend of interpretability and predictive power, making them an ideal choice when transparency and comprehensibility of machine learning models are crucial. With EBMs, users can gain valuable insights into the underlying factors driving predictions, enabling them to understand why a model makes specific decisions or predictions, which is essential for building trust in AI systems.

Their ability to uncover complex relationships within the data while providing clear and interpretable results makes them invaluable in fields like finance, healthcare, and fraud detection. In these fields, model explainability isn't only desirable but often a regulatory requirement. Ultimately, users opting for EBMs can strike a balance between model performance and transparency, ensuring that AI solutions are accurate, easily understandable, and accountable.

## Prerequisites

[!INCLUDE [Prerequisites](includes/prerequisites.md)]

* Create a new notebook in your workspace by selecting **+** and then **Notebook**.

## Install libraries

To begin, install the Azure Machine Learning Open Datasets library, which grants access to the dataset. This installation step is essential for accessing and utilizing the dataset effectively.

```python
%pip install azureml-opendatasets
```

## Import MLflow

MLflow allows you to track the model's parameters and outcomes. The following code snippet demonstrates how to use MLflow for experimentation and tracking purposes. The `ebm_classification_nyc_taxi` value is the name of the experiment where the information is logged.

```python
import mlflow

# Set up the experiment name
mlflow.set_experiment("ebm_classification_nyc_taxi")

```

## Import libraries

Next, import the essential packages used for analysis:

```python
# Import necessary packages
import interpret
from pyspark.ml.feature import StringIndexer, VectorAssembler
from pyspark.ml import Pipeline
from pyspark.mllib.evaluation import BinaryClassificationMetrics
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import DoubleType
from synapse.ml.ebm import EbmClassification

```

These imported packages provide the fundamental tools and functionalities needed for your analysis and modeling tasks.

## Load data

Next, retrieve the NYC Yellow Taxi data from Azure Machine Learning Open Datasets and optionally down-sample the dataset to expedite development:

```python
# Import NYC Yellow Taxi data from Azure Open Datasets
from azureml.opendatasets import NycTlcYellow

from datetime import datetime
from dateutil import parser

# Define the start and end dates for the dataset
end_date = parser.parse('2018-05-08 00:00:00')
start_date = parser.parse('2018-05-01 00:00:00')

# Load the NYC Yellow Taxi dataset within the specified date range
nyc_tlc = NycTlcYellow(start_date=start_date, end_date=end_date)
nyc_pd = nyc_tlc.to_pandas_dataframe()
nyc_tlc_df = spark.createDataFrame(nyc_pd)

```

To facilitate development and reduce computational overhead, you might down-sample the dataset:

```python
# For development convenience, consider down-sampling the dataset
sampled_taxi_df = nyc_tlc_df.sample(True, 0.001, seed=1234)

```

Down-sampling allows for a faster and more cost-effective development experience, particularly when working with large datasets.

## Prepare the data

In this section, you prepare the dataset by filtering out rows with outliers and irrelevant variables. 

### Generate features

Create new derived features that are expected to enhance model performance:

```python
taxi_df = sampled_taxi_df.select('totalAmount', 'fareAmount', 'tipAmount', 'paymentType', 'rateCodeId', 'passengerCount',
                                'tripDistance', 'tpepPickupDateTime', 'tpepDropoffDateTime',
                                date_format('tpepPickupDateTime', 'hh').alias('pickupHour'),
                                date_format('tpepPickupDateTime', 'EEEE').alias('weekdayString'),
                                (unix_timestamp(col('tpepDropoffDateTime')) - unix_timestamp(col('tpepPickupDateTime'))).alias('tripTimeSecs'),
                                (when(col('tipAmount') > 0, 1).otherwise(0)).alias('tipped')
                                )\
                        .filter((sampled_taxi_df.passengerCount > 0) & (sampled_taxi_df.passengerCount < 8)
                                & (sampled_taxi_df.tipAmount >= 0) & (sampled_taxi_df.tipAmount <= 25)
                                & (sampled_taxi_df.fareAmount >= 1) & (sampled_taxi_df.fareAmount <= 250)
                                & (sampled_taxi_df.tipAmount < sampled_taxi_df.fareAmount)
                                & (sampled_taxi_df.tripDistance > 0) & (sampled_taxi_df.tripDistance <= 100)
                                & (sampled_taxi_df.rateCodeId <= 5)
                                & (sampled_taxi_df.paymentType.isin({"1", "2"}))
                                )

```

Now that you've created new variables, drop the columns from which they were derived. The dataframe is now more streamlined for model input. Additionally, you can generate further features based on the newly created columns:

```python
taxi_featurised_df = taxi_df.select('totalAmount', 'fareAmount', 'tipAmount', 'paymentType', 'passengerCount',
                                    'tripDistance', 'weekdayString', 'pickupHour', 'tripTimeSecs', 'tipped',
                                    when((taxi_df.pickupHour <= 6) | (taxi_df.pickupHour >= 20), "Night")
                                    .when((taxi_df.pickupHour >= 7) & (taxi_df.pickupHour <= 10), "AMRush")
                                    .when((taxi_df.pickupHour >= 11) & (taxi_df.pickupHour <= 15), "Afternoon")
                                    .when((taxi_df.pickupHour >= 16) & (taxi_df.pickupHour <= 19), "PMRush")
                                    .otherwise(0).alias('trafficTimeBins'))\
                                    .filter((taxi_df.tripTimeSecs >= 30) & (taxi_df.tripTimeSecs <= 7200))

```

These data preparation steps ensure that your dataset is both refined and optimized for subsequent modeling processes.

### Encode the data

In the context of SynapseML EBMs, the ```Estimator``` expects input data to be in the form of an ```org.apache.spark.mllib.linalg.Vector```, essentially a vector of ```Doubles```. So, it's necessary to convert any categorical (string) variables into numerical representations, and any variables that possess numeric values but non-numeric data types must be cast into numeric data types.

Presently, SynapseML EBMs employ the ```StringIndexer``` approach to manage categorical variables. Currently, SynapseML EBMs don't offer specialized handling for categorical features.

Here's a series of steps to prepare the data for use with SynapseML EBMs:

```python
# Convert categorical features into numerical representations using StringIndexer
sI1 = StringIndexer(inputCol="trafficTimeBins", outputCol="trafficTimeBinsIndex")
sI2 = StringIndexer(inputCol="weekdayString", outputCol="weekdayIndex")

# Apply the encodings to create a new dataframe
encoded_df = Pipeline(stages=[sI1, sI2]).fit(taxi_featurised_df).transform(taxi_featurised_df)
final_df = encoded_df.select('fareAmount', 'paymentType', 'passengerCount', 'tripDistance',
                             'pickupHour', 'tripTimeSecs', 'trafficTimeBinsIndex', 'weekdayIndex',
                             'tipped')

# Ensure that any string representations of numbers in the data are cast to numeric data types
final_df = final_df.withColumn('paymentType', final_df['paymentType'].cast(DoubleType()))
final_df = final_df.withColumn('pickupHour', final_df['pickupHour'].cast(DoubleType()))

# Define the label column name
labelColumnName = 'tipped'

# Assemble the features into a vector
assembler = VectorAssembler(outputCol='features')
assembler.setInputCols([c for c in final_df.columns if c != labelColumnName])
vectorized_final_df = assembler.transform(final_df)

```

These data preparation steps are crucial for aligning the data format with the requirements of SynapseML EBMs, ensuring accurate and effective model training.

## Generate test and training datasets

Now divide the dataset into training and testing sets using a straightforward split. 70% of the data is allocated for training and 30% for testing the model:

```python
# Decide on the split between training and test data from the dataframe 
trainingFraction = 0.7
testingFraction = (1-trainingFraction)
seed = 1234

# Split the dataframe into test and training dataframes
train_data_df, test_data_df = vectorized_final_df.randomSplit([trainingFraction, testingFraction], seed=seed)
```

This division of data allows us to train the model on a substantial portion while reserving another portion to assess its performance effectively.

## Train the model

Now, train the EBM model and then evaluate its performance using the Area under the Receiver Operating Characteristic (ROC) curve (AUROC) as the metric:

```python
# Create an instance of the EBMClassifier
estimator = EbmClassification()
estimator.setLabelCol(labelColumnName)

# Fit the EBM model to the training data
model = estimator.fit(train_data_df)

# Make predictions for tip (1/0 - yes/no) on the test dataset and evaluate using AUROC
predictions = model.transform(test_data_df)
predictionsAndLabels = predictions.select("prediction", labelColumnName)
predictionsAndLabels = predictionsAndLabels.withColumn(labelColumnName, predictionsAndLabels[labelColumnName].cast(DoubleType()))

# Calculate AUROC using BinaryClassificationMetrics
metrics = BinaryClassificationMetrics(predictionsAndLabels.rdd)
print("Area under ROC = %s" % metrics.areaUnderROC)

```

This process entails training the EBM model on the training dataset and then utilizing it to make predictions on the test dataset, followed by assessing the model's performance using AUROC as a key metric.

## View global explanations

To visualize the model's overall explanation, you can obtain the visualization wrapper and utilize the ```interpret``` library's ```show``` method. The visualization wrapper acts as a bridge to facilitate the visualization experience of the model. Here's how you can do it:

```python
wrapper = model.getVizWrapper()
explanation = wrapper.explain_global()
```

Next, import the ```interpret``` library and use the ```show``` method to display the explanation:

```python
import interpret
interpret.show(explanation)
```

:::image type="content" source="media/model-training/nyc-taxi-ebms.png" alt-text="Screenshot of global explanations." lightbox="media/model-training//nyc-taxi-ebms.png":::

The term "importances" represents the mean absolute contribution (score) of each term (feature or interaction) towards predictions. These contributions are averaged across the training dataset, taking into account the number of samples in each bin and sample weights (if applicable). The top 15 most important terms are displayed in the explanation.

## View local explanations

The provided explanations are at a global level, but there are scenarios where per-feature outputs are also valuable. Both the trainer and the model offer the capability to set the ```featurescores```, which, when populated, introduces another vector-valued column. Each vector within this column matches the length of the feature column, with each value corresponding to the feature at the same index. These values represent the contribution of each feature's value to the final output of the model.

Unlike global explanations, there's currently no direct integration with the ```interpret``` visualization for per-feature outputs. This is because global visualizations scale primarily with the number of features (which is typically small), while local explanations scale with the number of rows (which, if a Spark dataframe, can be substantial).

Here's how to set up and use the ```featurescores```:

```python
prediction2 = model.setFeatureScoresCol("featurescores").transform(train_data_df)
```

For illustration purposes, let's print the details of the first example:

```python
# Convert to Pandas for easier inspection
predictions_pandas = prediction2.toPandas()
predictions_list = prediction2.collect()

# Extract the first example from the collected predictions.
first = predictions_list[0]

# Print the lengths of the features and feature scores.
print('Length of the features is', len(first['features']), 'while the feature scores have length', len(first['featurescores']))

# Print the values of the features and feature scores.
print('Features are', first['features'])
print('Feature scores are', first['featurescores'])
```

## Related content

- [InterpretML explainable boosting machine: How it Works](https://interpret.ml/docs/ebm.html#how-it-works)
- [Track models with MLflow](mlflow-autologging.md)
