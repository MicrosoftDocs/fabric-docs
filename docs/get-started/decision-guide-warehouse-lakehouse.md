---
title:  Fabric decision guide - lakehouse or data warehouse
description: Review a reference table and some quick scenarios to help in choosing whether to use a data warehouse or a lakehouse for your data in Fabric.
ms.reviewer: sngun
ms.author: scbradl
author: bradleyschacht
ms.topic: quickstart
ms.date: 5/12/2023
---

# Microsoft Fabric decision guide: data warehouse or lakehouse

Use this reference guide and the example scenarios to help you choose between the data warehouse or a lakehouse for your workloads using Microsoft Fabric.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Data warehouse and lakehouse properties

| | **Data warehouse** | **Lakehouse** |
|---|:---:|:---:|
| **Data volume** | Unlimited | Unlimited |
| **Type of data** | Structured | Unstructured,<br>semi-structured,<br>structured |
| **Primary developer persona** | Data warehouse developer,<br>SQL engineer | Data engineer,<br>data scientist |
| **Primary developer skill set** | SQL | Spark (Scala, PySpark, Spark SQL, R) |
| **Data organized** **by** | Databases, schemas, and tables | Folders and files,<br>databases and tables |
| **Read operations** | Spark,<br>T-SQL | Spark,<br>T-SQL |
| **Write operations** | T-SQL | Spark (Scala, PySpark, Spark SQL, R) |
| **Multi-table transactions** | Yes | No |
| **Primary development interface** | SQL scripts | Spark notebooks,<br>Spark job definitions |
| **Security** | Object level (table, view, function, stored procedure, etc.),<br>column level,<br>row level,<br>DDL/DML | Row level,<br>table level (when using T-SQL),<br>none for Spark |
| **Access data via shortcuts** | Yes (indirectly through the lakehouse) | Yes |
| **Can be a source for shortcuts** | Yes (tables) | Yes (files and tables) |
| **Query across items** | Yes, query across lakehouse and warehouse tables | Yes, query across lakehouse and warehouse tables;<br>query across lakehouses (including shortcuts using Spark) |

## Scenarios

Review these scenarios for help with choosing between using a lakehouse or a data warehouse in Fabric.

### Scenario1

Susan, a professional developer, is new to Microsoft Fabric. She's ready to get started cleaning, modeling, and analyzing data but needs to decide if she should build a data warehouse or a lakehouse. She reviews the details in the previous table and sees that her primary decision points are her own skills and her need for multi-table transactions.

Susan has spent many years building data warehouses on relational database engines, and is very familiar with SQL syntax and functionality. As she thinks about her larger team, she realizes the primary consumers of this data are also highly skilled with SQL and SQL analytical tools. Susan decides to use a **data warehouse**, which allows her and her team to interact primarily with T-SQL, while also allowing any Spark users in the organization to access the data.

### Scenario2

Rob, a data engineer, needs to store and model several terabytes of data in Fabric. His team has a mix of PySpark and T-SQL skills. Most of the team running T-SQL queries are consumers and therefore don't need to write INSERT, UPDATE, or DELETE statements. The remaining developers are comfortable working in notebooks, and because the data is stored in Delta, they're able to interact with a similar SQL syntax. Rob decides to use a **lakehouse**, which allows his data engineering team to use their diverse skills against the data, while allowing the team members who are highly skilled in T-SQL to consume the data.

## Next steps

- [Create a warehouse in Microsoft Fabric](../data-warehouse/create-warehouse.md)
- [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md)
