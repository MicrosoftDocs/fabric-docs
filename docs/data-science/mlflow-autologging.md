---
title: Autologging in Synapse Data Science
description: Use autologging with MLflow to automatically capture machine learning metrics and parameters.
ms.reviewer: mopeakande
ms.author: midesa
author: midesa
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/28/2024
---

# Autologging in [!INCLUDE [product-name](../includes/product-name.md)]

This article describes autologging in [!INCLUDE [product-name](../includes/product-name.md)]. [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] includes autologging, which significantly reduces the amount of code required to automatically log the parameters, metrics, and items of a machine learning model during training.

Autologging extends [MLflow Tracking](https://mlflow.org/docs/latest/tracking.html#automatic-logging) capabilities and is deeply integrated into the [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] experience. By using autologging, developers and data scientists can easily track and compare the performance of different models and experiments without manual tracking.

## Configuration

Autologging works by automatically capturing the input parameter, output metric, and output item values of a machine learning model as it's being trained. This information is logged to your [!INCLUDE [product-name](../includes/product-name.md)] workspace, where you can access and visualize it by using the MLflow APIs or the corresponding experiment and model items in your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

When you launch a [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] notebook, [!INCLUDE [product-name](../includes/product-name.md)] calls [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) to instantly enable tracking and load the corresponding dependencies. As you train models in your notebook, this model information is automatically tracked with MLflow.

This configuration is done automatically behind the scenes when you run `import mlflow`. The default configuration for the notebook [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) hook is:

```python

mlflow.autolog(
    log_input_examples=False,
    log_model_signatures=True,
    log_models=True,
    disable=False,
    exclusive=True,
    disable_for_unsupported_versions=True,
    silent=True
)

```

### Supported frameworks

Autologging supports a wide range of machine learning frameworks, including TensorFlow, PyTorch, Scikit-learn, and XGBoost. Autologging can capture various metrics, including accuracy, loss, F1 score, and custom metrics you define. To learn more about the framework-specific properties that autologging captures, see the [MLflow documentation](https://mlflow.org/docs/latest/tracking.html#automatic-logging).

## Customization

To customize logging behavior, use [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) configuration. This configuration provides parameters to enable model logging, collect input samples, configure warnings, or enable logging for user-specified content.

### Track more content

You can update the autologging configuration to track added metrics, parameters, files, and metadata in runs that MLflow creates. To update the configuration:

1. Update the [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) call to set `exclusive=False`.

    ```python
        mlflow.autolog(
        log_input_examples=False,
        log_model_signatures=True,
        log_models=True,
        disable=False,
        exclusive=False, # Update this property to enable custom logging
        disable_for_unsupported_versions=True,
        silent=True
    )
    ```

1. Use the MLflow tracking APIs to add [parameters](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.log_param) and [metrics](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.log_metric). The following example code logs your custom metrics and parameters while also letting you use autologging to capture more properties.

    ```python
    import mlflow
    mlflow.autolog(exclusive=False)

    with mlflow.start_run():
      mlflow.log_param("parameter name", "example value")
      # <add model training code here>
      mlflow.log_metric("metric name", 20)
    ```

## Disable [!INCLUDE [product-name](../includes/product-name.md)] autologging

You can disable [!INCLUDE [product-name](../includes/product-name.md)] autologging for a specific notebook session or across all notebooks by using the workspace setting.

> [!NOTE]
> If autologging is disabled, you must manually log your own [parameters](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.log_param) and [metrics](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.log_metric) by using the MLflow APIs.

### Disable autologging for a notebook session

To disable [!INCLUDE [product-name](../includes/product-name.md)] autologging in a notebook session, call [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) and set `disable=True`.

```python
import mlflow
mlflow.autolog(disable=True)
```

### Disable autologging for the workspace

Workspace administrators can enable or disable [!INCLUDE [product-name](../includes/product-name.md)] autologging for all sessions in their workspace.

To enable or disable [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] autologging:

1. In your [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] workspace, select **Workspace settings**.

   :::image type="content" source="./media/machine-learning-experiment/autologging-workspace-setting.png" alt-text="Screenshot of the Synapse Data Science page with Workspace settings highlighted." lightbox="./media/machine-learning-experiment/autologging-workspace-setting.png":::

1. On the **Workspace settings** screen, expand **Data Engineering/Science** at left and select **Spark settings**.

1. Under **Spark settings**, set **Customize compute configurations for items** to **On** or **Off**, and then select **Save**.

   :::image type="content" source="./media/machine-learning-experiment/autologging-setting-detail.png" alt-text="Screenshot of the Data Science workspace setting for autologging." lightbox="./media/machine-learning-experiment/autologging-setting-2.png":::

## Related content

- [Build a machine learning model with Apache Spark MLlib](fabric-sparkml-tutorial.md)
- [Machine learning experiments in Microsoft Fabric](./machine-learning-experiment.md)
