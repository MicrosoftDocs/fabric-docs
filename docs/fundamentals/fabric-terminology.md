---
title: Microsoft Fabric Terminology
description: Learn the definitions of terms used in Microsoft Fabric, including terms specific to Fabric Data Engineering, Fabric Data Factory, Fabric Data Science, Fabric Data Warehouse, Fabric IQ, Fabric Real-Time Intelligence, and Power BI.
author: SnehaGunda
ms.author: sngun
ms.reviewer: kgremban
ms.topic: glossary
ms.search.form: product-trident
ms.date: 05/27/2026
ai-usage: ai-assisted
#customer intent: As a Microsoft Fabric user, I want to learn about Fabric terms so that I can understand and use Fabric workloads effectively.
---

# Fabric terminology

Learn the definitions of terms used in Fabric, including terms specific to each Fabric workload.

## General terms

The following terms apply across all Fabric workloads.

#### Capacity

A *capacity* is a dedicated set of resources that you can use at a given time. Capacity defines the ability of a resource to perform an activity or to produce output. Different items consume different capacity at a certain time. Fabric offers capacity through the Fabric SKU and Trials. For more information, see [What is capacity?](../enterprise/licenses.md#capacity)

#### Capacity units (CUs)

*Capacity units* are the unit of compute measurement in Fabric. All workloads and operations consume capacity units from your available Fabric capacity. Consumption is classified as interactive or background operations. For more information, see [Fabric operations](../enterprise/fabric-operations.md).

#### Delta Lake

A Delta Lake is the standard table format across all Fabric workloads. When you ingest data into Fabric, it's stored as Delta tables by default. For more information, see [Delta Lake table format interoperability](delta-lake-interoperability.md).

#### Direct Lake

Direct Lake is a storage mode in Fabric that lets semantic models read Delta tables directly from OneLake without importing data or using DirectQuery. Direct Lake combines the performance of import mode with the data freshness of DirectQuery. For more information, see [Direct Lake overview](direct-lake-overview.md).

#### Domain

A domain lets your organization group workspaces into logical business areas, such as "Finance" or "Marketing." Domains help Fabric administrators delegate management and apply governance policies above the workspace level. For more information, see [Domains](../governance/domains.md).

#### Item

An *item* is an object in Fabric, such as a lakehouse, notebook, warehouse, or eventhouse. Each Fabric workload includes different item types. For example, the Data Engineering workload includes the lakehouse, notebook, and Spark job definition items.

#### Semantic model

A semantic model is a metadata layer in Fabric that defines tables, relationships, measures, and data connections. Semantic models are the data source for Power BI reports, dashboards, and other analytics experiences in Fabric. For more information, see [Create and manage semantic models](/power-bi/connect-data/service-datasets-understand).

#### Tenant

A *tenant* is a single instance of Fabric for an organization, aligned with a Microsoft Entra tenant.

#### Workload

A *workload* is a collection of capabilities targeted to a specific functionality. The Fabric workloads include Data Engineering, Data Factory, Data Science, Data Warehouse, Databases, Industry Solutions, Real-Time Intelligence, Fabric IQ, and Power BI.

#### Workspace

A *workspace* is a collection of items that brings together different functionality in a single environment designed for collaboration. It acts as a container that uses capacity for the work that is executed, and provides controls for who can access the items in it. For example, in a workspace, users create reports, notebooks, and semantic models. For more information, see [Workspaces](workspaces.md).

---

<a id="synapse-data-engineering"></a>

## Data Engineering

The Data Engineering workload provides tools for large-scale data processing and transformation by using Apache Spark.

#### Apache Spark job

An *Apache Spark job* is part of a Spark application that runs in parallel with other jobs in the application. A job consists of multiple tasks. For more information, see [Spark job monitoring](../data-engineering/spark-monitor-debug.md).

#### Apache Spark job definition

An *Apache Spark job definition* is a set of parameters that indicates how a Spark application should be run. It allows you to submit batch or streaming jobs to the Spark cluster. For more information, see [What is an Apache Spark job definition?](../data-engineering/spark-job-definition.md)

#### Lakehouse

A *lakehouse* is a database built over a data lake, containing files, folders, and tables. A lakehouse is used by the Apache Spark engine and SQL engine for big data processing. Lakehouses support ACID transactions when using the open-source Delta formatted tables. The lakehouse item is hosted within a unique workspace folder in [Microsoft OneLake](../onelake/onelake-overview.md). It contains files in various formats (structured and unstructured) organized in folders and subfolders. For more information, see [What is a lakehouse?](../data-engineering/lakehouse-overview.md)

#### Notebook

A *notebook* is a multi-language interactive programming tool that supports authoring code and markdown, running and monitoring Spark jobs, viewing results, and collaborating with team members. You can use notebooks to explore and process data and to build machine learning experiments. A notebook can be transformed into a pipeline activity for orchestration.

#### Spark application

A *Spark application* is a program written by a user using one of Spark's API languages (Scala, Python, Spark SQL, or Java) or Microsoft-added languages (.NET with C# or F#). When an application runs, it's divided into one or more Spark jobs that run in parallel to process the data faster. For more information, see [Spark application monitoring](../data-engineering/spark-detail-monitoring.md).

#### V-order

*V-order* is a write optimization to the parquet file format that enables fast reads. All Fabric engines write v-ordered parquet files by default.

---

## Data Factory

The Data Factory workload provides data integration and orchestration capabilities, including pipelines, dataflows, and connectors for moving and transforming data.

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

The Data Science workload provides tools for building, training, and deploying machine learning models within the Fabric platform.

#### Data Wrangler

*Data Wrangler* is a notebook-based tool for exploratory data analysis. It combines a grid-like data display with dynamic summary statistics and a set of common data-cleansing operations. Each operation generates code that you can save back to the notebook as a reusable script.

#### Experiment

An *experiment* is the primary unit of organization and control for all related machine learning runs. For more information, see [Machine learning experiments in Fabric](../data-science/machine-learning-experiment.md).

#### Model

A *model* is a machine learning file trained to recognize certain types of patterns. You train a model over a set of data, and you provide it with an algorithm that it uses to reason over and learn from that data set. For more information, see [Machine learning model](../data-science/machine-learning-model.md).

#### Run

A *run* corresponds to a single execution of model code. In [MLflow](https://mlflow.org/), tracking is based on experiments and runs.

---

<a id="synapse-data-warehouse"></a>

## Data Warehouse

The Data Warehouse workload provides enterprise data warehousing with full T-SQL capabilities for structured data storage and analysis.

#### SQL analytics endpoint

A *SQL analytics endpoint* is a feature that you use to run T-SQL queries against your data for analysis and insights. SQL analytics endpoints are available for lakehouses, mirrored databases, and SQL databases in Fabric. For more information, see [SQL analytics endpoint](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse).

#### Warehouse

A *warehouse* is an item that functions as a traditional data warehouse and supports the full transactional T-SQL capabilities you expect from an enterprise data warehouse. For more information, see [Data Warehouse](../data-warehouse/data-warehousing.md#fabric-data-warehouse).

---

## Databases

The Databases workload provides transactional database capabilities within Fabric, including SQL database in Fabric and Cosmos DB in Fabric.

#### Cosmos DB in Fabric

*Cosmos DB in Fabric* is a NoSQL database in Fabric based on Azure Cosmos DB for building applications that require low-latency data access. For more information, see [Cosmos DB in Fabric](../database/cosmos-db/overview.md).

#### SQL database in Fabric

A *SQL database in Fabric* is a transactional database based on Azure SQL Database that you use to create your operational database in Fabric. For more information, see [SQL database in Fabric](../database/sql/overview.md).

---

## Fabric IQ

The Fabric IQ (preview) workload provides tools for defining and managing business semantics across data, models, and systems.

#### Ontology

An *ontology* is an item where you can define entity types, relationships, properties, and other constraints to organize data according to your business vocabulary. For more information, see [What is ontology (preview)?](../iq/ontology/overview.md)

#### Plan

A *plan* is a unified no-code platform for collaborative planning, reporting, analytics, data integration, and management. For more information, see [What is plan (preview)?](../iq/plan/overview.md)

---

## OneLake

OneLake is Fabric's unified, multicloud data lake that serves as the single storage layer for all Fabric workloads. For more information, see [What is OneLake?](../onelake/onelake-overview.md)

#### Data sharing (cross-tenant)

*Data sharing* is a OneLake feature that you can use to share live, governed datasets across Microsoft Entra tenants without copying data.

#### Mirroring

*Mirroring* is the process of copying data from an external source into Fabric to create a mirrored database or catalog. For more information, see [What is mirroring?](../mirroring/overview.md)

#### OneLake security

*OneLake security* is the security model that OneLake uses to manage access and permissions for data stored in Fabric. For more information, see [Get started with OneLake security](../onelake/security/get-started-onelake-security.md). External recipients access shared data in place, and all governance policies remain enforced at the source. For more information, see [External data sharing](../governance/external-data-sharing-overview.md).

#### Shortcut

A *shortcut* is an embedded reference within OneLake that points to another file store location. Shortcuts enable access to external operational data sources without copying data or building ETL pipelines. You can combine shortcuts with OneLake data sharing for cross-tenant governed access to shared datasets. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

---

## Power BI

Power BI provides business intelligence capabilities for creating interactive reports, dashboards, and data visualizations.

For specific Power BI terminology, see [Glossary of the Power BI service](/power-bi/explore-reports/end-user-glossary).

---

## Real-Time hub

Real-Time hub is the centralized location in Fabric for discovering and managing real-time data streams across your organization. Every Fabric tenant automatically includes the hub. For more information, see [Real-Time hub overview](../real-time-hub/real-time-hub-overview.md).

#### Data stream

A *data stream* is a continuously flowing data source that appears in Real-Time hub. Data streams include stream outputs from eventstreams and tables from KQL databases. They appear automatically in the hub for any user with access.

#### Fabric event

A *Fabric event* is an event generated by a Fabric or Azure resource, such as a workspace item change, a job completion, or an Azure Blob Storage update. You can subscribe to Fabric events to trigger downstream actions like pipeline runs or notifications. For more information, see [Introduction to Azure and Fabric events](../real-time-hub/fabric-events-overview.md).

---

## Real-Time Intelligence

The Real-Time Intelligence workload provides tools for ingesting, processing, and analyzing real-time data streams.

#### Activator

An *activator* is a no-code, low-code item that you use to create alerts, triggers, and actions on your data streams. For more information, see [Activator](../real-time-intelligence/data-activator/activator-introduction.md).

#### Anomaly detector

An *anomaly detector* is an item that detects anomalies in eventhouse tables and sets alerts. For more information, see [Anomaly detection (preview)](../real-time-intelligence/anomaly-detection.md?tabs=eventhouse).

#### Digital twin builder

A *digital twin builder* is an item that creates digital representations of real-world environments to optimize physical operations using data. For more information, see [What is digital twin builder (preview)?](../real-time-intelligence/digital-twin-builder/overview.md)

#### Event schema set

An *event schema set* is an item that organizes one or more related schemas into schema sets, enabling logical grouping and centralized access control. You can manage who can view, edit, or modify schemas at the group level, making it easier to govern schema usage across teams or projects. For more information, see [Schema registry overview (preview)](../real-time-intelligence/schema-sets/schema-registry-overview.md).

#### Eventhouse

An *eventhouse* is an item for storing and analyzing large volumes of data, particularly in scenarios that require real-time analytics. Eventhouses support real-time data streams, so you can ingest, process, and analyze data with low latency. A single workspace can hold multiple eventhouses, an eventhouse can hold multiple KQL databases, and each database can hold multiple tables. For more information, see [Eventhouse overview](../real-time-intelligence/eventhouse.md).

#### Eventstream

An *eventstream* is an item that provides a centralized place in the Fabric platform to capture, transform, and route real-time events to destinations with a no-code experience. An eventstream consists of various streaming data sources, ingestion destinations, and an event processor when the transformation is needed. For more information, see [Fabric eventstreams](../real-time-intelligence/event-streams/overview.md).

#### KQL database

A *KQL database* is an item that holds data in a format that you can execute KQL queries against. KQL databases are items under an eventhouse. For more information, see [KQL database](../real-time-intelligence/create-database.md).

#### KQL queryset

A *KQL queryset* is the item used to run queries, view results, and manipulate query results on data from your Data Explorer database. The queryset includes the databases and tables, the queries, and the results. The KQL queryset allows you to save queries for future use, or export and share queries with others. For more information, see [Query data in the KQL Queryset](../real-time-intelligence/kusto-query-set.md).

#### Map

A *map* is an item that visualizes real-time and historical location data in Fabric, helping you monitor live events, analyze spatial patterns, and understand geographic context alongside time-based insights. For more information, see [About Fabric maps](../real-time-intelligence/map/about-fabric-maps.md).

#### Operations agent

An *operations agent* is an item that monitors real-time data, tracks key metrics, and recommends actions based on defined business rules. Each operations agent is a dedicated Fabric item designed for a specific business process. For more information, see [Operations agent (preview)](../real-time-intelligence/operations-agent.md).

#### Real-time dashboard

A *real-time dashboard* is an item for monitoring and visualizing streaming data. You can use a real-time dashboard to ingest, query, and display data with low latency. For more information, see [Real-time dashboards overview](../real-time-intelligence/real-time-dashboards-overview.md).

---

## Workload Development Kit

The Workload Development Kit (WDK) enables partners and developers to build, validate, and publish custom workloads that extend the Fabric platform.

#### Extensibility Toolkit

The *Extensibility Toolkit* is the modern evolution of the Workload Development Kit. It provides an SDK and starter kit for building custom workloads that integrate into Fabric. For more information, see [Fabric Extensibility Toolkit](../extensibility-toolkit/extensibility-toolkit-overview.md).

#### Workload Hub

The *Workload Hub* is the central place in Fabric where users discover, add, and manage custom workloads at the tenant, capacity, or workspace level. For more information, see [How to consume workloads](../extensibility-toolkit/consume-workloads.md).
