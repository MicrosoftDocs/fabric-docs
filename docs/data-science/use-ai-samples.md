---
title: How to use the end-to-end AI samples
description: Understand the various capabilities the DS experience has to offer and examples of how ML models can address your common business problems.
ms.reviewer: lagayhar
ms.author: amjafari
author: amhjf
ms.topic: how-to
ms.custom: build-2023, build-2023-dataai, build-2023-fabric
ms.date: 05/23/2023
---

# How-to use end-to-end AI samples in Microsoft Fabric

In providing the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] SaaS experience we want to enable ML professionals to easily and frictionlessly build, deploy, and operationalize their machine learning models, in a single analytics platform, while collaborating with other key roles. Begin here to understand the various capabilities the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] experience offers and explore examples of how ML models can address your common business problems.



## Install Python libraries

Some of the end-to-end AI samples require use of additional libraries when developing machine learning models or doing ad-hoc data analysis. You can quickly install these libraries for your Apache Spark session in one of two ways:

- Use the in-line installation capabilities (such as `%pip` or `%conda`) in your notebook
- Install libraries directly in your [current workspace](../get-started/workspaces.md#current-workspace)

#### Install with in-line installation capabilities

You can use the in-line installation capabilities (for example, `%pip` or `%conda`) within your notebook to install new libraries. This installation option would install the libraries only in the current notebook and not in the workspace.

To install a library, use the following code, replacing `<library name>` with the name of your desired library, such as `imblearn`, `wordcloud`, etc.

```python
# Use pip to install libraries
%pip install <library name>

# Use conda to install libraries
%conda install <library name>
```

For more information on in-line installation capabilities, see [In-line installation](python-guide/python-library-management.md#in-line-installation).

#### Install directly in your workspace

Alternatively, you can install libraries in your workspace so that they're available for use in any notebooks that are in the workspace.

   > [!IMPORTANT]
   > Only your Workspace admin has access to update the Workspace-level settings.

For more information on installing libraries in your workspace, see [Install workspace libraries](python-guide/python-library-management.md#install-workspace-libraries).

## Bank customer churn

Build a model to predict whether bank customers would churn or not. The churn rate, also known as the rate of attrition refers to the rate at which bank customers stop doing business with the bank.

Follow along in the [Customer churn prediction](customer-churn.md) tutorial.

## Recommender

An online bookstore is looking to increase sales by providing customized recommendations. Using customer book rating data in this sample you'll see how to clean, explore the data leading to developing and deploying a recommendation to provide predictions.

Follow along in the [Train a retail recommendation model](retail-recommend-model.md) tutorial.

## Fraud detection

As unauthorized transactions increase, detecting credit card fraud in real time will support financial institutions to provide their customers faster turnaround time on resolution. This end to end sample will include preprocessing, training, model storage and inferencing. The training section will review implementing multiple models and methods that address challenges like imbalanced examples and trade-offs between false positives and false negatives.

Follow along in the [Fraud detection](fraud-detection.md) tutorial.

## Forecasting

Using historical New York City Property Sales data and Facebook Prophet in this sample, we'll build a time series model with the trend, seasonality and holiday information to forecast what sales will look like in future cycles.

Follow along in the [Forecasting](time-series-forecasting.md) tutorial.

## Text classification

In this sample, we'll predict whether a book in the British Library is fiction or non-fiction based on book metadata. This will be accomplished by applying text classification with word2vec and linear-regression model on Spark.

Follow along in the [Text classification](title-genre-classification.md) tutorial.

## Uplift model

In this sample, we'll estimate the causal impact of certain treatments on an individual's behavior by using an Uplift model. We'll walk through step by step how to create, train and evaluate the model touching on four core learnings:

- Data-processing module: extracts features, treatments, and labels.
- Training module: targets to predict the difference between an individual's behavior when there's a treatment and when there's no treatment, using a classical machine learning model like lightGBM.
- Prediction module: calls the uplift model to predict on test data.
- Evaluation module: evaluates the effect of the uplift model on test data.

Follow along in the [Healthcare causal impact of treatments](uplift-modeling.md) tutorial.

## Predictive maintenance

In this tutorial, you proactively predict mechanical failures. This is accomplished by training multiple models on historical data such as temperature and rotational speed, then determining which model is the best fit for predicting future failures.

Follow along in the [Predictive maintenance](predictive-maintenance.md) tutorial.


## Next steps

- [How to use Microsoft Fabric notebooks](../data-engineering/how-to-use-notebook.md)
- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
