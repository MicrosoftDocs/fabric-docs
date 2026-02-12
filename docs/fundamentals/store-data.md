---
title: Data storage options in Microsoft Fabric
description: Discover how Microsoft Fabric's OneLake unifies all your data storage needs with a single, multi-cloud, multi-region data lake. Learn how it simplifies analytics.
#customer intent: As a data engineer, I want to understand how to store and organize data in OneLake so that I can manage all my analytics data in a unified platform.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/11/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Store data in Microsoft Fabric

In Microsoft Fabric, all data, regardless of its source or how it was prepared, lands in a unified storage foundation called [OneLake](../onelake/onelake-overview.md). OneLake is automatically available in Fabric (no separate provisioning needed) and is built on Azure Data Lake Storage Gen2. The core principle is one data lake for all analytics: each Fabric tenant gets one OneLake, and within it, you organize data by workspaces and items rather than by separate storage accounts. OneLake is multicloud and multiregion, so you see a consistent file-system-like hierarchy regardless of where your data resides.

OneLake's "one copy of data" design means that after data is stored in OneLake, you don't need to duplicate it for different engines. Everything is saved in an open format (Delta Parquet), enabling a single source to power multiple analytical perspectives.

## Lakehouse for flexible data storage

:::image type="content" source="./media/store-data/store-lakehouse.png" alt-text="Diagram of OneLake Lakehouse architecture.":::

A [Lakehouse](../data-engineering/lakehouse-overview.md) in Fabric is a core storage-centric artifact that uses OneLake to store data in both file and table form. A lakehouse is a curated data lake folder that also provides a SQL interface. It stores data in Delta Parquet files in OneLake. You can have [folders of raw data (like CSVs or images) and managed Delta tables for structured data](../data-engineering/navigate-lakehouse-explorer.md).

Use a lakehouse to organize a collection of data and expose it for analysis. Fabric automatically creates a [SQL endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md) for each lakehouse, so you or tools like Power BI can query the Delta tables through T-SQL as if it were a relational database. The lakehouse combines the flexibility of a data lake (support for big data and unstructured data) with key benefits of a warehouse (the ability to query tables directly and a metastore for schema).

## Warehouse for structured analytics

:::image type="content" source="./media/store-data/store-warehouse.png" alt-text="Diagram of OneLake Warehouse architecture.":::

A [Warehouse in Fabric](../data-warehouse/data-warehousing.md) provides a traditional SQL data warehouse experience (with tables, SQL views, stored procedures, and more) on Fabric's unified storage. When you create a Warehouse, it stores data in OneLake in Delta format as an organized set of Delta tables with an ANSI SQL interface on top. The Warehouse provides dedicated compute and fine-tuned performance for complex SQL queries and BI-style workloads. It supports features like indexing, stored procedures, and robust ACID transactions on tables.

The Warehouse [shares the underlying OneLake storage with the Lakehouse](../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md), so you can create a shortcut or integration between them if needed. However, you typically keep them separate for different use cases. The Warehouse is ideal for structured, relational star-schema data that you need to slice and dice with SQL. It's also fully integrated: you can [use Fabric pipelines to load data into the Warehouse](../data-warehouse/ingest-data-pipelines.md), and Power BI can use [Direct Lake](direct-lake-overview.md) or DirectQuery to retrieve data without import.

### Decision guide: Lakehouse vs. Warehouse

In Microsoft Fabric, [Warehouses and Lakehouses serve distinct but complementary roles](decision-guide-lakehouse-warehouse.md). Warehouses are optimized for structured, enterprise-scale data warehousing with full T-SQL support, ACID transactions, and strong schema enforcement—ideal for BI and reporting. Lakehouses offer flexible, scalable storage for both structured and unstructured data, supporting Spark-based data engineering and read-only SQL analytics through automatic endpoints. Choose a Warehouse for governed, high-performance SQL workloads and a Lakehouse for big data processing, exploratory analytics, and scenarios that involve varied data formats or external lake integration. Many organizations benefit from using both together: Lakehouses for ingestion and transformation, and Warehouses for refined analytics and reporting.

