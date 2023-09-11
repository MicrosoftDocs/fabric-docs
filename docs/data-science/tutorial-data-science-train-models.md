---
title: Data science tutorial - train and register machine learning models
description: In this fourth part of the tutorial series, learn how to train machine learning models to predict the total ride duration of taxi trips, and then register the trained models.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom: build-2023
ms.date: 5/4/2023
---

# Part 4: Train and register machine learning models in Microsoft Fabric

Learn to train machine learning models to predict the total ride duration (tripDuration) of yellow taxi trips in New York City based on various factors, such as pickup and drop-off locations, distance, date, time, number of passengers, and rate code. Once a model is trained, you register the trained models, and log hyperparameters used and evaluation metrics using Fabric's native integration with the MLflow framework.

[!INCLUDE [preview-note](../includes/preview-note.md)]

> [!TIP]
> MLflow is an open-source platform for managing the end-to-end machine learning lifecycle with features for tracking experiments, packaging ML models and items, and model registry. For more information, see [MLflow](https://mlflow.org/docs/latest/index.html).

In this tutorial, you'll load cleansed and prepared data from lakehouse delta table and use it to train a regression model to predict ***tripDuration*** variable. You'll also use the Fabric MLflow integration to create and track experiments and register the trained model, model hyperparameters and metrics.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* Complete [Part 1: Ingest data into a Microsoft Fabric lakehouse using Apache Spark](tutorial-data-science-ingest-data.md).  

* Optionally, complete [Part 2: Explore and visualize data using Microsoft Fabric notebooks](tutorial-data-science-explore-notebook.md) to learn more about the data.

* Complete [Part 3: Perform data cleansing and preparation using Apache Spark](tutorial-data-science-data-cleanse.md).

## Follow along in notebook

[04-train-and-track-machine-learning-models.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/04-train-and-track-machine-learning-models.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along](./includes/follow-along.md)]

## Train and register models

1. In the first step, we import the MLflow library and create an experiment named ***nyctaxi_tripduration*** to log the runs and models produced as part of the training process.

   ```python
   # Create Experiment to Track and register model with mlflow
   import mlflow
   print(f"mlflow lbrary version: {mlflow.__version__}")
   EXPERIMENT_NAME = "nyctaxi_tripduration"
   mlflow.set_experiment(EXPERIMENT_NAME)
   ```

1. Read cleansed and prepared data from the lakehouse delta table ***nyctaxi_prep***, and create a fractional random sample from the data (to reduce computation time in this tutorial).

   ```python
   SEED = 1234
   # note: From the perspective of the tutorial, we are sampling training data to speed up the execution.
   training_df = spark.read.format("delta").load("Tables/nyctaxi_prep").sample(fraction = 0.5, seed = SEED)
   ```

   > [!TIP]
   > A seed in machine learning is a value that determines the initial state of a pseudo-random number generator. A seed is used to ensure that the results of machine learning experiments are reproducible. By using the same seed, you can get the same sequence of numbers and thus the same outcomes for data splitting, model training, and other tasks that involve randomness.

1. Perform a random split to get train and test datasets and define categorical and numeric features by executing the following set of commands. We also cache the train and test dataframes to improve the speed of downstream processes.

   ```python
   TRAIN_TEST_SPLIT = [0.75, 0.25]
   train_df, test_df = training_df.randomSplit(TRAIN_TEST_SPLIT, seed=SEED)

   # Cache the dataframes to improve the speed of repeatable reads
   train_df.cache()
   test_df.cache()

   print(f"train set count:{train_df.count()}")
   print(f"test set count:{test_df.count()}")

   categorical_features = ["storeAndFwdFlag","timeBins","vendorID","weekDayName","pickupHour","rateCodeId","paymentType"]
   numeric_features = ['passengerCount', "tripDistance"]
   ```

   > [!TIP]
   > Apache Spark caching is a feature that allows you to store intermediate data in memory or disk and reuse it for multiple queries or operations. Caching can improve the performance and efficiency of your Spark applications by avoiding reprocessing of data that is frequently accessed. You can use different methods and storage levels to cache your data, depending on your needs and resources. Caching is especially useful for iterative algorithms or interactive analysis that require repeated access to the same data.

