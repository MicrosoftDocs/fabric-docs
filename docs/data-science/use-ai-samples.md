---
title: How to use the end-to-end AI samples
description: Understand the various capabilities the DS experience has to offer and examples of how ML models can address your common business problems.
ms.reviewer: lagayhar
ms.author: narsam
author: narmeens
ms.topic: how-to
ms.date: 05/23/2023
---

# How-to use end-to-end AI samples in Microsoft Fabric

In providing the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] SaaS experience we want to enable ML professionals to easily and frictionlessly build, deploy and operationalize their machine learning models, in a single analytics platform, while collaborating with other key roles. Begin here to understand the various capabilities the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] experience has to offer and examples of how ML models can address your common business problems.

[!INCLUDE [preview-note](../includes/preview-note.md)]

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
