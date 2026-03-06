---
title: Mirroring
description: Learn about mirrored databases in Microsoft Fabric.
ms.reviewer: imotiwala, chweb, maprycem, cynotebo, tinglee, sbahadur
ms.date: 03/18/2026
ms.topic: overview
ms.search.form: Fabric Mirroring
no-loc: Copilot
---

# What is Mirroring in Fabric?

Mirroring in Fabric is a low-cost and low-latency solution that brings data from various systems together into a single analytics platform. You can continuously replicate your existing data estate directly into Fabric's OneLake from various Azure databases and external data sources.

With the most up-to-date data in a queryable format in OneLake, you can use all the different services in Fabric, such as running analytics with Spark, executing notebooks, data engineering, visualizing through Power BI Reports, and more.

By using Mirroring in Fabric, you get a highly integrated, end-to-end, and easy-to-use product that simplifies your analytics needs. Mirroring is built for openness and collaboration between Microsoft and technology solutions that can read the open-source Delta Lake table format. It's a low-cost and low-latency turnkey solution that creates a replica of your data in OneLake for all your analytical needs.

You can use the Delta tables everywhere in Fabric, which helps you accelerate your journey into Fabric.

You enable mirroring by creating a secure connection to your operational data source. You choose whether to replicate an entire database or individual tables, and Mirroring automatically keeps your data in sync. Once set up, data continuously replicates into OneLake for analytics consumption.

## Why use Mirroring in Fabric?

Today many organizations have mission critical operational or analytical data sitting in silos.

Accessing and working with this data requires complex ETL (Extract Transform Load) pipelines, business processes, and decision silos, creating:

- Restricted and limited access to important, ever changing, data
- Friction between people, process, and technology
- Long wait times to create pipelines and processes to critically important data
- No freedom to use the tools you need to analyze and share insights comfortably
- Lack of a proper foundation for folks to share and collaborate on data
- No common, open data formats for all analytical scenarios - BI, AI, Integration, Engineering, and even Apps

Mirroring in Fabric provides an easy experience to speed the time-to-value for insights and decisions, and to break down data silos between technology solutions:

- Near real time replication of data and metadata into a SaaS data-lake, with built-in analytics for BI and AI

The Microsoft Fabric platform is built on a foundation of Software as a Service (SaaS), which takes simplicity and integration to a whole new level. To learn more about Microsoft Fabric, see [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md)

The following are core tenets of Mirroring:

- Enabling Mirroring in Fabric is simple and intuitive, without needing to create complex ETL pipelines, allocate other compute resources, or manage data movement.

- Mirroring in Fabric is a fully managed service, so you don't have to worry about hosting, maintaining, or managing replication of the mirrored connection.

## Mirroring objects

Mirroring creates these items in your Fabric workspace:

- A process that manages the replication of data and metadata into [OneLake](../onelake/onelake-overview.md) and conversion to Parquet, in an analytics-ready format. This process enables downstream scenarios like data engineering, data science, and more.
- A [SQL analytics endpoint](../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md)

In addition to the [SQL query editor](../data-warehouse/sql-query-editor.md), there's a broad ecosystem of tooling including [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), [the MSSQL extension for Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), and even GitHub Copilot.

