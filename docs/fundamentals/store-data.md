---
title: Data storage options in Microsoft Fabric
description: Discover how Microsoft Fabric's OneLake unifies all your data storage needs with a single, multi-cloud, multi-region data lake. Learn how it simplifies analytics.
#customer intent: As a data engineer, I want to understand how to store and organize data in OneLake so that I can manage all my analytics data in a unified platform.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 01/20/2026
ms.topic: concept-article
---

# Store data in Microsoft Fabric

In Microsoft Fabric, all data - irrespective of its source or how it was prepared - ultimately lands in a unified storage foundation called [OneLake](../onelake/onelake-overview.md). It's automatically available in Fabric (no separate provisioning needed) and is built on Azure Data Lake Storage Gen2 under the hood. The key idea is one data lake for all analytics: each Fabric tenant gets one OneLake, and within it, you organize data by workspaces and items rather than by disparate storage accounts. OneLake is multicloud and multiregion - it abstracts those details so users just see a consistent file system-like hierarchy.

OneLake's design of "one copy of data" means that once data is stored in OneLake, it doesn't need to be duplicated for different engines. Everything is saved in an open format (Delta Parquet), enabling a single source to power multiple analytical perspectives.

### Lakehouse for flexible data storage

:::image type="content" source="./media/store-data/store-lakehouse.png" alt-text="Screenshot of OneLake Lakehouse architecture diagram.":::

In Fabric, a [Lakehouse](../data-engineering/lakehouse-overview.md) is a core storage-centric artifact which leverages OneLake to store data in both file form and table form. A lakehouse can be thought of as a curated data lake folder that also provides a SQL interface. Under the covers, a lakehouse stores data in Delta Parquet files in OneLake. You can have [folders of raw data (like CSVs or images) and managed Delta tables for structured data](../data-engineering/navigate-lakehouse-explorer.md).

Lakehouse is a convenient way to organize a collection of data and expose it for analysis. Fabric automatically creates a [SQL endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md) for each lakehouse, so that users (or tools like Power BI) can query the Delta tables via T-SQL queries as if it were a relational database. The lakehouse thus combines the best of a data lake (flexibility, support for big data and unstructured data) with some benefits of a warehouse (the ability to query tables directly, a metastore for schema).

### Warehouse for structured analytics

:::image type="content" source="./media/store-data/store-warehouse.png" alt-text="Screenshot of OneLake Warehouse architecture diagram.":::

A [Warehouse in Fabric](../data-warehouse/data-warehousing.md) provides a traditional SQL data warehouse experience (with tables, SQL views, stored procedures, and more) but on Fabric's unified storage. When you create a Warehouse in Fabric, it also stores its data in OneLake in Delta format (the warehouse is essentially an organized set of Delta tables with an ANSI SQL interface on top). The difference is that the Warehouse comes with dedicated compute and fine-tuned performance for complex SQL queries and BI-style workloads. It supports features like indexing, stored procedures, and robust ACID transactions on tables.

An important aspect of Fabric's Warehouse is that [it shares the underlying OneLake with the Lakehouse](../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md). That means you can even create a shortcut or integration between a Lakehouse and a Warehouse if needed (though usually one would keep them separate for different use cases). The Warehouse is ideal for structured, relational star-schema data that you need to slice and dice with SQL. It's also fully integrated: you can [use Fabric pipelines to load data into the Warehouse](../data-warehouse/ingest-data-pipelines.md), and Power BI can use [Direct Lake](direct-lake-overview.md) or direct query to get data without import.

#### Decision guide: Lakehouse vs Warehouse

In Microsoft Fabric, [Warehouses and Lakehouses serve distinct but complementary roles](decision-guide-lakehouse-warehouse.md). Warehouses are optimized for structured, enterprise-scale data warehousing with full T-SQL support, ACID transactions, and strong schema enforcement - ideal for BI and reporting. Lakehouses offer flexible, scalable storage for both structured and unstructured data, supporting Spark-based data engineering and read-only SQL analytics via automatic endpoints. Choose Warehouses for governed, high-performance SQL workloads and Lakehouses for big data processing, exploratory analytics, and scenarios involving varied data formats or external lake integration. Many organizations benefit from using both together: Lakehouses for ingestion and transformation, Warehouses for refined analytics and reporting.

