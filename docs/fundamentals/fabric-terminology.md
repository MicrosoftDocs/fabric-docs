---
title: Microsoft Fabric Terminology
description: Learn the definitions of terms used in Microsoft Fabric, including terms specific to Fabric Data Engineering, Fabric Data Factory, Fabric Data Science, Fabric Data Warehouse, Fabric IQ, Fabric Real-Time Intelligence, and Power BI.
author: SnehaGunda
ms.author: sngun
ms.reviewer: kgremban
ms.topic: glossary
ms.search.form: product-trident
ms.date: 05/08/2026
ai-usage: ai-assisted
#customer intent: As a Microsoft Fabric user, I want to learn about Fabric terms so that I can understand and use Fabric workloads effectively.
---

# Microsoft Fabric terminology

Learn the definitions of terms used in Microsoft Fabric, including terms specific to each Fabric workload.

## General terms

The following terms apply across all Fabric workloads.

#### Capacity

A *capacity* is a dedicated set of resources that you can use at a given time. Capacity defines the ability of a resource to perform an activity or to produce output. Different items consume different capacity at a certain time. Fabric offers capacity through the Fabric SKU and Trials. For more information, see [What is capacity?](../enterprise/licenses.md#capacity)

#### Capacity units (CUs)

Capacity units are the unit of compute measurement in Fabric. All workloads and operations consume capacity units from your available Fabric capacity. Consumption is classified as interactive or background operations. For more information, see [Fabric operations](../enterprise/fabric-operations.md).

#### Item

An *item* is an object that users create in Fabric, such as a lakehouse, notebook, warehouse, or eventhouse. Each item type provides different capabilities depending on its workload. For example, the Data Engineering workload includes the lakehouse, notebook, and Spark job definition items.

#### Mirroring

*Mirroring* is the process of copying data from an external source into Fabric to create a mirrored database or catalog. For more information, see [What is mirroring?](../mirroring/overview.md)

#### Tenant

A *tenant* is a single instance of Fabric for an organization, aligned with a Microsoft Entra tenant.

#### Workload

A *workload* is a collection of capabilities targeted to a specific functionality. The Fabric workloads include Data Engineering, Data Factory, Data Science, Data Warehouse, Databases, Industry Solutions, Real-Time Intelligence, Fabric IQ, and Power BI. Fabric workloads are sometimes referred to as *experiences*.

#### Workspace

A *workspace* is a collection of items that brings together different functionality in a single environment designed for collaboration. It acts as a container that uses capacity for the work that is executed, and provides controls for who can access the items in it. For example, in a workspace, users create reports, notebooks, and semantic models. For more information, see [Workspaces](workspaces.md).

#### Delta Lake

A Delta Lake is the standard table format across all Fabric workloads. When you ingest data into Fabric, it's stored as Delta tables by default. For more information, see [Delta Lake table format interoperability](delta-lake-interoperability.md).

#### Domain

A domain lets your organization group workspaces into logical business areas, such as "Finance" or "Marketing." Domains help Fabric administrators delegate management and apply governance policies above the workspace level. For more information, see [Domains](../governance/domains.md).

#### Semantic model

A semantic model is a metadata layer in Fabric that defines tables, relationships, measures, and data connections. Semantic models are the data source for Power BI reports, dashboards, and other analytics experiences in Fabric. For more information, see [Create and manage semantic models](/power-bi/connect-data/service-datasets-understand).

#### Direct Lake

Direct Lake is a storage mode in Fabric that lets semantic models read Delta tables directly from OneLake without importing data or using DirectQuery. Direct Lake combines the performance of import mode with the data freshness of DirectQuery. For more information, see [Direct Lake overview](direct-lake-overview.md).

---

<a id="synapse-data-engineering"></a>

## Fabric Data Engineering

Data Engineering provides tools for large-scale data processing and transformation by using Apache Spark.

#### Apache Spark job

An *Apache Spark job* is part of a Spark application that runs in parallel with other jobs in the application. A job consists of multiple tasks. For more information, see [Spark job monitoring](../data-engineering/spark-monitor-debug.md).

#### Apache Spark job definition

An *Apache Spark job definition* is a set of parameters that indicates how a Spark application should be run. It allows you to submit batch or streaming jobs to the Spark cluster. For more information, see [What is an Apache Spark job definition?](../data-engineering/spark-job-definition.md)

#### Lakehouse

A *lakehouse* is a database built over a data lake, containing files, folders, and tables. A lakehouse is used by the Apache Spark engine and SQL engine for big data processing. Lakehouses support ACID transactions when using the open-source Delta formatted tables. The lakehouse item is hosted within a unique workspace folder in [Microsoft OneLake](../onelake/onelake-overview.md). It contains files in various formats (structured and unstructured) organized in folders and subfolders. For more information, see [What is a lakehouse?](../data-engineering/lakehouse-overview.md)

#### Notebook

A *notebook* is a multi-language interactive programming tool with rich functions, which include authoring code and markdown, running and monitoring a Spark job, viewing and visualizing results, and collaborating with the team. It helps data engineers and data scientists explore and process data, and build machine learning experiments with both code and low-code experience. A notebook can be transformed into a pipeline activity for orchestration.

#### Spark application

A *Spark application* is a program written by a user using one of Spark's API languages (Scala, Python, Spark SQL, or Java) or Microsoft-added languages (.NET with C# or F#). When an application runs, it's divided into one or more Spark jobs that run in parallel to process the data faster. For more information, see [Spark application monitoring](../data-engineering/spark-detail-monitoring.md).

#### V-order

*V-order* is a write optimization to the parquet file format that enables fast reads and provides cost efficiency and better performance. All the Fabric engines write v-ordered parquet files by default.

---

## Data Factory

Data Factory provides data integration and orchestration capabilities, including pipelines, dataflows, and connectors for moving and transforming data.

#### Connector

A *connector* is a component in Data Factory that you use to connect to different types of data stores. After you connect, you can transform the data. For more information, see [Connectors](../data-factory/connector-overview.md).

#### Dataflow Gen2

A *Dataflow Gen2* is a low-code interface for ingesting data from hundreds of data sources and transforming your data. Dataflow Gen1 exists in Power BI. Dataflow Gen2 offers extra capabilities compared to Dataflows in Azure Data Factory or Power BI. You can't upgrade from Gen1 to Gen2. For more information, see [Dataflows](../data-factory/dataflows-gen2-overview.md) in the Data Factory overview.

#### Pipeline

A *pipeline* is an item in Data Factory used for orchestrating data movement and transformation. These pipelines are different from the deployment pipelines in Fabric. For more information, see [Pipelines](../data-factory/pipeline-overview.md).

#### Trigger

A *trigger* is an automation capability in Data Factory that initiates pipelines based on specific conditions, such as schedules or data availability.

---

<a id="synapse-data-science"></a>

## Data Science

Data Science provides tools for building, training, and deploying machine learning models within the Fabric platform.

#### Data Wrangler

*Data Wrangler* is a notebook-based tool that provides users with an immersive experience to conduct exploratory data analysis. The feature combines a grid-like data display with dynamic summary statistics and a set of common data-cleansing operations, all available with a few selected icons. Each operation generates code that you can save back to the notebook as a reusable script.

#### Experiment

An *experiment* is the primary unit of organization and control for all related machine learning runs. For more information, see [Machine learning experiments in Microsoft Fabric](../data-science/machine-learning-experiment.md).

#### Model

A *model* is a machine learning file trained to recognize certain types of patterns. You train a model over a set of data, and you provide it with an algorithm that it uses to reason over and learn from that data set. For more information, see [Machine learning model](../data-science/machine-learning-model.md).

#### Run

A *run* corresponds to a single execution of model code. In [MLflow](https://mlflow.org/), tracking is based on experiments and runs.

---

<a id="synapse-data-warehouse"></a>

## Data Warehouse

Data Warehouse provides enterprise data warehousing with full T-SQL capabilities for structured data storage and analysis.

#### Warehouse

A *warehouse* is an item that functions as a traditional data warehouse and supports the full transactional T-SQL capabilities you expect from an enterprise data warehouse. For more information, see [Fabric Data Warehouse](../data-warehouse/data-warehousing.md#fabric-data-warehouse).

#### SQL analytics endpoint

A *SQL analytics endpoint* is a feature that you use to run T-SQL queries against your data for analysis and insights. SQL analytics endpoints are available for lakehouses, mirrored databases, and SQL databases in Fabric. For more information, see [SQL analytics endpoint](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse).

---

## Databases

Databases provides transactional database capabilities within Fabric, including SQL database in Fabric and Cosmos DB in Fabric.

#### SQL database in Fabric

A *SQL database in Fabric* is a transactional database based on Azure SQL Database that you use to create your operational database in Fabric. For more information, see [SQL database in Microsoft Fabric](../database/sql/overview.md).

---

## Fabric IQ

*Fabric IQ* is part of Microsoft IQ, a set of capabilities that form the enterprise intelligence layer of the Microsoft stack. In Microsoft IQ, Fabric IQ works alongside Work IQ and Foundry IQ to provide context for a complete view of your organization. The Fabric IQ piece provides context on business entities and data.

As workload in Fabric, IQ (preview) groups items related to unifying business semantics across data, models, and systems to power intelligent agents and decisions. 

For more information about Fabric IQ, see [Fabric IQ overview](../iq/overview.md).

#### Ontology

An *ontology* (preview) is an item where you can define entity types, relationships, properties, and other constraints to organize data according to your business vocabulary. For more information, see [What is ontology (preview)?](../iq/ontology/overview.md)

#### Plan

A *plan* (preview) is a unified no-code platform for collaborative planning, reporting, analytics, data integration, and management. For more information, see [What is plan (preview)?](../iq/plan/overview.md)

---

## Real-Time Intelligence

Real-Time Intelligence provides tools for ingesting, processing, and analyzing real-time data streams.

#### Activator

An *activator* is a no-code, low-code item that you use to create alerts, triggers, and actions on your data streams. For more information, see [Activator](../real-time-intelligence/data-activator/activator-introduction.md).

#### Digital twin builder

A *digital twin builder* (preview) is an item that creates digital representations of real-world environments to optimize physical operations using data. For more information, see [What is digital twin builder (preview)?](../real-time-intelligence/digital-twin-builder/overview.md)

#### Eventhouse

An *eventhouse* is an item that provides a solution for handling and analyzing large volumes of data, particularly in scenarios requiring real-time analytics and exploration. Eventhouses efficiently handle real-time data streams, which lets organizations ingest, process, and analyze data in near real-time. A single workspace can hold multiple eventhouses, an eventhouse can hold multiple KQL databases, and each database can hold multiple tables. For more information, see [Eventhouse overview](../real-time-intelligence/eventhouse.md).

#### Eventstream

An *eventstream* is an item that provides a centralized place in the Fabric platform to capture, transform, and route real-time events to destinations with a no-code experience. An eventstream consists of various streaming data sources, ingestion destinations, and an event processor when the transformation is needed. For more information, see [Microsoft Fabric eventstreams](../real-time-intelligence/event-streams/overview.md).

#### KQL database

A *KQL database* is an item that holds data in a format that you can execute KQL queries against. KQL databases are items under an eventhouse. For more information, see [KQL database](../real-time-intelligence/create-database.md).

#### KQL queryset

A *KQL queryset* is the item used to run queries, view results, and manipulate query results on data from your Data Explorer database. The queryset includes the databases and tables, the queries, and the results. The KQL queryset allows you to save queries for future use, or export and share queries with others. For more information, see [Query data in the KQL Queryset](../real-time-intelligence/kusto-query-set.md).

---

## Real-Time hub

Real-Time hub is the centralized location in Fabric for discovering and managing real-time data streams across your organization.

#### Real-Time hub

*Real-Time hub* is the single place for all data-in-motion across your entire organization. Every Microsoft Fabric tenant automatically includes the hub. For more information, see [Real-Time hub overview](../real-time-hub/real-time-hub-overview.md).

---

## Power BI

Power BI provides business intelligence capabilities for creating interactive reports, dashboards, and data visualizations.

---

## Workload Development Kit

The Workload Development Kit (WDK) enables partners and developers to build, validate, and publish custom workloads that extend the Fabric platform.

---

## OneLake

OneLake is Fabric's unified, multicloud data lake that serves as the single storage layer for all Fabric workloads. For more information, see [What is OneLake?](../onelake/onelake-overview.md)

#### Data sharing (cross-tenant)

*Data sharing* is a OneLake feature that you can use to share live, governed datasets across Microsoft Entra tenants without copying data.

#### OneLake security

*OneLake security* is the security model that OneLake uses to manage access and permissions for data stored in Fabric. For more information, see [Get started with OneLake security](../onelake/security/get-started-onelake-security.md). External recipients access shared data in place, and all governance policies remain enforced at the source. For more information, see [External data sharing](../governance/external-data-sharing-overview.md).

#### Shortcut

A *shortcut* is an embedded reference within OneLake that points to another file store location. Shortcuts enable access to external operational data sources without copying data or building ETL pipelines. You can combine shortcuts with OneLake data sharing for cross-tenant governed access to shared datasets. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

---

## Related content

- [Navigate to your items from Microsoft Fabric Home page](fabric-home.md)
- [End-to-end tutorials in Microsoft Fabric](end-to-end-tutorials.md)
