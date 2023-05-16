---
title:  Fabric decision guide - lakehouse or data warehouse
description: Review a reference table and some quick scenarios to help in choosing whether to use a data warehouse or a lakehouse for your data in Fabric.
ms.reviewer: sngun
ms.author: scbradl
author: bradleyschacht
ms.topic: quickstart
ms.date: 5/23/2023
---

# Microsoft Fabric decision guide: data warehouse or lakehouse

Use this reference guide and the example scenarios to help you choose between the data warehouse or a lakehouse for your workloads using Microsoft Fabric.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Data warehouse and lakehouse properties

| | **Data warehouse** | **Lakehouse** | **Power BI Datamart**  |
|---|:---:|:---:|:---:|
| **Data volume** | Unlimited | Unlimited |Up to 100 GB|
| **Type of data** | Structured | Unstructured,<br>semi-structured,<br>structured |Structured|
| **Primary developer persona** | Data warehouse developer,<br>SQL engineer | Data engineer,<br>data scientist |Citizen developer|
| **Primary developer skill set** | SQL | Spark<br>(Scala, PySpark, Spark SQL, R) |No code, SQL|
| **Data organized by** | Databases, schemas, and tables | Folders and files,<br>databases and tables |Database, tables, queries|
| **Read operations** | Spark,<br>T-SQL | Spark,<br>T-SQL |Spark,<BR>T-SQL,<BR>Power BI|
| **Write operations** | T-SQL | Spark<br>(Scala, PySpark, Spark SQL, R) |Dataflows, T-SQL|
| **Multi-table transactions** | Yes | No |No|
| **Primary development interface** | SQL scripts | Spark notebooks,<br>Spark job definitions | Power BI |
| **Security** | Object level (table, view, function, stored procedure, etc.),<br>column level,<br>row level,<br>DDL/DML | Row level,<br>table level (when using T-SQL),<br>none for Spark | Built-in RLS editor|
| **Access data via shortcuts** | Yes (indirectly through the lakehouse) | Yes | No|
| **Can be a source for shortcuts** | Yes (tables) | Yes (files and tables) | No|
| **Query across items** | Yes, query across lakehouse and warehouse tables | Yes, query across lakehouse and warehouse tables;<br>query across lakehouses (including shortcuts using Spark) | No|

## Scenarios

Review these scenarios for help with choosing between using a lakehouse or a data warehouse in Fabric.

### Scenario 1

Susan, a professional developer, is new to Microsoft Fabric. They are ready to get started cleaning, modeling, and analyzing data but need to decide to build a data warehouse or a lakehouse. After review of the details in the previous table, the primary decision points are the available skill set and the need for multi-table transactions.

Susan has spent many years building data warehouses on relational database engines, and is familiar with SQL syntax and functionality. Thinking about the larger team, the primary consumers of this data are also skilled with SQL and SQL analytical tools. Susan decides to use a **data warehouse**, which allows the team to interact primarily with T-SQL, while also allowing any Spark users in the organization to access the data.

### Scenario 2

Rob, a data engineer, needs to store and model several terabytes of data in Fabric. The team has a mix of PySpark and T-SQL skills. Most of the team running T-SQL queries are consumers, and therefore don't need to write INSERT, UPDATE, or DELETE statements. The remaining developers are comfortable working in notebooks, and because the data is stored in Delta, they're able to interact with a similar SQL syntax. 

Rob decides to use a **lakehouse**, which allows the data engineering team to use their diverse skills against the data, while allowing the team members who are highly skilled in T-SQL to consume the data.

### Scenario 3

Ash, a citizen developer, is a Power BI developer. They're familiar with Excel, Power BI, and Office. They need to build a data product for a business unit. They know they don't quite have the skills to build a data warehouse or a lakehouse, and those seem like too much for their needs and data volumes. They review the details in the previous table and see that the primary decision points are their own skills and their need for a self service, no code capability, and data volume under 100 GB.

Ash works with business analysts familiar with Power BI and Microsoft Office, and knows that they already have a Premium capacity subscription. As they think about their larger team, they realize the primary consumers of this data may be analysts, familiar with no-code and SQL analytical tools. Ash decides to use a **Power BI datamart**, which allows the team to interact build the capability fast, using a no-code experience. Queries can be executed via Power BI and T-SQL, while also allowing any Spark users in the organization to access the data as well.

## Next steps

- [What is data warehousing in Microsoft Fabric?](../data-warehouse/data-warehousing.md)
- [Create a warehouse in Microsoft Fabric](../data-warehouse/create-warehouse.md)
- [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md)
- [Introduction to Power BI datamarts](/power-bi/transform-model/datamarts/datamarts-overview)