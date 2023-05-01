---
title: Lakehouse SQL Endpoint
description: Discover how to run SQL queries directly on lakehouse tables.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: Lakehouse SQL Endpoint
---

# What is SQL Endpoint for a lakehouse?
Microsoft Fabrics provides the SQL-based experience for lakehouse Delta tables. This SQL-based experience is called the SQL Endpoint.

It enables the user to analyze data in Delta tables using T-SQL language, save functions, generate views, and apply SQL security.

To access SQL Endpoint, the user can select a corresponding item in the workspace view or switch to SQL endpoint mode in Lakehouse Explorer.

Creating a Lakehouse creates a SQL Endpoint, which points to the Lakehouse Delta table storage. Once you create a Delta table in the Lakehouse, it's immediately available for querying using SQL Endpoint.

To learn more, see [Data Warehouse documentation: SQL Endpoint](../data-warehouse/data-warehousing.md#sql-endpoint-of-the-lakehouse)

## SQL endpoint Read only mode
SQL Endpoint operates in read-only mode over Lakehouse Delta tables. Users can only read data from Delta tables using SQL endpoint. They can save functions, views, and set SQL object-level security.

To modify data in Lakehouse Delta tables, the user has to switch to Lakehouse mode and use Apache Spark.

## Access Control using SQL Security
The user can set object-level security for accessing data using SQL Endpoint. These security rules will only apply for accessing data via SQL Endpoint. To ensure data is not accessible in other ways, setting workspace roles and permissions is essential, see [Workspace roles and permissions](workspace-roles-lakehouse.md).

## Next steps

- [Get started with the SQL Endpoint of the Lakehouse in Microsoft Fabric](../data-warehouse/data-warehousing.md#sql-endpoint-of-the-lakehouse)
- [Workspace roles and permissions](workspace-roles-lakehouse.md)
- [Security for data warehousing in Microsoft Fabric](../data-warehouse/security.md)

