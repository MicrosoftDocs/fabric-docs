---
title: Train machine learning models with Apache Spark
description: Use Apache Spark in Fabric to train machine learning models
ms.author: scottpolly
author: s-polly
ms.reviewer: midesa
reviewer: midesa
ms.topic: conceptual
ms.custom: 
ms.date: 06/13/2024
---

# Train machine learning models

Apache Spark - a part of [!INCLUDE [product-name](../includes/product-name.md)] - enables machine learning with big data. With Apache Spark, you can build valuable insights into large masses of structured, unstructured, and fast-moving data. You have several available open-source library options when you train machine learning models with Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)]: Apache Spark MLlib, SynapseML, and others.

## Apache SparkML and MLlib

Apache Spark - a part of [!INCLUDE [product-name](../includes/product-name.md)] - provides a unified, open-source, parallel data processing framework. This framework supports in-memory processing that boosts big data analytics. The Spark processing engine is built for speed, ease of use, and sophisticated analytics. Spark's in-memory distributed computation capabilities make it a good choice for the iterative algorithms that machine learning and graph computations use.

The **MLlib** and **SparkML** scalable machine learning libraries bring algorithmic modeling capabilities to this distributed environment. MLlib contains the original API, built on top of RDDs. SparkML is a newer package. It provides a higher-level API built on top of DataFrames for construction of ML pipelines. SparkML doesn't yet support all of the features of MLlib, but is replacing MLlib as the standard Spark machine learning library.

> [!NOTE]
> For more information about SparkML model creation, visit the [Train models with Apache Spark MLlib](./fabric-sparkml-tutorial.md) resource.

## Popular libraries

The [!INCLUDE [product-name](../includes/product-name.md)] runtime for Apache Spark includes several popular, open-source packages for training machine learning models. These libraries provide reusable code that you can include in your programs or projects. The runtime includes these relevant machine learning libraries, and others:

- [Scikit-learn](https://scikit-learn.org/stable/index.html) - one of the most popular single-node machine learning libraries for classical ML algorithms. Scikit-learn supports most supervised and unsupervised learning algorithms, and can handle data-mining and data-analysis.
  
- [XGBoost](https://xgboost.readthedocs.io/en/latest/) - a popular machine learning library that contains optimized algorithms for training decision trees and random forests.
  
- [PyTorch](https://pytorch.org/) and [Tensorflow](https://www.tensorflow.org/) are powerful Python deep learning libraries. With these libraries, you can set the number of executors on your pool to zero, to build single-machine models. Although that configuration doesn't support Apache Spark, it's a simple, cost-effective way to create single-machine models.

## SynapseML

 The [SynapseML](https://microsoft.github.io/SynapseML/) open-source library (previously known as MMLSpark) simplifies the creation of massively scalable machine learning (ML) pipelines. With it, data scientist use of Spark becomes more productive because that library increases the rate of experimentation and applies cutting-edge machine learning techniques - including deep learning - on large datasets.

SynapseML provides a layer above the SparkML low-level APIs when building scalable ML models. These APIs cover string indexing, feature vector assembly, coercion of data into layouts appropriate for machine learning algorithms, and more. The SynapseML library simplifies these and other common tasks for building models in PySpark.

## Related content

This article provides an overview of the various options available to train machine learning models within Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)]. For more information about model training, visit these resources:

- Use AI samples to build machine learning models: [Use AI samples](use-ai-samples.md)
- Track machine learning runs using Experiments: [Machine learning experiments](machine-learning-experiment.md)
