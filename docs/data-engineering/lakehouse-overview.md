---
title: What is a lakehouse?
description: A lakehouse is a collection of files, folders, and tables that represent a database over a data lake used by  Apache Spark and SQL for big data processing.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: overview
ms.date: 02/24/2023
ms.search.form: Lakehouse Overview
---

# What is a lakehouse in Microsoft Fabric?

[!INCLUDE [preview-note](../includes/preview-note.md)]


Microsoft Fabric Lakehouse is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location. It is a flexible and scalable solution that allows organizations to handle large volumes of data using a variety of tools and frameworks to process and analyze that data. It integrates with other data management and analytics tools to provide a comprehensive solution for data engineering and analytics.

   :::image type="content" source="media\lakehouse-overview\lakehouse-overview.gif" alt-text="Gif of overall lakehouse experience." lightbox="media\lakehouse-overview\lakehouse-overview.gif":::

## Lakehouse SQL endpoint

The Lakehouse creates a serving layer by auto-generating an SQL endpoint and a default dataset during creation. This new see-through functionality allows user to work directly on top of the delta tables in the lake to provide a frictionless and performant experience all the way from data ingestion to reporting.

An important distinction between default warehouse is that it's a read-only experience and doesn't support the full T-SQL surface area of a transactional data warehouse.
It is important to note that only the tables in Delta format are available in the SQL Endpoint. Parquet, CSV, and other formats can't be queried using the SQL Endpoint. If you don't see your table, convert it to Delta format.

Learn more about the SQL Endpoint [here](#lakehouse-sql-endpoint)

## Automatic table discovery and registration

The automatic table discovery and registration is a feature of Lakehouse that provides a fully managed file to table experience for data engineers and data scientists. You can drop a file into the managed area of the Lakehouse and the file is automatically validated for supported structured formats, which currently is only Delta tables, and registered into the metastore with the necessary metadata such as column names, formats, compression and more. You can then reference the file as a table and use SparkSQL syntax to interact with the data.

## Interacting with the Lakehouse item

A data engineer can interact with the lakehouse and the data within the lakehouse in several ways:

- **The Lakehouse explorer**: The explorer is the main Lakehouse interaction page. You can load data in your Lakehouse, explore data in the Lakehouse using the object explorer, set MIP labels & various other things. Learn more about the explorer experience: [Navigating the Lakehouse explorer](navigate-lakehouse-explorer.md).

- **Notebooks**: Data engineers can use the notebook to write code to read, transform and write directly to Lakehouse as tables and/or folders. You can learn more about how to leverage notebooks for Lakehouse:  [Explore the data in your Lakehouse with a notebook](lakehouse-notebook-explore.md) and [How to use a notebook to load data into your Lakehouse](lakehouse-notebook-load-data.md).

- **Pipelines**: Data engineers can use data integration tools such as pipeline copy tool to pull data from other sources and land into the Lakehouse. Find more information on how to use the copy activity: [How to copy data using copy activity](../data-factory/copy-data-activity.md).

- **Apache Spark job definitions**: Data engineers can develop robust applications and orchestrate the execution of compiled Spark jobs in Java, Scala, and Python. Learn more about Spark jobs: [What is an Apache Spark job definition?](spark-job-definition.md).

- **Dataflows Gen 2**: Data engineers can leverage Dataflows Gen 2 to ingest and prepare their data. Find more information on load data using dataflows: [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md).

Learn more about the different ways to load data into your lakehouse: [Get data experience for Lakehouse](load-data-lakehouse.md).


## Next steps

In this overview, you get a basic understanding of a lakehouse. Advance to the next article to learn how to create and get started with your own lakehouse:

- To get started with lakehouse, see [Creating a lakehouse](create-lakehouse.md).
