---
title: Train machine learning models with Apache Spark
description: Use Apache Spark in Fabric to train machine learning models
ms.reviewer: scottpolly
ms.author: midesa
author: midesa 
ms.topic: conceptual
ms.custom: build-2023, build-2023-dataai, build-2023-fabric
ms.date: 05/23/2023
---

# Train machine learning models



Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)] enables machine learning with big data, providing the ability to obtain valuable insight from large amounts of structured, unstructured, and fast-moving data. There are several options when training machine learning models using Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)]: Apache Spark MLlib, SynapseML, and various other open-source libraries.

## Apache SparkML and MLlib

Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)] provides a unified, open-source, parallel data processing framework supporting in-memory processing to boost big data analytics. The Spark processing engine is built for speed, ease of use, and sophisticated analytics. Spark's in-memory distributed computation capabilities make it a good choice for the iterative algorithms used in machine learning and graph computations.

There are two scalable machine learning libraries that bring algorithmic modeling capabilities to this distributed environment: MLlib and SparkML. MLlib contains the original API built on top of RDDs. SparkML is a newer package that provides a higher-level API built on top of DataFrames for constructing ML pipelines. SparkML doesn't yet support all of the features of MLlib, but is replacing MLlib as Spark's standard machine learning library.

> [!NOTE]
> You can learn more about creating a SparkML model in the article [Train models with Apache Spark MLlib](./fabric-sparkml-tutorial.md).

## Popular libraries

The [!INCLUDE [product-name](../includes/product-name.md)] runtime for Apache Spark includes several popular, open-source packages for training machine learning models. These libraries provide reusable code that you may want to include in your programs or projects. Some of the relevant machine learning libraries that are included by default include:

- [Scikit-learn](https://scikit-learn.org/stable/index.html) is one of the most popular single-node machine learning libraries for classical ML algorithms. Scikit-learn supports most of the supervised and unsupervised learning algorithms and can also be used for data-mining and data-analysis.
  
- [XGBoost](https://xgboost.readthedocs.io/en/latest/) is a popular machine learning library that contains optimized algorithms for training decision trees and random forests.
  
- [PyTorch](https://pytorch.org/) & [Tensorflow](https://www.tensorflow.org/) are powerful Python deep learning libraries. You can use these libraries to build single-machine models by setting the number of executors on your pool to zero. Even though Apache Spark is not functional under this configuration, it is a simple and cost-effective way to create single-machine models.

## SynapseML

 [SynapseML](https://microsoft.github.io/SynapseML/) (previously known as MMLSpark), is an open-source library that simplifies the creation of massively scalable machine learning (ML) pipelines. This library is designed to make data scientists more productive on Spark, increase the rate of experimentation, and leverage cutting-edge machine learning techniques, including deep learning, on large datasets.

SynapseML provides a layer on top of SparkML's low-level APIs when building scalable ML models, such as indexing strings, coercing data into a layout expected by machine learning algorithms, and assembling feature vectors. The SynapseML library simplifies these and other common tasks for building models in PySpark.

## Related content

This article provides an overview of the various options to train machine learning models within Apache Spark in [!INCLUDE [product-name](../includes/product-name.md)]. You can learn more about model training by following the tutorial below:

- Use AI samples to build machine learning models: [Use AI samples](use-ai-samples.md)
- Track machine learning runs using Experiments: [Machine learning experiments](machine-learning-experiment.md)
