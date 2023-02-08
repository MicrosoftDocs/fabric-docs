---
title: Data science overview
description: Overview of machine learning.
ms.reviewer: mopeakande
ms.author: negust
author: nelgson
ms.topic: overview
ms.date: 02/10/2023
---

# Data science overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Users in [!INCLUDE [product-name](../includes/product-name.md)] will have access to a Data Science Home page, from which they can discover and access a variety of relevant resources. For example, you can start creating machine learning Experiments, Models and Notebooks. You can also import existing Notebooks on the Data Science Home page.

:::image type="content" source="media/data-science-overview/data-science-home-page.png" alt-text="Screenshot of the Data science home page." lightbox="media/data-science-overview/data-science-home-page.png":::

[!INCLUDE [product-name](../includes/product-name.md)] offers various data science capabilities.  

You may be familiar with how a typical data science process looks. It's a well-known process, which most machine learning projects follow.

At a high level, the process contains the following steps:

- Business understanding  
- Data acquisition
- Data preparation, cleansing and visualization
- Model training and experiment tracking
- Model scoring

This article describes the [!INCLUDE [product-name](../includes/product-name.md)] Data Science capabilities from a data science process perspective. For each step in the data science process, the [!INCLUDE [product-name](../includes/product-name.md)] capabilities that can help are summarized.

## Business understanding

Data Science users are working on the same platform as business users and analysts. This means that sharing data and collaboration will be more seamless across different roles. More details about collaboration features that help this phase of the data science lifecycle will come soon.

## Data acquisition

Users in [!INCLUDE [product-name](../includes/product-name.md)] can interact with data in One Lake using the Lakehouse item. You can easily attach Lakehouse to a Notebook and browse and interact with data.

We have also made it easy to read data from a Lakehouse directly into a Pandas dataframe. This experience should make it seamless to read data from One Lake for exploration.  

Thanks to data integration pipelines, a natively integrated part of [!INCLUDE [product-name](../includes/product-name.md)], there's a powerful set of tools available for data ingestion and data orchestration pipelines. This allows you to easily build data pipelines to access and transform the data into a format that can be consumed for machine learning. Learn more about data pipelines in Synapse.

## Data preparation, cleansing and visualization

An important part of the machine learning process is to understand data by exploration and visualization.

Depending on where the data is stored, [!INCLUDE [product-name](../includes/product-name.md)] offers a set of different tools to explore and prepare it for analytics and machine learning. One of the quickest ways to get started with data exploration is using Notebooks.

## Apache Spark for preparation and visualization

Apache Spark offers capabilities to transform, prepare, and explore your data at scale. These spark pools offer tools like PySpark/Python, Scala, and SparkR/SparklyR for data processing at scale. Using powerful open-source visualization libraries, the data exploration experience can be enhanced to help understand the data better. Learn more about how to explore and visualize data in Synapse using Spark.

## Data Wrangler for seamless data cleansing

In the Notebook experience in [!INCLUDE [product-name](../includes/product-name.md)], we've also added an experience to leverage Data Wrangler, a tool for code users to prepare data and get Python code generated. This experience makes it easy to accelerate tedious and mundane tasks like data cleansing, and get repeatability and automation thanks to the generated code. Learn more about Data Wrangler in the Data Wrangler section of this document.

## Model training and experiment tracking

Training machine learning models can be performed in the Notebooks with tools like PySpark/Python or Scala.

Machine learning models can be trained with help from various algorithms and libraries that can be installed using library management capabilities. [SynapseML](https://aka.ms/spark) scalable machine learning algorithms that can help solving most classical machine learning problems. SynapseML is an open-source library including a rich ecosystem of ML tools and this library is owned and maintained by Microsoft. [Spark MLlib](https://microsoft.sharepoint.com/teams/TridentOnboardingCoreTeam/Shared%20Documents/General/8.%20Private%20Preview%20Documentation/Data%20science/Data%20Science%20Consolidated%20Documentation.docx) is another option for building scalable ML Models in [!INCLUDE [product-name](../includes/product-name.md)].

In addition to the above, popular libraries such as Scikit Learn can also be used to develop models.  

Model training can be tracked using MLflow experiments. [!INCLUDE [product-name](../includes/product-name.md)] will have a native MlFlow endpoint that users can interact with to log experiments and models. Learn more about using MLflow for tracking experiments and managing models in the following sections.

## SynapseML

SynapseML (previously known as MMLSpark), is an open-source library that simplifies the creation of massively scalable machine learning (ML) data pipelines. It's an ecosystem of tools used to expand the Apache Spark framework in several new directions. SynapseML unifies several existing machine learning frameworks and new Microsoft algorithms into a single, scalable API that’s usable across Python, R, Scala, .NET, and Java. Learn more about [SynapseML](https://aka.ms/spark).

## Model scoring

Batch scoring machine learning models can be done in Notebooks using open-source libraries for prediction or the scalable universal Predict function in [!INCLUDE [product-name](../includes/product-name.md)], which supports mlflow packaged models in the [!INCLUDE [product-name](../includes/product-name.md)] model registry.  

Predicted values can be written to OneLake and consumed from Power BI reports seamlessly using the Power BI “see-through”-mode.

You can learn more about model scoring in [!INCLUDE [product-name](../includes/product-name.md)] in the following sections.

## Data Exploration with SemPy

Data scientists and business analysts spend a significant portion of their time trying to understand, clean and transform their data before they can even start performing any meaningful analysis. SemPy simplifies data analytics by capturing and exploiting the semantics of the data as the users perform various transformations on their datasets. By exploiting data semantics, SemPy can simplify various tedious tasks such as automatically transforming data while joining heterogeneous datasets, handling underlying schema changes, enforcing semantic constraints and identifying data that violates them, and enriching the data with new knowledge. SemPy users can register new information about the data and share it with other users allowing faster collaboration across teams operating on the same datasets and increasing productivity. SemPy explores data semantics to simplify data science analytics. Through SemPy we expect to:

- Reduce the time needed to pre-process and validate the data before starting to perform any meaningful analysis.
- Increase productivity across teams that operate on same datasets through registering and sharing data semantics and transformations, reducing the time needed to extract value from a dataset.
- Increase cross org collaboration bringing the BI and AI teams together.
- Decrease ambiguity and learning curve when onboarding onto a new model/dataset.

You can learn more about SemPy in [!INCLUDE [product-name](../includes/product-name.md)] in the following sections.

## Next steps

- Get started with end-to-end data science samples (See How to use AI samples section)
- Learn more about data preparation and cleansing with Data Wrangler (See [Data Wrangler](data-wrangler.md) section)
- Learn more about tracking experiments (See [Machine learning experiment section](machine-learning-experiment.md))
- Learn more about managing models (See [Machine learning model](machine-learning-model.md) section)
- Learn more about batch scoring with Predict (See [model scoring](model-scoring-predict.md) section)
- Learn more about exploring and validating data with SemPy (See SemPy section)
- Learn more about connecting to Power BI Datasets with SemPy (See PBI Connector section)
