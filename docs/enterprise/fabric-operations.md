---
title: Fabric operations
description: Understand the Microsoft Fabric operations.
author: JulCsc
ms.author: juliacawthra
ms.topic: conceptual
ms.custom:
ms.date: 06/17/2025
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Fabric operations

Each experience within Microsoft Fabric supports unique operations. An operation's consumption rate is what converts the usage of the experience's raw metrics into Compute Units (CU).

The Microsoft Fabric Capacity Metrics app's [compute page](metrics-app-compute-page.md) provides an overview of your capacity's performance and lists Fabric operations that consume compute resources.  

This article lists these operations by experience, and explains how they consume resources within Fabric.

## Interactive and background operations

Microsoft Fabric divides operations into two types, *interactive* and *background*. This article lists these operations and explains the difference between them.

### Interactive operations

On-demand requests and operations that can be triggered by user interactions with the UI, such as data model queries generated by report visuals, are classified as *interactive* operations. They're usually triggered by user interactions with the UI. For example, an interactive operation is triggered when a user opens a report or selects a slicer in a Power BI report. Interactive operations can also be triggered without interacting with the UI, for example when using SQL Server Management Studio (SSMS) or a custom application to run a DAX query.

### Background operations

Longer running operations such as semantic model or dataflow refreshes are classified as *background* operations. They can be triggered manually by a user, or automatically without user interaction. Background operations include scheduled refreshes, interactive refreshes, REST-based refreshes and XMLA-based refresh operations. Users aren't expected to wait for these operations to finish. Instead, they might come back later to check the status of the operations.

## How to read this document

Each experience has a table that lists its operations, with the following columns:

* **Operation** – The name of the operation. Visible in the [Microsoft Fabric Capacity Metrics app](metrics-app.md).

* **Description** – A description of the operation.

* **Item** – The item that this operation can apply to. Visible in the [Microsoft Fabric Capacity Metrics app](metrics-app.md).

* **Azure billing meter** – The name of the meter on your Azure bill that shows usage for this operation.

