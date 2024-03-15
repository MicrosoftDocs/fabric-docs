---
title: Hyperparameter tuning in Fabric
description: Identify the best combination of hyperparameters for your chosen classifiers (preview).
ms.topic: overview
ms.reviewer: ssalgado
author: midesa
ms.author: midesa
ms.date: 12/19/2023
---

# Hyperparameter tuning (preview)

Hyperparameter tuning is the process of finding the optimal values for the parameters that are not learned by the machine learning model during training, but rather set by the user before the training process begins. These parameters are commonly referred to as hyperparameters, and examples include the learning rate, the number of hidden layers in a neural network, the regularization strength, and the batch size.

The performance of a machine learning model can be highly sensitive to the choice of hyperparameters, and the optimal set of hyperparameters can vary greatly depending on the specific problem and dataset. Hyperparameter tuning is therefore a critical step in the machine learning pipeline, as it can have a significant impact on the model's accuracy and generalization performance.

In Fabric, data scientists can leverage ```FLAML```, a lightweight Python library for efficient automation of machine learning and AI operations, for their hyperparameter tuning requirements. Within Fabric notebooks, users can call ```flaml.tune``` for economical hyperparameter tuning.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Tuning workflow

There are three essential steps to use  ```flaml.tune``` to finish a basic tuning task:

1. Specify the tuning objective with respect to the hyperparameters.
1. Specify a search space of the hyperparameters.
1. Specify tuning constraints, including constraints on the resource budget to do the tuning, constraints on the configurations, or/and constraints on a (or multiple) particular metric(s).

### Tuning objective

The first step is to specify your tuning objective. To do this, you should first specify your evaluation procedure with respect to the hyperparameters in a user-defined function ```evaluation_function```. The function requires a hyperparameter configuration as input. It can simply return a metric value in a scalar or return a dictionary of metric name and metric value pairs.

In the example below, we can define an evaluation function with respect to 2 hyperparameters named ```x``` and ```y```.

```python
import time

def evaluate_config(config: dict):
    """evaluate a hyperparameter configuration"""
    score = (config["x"] - 85000) ** 2 - config["x"] / config["y"]


    faked_evaluation_cost = config["x"] / 100000
    time.sleep(faked_evaluation_cost)
    # we can return a single float as a score on the input config:
    # return score
    # or, we can return a dictionary that maps metric name to metric value:
    return {"score": score, "evaluation_cost": faked_evaluation_cost, "constraint_metric": config["x"] * config["y"]}
```

### Search space

Next, we will specify the search space of hyperparameters. In the search space, you need to specify valid values for your hyperparameters and how these values are sampled (e.g., from a uniform distribution or a log-uniform distribution). In the example below, we can provide the search space for the hyperparameters ```x``` and ```y```. The valid values for both are integers ranging from [1, 100,000]. These hyperparameters are sampled uniformly in the specified ranges.

```python
from flaml import tune

# construct a search space for the hyperparameters x and y.
config_search_space = {
    "x": tune.lograndint(lower=1, upper=100000),
    "y": tune.randint(lower=1, upper=100000)
}

# provide the search space to tune.run
tune.run(..., config=config_search_space, ...)
```

With FLAML, users can customize the domain for a particular hyperparameter. This allows users to specify a ***type*** and ***valid range*** to sample parameters from. FLAML supports the following hyperparameter types: float, integer, and categorical. You can see this example below for commonly used domains:

```python
config = {
    # Sample a float uniformly between -5.0 and -1.0
    "uniform": tune.uniform(-5, -1),

    # Sample a float uniformly between 3.2 and 5.4,
    # rounding to increments of 0.2
    "quniform": tune.quniform(3.2, 5.4, 0.2),

    # Sample a float uniformly between 0.0001 and 0.01, while
    # sampling in log space
    "loguniform": tune.loguniform(1e-4, 1e-2),

    # Sample a float uniformly between 0.0001 and 0.1, while
    # sampling in log space and rounding to increments of 0.00005
    "qloguniform": tune.qloguniform(1e-4, 1e-1, 5e-5),

    # Sample a random float from a normal distribution with
    # mean=10 and sd=2
    "randn": tune.randn(10, 2),

    # Sample a random float from a normal distribution with
    # mean=10 and sd=2, rounding to increments of 0.2
    "qrandn": tune.qrandn(10, 2, 0.2),

    # Sample a integer uniformly between -9 (inclusive) and 15 (exclusive)
    "randint": tune.randint(-9, 15),

    # Sample a random uniformly between -21 (inclusive) and 12 (inclusive (!))
    # rounding to increments of 3 (includes 12)
    "qrandint": tune.qrandint(-21, 12, 3),

    # Sample a integer uniformly between 1 (inclusive) and 10 (exclusive),
    # while sampling in log space
    "lograndint": tune.lograndint(1, 10),

    # Sample a integer uniformly between 2 (inclusive) and 10 (inclusive (!)),
    # while sampling in log space and rounding to increments of 2
    "qlograndint": tune.qlograndint(2, 10, 2),

    # Sample an option uniformly from the specified choices
    "choice": tune.choice(["a", "b", "c"]),
}

```

