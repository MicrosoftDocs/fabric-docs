---
title: Machine learning model
description: Learn about creating models and managing versions; review examples of MLflow.
ms.reviewer: msakande
ms.author: negust
author: NelGson
ms.topic: conceptual
ms.date: 02/10/2023
---

# Machine learning model

A machine learning model is a file that has been trained to recognize certain types of patterns. You train a model over a set of data, providing it an algorithm that it can use to reason over and learn from those data. Once you've trained the model, you can use it to reason over data that it hasn't seen before, and make predictions about that data.

In [MLFlow](https://mlflow.org/), a machine learning model can include multiple model versions. Here, each version can represent an iteration of the model. In this article, you'll learn how to interact with machine learning models to track and compare versions of a model.

## Create a model

In MLFlow, machine learning models include a standard packaging format. This format allows models to be used in various downstream tools, including batch inferencing on Apache Spark. The format defines a convention that lets you save a model in different “flavors” that can be understood by different downstream tools.

A machine learning model can be created directly from the user experience or from code using the MLFlow API.

To create a machine learning model from the user experience, you can:

1. Create a new or select an existing data science workspace.
1. From the **+ New** dropdown, select **Model**. This will create an empty model within your data science workspace.

   :::image type="content" source="media/machine-learning-model/new-drop-down-menu.png" alt-text="Screenshot showing the New drop-down menu." lightbox="media/machine-learning-model/new-drop-down-menu.png":::

3. Once the model is created, you can start adding model versions to track run metrics and parameters. This can be done by registering or saving experiment runs to an existing model.

You can also create a machine learning experiment directly from your authoring experience using the `mlflow.register_model()` API. If a registered model with the given name doesn't exist, it will be created automatically.

```python
import mlflow

model_uri = "runs:/{}/model-uri-name".format(run.info.run_id)
mv = mlflow.register_model(model_uri, "model-name")

print("Name: {}".format(mv.name))
print("Version: {}".format(mv.version))
```

## Manage versions within a model

A machine learning model contains a collection of model versions for simplified tracking and comparison. Within a model, a data scientist can navigate across various model versions to explore the underlying parameters and metrics. Data scientists can also compare across model versions to identify if newer models yield better results.

### Track models

A machine learning model version represents an individual model that has been registered for tracking.

:::image type="content" source="media/machine-learning-model/ml-model-version-tracking.png" alt-text="Screenshot showing the details screen of a model." lightbox="media/machine-learning-model/ml-model-version-tracking.png":::

Each model version includes the following information:

- **Time Created**: Date and time when the model was created.
- **Run Name**: Identifier for the experiment run that was used to create this model version.
- **Hyperparameters**: Hyperparameters are saved as key-value pairs. Both keys and values are strings.
- **Metrics**: Run metrics saved as key-value pairs. The value is numeric.
- **Model Schema/Signature**: A description of the model's inputs and outputs.
- **Logged files**: Logged files in any format. For example, you can record images, environment, models, and data files.

### Compare and filter models

To compare and evaluate the quality of your machine learning model versions, you can compare the parameters, metrics, and metadata between selected versions.

#### Visually compare models

You can visually compare runs within an existing model. This allows you to easily navigate between and sort across multiple versions.

:::image type="content" source="media/machine-learning-model/visual-compare-model-runs.png" alt-text="Screenshot showing a list of runs for comparison." lightbox="media/machine-learning-model/visual-compare-model-runs.png":::

To compare runs, you can:

1. Select an existing machine learning model that contains multiple versions.
1. Select the **View** tab and then navigate to the **Model list** view. You can also select the option to **View model list** directly from the details view.
1. You can customize the columns within the table by expanding the **Customize columns** pane. From here, you can select the properties, metrics, and hyperparameters that you would like to see.
1. Last, you can select multiple versions to compare their results in the metrics comparison pane. From this pane, you can customize the charts by changing the chart title, visualization type, X-axis, Y-axis, and more.

#### Compare models using the MLFlow API

Data scientists can also use MLflow to search among multiple models that have been saved within the workspace. You can explore additional MLFlow APIs for interacting with models by visiting the [MLflow documentation](https://www.mlflow.org/docs/latest/python_api/mlflow.html).

```Python
from pprint import pprint

client = MlflowClient()
for rm in client.list_registered_models():
    pprint(dict(rm), indent=4)
```

## Apply the model

Once a model has been trained on a data set, it can be applied to data it has never seen to generate predictions. The process of putting a model to use in this way is called scoring or inferencing. For more on how to score models in [!INCLUDE [product-name](../includes/product-name.md)], see the following section.

## Next steps

- [Learn about MLFlow Experiment APIs](https://www.mlflow.org/docs/latest/python_api/mlflow.html)
