---
title: Data science tutorial - get started
description: Learn about the Data science tutorial, including an overview of the steps you follow through the modules and details about the end-to-end scenario.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.date: 5/4/2023
---

# Data science end-to-end scenario: introduction and architecture

In this set of tutorials, we demonstrate a sample end-to-end scenario in the Fabric data science experience by implementing each step from data ingestion, cleansing, and preparation, to training machine learning models and generating insights, and then consuming those insights using visualization tools like Power BI. If you're new to Microsoft Fabric, see [What is Microsoft Fabric?](../get-started/microsoft-fabric-overview.md).


## Introduction

The lifecycle of a Data science project typically includes (often, iteratively) the following steps:

- Business understanding
- Data acquisition
- Data exploration, cleansing, preparation, and visualization
- Model training and experiment tracking
- Model scoring and generating insights.

The goals and success criteria of each stage depend on collaboration, data sharing and documentation. The Fabric Data science experience consists of multiple native-built features that enable collaboration, data acquisition, sharing, and consumption in a seamless way.

In this tutorial, you take the role of a data scientist who has been given the task to explore, clean, and transform a dataset containing taxicab trip data. You then build a machine learning model to predict trip duration at scale on a large dataset.

In this tutorial, you learn to perform the following activities:

1. Use the Fabric notebooks for data science scenarios.

1. Ingest data into a Fabric lakehouse using Apache Spark.

1. Load existing data from the lakehouse delta tables.

1. Clean and transform Data using Apache Spark.

1. Create experiments and runs to Train a machine learning model.

1. Register and track trained models using MLflow and the Fabric UI.

1. Run scoring at scale and save predictions and inference results to the lakehouse.

1. Visualize predictions in Power BI using DirectLake.

## Architecture

In this tutorial, we showcase a simplified end-to-end data science scenario that involves:

1. [Ingesting data from an external data source](tutorial-data-science-ingest-data.md).
1. [Data exploration and visualization](tutorial-data-science-explore-notebook.md).
1. [Data cleansing, preparation, and feature engineering](tutorial-data-science-data-cleanse.md).
1. [Model training and evaluation](tutorial-data-science-train-models.md).
1. [Model batch scoring and saving predictions](tutorial-data-science-batch-scoring.md) for consumption.
1. [Visualizing prediction results](tutorial-data-science-create-report.md).

:::image type="content" source="media/tutorial-data-science-introduction/data-science-scenario.png" alt-text="Diagram of the Data science end-to-end scenario components." lightbox="media/tutorial-data-science-introduction/data-science-scenario.png":::

### Different components of the Data science scenario

**Data sources** - Fabric makes it easy and quick to connect to Azure Data Services, other cloud platforms, and on-premises data sources to ingest data from. Using Fabric Notebooks you can ingest data from the built in Lakehouse, Data Warehouse, Power BI Datasets and various Apache Spark and Python supported custom data sources. This tutorial focuses on ingesting and loading data from a lakehouse.

**Explore, clean, and prepare** - The Data science experience on Fabric supports data cleansing, transformation, exploration and featurization by using built-in experiences on Spark as well as Python based tools like Data Wrangler and SemPy Library. This tutorial will showcase data exploration using python library seaborn and data cleansing and preparation using Apache Spark.

**Models and experiments** - Fabric enables you to train, evaluate and score machine learning models by using built-in Experiment and Model artifacts with seamless integration with** [**MLflow**](https://mlflow.org/docs/latest/index.html) for experiment tracking and model registration/deployment. Fabric also features capabilities for model prediction at scale (PREDICT) to gain and share business insights.

**Storage** - Fabric standardizes on [Delta Lake](https://docs.delta.io/latest/index.html), which means all the engines of Fabric can interact with the same dataset stored in a lakehouse. This storage layer allows you to store both structured and unstructured data that support both file-based storage and tabular format. The datasets and files stored can be easily accessed via all Fabric workload artifacts like notebooks and pipelines.

**Expose analysis and insights** - Data from a lakehouse can be consumed by Power BI, industry leading business intelligence tool, for reporting and visualization. Data persisted in the lakehouse can also be visualized in notebooks using Spark or Python native visualization libraries like matplotlib, seaborn, plotly, and more. Data can also be visualized using the SemPy library that supports built-in rich, task-specific visualizations for the semantic data model, for dependencies and their violations, and for classification and regression use cases.

## Next steps

- [Prepare your system for the Data science tutorial](tutorial-data-science-prepare-system.md)
