---
title: Data storage options in Microsoft Fabric
description: Discover how Microsoft Fabric's OneLake unifies all your data storage needs with a single, multicloud, multi-region data lake. Learn how it simplifies analytics.
#customer intent: As a data engineer, I want to understand how to store and organize data in OneLake so that I can manage all my analytics data in a unified platform.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/24/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Store data in Microsoft Fabric

Microsoft Fabric provides multiple storage options designed to support analytics, real-time processing, and operational reporting within a unified platform. Choosing the right storage experience helps you optimize performance, manage costs, and align your data architecture with workload requirements. Regardless of its source or preparation method, all data lands in a unified storage foundation called [OneLake](../onelake/onelake-overview.md).

This article explains how data is stored in Fabric and describes the core storage experiences available. The following sections cover:

- **OneLake** – The unified, logical data lake that underpins all Fabric workloads.
- **Lakehouse** – Store and analyze structured and unstructured data using Delta tables.
- **Warehouse** – Store relational data optimized for high-performance SQL analytics.
- **Eventhouse** – Store and query high-volume, real-time event data.
- **Databases and other storage experiences** – Understand additional storage capabilities available within Fabric.

Use this overview to understand how each storage option works and choose the best fit for your analytical and operational scenarios.

## Lakehouse for flexible data storage

A [Lakehouse](../data-engineering/lakehouse-overview.md) is a core storage item in Fabric that uses OneLake to store data in both file and table formats. A Lakehouse represents a curated folder structure in OneLake and includes a SQL interface. A Lakehouse stores data as Delta Parquet files. You can organize raw files such as CSV files or images in folders, and you can create managed Delta tables for structured data. This model supports both structured and unstructured data in the same environment.

Fabric automatically provisions a [SQL analytics endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md) for each Lakehouse. You and tools such as Power BI can query Delta tables by using Transact-SQL, as if querying a relational database. The Lakehouse combines the scalability and flexibility of a data lake with core warehouse capabilities, including direct table querying and schema management.

## Warehouse for structured analytics

A [Warehouse in Fabric](../data-warehouse/data-warehousing.md) provides a traditional SQL data warehouse experience (with tables, SQL views, stored procedures, and more) on Fabric's unified storage. When you create a Warehouse, it stores data in OneLake in Delta format as an organized set of Delta tables with an ANSI SQL interface on top. The Warehouse provides dedicated compute and fine-tuned performance for complex SQL queries and BI-style workloads. It supports features like indexing, stored procedures, and robust ACID transactions on tables.

The Warehouse and Lakehouse share the same underlying OneLake storage. You can integrate them by using shortcuts or other interoperability features when needed. However, you typically keep them separate for different use cases. The Warehouse is ideal for structured, relational star-schema data that you need to slice and dice with SQL. You can use Fabric pipelines to [load data into the Warehouse](../data-warehouse/ingest-data-pipelines.md). Power BI can connect by using [Direct Lake](direct-lake-overview.md) or DirectQuery to retrieve data without import.

### Decision guide: Lakehouse vs. Warehouse

Warehouses and Lakehouses serve distinct but complementary roles.

- Warehouses are optimized for structured, enterprise-scale data warehousing with full T-SQL support, ACID transactions, and strong schema enforcement—ideal for BI and reporting. Choose a Warehouse for governed, high-performance SQL workloads and a Lakehouse for big data processing, exploratory analytics, and scenarios that involve varied data formats or external lake integration.

- Lakehouses offer flexible, scalable storage for both structured and unstructured data, supporting Spark-based data engineering and read-only SQL analytics through automatic endpoints.

Many organizations benefit from using both together: Lakehouses for ingestion and transformation, and Warehouses for refined analytics and reporting. To learn more, see [the decision guide](decision-guide-lakehouse-warehouse.md).

## Mirrored databases for near real-time replication

A mirrored database in Fabric is a continuously replicated copy of an external operational database, such as Azure SQL Database, SQL Server, Azure Cosmos DB, or Snowflake. Fabric stores mirrored data in OneLake in Delta Lake format.

Mirroring synchronizes source changes into Fabric in near real time without requiring traditional extract, transform, load pipelines. After replication, the data becomes [immediately queryable](../mirroring/explore.md) through SQL endpoints and is available across Fabric workloads, including Power BI, Spark notebooks, and pipelines.

This architecture supports hybrid transactional and analytical processing (HTAP) scenarios, where you analyze operational data while maintaining source system integrity. If the source data is already stored in a location accessible through OneLake shortcuts (such as Azure Data Lake Storage or another Fabric workspace), consider using shortcuts for zero-copy access instead of mirroring. Mirroring is best suited for operational databases that require continuous change data capture, while shortcuts are ideal when you need live, read-only access without replication.

## OneLake shortcuts for zero-copy data access

[OneLake shortcuts](../onelake/onelake-shortcuts.md) are logical links that reference data in external storage systems or in other Fabric workspaces without copying it. Shortcuts make referenced data appear as part of the local OneLake namespace, so all Fabric compute engines (Spark, SQL, Power BI) can query shortcut targets alongside native data. This approach maintains a single version of truth and avoids storage duplication.

You can also use OneLake data sharing to extend shortcut access across Microsoft Entra tenant boundaries. Data owners grant OneLake permissions to external identities, and recipients create shortcuts to the shared data in their own workspaces. Governance policies remain enforced at the source. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md) and [OneLake data sharing](../onelake/onelake-data-sharing.md).

## Eventhouse for real-time event analytics

An [Eventhouse](../real-time-intelligence/eventhouse.md) provides a scalable real-time analytics environment designed to ingest, store, and analyze high volumes of event data. It is the foundational engine for Real-Time Intelligence workloads.

