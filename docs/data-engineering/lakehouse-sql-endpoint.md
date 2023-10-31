---
title: What is SQL analytics endpoint for a lakehouse?
description: Discover how to run SQL queries directly on lakehouse tables.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: Lakehouse SQL Endpoint
---

# What is SQL analytics endpoint for a lakehouse?

Microsoft Fabrics provides a SQL-based experience for lakehouse delta tables. This SQL-based experience is called the SQL analytics endpoint. You can analyze data in delta tables using T-SQL language, save functions, generate views, and apply SQL security. To access a SQL analytics endpoint, you select a corresponding item in the workspace view or switch to SQL analytics endpoint mode in Lakehouse Explorer.

Creating a lakehouse creates a SQL analytics endpoint, which points to the lakehouse delta table storage. Once you create a delta table in the Lakehouse, it's immediately available for querying using the SQL analytics endpoint. To learn more, see [Data Warehouse documentation: SQL analytics endpoint](../data-warehouse/data-warehousing.md#sql-endpoint-of-the-lakehouse).

:::image type="content" source="media\sql-endpoint\main-screen.png" alt-text="Lakehouse SQL analytics endpoint main screen" lightbox="media\sql-endpoint\main-screen.png":::

## SQL analytics endpoint read-only mode

SQL analytics endpoint operates in read-only mode over lakehouse delta tables. You can only read data from delta tables using a SQL analytics endpoint. They can save functions, views, and set SQL object-level security.

> [!NOTE]
> External delta tables created with Spark code won't be visible to SQL analytics endpoint. Use shortcuts in Table space to make external delta tables visible to SQL analytics endpoint.

To modify data in lakehouse delta tables, you have to switch to lakehouse mode and use Apache Spark.

## Access control using SQL security

You can set object-level security for accessing data using SQL analytics endpoint. These security rules will only apply for accessing data via SQL analytics endpoint. To ensure data is not accessible in other ways, you must set workspace roles and permissions, see [Workspace roles and permissions](workspace-roles-lakehouse.md).

## Next steps

- [Get started with the SQL analytics endpoint of the Lakehouse in Microsoft Fabric](../data-warehouse/data-warehousing.md#sql-endpoint-of-the-lakehouse)
- [Workspace roles and permissions](workspace-roles-lakehouse.md)
- [Security for data warehousing in Microsoft Fabric](../data-warehouse/security.md)
