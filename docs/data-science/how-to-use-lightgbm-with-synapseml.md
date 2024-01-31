---
title: How to use LightGBM with SynapseML in Microsoft Fabric
description: Build LightGBM classification, regression, and ranking models with SynapseML in Microsoft Fabric.
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.reviewer: mopeakande
author: JessicaXYWang
ms.author: jessiwang
ms.date: 05/08/2023
---

# Use LightGBM models with SynapseML in Microsoft Fabric

The [LightGBM](https://github.com/Microsoft/LightGBM) framework specializes in creating high-quality and GPU-enabled decision tree algorithms for ranking, classification, and many other machine learning tasks. In this article, you'll use LightGBM to build classification, regression, and ranking models.

LightGBM is an open-source, distributed, high-performance gradient boosting (GBDT, GBRT, GBM, or
MART) framework. LightGBM is part of Microsoft's
[DMTK](https://github.com/microsoft/dmtk) project. You can use LightGBM by using LightGBMClassifier, LightGBMRegressor, and LightGBMRanker. LightGBM comes with the advantages of being incorporated into existing SparkML pipelines and used for batch, streaming, and serving workloads. It also offers a wide array of tunable parameters, that one can use to customize their decision tree system. LightGBM on Spark also supports new types of problems such as quantile regression.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

* Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
* Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks).
* Attach your notebook to a lakehouse. On the left side of your notebook, select **Add** to add an existing lakehouse or create a new one.

## Use `LightGBMClassifier` to train a classification model

In this section, you'll use LightGBM to build a classification model for predicting bankruptcy.

1. Read the dataset.

    ```python
    from pyspark.sql import SparkSession
    
    # Bootstrap Spark Session
    spark = SparkSession.builder.getOrCreate()
    
    from synapse.ml.core.platform import *
    ```

    ```python
    df = (
        spark.read.format("csv")
        .option("header", True)
        .option("inferSchema", True)
        .load(
            "wasbs://publicwasb@mmlspark.blob.core.windows.net/company_bankruptcy_prediction_data.csv"
        )
    )
    # print dataset size
    print("records read: " + str(df.count()))
    print("Schema: ")
    df.printSchema()
    ```

    ```python
    display(df)
    ```

1. Split the dataset into train and test sets.

    ```python
    train, test = df.randomSplit([0.85, 0.15], seed=1)
    ```

1. Add a featurizer to convert features into vectors.

    ```python
    from pyspark.ml.feature import VectorAssembler
    
    feature_cols = df.columns[1:]
    featurizer = VectorAssembler(inputCols=feature_cols, outputCol="features")
    train_data = featurizer.transform(train)["Bankrupt?", "features"]
    test_data = featurizer.transform(test)["Bankrupt?", "features"]
    ```

1. Check if the data is unbalanced.

    ```python
    display(train_data.groupBy("Bankrupt?").count())
    ```

1. Train the model using `LightGBMClassifier`.

    ```python
    from synapse.ml.lightgbm import LightGBMClassifier
    
    model = LightGBMClassifier(
        objective="binary", featuresCol="features", labelCol="Bankrupt?", isUnbalance=True
    )
    ```

    ```python
    model = model.fit(train_data)
    ```

1. Visualize feature importance

    ```python
    import pandas as pd
    import matplotlib.pyplot as plt
    
    feature_importances = model.getFeatureImportances()
    fi = pd.Series(feature_importances, index=feature_cols)
    fi = fi.sort_values(ascending=True)
    f_index = fi.index
    f_values = fi.values
    
    # print feature importances
    print("f_index:", f_index)
    print("f_values:", f_values)
    
    # plot
    x_index = list(range(len(fi)))
    x_index = [x / len(fi) for x in x_index]
    plt.rcParams["figure.figsize"] = (20, 20)
    plt.barh(
        x_index, f_values, height=0.028, align="center", color="tan", tick_label=f_index
    )
    plt.xlabel("importances")
    plt.ylabel("features")
    plt.show()
    ```

1. Generate predictions with the model

    ```python
    predictions = model.transform(test_data)
    predictions.limit(10).toPandas()
    ```

    ```python
    from synapse.ml.train import ComputeModelStatistics
    
    metrics = ComputeModelStatistics(
        evaluationMetric="classification",
        labelCol="Bankrupt?",
        scoredLabelsCol="prediction",
    ).transform(predictions)
    display(metrics)
    ```

## Use `LightGBMRegressor` to train a quantile regression model

In this section, you'll use LightGBM to build a regression model for drug discovery.

1. Read the dataset.

    ```python
    triazines = spark.read.format("libsvm").load(
        "wasbs://publicwasb@mmlspark.blob.core.windows.net/triazines.scale.svmlight"
    )
    ```

    ```python
    # print some basic info
    print("records read: " + str(triazines.count()))
    print("Schema: ")
    triazines.printSchema()
    display(triazines.limit(10))
    ```

1. Split the dataset into train and test sets.

    ```python
    train, test = triazines.randomSplit([0.85, 0.15], seed=1)
    ```

1. Train the model using `LightGBMRegressor`.

    ```python
    from synapse.ml.lightgbm import LightGBMRegressor
    
    model = LightGBMRegressor(
        objective="quantile", alpha=0.2, learningRate=0.3, numLeaves=31
    ).fit(train)
    ```

    ```python
    print(model.getFeatureImportances())
    ```

1. Generate predictions with the model.

    ```python
    scoredData = model.transform(test)
    display(scoredData)
    ```

    ```python
    from synapse.ml.train import ComputeModelStatistics
    
    metrics = ComputeModelStatistics(
        evaluationMetric="regression", labelCol="label", scoresCol="prediction"
    ).transform(scoredData)
    display(metrics)
    ```

## Use `LightGBMRanker` to train a ranking model

In this section, you'll use LightGBM to build a ranking model.

1. Read the dataset.

    ```python
    df = spark.read.format("parquet").load(
        "wasbs://publicwasb@mmlspark.blob.core.windows.net/lightGBMRanker_train.parquet"
    )
    # print some basic info
    print("records read: " + str(df.count()))
    print("Schema: ")
    df.printSchema()
    display(df.limit(10))
    ```

1. Train the ranking model using `LightGBMRanker`.

    ```python
    from synapse.ml.lightgbm import LightGBMRanker
    
    features_col = "features"
    query_col = "query"
    label_col = "labels"
    lgbm_ranker = LightGBMRanker(
        labelCol=label_col,
        featuresCol=features_col,
        groupCol=query_col,
        predictionCol="preds",
        leafPredictionCol="leafPreds",
        featuresShapCol="importances",
        repartitionByGroupingColumn=True,
        numLeaves=32,
        numIterations=200,
        evalAt=[1, 3, 5],
        metric="ndcg",
    )
    ```

    ```python
    lgbm_ranker_model = lgbm_ranker.fit(df)
    ```

1. Generate predictions with the model.

    ```python
    dt = spark.read.format("parquet").load(
        "wasbs://publicwasb@mmlspark.blob.core.windows.net/lightGBMRanker_test.parquet"
    )
    predictions = lgbm_ranker_model.transform(dt)
    predictions.limit(10).toPandas()
    ```

## Related content

- [What is Azure AI services in Azure Synapse Analytics?](./ai-services/ai-services-in-synapseml-bring-your-own-key.md)
- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
- [How to use KNN model with SynapseML](conditional-k-nearest-neighbors-exploring-art.md)