* **Type** – Lists the type of the operation. Operations are classified as [interactive](#interactive-operations) or [background](#background-operations) operations.

When more details regarding the consumption rate are available, a link to the document with this information is provided.

## Fabric operations by experience

This section is divided into Fabric experience. Each experience had a table that lists its operations.

>[!IMPORTANT]
>Consumption rates are subject to change at any time. Microsoft will use reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft's [Release Notes](https://aka.ms/fabricrm) or [Microsoft Fabric blog](https://blog.fabric.microsoft.com/blog/). If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers might use the cancellation options available for the chosen payment method.

### Copilot in Fabric

[Copilot](../fundamentals/copilot-fabric-overview.md) operations are listed in this table. You can find the consumption rates for Copilot in [Copilot consumption](../fundamentals/copilot-fabric-consumption.md).

| Operation                                        | Description                                                        | Item          | Azure billing meter         | Type       |
| ------------------------------------------------ | ------------------------------------------------------------------ | ------------- | --------------------------- | ---------- |
| Copilot in Fabric                            | Compute cost associated with input prompts and output completion      | Multiple | Copilot and AI | Background |

### Data agent in Fabric

[Data agent](../data-science/concept-data-agent.md) operations are listed in this table. In the metrics app's [matrix by item and operation table](metrics-app-compute-page.md), Data agent operations are listed under the *LlmPlugin* item kind.

You can find the consumption rates for the Data agent in [Data agent consumption](../fundamentals/copilot-fabric-consumption.md).

| Operation                                        | Description                                                        | Item          | Azure billing meter         | Type       |
| ------------------------------------------------ | ------------------------------------------------------------------ | ------------- | --------------------------- | ---------- |
| AI query                            | Compute cost associated with input prompts and output completion      | LlmPlugin | Copilot and AI| Background |

### Data Factory

The Data Factory experience contains operations for [Dataflows Gen2](#dataflows-gen2) and [Pipelines](#pipelines).

#### Dataflows Gen2

You can find the consumption rates for Dataflows Gen2 in [Dataflow Gen2 pricing for Data Factory in Microsoft Fabric](../data-factory/pricing-dataflows-gen2.md).

| Operation                                        | Description                                                        | Item          | Azure billing meter         | Type       |
| ------------------------------------------------ | ------------------------------------------------------------------ | ------------- | --------------------------- | ---------- |
| Dataflow Gen2 Refresh                            | Compute cost associated with dataflow Gen2 refresh operation       | Dataflow Gen2 | Dataflows Standard Compute Capacity Usage CU | Background |
| High Scale Dataflow Compute - SQL Endpoint Query | Usage related to the dataflow Gen2 staging warehouse SQL endpoint  | Warehouse     | High Scale Dataflow Compute Capacity Usage CU | Background |

#### Pipelines

You can find the consumption rates for Pipelines in [Data pipelines pricing for Data Factory in Microsoft Fabric](../data-factory/pricing-pipelines.md).

| Operation    | Description                                                                                                              | Item     | Azure billing meter | Type       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | -------- | ------------------- | ---------- |
| DataMovement | The amount of time used by the copy activity in a Data Factory pipeline divided by the number of data integration units  | Pipeline | Data Movement Capacity Usage CU | Background |
| ActivityRun  | A Data Factory data pipeline activity execution                                                                          | Pipeline | Data Orchestration Capacity Usage CU | Background |

### Databases

One Fabric capacity unit = 0.383 SQL database vCores.
 
| Operation | Description | Item | Azure Billing Meter | Type |
|-----------|-------------|------|---------------------|------|
| SQL Usage | Compute for all user-generated and system-generated SQL queries, modifications, and data processing operations within a database | Database | SQL database in Microsoft Fabric Capacity Usage CU | Interactive |
| Allocated SQL Storage | The dynamically allocated storage space for a SQL database in Fabric, used for storing tables, indexes, transaction logs, and metadata. Fully integrated with OneLake. | Database | SQL Storage Data Stored | Background |

### Data Warehouse

One Fabric Data Warehouse core (unit of compute for Data Warehouse) is equivalent to two Fabric Capacity Units (CUs).

| Operation          | Description                                                                                        | Item      | Azure billing meter | Type       |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------- | ------------------- | ---------- |
| Warehouse Query    | Compute charge for all user generated and system generated T-SQL statements within a Warehouse     | Warehouse | Data Warehouse Capacity Usage CU      | Background |
| SQL Endpoint Query | Compute charge for all user generated and system generated T-SQL statements within the SQL analytics endpoint of a Lakehouse  | Warehouse | Data Warehouse Capacity Usage CU     | Background |

### Fabric API for GraphQL

GraphQL operations are made up of requests performed on API for GraphQL items by API clients. Each GraphQL request and response operation processing time is reported in Capacity Units (CUs) in seconds at the rate of ten CUs per hour.

| Operation          | Description                                                                                        | Item      | Azure billing meter | Type       |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------- | ------------------- | ---------- |
| Query    | Compute charge for all generated GraphQL queries (reads) and mutations (writes) by clients within a GraphQL API     | GraphQL | API for GraphQL Query Capacity Usage CU      | Interactive |

### Fabric User Data Functions

[Fabric User Data Functions](https://aka.ms/ms-fabric-functions-docs) operations are made up of requests initiated by the Fabric portal, other Fabric artifacts, or client applications. Each operation incurs a charge for the function execution, internal storage of the function metadata in OneLake, and associated read and write operations in OneLake.

| Operation          | Description                                                                                        | Item      | Azure billing meter | Type       |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------- | ------------------- | ---------- |
| User Data Functions Execution    | Compute charge for the execution of the function inside of the User Data Functions item. This operation results from running a function after a request from the Fabric portal, another Fabric item, or an external application.  | User Data Functions | User Data Function Execution (CU/s)  | Interactive |
| User Data Functions Static Storage | Static storage of internal function metadata in a service-managed OneLake account. This is calculated with the compressed size of the User Data Functions item metadata. This is the cost of creating User Data Functions items even if they’re not used.  | OneLake Storage | OneLake Storage | Background |
| User Data Functions Static Storage Read | Read operation of internal function metadata stored in a service-managed OneLake account. This operation is executed every time a function is executed after a period of inactivity. | OneLake Read Operations | OneLake Read Operations | Background |
| User Data Functions Static Storage Write | Writes and updates of internal function metadata stored in a system-managed OneLake account. This operation is executed every time the User Data Functions item is published. | OneLake Write Operations | OneLake Write Operations | Background |
| User Data Functions Static Storage Iterative Read | Read operations for internal function metadata stored in a service-managed OneLake account. This operation is executed every time the User Data Functions are listed. | OneLake Iterative Read Operations | OneLake Iterative Read Operations | Background |
| User Data Functions Static Storage Other Operations | Storage operations for related to various function metadata in a service-managed OneLake account. | OneLake Other Operations | OneLake Other Operations | Background |

### ML Model Endpoint

[ML Model endpoint docs](../data-science/model-endpoints.md) allow you to serve real-time predictions seamlessly. Behind the scenes, Fabric spins up and manages the underlying container infrastructure to host your model.

| Operation                                        | Description                                                        | Item          | Azure billing meter         | Type       |
| ------------------------------------------------ | ------------------------------------------------------------------ | ------------- | --------------------------- | ---------- |
| Model Endpoint                            | TBD      | ML model | ML Model Endpoint Capacity Usage CU | Background |

### OneLake

One Lake compute operations represent the transactions performed on One Lake items. The consumption rate for each operation varies depending on its type. For more details, refer to [One Lake consumption](../onelake/onelake-consumption.md).

| Operation                                  | Description                                | Item       | Azure Billing Meter                             | Type       |
| ------------------------------------------ | ------------------------------------------ | ---------- | ----------------------------------------------- | ---------- |
| OneLake Read via Redirect                  | OneLake Read via Redirect                   | Multiple | OneLake Read Operations  Capacity Usage CU                         | Background |
| OneLake Read via Proxy                     | OneLake Read via Proxy                      | Multiple | OneLake Read Operations via API Capacity Usage CU                 | Background |
| OneLake Write via Redirect                 | OneLake Write via Redirect                  | Multiple | OneLake Write Operations  Capacity Usage CU                        | Background |
| OneLake Write via Proxy                    | OneLake Write via Proxy                     | Multiple | OneLake Write Operations via API Capacity Usage CU              | Background |
| OneLake Iterative Write via Redirect       | OneLake Iterative Write via Redirect        | Multiple | OneLake Iterative Write Operations              | Background |
| OneLake Iterative Read via Redirect        | OneLake Iterative Read via Redirect         | Multiple | OneLake Iterative Read Operations Capacity Usage CU              | Background |
| OneLake Other Operations                   | OneLake Other Operations                    | Multiple | OneLake Other Operations Capacity Usage CU                       | Background |
| OneLake Other Operations via Redirect      | OneLake Other Operations via Redirect       | Multiple | OneLake Other Operations via API Capacity Usage CU             | Background |
| OneLake Iterative Write via Proxy          | OneLake Iterative Write via Proxy           | Multiple | OneLake Iterative Write Operations via API Capacity Usage CU    | Background |
| OneLake Iterative Read via Proxy           | OneLake Iterative Read via Proxy            | Multiple | OneLake Iterative Read Operations via API Capacity Usage CU      | Background |
| OneLake BCDR Read via Proxy                | OneLake BCDR Read via Proxy                 | Multiple | OneLake BCDR Read Operations via API Capacity Usage CU        | Background |
| OneLake BCDR Write via Proxy               | OneLake BCDR Write via Proxy                | Multiple | OneLake BCDR Write Operations via API Capacity Usage CU        | Background |
| OneLake BCDR Read via Redirect             | OneLake BCDR Read via Redirect              | Multiple | OneLake BCDR Read Operations Capacity Usage CU             | Background |
| OneLake BCDR Write via Redirect            | OneLake BCDR Write via Redirect             | Multiple | OneLake BCDR Write Operations Capacity Usage CU               | Background |
| OneLake BCDR Iterative Read via Proxy      | OneLake BCDR Iterative Read via Proxy       | Multiple | OneLake BCDR Iterative Read Operations via API Capacity Usage CU | Background |
| OneLake BCDR Iterative Read via Redirect   | OneLake BCDR Iterative Read via Redirect    | Multiple | OneLake BCDR Iterative Read Operations Capacity Usage CU     | Background |
| OneLake BCDR Iterative Write via Proxy     | OneLake BCDR Iterative Write via Proxy      | Multiple | OneLake BCDR Iterative Write Operations via API Capacity Usage CU | Background |
| OneLake BCDR Iterative Write via Redirect  | OneLake BCDR Iterative Write via Redirect   | Multiple | OneLake BCDR Iterative Write Operations Capacity Usage CU    | Background |
| OneLake BCDR Other Operations              | OneLake BCDR Other Operations               | Multiple | OneLake BCDR Other Operations Capacity Usage CU       | Background |
| OneLake BCDR Other Operations Via Redirect | OneLake BCDR Other Operations Via Redirect  | Multiple | OneLake BCDR Other Operations via API Capacity Usage CU    | Background |

### Power BI

The usage for each operation is reported in CU processing time in seconds. Eight CUs are equivalent to one Power BI v-core.

>[!NOTE]
>The term *Semantic model* replaces the term *dataset*. You may still see the old term in the UI until it is completely replaced.
>
>
> We currently don't bill for R/Py visuals in Power BI.

| Operation | Description | Item | Azure billing meter | Type |
|--|--|--|--|--|
| Artificial intelligence (AI) | AI function evaluation  | AI | Power BI Capacity Usage CU | Interactive |
| Background query | Queries for refreshing tiles and creating report snapshots  | Semantic model | Power BI Capacity Usage CU | Background |
| [Dataflow DirectQuery](/power-bi/transform-model/dataflows/dataflows-directquery) | Connect directly to a dataflow without the need to import the data into a semantic model  | Dataflow Gen1 | Power BI Capacity Usage CU | Interactive |
| [Dataflow refresh](/power-bi/transform-model/dataflows/dataflows-understand-optimize-refresh) | An on-demand or scheduled background dataflow refresh, performed by the service or with REST APIs. | Dataflow Gen1 | Power BI Capacity Usage CU | Background |
| Semantic model on-demand refresh | A background semantic model refresh initiated by the user, using the service, REST APIs, or public XMLA endpoints  | Semantic model | Power BI Capacity Usage CU | Background |
| Semantic model scheduled refresh | A scheduled background semantic model refresh, performed by the service, REST APIs, or public XMLA endpoints  | Semantic model | Power BI Capacity Usage CU | Background |
| Full report email subscription | A PDF or PowerPoint copy of an entire Power BI report, attached to an [email subscription](/power-bi/collaborate-share/end-user-subscribe)  | Report | Power BI Capacity Usage CU | Background |
| Interactive query | Queries initiated by an on-demand data request. For example, loading a model when opening a report, user interaction with a report, or querying a dataset before rendering. Loading a semantic model might be reported as a standalone interactive query operation. | Semantic model | Power BI Capacity Usage CU | Interactive |
| PublicApiExport | A Power BI report exported with the [export report to file](/power-bi/developer/embedded/export-to) REST API | Report | Power BI Capacity Usage CU | Background |
| Render | A Power BI paginated report exported with the [export paginated report to file](/power-bi/developer/embedded/export-paginated-report) REST API  | Paginated report | Power BI Capacity Usage CU | Background |
| Render | A Power BI paginated report viewed in Power BI service   | Paginated report | Power BI Capacity Usage CU | Interactive |
| Web modeling read | A data model read operation in the semantic model web modeling user experience  | Semantic model | Power BI Capacity Usage CU | Interactive |
| Web modeling write | A data model write operation in the semantic model web modeling user experience  | Semantic model | Power BI Capacity Usage CU | Interactive |
| XMLA read | XMLA read operations initiated by the user, for queries and discoveries  | Semantic model | Power BI Capacity Usage CU | Interactive |
| XMLA write | A background XMLA write operation that changes the model  | Semantic model | Power BI Capacity Usage CU | Background |
| Power BI scripting visual execution | R and Py visuals run triggered by rendering Power BI report |Power BI scripting report | Spark memory optimized capacity (CU) | Interactive |

### Real-Time Intelligence

The Real-Time Intelligence experience contains operations for [Azure and Fabric events](#azure-and-fabric-events), [digital twin builder (preview)](#digital-twin-builder-preview), [Eventstream](#eventstream), and [KQL Database and KQL Queryset](#kql-database-and-kql-queryset).

#### Azure and Fabric events

You can find the consumption rates for Azure and Fabric events in [Azure and Fabric events capacity consumption](../real-time-hub/fabric-events-capacity-consumption.md).

| Operation        | Description                                          | Item     | Azure billing meter                               | Type       |
| ---------------- | ---------------------------------------------------- | -------- | ------------------------------------------------- | ---------- |
| Event Operations | Publish, delivery, and filtering operations          | Multiple | Real-Time Intelligence - Event Operations         | Background |
| Event Listener   | Uptime of the event listener                         | Multiple | Real-Time Intelligence – Event Listener and Alert | Background |

#### Digital twin builder (preview)

You can find the consumption rates for digital twin builder (preview) in [Digital twin builder (preview) capacity consumption, usage reporting, and billing](../real-time-intelligence/digital-twin-builder/resources-capacity-usage.md).

>[!NOTE]
> The meters for digital twin builder are currently in preview and may be subject to change.

| Operation        | Description                 | Item     | Azure billing meter              | Type       |
| ---------------- | --------------------------- | -------- | -------------------------------- | ---------- |
| Digital Twin Builder Operation | Usage for on-demand and scheduled digital twin builder flow operations.  | Digital twin builder flow | Digital Twin Builder Operation Capacity Usage CU | Background |

#### Eventstream

You can find the consumption rates for Eventstream in [Monitor capacity consumption for Microsoft Fabric Eventstream](../real-time-intelligence/event-streams/monitor-capacity-consumption.md).

[!INCLUDE [operation-types](../real-time-intelligence/event-streams/includes/operation-types.md)]

#### KQL Database and KQL Queryset

You can find the consumption rates for KQL Database in [KQL Database consumption](../real-time-intelligence/kql-database-consumption.md).

| Operation         | Description                                          | Item                         | Azure billing meter | Type        |
| ----------------- | ---------------------------------------------------- | ---------------------------- | ------------------- | ----------- |
| Eventhouse UpTime | Measure of the time that Eventhouse is Active        | Eventhouse  | Eventhouse Capacity Usage CU         | Background  |

### Spark

Two Spark VCores (a unit of computing power for Spark) equals one capacity unit (CU). To understand how Spark operations consume CUs, refer to [spark pools](../data-engineering/spark-compute.md#spark-pools).

| Operation               | Description                                                     | Item                 | Azure billing meter | Type       |
| ----------------------- | --------------------------------------------------------------- | -------------------- | ------------------- | ---------- |
| Lakehouse operations    | Users preview table in the Lakehouse explorer                   | Lakehouse            | Spark Memory Optimized Capacity Usage CU          | Background |
| Lakehouse table load    | Users load delta table in the Lakehouse explorer                | Lakehouse            | Spark Memory Optimized Capacity Usage CU          | Background |
| Notebook run            | Notebook run manually by users                         | Notebook     | Spark Memory Optimized Capacity Usage CU          | Background |
| Notebook HC run         | Notebook run under the high concurrency Spark session  | Notebook     | Spark Memory Optimized Capacity Usage CU          | Background |
| Notebook scheduled run  | Notebook run triggered by notebook scheduled events    | Notebook     | Spark Memory Optimized Capacity Usage CU          | Background |
| Notebook pipeline run   | Notebook run triggered by pipeline                     | Notebook     | Spark Memory Optimized Capacity Usage CU         | Background |
| Notebook VS Code run    | Notebook runs in VS Code.                               | Notebook     | Spark Memory Optimized Capacity Usage CU          | Background |
| Spark job run           | Spark batch job runs initiated by user submission               | Spark Job Definition | Spark Memory Optimized Capacity Usage CU          | Background |
| Spark job scheduled run | Batch job runs triggered by notebook scheduled events   | Spark Job Definition | Spark Memory Optimized Capacity Usage CU          | Background |
| Spark job pipeline run  | Batch job runs triggered by pipeline                    | Spark Job Definition | Spark Memory Optimized Capacity Usage CU          | Background |
| Spark job VS Code run   | Spark job definition submitted from VS Code             | Spark Job Definition | Spark Memory Optimized Capacity Usage CU          | Background |
| Materialized lake view run |  Users schedule Materialized lake view runs        | Lakehouse | Spark Memory Optimized Capacity Usage CU          | Background |
| Shortcut Transformations   | Shortcut Transformations created in the Lakehouse             | Lakehouse | Spark Memory Optimized Capacity Usage CU          | Background |

## Related content

* [What is the Microsoft Fabric Capacity Metrics app?](metrics-app.md)

* [Understand the metrics app compute page](metrics-app-compute-page.md)
