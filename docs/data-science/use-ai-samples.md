---
title: Use the end-to-end AI samples
description: Understand the capabilities of the Synapse Data Science experience and examples of how machine learning models can address your common business problems.
ms.author: lagayhar
author: lgayhardt
ms.reviewer: amjafari
reviewer: amhjf
ms.topic: how-to
ms.custom: 
ms.date: 12/23/2025
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Use end-to-end AI samples in Microsoft Fabric

The [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] software as a service (SaaS) experience is part of [!INCLUDE [product-name](../includes/product-name.md)]. It can help machine learning professionals build, deploy, and operationalize their machine learning models. The [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] software operates in a single analytics platform, but collaborates with other key roles at the same time. This article describes the capabilities of the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] experience, and how machine learning models can address common business problems.

## Install Python libraries

Some of the end-to-end AI samples require other libraries for machine learning model development or ad hoc data analysis. You can choose one of these options to quickly install those libraries for your Apache Spark session.

### Install with inline installation capabilities

In your notebook, use the [Python inline installation capabilities](../data-engineering/library-management.md#python-in-line-installation) - for example, `%pip` or `%conda` - to install new libraries. This option installs the libraries only in the current notebook. It does not install the libraries in the workspace. Use the following code snippet to install a library. Replace `<library name>` with the name of your library: `imblearn` or `wordcloud`:

```python
# Use pip to install libraries
%pip install <library name>

# Use conda to install libraries
%conda install <library name>
```

### Set default libraries for the workspace

Use a [Fabric environment](../data-engineering/create-and-use-environment.md) to make your libraries available for use in a workspace notebook. You can create an environment, install the library in it, and your __workspace admin__ can attach the environment to the workspace as its default environment. For more information about setting default libraries of a workspace, visit the [Admin sets default libraries for the workspace](../data-engineering/library-management.md#scenario-1-admin-sets-default-libraries-for-the-workspace) resource.

> [!IMPORTANT]
> Library management at the workspace setting is no longer supported. Visit ["Migrate workspace libraries and Spark properties to a default environment"](../data-engineering/environment-workspace-migration.md) for more information about both migration of existing workspace libraries to an environment, and the selection of a default workspace environment.

## Follow tutorials to create machine learning models

These tutorials provide end-to-end samples for common scenarios.

### Customer churn

Build a model to predict the churn rate for bank customers. The churn rate - also called the rate of attrition - is the rate at which customers stop doing business with the bank.

Follow along in the [predicting customer churn](customer-churn.md) tutorial.

### Recommendations

An online bookstore wants to provide customized recommendations to increase sales. With customer book rating data, you can develop and deploy a recommendation model to make predictions.

Follow along in the [training a retail recommendation model](retail-recommend-model.md) tutorial.

### Fraud detection

As unauthorized transactions increase, real-time credit card fraud detection can help financial institutions resolve customer complaints more quickly. A fraud detection model includes preprocessing, training, model storage, and inferencing. The training stage reviews multiple models and methods that address specific challenges - for example, situations of imbalance, trade-offs between false positives and false negatives, etc.

Follow along in the [fraud detection](fraud-detection.md) tutorial.

### Forecasting

With both historical New York City property sales data and Facebook Prophet, build a time series model with trend and seasonality information, to forecast sales in future cycles.

Follow along in the [time series forecasting](time-series-forecasting.md) tutorial.

### Text classification

Based on book metadata, apply text classification with Word2vec and a linear regression model to predict, in Spark, whether or not a British Library book is fiction or nonfiction.

Follow along in the [text classification](title-genre-classification.md) tutorial.

### Uplift model

Use an uplift model to estimate the causal impact of certain medical treatments on the behavior of an individual. Touch on four core areas in these modules:

- Data-processing module: extracts features, treatments, and labels
- Training module: predict the difference in the behavior of an individual when treated and when not treated, with a classical machine learning model - for example, LightGBM
- Prediction module: calls the uplift model for predictions on test data
- Evaluation module: evaluates the effect of the uplift model on test data

Follow along in the [causal impact of medical treatments](uplift-modeling.md) tutorial.

### Predictive maintenance

Train multiple models on historical data, to predict mechanical failures - for example, failures involving process temperature or tool rotational speed. Then, determine which model serves as the best fit to predict future failures.

Follow along in the [predictive maintenance](predictive-maintenance.md) tutorial.

### Sales forecast

Predict future sales for superstore product categories. Train a model on historical data to do so.

Follow along in the [sales forecasting](sales-forecasting.md) tutorial.

## Related content

- [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
