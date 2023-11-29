---
title: What is the SQL analytics endpoint for a lakehouse?
description: Discover how to run SQL queries directly on lakehouse tables with the SQL analytics endpoint.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: Lakehouse SQL Analytics Endpoint
---

# What is the SQL analytics endpoint for a Lakehouse?

Microsoft Fabrics provides a SQL-based experience for lakehouse delta tables. This SQL-based experience is called the SQL analytics endpoint. You can analyze data in delta tables using T-SQL language, save functions, generate views, and apply SQL security. To access SQL analytics endpoint, you select a corresponding item in the workspace view or switch to SQL analytics endpoint mode in Lakehouse Explorer.

Creating a Lakehouse creates a SQL analytics endpoint, which points to the Lakehouse delta table storage. Once you create a delta table in the Lakehouse, it's immediately available for querying using the SQL analytics endpoint. To learn more, see [Data Warehouse documentation: SQL analytics endpoint](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse).

:::image type="content" source="media\sql-endpoint\main-screen.png" alt-text="Lakehouse SQL analytics endpoint main screen" lightbox="media\sql-endpoint\main-screen.png":::

## SQL analytics endpoint reprovisioning

We offer the ability to retry SQL analytics endpoint provisioning directly within the Lakehouse experience. Therefore if your initial provisioning attempt fails, you have the option to try again without the need to create an entirely new Lakehouse. This feature empowers you to self-mitigate provisioning issues in convenient way in the UI avoiding the need for complete Lakehouse recreation.

:::image type="content" source="media\sql-endpoint\SQL-analytics-endpoint-re-provisioning.png" alt-text="Lakehouse SQL analytics endpoint re-provisioning" lightbox="media\sql-endpoint\main-screen.png":::

> [!NOTE]
> It's important to note that while this feature improves the user experience, a SQL analytics endpoint re-provisioning can still fail, just as it can during the initial creation of a Lakehouse.

## SQL analytics endpoint read-only mode

The SQL analytics endpoint operates in read-only mode over lakehouse delta tables. You can only read data from delta tables using the SQL analytics endpoint. They can save functions, views, and set SQL object-level security.

> [!NOTE]
> External delta tables created with Spark code won't be visible to the SQL analytics endpoint. Use shortcuts in Table space to make external delta tables visible to the SQL analytics endpoint.

To modify data in Lakehouse delta tables, you have to switch to lakehouse mode and use Apache Spark.

## Access control using SQL security

You can set object-level security for accessing data using SQL analytics endpoint. These security rules will only apply for accessing data via SQL analytics endpoint. To ensure data is not accessible in other ways, you must set workspace roles and permissions, see [Workspace roles and permissions](workspace-roles-lakehouse.md).

## Related content

- [Get started with the SQL analytics endpoint of the Lakehouse in Microsoft Fabric](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse)
- [Workspace roles and permissions](workspace-roles-lakehouse.md)
- [Security for data warehousing in Microsoft Fabric](../data-warehouse/security.md)
