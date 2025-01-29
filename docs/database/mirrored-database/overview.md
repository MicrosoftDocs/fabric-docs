---
title: "Mirroring"
description: Learn about mirrored databases in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: imotiwala, chweb, maprycem, cynotebo, tinglee, sbahadur
ms.date: 11/20/2024
ms.topic: overview
ms.custom:
  - ignite-2024
ms.search.form: Fabric Mirroring
no-loc: [Copilot]
---

# What is Mirroring in Fabric?

Mirroring in Fabric is a low-cost and low-latency solution to bring data from various systems together into a single analytics platform. You can continuously replicate your existing data estate directly into Fabric's OneLake from a variety of Azure databases and external data sources.

With the most up-to-date data in a queryable format in OneLake, you can now use all the different services in Fabric, such as running analytics with Spark, executing notebooks, data engineering, visualizing through Power BI Reports, and more.

Mirroring in Fabric allows users to enjoy a highly integrated, end-to-end, and easy-to-use product that is designed to simplify your analytics needs. Built for openness and collaboration between Microsoft, and technology solutions that can read the open-source Delta Lake table format, Mirroring is a low-cost and low-latency turnkey solution that allows you to create a replica of your data in OneLake which can be used for all your analytical needs.

The Delta tables can then be used everywhere Fabric, allowing users to accelerate their journey into Fabric.

## Why use Mirroring in Fabric?

Today many organizations have mission critical operational or analytical data sitting in silos.

Accessing and working with this data today requires complex ETL (Extract Transform Load) pipelines, business processes, and decision silos, creating:

- Restricted and limited access to important, ever changing, data
- Friction between people, process, and technology
- Long wait times to create data pipelines and processes to critically important data
- No freedom to use the tools you need to analyze and share insights comfortably
- Lack of a proper foundation for folks to share and collaborate on data
- No common, open data formats for all analytical scenarios - BI, AI, Integration, Engineering, and even Apps

Mirroring in Fabric provides an easy experience to speed the time-to-value for insights and decisions, and to break down data silos between technology solutions:

- Near real time replication of data and metadata into a SaaS data-lake, with built-in analytics built-in for BI and AI

The Microsoft Fabric platform is built on a foundation of Software as a Service (SaaS), which takes simplicity and integration to a whole new level. To learn more about Microsoft Fabric, see [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)

Mirroring creates three items in your Fabric workspace:

- Mirroring manages the replication of data and metadata into [OneLake](../../onelake/onelake-overview.md) and conversion to Parquet, in an analytics-ready format. This enables downstream scenarios like data engineering, data science, and more.
- A [SQL analytics endpoint](../../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md)
- A [Default semantic model](../../data-warehouse/semantic-models.md)

In addition to the [SQL query editor](../../data-warehouse/sql-query-editor.md), there's a broad ecosystem of tooling including [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), [the mssql extension with Visual Studio Code](/sql/tools/visual-studio-code/mssql-extensions?view=fabric&preserve-view=true), and even GitHub Copilot.