An Eventhouse hosts one or more Kusto Query Language databases based on the Kusto engine. These databases automatically index and partition data by ingestion time. You query data by using [Kusto Query Language](/kusto/query/?view=microsoft-fabric&preserve-view=true).

Eventhouse is well suited for telemetry, security logs, compliance records, and financial transactions where low-latency analytics and high-scale ingestion are required.

## SQL database for transactional workloads

[SQL databases](../database/sql/overview.md) in Fabric support transactional and operational analytics workloads. They provide a fully managed relational database experience with support for T-SQL, including data definition (DDL), manipulation (DML), and querying (DQL) capabilities. You can use stored procedures, views, and functions to build transactional and analytical solutions.

SQL databases use an automatic [mirroring service](../database/sql/mirroring-overview.md) to replicate transactional tables into OneLake for analytics. When you create a SQL database, Fabric starts a replication engine that captures insert, update, and delete operations through the SQL engine change feed and writes those changes into OneLake as Delta Parquet files. Replication occurs in near real time and starts automatically. All supported tables are mirrored by default. This behavior ensures that the OneLake copy remains synchronized with the operational database.

SQL databases integrate with other Fabric experiences such as Power BI, [notebooks](../database/sql/connect-jupyter-notebook.md), [user data functions](../data-engineering/user-data-functions/connect-to-data-sources.md), [pipelines](../database/sql/load-data-pipelines.md), and [external tools through the TDS protocol](../database/sql/connect.md). This integration enables you to build end-to-end solutions, from data ingestion and transformation to [visualization](../database/sql/data-virtualization.md) and reporting, without leaving the Fabric environment. The platform automatically handles indexing and performance optimization, so you don't need to manually tune or manage infrastructure.

## Cosmos DB for distributed NoSQL workloads

[Cosmos DB in Microsoft Fabric](../database/cosmos-db/overview.md) is a fully managed, distributed NoSQL database designed for high-throughput and globally distributed applications. It supports flexible schema models and semi-structured JSON data.

Cosmos DB is automatically mirrored into OneLake in Delta format to support analytics without affecting operational performance. Replication is continuous and near real time and requires no manual configuration.

After replication, data becomes accessible through a [SQL analytics endpoint](../database/cosmos-db/tutorial-mirroring.md). You can query data by using Transact-SQL, create views, and integrate with Power BI, notebooks, and pipelines.

The SQL analytics endpoint provides a read-only interface to the mirrored data, ensuring that analytical queries don't interfere with transactional operations. This architecture supports hybrid transactional and analytical processing (HTAP), so you can unify operational and analytical workloads within a single platform.

## Semantic model for business logic and reporting

[Semantic models](../data-warehouse/semantic-models.md) provide the structured, curated layer that defines business logic, measures, hierarchies, relationships, and metadata on top of raw data in Microsoft Fabric. They make data interpretable and reusable across the platform for analytics experiences.

Semantic models in Fabric are tightly integrated with the platform's capacity model and workspace structure. Semantic models support three query modes: Import, DirectQuery, and Direct Lake. Each mode offers different trade-offs between performance, freshness, and scalability:

- **[Import mode](/power-bi/connect-data/service-dataset-modes-understand#import-mode)** copies data from the source into the semantic model during scheduled or manual refreshes. This mode offers the fastest query performance because Power BI operates on in-memory data, but it introduces latency between source updates and report visibility. Import mode is ideal for high-performance dashboards where real-time data isn't critical.

- **[DirectQuery mode](/power-bi/connect-data/service-dataset-modes-understand#directquery-mode)** sends queries directly to the source system at runtime without storing data in the semantic model. This approach ensures up-to-date results but can lead to slower performance depending on the source system's responsiveness. DirectQuery is suitable for scenarios where data freshness is more important than speed, such as operational reporting.

- **[Direct Lake mode](direct-lake-overview.md)** allows Power BI to query Delta tables stored in OneLake directly. It combines the performance characteristics of Import with the freshness of DirectQuery. It avoids data duplication and uses the lake-native architecture for scalable, near real-time analytics. Direct Lake is recommended for large-scale analytics on Fabric-managed data.

Semantic models also enable conversational AI, semantic search, enterprise reporting, and cross-domain reasoning by bringing together advanced features like Fabric Data Agents, Power BI Copilot, Ontologies, and Power BI reports. Business users can also [access semantic models through Excel](/power-bi/collaborate-share/service-connect-excel-power-bi-datasets), where they can explore data and insights in a PivotTable interface that uses live data from the semantic model.

## Decision guide: Choose the right data store

Microsoft Fabric provides multiple data store options, each optimized for specific workloads:

- **Lakehouse** for large-scale data engineering and open-format storage like Delta and Iceberg, with support for Spark and SQL engines.
- **Warehouse** for structured, relational analytics with high-performance SQL capabilities and enterprise reporting.
- **Eventhouse** for real-time telemetry and log analytics by using Kusto Query Language.
- **SQL database** for transactional workloads and operational analytics.
- **Cosmos DB** for globally distributed NoSQL applications, multi-model applications with low-latency access.
- **OneLake shortcuts** for zero-copy access to data in external storage or other Fabric workspaces and tenants, when you don't need a separate copy and want to maintain a single version of truth.

Selecting the appropriate store depends on data structure, latency requirements, query complexity, and integration needs. When the data you need already exists in an accessible location, shortcuts can eliminate the need for replication entirely. For more guidance, see [Choosing the right store](decision-guide-data-store.md).

## Related content

* [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
* [Get data into Microsoft Fabric](get-data.md)
* [Prepare and transform data](prepare-transform-data.md)
* [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
* [Track and visualize data](track-visualize-data.md)
* [External integration and platform connectivity](external-integration.md)
