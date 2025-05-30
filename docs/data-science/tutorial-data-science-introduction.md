---
title: Data science tutorial - get started
description: Learn about the Data science tutorial, including an overview of the steps you follow through the series and details about the end-to-end scenario.
ms.reviewer: None
ms.author: scottpolly
author: s-polly
ms.topic: tutorial
ms.custom:
ms.date: 04/21/2025
---

# Data science end-to-end scenario: introduction and architecture

These tutorials present a complete end-to-end scenario in the Fabric data science experience. They cover each step, from

- Data ingestion
- Data cleaning
- Data preparation

to

- Machine learning model training
- Insight generation

and then cover consumption of those insights with visualization tools - for example, Power BI.

People new to Microsoft Fabric should visit [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md).

## Introduction

A data science project lifecycle typically includes these steps:

- Understand the business rules
- Acquire the data
- Explore, clean, prepare, and visualize the data
- Train the model and track the experiment
- Score the model and generate insights

The steps often proceed iteratively. The goals and success criteria of each stage depend on collaboration, data sharing, and documentation. The Fabric data science experience involves multiple native-built features that enable seamless collaboration, data acquisition, sharing, and consumption.

These tutorials place you in the role of a data scientist who must explore, clean, and transform a dataset that contains the churn status of 10,000 bank customers. You then build a machine learning model to predict which bank customers will likely leave.

You perform the following activities in the tutorials:

1. Use the Fabric notebooks for data science scenarios
1. Use Apache Spark to ingest data into a Fabric lakehouse
1. Load existing data from the lakehouse delta tables
1. Use Apache Spark and Python-based tools to clean and transform data
1. Create experiments and runs to train different machine learning models
1. Use MLflow and the Fabric UI to register and track trained models
1. Run scoring at scale, and save predictions and inference results to the lakehouse
1. Use DirectLake to visualize predictions in Power BI

## Architecture

This tutorial series showcases a simplified end-to-end data science scenario involving:

1. [Data ingestion from an external data source](tutorial-data-science-ingest-data.md).
1. [Data exploration and cleaning](tutorial-data-science-explore-notebook.md).
1. [Machine learning model training and registration](tutorial-data-science-train-models.md).
1. [Batch scoring and prediction saving](tutorial-data-science-batch-scoring.md).
1. [Prediction result visualization in Power BI](tutorial-data-science-create-report.md).

:::image type="content" source="media/tutorial-data-science-introduction/data-science-scenario.png" alt-text="Diagram of the Data science end-to-end scenario components." lightbox="media/tutorial-data-science-introduction/data-science-scenario.png":::

### Different components of the data science scenario

**Data sources** - To ingest data with Fabric, you can easily and quickly connect to Azure Data Services, other cloud platforms, and on-premises data resources. With Fabric Notebooks, you can ingest data from these resources:

- Built-in Lakehouses
- Data Warehouses
- Semantic models
- Various Apache Spark data sources
- Various data sources that support Python

This tutorial series focuses on data ingestion and loading from a lakehouse.

**Explore, clean, and prepare** - The Fabric data science experience supports data cleaning, transformation, exploration, and featurization. It uses built-in Spark experiences and Python-based tools - for example, Data Wrangler and SemPy Library. This tutorial showcases data exploration with the `seaborn` Python library, and data cleaning and preparation with Apache Spark.

**Models and experiments** - With Fabric, you can train, evaluate, and score machine learning models with built-in experiments. To register and deploy your models, and track experiments, [**MLflow**](https://mlflow.org/docs/latest/index.html) offers seamless integration with Fabric as a way to model items. To build and share business insights, Fabric offers other features for model prediction at scale (PREDICT), to build and share business insights.

**Storage** - Fabric standardizes on [Delta Lake](https://docs.delta.io/latest/index.html), which means all Fabric engines can interact with the same dataset stored in a lakehouse. With that storage layer, you can store both structured and unstructured data that support both file-based storage and tabular format. You can easily access the datasets and stored files through all Fabric experience items - for example, notebooks and pipelines.

**Expose analysis and insights** - Power BI, an industry-leading business intelligence tool, can consume lakehouse data for report and visualization generation. In notebook resources, Python or Spark native visualization libraries

- `matplotlib`
- `seaborn`
- `plotly`
- etc.

can visualize data persisted in a lakehouse. The SemPy library also supports data visualization. This library supports built-in rich, task-specific visualizations for

- The semantic data model
- Dependencies and their violations
- Classification and regression use cases

## Next step

> [!div class="nextstepaction"]
> [Prepare your system for the data science tutorial](tutorial-data-science-prepare-system.md)
