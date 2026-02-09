---
title: Train machine learning models with Apache Spark
description: Use Apache Spark in Fabric to train machine learning models
ms.author: scottpolly
author: s-polly
ms.reviewer: midesa
reviewer: midesa
ms.topic: concept-article
ms.custom: 
ms.date: 09/25/2025
---

# Train machine learning models

Apache Spark—part of [!INCLUDE [product-name](../includes/product-name.md)]—enables machine learning at scale. Use it to gain insights from large volumes of structured, unstructured, and streaming data. Train models in [!INCLUDE [product-name](../includes/product-name.md)] with open-source libraries such as Apache Spark MLlib, SynapseML, and others.

## Apache SparkML and MLlib

Apache Spark—part of [!INCLUDE [product-name](../includes/product-name.md)]—is a unified, open-source, parallel data processing framework. It uses in-memory processing to speed big data analytics. Spark is built for speed, ease of use, and advanced analytics. Spark's in-memory, distributed computation suits iterative machine learning and graph algorithms.

The **MLlib** and **SparkML** scalable machine learning libraries bring algorithmic modeling capabilities to this distributed environment. MLlib provides the original RDD-based API. SparkML is a newer package that provides a higher-level DataFrame-based API for building ML pipelines. It provides a higher-level API built on top of DataFrames for construction of ML pipelines. SparkML doesn't yet support all MLlib features, but it's replacing MLlib as the standard Spark machine learning library.

> [!NOTE]
> Learn more in [Train models with Apache Spark MLlib](./fabric-sparkml-tutorial.md).

## Popular libraries

The [!INCLUDE [product-name](../includes/product-name.md)] runtime for Apache Spark includes several popular open source packages for training machine learning models. These libraries provide reusable code for your projects. The runtime includes these machine learning libraries:

- [Scikit-learn](https://scikit-learn.org/stable/index.html) - a popular single-node library for classical machine learning algorithms. It supports most supervised and unsupervised algorithms and handles data mining and data analysis.
  
- [XGBoost](https://xgboost.readthedocs.io/en/latest/) - a popular library with optimized algorithms for training decision trees and random forests.
  
- [PyTorch](https://pytorch.org/) and [Tensorflow](https://www.tensorflow.org/) are powerful Python deep learning libraries. With these libraries, you can set the number of executors on your pool to zero, to build single-machine models. Although that configuration doesn't support Apache Spark, it's a simple, cost-effective way to create single-machine models.

## SynapseML

The [SynapseML](https://microsoft.github.io/SynapseML/) open-source library (previously known as MMLSpark) helps you build scalable machine learning (ML) pipelines. It speeds experimentation and lets you apply advanced techniques, including deep learning, to large datasets.

SynapseML provides a layer above the SparkML low-level APIs when building scalable ML models. These APIs cover string indexing, feature vector assembly, coercion of data into layouts appropriate for machine learning algorithms, and more. The SynapseML library simplifies these and other common tasks for building models in PySpark.

## Related content

Explore options for training machine learning models in Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)]. For more information, see:

- Use AI samples to build machine learning models: [Use AI samples](use-ai-samples.md)
- Track machine learning runs using Experiments: [Machine learning experiments](machine-learning-experiment.md)
