---
title: Machine learning experiment
description: Learn how to create an experiment and track runs, and review examples of using mlflow.
ms.reviewer: mopeakande
ms.author: negust
author: nelgson
ms.topic: conceptual
ms.date: 02/10/2023
---

# Machine learning experiments in [!INCLUDE [product-name](../includes/product-name.md)]

> [!IMPORTANT]
> Project [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. See the [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/) for legal terms that apply to Azure features that are in beta, preview, or otherwise not yet released into general availability.

Machine learning experiments allow data scientists to log parameters, code versions, metrics, and output files when running their machine learning code. In [MLFlow](https://mlflow.org/), tracking is based on experiments and runs.

A machine learning experiment is the primary unit of organization and control for all related machine learning runs. Experiments let you visualize, search for, and compare runs, as well as download run files and metadata for analysis in other tools. A \*run* corresponds to a single execution of model code.

In this article, you will learn more about how data scientists can interact with and leverage machine learning experiments to organize their development process and to track multiple runs.

## Create an experiment

A machine learning experiment can be created directly from the user experience or from code using the MLFlow API.

To create a machine learning experiment from the user experience, you can:

1. Create a new or select an existing data science workspace.
1. From the **+ New** dropdown, select **Experiment**. This will create an empty **experiment** within your data science workspace.

:::image type="content" source="media/machine-learning-experiment/new-menu-experiment-option.png" alt-text="Screenshot showing where to select Experiment in the New menu." lightbox="media/machine-learning-experiment/new-menu-experiment-option.png":::

3. Once the experiment is created, you can start adding runs to track run metrics and parameters.

You can also create a machine learning experiment directly from your authoring experience using the `mlflow.create_experiment()` or `mlflow.set_experiment()` APIs.

```python
import mlflow
 
# This will create a new experiment with the provided name.
mlflow.create_experiment("experiment name")

# This will set given experiment as the active experiment. If an experiment with this name does not exist, a new experiment with this name is created.
mlflow.set_experiment("experiment name")
```

## Manage runs within an experiment

A machine learning experiment contains a collection of runs for simplified tracking and comparison. Within an experiment, a data scientist can navigate across various runs and explore the underlying parameters and metrics. Data scientists can also compare across runs within a machine learning experiment to identify which subset of parameters yield the desired model performance.

### Track runs

A machine learning run corresponds to a single execution of model code.

:::image type="content" source="media/machine-learning-experiment/ml-run-detail-screen.png" alt-text="Screenshot of machine learning run detail page." lightbox="media/machine-learning-experiment/ml-run-detail-screen.png":::

Each run includes the following information:

- **Source**: Name of the notebook that created the run.
- **Registered Version**: Indicates if the run was saved as a machine learning model.
- **Start date**: Start time of a run.
- **Status**: Progress of the run.
- **Hyperparameters**: Hyperparameters are saved as key-value pairs. Both keys and values are strings.
- **Metrics**: Run metrics saved as key-value pairs. The value is numeric.
- **Output files**: Output files in any format. For example, you can record images, environment, models, and data files.

## Compare and filter runs

To compare and evaluate the quality of your machine learning runs, you can compare the parameters, metrics, and metadata between selected runs within an experiment.

### Visually compare runs

You can visually compare and filter runs within an existing experiment. This allows you to easily navigate between and sort across multiple runs.

:::image type="content" source="media/machine-learning-experiment/ml-runs-compare-list.png" alt-text="Screenshot showing a list of runs." lightbox="media/machine-learning-experiment/ml-runs-compare-list.png":::

To compare runs, you can:

1. Select an existing machine learning experiment which contains multiple runs.
1. Select the **View** tab and then navigate to the **Run list** view. You can also select the option to **View run list** directly from the details view.
1. You can customize the columns within the table by expanding the **Customize columns** pane. From here, you can select the properties, metrics, and hyperparameters that you would like to see.
1. You can also expand the **Filter** pane to narrow your results based on the selected criteria.
1. Last, you can select multiple runs to compare their results in the metrics comparison pane. From this pane, you can customize the charts by changing the chart title, visualization type, X-axis, Y-axis, and more.

### Compare runs using the MLFlow API

Data scientists can also use MLflow to query and search among runs within an experiment. You can explore additional MLFlow APIs for searching, filtering, and comparing runs by visiting the [MLflow documentation](https://www.mlflow.org/docs/latest/python_api/mlflow.html).

#### Get all runs

```python
import mlflow

# By experiment name: 
mlflow.search_runs(experiment_names=[ "my_experiment"])

# By experiment ID:
mlflow.search_runs(experiment_ids=[ "1234-5678-90AB-CDEFG"])
```

> [!TIP]
> You can provide multiple `experiment_ids` to search across multiple experiments. This is useful if you want to compare across runs within different experiments.

#### Order runs

Use the `max_results` argument from `search_runs` to limit the number of runs returned. For instance, the following example returns the last run of the experiment.

```python
mlflow.search_runs(experiment_ids=[ "1234-5678-90AB-CDEFG" ], max_results=1, order_by=["start_time DESC"])
```

## Save run as a model

Once a run yields the desired result, you can save the run as a model for enhanced model tracking and for model deployment.

:::image type="content" source="media/machine-learning-experiment/create-model-select-new.png" alt-text="Screenshot showing where to select Create a new model." lightbox="media/machine-learning-experiment/create-model-select-new.png":::

## Next Steps

- [Learn about MLFlow Experiment APIs](https://www.mlflow.org/docs/latest/python_api/mlflow.html)
- Track and manage machine learning models