### Mirrored databases for near real-time replication

:::image type="content" source="./media/store-data/store-mirrored-database.png" alt-text="Screenshot of OneLake Mirrored Database architecture diagram.":::

A mirrored database in Microsoft Fabric is a continuously replicated, analytics-ready copy of an external operational database, such as Azure SQL Database, SQL Server, Cosmos DB, or Snowflake. It's stored in OneLake using the open Delta Lake format and it enables near real-time synchronization of source data into Fabric without requiring traditional ETL pipelines. Once mirrored, the [data becomes immediately queryable](../mirroring/explore.md) via SQL endpoints and usable across Fabric workloads like Power BI, Spark notebooks, and pipelines. This architecture allows you to perform analytics on live operational data while maintaining source system integrity, supporting hybrid transactional/analytical processing (HTAP) scenarios.

### Eventhouse for real-time event analytics

:::image type="content" source="./media/store-data/store-eventhouse.png" alt-text="Screenshot of OneLake Eventhouse architecture diagram.":::

An [Eventhouse](../real-time-intelligence/eventhouse.md) in Microsoft Fabric is a scalable, real-time analytics environment designed to ingest, store, and analyze large volumes of event-based data. It serves as the foundational engine for Real-Time Intelligence workloads, enabling organizations to process structured, semi-structured, and unstructured data streams efficiently.

Functionally, an Eventhouse hosts one or more KQL databases (based on the Kusto engine), which are optimized for time-series and telemetry data. These databases automatically index and partition data by ingestion time, allowing fast querying and exploration using [Kusto Query Language (KQL)](/kusto/query/?view=microsoft-fabric&preserve-view=true). Eventhouses are ideal for scenarios like IoT telemetry, security logs, compliance records, and financial transactions - where timely insights and scalable performance are critical.

### SQL database for transactional workloads

:::image type="content" source="./media/store-data/store-sql-database.png" alt-text="Screenshot of OneLake SQL Database architecture diagram.":::

In Microsoft Fabric, [SQL Databases](../database/sql/overview.md) are a core component designed to support transactional and operational analytics workloads within a unified data platform. They offer a fully managed relational database experience with full support for T-SQL, including data definition (DDL), manipulation (DML), and querying (DQL) capabilities. Users can rely on the familiar SQL constructs such as stored procedures, views, and functions to build robust applications and analytical solutions.

