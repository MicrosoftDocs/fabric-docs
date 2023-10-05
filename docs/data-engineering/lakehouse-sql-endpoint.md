---
title: What is SQL endpoint for a lakehouse?
description: Discover how to run SQL queries directly on lakehouse tables.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom: build-2023
ms.date: 05/23/2023
ms.search.form: Lakehouse SQL Endpoint
---

# What is SQL Endpoint for a lakehouse?

Microsoft Fabrics provides a SQL-based experience for lakehouse delta tables. This SQL-based experience is called the SQL Endpoint. You can analyze data in delta tables using T-SQL language, save functions, generate views, and apply SQL security. To access SQL Endpoint, you select a corresponding item in the workspace view or switch to SQL endpoint mode in Lakehouse Explorer.

[!INCLUDE [preview-note](../includes/preview-note.md)]

Creating a lakehouse creates a SQL endpoint, which points to the lakehouse delta table storage. Once you create a delta table in the Lakehouse, it's immediately available for querying using the SQL endpoint. To learn more, see [Data Warehouse documentation: SQL Endpoint](../data-warehouse/data-warehousing.md#sql-endpoint-of-the-lakehouse).

:::image type="content" source="media\sql-endpoint\main-screen.png" alt-text="Lakehouse SQL Endpoint main screen" lightbox="media\sql-endpoint\main-screen.png":::

## SQL endpoint read-only mode

SQL endpoint operates in read-only mode over lakehouse delta tables. You can only read data from delta tables using SQL endpoint. They can save functions, views, and set SQL object-level security.

> [!NOTE]
> External delta tables created with Spark code won't be visible to SQL endpoint. Use shortcuts in Table space to make external delta tables visible to SQL endpoint.

To modify data in lakehouse delta tables, you have to switch to lakehouse mode and use Apache Spark.

## Access control using SQL security

You can set object-level security for accessing data using SQL endpoint. These security rules will only apply for accessing data via SQL Endpoint. To ensure data is not accessible in other ways, you must set workspace roles and permissions, see [Workspace roles and permissions](workspace-roles-lakehouse.md).

## Next steps

- [Get started with the SQL Endpoint of the Lakehouse in Microsoft Fabric](../data-warehouse/data-warehousing.md#sql-endpoint-of-the-lakehouse)
- [Workspace roles and permissions](workspace-roles-lakehouse.md)
- [Security for data warehousing in Microsoft Fabric](../data-warehouse/security.md)