[Sharing](#sharing) makes it easy to control access and manage permissions, so you can protect sensitive information. Sharing also enables secure and democratized decision-making across your organization.

## Types of mirroring

Microsoft Fabric offers three different approaches for bringing data into OneLake through mirroring.

- **Database mirroring** - Database mirroring in Fabric replicates entire databases and tables to bring data from various systems together into a single analytics platform.
- **Metadata mirroring** - Metadata mirroring in Fabric synchronizes metadata (such as catalog names, schemas, and tables) instead of physically moving the data. This approach uses [shortcuts](../onelake/onelake-shortcuts.md), ensuring the data remains in its source while still being easily accessible within Fabric.
- **Open mirroring** - Open mirroring in Fabric is designed to extend mirroring based on open Delta Lake table format. This capability enables any developer to write their application's change data directly into a mirrored database item in Fabric, based on the open mirroring approach and public APIs.

Currently, the following external databases are available:

| Platform | Near real-time replication | Type of mirroring | End-to-end tutorial |
| :-- | :-- | :-- |
| [Microsoft Fabric mirrored databases from Azure Cosmos DB](azure-cosmos-db.md) | Yes | Database mirroring | [Tutorial: Azure Cosmos DB](azure-cosmos-db-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure Databricks](azure-databricks.md) | Yes | Metadata mirroring | [Tutorial: Azure Databricks](azure-databricks-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure Database for PostgreSQL](azure-database-postgresql.md) | Yes | Database mirroring | [Tutorial: Azure Database for PostgreSQL](azure-database-postgresql-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure Database for MySQL (preview)](mysql/azure-database-mysql.md) | Yes | Database mirroring | [Tutorial: Azure Database for MySQL (preview)](mysql/azure-database-mysql-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure SQL Database](azure-sql-database.md) | Yes | Database mirroring | [Tutorial: Azure SQL Database](azure-sql-database-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure SQL Managed Instance](azure-sql-managed-instance.md) | Yes | Database mirroring | [Tutorial: Azure SQL Managed Instance](azure-sql-managed-instance-tutorial.md) |
| [Microsoft Fabric mirrored databases from Google BigQuery (preview)](google-bigquery.md) | Yes | Database mirroring | [Tutorial: Google BigQuery](google-bigquery-tutorial.md) |
| [Microsoft Fabric mirrored databases from Oracle (preview)](oracle.md) | Yes | Database mirroring | [Tutorial: Oracle](oracle-tutorial.md) |
| [Microsoft Fabric mirrored databases from SAP](sap.md) | Yes | Database mirroring | [Tutorial: SAP](sap-datasphere-tutorial.md) |
| [Microsoft Fabric mirrored databases from Snowflake](snowflake.md) | Yes | Database mirroring | [Tutorial: Snowflake](snowflake-tutorial.md) |
| [Microsoft Fabric mirrored databases from SQL Server](sql-server.md) | Yes | Database mirroring | [Tutorial: SQL Server](sql-server-tutorial.md) |
| [Open mirrored databases](open-mirroring.md) | Yes | Open mirroring | [Tutorial: Open mirroring](open-mirroring-tutorial.md) |
| [Microsoft Fabric mirrored databases from Fabric SQL database](../database/sql/overview.md) | Yes | Database mirroring | [Automatically configured](../database/sql/mirroring-overview.md) |

## Near real-time replication

Near real-time replication can depend on various factors, including:

- Location or region of source
- Location or region of destination
- Volume of changes
- Frequency of changes
- Network bandwidth and latency from source
- Compute resources allocated to the on-premises data gateway

## How does database mirroring work?

Delta files arrive incrementally in Fabric from the data source. The method of identifying the incrementally changed data varies in each data source. In SQL Server 2025, for example, the SQL Database Engine scans the source database's transaction log at a high frequency. SQL Server publishes changes for each table to corresponding files in the Fabric landing zone.

Inside Fabric, a replicator engine always runs and scans for newly published files at a high frequency. Fabric immediately merges incoming changes into the target delta table. Changes can be published as fast as every 15 seconds.

Backoff logic that detects low activity avoids excessive overhead on data source engines outside of Fabric and lowers latency by responding to the frequency of incoming data changes.

:::image type="content" source="media/overview/fabric-mirror-overview.svg" alt-text="Diagram of how Fabric Database Mirroring works.":::

## How does metadata mirroring work?

Mirroring not only enables data replication but can also be achieved through shortcuts or metadata mirroring rather than full data replication, allowing data to be available without physically moving or duplicating it. Mirroring in this context refers to replicating only metadata-such as catalog names, schemas, and tables-rather than the actual data itself. This approach enables Fabric to make data from different sources accessible without duplicating it, simplifying data management and minimizing storage needs.

For example, when accessing [data registered in Unity Catalog, Fabric mirrors only the catalog structure from Azure Databricks](azure-databricks.md), allowing the underlying data to be accessed through shortcuts. This method ensures that any changes in the source data are instantly reflected in Fabric without requiring data movement, maintaining real-time synchronization and enhancing efficiency in accessing up-to-date information.

## How does open mirroring work?

In addition to enabling data replication by creating a secure connection to your data source, mirroring lets you select an existing data provider or write your own application to land data into a mirrored database. When you create an [open mirrored database](open-mirroring.md) through the public API or the Fabric portal, you get a landing zone URL in OneLake where you can land change data per open mirroring specification.

Once data is in the landing zone with the proper format, replication starts running and manages the complexity of merging the changes with updates, insert, and delete to be reflected into delta tables. This method ensures that any data written into the landing zone is immediately reflected, keeping the data in Fabric up-to-date.

## Sharing

Sharing makes access control and management easier. Security controls like row-level security (RLS), object level security (OLS), and more make sure you can control access to sensitive information. Sharing also enables secure and democratized decision-making across your organization.

By sharing, users grant other users or a group of users access to a mirrored database without giving access to the workspace and the rest of its items. When someone shares a mirrored database, they also grant access to the SQL analytics endpoint.

For more information, see [Share your mirrored database and manage permissions](share-and-manage-permissions.md).

## Cross-database queries

With the data from your mirrored database stored in OneLake, you can write cross-database queries, joining data from mirrored databases, warehouses, and the SQL analytics endpoints of Lakehouses in a single T-SQL query. For more information, see [Write a cross-database query](../data-warehouse/query-warehouse.md#write-a-cross-database-query).

For example, you can reference the table from mirrored databases and warehouses by using three-part naming. In the following example, use the three-part name to refer to `ContosoSalesTable` in the warehouse `ContosoWarehouse`. From other databases or warehouses, the first part of the standard SQL three-part naming convention is the name of the mirrored database.

```sql
SELECT *
FROM ContosoWarehouse.dbo.ContosoSalesTable AS Contoso
INNER JOIN Affiliation
ON Affiliation.AffiliationId = Contoso.RecordTypeID;
```

## Cost of mirroring

For database mirroring and open mirroring, the Fabric compute and OneLake storage are free up to a capacity-based limit.

- Storage for replicas is free up to a limit based on the capacity size. Mirroring offers a free terabyte of mirroring storage for every capacity unit (CU) you purchase. For example, if you purchase an F64 capacity, you get 64 free terabytes worth of storage, exclusively used for mirroring. You pay for OneLake storage if you exceed the free mirroring storage limit or when the capacity is paused. For more information, see [Microsoft Fabric Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).
- Background Fabric compute used to replicate your data into Fabric OneLake is free and doesn't consume capacity. Requests directly to the OneLake for mirrored data consume capacity as normal OneLake compute consumption. The compute for querying data by using SQL, Power BI, or Spark is charged at regular rates.
- A running Fabric capacity is required only for the initial setup of mirroring.

## Data engineering with your mirrored database data

Microsoft Fabric provides various data engineering capabilities to ensure that your data is easily accessible, well-organized, and high-quality. From [Fabric Data Engineering](../data-engineering/data-engineering-overview.md), you can:

- Create and manage your data as Spark using a lakehouse
- Design pipelines to copy data into your lakehouse
- Use Spark job definitions to submit batch or streaming job to Spark cluster
- Use notebooks to write code for data ingestion, preparation, and transformation

## Data science with your mirrored database data

Microsoft Fabric offers Fabric Data Science to empower users to complete end-to-end data science workflows for the purpose of data enrichment and business insights. You can complete a wide range of activities across the entire data science process, starting from data exploration, preparation and cleansing to experimentation, modeling, model scoring and serving of predictive insights to BI reports.

Microsoft Fabric users can access [Data Science workloads](../data-science/data-science-overview.md). From there, they can discover and access various relevant resources. For example, they can create machine learning Experiments, Models and Notebooks. They can also import existing Notebooks on the Data Science Home page.

## Direct Lake with your mirrored database data

You can use [Direct Lake](../fundamentals/direct-lake-overview.md) mode with mirrored databases in Microsoft Fabric to enable high-performance querying over mirrored data without the need for data movement or duplication. When you create a mirrored database, its data is stored in Delta Lake format within OneLake. This native format allows Power BI and other analytics tools to connect via Direct Lake mode, offering near real-time insights by directly accessing the underlying files. This integration combines the simplicity of mirroring with the speed and scalability of Direct Lake, enabling fast, up-to-date reporting on operational data.

## Retention for mirrored data

Mirroring in Fabric continuously replicates your existing data estate into OneLake in Delta Lake table format. To keep the mirrored data efficiently stored and always ready for analytics, mirroring automatically runs vacuum to remove old files no longer referenced by a Delta log.

You can customize the retention setting according to your requirements. For instance, you might choose a shorter retention period to reduce mirroring storage consumption or extend the retention period to utilize Delta's time travel capabilities for analytics.

For mirrored databases created from the Fabric portal after mid-June 2025, the default retention is one day. For old mirrored databases, the default is seven days. To check or update the retention setting, in the Fabric portal, navigate to your mirrored database -> **Settings** -> **Delta table management** tab, and specify the retention threshold. You can also configure it via [public API](mirrored-database-rest-api.md#configure-data-retention) by specifying the `retentionInDays` property.

## SQL database in Fabric

You can also directly create and manage a [SQL database in Microsoft Fabric](../database/sql/overview.md) inside the Fabric portal. Based on [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview?view=azuresqldb-current&preserve-view=true), SQL database in Fabric automatically mirrors data for analytics purposes and you can easily create your operational database in Fabric. SQL database is the home in Fabric for OLTP workloads, and it can integrate with Fabric's [source control integration](../database/sql/source-control.md).

## Related content

- [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md)
- [What is the SQL analytics endpoint for a lakehouse?](../data-engineering/lakehouse-sql-analytics-endpoint.md)
- [Direct Lake overview](../fundamentals/direct-lake-overview.md)