## Mirrored databases for near real-time replication

:::image type="content" source="./media/store-data/store-mirrored-database.png" alt-text="Diagram of OneLake mirrored database architecture.":::

A mirrored database in Microsoft Fabric is a continuously replicated, analytics-ready copy of an external operational database, such as Azure SQL Database, SQL Server, Cosmos DB, or Snowflake. It's stored in OneLake using the open Delta Lake format and enables near real-time synchronization of source data into Fabric without traditional ETL pipelines. After data is mirrored, it becomes [immediately queryable](../mirroring/explore.md) through SQL endpoints and usable across Fabric workloads like Power BI, Spark notebooks, and pipelines. This architecture lets you perform analytics on live operational data while maintaining source system integrity, supporting hybrid transactional/analytical processing (HTAP) scenarios.

## Eventhouse for real-time event analytics

:::image type="content" source="./media/store-data/store-eventhouse.png" alt-text="Diagram of OneLake Eventhouse architecture.":::

An [Eventhouse](../real-time-intelligence/eventhouse.md) in Microsoft Fabric is a scalable, real-time analytics environment designed to ingest, store, and analyze large volumes of event-based data. It serves as the foundational engine for Real-Time Intelligence workloads and enables you to process structured, semi-structured, and unstructured data streams efficiently.

An Eventhouse hosts one or more KQL databases (based on the Kusto engine) optimized for time-series and telemetry data. These databases automatically index and partition data by ingestion time, enabling fast querying and exploration by using [Kusto Query Language (KQL)](/kusto/query/?view=microsoft-fabric&preserve-view=true). Eventhouses are ideal for scenarios like IoT telemetry, security logs, compliance records, and financial transactions, where timely insights and scalable performance are critical.

## SQL database for transactional workloads

:::image type="content" source="./media/store-data/store-sql-database.png" alt-text="Diagram of OneLake SQL database architecture.":::

[SQL databases](../database/sql/overview.md) in Microsoft Fabric support transactional and operational analytics workloads within a unified data platform. They offer a fully managed relational database experience with full support for T-SQL, including data definition (DDL), manipulation (DML), and querying (DQL) capabilities. You can use familiar SQL constructs such as stored procedures, views, and functions to build robust applications and analytical solutions.

