---
title: Data science tutorial - perform batch scoring and save predictions
description: In this fifth module, learn how to import a trained and registered model and perform batch predictions on a test dataset.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.date: 5/4/2023
---

# Module 5: Perform batch scoring and save predictions to a lakehouse

In this module, you learn to import a trained and registered LightGBMRegressor model from the Microsoft Fabric MLflow model registry, and perform batch predictions on a test dataset loaded from a lakehouse.

## Follow along in notebook
The python commands/script used in each step of this tutorial can be found in the accompanying notebook: **05 - Perform batch scoring and save predictions to lakehouse**.

## Perform batch scoring and save predictions

1. Read a random sample of cleansed data from lakehouse table ***nyctaxi_prep*** filtered for puYear=2016 and puMonth=3.

   :::image type="content" source="media\tutorial-data-science-batch-scoring\read-random-sample.png" alt-text="Screenshot of a code sample for reading a random sample of cleansed data." lightbox="media\tutorial-data-science-batch-scoring\read-random-sample.png":::

1. Import the required pyspark.ml and synapse.ml libraries and load the trained and registered LightGBMRegressor model using the ***run_uri*** copied from the final step of [Module 4: Train and register machine learning models](tutorial-data-science-train-models.md).

   :::image type="content" source="media\tutorial-data-science-batch-scoring\import-libraries-load-model.png" alt-text="Screenshot of a code sample for importing libraries and loading the model." lightbox="media\tutorial-data-science-batch-scoring\import-libraries-load-model.png":::

1. Run model transform on the input dataframe to generate predictions and remove unnecessary vector features created for model training using the following commands.

   :::image type="content" source="media\tutorial-data-science-batch-scoring\run-model-transform.png" alt-text="Screenshot of a code sample to run model transform and generate predictions." lightbox="media\tutorial-data-science-batch-scoring\run-model-transform.png":::

1. Save predictions to lakehouse delta table **nyctaxi_pred** for downstream consumption and analysis.

   :::image type="content" source="media\tutorial-data-science-batch-scoring\save-predictions.png" alt-text="Screenshot of a code sample to save predictions to the lakehouse delta table." lightbox="media\tutorial-data-science-batch-scoring\save-predictions.png":::

1. Preview the final predicted data by various methods including SparkSQL queries that can be executed using the %%sql magics command, which tells the notebook engine that the cell is a SparkSQL script.

   :::image type="content" source="media\tutorial-data-science-batch-scoring\sql-magics-command.png" alt-text="Screenshot of a code sample to preview the final predicted data." lightbox="media\tutorial-data-science-batch-scoring\sql-magics-command.png":::

   :::image type="content" source="media\tutorial-data-science-batch-scoring\preview-of-predicted-data.png" alt-text="Screenshot of the table of predicted data." lightbox="media\tutorial-data-science-batch-scoring\preview-of-predicted-data.png":::

1. The **nyctaxi_pred** delta table containing predictions can also be viewed from the lakehouse UI by navigating to the lakehouse artifact in the active Fabric workspace.

   :::image type="content" source="media\tutorial-data-science-batch-scoring\view-delta-table-lakehouse.png" alt-text="Screenshot of the delta table displayed in the lakehouse UI." lightbox="media\tutorial-data-science-batch-scoring\view-delta-table-lakehouse.png":::

## Next steps

- [Module 6: Create a Power BI report to visualize predictions](tutorial-data-science-create-report.md)
