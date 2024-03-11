---
title: Better together - the lakehouse and warehouse
description: Learn more about the lakehouse data warehousing experience in Microsoft Fabric.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 11/15/2023
ms.topic: conceptual
ms.custom: build-2023
ms.search.form: SQL Analytics Endpoint overview, Warehouse in workspace overview # This article's title should not change. If so, contact engineering.
---
# Better together: the lakehouse and warehouse

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

This article explains the data warehousing experience with the [[!INCLUDE [fabric-se](includes/fabric-se.md)]](../data-engineering/lakehouse-overview.md) of the Lakehouse, and scenarios for use of the Lakehouse in data warehousing.

## What is a Lakehouse SQL analytics endpoint?

In Fabric, when you [create a lakehouse](../onelake/create-lakehouse-onelake.md), a [[!INCLUDE [fabric-se](includes/fabric-dw.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) is automatically created.

The [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to query data in the Lakehouse using T-SQL language and TDS protocol. Every Lakehouse has one [!INCLUDE [fabric-se](includes/fabric-se.md)], and each workspace can have more than one Lakehouse. The number of [!INCLUDE [fabric-se](includes/fabric-se.md)]s in a workspace matches the number of Lakehouse items.

- The [!INCLUDE [fabric-se](includes/fabric-se.md)] is automatically generated for every Lakehouse and exposes Delta tables from the Lakehouse as SQL tables that can be queried using the T-SQL language.
- Every delta table from a Lakehouse is represented as one table. Data should be in delta format.
- The [default Power BI semantic model](semantic-models.md) is created for every [!INCLUDE [fabric-se](includes/fabric-se.md)] and it follows the naming convention of the Lakehouse objects.

There's no need to create a [!INCLUDE [fabric-se](includes/fabric-se.md)] in Microsoft Fabric. Microsoft Fabric users can't create a [!INCLUDE [fabric-se](includes/fabric-se.md)] in a workspace. A [!INCLUDE [fabric-se](includes/fabric-se.md)] is automatically created for every Lakehouse. To get a [!INCLUDE [fabric-se](includes/fabric-se.md)], [create a lakehouse](../onelake/create-lakehouse-onelake.md) and a [!INCLUDE [fabric-se](includes/fabric-se.md)] will be automatically created for the Lakehouse.

> [!NOTE]
> Behind the scenes, the [!INCLUDE [fabric-se](includes/fabric-se.md)] is using the same engine as the [Warehouse](data-warehousing.md#synapse-data-warehouse) to serve high performance, low latency SQL queries.

### Automatic Metadata Discovery

A seamless process reads the delta logs and from the files folder and ensures SQL metadata for tables, such as statistics, is always up to date. There's no user action needed, and no need to import, copy data, or set up infrastructure. For more information, see [Automatically generated schema in the [!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#automatically-generated-schema-in-the-sql-analytics-endpoint-of-the-lakehouse).

## Scenarios the Lakehouse enables for data warehousing

In Fabric, we offer one warehouse.

The Lakehouse, with its [!INCLUDE [fabric-se](includes/fabric-se.md)], powered by the Warehouse, can simplify the traditional decision tree of batch, streaming, or lambda architecture patterns. Together with a warehouse, the lakehouse enables many additive analytics scenarios. This section explores how to leverage a Lakehouse together with a Warehouse for a best of breed analytics strategy.

### Analytics with your Fabric Lakehouse's gold layer

One of the well-known strategies for lake data organization is a [medallion architecture](../onelake/onelake-medallion-lakehouse-architecture.md) where the files are organized in raw (bronze), consolidated (silver), and refined (gold) layers. A [!INCLUDE [fabric-se](includes/fabric-se.md)] can be used to analyze data in the gold layer of medallion architecture if the files are stored in `Delta Lake` format, even if they're stored outside the [!INCLUDE [product-name](../includes/product-name.md)] OneLake.

You can use [OneLake shortcuts](../data-engineering/lakehouse-shortcuts.md) to reference gold folders in external Azure Data Lake storage accounts that are managed by Synapse Spark or Azure Databricks engines.

Warehouses can also be added as subject area or domain oriented solutions for specific subject matter that can have bespoke analytics requirements. 

If you choose to keep your data in Fabric, it will **always be open** and accessible through APIs, Delta format, and of course T-SQL.

### Query as a service over your delta tables from Lakehouse and other items from OneLake Data Hub

There are use cases where an analyst, data scientist, or data engineer might need to query data within a data lake. In Fabric, this end to end experience is completely SaaSified.

[OneLake](../onelake/onelake-overview.md) is a single, unified, logical data lake for the whole organization. OneLake is OneDrive for data. OneLake can contain multiple workspaces, for example, along your organizational divisions. Every item in Fabric makes it data accessible via OneLake. 

Data in a Microsoft Fabric Lakehouse is physically stored in OneLake with the following folder structure:

- The `/Files` folder contains raw and unconsolidated (bronze) files that should be processed by data engineers before they're analyzed. The files might be in various formats such as CSV, Parquet, different types of images, etc.
- The `/Tables` folder contains refined and consolidated (gold) data that is ready for business analysis. The consolidated data is in Delta Lake format.

A [!INCLUDE [fabric-se](includes/fabric-se.md)] can read data in the `/tables` folder within OneLake. Analysis is as simple as querying the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse. Together with the Warehouse, you also get cross-database queries and the ability to seamless switch from read-only queries to building additional business logic on top of your OneLake data with Synapse Data Warehouse.

### Data Engineering with Spark, and Serving with SQL

Data-driven enterprises need to keep their back-end and analytics systems in near real-time sync with customer-facing applications. The impact of transactions must reflect accurately through end-to-end processes, related applications, and online transaction processing (OLTP) systems.

In Fabric, you can leverage Spark Streaming or Data Engineering to curate your data. You can use the Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] to validate data quality and for existing T-SQL processes. This can be done in a medallion architecture or within multiple layers of your Lakehouse, serving bronze, silver, gold, or staging, curated, and refined data. You can customize the folders and tables created through Spark to meet your data engineering and business requirements. When ready, you can then leverage a Warehouse to serve all of your downstream business intelligence applications and other analytics use cases, without copying data, using Views or refining data using CREATE TABLE AS SELECT (CTAS), stored procedures, and other DML / DDL commands.

### Integration with your Open Lakehouse's gold layer

A [!INCLUDE [fabric-se](includes/fabric-se.md)] is not scoped to data analytics in just the Fabric Lakehouse. A [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to analyze lake data in any lakehouse, using Synapse Spark, Azure Databricks, or any other lake-centric data engineering engine. The data can be stored in Azure Data Lake Storage or Amazon S3.

This tight, bi-directional integration with the Fabric Lakehouse is always accessible through any engine with open APIs, the Delta format, and of course T-SQL.

### Data Virtualization of external data lakes with shortcuts

You can use OneLake [shortcuts](../data-engineering/lakehouse-shortcuts.md) to reference gold folders in external Azure Data Lake storage accounts that are managed by Synapse Spark or Azure Databricks engines, as well as any delta table stored in Amazon S3.

Any folder referenced using a shortcut can be analyzed from a [!INCLUDE [fabric-se](includes/fabric-se.md)] and a SQL table is created for the referenced data. The SQL table can be used to expose data in externally managed data lakes and enable analytics on them.

This shortcut acts as a virtual warehouse that can leveraged from a warehouse for additional downstream analytics requirements, or queried directly.

Use the following steps to analyze data in external data lake storage accounts:

1. Create a shortcut that references a folder in [Azure Data Lake storage](../onelake/create-adls-shortcut.md) or [Amazon S3 account](../onelake/create-s3-shortcut.md). Once you enter connection details and credentials, a shortcut is shown in the Lakehouse.
1. Switch to the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse and find a SQL table that has a name that matches the shortcut name. This SQL table references the folder in ADLS/S3 folder.
1. Query the SQL table that references data in ADLS/S3. The table can be used as any other table in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. You can join tables that reference data in different storage accounts.

> [!NOTE]
> If the SQL table is not immediately shown in the [!INCLUDE [fabric-se](includes/fabric-se.md)], you might need to wait a few minutes. The SQL table that references data in external storage account is created with a delay. 

### Analyze archived, or historical data in a data lake

Data partitioning is a well-known data access optimization technique in data lakes. Partitioned data sets are stored in the hierarchical folders structures in the format `/year=<year>/month=<month>/day=<day>`, where `year`, `month`, and `day` are the partitioning columns. This allows you to store historical data logically separated in a format that allows compute engines to read the data as needed with performant filtering, versus reading the entire directory and all folders and files contained within.

Partitioned data enables faster access if the queries are filtering on the predicates that compare predicate columns with a value.

A [!INCLUDE [fabric-se](includes/fabric-se.md)] can easily read this type of data with no configuration required. For example, you can use any application to archive data into a data lake, including SQL Server 2022 or Azure SQL Managed Instance. After you partitioning data and land it in a lake for archival purposes with external tables, a [!INCLUDE [fabric-se](includes/fabric-se.md)] can read partitioned Delta Lake tables as SQL tables and allow your organization to analyze them. This reduces the total cost of ownership, reduces data duplication, and lights up big data, AI, other analytics scenarios.

### Data virtualization of Fabric data with shortcuts

Within Fabric, workspaces allow you to segregate data based on complex business, geographic, or regulatory requirements.

A [!INCLUDE [fabric-se](includes/fabric-se.md)] enables you to leave the data in place and still analyze data in the Warehouse or Lakehouse, even in other Microsoft Fabric workspaces, via a seamless virtualization. Every Microsoft Fabric Lakehouse stores data in OneLake.

[Shortcuts](../data-engineering/lakehouse-shortcuts.md) enable you to reference folders in any OneLake location.

Every Microsoft Fabric Warehouse stores table data in OneLake. If a table is append-only, the table data is exposed as Delta Lake data in OneLake. Shortcuts enable you to reference folders in any OneLake where the Warehouse tables are exposed.

### Cross workspace sharing and querying

While workspaces allow you to segregate data based on complex business, geographic, or regulatory requirements, sometimes you need to facilitate sharing across these lines for specific analytics needs.

A Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] can enable easy sharing of data between departments and users, where a user can bring their own capacity and warehouse. Workspaces organize departments, business units, or analytical domains. Using shortcuts, users can find any Warehouse or Lakehouse's data. Users can instantly perform their own customized analytics from the same shared data. In addition to helping with departmental chargebacks and usage allocation, this is a zero-copy version the data as well.

The [!INCLUDE [fabric-se](includes/fabric-se.md)] enables querying of any table and easy sharing. The added controls of workspace roles and security roles that can be further layered to meet additional business requirements.

Use the following steps to enable cross-workspace data analytics:

1. Create a OneLake shortcut that references a table or a folder in a workspace that you can access.
1. Choose a Lakehouse or Warehouse that contains a table or Delta Lake folder that you want to analyze. Once you select a table/folder, a shortcut is shown in the Lakehouse.
1. Switch to the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse and find the SQL table that has a name that matches the shortcut name. This SQL table references the folder in another workspace.
1. Query the SQL table that references data in another workspace. The table can be used as any other table in the [!INCLUDE [fabric-se](includes/fabric-se.md)]. You can join the tables that reference data in different workspaces.

> [!NOTE]
> If the SQL table is not immediately shown in the [!INCLUDE [fabric-se](includes/fabric-se.md)], you might need to wait a few minutes. The SQL table that references data in another workspace is created with a delay.

## Analyze partitioned data

Data partitioning is a well-known data access optimization technique in data lakes. Partitioned data sets are stored in the hierarchical folders structures in the format `/year=<year>/month=<month>/day=<day>`, where `year`, `month`, and `day` are the partitioning columns. Partitioned data sets enable faster data access if the queries are filtering data using the predicates that filter data by comparing predicate columns with a value.

A [[!INCLUDE [fabric-se](includes/fabric-se.md)]](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) can represent partitioned Delta Lake data sets as SQL tables and enable you to analyze them.

## Related content

- [What is a lakehouse?](../data-engineering/lakehouse-overview.md)
- [Create a lakehouse with OneLake](../onelake/create-lakehouse-onelake.md)
- [Default Power BI semantic models](semantic-models.md)
- [Load data into the lakehouse](../data-engineering/load-data-lakehouse.md)
- [How to copy data using Copy activity in Data pipeline](../data-factory/copy-data-activity.md)
- [Tutorial: Move data into lakehouse via Copy assistant](../data-factory/tutorial-move-data-lakehouse-copy-assistant.md)
- [Connectivity](connectivity.md)
- [[!INCLUDE [fabric-se](includes/fabric-se.md)] of the lakehouse](data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse)
- [Query the Warehouse](query-warehouse.md)
