---
title: AutoML in Fabric
description: Leverage AutoML in Fabric to automate the ML workflow (preview)
ms.topic: overview
ms.reviewer: ssalgado
author: midesa
ms.author: midesa
ms.date: 03/18/2024
---

# AutoML in Fabric (preview)

AutoML (Automated Machine Learning) is a collection of methods and tools that automate machine learning model training and optimization with little human involvement. The aim of AutoML is to simplify and speed up the process of choosing the best machine learning model and hyperparameters for a given dataset, which usually demands a lot of skill and computing power.

[!INCLUDE feature-preview]

In Fabric, data scientists can use ```flaml.AutoML``` to automate their machine learning tasks.

AutoML can help ML professionals and developers from different sectors to:

- Build ML solutions with minimal coding
- Reduce time and cost
- Apply data science best practices
- Solve problems quickly and efficiently

## AutoML workflow

```flaml.AutoML``` is a class for AutoML based on the task. It can be used as a Scikit-learn style estimator with the usual fit and predict methods.

To start an AutoML trial, users only need to provide the training data and the task type. With the integrated MLflow experiences in Fabric, users can also examine the different runs that were attempted in the trial to see how the final model was chosen.

## Training data

In Fabric, users can pass the following input types to the AutoML ```fit``` function:

- Numpy Array: When the input data is stored in a Numpy array, it is passed to ```fit()``` as X_train and y_train.
- Pandas dataframe: When the input data is stored in a Pandas dataframe, it is passed to ```fit()``` either as X_train and y_train, or as dataframe and label.
- Pandas on Spark dataframe: When the input data is stored as a Spark dataframe, it can be converted into a Pandas on Spark dataframe using ```to_pandas_on_spark()``` and then passed to ```fit()``` as a dataframe and label.

    ```python
    from flaml.automl.spark.utils import to_pandas_on_spark
    psdf = to_pandas_on_spark(sdf)
    automl.fit(dataframe=psdf, label='Bankrupt?', isUnbalance=True, **settings)
    ```

## Machine learning problem

Users can specify the machine learning task using the ```task``` argument. There are a variety of supported machine learning tasks, including:

- Classification: The main goal of classification models is to predict which categories new data will fall into based on learnings from its training data. Common classification examples include fraud detection, handwriting recognition, and object detection.
- Regression: Regression models predict numerical output values based on independent predictors. In regression, the objective is to help establish the relationship among those independent predictor variables by estimating how one variable impacts the others. For example, automobile price based on features like, gas mileage, safety rating, etc.
- Time Series Forecasting: This is used to predict future values based on historical data points that are ordered by time. In a time series, data is collected and recorded at regular intervals over a specific period, such as daily, weekly, monthly, or yearly. The objective of time series forecasting is to identify patterns, trends, and seasonality in the data and then use this information to make predictions about future value.

