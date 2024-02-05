---
title: Machine learning experiment
description: Learn how to create machine learning experiments, use the MLflow API, manage and compare runs, and save a run as a model.
ms.reviewer: mopeakande
ms.author: midesa
author: midesa
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: Create New Experiment, Run Comparison
---

# Machine learning experiments in Microsoft Fabric

A machine learning *experiment* is the primary unit of organization and control for all related machine learning runs. A *run* corresponds to a single execution of model code. In [MLflow](https://mlflow.org/), tracking is based on experiments and runs.



Machine learning experiments allow data scientists to log parameters, code versions, metrics, and output files when running their machine learning code. Experiments also let you visualize, search for, and compare runs, as well as download run files and metadata for analysis in other tools.

In this article, you learn more about how data scientists can interact with and use machine learning experiments to organize their development process and to track multiple runs.

## Prerequisites

- A Power BI Premium subscription. If you don't have one, see [How to purchase Power BI Premium](/power-bi/enterprise/service-admin-premium-purchase).
- A Power BI Workspace with assigned premium capacity.

## Create an experiment

You can create a machine learning experiment directly from the Data science home page in the Power BI user interface (UI) or by writing code that uses the MLflow API.

### Create an experiment using the UI

To create a machine learning experiment from the UI:

1. Create a new data science workspace or select an existing one.
1. Select **Experiment** from the "New" section.
1. Provide an experiment name and select **Create**. This action creates an empty experiment within your workspace.

   :::image type="content" source="media/machine-learning-experiment/new-menu-experiment-option.png" alt-text="Screenshot showing where to select Experiment in the New menu." lightbox="media/machine-learning-experiment/new-menu-experiment-option.png":::

After creating the experiment, you can start adding runs to track run metrics and parameters.

### Create an experiment using the MLflow API

You can also create a machine learning experiment directly from your authoring experience using the `mlflow.create_experiment()` or `mlflow.set_experiment()` APIs. In the following code, replace `<EXPERIMENT_NAME>` with your experiment's name.

```python
import mlflow
 
# This will create a new experiment with the provided name.
mlflow.create_experiment("<EXPERIMENT_NAME>")

# This will set the given experiment as the active experiment. 
# If an experiment with this name does not exist, a new experiment with this name is created.
mlflow.set_experiment("<EXPERIMENT_NAME>")
```

## Manage runs within an experiment

A machine learning experiment contains a collection of runs for simplified tracking and comparison. Within an experiment, a data scientist can navigate across various runs and explore the underlying parameters and metrics. Data scientists can also compare runs within a machine learning experiment to identify which subset of parameters yield a desired model performance.

### Track runs

A machine learning run corresponds to a single execution of model code.

:::image type="content" source="media/machine-learning-experiment/ml-run-detail-screen.png" alt-text="Screenshot of machine learning run detail page." lightbox="media/machine-learning-experiment/ml-run-detail-screen.png":::

Each run includes the following information:

- **Source**: Name of the notebook that created the run.
- **Registered Version**: Indicates if the run was saved as a machine learning model.
- **Start date**: Start time of the run.
- **Status**: Progress of the run.
- **Hyperparameters**: Hyperparameters saved as key-value pairs. Both keys and values are strings.
- **Metrics**: Run metrics saved as key-value pairs. The value is numeric.
- **Output files**: Output files in any format. For example, you can record images, environment, models, and data files.

### View recent runs

You can also view recent runs for an experiment directly from the workspace list view. This view allows you to keep track of recent activity, quickly jump to the related Spark application, and apply filters based on the run status.

:::image type="content" source="media/machine-learning-experiment/view-recent-runs.png" alt-text="Screenshot of machine learning recent runs and Spark application view." lightbox="media/machine-learning-experiment/view-recent-runs.png":::

## Compare and filter runs

To compare and evaluate the quality of your machine learning runs, you can compare the parameters, metrics, and metadata between selected runs within an experiment.

### Visually compare runs

You can visually compare and filter runs within an existing experiment. Visual comparison allows you to easily navigate between multiple runs and sort across them.

:::image type="content" source="media/machine-learning-experiment/ml-runs-compare-list.png" alt-text="Screenshot showing a list of runs and the chart view." lightbox="media/machine-learning-experiment/ml-runs-compare-list.png":::

To compare runs:

1. Select an existing machine learning experiment that contains multiple runs.
1. Select the **View** tab and then go to the **Run list** view. Alternatively, you could select the option to **View run list** directly from the **Run details** view.
1. Customize the columns within the table by expanding the **Customize columns** pane. Here, you can select the properties, metrics, and hyperparameters that you would like to see.
1. Expand the **Filter** pane to narrow your results based on certain selected criteria.
1. Select multiple runs to compare their results in the metrics comparison pane. From this pane, you can customize the charts by changing the chart title, visualization type, X-axis, Y-axis, and more.

### Compare runs using the MLflow API

Data scientists can also use MLflow to query and search among runs within an experiment. You can explore more MLflow APIs for searching, filtering, and comparing runs by visiting the [MLflow documentation](https://www.mlflow.org/docs/latest/python_api/mlflow.html).

#### Get all runs

You can use the MLflow search API `mlflow.search_runs()` to get all runs in an experiment by replacing `<EXPERIMENT_NAME>` with your experiment name or `<EXPERIMENT_ID>` with your experiment ID in the following code:

```python
import mlflow

# Get runs by experiment name: 
mlflow.search_runs(experiment_names=["<EXPERIMENT_NAME>"])

# Get runs by experiment ID:
mlflow.search_runs(experiment_ids=["<EXPERIMENT_ID>"])
```

> [!TIP]
> You can search across multiple experiments by providing a list of experiment IDs to the `experiment_ids` parameter. Similarly, providing a list of experiment names to the `experiment_names` parameter will allow MLflow to search across multiple experiments. This can be useful if you want to compare across runs within different experiments.

#### Order and limit runs

Use the `max_results` parameter from `search_runs` to limit the number of runs returned. The `order_by` parameter allows you to list the columns to order by and can contain an optional `DESC` or `ASC` value. For instance, the following example returns the last run of an experiment.

```python
mlflow.search_runs(experiment_ids=[ "1234-5678-90AB-CDEFG" ], max_results=1, order_by=["start_time DESC"])
```

### Compare runs within a Fabric notebook

You can use the MLFlow authoring widget within Fabric notebooks to track MLflow runs generated within each notebook cell. The widget allows you to track your runs, associated metrics, parameters, and properties right down to the individual cell level.

To obtain a visual comparison, you can also switch to the **Run comparison** view. This view presents the data graphically, aiding in the quick identification of patterns or deviations across different runs.

:::image type="content" source="media/machine-learning-experiment/inline-authoring-mlflow.png" alt-text="Screenshot showing how to use the MLFlow authoring widget." lightbox="media/machine-learning-experiment/inline-authoring-mlflow.png":::

## Save run as a machine learning model

Once a run yields the desired result, you can save the run as a model for enhanced model tracking and for model deployment by selecting **Save as a ML model**.

:::image type="content" source="media/machine-learning-experiment/create-model-select-new.png" alt-text="Screenshot showing where to select Create a new model." lightbox="media/machine-learning-experiment/create-model-select-new.png":::

## Related content

- [Learn about MLflow Experiment APIs](https://www.mlflow.org/docs/latest/python_api/mlflow.html)
- [Track and manage machine learning models](machine-learning-model.md)
