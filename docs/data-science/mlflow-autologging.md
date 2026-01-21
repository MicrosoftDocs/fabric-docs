---
title: Autologging in Synapse Data Science
description: Use autologging with MLflow to automatically capture machine learning metrics and parameters.
ms.author: scottpolly
author: s-polly
ms.reviewer: midesa
reviewer: midesa
ms.topic: concept-article
ms.custom: 
ms.date: 01/14/2025
---

# Autologging in [!INCLUDE [product-name](../includes/product-name.md)]

[!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] includes autologging, which significantly reduces the amount of code required to automatically log the parameters, metrics, and items of a machine learning model during training. This article describes autologging for [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

Autologging extends [MLflow Tracking](https://mlflow.org/docs/latest/tracking.html#automatic-logging) capabilities and is deeply integrated into the [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] experience. Autologging can capture various metrics, including accuracy, loss, F1 score, and custom metrics you define. By using autologging, developers and data scientists can easily track and compare the performance of different models and experiments without manual tracking.

## Supported frameworks

Autologging supports a wide range of machine learning frameworks, including TensorFlow, PyTorch, Scikit-learn, and XGBoost. To learn more about the framework-specific properties that autologging captures, see the [MLflow documentation](https://mlflow.org/docs/latest/tracking.html#automatic-logging).

## Configuration

Autologging works by automatically capturing values of input parameters, output metrics, and output items of a machine learning model as it's being trained. This information is logged to your [!INCLUDE [product-name](../includes/product-name.md)] workspace, where you can access and visualize it by using the MLflow APIs or the corresponding experiment and model items in your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

When you launch a [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] notebook, [!INCLUDE [product-name](../includes/product-name.md)] calls [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) to instantly enable tracking and load the corresponding dependencies. As you train models in your notebook, MLflow automatically tracks this model information.

The configuration happens automatically behind the scenes when you run `import mlflow`. The default configuration for the notebook [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) hook is:

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

## Customization

To customize logging behavior, you can use the [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) configuration. This configuration provides parameters to enable model logging, collect input samples, configure warnings, or enable logging for added content that you specify.

### Track more metrics, parameters, and properties

For runs created with MLflow, update the MLflow autologging configuration to track additional metrics, parameters, files, and metadata as follows:

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

1. Use the MLflow tracking APIs to log additional [parameters](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.log_param) and [metrics](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.log_metric). The following example code enables you to log your custom metrics and parameters alongside additional properties.

    ```python
    import mlflow
    mlflow.autolog(exclusive=False)

    with mlflow.start_run():
      mlflow.log_param("parameter name", "example value")
      # <add model training code here>
      mlflow.log_metric("metric name", 20)
    ```

### Disable [!INCLUDE [product-name](../includes/product-name.md)] autologging

You can disable [!INCLUDE [product-name](../includes/product-name.md)] autologging for a specific notebook session. You can also disable autologging across all notebooks by using the workspace setting.

>[!NOTE]
> If autologging is disabled, you must manually log your [parameters](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.log_param) and [metrics](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.log_metric) by using the MLflow APIs.

#### Disable autologging for a notebook session

To disable [!INCLUDE [product-name](../includes/product-name.md)] autologging for a specific notebook session, call [mlflow.autolog()](https://mlflow.org/docs/latest/python_api/mlflow.html#mlflow.autolog) and set `disable=True`.

```python
import mlflow
mlflow.autolog(disable=True)
```

#### Disable autologging for all notebooks and sessions

Workspace administrators can enable or disable [!INCLUDE [product-name](../includes/product-name.md)] autologging for all notebooks and sessions in their workspace by using the workspace settings. To enable or disable [!INCLUDE [product-name](../data-science/includes/fabric-ds-name.md)] autologging:

1. In your workspace, select **Workspace settings**.

   :::image type="content" source="./media/mlflow-autologging/autologging-workspace-setting.png" alt-text="Screenshot of workspace with Workspace settings highlighted." lightbox="./media/mlflow-autologging/autologging-workspace-setting.png":::

1. In *Workspace settings*, expand **Data Engineering/Science** on the left navigation bar and select **Spark settings**.
1. In *Spark settings*, select the **Automatic log** tab.
1. Set **Automatically track machine learning experiments and models** to **On** or **Off**.
1. Select **Save**.

   :::image type="content" source="./media/mlflow-autologging/autologging-setting-detail.png" alt-text="Screenshot of workspace setting for autologging." lightbox="./media/mlflow-autologging/autologging-setting-detail.png":::

## Related content

- [Build a machine learning model with Apache Spark MLlib](fabric-sparkml-tutorial.md)
- [Machine learning experiments in Microsoft Fabric](./machine-learning-experiment.md)
