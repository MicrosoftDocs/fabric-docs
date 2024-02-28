---
title:  Fabric decision guide - choose a data store
description: Review a reference table and some quick scenarios to help in choosing whether to use a data warehouse, lakehouse, Power BI Datamart, or KQL Database for your data in Fabric.
ms.reviewer: sngun
ms.author: scbradl
author: bradleyschacht
ms.topic: quickstart
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/18/2023
---

# Microsoft Fabric decision guide: choose a data store

Use this reference guide and the example scenarios to help you choose a data store for your Microsoft Fabric workloads.

## Data store properties

| | **Data warehouse** | **Lakehouse** | **Power BI Datamart**  | **KQL Database** ([**Eventhouse**](#eventhouse)) |
|---|:---:|:---:|:---:|:---:|
| **Data volume** | Unlimited | Unlimited | Up to 100 GB | Unlimited |
| **Type of data** | Structured | Unstructured,semi-structured,structured | Structured | Unstructured, semi-structured, structured |
| **Primary developer persona** | Data warehouse developer, SQL engineer | Data engineer, data scientist | Citizen developer | Citizen Data scientist, Data engineer, Data scientist, SQL engineer |
| **Primary developer skill set** | SQL | Spark(Scala, PySpark, Spark SQL, R) | No code, SQL | No code, KQL, SQL |
| **Data organized by** | Databases, schemas, and tables | Folders and files, databases, and tables | Database, tables, queries | Databases, schemas, and tables |
| **Read operations** | T-SQL, Spark (supports reading from tables using shortcuts, doesn't yet support accessing views, stored procedures, fuctions etc.) | Spark,T-SQL | Spark,T-SQL,Power BI | KQL, T-SQL, Spark, Power BI |
| **Write operations** | T-SQL | Spark(Scala, PySpark, Spark SQL, R) | Dataflows, T-SQL | KQL, Spark, connector ecosystem |
| **Multi-table transactions** | Yes | No | No | Yes, for multi-table ingestion. See [update policy](/azure/data-explorer/kusto/management/updatepolicy?context=%2Ffabric%2Fcontext%2Fcontext-rta&pivots=fabric#the-update-policy-object).|
| **Primary development interface** | SQL scripts | Spark notebooks,Spark job definitions | Power BI | KQL Queryset, KQL Database |
| **Security** | Object level (table, view, function, stored procedure, etc.), column level, row level, DDL/DML, dynamic data masking | Row level, table level (when using T-SQL), none for Spark | Built-in RLS editor | Row-level Security |
| **Access data via shortcuts** | Yes (indirectly through the lakehouse) | Yes | No | Yes |
| **Can be a source for shortcuts** | Yes (tables) | Yes (files and tables) | No | Yes |
| **Query across items** | Yes, query across lakehouse and warehouse tables | Yes, query across lakehouse and warehouse tables;query across lakehouses (including shortcuts using Spark) | No | Yes, query across KQL Databases, lakehouses, and warehouses with shortcuts |
| **Advanced analytics** |  |  |  |Time Series native elements, Full geospatial storing and query capabilities |
| **Advanced formatting support** |  |  |  | Full indexing for free text and semi-structured data like JSON |
| **Ingestion latency**|  |  |  | Queued ingestion, Streaming ingestion has a couple of seconds latency |

<a name=eventhouse></a>
> [!NOTE]
> Eventhouse is a workspace for multiple KQL databases. KQL Database is generally available, whereas Eventhouse is in public preview. For more information, see [Eventhouse overview (preview)](../real-time-analytics/eventhouse.md).

## Scenarios

Review these scenarios for help with choosing a data store in Fabric.

### Scenario 1

Susan, a professional developer, is new to Microsoft Fabric. They are ready to get started cleaning, modeling, and analyzing data but need to decide to build a data warehouse or a lakehouse. After review of the details in the previous table, the primary decision points are the available skill set and the need for multi-table transactions.

Susan has spent many years building data warehouses on relational database engines, and is familiar with SQL syntax and functionality. Thinking about the larger team, the primary consumers of this data are also skilled with SQL and SQL analytical tools. Susan decides to use a **data warehouse**, which allows the team to interact primarily with T-SQL, while also allowing any Spark users in the organization to access the data.

### Scenario 2

Rob, a data engineer, needs to store and model several terabytes of data in Fabric. The team has a mix of PySpark and T-SQL skills. Most of the team running T-SQL queries are consumers, and therefore don't need to write INSERT, UPDATE, or DELETE statements. The remaining developers are comfortable working in notebooks, and because the data is stored in Delta, they're able to interact with a similar SQL syntax.

Rob decides to use a **lakehouse**, which allows the data engineering team to use their diverse skills against the data, while allowing the team members who are highly skilled in T-SQL to consume the data.

### Scenario 3

Ash, a citizen developer, is a Power BI developer. They're familiar with Excel, Power BI, and Office. They need to build a data product for a business unit. They know they don't quite have the skills to build a data warehouse or a lakehouse, and those seem like too much for their needs and data volumes. They review the details in the previous table and see that the primary decision points are their own skills and their need for a self service, no code capability, and data volume under 100 GB.

Ash works with business analysts familiar with Power BI and Microsoft Office, and knows that they already have a Premium capacity subscription. As they think about their larger team, they realize the primary consumers of this data may be analysts, familiar with no-code and SQL analytical tools. Ash decides to use a **Power BI datamart**, which allows the team to interact build the capability fast, using a no-code experience. Queries can be executed via Power BI and T-SQL, while also allowing any Spark users in the organization to access the data as well.

### Scenario 4

Daisy is business analyst experienced with using Power BI to analyze supply chain bottlenecks for a large global retail chain. They need to build a scalable data solution that can handle billions of rows of data and can be used to build dashboards and reports that can be used to make business decisions. The data comes from plants, suppliers, shippers, and other sources in various structured, semi-structured, and unstructured formats.

Daisy decides to use a **KQL Database** because of its scalability, quick response times, advanced analytics capabilities including time series analysis, geospatial functions, and fast direct query mode in Power BI. Queries can be executed using Power BI and KQL to compare between current and previous periods, quickly identify emerging problems, or provide geo-spatial analytics of land and maritime routes.

## Related content

- [What is data warehousing in Microsoft Fabric?](../data-warehouse/data-warehousing.md)
- [Create a warehouse in Microsoft Fabric](../data-warehouse/create-warehouse.md)
- [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md)
- [Introduction to Power BI datamarts](/power-bi/transform-model/datamarts/datamarts-overview)
- [Create a KQL database](../real-time-analytics/create-database.md)
