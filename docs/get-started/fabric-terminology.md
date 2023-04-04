---
title: Microsoft Fabric terminology
description: Learn the definitions of terms used throughout Microsoft Fabric, and terms used in specific experiences, such as OneLake, Data Factory, data engineering, etc.
ms.reviewer: sngun
ms.author: sngun
author: SnehaGunda
ms.topic: conceptual
ms.date: 04/10/2023
---

# Microsoft Fabric terminology

[!INCLUDE [preview-note](../includes/preview-note.md)]

Learn the definitions of terms used throughout Microsoft Fabric, and terms used in specific experiences, such as OneLake, Data Factory, data engineering, data warehousing, data science, and real-time analytics.

## General terms

- **Capacity:** Capacity is a dedicated set of resources reserved for exclusive use. Capacity defines the ability of a resource to perform an activity or to produce output in a specified period. CPU count, memory, and storage are the capacity dimensions. Fabric offers capacity through the Pro, Trial, Premium - per user, Premium - per capacity, and Embedded SKU types.

   For more information, see [What is capacity](../enterprise/what-is-capacity.md) article.

- **Experience:** A collection of capabilities with a specific look, feel, and functionality. The Fabric experiences include Synapse Data Warehouse, Synapse Data Engineering, Synapse Data Science, Synapse Real-time Analytics, Data Factory, Reflex, and Power BI.

   For more information about experiences in Fabric, see [Placeholder](../placeholder.md).

- **Item:** An item is the result of a set of customer activities within an experience. For example, the Data Engineering experience includes a lakehouse, notebook, and Spark job definition, items. You can use items within the experience in which they're created or from other experiences. You can save, edit, and share them with other users.

   For more information on items in Fabric, see [Placeholder](../placeholder.md).

- **Shortcut:** Shortcuts are embedded references within OneLake that point to other file store locations. They provide a way to connect to existing data without having to directly copy it. 

   For more information on shortcuts, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

- **Tenant:** A single instance of Fabric supporting a single user, account, or organization.

   For more information on tenants in Fabric, see [Placeholder](../placeholder.md).

- **Workspace:** A user interface area designed for collaboration, in which users perform tasks such as creating reports, notebooks, datasets etc.

   For more information on Fabric workspaces, see [Placeholder](../placeholder.md).

## Data engineering

- **Lakehouse:** A lakehouse is a collection of files, folders, and tables that represent a database over a data lake used by the Apache Spark engine and SQL engine for big data processing. A lakehouse includes enhanced capabilities for ACID transactions when using the open-source Delta formatted tables. The lakehouse item is hosted within a unique workspace folder in the Microsoft Fabric lake. It contains files in various formats (structured and unstructured) organized in folders and subfolders.

   For more information about lakehouses, see [What is a lakehouse?](../data-engineering/lakehouse-overview.md)

- **Spark application:** An Apache Spark application is a program written by a user using one of Spark’s API languages (Scala, Python, Spark SQL, or Java) or Microsoft-added languages (.NET with C# or F#). When an application runs, it's divided into one or more Spark jobs that run in parallel to process the data faster.

   For more information on Spark applications, see [Placeholder](../placeholder.md).

- **Spark job:** A Spark job is part of a Spark application that is run (computed) in parallel with other jobs in the application. A job consists of multiple tasks.

   For more information on Spark jobs, see [Placeholder](../placeholder.md).

- **Spark job definition:** A Spark job definition is a set of parameters, set by the user, indicating how a Spark application should be run.

   For more information on Spark job definitions, see [What is an Apache Spark job definition?](../data-engineering/spark-job-definition.md)

## Data Factory

- **Connection:** This term refers to a connection to either your data source or data target.

   For more information on connections, see [Placeholder](../placeholder.md).

- **Data pipeline:** Within the context of data integration (DI), a data pipeline is a pipeline item for orchestrating data movement and transformation. We try to avoid confusing this concept with deployment pipelines in Fabric documentation.

   For more information on data pipelines, see [Pipelines](../data-factory/data-factory-overview.md#data-pipelines) in the Data Factory overview.

- **Dataflow Gen2:** Dataflow Gen2 is the name of the dataflow product in Fabric. (Gen1 exists in Power BI and doesn't have a direct upgrade path to Gen2.) Dataflow Gen2 is a superset of capabilities, compared to existing in-market dataflow capabilities (in either ADF or Power BI).

   For more information on Dataflow Gen2, see [Dataflows](../data-factory/data-factory-overview.md#dataflows) in the Data Factory overview.

## Data science

- **Experiment:** A machine learning experiment is the primary unit of organization and control for all related machine learning runs.

   For more information on experiments, see [Machine learning experiments in Microsoft Fabric](../data-science/machine-learning-experiment.md).

- **Model:** A machine learning model is a file trained to recognize certain types of patterns. You train a model over a set of data, and you provide it with an algorithm that uses to reason over and learn from that data set.

   For more information on models, see [Machine learning model](../data-science/machine-learning-model.md).

- **Run:** A run corresponds to a single execution of model code. In [MLflow](https://mlflow.org/), tracking is based on experiments and runs.

   For more information on runs, see [Placeholder](../placeholder.md).

## Data warehouse

- **SQL Endpoint:** The SQL Endpoint on the lakehouse allows a user to transition from the Lake view of the lakehouse (which supports data engineering and Apache Spark) to the SQL experiences that a data warehouse provides, supporting Transact-SQL (T-SQL).

   For more information on SQL Endpoints, see [SQL Endpoint](../data-warehouse/data-warehousing.md#sql-endpoint) in What is Data warehousing in Microsoft Fabric?

- **Warehouse:** The warehouse functionality is a traditional data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse.

   For more information on the warehouse functionality, see [Data warehouse](../data-warehouse/data-warehousing.md#data-warehouse) in What is Data warehousing in Microsoft Fabric?

## Real-time analytics

- **Event stream:**

   For more information on event streams in Fabric, see [Placeholder](../placeholder.md).

- **KQL Queryset:** This is an activity where the user writes KQL and SQL scripts to query data. The queryset includes the databases and tables, the queries, and the results.

   For more information on KQL Queryset, see [Query data in the KQL queryset](../real-time-analytics/kusto-query-set.md)

## Power BI