To learn more about the additional tasks supported in FLAML, you can visit the [documentation on AutoML tasks in FLAML.](https://microsoft.github.io/FLAML/docs/Use-Cases/Task-Oriented-AutoML#overview)

## Optional inputs

When creating an AutoML trial, users can provide a variety of constraints and inputs to configure their trial.

### Constraints

When creating an AutoML trial, users can also configure constraints on the AutoML process, constructor arguments of potential estimators, types of models tried in AutoML, and even constraints on the metrics of the AutoML trial.

For example, the code below allows users to specify a metrics constraint on the AutoML trial.

```python
metric_constraints = [("train_loss", "<=", 0.1), ("val_loss", "<=", 0.1)]
automl.fit(X_train, y_train, max_iter=100, train_time_limit=1, metric_constraints=metric_constraints)
```

To learn more about these configurations, you can visit the [documentation on configurations in FLAML.](https://microsoft.github.io/FLAML/docs/Use-Cases/Task-Oriented-AutoML#constraint)

### Optimization metric

During training, the AutoML function will create a number of trials which will try different algorithms and parameters. The AutoML tool will iterate through ML algorithms and hyperparameters. In this process, each iteration will a model with a training score. The better the score for the metric you want to optimize for, the better the model is considered to "fit" your data. The optimization metric is specified via the ```metric``` argument. It can be either a string which refers to a built-in metric, or a user-defined function.

[AutoML optimization metrics](https://microsoft.github.io/FLAML/docs/Use-Cases/Task-Oriented-AutoML#optimization-metric)

### Parallel tuning

In some cases, you may want to expedite your AutoML trial by using Apache Spark to parallelize your training. For Spark clusters, by default, FLAML will launch one trial per executor. You can also customize the number of concurrent trials by using the ```n_concurrent_trials``` argument.

```python
automl.fit(X_train, y_train, n_concurrent_trials=4, use_spark=True)
```

To learn more about how to parallelize your AutoML trails, you can visit the [FLAML documentation for parallel Spark jobs](https://microsoft.github.io/FLAML/docs/Examples/Integrate%20-%20Spark#parallel-spark-jobs).

## Track with MLflow

You can also leverage the Fabric MLflow integration to capture the metrics, parameters, and metrics of the explored trails.

```python
import mlflow
mlflow.autolog()

with mlflow.start_run(nested=True):
    automl.fit(dataframe=pandas_df, label='Bankrupt?', mlflow_exp_name = "automl_spark_demo")

# You can also provide a run_name pre-fix for the child runs

automl_experiment = flaml.AutoML()
automl_settings = {
    "metric": "r2",
    "task": "regression",
    "use_spark": True,
    "mlflow_exp_name": "test_doc",
    "estimator_list": [
        "lgbm",
        "rf",
        "xgboost",
        "extra_tree",
        "xgb_limitdepth",
    ],  # catboost does not yet support mlflow autologging
}
with mlflow.start_run(run_name=f"automl_spark_trials"):
    automl_experiment.fit(X_train=train_x, y_train=train_y, **automl_settings)

```


### Supported models

AutoML in Fabric supports the following models:

| **Classification**                              | **Regression**                                               | **Time Series Forecasting**                |
| ------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| (PySpark) Gradient-Boosted Trees (GBT) Classifier | (PySpark) Accelerated Failure Time (AFT) Survival Regression | Arimax                                     |
| (PySpark) Linear SVM                              | (PySpark) Generalized Linear Regression                      | AutoARIMA                                  |
| (PySpark) Naive Bayes                             | (PySpark) Gradient-Boosted Trees (GBT) Regression            | Average                                    |
| (Synapse) LightGBM                                | (PySpark) Linear Regression                                  | CatBoost                                   |
| CatBoost                                          | (Synapse) LightGBM                                           | Decision Tree                              |
| Decision Tree                                     | CatBoost                                                     | ExponentialSmoothing                       |
| Extremely Randomized Trees                        | Decision Tree                                                | Extremely Randomized Trees                 |
| Gradient Boosting                                 | Elastic Net                                                  | ForecastTCN                                |
| K Nearest Neighbors                               | Extremely Randomized Trees                                   | Gradient Boosting                          |
| Light GBM                                         | Gradient Boosting                                            | Holt-Winters Exponential Smoothing         |
| Linear SVC                                        | K Nearest Neighbors                                          | K Nearest Neighbors                        |
| Logistic Regression                               | LARS Lasso                                                   | LARS Lasso                                 |
| Logistic Regression with L1/L2 Regularization     | Light GBM                                                    | Light GBM                                  |
| Naive Bayes                                       | Logistic Regression with L1/L2 Regularization                | Naive                                      |
| Random Forest                                     | Random Forest                                                | Orbit                                      |
| Random Forest on Spark                            | Random Forest on Spark                                       | Prophet                                    |
| Stochastic Gradient Descent (SGD)                 | Stochastic Gradient Descent (SGD)                            | Random Forest                              |
| Support Vector Classification (SVC)               | XGBoost                                                      | SARIMAX                                    |
| XGboost                                           | XGBoost with Limited Depth                                   | SeasonalAverage                            |
| XGBoost with Limited Depth                        |                                                              | SeasonalNaive                              |
|                                                   |                                                              | Temporal Fusion Transformer                |
|                                                   |                                                              | XGBoost                                    |
|                                                   |                                                              | XGBoost for Time Series                    |
|                                                   |                                                              | XGBoost with Limited Depth for Time Series |
|                                                   |                                                              | ElasticNet                                 |

## Visualize results

The ```flaml.visualization``` module provides utility functions for plotting the optimization process using Plotly. By leveraging Plotly, users can interactively explore their AutoML experiment results. To use these plotting functions, simply provide your optimized ```flaml.AutoML``` or ```flaml.tune.tune.ExperimentAnalysis``` object as an input.

You can use the following functions within your notebook:

- ```plot_optimization_history```: Plot optimization history of all trials in the experiment.
- ```plot_feature_importance```: Plot importance for each feature in the dataset.
- ```plot_parallel_coordinate```: Plot the high-dimensional parameter relationships in the experiment.
- ```plot_contour```: Plot the parameter relationship as contour plot in the experiment.
- ```plot_edf```: Plot the objective value EDF (empirical distribution function) of the experiment.
- ```plot_timeline```: Plot the timeline of the experiment.
- ```plot_slice```: Plot the parameter relationship as slice plot in a study.
- ```plot_param_importance```: Plot the hyperparameter importance of the experiment.

## Next steps

- [Visualize AutoML results](./tuning-automated-machine-learning-visualizations.md)
