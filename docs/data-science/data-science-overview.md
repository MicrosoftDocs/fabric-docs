---
title: What is Data science in Microsoft Fabric?
description: Overview of machine learning.
author: nelgson
ms.author: negust
ms.reviewer: franksolomon
ms.topic: overview
ms.date: 03/24/2023

---

# What is Data science in Microsoft Fabric?

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] users can access a Data Science Home page. From there, they can discover and access various relevant resources. For example, they can create machine learning Experiments, Models and Notebooks. They can also import existing Notebooks on the Data Science Home page.

:::image type="content" source="media/data-science-overview/data-science-home-page.png" alt-text="Screenshot of the Data science home page." lightbox="media/data-science-overview/data-science-home-page.png":::

[!INCLUDE [product-name](../includes/product-name.md)] offers various data science capabilities.  

You might know how a typical data science process works. As a well-known process, most machine learning projects follow it.

At a high level, the process involves these steps:

- Business understanding  
- Data acquisition
- Data preparation, cleansing and visualization
- Model training and experiment tracking
- Model scoring

This article describes the [!INCLUDE [product-name](../includes/product-name.md)] Data Science capabilities from a data science process perspective. For each step in the data science process, this article summarizes the [!INCLUDE [product-name](../includes/product-name.md)] capabilities that can help.

## Business understanding

Data Science users work on the same platform as business users and analysts. Data sharing and collaboration become more seamless across different roles as a result. More details about collaboration features that help this data science lifecycle phase will come soon.

## Data acquisition

[!INCLUDE [product-name](../includes/product-name.md)] users can interact with data in One Lake using the Lakehouse item. Lakehouse easily attaches to a Notebook to browse and interact with data.

Users can easily read data from a Lakehouse directly into a Pandas dataframe. For exploration, this should make seamless data reads from One Lake possible.

There's a powerful set of tools is available for data ingestion and data orchestration pipelines with data integration pipelines - a natively integrated part of [!INCLUDE [product-name](../includes/product-name.md)]. Easy-to-build data pipelines can access and transform the data into a format that machine learning can consume. Learn more about data pipelines in Synapse.

## Data preparation, cleansing and visualization

An important part of the machine learning process is to understand data through exploration and visualization.

Depending on the data storage location, [!INCLUDE [product-name](../includes/product-name.md)] offers a set of different tools to explore and prepare the data for analytics and machine learning. Notebooks become one of the quickest ways to get started with data exploration.

## Apache Spark for preparation and visualization

Apache Spark offers capabilities to transform, prepare, and explore your data at scale. These Spark pools offer PySpark/Python, Scala, and SparkR/SparklyR tools for data processing at scale. Powerful open-source visualization libraries can enhance the data exploration experience to help better understand the data. Learn more about how to explore and visualize data in Synapse using Spark.

## Data Wrangler for seamless data cleansing

The [!INCLUDE [product-name](../includes/product-name.md)] Notebook experience added a feature to use Data Wrangler, a code tool that prepares data and generates Python code. This experience makes it easy to accelerate tedious and mundane tasks - for example, data cleansing, and build repeatability and automation through generated code. Learn more about Data Wrangler in the Data Wrangler section of this document.

## Model training and experiment tracking

With tools like PySpark/Python or Scala, notebooks can handle machine learning model training.

Certain algorithms and libraries can help train machine learning models. Library management tools can install these libraries and algorithms. [SynapseML](https://aka.ms/spark) scalable machine learning algorithms can help solve most classical machine learning problems. The open-source SynapseML library includes a rich ecosystem of ML tools. Microsoft owns and maintains this library. As another option, [Spark MLlib](https://microsoft.sharepoint.com/teams/TridentOnboardingCoreTeam/Shared%20Documents/General/8.%20Private%20Preview%20Documentation/Data%20science/Data%20Science%20Consolidated%20Documentation.docx) can build scalable ML Models in [!INCLUDE [product-name](../includes/product-name.md)].

Additionally, popular libraries like Scikit Learn can also develop models.  

MLflow experiments can track model training. [!INCLUDE [product-name](../includes/product-name.md)] offers a native MlFlow endpoint with which users can interact, to log experiments and models. Learn more about MLflow use to track experiments and manage models in the following sections.

## SynapseML

The SynapseML (previously known as MMLSpark) open-source library simplifies massively scalable machine learning (ML) pipeline creation. As a tool ecosystem, it expands the Apache Spark framework in several new directions. SynapseML unifies several existing machine learning frameworks and new Microsoft algorithms into a single, scalable API. This API is usable across Python, R, Scala, .NET, and Java. Learn more about [SynapseML](https://aka.ms/spark).

## Model scoring

Notebooks can handle machine learning model batch scoring with open-source libraries for prediction, or the [!INCLUDE [product-name](../includes/product-name.md)] scalable universal Predict function, which supports mlflow packaged models in the [!INCLUDE [product-name](../includes/product-name.md)] model registry.  

Predicted values can be written to OneLake, and seamlessly consumed from Power BI reports, with the Power BI “see-through”-mode.

Learn more about model scoring in [!INCLUDE [product-name](../includes/product-name.md)], in the following sections.

## Data Exploration with SemPy

Data scientists and business analysts spend a lot of time trying to understand, clean and transform their data, before they can even start any meaningful analysis. SemPy simplifies data analytics. It captures and exploits the data semantics as the users perform various transformations on their datasets. By exploiting data semantics, SemPy can simplify various tedious tasks, for example

- automatic data transformation while joining heterogeneous datasets
- handle underlying schema changes
- enforce semantic constraints and identify data that violates them
- enrich the data with new knowledge

SemPy users can register new information about the data, and share it with other users. This allows for faster collaboration across teams that operate on the same datasets, and increases productivity. SemPy explores data semantics to simplify data science analytics. Through SemPy we can expect to:

- Reduce the time needed to preprocess and validate the data, before meaningful analysis starts.
- Increase productivity across teams that operate on same datasets, through registration and sharing data of semantics and transformations; this reduces the time needed to extract value from a dataset.
- Increase cross-org collaboration, to bring the BI and AI teams together.
- Decrease ambiguity and the learning curve when onboarding onto a new model/dataset.

Learn more about SemPy in [!INCLUDE [product-name](../includes/product-name.md)], in the following sections.

## Next steps

- Get started with end-to-end data science samples (See How to use AI samples section)
- Learn more about data preparation and cleansing with Data Wrangler (See [Data Wrangler](data-wrangler.md) section)
- Learn more about tracking experiments (See [Machine learning experiment section](machine-learning-experiment.md))
- Learn more about managing models (See [Machine learning model](machine-learning-model.md) section)
- Learn more about batch scoring with Predict (See [model scoring](model-scoring-predict.md) section)
- Learn more about exploring and validating data with SemPy (See SemPy section)
- Learn more about connecting to Power BI Datasets with SemPy (See PBI Connector section)