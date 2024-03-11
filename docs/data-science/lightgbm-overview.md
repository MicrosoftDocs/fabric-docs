---
title: What is LightGBM in SynapseML?
description: Learn about LightGBM in SynapseML.
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.reviewer: mopeakande
author: JessicaXYWang
ms.author: jessiwang
ms.date: 05/08/2023
---
# What is LightGBM?

[LightGBM](https://github.com/Microsoft/LightGBM) is an open-source,
distributed, high-performance gradient boosting (GBDT, GBRT, GBM, or
MART) framework. This framework specializes in creating high-quality and
GPU-enabled decision tree algorithms for ranking, classification, and
many other machine learning tasks. LightGBM is part of Microsoft's
[DMTK](https://github.com/microsoft/dmtk) project.

### Advantages of LightGBM

-   **Composability**: LightGBM models can be incorporated into existing
    SparkML pipelines and used for batch, streaming, and serving
    workloads.
-   **Performance**: LightGBM on Spark is 10-30% faster than SparkML on
    the [Higgs dataset](https://archive.ics.uci.edu/dataset/280/higgs) and achieves a 15% increase in AUC.  [Parallel
    experiments](https://github.com/Microsoft/LightGBM/blob/master/docs/Experiments.rst#parallel-experiment)
    have verified that LightGBM can achieve a linear speed-up by using
    multiple machines for training in specific settings.
-   **Functionality**: LightGBM offers a wide array of [tunable
    parameters](https://github.com/Microsoft/LightGBM/blob/master/docs/Parameters.rst),
    that one can use to customize their decision tree system. LightGBM on
    Spark also supports new types of problems such as quantile regression.
-   **Cross platform**: LightGBM on Spark is available on Spark, PySpark, and SparklyR.

### LightGBM Usage

- **LightGBMClassifier**: used for building classification models. For example, to predict whether a company bankrupts or not, we could build a binary classification model with `LightGBMClassifier`.
- **LightGBMRegressor**: used for building regression models. For example, to predict housing price, we could build a regression model with `LightGBMRegressor`.
- **LightGBMRanker**: used for building ranking models. For example, to predict the relevance of website search results, we could build a ranking model with `LightGBMRanker`.


## Related content

- [How to use LightGBM models with SynapseML in Microsoft Fabric](how-to-use-lightgbm-with-synapseml.md)
- [How to use Azure AI services with SynapseML](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
- [How to use KNN model with SynapseML](conditional-k-nearest-neighbors-exploring-art.md)
