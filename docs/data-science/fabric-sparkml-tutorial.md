---
title: How to train models with Apache Spark MLlib
description: A tutorial on how to use Apache Spark MLlib to create a machine learning model that analyzes a dataset by using classification through logistic regression.
ms.reviewer: midesa
ms.author: scottpolly
author: s-polly
ms.topic: how-to
ms.custom: 
ms.date: 06/19/2024
---

# Build a machine learning model with Apache Spark MLlib

In this article, you learn how to use Apache Spark [MLlib](https://spark.apache.org/mllib/) to create a machine learning application that handles simple predictive analysis on an Azure open dataset. Spark provides built-in machine learning libraries. This example uses *classification* through logistic regression.

The core SparkML and MLlib Spark libraries provide many utilities that are useful for machine learning tasks. These utilities are suitable for:

- Classification
- Clustering
- Hypothesis testing and calculating sample statistics
- Regression
- Singular value decomposition (SVD) and principal component analysis (PCA)
- Topic modeling

## Understand classification and logistic regression

*Classification*, a popular machine learning task, involves sorting input data into categories. A classification algorithm should figure out how to assign *labels* to the supplied input data. For example, a machine learning algorithm could accept stock information as input, and divide the stock into two categories: stocks that you should sell and stocks that you should keep.

The *Logistic regression* algorithm is useful for classification. The Spark logistic regression API is useful for *binary classification* of input data into one of two groups. For more information about logistic regression, see [Wikipedia](https://en.wikipedia.org/wiki/Logistic_regression).

Logistic regression produces a *logistic function* that can predict the probability that an input vector belongs to one group or the other.

## Predictive analysis example of NYC taxi data

First, install ```azureml-opendatasets```. The data is available through the [Azure Open Datasets](https://azure.microsoft.com/services/open-datasets/catalog/nyc-taxi-limousine-commission-yellow-taxi-trip-records/) resource. This dataset subset hosts information about yellow taxi trips, including the start times, end times, start locations, end locations, trip costs, and other attributes.

```python
%pip install azureml-opendatasets
```

The rest of this article relies on Apache Spark to first perform some analysis on the NYC taxi-trip tip data and then develop a model to predict whether a particular trip includes a tip or not.

## Create an Apache Spark machine learning model

1. Create a PySpark notebook. For more information, visit [Create a notebook](../data-engineering/how-to-use-notebook.md).
2. Import the types required for this notebook.

    ```python
    import matplotlib.pyplot as plt
    from datetime import datetime
    from dateutil import parser
    from pyspark.sql.functions import unix_timestamp, date_format, col, when
    from pyspark.ml import Pipeline
    from pyspark.ml import PipelineModel
    from pyspark.ml.feature import RFormula
    from pyspark.ml.feature import OneHotEncoder, StringIndexer, VectorIndexer
    from pyspark.ml.classification import LogisticRegression
    from pyspark.mllib.evaluation import BinaryClassificationMetrics
    from pyspark.ml.evaluation import BinaryClassificationEvaluator
    ```

3. We'll use [MLflow](https://mlflow.org/) to track our machine learning experiments and corresponding runs. If [!INCLUDE [product-name](../includes/product-name.md)] Autologging is enabled, the corresponding metrics and parameters are automatically captured.

    ```python
    import mlflow
    ```

## Construct the input DataFrame

This example loads the data into a Pandas dataframe, and then converts it into an Apache Spark dataframe. In that format, we can apply other Apache Spark operations to clean and filter the dataset.

1. Paste these lines into a new cell, and run them to create a Spark DataFrame. This step retrieves the data via the Open Datasets API. We can filter this data down to examine a specific window of data. The code example uses `start_date` and `end_date` to apply a filter that returns a single month of data.

    ```python
    from azureml.opendatasets import NycTlcYellow
    
    end_date = parser.parse('2018-06-06')
    start_date = parser.parse('2018-05-01')
    nyc_tlc = NycTlcYellow(start_date=start_date, end_date=end_date)
    nyc_tlc_pd = nyc_tlc.to_pandas_dataframe()

    nyc_tlc_df = spark.createDataFrame(nyc_tlc_pd).repartition(20)

    ```

2. This code reduces the dataset to about 10,000 rows. To speed up the development and training, the code samples down our dataset for now.

    ```python
    # To make development easier, faster, and less expensive, sample down for now
    sampled_taxi_df = nyc_tlc_df.sample(True, 0.001, seed=1234)
    ```

3. We want to look at our data using the built-in ```display()``` command. With this command, we can easily view a data sample, or graphically explore trends in the data.

    ```python
    #sampled_taxi_df.show(10)
    display(sampled_taxi_df.limit(10))    
    ```

## Prepare the data

Data preparation is a crucial step in the machine learning process. It involves cleaning, transformation, and organization of raw data, to make it suitable for analysis and modeling. In this code sample, you perform several data preparation steps:

- Filter the dataset to remove outliers and incorrect values
- Remove columns that aren't needed for model training
- Create new columns from the raw data
- Generate a label to determine whether or not a given Taxi trip involves a tip

```python
taxi_df = sampled_taxi_df.select('totalAmount', 'fareAmount', 'tipAmount', 'paymentType', 'rateCodeId', 'passengerCount'\
                        , 'tripDistance', 'tpepPickupDateTime', 'tpepDropoffDateTime'\
                        , date_format('tpepPickupDateTime', 'hh').alias('pickupHour')\
                        , date_format('tpepPickupDateTime', 'EEEE').alias('weekdayString')\
                        , (unix_timestamp(col('tpepDropoffDateTime')) - unix_timestamp(col('tpepPickupDateTime'))).alias('tripTimeSecs')\
                        , (when(col('tipAmount') > 0, 1).otherwise(0)).alias('tipped')
                        )\
                .filter((sampled_taxi_df.passengerCount > 0) & (sampled_taxi_df.passengerCount < 8)\
                        & (sampled_taxi_df.tipAmount >= 0) & (sampled_taxi_df.tipAmount <= 25)\
                        & (sampled_taxi_df.fareAmount >= 1) & (sampled_taxi_df.fareAmount <= 250)\
                        & (sampled_taxi_df.tipAmount < sampled_taxi_df.fareAmount)\
                        & (sampled_taxi_df.tripDistance > 0) & (sampled_taxi_df.tripDistance <= 100)\
                        & (sampled_taxi_df.rateCodeId <= 5)
                        & (sampled_taxi_df.paymentType.isin({"1", "2"}))
                        )
```

Next, make a second pass over the data to add the final features.

```Python
taxi_featurised_df = taxi_df.select('totalAmount', 'fareAmount', 'tipAmount', 'paymentType', 'passengerCount'\
                                                , 'tripDistance', 'weekdayString', 'pickupHour','tripTimeSecs','tipped'\
                                                , when((taxi_df.pickupHour <= 6) | (taxi_df.pickupHour >= 20),"Night")\
                                                .when((taxi_df.pickupHour >= 7) & (taxi_df.pickupHour <= 10), "AMRush")\
                                                .when((taxi_df.pickupHour >= 11) & (taxi_df.pickupHour <= 15), "Afternoon")\
                                                .when((taxi_df.pickupHour >= 16) & (taxi_df.pickupHour <= 19), "PMRush")\
                                                .otherwise(0).alias('trafficTimeBins')
                                              )\
                                       .filter((taxi_df.tripTimeSecs >= 30) & (taxi_df.tripTimeSecs <= 7200))
```

## Create a logistic regression model

The final task converts the labeled data into a format that logistic regression can handle. The input to a logistic regression algorithm must have a *label/feature vector pairs* structure, where the *feature vector* is a vector of numbers that represent the input point.

Based on the final task requirements, we must convert the categorical columns into numbers. Specifically, we must convert the `trafficTimeBins` and `weekdayString` columns into integer representations. We have many options available to handle this requirement. This example involves the `OneHotEncoder` approach:

```python
# Because the sample uses an algorithm that works only with numeric features, convert them so they can be consumed
sI1 = StringIndexer(inputCol="trafficTimeBins", outputCol="trafficTimeBinsIndex")
en1 = OneHotEncoder(dropLast=False, inputCol="trafficTimeBinsIndex", outputCol="trafficTimeBinsVec")
sI2 = StringIndexer(inputCol="weekdayString", outputCol="weekdayIndex")
en2 = OneHotEncoder(dropLast=False, inputCol="weekdayIndex", outputCol="weekdayVec")

# Create a new DataFrame that has had the encodings applied
encoded_final_df = Pipeline(stages=[sI1, en1, sI2, en2]).fit(taxi_featurised_df).transform(taxi_featurised_df)
```

This action results in a new DataFrame with all columns in the proper format to train a model.

## Train a logistic regression model

The first task splits the dataset into a training set, and a testing or validation set.

```python
# Decide on the split between training and test data from the DataFrame
trainingFraction = 0.7
testingFraction = (1-trainingFraction)
seed = 1234

# Split the DataFrame into test and training DataFrames
train_data_df, test_data_df = encoded_final_df.randomSplit([trainingFraction, testingFraction], seed=seed)
```

Once we have two DataFrames, we must create the model formula and run it against the training DataFrame. Then we can validate against the test dataFrame. Experiment with different versions of the model formula to see the effects of different combinations.

```python
## Create a new logistic regression object for the model
logReg = LogisticRegression(maxIter=10, regParam=0.3, labelCol = 'tipped')

## The formula for the model
classFormula = RFormula(formula="tipped ~ pickupHour + weekdayVec + passengerCount + tripTimeSecs + tripDistance + fareAmount + paymentType+ trafficTimeBinsVec")

## Undertake training and create a logistic regression model
lrModel = Pipeline(stages=[classFormula, logReg]).fit(train_data_df)

## Predict tip 1/0 (yes/no) on the test dataset; evaluation using area under ROC
predictions = lrModel.transform(test_data_df)
predictionAndLabels = predictions.select("label","prediction").rdd
metrics = BinaryClassificationMetrics(predictionAndLabels)
print("Area under ROC = %s" % metrics.areaUnderROC)
```

The cell outputs:

```shell
Area under ROC = 0.9749430523917996
```

## Create a visual representation of the prediction

We can now build a final visualization to interpret the model results. A [ROC curve](https://en.wikipedia.org/wiki/Receiver_operating_characteristic) can certainly present the result.

```python
## Plot the ROC curve; no need for pandas, because this uses the modelSummary object
modelSummary = lrModel.stages[-1].summary

plt.plot([0, 1], [0, 1], 'r--')
plt.plot(modelSummary.roc.select('FPR').collect(),
         modelSummary.roc.select('TPR').collect())
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.show()
```

:::image type="content" source="media/model-training/sparkml-tutorial-results.png" alt-text="Graph that shows the ROC curve for logistic regression in the tip model." lightbox="media/model-training/sparkml-tutorial-results.png":::

## Related content

- Use AI samples to build machine learning models: [Use AI samples](use-ai-samples.md)
- Track machine learning runs using Experiments: [Machine learning experiments](machine-learning-experiment.md)
