---
title: Lakehouse SQL analytics endpoint use cases
description: Learn more about scenarios for the lakehouse and data warehousing workloads in Microsoft Fabric.
ms.reviewer: tvilutis, rakrish, anphil, joanpo
ms.date: 05/19/2026
ms.topic: concept-article
ms.search.form: SQL Analytics Endpoint overview, Warehouse in workspace overview # This article's title should not change. If so, contact engineering.
---
# Lakehouse SQL analytics endpoint use cases

The SQL analytics endpoint is a read-optimized, T-SQL surface over Delta data in Microsoft Fabric. This article explains the Fabric data warehousing workload with the [SQL analytics endpoint](lakehouse-sql-analytics-endpoint.md) of the Lakehouse, and scenarios for use of the Lakehouse in data warehousing.

## What is a Lakehouse SQL analytics endpoint?

The SQL analytics endpoint enables you to query data in the Lakehouse by using T-SQL language and TDS protocol. 

- The SQL analytics endpoint exposes Delta tables from the Lakehouse as SQL tables that you can query with T-SQL.
- Every delta table from a Lakehouse is represented as one table. Data should be in delta format.
- Every Lakehouse has one SQL analytics endpoint, and each workspace can have more than one Lakehouse. Warehouses, mirrored databases, and SQL databases in Fabric also each auto-provision their own SQL analytics endpoint, so a workspace can have more SQL analytics endpoints than Lakehouse items.

You don't need to create a SQL analytics endpoint in Microsoft Fabric. A SQL analytics endpoint is automatically created for every lakehouse, database, or mirrored database. A SQL analytics endpoint acts as a lightweight data warehousing capability for their parent items, complementing the warehouse's lakehouse architecture. This architecture allows Spark or Fabric mirroring to control data in a folder structure in the lakehouse that the SQL analytics endpoint can view.

