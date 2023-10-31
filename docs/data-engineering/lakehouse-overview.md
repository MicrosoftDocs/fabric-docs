---
title: What is a lakehouse?
description: A lakehouse is a collection of files, folders, and tables that represent a database over a data lake used by Apache Spark and SQL for big data processing.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: overview
ms.custom: build-2023, build-2023-dataai, build-2023-fabric
ms.date: 05/23/2023
ms.search.form: Lakehouse Overview
---

# What is a lakehouse in Microsoft Fabric?

Microsoft Fabric Lakehouse is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location. It's a flexible and scalable solution that allows organizations to handle large volumes of data using various tools and frameworks to process and analyze that data. It integrates with other data management and analytics tools to provide a comprehensive solution for data engineering and analytics.

:::image type="content" source="media\lakehouse-overview\lakehouse-overview.gif" alt-text="Gif of overall lakehouse experience." lightbox="media\lakehouse-overview\lakehouse-overview.gif":::

## Lakehouse SQL analytics endpoint

The Lakehouse creates a serving layer by automatically generating a SQL analytics endpoint and a default dataset during creation. This new see-through functionality allows user to work directly on top of the Delta tables in the lake to provide a frictionless and performant experience all the way from data ingestion to reporting.

An important distinction between default warehouse is that it's a read-only experience and doesn't support the full T-SQL surface area of a transactional data warehouse.
Note that only the tables in Delta format are available in the SQL analytics endpoint. Parquet, CSV, and other formats can't be queried using the SQL analytics endpoint. If you don't see your table, convert it to Delta format.

## Automatic table discovery and registration

The automatic table discovery and registration is a feature of Lakehouse that provides a fully managed file to table experience for data engineers and data scientists. You can drop a file into the managed area of the Lakehouse and the system automatically validates it for supported structured formats, and registers it into the metastore with the necessary metadata such as column names, formats, compression, and more. (Currently the only supported format is Delta table.) You can then reference the file as a table and use SparkSQL syntax to interact with the data.

## Interacting with the Lakehouse item

A data engineer can interact with the lakehouse and the data within the lakehouse in several ways:

- **The Lakehouse explorer**: The explorer is the main Lakehouse interaction page. You can load data in your Lakehouse, explore data in the Lakehouse using the object explorer, set MIP labels & various other things. Learn more about the explorer experience: [Navigate the Fabric Lakehouse explorer](navigate-lakehouse-explorer.md).

- **Notebooks**: Data engineers can use the notebook to write code to read, transform and write directly to Lakehouse as tables and/or folders. You can learn more about how to use notebooks for Lakehouse: [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md) and [How to use a notebook to load data into your lakehouse](lakehouse-notebook-load-data.md).

- **Pipelines**: Data engineers can use data integration tools such as pipeline copy tool to pull data from other sources and land into the Lakehouse. Find more information on how to use the copy activity: [How to copy data using copy activity](../data-factory/copy-data-activity.md).

- **Apache Spark job definitions**: Data engineers can develop robust applications and orchestrate the execution of compiled Spark jobs in Java, Scala, and Python. Learn more about Spark jobs: [What is an Apache Spark job definition?](spark-job-definition.md)

- **Dataflows Gen 2**: Data engineers can use Dataflows Gen 2 to ingest and prepare their data. Find more information on load data using dataflows: [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md).

Learn more about the different ways to load data into your lakehouse: [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md).

## Next steps

In this overview, you get a basic understanding of a lakehouse. Advance to the next article to learn how to create and use your own lakehouse:

- To start using lakehouses, see [Create a lakehouse in Microsoft Fabric](create-lakehouse.md).
