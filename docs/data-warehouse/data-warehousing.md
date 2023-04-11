---
title: What is Data warehousing in Microsoft Fabric?
description: Learn more about the data warehousing experience.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: overview
ms.date: 04/03/2023
ms.search.form: SQL Endpoint overview, Warehouse overview, Warehouse in workspace overview
---

# What is data warehousing in Microsoft Fabric?

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides two distinct data warehousing experiences. The **[!INCLUDE[fabric-se](includes/fabric-se.md)]** in [!INCLUDE [product-name](../includes/product-name.md)] enables data engineers to build a relational layer on top of physical data in the [Lakehouse](../data-engineering/lakehouse-overview.md) and expose it to analysis and reporting tools using T-SQL/TDS end-point. **[!INCLUDE[fabric-dw](includes/fabric-dw.md)]** in [!INCLUDE [product-name](../includes/product-name.md)] provides a "traditional", transactional data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse.

> [!IMPORTANT]
> This article provides a comprehensive overview of two distinct data warehousing experiences.

## SQL Endpoint

The [!INCLUDE [fabric-se](includes/fabric-se.md)] on the [Lakehouse](../data-engineering/lakehouse-overview.md) allows a user to transition from the "Lake" view of the Lakehouse (which supports data engineering and Apache Spark) to the "SQL" experiences that a data warehouse would provide, supporting T-SQL. Via the SQL Endpoint, the user has a subset of SQL commands that can define and query data objects but not manipulate the data. You can perform the following actions in the [!INCLUDE [fabric-se](includes/fabric-se.md)]:

- Query the tables that reference data in your Delta Lake folders in the lake.
- Create views, inline TVFs, and procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.

For more information on the [!INCLUDE [fabric-se](includes/fabric-se.md)] for the Lakehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md).

To get started with the [!INCLUDE [fabric-se](includes/fabric-se.md)] on the Lakehouse, see [Get started with the Lakehouse in Microsoft Fabric](get-started-sql-endpoint.md).

For more information on loading your [Lakehouse](../data-engineering/lakehouse-overview.md), see [Get data experience for Lakehouse](../data-engineering/load-data-lakehouse.md). 

## Synapse Data Warehouse

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is a 'traditional' data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. 

This warehouse is displayed in the [!INCLUDE [product-name](../includes/product-name.md)] portal with a warehouse icon, however under the **Type** column, you see the type listed as Warehouse. 

For more information on the warehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [Synapse Data Warehouse](warehouse.md).

To get started with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Get started with the Synapse Data Warehouse in Microsoft Fabric](get-started-data-warehouse.md).

## Connectivity

You can use the [!INCLUDE [product-name](../includes/product-name.md)] portal, or the TDS endpoint to connect to and query the SQL Endpoint and your transactional data warehouses via [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) version 18.0+ or [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio).

For more information and how-to connect, see [Connectivity](connectivity.md).

## Next steps

- [SQL Endpoint](sql-endpoint.md)
- [Lakehouse](../data-engineering/lakehouse-overview.md)
- [Synapse Data Warehouse in Microsoft Fabric](warehouse.md)
- [Create a warehouse](create-warehouse.md)
- [Creating reports](create-reports.md)
