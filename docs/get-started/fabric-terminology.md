---
title: Microsoft Fabric terminology
description: Learn the definitions of terms used in Microsoft Fabric, including terms specific to Synapse Data Warehouse, Synapse Data Engineering, and Synapse Data Science.
ms.reviewer: sngun
ms.author: sngun
author: SnehaGunda
ms.topic: conceptual
ms.date: 04/10/2023
---

# Microsoft Fabric terminology

[!INCLUDE [preview-note](../includes/preview-note.md)]

Learn the definitions of terms used in Microsoft Fabric, including terms specific to Synapse Data Warehouse, Synapse Data Engineering, Synapse Data Science, Synapse Real-time Analytics, Data Factory, Reflex, and Power BI.

## General terms

- **Capacity:** Capacity is a dedicated set of resources reserved for exclusive use. Capacity defines the ability of a resource to perform an activity or to produce output in a specified period. CPU count, memory, and storage are the capacity dimensions. Fabric offers capacity through the Pro, Trial, Premium - per user, Premium - per capacity, and Embedded SKU types. For more information, see [What is capacity](../enterprise/what-is-capacity.md) article.

- **Experience:** A collection of capabilities with a specific look, feel, and functionality. The Fabric experiences include Synapse Data Warehouse, Synapse Data Engineering, Synapse Data Science, Synapse Real-time Analytics, Data Factory, Reflex, and Power BI.

- **Item:** An item is the result of a set of customer activities within an experience. For example, the Data Engineering experience includes a lakehouse, notebook, and Spark job definition, items. You can use items within the experience in which they're created or from other experiences. You can save, edit, and share them with other users.

- **Shortcut:** Shortcuts are embedded references within OneLake that point to other file store locations. They provide a way to connect to existing data without having to directly copy it. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

- **Tenant:** A single instance of Fabric supporting a single user, account, or organization. For more information, see [Placeholder](../placeholder.md).

- **Workspace:** A user interface area designed for collaboration, in which users perform tasks such as creating reports, notebooks, datasets, etc. For more information, see [Placeholder](../placeholder.md).

## Synapse Data Engineering

- **Lakehouse:** A lakehouse is a collection of files, folders, and tables that represent a database over a data lake used by the Apache Spark engine and SQL engine for big data processing. A lakehouse includes enhanced capabilities for ACID transactions when using the open-source Delta formatted tables. The lakehouse item is hosted within a unique workspace folder in the Microsoft Fabric lake. It contains files in various formats (structured and unstructured) organized in folders and subfolders. For more information, see [What is a lakehouse?](../data-engineering/lakehouse-overview.md)

- **Spark application:** An Apache Spark application is a program written by a user using one of Spark’s API languages (Scala, Python, Spark SQL, or Java) or Microsoft-added languages (.NET with C# or F#). When an application runs, it's divided into one or more Spark jobs that run in parallel to process the data faster. For more information, see [Spark application monitoring](../data-engineering/spark-detail-monitoring.md).

- **Apache Spark job:** A Spark job is part of a Spark application that is run in parallel with other jobs in the application. A job consists of multiple tasks. For more information, see [Spark job monitoring](../data-engineering/spark-monitor-debug.md).

- **Apache Spark job definition:** A Spark job definition is a set of parameters, set by the user, indicating how a Spark application should be run. It allows you to submit batch or streaming jobs to the Spark cluster. For more information, see [What is an Apache Spark job definition?](../data-engineering/spark-job-definition.md)

- **V-order:** A write optimization to the parquet file format that enables fast reads and provides cost efficiency and better performance. All the Fabric engines write v-ordered parquet files by default.

## Data Factory

- **Connector:** Data Factory offers a rich set of connectors that allow you to connect to different types of data stores. Once connected, you can transform the data. For more information, see [connectors](../data-factory/connector-overview.md).

- **Data pipeline:** In Data Factory, a data pipeline is used for orchestrating data movement and transformation. These pipelines are different from the deployment pipelines in Fabric. For more information, see [Pipelines](../data-factory/data-factory-overview.md#data-pipelines) in the Data Factory overview.

- **Dataflow Gen2:** Dataflows provide a low-code interface for ingesting data from hundreds of data sources and transforming your data. Dataflows in Fabric are referred to as Dataflow Gen2. Dataflow Gen1 exists in Power BI. Dataflow Gen2 offers extra capabilities compared to Dataflows in Azure Data Factory or Power BI.  You can't upgrade from Gen1 to Gen2. For more information, see [Dataflows](../data-factory/data-factory-overview.md#dataflows) in the Data Factory overview.

## Synapse Data Science

- **Experiment:** A machine learning experiment is the primary unit of organization and control for all related machine learning runs. For more information, see [Machine learning experiments in Microsoft Fabric](../data-science/machine-learning-experiment.md).

- **Model:** A machine learning model is a file trained to recognize certain types of patterns. You train a model over a set of data, and you provide it with an algorithm that uses to reason over and learn from that data set. For more information, see [Machine learning model](../data-science/machine-learning-model.md).

- **Run:** A run corresponds to a single execution of model code. In [MLflow](https://mlflow.org/), tracking is based on experiments and runs.

## Synapse Data Warehouse

- **SQL Endpoint:** The SQL Endpoint on the lakehouse allows a user to transition from the Lake view of the lakehouse (which supports data engineering and Apache Spark) to the SQL experiences that a data warehouse provides, supporting Transact-SQL (T-SQL). For more information, see [SQL Endpoint](../data-warehouse/data-warehousing.md#sql-endpoint).

- **Warehouse:** The warehouse functionality is a traditional data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. For more information, see [Synapse data warehouse](../data-warehouse/data-warehousing.md#synapse-data-warehouse).

## Real-time Analytics

- **KQL Queryset:**. The KQL queryset is the item used to run queries, view results, and manipulate query results on data from your Data Explorer database.  The queryset includes the databases and tables, the queries, and the results. The KQL queryset allows you to save queries for future use, or export and share queries with others. For more information, see [Query data in the KQL queryset](../real-time-analytics/kusto-query-set.md)

## Next steps

- [What is Microsoft Fabric?](../placeholder.md)
