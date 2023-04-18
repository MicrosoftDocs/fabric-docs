---
title: What is Data warehousing in Microsoft Fabric?
description: Learn more about the data warehousing experience.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 04/12/2023
ms.topic: overview
ms.search.form: SQL Endpoint overview, Warehouse overview, Warehouse in workspace overview
---

# What is data warehousing in Microsoft Fabric?

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] introduces a lake centric data warehouse experience that encompasses all the aspects of an enterprise grade distributed query processing engine through a SaaS experience that are tightly integrated with PowerBI for easy analysis and reporting. Data in a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] converges the world of data lakes and warehouse, greatly simplifying an organizations investment in their analytics estate by converging the two. Data Warehousing workloads benefit from the rich capabilities of the SQL engine over an open data format, enabling customers to focus on data preparation, analysis and reporting over a single copy of their data stored in their Microsoft OneLake. 

Data in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]is stored in the Parquet/Delta format, enabling engine interoperability which can be leveraged through other Microsoft Fabric workloads such as Spark, Pipelines, Power BI, Azure Data Explorer and more. In addition to cross engine interoperability, customers reap benefits such as ACID transactions over parquet files stored in their lake. 

Compute and storage are decoupled in a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] which enables customers to scale near instantaneously to meet the demands of their business. When a query is issued, resources are provisioned to execute the query as fast as possible utilizing the distributed query processing engine, which is complete with a cost-based selection of distributed execution plans that make up the query optimizer. 

Data can be [ingested](../ingest-data.md) into the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] through Pipelines, Dataflows, cross database querying or the COPY INTO command. Customers benefit from a low code/no code experience which is appropriate for any skill level - be it a citizen developer through to an advanced data engineer. Once ingested, data can be analyzed by multiple business groups through functionality such as sharing and cross database querying. Time to insights is expedited through a fully integrated BI experience through graphical data modeling easy to use web experience for querying within the Synapse Data Warehouse Editor. 

## Synapse Data Warehouse

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. 

This warehouse is displayed in the [!INCLUDE [product-name](../includes/product-name.md)] portal with a warehouse icon, however under the **Type** column, you see the type listed as Warehouse. 

For more information on the warehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [Synapse Data Warehouse](warehouse.md).

To get started with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Get started with the Synapse Data Warehouse in Microsoft Fabric](get-started-data-warehouse.md).

## SQL Endpoint

The [!INCLUDE [fabric-se](includes/fabric-se.md)] on the [Lakehouse](../data-engineering/lakehouse-overview.md) allows a user to transition from the "Lake" view of the Lakehouse (which supports data engineering and Apache Spark) to the "SQL" experiences that a data warehouse would provide, supporting T-SQL. Via the SQL Endpoint, the user has a subset of SQL commands that can define and query data objects but not manipulate the data. You can perform the following actions in the [!INCLUDE [fabric-se](includes/fabric-se.md)]:

- Query the tables that reference data in your Delta Lake folders in the lake.
- Create views, inline TVFs, and procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.

The difference between a [!INCLUDE [product-name](../includes/product-name.md)] Synapse Data Warehouse and a SQL Endpoint is that a Synapse Data Warehouse supports ACID transactions with both DDL and DML support. The SQL Endpoint is a read only SQL experience over an existing Lakehouse. Data modification is performed within the Lakehouse experience through Spark Notebooks. 

In a [!INCLUDE [product-name](../includes/product-name.md)] workspace, a SQL Endpoint is named 'SQL Endpoint' under the <b>Type</b> column. 

For more information on the [!INCLUDE [fabric-se](includes/fabric-se.md)] for the Lakehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md).

To get started with the [!INCLUDE [fabric-se](includes/fabric-se.md)] on the Lakehouse, see [Get started with the Lakehouse in Microsoft Fabric](get-started-sql-endpoint.md).

For more information on loading your [Lakehouse](../data-engineering/lakehouse-overview.md), see [Get data experience for Lakehouse](../data-engineering/load-data-lakehouse.md). 

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

- [SQL Endpoint](sql-endpoint.md)
- [Lakehouse](../data-engineering/lakehouse-overview.md)
- [Synapse Data Warehouse in Microsoft Fabric](warehouse.md)
- [Create a warehouse](create-warehouse.md)
- [Creating reports](create-reports.md)