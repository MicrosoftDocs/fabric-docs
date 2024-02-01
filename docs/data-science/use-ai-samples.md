---
title: Use the end-to-end AI samples
description: Understand the capabilities of the Synapse Data Science experience and examples of how machine learning models can address your common business problems.
ms.reviewer: lagayhar
ms.author: amjafari
author: amhjf
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 01/22/2024
---

# Use end-to-end AI samples in Microsoft Fabric

The [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] software as a service (SaaS) experience in [!INCLUDE [product-name](../includes/product-name.md)] can help machine learning professionals build, deploy, and operationalize their machine learning models in a single analytics platform, while collaborating with other key roles. This article describes both the capabilities of the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] experience, and how machine learning models can address common business problems.

## Install Python libraries

Some of the end-to-end AI samples require other libraries for machine learning model development or ad hoc data analysis. You can choose one of these options to quickly install those libraries for your Apache Spark session.

### Install with inline installation capabilities

Use the [Python inline installation capabilities](../data-engineering/library-management.md#python-in-line-installation)- for example, `%pip` or `%conda` - in your notebook, to install new libraries. This option installs the libraries only in the current notebook, and not in the workspace. Use this code to install a library. Replace `<library name>` with the name of your library: `imblearn` or `wordcloud`.

```python
# Use pip to install libraries
%pip install <library name>

# Use conda to install libraries
%conda install <library name>
```

### Set default libraries for the workspace

To make your libraries available for use in any notebooks in the workspace, your __workspace admin__ can create a Fabric environment, install the library in it, and then attach the environment as the workspace default environment. For more information on setting an environment as the workspace default, see [Admin sets default libraries for the workspace](../data-engineering/library-management.md#scenario-1-admin-sets-default-libraries-for-the-workspace).

> [!IMPORTANT]
> Library management at the workspace setting is no longer supported. You can follow ["Migrate workspace libraries and Spark properties to a default environment"](../data-engineering/environment-workspace-migration.md) to migrate existing workspace libraries to an environment and attach it as the workspace default.

## Follow tutorials to create machine learning models

These tutorials provide end-to-end samples for common scenarios.

### Customer churn

Build a model to predict the churn rate for bank customers. The churn rate, also called the rate of attrition, is the rate at which customers stop doing business with the bank.

Follow along in the [predicting customer churn](customer-churn.md) tutorial.

### Recommendations

An online bookstore wants to provide customized recommendations to increase sales. With customer book rating data, you can develop and deploy a recommendation model to make predictions.

Follow along in the [training a retail recommendation model](retail-recommend-model.md) tutorial.

### Fraud detection

As unauthorized transactions increase, real-time credit card fraud detection can help financial institutions provide customers faster turnaround time on resolution. A fraud detection model includes preprocessing, training, model storage, and inferencing. The training part reviews multiple models and methods that address challenges like imbalanced examples and trade-offs between false positives and false negatives.

Follow along in the [fraud detection](fraud-detection.md) tutorial.

### Forecasting

With historical New York City property sales data, and Facebook Prophet, build a time series model with trend and seasonality information to forecast what sales in future cycles.

Follow along in the [time series forecasting](time-series-forecasting.md) tutorial.

### Text classification

Apply text classification with word2vec and a linear regression model in Spark, to predict whether or not a book in the British Library is fiction or nonfiction, based on book metadata.

Follow along in the [text classification](title-genre-classification.md) tutorial.

### Uplift model

Estimate the causal impact of certain medical treatments on an individual's behavior, with an uplift model. Touch on four core areas in these modules:

- Data-processing module: extracts features, treatments, and labels.
- Training module: predict the difference in an individual's behavior when treated and when not treated, with a classical machine learning model - for example, LightGBM.
- Prediction module: calls the uplift model for predictions on test data.
- Evaluation module: evaluates the effect of the uplift model on test data.

Follow along in the [causal impact of medical treatments](uplift-modeling.md) tutorial.

### Predictive maintenance

Train multiple models on historical data, to predict mechanical failures such as temperature and rotational speed. Then, determine which model is the best fit to predict future failures.

Follow along in the [predictive maintenance](predictive-maintenance.md) tutorial.

### Sales forecast

Predict future sales for superstore product categories. Train a model on historical data to do so.

Follow along in the [sales forecasting](sales-forecasting.md) tutorial.

## Related content

- [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)