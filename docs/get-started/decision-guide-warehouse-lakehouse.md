---
title:  Fabric decision guide - lakehouse or data warehouse
description: Review a reference table and some quick scenarios to help in choosing whether to use a data warehouse or a lakehouse for your data in Fabric.
ms.reviewer: sngun
ms.author: scbradl
author: bradleyschacht
ms.topic: quickstart
ms.search.form: product-trident
ms.date: 5/12/2023
---

# Microsoft Fabric decision guide: data warehouse or lakehouse

Use this quick reference table and these short scenarios to help choose whether to use a data warehouse or a lakehouse for your data in Fabric.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Data warehouse and lakehouse properties

| | **Data Warehouse** | **Lakehouse** |
|---|:---:|:---:|
| **Data volume** | Unlimited | Unlimited |
| **Type of data** | Structured | Unstructured,<br>semi-structured,<br>structured |
| **Primary developer persona** | Data Warehouse Developer,<br>SQL Engineer | Data Engineer,<br>Data Scientist |
| **Primary developer skill set** | SQL | Spark (Scala, PySpark, Spark SQL, R) |
| **Data organized** **by** | Databases, schemas, and tables | Folders and files,<br>databases and tables |
| **Read operations** | Spark,<br>T-SQL | Spark,<br>T-SQL |
| **Write operations** | T-SQL | Spark (Scala, PySpark, Spark SQL, R) |
| **Multi-table transactions** | Yes | No |
| **Primary development interface** | SQL scripts | Spark notebooks,<br>Spark job definitions |
| **Security** | Object level (table, view, function, stored procedure, etc.),<br>column level,<br>row level,<br>DDL/DML | Row level,<br>table level (when using T-SQL),<br>none for Spark |
| **Access data via shortcuts** | Yes (indirectly through the lakehouse) | Yes |
| **Can be a source for shortcuts** | Yes (tables) | Yes (files and tables) |
| **Query across artifacts** | Yes, query across lakehouse and warehouse tables | Yes, query across lakehouse and warehouse tables;<br>query across lakehouses (including shortcuts using Spark) |

## Scenarios

Review these scenarios for help with choosing between using a lakehouse or a data warehouse in Fabric.

### Scenario one

Susan, a professional developer, is new to Trident and is ready to get started cleaning, modeling, and analyzing data but needs to decide if she should build a data warehouse or a lakehouse. After reviewing the decision points in the chart above, Susan sees the primary decision points come down to multi-table transactions and skillset. She has spent many years building data warehouses on relational database engines and is therefore familiar with the SQL syntax and functionality. As she thinks about the larger team that works around her and considers the primary consumers of this data are also highly skilled with SQL and use analytical tools that are designed for SQL, they bring a similar skillset to the table. **Susan decides to use a data warehouse** which will allow her and the team with similar skillsets to interact primarily with T-SQL while still allowing any Spark users in the organization to access the data.

### Scenario two

Rob, a data engineer, needs to store and model several terabytes of data in Trident. His team has a mix of skillsets between PySpark and T-SQL. Most of the team running T-SQL queries will be consumers and therefore do not need to write INSERT, UPDATE, or DELETE statements. The remaining developers are comfortable working in notebooks and because the data is stored in Delta, will be able to interact with a similar SQL syntax. **Rob decides to use a lakehouse**. This allows Rob's data engineering team to use their diverse skillsets against the data while allowing the team members highly skilled in T-SQL to consume the data.

## Next steps

- [Create a warehouse in Microsoft Fabric](../data-warehouse/create-warehouse.md)
- [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md)