> [!NOTE]
> Behind the scenes, the SQL analytics endpoint uses the same engine as the [Warehouse](../data-warehouse/data-warehousing.md#fabric-data-warehouse) to serve high performance, low latency SQL queries.

### Automatic metadata discovery

A seamless process reads the Delta logs from the `/Tables` folder and ensures SQL metadata for tables, such as statistics, is always up to date. There's no user action needed, and no need to import, copy data, or set up infrastructure. For more information, see [Automatically generated schema in the SQL analytics endpoint](sql-analytics-endpoint-performance.md#automatically-generated-schema-in-the-sql-analytics-endpoint-of-the-lakehouse).

## Scenarios the Lakehouse enables for data warehousing

In Fabric, we offer one warehouse.

The Lakehouse, with its SQL analytics endpoint, powered by the Warehouse, can simplify the traditional decision tree of batch, streaming, or lambda architecture patterns. Together with a warehouse, the lakehouse enables many additive analytics scenarios. This section explores how to use a Lakehouse together with a Warehouse for a best of breed analytics strategy.

### Analytics with your Fabric Lakehouse's gold layer

A well-known strategy for lake data organization is [medallion architecture](../onelake/onelake-medallion-lakehouse-architecture.md). This strategy organizes files into raw (bronze), consolidated (silver), and refined (gold) layers. You can use a SQL analytics endpoint to analyze data in the gold layer of medallion architecture if the files are stored in Delta Lake format, even if they're stored outside the [!INCLUDE [product-name](../includes/product-name.md)] OneLake.

Use [OneLake shortcuts](lakehouse-shortcuts.md) to reference gold folders in external Azure Data Lake storage accounts that Synapse Spark or Azure Databricks engines manage.

You can also add warehouses as subject area or domain oriented solutions for specific subject matter that can have bespoke analytics requirements. 

If you choose to keep your data in Fabric, it is **always open** and accessible through APIs, Delta format, and of course T-SQL.

### Query as a service over your delta tables from Lakehouse and other items from OneLake

Analysts, data scientists, and data engineers might need to query data within a data lake. In Fabric, this end-to-end experience is completely SaaSified.

[OneLake](../onelake/onelake-overview.md) is a single, unified, logical data lake for the whole organization. OneLake is OneDrive for data. OneLake can contain multiple workspaces, for example, along your organizational divisions. Every item in Fabric makes data accessible via OneLake. 

Data in a Microsoft Fabric Lakehouse is physically stored in OneLake with the following folder structure:

- The `/Files` folder contains raw and unconsolidated (bronze) files that data engineers should process before analysis. The files might be in various formats such as CSV, Parquet, different types of images, and more.
- The `/Tables` folder contains refined and consolidated (gold) data that's ready for business analysis. The consolidated data is in Delta Lake format.

A SQL analytics endpoint can read data in the `/tables` folder within OneLake. Analysis is as simple as querying the SQL analytics endpoint of the Lakehouse. Together with the Warehouse, you also get cross-database queries and the ability to seamlessly switch from read-only queries to building additional business logic on top of your OneLake data with Fabric Data Warehouse.

### Data Engineering with Spark, and Serving with SQL

Data-driven enterprises need to keep their back-end and analytics systems in near real-time sync with customer-facing applications. The impact of transactions must reflect accurately through end-to-end processes, related applications, and online transaction processing (OLTP) systems.

In Fabric, you can use Spark Streaming or Data Engineering to curate your data. You can use the Lakehouse SQL analytics endpoint to validate data quality and for existing T-SQL processes. This can be done in a medallion architecture or within multiple layers of your Lakehouse, serving bronze, silver, gold, or staging, curated, and refined data. You can customize the folders and tables created through Spark to meet your data engineering and business requirements. When ready, a Warehouse can serve all of your downstream business intelligence applications and other analytics use cases, without copying data, using Views or refining data using `CREATE TABLE AS SELECT` (CTAS), stored procedures, and other DML / DDL commands.

### Integration with your Open Lakehouse's gold layer

A SQL analytics endpoint isn't limited to data analytics in just the Fabric Lakehouse. By using a SQL analytics endpoint, you can analyze lake data in any lakehouse by using Synapse Spark, Azure Databricks, or any other lake-centric data engineering engine. You can store the data in Azure Data Lake Storage or Amazon S3.

You can always access this tight, bi-directional integration with the Fabric Lakehouse through any engine by using open APIs, the Delta format, and of course T-SQL.

### Data virtualization of external data lakes with shortcuts

Use OneLake [shortcuts](lakehouse-shortcuts.md) to reference gold folders in external Azure Data Lake storage accounts that Synapse Spark or Azure Databricks engines manage, as well as any delta table stored in Amazon S3.

You can analyze any folder referenced by a shortcut from a SQL analytics endpoint and create a SQL table for the referenced data. Use the SQL table to expose data in externally managed data lakes and enable analytics on them.

This shortcut acts as a virtual warehouse that you can leverage from a warehouse for additional downstream analytics requirements, or query directly.

To analyze data in external data lake storage accounts, use the following steps:

1. Create a shortcut that references a folder in [Azure Data Lake storage](../onelake/create-adls-shortcut.md) or [Amazon S3 account](../onelake/create-s3-shortcut.md). After you enter connection details and credentials, a shortcut is shown in the Lakehouse.
1. Switch to the SQL analytics endpoint of the Lakehouse and find a SQL table that has a name that matches the shortcut name. This SQL table references the folder in ADLS or S3.
1. Query the SQL table that references data in ADLS or S3. Use the table as you would any other table in the SQL analytics endpoint. You can join tables that reference data in different storage accounts.

> [!NOTE]
> If the SQL table doesn't immediately show in the SQL analytics endpoint, wait a few minutes. The SQL table that references data in external storage account is created with a delay. 

### Analyze archived or historical data in a data lake

Data partitioning is a well-known data access optimization technique in data lakes. Store partitioned data sets in hierarchical folder structures in the format `/year=<year>/month=<month>/day=<day>`, where `year`, `month`, and `day` are the partitioning columns. This structure keeps historical data logically separated and enables compute engines to read the data as needed with performant filtering, rather than reading the entire directory and all folders and files within.

Partitioned data enables faster access if the queries filter on the predicates that compare predicate columns with a value.

A SQL analytics endpoint can easily read this type of data with no configuration required. For example, you can use any application to archive data into a data lake, including SQL Server 2022 or Azure SQL Managed Instance. After you partition data and land it in a lake for archival purposes by using external tables, a SQL analytics endpoint can read partitioned Delta Lake tables as SQL tables and allow your organization to analyze them. This approach reduces the total cost of ownership, reduces data duplication, and lights up big data, AI, and other analytics scenarios.

You can also use [time travel](../data-warehouse/time-travel.md) queries to quickly query prior versions of data. Time travel is a low-cost and efficient capability to query the past states of data with T-SQL queries. For a Lakehouse SQL analytics endpoint, time travel is limited by [vacuum retention settings](../data-engineering/lakehouse-table-maintenance.md#vacuum-retention-settings). To get started, see [How to: Query using time travel at the statement level](../data-warehouse/how-to-query-using-time-travel.md).

### Data virtualization of Fabric data with shortcuts

Within Fabric, workspaces allow you to segregate data based on complex business, geographic, or regulatory requirements.

A SQL analytics endpoint enables you to leave the data in place and still analyze data in the Warehouse or Lakehouse, even in other Microsoft Fabric workspaces, via a seamless virtualization. Every Microsoft Fabric Lakehouse stores data in OneLake.

[Shortcuts](lakehouse-shortcuts.md) enable you to reference folders in any OneLake location.

Every Microsoft Fabric Warehouse stores table data in OneLake. If a table is append-only, the table data is exposed as Delta Lake data in OneLake. Shortcuts enable you to reference folders in any OneLake where the Warehouse tables are exposed.

### Cross workspace sharing and querying

While workspaces allow you to segregate data based on complex business, geographic, or regulatory requirements, sometimes you need to facilitate sharing across these lines for specific analytics needs.

A Lakehouse SQL analytics endpoint can enable easy sharing of data between departments and users, where a user can bring their own capacity and warehouse. Workspaces organize departments, business units, or analytical domains. By using shortcuts, users can find any Warehouse or Lakehouse's data. Users can instantly perform their own customized analytics from the same shared data. In addition to helping with departmental chargebacks and usage allocation, this approach is a zero-copy version of the data.

The SQL analytics endpoint enables querying of any table and easy sharing. You can add controls by using workspace roles and security roles to meet additional business requirements.

To enable cross-workspace data analytics, use the following steps:

1. Create a OneLake shortcut that references a table or a folder in a workspace that you can access.
1. Choose a Lakehouse or Warehouse that contains a table or Delta Lake folder that you want to analyze. When you select a table or folder, a shortcut appears in the Lakehouse.
1. Switch to the SQL analytics endpoint of the Lakehouse and find the SQL table that has a name that matches the shortcut name. This SQL table references the folder in another workspace.
1. Query the SQL table that references data in another workspace. You can use the table as you would any other table in the SQL analytics endpoint. You can join the tables that reference data in different workspaces.

For more information about security in the SQL analytics endpoint, see [OneLake security for SQL analytics endpoints](../onelake/security/sql-analytics-endpoint-onelake-security.md).

> [!NOTE]
> If the SQL table doesn't immediately appear in the SQL analytics endpoint, wait a few minutes. The SQL table that references data in another workspace is created with a delay.

## Analyze partitioned data

Data partitioning is a well-known data access optimization technique in data lakes. You store partitioned data sets in hierarchical folder structures in the format `/year=<year>/month=<month>/day=<day>`, where `year`, `month`, and `day` are the partitioning columns. Partitioned data sets enable faster data access if the queries use predicates that filter data by comparing predicate columns with a value.

A [SQL analytics endpoint](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse) can represent partitioned Delta Lake data sets as SQL tables and enable you to analyze them.

For more information and examples on querying external data, see [Query external data lake files by using Fabric Data Warehouse or SQL analytics endpoint](../data-warehouse/query-external-data-lake-files.md). For an example and use case for querying partitioned parquet files, see [Query partitioned data](../data-warehouse/query-parquet-files.md#query-partitioned-data-with-openrowset).

## Analyze data in the Lakehouse, Warehouse, or Eventhouse

[!INCLUDE [analyze-data-eventhouse-endpoint](../includes/analyze-data-eventhouse-endpoint.md)]

## Related content

- [What is a lakehouse in Microsoft Fabric?](lakehouse-overview.md)
- [Microsoft Fabric decision guide: Choose between Warehouse and Lakehouse](../fundamentals/decision-guide-lakehouse-warehouse.md)
- [Bring your data to OneLake with Lakehouse](../onelake/create-lakehouse-onelake.md)
- [Power BI semantic models in Microsoft Fabric](../data-warehouse/semantic-models.md)
- [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md)
- [How to copy data using copy activity](../data-factory/copy-data-activity.md)
- [Move data from Azure SQL DB into Lakehouse via copy assistant](../data-factory/tutorial-move-data-lakehouse-copy-assistant.md)
- [Connectivity to data warehousing in Microsoft Fabric](../data-warehouse/connectivity.md)
- [SQL analytics endpoint of the lakehouse](../data-warehouse/data-warehousing.md#sql-analytics-endpoint-of-the-lakehouse)
- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](../data-warehouse/query-warehouse.md)