[Sharing](#sharing) enables ease of access control and management, to make sure you can control access to sensitive information. Sharing also enables secure and democratized decision-making across your organization.

## Types of mirroring

Fabric offers three different approaches in bringing data into OneLake through mirroring.

- **Database mirroring** – Database mirroring in Microsoft Fabric allows replication of entire databases and tables, allowing you to bring data from various systems together into a single analytics platform.
- **Metadata mirroring** – Metadata mirroring in Fabric synchronizes metadata (such as catalog names, schemas, and tables) instead of physically moving the data. This approach leverages [shortcuts](../../onelake/onelake-shortcuts.md), ensuring the data remains in its source while still being easily accessible within Fabric.
- **Open mirroring** – Open mirroring in Fabric is designed to extend mirroring based on open Delta Lake table format. This capability enables any developer to write their application's change data directly into a mirrored database item in Microsoft Fabric, based on the open mirroring approach and public APIs.

Currently, the following external databases are available:

| Platform | Near real-time replication | Type of mirroring | End-to-end tutorial |
|:--|:--|:--|
| [Microsoft Fabric mirrored databases from Azure Cosmos DB (preview)](azure-cosmos-db.md) | Yes | Database mirroring | [Tutorial: Azure Cosmos DB](azure-cosmos-db-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure Databricks (preview)](azure-databricks.md) | Yes | Metadata mirroring | [Tutorial: Azure Databricks](azure-databricks-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure SQL Database](azure-sql-database.md) | Yes | Database mirroring | [Tutorial: Azure SQL Database](azure-sql-database-tutorial.md) |
| [Microsoft Fabric mirrored databases from Azure SQL Managed Instance (preview)](azure-sql-managed-instance.md) | Yes | Database mirroring | [Tutorial: Azure SQL Managed Instance](azure-sql-managed-instance-tutorial.md) |
| [Microsoft Fabric mirrored databases from Snowflake](snowflake.md) | Yes | Database mirroring | [Tutorial: Snowflake](snowflake-tutorial.md) |
| [Open mirrored databases](open-mirroring.md) (preview) | Yes | Open mirroring | [Tutorial: Open mirroring](open-mirroring-tutorial.md)|
| [Microsoft Fabric mirrored databases from Fabric SQL database](../sql/overview.md) (preview) | Yes | Database mirroring | [Automatically configured](../sql/mirroring-overview.md) |

## How does the near real time replication of database mirroring work?

Mirroring is enabled by creating a secure connection to your operational data source. You choose whether to replicate an entire database or individual tables and Mirroring will automatically keep your data in sync. Once set up, data will continuously replicate into the OneLake for analytics consumption.

The following are core tenets of Mirroring:

- Enabling Mirroring in Fabric is simple and intuitive, without having the need to create complex ETL pipelines, allocate other compute resources, and manage data movement.

- Mirroring in Fabric is a fully managed service, so you don't have to worry about hosting, maintaining, or managing replication of the mirrored connection.

## How does metadata mirroring work?

Mirroring not only enables data replication but can also be achieved through shortcuts or metadata mirroring rather than full data replication, allowing data to be available without physically moving or duplicating it. Mirroring in this context refers to replicating only metadata—such as catalog names, schemas, and tables—rather than the actual data itself. This approach enables Fabric to make data from different sources accessible without duplicating it, simplifying data management and minimizing storage needs. 

For example, when accessing [data registered in Unity Catalog, Fabric mirrors only the catalog structure from Azure Databricks](azure-databricks.md), allowing the underlying data to be accessed through shortcuts. This method ensures that any changes in the source data are instantly reflected in Fabric without requiring data movement, maintaining real-time synchronization and enhancing efficiency in accessing up-to-date information.

## How does open mirroring work?

In addition to mirroring enabling data replication by creating a secure connection to your data source, you can also select an existing data provider or write your own application to land data into mirrored database. Once you create an [open mirrored database](open-mirroring.md) via public API or via the Fabric portal, you will be able to obtain a landing zone URL in OneLake, where you can land change data per open mirroring specification. 

Once data is in the landing zone with the proper format, replication will start running and manage the complexity of merging the changes with updates, insert, and delete to be reflected into delta tables. This method ensures that any data written into the landing zone will be immediately and keeping the data in Fabric up-to-date. 

## Sharing

Sharing enables ease of access control and management, while security controls like Row-level security (RLS) and Object level security (OLS), and more make sure you can control access to sensitive information. Sharing also enables secure and democratized decision-making across your organization.

By sharing, users grant other users or a group of users access to a mirrored database without giving access to the workspace and the rest of its items. When someone shares a mirrored database, they also grant access to the SQL analytics endpoint and associated default semantic model.

For more information, see [Share your mirrored database and manage permissions](share-and-manage-permissions.md).

## Cross-database queries

With the data from your mirrored database stored in the OneLake, you can write cross-database queries, joining data from mirrored databases, warehouses, and the SQL analytics endpoints of Lakehouses in a single T-SQL query. For more information, see [Write a cross-database query](../../data-warehouse/query-warehouse.md#write-a-cross-database-query).

For example, you can reference the table from mirrored databases and warehouses using three-part naming. In the following example, use the three-part name to refer to `ContosoSalesTable` in the warehouse `ContosoWarehouse`. From other databases or warehouses, the first part of the standard SQL three-part naming convention is the name of the mirrored database.

```sql
SELECT * 
FROM ContosoWarehouse.dbo.ContosoSalesTable AS Contoso
INNER JOIN Affiliation
ON Affiliation.AffiliationId = Contoso.RecordTypeID;
```

## Data Engineering with your mirrored database data

Microsoft Fabric provides various data engineering capabilities to ensure that your data is easily accessible, well-organized, and high-quality. From [Fabric Data Engineering](../../data-engineering/data-engineering-overview.md), you can:

- Create and manage your data as Spark using a lakehouse
- Design pipelines to copy data into your lakehouse
- Use Spark job definitions to submit batch/streaming job to Spark cluster
- Use notebooks to write code for data ingestion, preparation, and transformation

## Data Science with your mirrored database data

Microsoft Fabric offers Fabric Data Science to empower users to complete end-to-end data science workflows for the purpose of data enrichment and business insights. You can complete a wide range of activities across the entire data science process, all the way from data exploration, preparation and cleansing to experimentation, modeling, model scoring and serving of predictive insights to BI reports.

Microsoft Fabric users can access [Data Science workloads](../../data-science/data-science-overview.md). From there, they can discover and access various relevant resources. For example, they can create machine learning Experiments, Models and Notebooks. They can also import existing Notebooks on the Data Science Home page.

## SQL database in Fabric

You can also directly create and manage a [SQL database in Microsoft Fabric (Preview)](../sql/overview.md) inside the Fabric portal. Based on [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview?view=azuresqldb-current&preserve-view=true), SQL database in Fabric is automatically mirrored for analytics purposes and allows you to easily create your operational database in Fabric. SQL database is the home in Fabric for OLTP workloads, and can integrate with Fabric's [source control integration](../sql/source-control.md).

## Related content

- [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
- [Model data in the default Power BI semantic model in Microsoft Fabric](../../data-warehouse/model-default-power-bi-dataset.md)
- [What is the SQL analytics endpoint for a lakehouse?](../../data-engineering/lakehouse-sql-analytics-endpoint.md)
- [Direct Lake overview](../../fundamentals/direct-lake-overview.md)