1. In this step, we define the steps to perform more feature engineering and train the model using [Spark ML](https://spark.apache.org/docs/latest/ml-pipeline.html) pipelines and Microsoft [SynapseML](https://microsoft.github.io/SynapseML/docs/Overview/) library. The algorithm we use for this tutorial, LightGBM, is a fast, distributed, high performance gradient-boosting framework based on decision-tree algorithms. It's an open-source project developed by Microsoft and supports regression, classification, and many other machine learning scenarios. Its main advantages are faster training speed, lower memory usage, better accuracy, and support for distributed learning.

   ```python
   from pyspark.ml.feature import OneHotEncoder, VectorAssembler, StringIndexer
   from pyspark.ml import Pipeline
   from synapse.ml.core.platform import *
   from synapse.ml.lightgbm import LightGBMRegressor

   # Define a pipeline steps for training a LightGBMRegressor regressor model
   def lgbm_pipeline(categorical_features,numeric_features, hyperparameters):
      # String indexer
      stri = StringIndexer(inputCols=categorical_features, 
                           outputCols=[f"{feat}Idx" for feat in categorical_features]).setHandleInvalid("keep")
      # encode categorical/indexed columns
      ohe = OneHotEncoder(inputCols= stri.getOutputCols(),  
                           outputCols=[f"{feat}Enc" for feat in categorical_features])
      
      # convert all feature columns into a vector
      featurizer = VectorAssembler(inputCols=ohe.getOutputCols() + numeric_features, outputCol="features")

      # Define the LightGBM regressor
      lgr = LightGBMRegressor(
         objective = hyperparameters["objective"],
         alpha = hyperparameters["alpha"],
         learningRate = hyperparameters["learning_rate"],
         numLeaves = hyperparameters["num_leaves"],
         labelCol="tripDuration",
         numIterations = hyperparameters["iterations"],
      )
      # Define the steps and sequence of the SPark ML pipeline
      ml_pipeline = Pipeline(stages=[stri, ohe, featurizer, lgr])
      return ml_pipeline
   ```

1. Define training Hyperparameters as a python dictionary for the initial run of the lightgbm model by executing the below cell.

   ```python
   # Default hyperparameters for LightGBM Model
   LGBM_PARAMS = {"objective":"regression",
      "alpha":0.9,
      "learning_rate":0.1,
      "num_leaves":31,
      "iterations":100}
   ```

   > [!TIP]
   > Hyperparameters are the parameters that you can change to control how a machine learning model is trained. Hyperparameters can affect the speed, quality and accuracy of the model. Some common methods to find the best hyperparameters are by testing different values, using a grid or random search, or using a more advanced optimization technique. The hyperparameters for the LightGBM model in this tutorial have been pre-tuned using a distributed grid search (not covered as part of this tutorial) run using the [hyperopt](https://github.com/hyperopt/hyperopt) library.

1. Next, we create a new run in the defined experiment using MLflow and fit the defined pipeline on the training dataframe. We then generate predictions on the test dataset, using the following set of commands.

   ```python
   if mlflow.active_run() is None:
      mlflow.start_run()
   run = mlflow.active_run()
   print(f"Active experiment run_id: {run.info.run_id}")
   lg_pipeline = lgbm_pipeline(categorical_features,numeric_features,LGBM_PARAMS)
   lg_model = lg_pipeline.fit(train_df)

   # Get Predictions
   lg_predictions = lg_model.transform(test_df)
   ## Caching predictions to run model evaluation faster
   lg_predictions.cache()
   print(f"Prediction run for {lg_predictions.count()} samples")
   ```

1. Once a model is trained and predictions generated on the test set, we can compute model statistics for evaluating performance of the trained LightGBMRegressor model by using SynapseML library utility ***ComputeModelStatistics***, which helps evaluate various types of models based on the algorithm. Once the metrics are generated, we also convert them into a python dictionary object for logging purposes. The metrics on which a regression model is evaluated are MSE(Mean Square Error), RMSE(Root Mean Square Error), R^2 and MAE(Mean Absolute Error).

   ```python
   from synapse.ml.train import ComputeModelStatistics
   lg_metrics = ComputeModelStatistics(
      evaluationMetric="regression", labelCol="tripDuration", scoresCol="prediction"
   ).transform(lg_predictions) 
   display(lg_metrics)
   ```

   The output values are similar to the following table:

   | mean_squared_error | root_mean_squared_error | r2 | mean_absolute_error |
   | ----- | ----- | ----- | ----- |
   | 25.721591239516997 | 5.071645811718026 | 0.7613537489434428 | 3.25946u0228763087 |

1. Next, we define a general function to register the trained LightGBMRegressor model with default hyperparameters under the created experiment using MLflow. We also log associated hyperparameters used and metrics for model evaluation in the experiment run and terminate the run in the MLflow experiment in the end.

   ```python
   from mlflow.models.signature import ModelSignature 
   from mlflow.types.utils import _infer_schema 

   # Define a function to register a spark model
   def register_spark_model(run, model, model_name,signature,metrics, hyperparameters):
         # log the model, parameters and metrics
         mlflow.spark.log_model(model, artifact_path = model_name, signature=signature, registered_model_name = model_name, dfs_tmpdir="Files/tmp/mlflow") 
         mlflow.log_params(hyperparameters) 
         mlflow.log_metrics(metrics) 
         model_uri = f"runs:/{run.info.run_id}/{model_name}" 
         print(f"Model saved in run{run.info.run_id}") 
         print(f"Model URI: {model_uri}")
         return model_uri

   # Define Signature object 
   sig = ModelSignature(inputs=_infer_schema(train_df.select(categorical_features + numeric_features)), 
                        outputs=_infer_schema(train_df.select("tripDuration"))) 

   ALGORITHM = "lightgbm" 
   model_name = f"{EXPERIMENT_NAME}_{ALGORITHM}"

   # Create a 'dict' object that contains values of metrics
   lg_metrics_dict = json.loads(lg_metrics.toJSON().first())

   # Call model register function
   model_uri = register_spark_model(run = run,
                                 model = lg_model, 
                                 model_name = model_name, 
                                 signature = sig, 
                                 metrics = lg_metrics_dict, 
                                 hyperparameters = LGBM_PARAMS)
   mlflow.end_run()
   ```

1. Once the default model is trained and registered, we define tuned hyperparameters (tuning hyperparameters not covered in this tutorial) and remove the *paymentType* categorical feature. Because *paymentType* is usually selected at the end of a trip, we hypothesize that it shouldn't be useful to predict trip duration.

   ```python
   # Tuned hyperparameters for LightGBM Model
   TUNED_LGBM_PARAMS = {"objective":"regression",
      "alpha":0.08373361416254149,
      "learning_rate":0.0801709918703746,
      "num_leaves":92,
      "iterations":200}

   # Remove paymentType
   categorical_features.remove("paymentType") 
   ```

1. After defining new hyperparameters and updating feature list, we fit the LightGBM pipeline with tuned hyperparameters on the training dataframe and generate predictions on the test dataset.

   ```python
   if mlflow.active_run() is None:
      mlflow.start_run()
   run = mlflow.active_run()
   print(f"Active experiment run_id: {run.info.run_id}")
   lg_pipeline_tn = lgbm_pipeline(categorical_features,numeric_features,TUNED_LGBM_PARAMS)
   lg_model_tn = lg_pipeline_tn.fit(train_df)

   # Get Predictions
   lg_predictions_tn = lg_model_tn.transform(test_df)
   ## Caching predictions to run model evaluation faster
   lg_predictions_tn.cache()
   print(f"Prediction run for {lg_predictions_tn.count()} samples")
   ```

1. Generate model evaluation metrics for the new LightGBM regression model with optimized hyperparameters and updated features.

   ```python
   lg_metrics_tn = ComputeModelStatistics(
      evaluationMetric="regression", labelCol="tripDuration", scoresCol="prediction"
   ).transform(lg_predictions_tn)
   display(lg_metrics_tn)
   ```

1. In the final step, we register the second LightGBM regression model, and log the metrics and hyperparameters to the MLflow experiment and end the run.

   ```python
   # Define Signature object 
   sig_tn = ModelSignature(inputs=_infer_schema(train_df.select(categorical_features + numeric_features)), 
                        outputs=_infer_schema(train_df.select("tripDuration")))

   # Create a 'dict' object that contains values of metrics
   lg_metricstn_dict = json.loads(lg_metrics_tn.toJSON().first())

   model_uri = register_spark_model(run = run,
                                 model = lg_model_tn, 
                                 model_name = model_name, 
                                 signature = sig_tn, 
                                 metrics = lg_metricstn_dict, 
                                 hyperparameters = TUNED_LGBM_PARAMS)
   mlflow.end_run()
   ```

   The output values are similar to the following table:

   | mean_squared_error | root_mean_squared_error | r2 | mean_absolute_error |
   | ----- | ----- | ----- | ----- |
   | 25.444472646953216 | 5.0442514456511 | 0.7637293020097541 | 3.241663446115354 |

At the end of the tutorial, we have two runs of the lightgbm regression model trained and registered in the MLflow model registry, and the model is also available in the workspace as a Fabric model item.

In order to view the model in the UI:

- Navigate to your currently active Fabric workspace.
- Select the model item named ***nyctaxi_tripduration_lightgbm*** to open the model UI.

   > [!NOTE]
   > If you do not see your model item in the list, refresh your browser.

- On the model UI, you can view the properties and metrics of a given run, compare performance of various runs, and download various file items associated with the trained model.

  The following image shows the layout of the various features within the model UI in a Fabric workspace.

:::image type="content" source="media\tutorial-data-science-train-models\feature-layout-in-model.png" alt-text="Screenshot of a Fabric workspace, showing the layout of the features within the model UI." lightbox="media\tutorial-data-science-train-models\feature-layout-in-model.png":::

## Next steps

- [Part 5: Perform batch scoring and save predictions to a lakehouse](tutorial-data-science-batch-scoring.md)
