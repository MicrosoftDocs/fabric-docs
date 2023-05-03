---
title: Data science tutorial - train and register machine learning models
description: In this fourth module, learn how to train machine learning models to predict the total ride duration of taxi trips, and then register the trained models.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.date: 5/4/2023
---

# Module 4: Train and register machine learning models in Microsoft Fabric

In this module, you learn to train machine learning models to predict the total ride duration (tripDuration) of yellow taxi trips in New York City based on various factors, such as pickup and drop-off locations, distance, date, time, number of passengers, and rate code. Once a model is trained, you register the trained models, and log hyperparameters used and evaluation metrics using Fabric's native integration with the MLflow framework.

> [!TIP]
> MLflow is an open-source platform for managing the end-to-end machine learning lifecycle with features for tracking experiments, packaging ML models and artifacts, and model registry. For more information, see [MLflow](https://mlflow.org/docs/latest/index.html).

## Follow along in notebook
The python commands/script used in each step of this tutorial can be found in the accompanying notebook: **04 - Train and track machine learning models**. Be sure to [attach a lakehouse to the notebook](tutorial-data-science-prepare-system.md#attach-a-lakehouse-to-the-notebooks) before executing it.

In the following steps, you load cleansed and prepared data from lakehouse delta table and use it to train a regression model to predict tripDuration variable. You also use the Fabric MLflow integration to create and track experiments and register the trained model, model hyperparameters and metrics.

## Train and register models

1. In the first step, we import the MLflow library and create an experiment named ***nyctaxi_tripduration*** to log the runs and models produced as part of the training process.

   :::image type="content" source="media\tutorial-data-science-train-models\create-experiment.png" alt-text="Screenshot of code sample to create an experiment that logs runs." lightbox="media\tutorial-data-science-train-models\create-experiment.png":::

1. Read cleansed and prepared data from the lakehouse delta table ***nyctaxi_prep***, and create a fractional random sample from the data (to reduce computation time in this tutorial).

   :::image type="content" source="media\tutorial-data-science-train-models\create-random-sample-code.png" alt-text="Screenshot of code sample to create a fractional random sample from the dataset." lightbox="media\tutorial-data-science-train-models\create-random-sample-code.png":::

   > [!TIP]
   > A seed in machine learning is a value that determines the initial state of a pseudo-random number generator. A seed is used to ensure that the results of machine learning experiments are reproducible. By using the same seed, you can get the same sequence of numbers and thus the same outcomes for data splitting, model training, and other tasks that involve randomness.

1. Perform a random split to get train and test datasets and define categorical and numeric features by executing the following set of commands. We also cache the train and test dataframes to improve the speed of downstream processes.

   :::image type="content" source="media\tutorial-data-science-train-models\random-split-code.png" alt-text="Screenshot of code sample to perform a random split." lightbox="media\tutorial-data-science-train-models\random-split-code.png":::

   > [!TIP]
   > Apache Spark caching is a feature that allows you to store intermediate data in memory or disk and reuse it for multiple queries or operations. Caching can improve the performance and efficiency of your Spark applications by avoiding reprocessing of data that is frequently accessed. You can use different methods and storage levels to cache your data, depending on your needs and resources. Caching is especially useful for iterative algorithms or interactive analysis that require repeated access to the same data.

1. In this step, we define the steps to perform more feature engineering and train the model using [Spark ML](https://spark.apache.org/docs/latest/ml-pipeline.html) pipelines and Microsoft [SynapseML](https://microsoft.github.io/SynapseML/docs/about/) library. The algorithm we use for this tutorial, LightGBM, is a fast, distributed, high performance gradient-boosting framework based on decision-tree algorithms. It's an open-source project developed by Microsoft and supports regression, classification, and many other machine learning scenarios. Its main advantages are faster training speed, lower memory usage, better accuracy, and support for distributed learning.

   :::image type="content" source="media\tutorial-data-science-train-models\use-lightgbm-code.png" alt-text="Screenshot of code sample to train the model using Spark ML and Microsoft SynapseML." lightbox="media\tutorial-data-science-train-models\use-lightgbm-code.png":::

1. Define training Hyperparameters as a python dictionary for the initial run of the lightgbm model by executing the below cell.

   :::image type="content" source="media\tutorial-data-science-train-models\define-hyperparameters-code.png" alt-text="Screenshot of code sample to define training hyperparameters." lightbox="media\tutorial-data-science-train-models\define-hyperparameters-code.png":::

   > [!TIP]
   > Hyperparameters are the parameters that you can change to control how a machine learning model is trained. Hyperparameters can affect the speed, quality and accuracy of the model. Some common methods to find the best hyperparameters are by testing different values, using a grid or random search, or using a more advanced optimization technique. The hyperparameters for the LightGBM model in this tutorial have been pre-tuned using a distributed grid search (not covered as part of this tutorial) run using the [hyperopt](https://github.com/hyperopt/hyperopt) library.

1. Next, we create a new run in the defined experiment using MLflow and fit the defined pipeline on the training dataframe. We then generate predictions on the test dataset, using the following set of commands.

   :::image type="content" source="media\tutorial-data-science-train-models\create-mlflow-run.png" alt-text="Screenshot of code sample to create a new run and generate predictions." lightbox="media\tutorial-data-science-train-models\create-mlflow-run.png":::

1. Once a model is trained and predictions generated on the test set, we can compute model statistics for evaluating performance of the trained LightGBMRegressor model by using SynapseML library utility ***ComputeModelStatistics***, which helps evaluate various types of models based on the algorithm. Once the metrics are generated, we also convert them into a python dictionary object for logging purposes. The metrics on which a regression model is evaluated are MSE(Mean Square Error), RMSE(Root Mean Square Error), R^2 and MAE(Mean Absolute Error).

    :::image type="content" source="media\tutorial-data-science-train-models\compute-model-statistics.png" alt-text="Screenshot of code in cell to compute statistics and the result in a table underneath the cell." lightbox="media\tutorial-data-science-train-models\compute-model-statistics.png":::

1. Next, we define a general function to register the trained LightGBMRegressor model with default hyperparameters under the created experiment using MLflow. We also log associated hyperparameters used and metrics for model evaluation in the experiment run and terminate the run in the MLflow experiment in the end.

   :::image type="content" source="media\tutorial-data-science-train-models\register-log-model.png" alt-text="Screenshot of code sample to register the model and log hyperparameters and metrics." lightbox="media\tutorial-data-science-train-models\register-log-model.png":::

1. Once the default model is trained and registered, we define tuned hyperparameters (tuning hyperparameters not covered in this tutorial) and remove the *paymentType* categorical feature. Because *paymentType* is usually selected at the end of a trip, we hypothesize that it shouldn't be useful to predict trip duration.

   :::image type="content" source="media\tutorial-data-science-train-models\tuned-hyperparameters.png" alt-text="Screenshot of code sample to define tuned hyperparameters and remove a categorical feature." lightbox="media\tutorial-data-science-train-models\tuned-hyperparameters.png":::

1. After defining new hyperparameters and updating feature list, we fit the LightGBM pipeline with tuned hyperparameters on the training dataframe and generate predictions on the test dataset.

   :::image type="content" source="media\tutorial-data-science-train-models\fit-pipeline-dataframe.png" alt-text="Screenshot of code sample to fit a pipeline with tuned hyperparameters." lightbox="media\tutorial-data-science-train-models\fit-pipeline-dataframe.png":::

1. Generate model evaluation metrics for the new LightGBM regression model with optimized hyperparameters and updated features.

   :::image type="content" source="media\tutorial-data-science-train-models\generate-evaluation-metrics.png" alt-text="Screenshot of code sample to generate model evaluation metrics." lightbox="media\tutorial-data-science-train-models\generate-evaluation-metrics.png":::

1. In the final step, we register the second LightGBM regression model, and log the metrics and hyperparameters to the MLflow experiment and end the run.

   :::image type="content" source="media\tutorial-data-science-train-models\define-signature-object.png" alt-text="Screenshot of code sample to register another model and log hyperparameters and metrics." lightbox="media\tutorial-data-science-train-models\define-signature-object.png":::

   :::image type="content" source="media\tutorial-data-science-train-models\result-register-end-run.png" alt-text="Screenshot showing the Spark job run list." lightbox="media\tutorial-data-science-train-models\result-register-end-run.png":::

At the end of the module, we have two runs of the lightgbm regression model trained and registered in the MLflow model registry, and the model is also available in the workspace as a Fabric model artifact.

> [!NOTE]
> If you do not see your model artifact in the list, refresh your browser.

In order to view the model in the UI:

- Navigate to your currently active Fabric workspace.
- Select the model artifact named ***nyctaxi_tripduration_lightgbm*** to open the model UI.
- On the model UI, you can view the properties and metrics of a given run, compare performance of various runs, and download various file artifacts associated with the trained model.

  The following image shows the layout of the various features within the model UI in a Fabric workspace.

:::image type="content" source="media\tutorial-data-science-train-models\feature-layout-in-model.png" alt-text="Screenshot of a Fabric workspace, showing the layout of the features within the model UI." lightbox="media\tutorial-data-science-train-models\feature-layout-in-model.png":::

## Next steps

- [Module 5: Perform batch scoring and save predictions to a lakehouse](tutorial-data-science-batch-scoring.md)
