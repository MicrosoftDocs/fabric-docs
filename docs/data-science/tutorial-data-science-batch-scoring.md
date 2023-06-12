---
title: Data science tutorial - perform batch scoring and save predictions
description: In this fifth part of the tutorial series, learn how to import a trained and registered model and perform batch predictions on a test dataset.
ms.reviewer: sgilley
ms.author: narsam
author: narmeens
ms.topic: tutorial
ms.custom: build-2023
ms.date: 5/4/2023
---

# Part 5: Perform batch scoring and save predictions to a lakehouse

In this tutorial, you learn to import a trained and registered LightGBMRegressor model from the Microsoft Fabric MLflow model registry, and perform batch predictions on a test dataset loaded from a lakehouse.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* Complete [Part 1: Ingest data into a Microsoft Fabric lakehouse using Apache Spark](tutorial-data-science-ingest-data.md).  

* Optionally, complete [Part 2: Explore and visualize data using Microsoft Fabric notebooks](tutorial-data-science-explore-notebook.md) to learn more about the data.

* Complete [Part 3: Perform data cleansing and preparation using Apache Spark](tutorial-data-science-data-cleanse.md).

* Complete [Part 4: Train and register machine learning models](tutorial-data-science-train-models.md).

## Follow along in notebook

[05-perform-batch-scoring-and-save-predictions-to-lakehouse.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/05-perform-batch-scoring-and-save-predictions-to-lakehouse.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along](./includes/follow-along.md)]

## Perform batch scoring and save predictions

1. Read a random sample of cleansed data from lakehouse table ***nyctaxi_prep*** filtered for puYear=2016 and puMonth=3.

   ```python
   SEED = 1234 # Random seed
   input_df = spark.read.format("delta").load("Tables/nyctaxi_prep")\
               .filter("puYear = 2016 AND puMonth = 3")\
               .sample(True, 0.01, seed=SEED) ## Sampling data to reduce execution time for this tutorial
   ```

1. Import the required pyspark.ml and synapse.ml libraries and load the trained and registered LightGBMRegressor model using the ***run_uri*** copied from the final step of [Part 4: Train and register machine learning models](tutorial-data-science-train-models.md).

   ```python
   import mlflow
   from pyspark.ml.feature import OneHotEncoder, VectorAssembler, StringIndexer
   from pyspark.ml import Pipeline
   from synapse.ml.core.platform import *
   from synapse.ml.lightgbm import LightGBMRegressor
   ## Define run_uri to fetch the model
   run_uri = "<enter the run_uri from part 04 here>"
   loaded_model = mlflow.spark.load_model(run_uri, dfs_tmpdir="Files/tmp/mlflow")
   ```

1. Run model transform on the input dataframe to generate predictions and remove unnecessary vector features created for model training using the following commands.

   ```python
   # Generate predictions by applying model transform on the input dataframe
   predictions = loaded_model.transform(input_df)
   cols_toremove = ['storeAndFwdFlagIdx', 'timeBinsIdx', 'vendorIDIdx', 'paymentTypeIdx', 'vendorIDEnc',
   'rateCodeIdEnc', 'paymentTypeEnc', 'weekDayEnc', 'pickupHourEnc', 'storeAndFwdFlagEnc', 'timeBinsEnc', 'features','weekDayNameIdx',
   'pickupHourIdx', 'rateCodeIdIdx', 'weekDayNameEnc']
   output_df = predictions.withColumnRenamed("prediction", "predictedtripDuration").drop(*cols_toremove) 
   ```

1. Save predictions to lakehouse delta table **nyctaxi_pred** for downstream consumption and analysis.

   ```python   
   table_name = "nyctaxi_pred"
   output_df.write.mode("overwrite").format("delta").save(f"Tables/{table_name}")
   print(f"Output Predictions saved to delta table: {table_name}")
   ```

1. Preview the final predicted data by various methods including SparkSQL queries that can be executed using the `%%sql` magics command, which tells the notebook engine that the cell is a SparkSQL script.

   ```python
   %%sql
   SELECT * FROM nyctaxi_pred LIMIT 20
   ```

   :::image type="content" source="media\tutorial-data-science-batch-scoring\preview-of-predicted-data.png" alt-text="Screenshot of the table of predicted data." lightbox="media\tutorial-data-science-batch-scoring\preview-of-predicted-data.png":::

1. The **nyctaxi_pred** delta table containing predictions can also be viewed from the lakehouse UI by navigating to the lakehouse item in the active Fabric workspace.

   :::image type="content" source="media\tutorial-data-science-batch-scoring\view-delta-table-lakehouse.png" alt-text="Screenshot of the delta table displayed in the lakehouse UI." lightbox="media\tutorial-data-science-batch-scoring\view-delta-table-lakehouse.png":::

## Next steps

- [Part 6: Create a Power BI report to visualize predictions](tutorial-data-science-create-report.md)
