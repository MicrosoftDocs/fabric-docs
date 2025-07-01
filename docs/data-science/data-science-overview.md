---
title: Data science in Microsoft Fabric
description: Learn about the Data science machine learning resources, including models, experiments, and notebooks.
ms.author: scottpolly
author: s-polly
ms.reviewer: negust
ms.topic: overview
ms.custom:
ms.date: 04/22/2025
ms.search.form: Data Science Overview
---

# What is Data Science in Microsoft Fabric?

For data enrichment and business insights, [!INCLUDE [product-name](../includes/product-name.md)] offers Data Science experiences that empower users to build end-to-end data science workflows. You can complete a wide range of activities across the entire data science process:

- data exploration
- data preparation
- data cleaning
- experimentation
- modeling
- model scoring
- serving predictive insights to BI reports

[!INCLUDE [product-name](../includes/product-name.md)] users can access a Data Science home page. Then, they can discover and access various relevant resources, as shown in the following screenshot:

:::image type="content" source="media/data-science-overview/data-science-home-page.png" alt-text="Screenshot of the Data science home page." lightbox="media/data-science-overview/data-science-home-page.png":::

Most machine learning projects follow the data science process. At a high level, that process involves these steps:

- problem formulation and ideation
- data discovery and preprocessing
- experimentation and modeling
- enrich and operationalize
- build insights

:::image type="content" source="media/data-science-overview/data-science-process.png" alt-text="Diagram of data science process." lightbox="media/data-science-overview/data-science-process.png":::

This article describes the [!INCLUDE [product-name](../includes/product-name.md)] Data Science capabilities from a data science process perspective. For each step in the data science process, this article summarizes the [!INCLUDE [product-name](../includes/product-name.md)] capabilities that can help.

## Problem formulation and ideation

Data Science users in [!INCLUDE [product-name](../includes/product-name.md)] work on the same platform as business users and analysts. Data sharing and collaboration becomes more seamless across different roles as a result. Analysts can easily share Power BI reports and datasets with data science practitioners. The ease of collaboration across roles in [!INCLUDE [product-name](../includes/product-name.md)] makes hand-offs during the problem formulation phase easier.

## Data discovery and preprocessing

[!INCLUDE [product-name](../includes/product-name.md)] users can interact with data in OneLake using the Lakehouse resource. To browse and interact with data, Lakehouse easily attaches to a notebook. Users can easily read data from a Lakehouse directly into a Pandas dataframe. For exploration, seamless data reads from OneLake then become possible.

A powerful set of tools is available for data ingestion and data orchestration pipelines with data integration pipelines - a natively integrated part of [!INCLUDE [product-name](../includes/product-name.md)]. Easy-to-build data pipelines can access and transform the data into a format that machine learning can consume.

### Data exploration

An important part of the machine learning process involves understanding data through exploration and visualization.

Depending on the data storage location, [!INCLUDE [product-name](../includes/product-name.md)] offers tools to explore and prepare the data for analytics and machine learning. Notebooks themselves become efficient, effective data exploration tools.

### Apache Spark and Python for data preparation

[!INCLUDE [product-name](../includes/product-name.md)] can transform, prepare, and explore your data at scale. With Spark, users can use PySpark/Python, Scala, and SparkR/SparklyR tools to preprocess data at scale. Powerful open-source visualization libraries can enhance the data exploration experience for better data understandings.

### Data Wrangler for seamless data cleansing

To use Data Wrangler, the [!INCLUDE [product-name](../includes/product-name.md)] Notebook experience added a code tool feature that prepares data and generates Python code. This experience makes it easy to accelerate tedious and mundane tasks - for example, data cleaning. With it, you can also build automation and repeatability through generated code. Learn more about Data Wrangler in the Data Wrangler section of this document.

## Experimentation and ML modeling

With tools like PySpark/Python and SparklyR/R, notebooks can handle machine learning model training. Machine learning algorithms and libraries can help train machine learning models. Library management tools can install these libraries and algorithms. Users can then use popular machine learning libraries to complete their ML model training in [!INCLUDE [product-name](../includes/product-name.md)]. Additionally, popular libraries like Scikit Learn can also develop models.

MLflow experiments and runs can track ML model training. To log experiments and models, [!INCLUDE [product-name](../includes/product-name.md)] offers a built-in MLflow experience that supports interaction. Learn more about how use of MLflow to track experiments and manage models in [!INCLUDE [product-name](../includes/product-name.md)].

### SynapseML

Microsoft owns and operates the SynapseML (known earlier as MMLSpark) open-source library. It simplifies massively scalable machine learning pipeline creation. As a tool ecosystem, it expands the Apache Spark framework in several new directions. SynapseML unifies several existing machine learning frameworks, and new Microsoft algorithms, into a single, scalable API. The open-source SynapseML library includes a rich ecosystem of ML tools for predictive model development, and it uses pretrained AI models from Azure AI services. For more information, visit the [SynapseML](https://aka.ms/spark) resource.

## Enrich and operationalize

Notebooks can handle machine learning model batch scoring with open-source libraries for prediction. They can also handle the [!INCLUDE [product-name](../includes/product-name.md)] scalable universal Spark Predict function. This function supports MLflow packaged models in the [!INCLUDE [product-name](../includes/product-name.md)] model registry.

### Gain insights

In [!INCLUDE [product-name](../includes/product-name.md)], you can easily write predicted values to OneLake. From there, Power BI reports can seamlessly consume them with the Power BI Direct Lake mode. Data science practitioners can then easily share the results of their work with stakeholders - and it simplifies operationalization.

You can use notebook scheduling features to schedule runs of notebooks that contain batch scoring. You can also schedule batch scoring as part of data pipeline activities or Spark jobs. With the Direct lake mode in [!INCLUDE [product-name](../includes/product-name.md)], Power BI automatically gets the latest predictions without need for data loads or refreshes.

## Data exploration with semantic link

Data scientists and business analysts spend lots of time trying to understand, clean, and transform data before meaningful analysis can begin. Business analysts typically work with semantic models, and encode their domain knowledge and business logic into Power BI measures. On the other hand, data scientists can work with the same data, but typically in a different code environment or language. With semantic link, data scientists can establish a connection between Power BI semantic models and the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in the [!INCLUDE [product-name](../includes/product-name.md)] experience via the [SemPy Python library](/python/api/semantic-link-sempy). To simplify data analytics, SemPy captures and uses data semantics as users perform various transformations on the semantic models. When data scientists use semantic link, they can

- avoid reimplementation of business logic and domain knowledge in their code
- easily access and use Power BI measures in their code
- use semantics to power new experiences - for example, semantic functions
- explore and validate functional dependencies and relationships between data

When organizations use SemPy, they can expect

- increased productivity and faster collaboration across teams that operate on the same datasets
- increased cross-collaboration across business intelligence and AI teams
- reduced ambiguity, and an easier learning curve when onboarding onto a new model or dataset

For more information about semantic link, visit the [What is semantic link?](semantic-link-overview.md) resource.

## Related content

- Visit [Data Science Tutorials](tutorial-data-science-introduction.md) to get started with end-to-end data science samples
- Visit [Data Wrangler](data-wrangler.md) for more information about data preparation and cleaning with Data Wrangler
- Visit [Machine learning experiment](machine-learning-experiment.md) to learn more about tracking experiments
- Visit [Machine learning model](machine-learning-model.md) to learn more about model management
- Visit [Score models with PREDICT](model-scoring-predict.md) to learn more about batch scoring with Predict
- Serve Lakehouse predictions to Power BI with [Direct lake Mode](../fundamentals/lakehouse-power-bi-reporting.md)
