---
title: Data Engineering overview
description: Read an introduction to Data Engineering.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: overview
ms.date: 02/24/2023
---

# Data engineering overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Data engineering in Microsoft Fabric enables users to design, build, and maintain infrastructures and systems that enable their organizations to collect, store, process, and analyze large volumes of data.

Microsoft Fabric provides various data engineering capabilities to ensure that your data is easily accessible, well-organized, and of high-quality. From the data engineering homepage, you can: 

- Create and manage your data using Lakehouses 

- Design pipelines to copy data into your Lakehouse

- Use Spark Job definitions to submit batch/streaming job to Spark cluster

- Leverage notebooks to write code for data ingestion, preparation, and transformation 

    :::image type="content" source="media\data-engineering-overview\data-engineering-artifacts.png" alt-text="Screenshot showing Data Engineering objects." lightbox="media\data-engineering-overview\data-engineering-artifacts.png":::

### Lakehouse

Lakehouses are data architectures that allows organizations to store and manage structured and unstructured data in a single location, using a variety of tools and frameworks to process and analyze that data. This can include SQL-based queries and analytics, as well as machine learning and other advanced analytics techniques.

### Apache Spark job definition

Spark job definitions are set of instructions that define how to execute a job on a Spark cluster. It includes information such as the input and output data sources, the transformations, and actions to be performed on the data, and the configuration settings for the Spark application. Spark job Definition allows you to submit batch/streaming job to Spark cluster, apply different transformation logic to the data hosted on your lakehouse along with many other things. 

### Notebook

Notebooks are an interactive computing environment that allows users to create and share documents that contain live code, equations, visualizations, and narrative text. They allow users to write and execute code in a variety of programming languages, including Python, R, and Scala and are used for data ingestion, preparation, analysis, and other data-related tasks.

### Data Pipeline

Data pipelines are a series of steps that are used to collect, process, and transform data from its raw form to a format that can be used for analysis and decision-making. They are a critical component of data engineering, as they provide a way to move data from its source to its destination in a reliable, scalable, and efficient way.

## Next steps

Get started with the Data Engineering experience:

- Learn more about Lakehouses, see [What is a Lakehouse?](lakehouse-overview.md).

- To get started with a Lakehouse, see [Creating a Lakehouse](create-lakehouse.md).

- Learn more about Apache Spark job definitions, see [What is an Apache Spark job definition?](spark-job-definition.md).

- To get started with an Apache Spark job definition, see [Creating a Apache Spark job definition](create-spark-job-definition.md).

- Learn more about Notebooks, see [Author and execute the notebook](author-execute-notebook.md).

- To get started with Pipelines copy activity, see [How to copy data using copy activity](..\data-factory\copy-data-activity.md).
