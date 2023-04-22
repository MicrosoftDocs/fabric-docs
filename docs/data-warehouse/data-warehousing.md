---
title: What is data warehousing in Microsoft Fabric?
description: Learn more about the data warehousing experience.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: overview
ms.search.form: SQL Endpoint overview, Warehouse overview, Warehouse in workspace overview
---

# What is data warehousing in Microsoft Fabric?

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides two distinct data warehousing experiences. The **[!INCLUDE[fabric-se](includes/fabric-se.md)]** in [!INCLUDE [product-name](../includes/product-name.md)] enables data engineers to build a relational layer on top of physical data in the [Lakehouse](../data-engineering/lakehouse-overview.md) and expose it to analysis and reporting tools using T-SQL/TDS end-point. **[!INCLUDE[fabric-dw](includes/fabric-dw.md)]** in [!INCLUDE [product-name](../includes/product-name.md)] provides a "traditional", transactional data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse.

> [!IMPORTANT]
> This article provides a comprehensive overview of two distinct data warehousing experiences.

## SQL Endpoint of the Lakehouse

The [!INCLUDE [fabric-se](includes/fabric-se.md)] allows a user to transition from the "Lake" view of the Lakehouse (which supports data engineering and Apache Spark) to the "SQL" experiences that a data warehouse would provide, supporting T-SQL. Via the SQL Endpoint, the user has a subset of SQL commands that can define and query data objects but not manipulate the data. You can perform the following actions in the [!INCLUDE [fabric-se](includes/fabric-se.md)]:

- Query the tables that reference data in your Delta Lake folders in the lake.
- Create views, inline TVFs, and procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.

For more information on the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [[!INCLUDE [fabric-se](includes/fabric-se.md)]](lakehouse-sql-endpoint.md).

To get started with the [!INCLUDE [fabric-se](includes/fabric-se.md)], see [Get started with the SQL Endpoint of the Lakehouse in Microsoft Fabric](get-started-lakehouse-sql-endpoint.md).

For more information on loading your [Lakehouse](../data-engineering/lakehouse-overview.md), see [Get data experience for Lakehouse](../data-engineering/load-data-lakehouse.md). 

## Synapse Data Warehouse

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is a 'traditional' data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. 

This warehouse is displayed in the [!INCLUDE [product-name](../includes/product-name.md)] portal with a warehouse icon, however under the **Type** column, you see the type listed as Warehouse. 

For more information on the warehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [Synapse Data Warehouse](warehouse.md).

To get started with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Get started with the Synapse Data Warehouse in Microsoft Fabric](get-started-data-warehouse.md).

## Use cases and scenarios

The [!INCLUDE [fabric-se](includes/fabric-se.md)] and the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] are designed for following scenarios and use cases in mind:
<!-- More coming -->

**[!INCLUDE [fabric-se](includes/fabric-se.md)]**:

- Automatic creation of external tables for delta lake files in the [OneLake](../onelake/onelake-overview.md)
- Immediate access to delta lake files via read-only TSQL queries.

**[!INCLUDE [fabric-dw](includes/fabric-dw.md)]**:

- For read/write TSQL access to a traditional data warehouse experience.
- Star schema data warehouses with fact and dimension tables, slowly changing dimensions.
- Source of data for querying with Power BI, SQL Server Reporting Services, and other enterprise reporting and visualization tools.

## Connectivity

You can use the [!INCLUDE [product-name](../includes/product-name.md)] portal, or the TDS endpoint to connect to and query the SQL Endpoint and your transactional data warehouses via [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) version 18.0+ or [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio).

For more information and how-to connect, see [Connectivity](connectivity.md).

## Next steps

- [SQL Endpoint of the Lakehouse](lakehouse-sql-endpoint.md)
- [Lakehouse](../data-engineering/lakehouse-overview.md)
- [Synapse Data Warehouse in Microsoft Fabric](warehouse.md)
- [Create a warehouse](create-warehouse.md)
- [Creating reports](create-reports.md)