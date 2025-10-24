---
title:  Fabric decision guide - choose a data store
description: Review a reference table and scenarios to choose the most suitable data store for your Microsoft Fabric workloads, ensuring optimal performance.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sngun, scbradl, chweb
ms.topic: concept-article
ms.date: 09/09/2025
ms.custom:
- FY25Q1-Linter
ms.search.form: Choose a Data Store, Databases datastore decision guide
---

# Microsoft Fabric decision guide: choose a data store

Use this reference guide and the example scenarios to help you choose a data store for your Microsoft Fabric workloads, all available in a unified storage in the OneLake.

:::image type="content" source="media/decision-guide-data-store/decision-guide.svg" alt-text="Diagram of a decision for ideal use cases for Fabric features. Complete text is available in the following table.":::

| Ideal use case | Microsoft Fabric workload |  Data available in [OneLake](../onelake/onelake-overview.md) in open table format by default |
|:--|:--|:--|
| Streaming event data, high granularity (in time, space, detail – JSON/Text) activity data for interactive analytics | [Eventhouse](../real-time-intelligence/eventhouse.md) | Yes | 
 | AI, NoSQL, and vector search | [Cosmos DB in Fabric](../database/cosmos-db/overview.md) (Preview)| Yes | 
| Operational transactional database, OLTP database | [SQL database in Fabric](../database/sql/overview.md) (Preview) | Yes | 
 | Enterprise data warehouse, SQL-based BI, OLAP, [full SQL transaction support](../data-warehouse/transactions.md) | [Data Warehouse](../data-warehouse/data-warehousing.md)| Yes | 
| Big data and machine learning, un/semi/structured data, [data engineering](../data-engineering/data-engineering-overview.md) | [Lakehouse](../data-engineering/lakehouse-overview.md) | Yes |

## Personas and skillsets

| Microsoft Fabric workload | Primary developer personas | Primary skillsets, tooling | Primary languages |
|:--|:--|:--|:--|
| [Eventhouse](../real-time-intelligence/eventhouse.md)  | App developer, Data scientist, Data engineer | No code, KQL, SQL | [KQL (Kusto query language)](../real-time-intelligence/kusto-query-set.md), T-SQL | 
| [Cosmos DB in Fabric](../database/cosmos-db/overview.md) (Preview) | AI developer, App developer | NoSQL concepts, REST APIs, similar to Azure Cosmos DB | REST API integration via JavaScript/TypeScript, Python, C#, Java, and others |
| [SQL database in Fabric](../database/sql/overview.md) (Preview) | AI developer, App developer, Database developer, Database admin | Database administration and development, similar to Azure SQL Database, SSMS, VS Code, and SQL Server-compatible query tools | T-SQL |
| [Fabric Data Warehouse](../data-warehouse/data-warehousing.md) | Data warehouse developer, Data architect, Data engineer, Database developer | Data warehousing concepts, [star schema database design](../data-warehouse/dimensional-modeling-overview.md), SSMS, VS Code, and SQL Server-compatible query tools | T-SQL, No code |
| [Lakehouse](../data-engineering/lakehouse-overview.md) | Data engineer, Data scientist | PySpark, Delta Lake, notebooks | Spark (Scala, PySpark, Spark SQL, R) |

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

Daisy is business analyst experienced with using Power BI to analyze supply chain bottlenecks for a large global retail chain. They need to build a scalable data solution that can handle billions of rows of data and can be used to build dashboards and reports that can be used to make business decisions. The data comes from plants, suppliers, shippers, and other sources in various structured, semi-structured, and unstructured formats.

Daisy decides to use an [**Eventhouse**](../real-time-intelligence/eventhouse.md) because of its scalability, quick response times, advanced analytics capabilities including time series analysis, geospatial functions, and fast direct query mode in Power BI. Queries can be executed using Power BI and KQL to compare between current and previous periods, quickly identify emerging problems, or provide geo-spatial analytics of land and maritime routes.

### Scenario 4

Kirby is an application architect experienced in developing .NET applications for operational data. They need a high concurrency database with full ACID transaction compliance and strongly enforced foreign keys for relational integrity. Kirby wants the benefit of automatic performance tuning to simplify day-to-day database management.

Kirby decides on a [**SQL database in Fabric**](../database/sql/overview.md), with the same SQL Database Engine as Azure SQL Database. SQL databases in Fabric automatically scale to meet demand throughout the business day. They have the full capability of transactional tables and the flexibility of transaction isolation levels from serializable to read committed snapshot. SQL database in Fabric automatically creates and drops nonclustered indexes based on strong signals from execution plans observed over time.

In Kirby's scenario, data from the operational application must be joined with other data in Fabric: in Spark, in a warehouse, and from real-time events in an Eventhouse. Every Fabric database includes a SQL analytics endpoint, so data to be accessed in real time from Spark or with Power BI queries using DirectLake mode. These reporting solutions spare the primary operational database from the overhead of analytical workloads, and avoid denormalization. Kirby also has existing operational data in other SQL databases, and needs to import that data without transformation. To import existing operational data without any data type conversion, Kirby designs pipelines with Fabric Data Factory to import data into the Fabric SQL database.

## Next step

> [!div class="nextstepaction"]
> [Learn about Fabric migration](migration.md)
