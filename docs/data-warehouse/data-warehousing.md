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

Microsoft Fabric provides customers with a unified product that addresses every aspect of their data estate by offering a complete, SaaS-ified Data, Analytics and AI platform which is lake centric and open. The foundation of Microsoft Fabric enables the novice user through to the seasoned professional to leverage Database, Analytics, Messaging, Data Integration and Businses Intelligence workloads through a rich, easy to use, shared SaaS experience with Microsoft OneLake as the centerpiece. 

<b>A lake centric SaaS experience built for any skill level</b>

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] introduces a lake centric data warehouse built on an enterprise grade distributed processing engine that enables industry leading performance at scale whilst eliminating the need for configuration and management. Through an easy to use SaaS experience that is tightly integrated with PowerBI for easy analysis and reporting, [!INCLUDE [fabric-dw](includes/fabric-dw.md)] on Microsoft Fabric converges the world of data lakes and warehouses with a goal of greatly simplifying an organizations investment in their analytics estate. Data Warehousing workloads benefit from the rich capabilities of the SQL engine over an open data format, enabling customers to focus on data preparation, analysis and reporting over a single copy of their data stored in their Microsoft OneLake. 

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is built for any skill level - from the citizen developer through to the professional developer, DBA or data engineer. The rich set of experiences built into Microsoft Fabric workspace enables customers to reduce their time to insights by having an easily consumable, always connected dataset that is integrated with PowerBI in DirectLake mode. This enables second-to-none industry leading performance that ensures a customers report always has the most recent data for analysis and reporting. Cross database querying can be leveraged to quickly and seamlessly leverage multiple data sources that span multiple databases for fast insights and zero data duplication. 

<b>Open format for seamless engine interoperability</b>

Data in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]is stored in the parquet file format and published as Delta Lake Logs, enabling ACID transactions and cross engine interoperability which can be leveraged through other Microsoft Fabric workloads such as Spark, Pipelines, Power BI and Azure Data Explorer. Customers no longer need to create multiple copies of their data to enable data professionals with different skill sets. Data engineers that are accustomed to working in Python can easily leverage the same data that was modelled and served by a data warehouse professional that is accustomed to working in SQL. In parallel, BI professionals can quickly and easily leverage the same data to create a rich set of visualizations in PowerBI with record performance and no data duplication. 

<b>Separation of storage and compute</b>

Compute and storage are decoupled in a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] which enables customers to scale near instantaneously to meet the demands of their business. This enables multiple compute engines to read from any supported storage source with robust security and full ACID transactional guarantees. 

<b>Easily ingest, load and transform at scale</b>

Data can be [ingested](ingest-data.md) into the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] through Pipelines, Dataflows, cross database querying or the COPY INTO command. Once ingested, data can be analyzed by multiple business groups through functionality such as sharing and cross database querying. Time to insights is expedited through a fully integrated BI experience through graphical data modeling easy to use web experience for querying within the Synapse Data Warehouse Editor. 

## What types of Warehouses are available in Microsoft Fabric? 

<b>SQL Endpoint</b>

A [!INCLUDE [fabric-se](includes/fabric-se.md)] is a warehouse that is automatically generated from a Lakehouse in Microsoft Fabric. A customer can transition from the "Lake" view of the Lakehouse (which supports data engineering and Apache Spark) to the "SQL" view of the same Lakehouse. A [!INCLUDE [fabric-se](includes/fabric-se.md)] can only be modified through the "Lake" view of the Lakehouse using Spark. 

Via the SQL Endpoint, the user has a subset of SQL commands that can define and query data objects but not manipulate the data. You can perform the following actions in the [!INCLUDE [fabric-se](includes/fabric-se.md)]:

- Query the tables that reference data in your Delta Lake folders in the lake.
- Create views, inline TVFs, and procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.

In a [!INCLUDE [product-name](../includes/product-name.md)] workspace, a SQL Endpoint is named 'SQL Endpoint' under the <b>Type</b> column. Each Lakehouse has an autogenerated SQL Endpoint that can be leveraged through familiar SQL tools such as SQL Server Management Studio, Azure Data Explorer and the Microsoft Fabric SQL Query Editor. 

For more information on the [!INCLUDE [fabric-se](includes/fabric-se.md)] for the Lakehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [[!INCLUDE [fabric-se](includes/fabric-se.md)]](sql-endpoint.md).

To get started with the [!INCLUDE [fabric-se](includes/fabric-se.md)] on the Lakehouse, see [Get started with the Lakehouse in Microsoft Fabric](get-started-sql-endpoint.md).

<b>Warehouse</b>

In a [!INCLUDE [product-name](../includes/product-name.md)] workspace, a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is named 'Warehouse' under the <b>Type</b> column. A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports transactions, DDL and DML queries. 

Unlike a [!INCLUDE [fabric-se](includes/fabric-se.md)] which only supports read only queries and creation of views and TVFs, a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] has full transactional DDL and DML support and is created by a customer. A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is populated by one of the supported data ingestion methods such as COPY INTO, Pipelines, Dataflows or cross database ingestion options such as Create Table as Select (CTAS), INSERT..SELECT, or SELECT INTO. 

To get started with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Get started with the Synapse Data Warehouse in Microsoft Fabric](get-started-data-warehouse.md).

## Next steps

- [Create a warehouse](create-warehouse.md)
- [Creating reports](create-reports.md)