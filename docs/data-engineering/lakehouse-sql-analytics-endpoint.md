---
title: What is the SQL analytics endpoint for a lakehouse?
description: Learn about the SQL analytics endpoint and how to run SQL queries directly on Fabric lakehouse tables.
ms.reviewer: tvilutis
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 11/10/2025
ms.search.form: Lakehouse SQL Analytics Endpoint
---

# What is the SQL analytics endpoint for a lakehouse?

Microsoft Fabric provides a SQL-based experience for lakehouse Delta tables. This SQL-based experience is the SQL analytics endpoint. You can analyze data in Delta tables using T-SQL language, save functions, generate views, and apply SQL security. To access SQL analytics endpoint, you select a corresponding item in the workspace view or switch to SQL analytics endpoint mode in Lakehouse explorer.

Creating a lakehouse creates a SQL analytics endpoint, which points to the lakehouse Delta table storage. Once you create a Delta table in the lakehouse, it's available for querying using the SQL analytics endpoint. Many Fabric items, including a [warehouse](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse), [mirrored database](../mirroring/overview.md), [SQL database](../database/sql/sql-analytics-endpoint.md), and [Cosmos DB](../database/cosmos-db/overview.md) automatically provision a SQL analytics endpoint when created.

:::image type="content" source="media\sql-endpoint\main-screen.png" alt-text="Screenshot of Lakehouse SQL analytics endpoint main screen." lightbox="media\sql-endpoint\main-screen.png":::

## SQL analytics endpoint reprovisioning

We offer the ability to retry SQL analytics endpoint provisioning directly within a lakehouse. Therefore if your initial provisioning attempt fails, you have the option to try again without the need to create an entirely new lakehouse. This feature empowers you to self-mitigate provisioning issues in convenient way in the UI avoiding the need for complete lakehouse re-creation.

:::image type="content" source="media\sql-endpoint\SQL-analytics-endpoint-re-provisioning.png" alt-text="Screenshot of lakehouse SQL analytics endpoint re-provisioning." lightbox="media\sql-endpoint\main-screen.png":::

> [!NOTE]
> It's important to note that while this feature improves the user experience, a SQL analytics endpoint re-provisioning can still fail, just as it can during the initial creation of a lakehouse.

## SQL analytics endpoint read-only mode

The SQL analytics endpoint operates in read-only mode over lakehouse Delta tables. You can only read data from Delta tables using the SQL analytics endpoint. While you can only perform read operations on Delta tables through the SQL analytics endpoint, you have the flexibility to create functions, define views, and implement SQL object-level security to manage access and structure your data effectively.

> [!NOTE]
> External Delta tables created with Spark code aren't visible to the SQL analytics endpoint. Use shortcuts in Table space to make external Delta tables visible to the SQL analytics endpoint. To learn how to create a shortcut, see [Create a shortcut to files or tables](lakehouse-shortcuts.md#create-a-shortcut-to-files-or-tables).

To modify data in lakehouse Delta tables, you have to switch to lakehouse mode and use Apache Spark.

## Access control using SQL security

You can set object-level security for accessing data using SQL analytics endpoint. These security rules only apply for accessing data via SQL analytics endpoint, see [SQL granular permissions](../data-warehouse/sql-granular-permissions.md)

To ensure data isn't accessible in other ways, you must set workspace roles and permissions, see [Workspace roles and permissions](workspace-roles-lakehouse.md).

## Limitations of the SQL analytics endpoint

The SQL analytics endpoint has some limitations based on its use of the Fabric Data Warehouse engine. For more information, see [Limitations of the SQL analytics endpoint](../data-warehouse/limitations.md#limitations-of-the-sql-analytics-endpoint).

## Related content

- [Get started with the SQL analytics endpoint of the Lakehouse in Microsoft Fabric](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse)
- [Workspace roles and permissions](workspace-roles-lakehouse.md)
