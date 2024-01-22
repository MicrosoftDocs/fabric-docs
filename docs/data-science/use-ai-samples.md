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
ms.date: 05/23/2023
---

# Use end-to-end AI samples in Microsoft Fabric

The [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] software as a service (SaaS) experience in [!INCLUDE [product-name](../includes/product-name.md)] can help professionals in the field of machine learning to easily build, deploy, and operationalize their machine learning models in a single analytics platform, while collaborating with other key roles. Begin here to understand the capabilities that the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] experience offers and explore examples of how machine learning models can address your common business problems.

## Install Python libraries

Some of the end-to-end AI samples require additional libraries when you're developing machine learning models or doing ad hoc data analysis. You can use either of the following options to quickly install these libraries for your Apache Spark session.

### Install with inline installation capabilities

You can use the [inline installation capabilities](python-guide/python-library-management.md#in-line-installation) (for example, `%pip` or `%conda`) in your notebook to install new libraries. This option installs the libraries only in the current notebook and not in the workspace.

To install a library, use the following code. Replace `<library name>` with the name of your library, such as `imblearn` or `wordcloud`.

```python
# Use pip to install libraries
%pip install <library name>

# Use conda to install libraries
%conda install <library name>
```

### Install directly in your workspace

Alternatively, you can install libraries in your [current workspace](../get-started/workspaces.md#current-workspace) so that they're available for use in any notebooks that are in the workspace.

> [!IMPORTANT]
> Only your workspace admin has access to update the workspace-level settings.

For more information on installing libraries in your workspace, see [Install workspace libraries](python-guide/python-library-management.md#install-workspace-libraries).

## Follow tutorials to create machine learning models

The following tutorials provide end-to-end samples for common scenarios.

### Customer churn

Build a model to predict the churn rate for bank customers. The churn rate, also called the rate of attrition, is the rate at which customers stop doing business with the bank.

Follow along in the [tutorial for predicting customer churn](customer-churn.md).

### Recommendations

An online bookstore wants to increase sales by providing customized recommendations. By using customer book rating data, you can develop and deploy a recommendation model to provide predictions.

Follow along in the [tutorial for training a retail recommendation model](retail-recommend-model.md).

### Fraud detection

As unauthorized transactions increase, detecting credit card fraud in real time can help financial institutions to provide their customers faster turnaround time on resolution. Building a model for fraud detection includes preprocessing, training, model storage, and inferencing. The training part reviews multiple models and methods that address challenges like imbalanced examples and trade-offs between false positives and false negatives.

Follow along in the [tutorial for fraud detection](fraud-detection.md).

### Forecasting

By using historical New York City property sales data and Facebook Prophet, build a time series model with trend and seasonality information to forecast what sales will look like in future cycles.

Follow along in the [tutorial for time series forecasting](time-series-forecasting.md).

### Text classification

Apply text classification with word2vec and a linear regression model in Spark to predict whether a book in the British Library is fiction or nonfiction, based on book metadata.

Follow along in the [tutorial for text classification](title-genre-classification.md).

### Uplift model

Estimate the causal impact of certain medical treatments on an individual's behavior by using an uplift model. Touch on four core learnings in these modules:

- Data-processing module: extracts features, treatments, and labels.
- Training module: targets predicting the difference between an individual's behavior when there's a treatment and when there's no treatment, by using a classical machine learning model like LightGBM.
- Prediction module: calls the uplift model to predict on test data.
- Evaluation module: evaluates the effect of the uplift model on test data.

Follow along in the [tutorial for the causal impact of medical treatments](uplift-modeling.md).

### Predictive maintenance

Proactively predict mechanical failures by training multiple models on historical data, such as temperature and rotational speed. Then, determine which model is the best fit for predicting future failures.

Follow along in the [tutorial for predictive maintenance](predictive-maintenance.md).

### Sales forecast

Predict future sales for categories of products at a superstore. Accomplish this task by training a model on historical data.

Follow along in the [tutorial for sales forecasting](sales-forecasting.md).

## Related content

- [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