To learn more about how you can customize domains within your search space, visit [the FLAML documentation on customizing search spaces](https://microsoft.github.io/FLAML/docs/Use-Cases/Tune-User-Defined-Function#search-space).

### Tuning constraints

The last step is to specify constraints of the tuning task. One notable property of ```flaml.tune``` is that it is able to complete the tuning process within a required resource constraint. To do this, a user can provide resource constraints in terms of wall-clock time (in seconds) using the ```time_budget_s``` argument or in terms of the number of trials using the ```num_samples``` argument. 

```python
# Set a resource constraint of 60 seconds wall-clock time for the tuning.
flaml.tune.run(..., time_budget_s=60, ...)

# Set a resource constraint of 100 trials for the tuning.
flaml.tune.run(..., num_samples=100, ...)

# Use at most 60 seconds and at most 100 trials for the tuning.
flaml.tune.run(..., time_budget_s=60, num_samples=100, ...)
```

To learn more about addition configuration constraints, you can visit [the FLAML documentation for advanced tuning options](https://microsoft.github.io/FLAML/docs/Use-Cases/Tune-User-Defined-Function#advanced-tuning-options).

### Putting it together

Once we've defined our tuning criteria, we can execute the tuning trial. To track the results of our trial, we can leverage [MLFlow autologging](../data-science/mlflow-autologging.md) to capture the metrics and parameters for each of these runs. This code will capture the entire hyperparameter tuning trial, highlighting each of the hyperparameter combinations that were explored by FLAML.

```python
import mlflow
mlflow.set_experiment("flaml_tune_experiment")
mlflow.autolog(exclusive=False)

with mlflow.start_run(nested=True, run_name="Child Run: "):
    analysis = tune.run(
        evaluate_config,  # the function to evaluate a config
        config=config_search_space,  # the search space defined
        metric="score",
        mode="min",  # the optimization mode, "min" or "max"
        num_samples=-1,  # the maximal number of configs to try, -1 means infinite
        time_budget_s=10,  # the time budget in seconds
    )
```

> [!NOTE]
> When MLflow autologging is enabled, metrics, parameters and models should be logged automatically as MLFlow runs. However, this varies by the framework. Metrics and parameters for specific models may not be logged. For example, no metrics will be logged for XGBoost , LightGBM , Spark  and SynapseML models. You can learn more about what metrics and parameters are captured from each framework using the [MLFlow autologging documentation](https://mlflow.org/docs/2.7.1/tracking.html#automatic-logging).

## Parallel tuning with Apache Spark

The ```flaml.tune``` functionality supports tuning both Apache Spark and single-node learners. In addition, when tuning single-node learners (e.g. Scikit-Learn learners), you can also parallelize the tuning to speed up your tuning process by setting ```use_spark = True```. For Spark clusters, by default, FLAML will launch one trial per executor. You can also customize the number of concurrent trials by using the ```n_concurrent_trials``` argument.

```python

analysis = tune.run(
    evaluate_config,  # the function to evaluate a config
    config=config_search_space,  # the search space defined
    metric="score",
    mode="min",  # the optimization mode, "min" or "max"
    num_samples=-1,  # the maximal number of configs to try, -1 means infinite
    time_budget_s=10,  # the time budget in seconds
    use_spark=True,
)
print(analysis.best_trial.last_result)  # the best trial's result
print(analysis.best_config)  # the best config
```

To learn more about how to parallelize your tuning trails, you can visit the [FLAML documentation for parallel Spark jobs](https://microsoft.github.io/FLAML/docs/Examples/Integrate%20-%20Spark#parallel-spark-jobs).

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

- [Tune a SynapseML Spark LightGBM model](./how-to-tune-lightgbm-flaml.md)
- [Visualize AutoML results](./tuning-automl-visualizations.md)