SQL Databases employ an automatic [mirroring service](../database/sql/mirroring-overview.md) that continuously replicates all transactional tables into OneLake for analytics. When you create a Fabric SQL Database, the platform spins up a replicator engine that captures every insert, update, and delete (via the SQL engine's change feed) and writes those changes into OneLake as Delta Parquet files. This process is near real-time, so new transactions are reflected in OneLake shortly after they commit (typically within seconds). The replication is event-driven and starts automatically with no user configuration required and all supported tables are mirrored by default, ensuring the OneLake copy stays in sync with the operational database.

SQL Databases in Fabric are deeply integrated with other Fabric experiences, allowing interaction with Power BI, [notebooks](../database/sql/connect-jupyter-notebook.md), [user data functions](../data-engineering/user-data-functions/connect-to-data-sources.md), [pipelines](../database/sql/load-data-pipelines.md), and [external tools via the TDS protocol](../database/sql/connect.md). This integration enables users to build end-to-end solutions: from data ingestion and transformation to [visualization](../database/sql/data-virtualization.md) and reporting without leaving the Fabric environment. The platform automatically handles indexing and performance optimization, removing the need for manual tuning and infrastructure management.

### Cosmos DB for distributed NoSQL workloads

:::image type="content" source="./media/store-data/store-cosmos-database.png" alt-text="Screenshot of OneLake Cosmos DB architecture diagram.":::

[Cosmos DB in Microsoft Fabric](../database/cosmos-db/overview.md) is a fully managed, distributed NoSQL database that supports operational workloads with flexible data models and global scalability. Unlike relational stores, Cosmos DB is designed for high-throughput scenarios involving semi-structured JSON data, making it ideal for applications such as IoT telemetry, mobile backends, and real-time retail systems. In Fabric, [Cosmos DB is automatically mirrored into OneLake](../database/cosmos-db/mirror-onelake.md), where its data is stored in Delta format which enables analytics without impacting the performance of the operational system. This mirroring process is continuous and near real-time, requiring no manual setup or configuration. Once mirrored, the data becomes accessible through a [SQL analytics endpoint](../database/cosmos-db/tutorial-mirroring.md), which allows users to query the data using T-SQL, build views, and integrate with other Fabric experiences like Power BI, notebooks, and pipelines.

The SQL analytics endpoint provides a read-only interface to the mirrored data, ensuring that analytical queries don't interfere with transactional operations. This architecture supports hybrid transactional and analytical processing (HTAP), allowing organizations to unify operational and analytical workloads within a single platform. Cosmos DB's ability to handle schema-less data and scale globally supports scenarios that require analysis of real-time, high-volume, and geographically distributed data.

### Semantic model for business logic and reporting

:::image type="content" source="./media/store-data/store-semantic-model.png" alt-text="Screenshot of OneLake Semantic Model architecture diagram.":::

[Semantic models](../data-warehouse/semantic-models.md) provide the structured, curated layer that defines business logic, measures, hierarchies, relationships, and metadata on top of raw data in Microsoft Fabric. They make data interpretable and reusable across the platform for analytics experiences. 

Semantic models in Fabric are tightly integrated with the platform's capacity model and workspace structure. Semantic models support three query modes: Import, DirectQuery, and Direct Lake. Each one of those modes offers different trade-offs between performance, freshness, and scalability:

* **Import mode**: In [Import mode](/power-bi/connect-data/service-dataset-modes-understand#import-mode), the system copies data from the source into the semantic model during scheduled or manual refreshes. This mode offers the fastest query performance because Power BI operates on in-memory data, but it introduces latency between source updates and report visibility. It's ideal for high-performance dashboards where real-time data isn't critical.

* **DirectQuery mode**: In [DirectQuery mode](/power-bi/connect-data/service-dataset-modes-understand#directquery-mode), the system sends queries live to the source database at runtime, without storing data in the semantic model. This approach ensures up-to-date results but can lead to slower performance depending on the source system's responsiveness. It's suitable for scenarios where data freshness is more important than speed, such as operational reporting.

* **Direct Lake mode**: [Direct Lake mode](direct-lake-overview.md) allows Power BI to query Delta tables stored in OneLake directly, combining the performance benefits of Import with the freshness of DirectQuery. It avoids data duplication and leverages the lake-native architecture for scalable, near real-time analytics. Direct Lake is recommended for large-scale analytics on Fabric-managed data.

Semantic models also enable conversational AI, semantic search, enterprise reporting, and cross-domain reasoning by bringing together advanced features like Fabric Data Agents, Power BI Copilot, Ontologies, and Power BI reports. Business users can also [access semantic models via Excel(/power-bi/collaborate-share/service-connect-excel-power-bi-datasets) where they can have more freedom to explore data and insights in a Pivot-table interface that uses live data from the semantic model.

### Decision guide: Choose the right data store

Microsoft Fabric provides several data store options, each optimized for specific workloads and query patterns. The Lakehouse is best suited for big data and data engineering scenarios, offering open table formats like Delta and Iceberg and supporting Spark and SQL engines. The Warehouse is designed for structured, relational analytics with high-performance SQL capabilities, ideal for BI and reporting. KQL Database (Eventhouse) is tailored for real-time analytics on telemetry and log data using Kusto Query Language. SQL Database supports transactional workloads and operational analytics, while Cosmos DB is optimized for globally distributed, multi-model applications with low-latency access. [Choosing the right store](decision-guide-data-store.md) depends on factors like data structure, latency requirements, query complexity, and integration needs.

:::image type="content" source="./media/store-data/decision-guide-store.svg" alt-text="Screenshot of decision guide for choosing the right data store.":::

## Related content

- [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
- [Get data into Microsoft Fabric](get-data.md)
- [Prepare and transform data](prepare-data.md)
- [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
- [Track and visualize data](track-visualize-data.md)
- [External integration and platform connectivity](external-integration.md)