SQL databases use an automatic [mirroring service](../database/sql/mirroring-overview.md) that continuously replicates all transactional tables into OneLake for analytics. When you create a Fabric SQL database, the platform starts a replicator engine that captures every insert, update, and delete (through the SQL engine's change feed) and writes those changes into OneLake as Delta Parquet files. This process is near real time, so new transactions are reflected in OneLake shortly after they commit (typically within seconds). The replication is event-driven, starts automatically with no user configuration required, and all supported tables are mirrored by default. This behavior ensures the OneLake copy stays in sync with the operational database.

SQL databases in Fabric are deeply integrated with other Fabric experiences, so you can interact with Power BI, [notebooks](../database/sql/connect-jupyter-notebook.md), [user data functions](../data-engineering/user-data-functions/connect-to-data-sources.md), [pipelines](../database/sql/load-data-pipelines.md), and [external tools through the TDS protocol](../database/sql/connect.md). This integration enables you to build end-to-end solutions, from data ingestion and transformation to [visualization](../database/sql/data-virtualization.md) and reporting, without leaving the Fabric environment. The platform automatically handles indexing and performance optimization, so you don't need to manually tune or manage infrastructure.

## Cosmos DB for distributed NoSQL workloads

:::image type="content" source="./media/store-data/store-cosmos-database.png" alt-text="Diagram of OneLake Cosmos DB architecture.":::

[Cosmos DB in Microsoft Fabric](../database/cosmos-db/overview.md) is a fully managed, distributed NoSQL database that supports operational workloads with flexible data models and global scalability. Unlike relational stores, Cosmos DB is designed for high-throughput scenarios that involve semi-structured JSON data, making it ideal for applications such as IoT telemetry, mobile backends, and real-time retail systems. In Fabric, [Cosmos DB is automatically mirrored into OneLake](../database/cosmos-db/mirror-onelake.md), where data is stored in Delta format to enable analytics without affecting the performance of the operational system. This mirroring process is continuous and near real time, requiring no manual setup or configuration. After data is mirrored, it becomes accessible through a [SQL analytics endpoint](../database/cosmos-db/tutorial-mirroring.md) that lets you query the data by using T-SQL, build views, and integrate with other Fabric experiences like Power BI, notebooks, and pipelines.

The SQL analytics endpoint provides a read-only interface to the mirrored data, ensuring that analytical queries don't interfere with transactional operations. This architecture supports hybrid transactional and analytical processing (HTAP), so you can unify operational and analytical workloads within a single platform. Cosmos DB's ability to handle schema-less data and scale globally supports scenarios that require analysis of real-time, high-volume, and geographically distributed data.

## Semantic model for business logic and reporting

:::image type="content" source="./media/store-data/store-semantic-model.png" alt-text="Diagram of OneLake semantic model architecture.":::

[Semantic models](../data-warehouse/semantic-models.md) provide the structured, curated layer that defines business logic, measures, hierarchies, relationships, and metadata on top of raw data in Microsoft Fabric. They make data interpretable and reusable across the platform for analytics experiences.

Semantic models in Fabric are tightly integrated with the platform's capacity model and workspace structure. Semantic models support three query modes: Import, DirectQuery, and Direct Lake. Each mode offers different trade-offs between performance, freshness, and scalability:

* **Import mode**: [Import mode](/power-bi/connect-data/service-dataset-modes-understand#import-mode) copies data from the source into the semantic model during scheduled or manual refreshes. This mode offers the fastest query performance because Power BI operates on in-memory data, but it introduces latency between source updates and report visibility. Import mode is ideal for high-performance dashboards where real-time data isn't critical.

* **DirectQuery mode**: [DirectQuery mode](/power-bi/connect-data/service-dataset-modes-understand#directquery-mode) sends queries live to the source database at runtime, without storing data in the semantic model. This approach ensures up-to-date results but can lead to slower performance depending on the source system's responsiveness. DirectQuery is suitable for scenarios where data freshness is more important than speed, such as operational reporting.

* **Direct Lake mode**: [Direct Lake mode](direct-lake-overview.md) lets Power BI query Delta tables stored in OneLake directly, combining the performance benefits of Import with the freshness of DirectQuery. It avoids data duplication and uses the lake-native architecture for scalable, near real-time analytics. Direct Lake is recommended for large-scale analytics on Fabric-managed data.

Semantic models also enable conversational AI, semantic search, enterprise reporting, and cross-domain reasoning by bringing together advanced features like Fabric Data Agents, Power BI Copilot, Ontologies, and Power BI reports. Business users can also [access semantic models through Excel](/power-bi/collaborate-share/service-connect-excel-power-bi-datasets), where they can explore data and insights in a PivotTable interface that uses live data from the semantic model.

## Decision guide: Choose the right data store

Microsoft Fabric provides several data store options, each optimized for specific workloads and query patterns. The Lakehouse is best suited for big data and data engineering scenarios, offering open table formats like Delta and Iceberg and supporting Spark and SQL engines. The Warehouse is designed for structured, relational analytics with high-performance SQL capabilities, ideal for BI and reporting. KQL Database (Eventhouse) is tailored for real-time analytics on telemetry and log data by using Kusto Query Language. SQL Database supports transactional workloads and operational analytics, while Cosmos DB is optimized for globally distributed, multi-model applications with low-latency access. [Choosing the right store](decision-guide-data-store.md) depends on factors like data structure, latency requirements, query complexity, and integration needs.

## Related content

* [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
* [Get data into Microsoft Fabric](get-data.md)
* [Prepare and transform data](prepare-data.md)
* [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
* [Track and visualize data](track-visualize-data.md)
* [External integration and platform connectivity](external-integration.md)
