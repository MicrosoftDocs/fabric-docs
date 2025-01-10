---
title:  Fabric decision guide - choose a data store
description: Review a reference table and scenarios to choose the most suitable data store for your Microsoft Fabric workloads, ensuring optimal performance.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sngun, scbradl
ms.topic: concept-article
ms.date: 12/19/2024
ms.custom:
  - FY25Q1-Linter
  - ignite-2024
#customer intent: As a data engineer, I want to understand the different data store options and their use cases in Fabric so that I can make an informed decision for my data storage needs.
---

# Microsoft Fabric decision guide: choose a data store

Use this reference guide and the example scenarios to help you choose a data store for your Microsoft Fabric workloads.

## Data store properties

Use this information to compare Fabric data stores such as warehouse, lakehouse, Eventhouse, SQL database, and Power BI datamart, based on data volume, type, developer persona, skill set, operations, and other capabilities. These comparisons are organized into the following two tables:

| Table 1 of 2 | **[Lakehouse](../data-engineering/lakehouse-overview.md)** | **[Warehouse](../data-warehouse/data-warehousing.md)** |  **[Eventhouse](../real-time-intelligence/eventhouse.md)** |
|---|:---:|:---:|:---:|
| **Data volume** | Unlimited | Unlimited | Unlimited |
| **Type of data** |  Unstructured,<br>semi-structured,<br>structured | Structured,<br>semi-structured (JSON) | Unstructured,<br>semi-structured,<br>structured |
| **Primary developer persona** | Data engineer, data scientist | Data warehouse developer, data architect, data engineer, database developer | App developer, data scientist, data engineer |
| **Primary dev skill** | Spark (Scala, PySpark, Spark SQL, R) | SQL | No code, KQL, SQL |
| **Data organized by** | Folders and files, databases, and tables | Databases, schemas, and tables | Databases, schemas, and tables |
| **Read operations** | Spark, T-SQL | T-SQL, Spark\* | KQL, T-SQL, Spark |
| **Write operations** | Spark (Scala, PySpark, Spark SQL, R) | T-SQL | KQL, Spark, connector ecosystem |
| **Multi-table transactions** | No | Yes | Yes, for [multi-table ingestion](/azure/data-explorer/kusto/management/updatepolicy?context=%2Ffabric%2Fcontext%2Fcontext-rta&pivots=fabric#the-update-policy-object) |
| **Primary development interface** | Spark notebooks, Spark job definitions | SQL scripts | KQL Queryset, KQL Database |
| **Security** | RLS, CLS\*\*, [table level](../data-warehouse/sql-granular-permissions.md) (T-SQL), none for Spark | [Object level](../data-warehouse/sql-granular-permissions.md), [RLS](../data-warehouse/column-level-security.md), [CLS](../data-warehouse/column-level-security.md), DDL/DML, [dynamic data masking](../data-warehouse/dynamic-data-masking.md) | RLS |
| **Access data via shortcuts** | Yes | Yes, via SQL analytics endpoint | Yes |
| **Can be a source for shortcuts** |  Yes (files and tables) | Yes (tables) | Yes |
| **Query across items** | Yes | Yes | Yes |
| **Advanced analytics** | Interface for large-scale data processing, built-in data parallelism, and fault tolerance | Interface for large-scale data processing, built-in data parallelism, and fault tolerance | Time Series native elements, full geo-spatial and query capabilities |
| **Advanced formatting support** | Tables defined using PARQUET, CSV, AVRO, JSON, and any Apache Hive compatible file format | Tables defined using PARQUET, CSV, AVRO, JSON, and any Apache Hive compatible file format | Full indexing for free text and semi-structured data like JSON |
| **Ingestion latency**| Available instantly for querying | Available instantly for querying | Queued ingestion, streaming ingestion has a couple of seconds latency | 

\* Spark supports reading from tables using shortcuts, doesn't yet support accessing views, stored procedures, functions etc.

|  Table 2 of 2 | **[Fabric SQL database](../database/sql/overview.md)** |  **[Power BI Datamart](/power-bi/transform-model/datamarts/datamarts-overview)** |
|---|:---:|:---:|
| **Data volume** | 4 TB | Up to 100 GB |
| **Type of data** | Structured,<br>semi-structured,<br>unstructured | Structured |
| **Primary developer persona** | AI developer, App developer, database developer, DB admin | Data scientist, data analyst |
| **Primary dev skill** | SQL | No code, SQL |
| **Data organized by** | Databases, schemas, tables | Database, tables, queries |
| **Read operations** | T-SQL | Spark, T-SQL |
| **Write operations** | T-SQL | Dataflows, T-SQL |
| **Multi-table transactions** | Yes, full ACID compliance | No |
| **Primary development interface** | SQL scripts | Power BI |
| **Security** | Object level, RLS, CLS, DDL/DML, dynamic data masking | Built-in RLS editor |
| **Access data via shortcuts** | Yes | No |
| **Can be a source for shortcuts** | Yes (tables) | No |
| **Query across items** | Yes | No |
| **Advanced analytics** | T-SQL analytical capabilities, data replicated to delta parquet in OneLake for analytics | Interface for data processing with automated performance tuning |
| **Advanced formatting support** | Table support for OLTP, JSON, vector, graph, XML, spatial, key-value | Tables defined using PARQUET, CSV, AVRO, JSON, and any Apache Hive compatible file format |
| **Ingestion latency**| Available instantly for querying |  Available instantly for querying |

\*\* Column-level security available on the Lakehouse through a SQL analytics endpoint, using T-SQL.

## Scenarios

Review these scenarios for help with choosing a data store in Fabric.

### Scenario 1

Susan, a professional developer, is new to Microsoft Fabric. They're ready to get started cleaning, modeling, and analyzing data but need to decide to build a data warehouse or a lakehouse. After review of the details in the previous table, the primary decision points are the available skill set and the need for multi-table transactions.

Susan has spent many years building data warehouses on relational database engines, and is familiar with SQL syntax and functionality. Thinking about the larger team, the primary consumers of this data are also skilled with SQL and SQL analytical tools. Susan decides to use a [**Fabric warehouse**](../data-warehouse/data-warehousing.md), which allows the team to interact primarily with T-SQL, while also allowing any Spark users in the organization to access the data.

Susan creates a new data warehouse and interacts with it using T-SQL just like her other SQL server databases. Most of the existing T-SQL code she has written to build her warehouse on SQL Server will work on the Fabric data warehouse making the transition easy. If she chooses to, she can even use the same tools that work with her other databases, like SQL Server Management Studio. Using the SQL editor in the Fabric portal, Susan and other team members write analytic queries that reference other data warehouses and Delta tables in lakehouses simply by using three-part names to perform cross-database queries.

### Scenario 2

Rob, a data engineer, needs to store and model several terabytes of data in Fabric. The team has a mix of PySpark and T-SQL skills. Most of the team running T-SQL queries are consumers, and therefore don't need to write INSERT, UPDATE, or DELETE statements. The remaining developers are comfortable working in notebooks, and because the data is stored in Delta, they're able to interact with a similar SQL syntax.

Rob decides to use a [**lakehouse**](../data-engineering/lakehouse-overview.md), which allows the data engineering team to use their diverse skills against the data, while allowing the team members who are highly skilled in T-SQL to consume the data.

### Scenario 3

Ash, a citizen developer, is a Power BI developer. They're familiar with Excel, Power BI, and Office. They need to build a data product for a business unit. They know they don't quite have the skills to build a data warehouse or a lakehouse, and those seem like too much for their needs and data volumes. They review the details in the previous table and see that the primary decision points are their own skills and their need for a self service, no code capability, and data volume under 100 GB.

Ash works with business analysts familiar with Power BI and Microsoft Office, and knows that they already have a Premium capacity subscription. As they think about their larger team, they realize the primary consumers of this data are analysts, familiar with no-code and SQL analytical tools. Ash decides to use a [**Power BI datamart**](/power-bi/transform-model/datamarts/datamarts-overview), which allows the team to interact build the capability fast, using a no-code experience. Queries can be executed via Power BI and T-SQL, while also allowing any Spark users in the organization to access the data as well.

### Scenario 4

Daisy is business analyst experienced with using Power BI to analyze supply chain bottlenecks for a large global retail chain. They need to build a scalable data solution that can handle billions of rows of data and can be used to build dashboards and reports that can be used to make business decisions. The data comes from plants, suppliers, shippers, and other sources in various structured, semi-structured, and unstructured formats.

Daisy decides to use an [**Eventhouse**](../real-time-intelligence/eventhouse.md) because of its scalability, quick response times, advanced analytics capabilities including time series analysis, geospatial functions, and fast direct query mode in Power BI. Queries can be executed using Power BI and KQL to compare between current and previous periods, quickly identify emerging problems, or provide geo-spatial analytics of land and maritime routes.

### Scenario 5

Kirby is an application architect experienced in developing .NET applications for operational data. They need a high concurrency database with full ACID transaction compliance and strongly enforced foreign keys for relational integrity. Kirby wants the benefit of automatic performance tuning to simplify day-to-day database management.

Kirby decides on a [**SQL database in Fabric**](../database/sql/overview.md), with the same SQL Database Engine as Azure SQL Database. SQL databases in Fabric automatically scale to meet demand throughout the business day. They have the full capability of transactional tables and the flexibility of transaction isolation levels from serializable to read committed snapshot. SQL database in Fabric automatically creates and drops nonclustered indexes based on strong signals from execution plans observed over time.

In Kirby's scenario, data from the operational application must be joined with other data in Fabric: in Spark, in a warehouse, and from real-time events in an Eventhouse. Every Fabric database includes a SQL analytics endpoint, so data to be accessed in real time from Spark or with Power BI queries using DirectLake mode. These reporting solutions spare the primary operational database from the overhead of analytical workloads, and avoid denormalization. Kirby also has existing operational data in other SQL databases, and needs to import that data without transformation. To import existing operational data without any data type conversion, Kirby designs data pipelines with Fabric Data Factory to import data into the Fabric SQL database.

## Related content

- [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md)
- [Create a warehouse in Microsoft Fabric](../data-warehouse/create-warehouse.md)
- [Create an eventhouse](../real-time-intelligence/create-eventhouse.md)
- [Create a SQL database in the Fabric portal](../database/sql/create.md)
- [Power BI datamart](/power-bi/transform-model/datamarts/datamarts-overview)
