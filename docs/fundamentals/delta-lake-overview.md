---
title: Delta Lake overview
description: Learn about Delta Lake as Microsoft Fabric's universal storage format and when you need to understand Delta features.
ms.reviewer: sngun, dacoelho
ms.topic: concept-article
ms.date: 05/08/2026
ms.search.form: delta lake overview
ai-usage: ai-generated
---

# Delta Lake overview

Microsoft Fabric uses Delta Lake as its universal storage format across all workloads. Whether you're building data warehouses, creating lakehouses, orchestrating pipelines, or analyzing data with Power BI, your data is stored in Delta Lake format in OneLake.

For most scenarios, Delta Lake works transparently in the background—you don't need to understand it to use Fabric effectively. However, when you're optimizing performance, integrating with external systems, or troubleshooting cross-workload scenarios, understanding Delta Lake helps you work more efficiently.

## What is Delta Lake?

[Delta Lake](https://delta.io/) is an open-source storage layer that brings reliability and performance to data lakes. At its core, Delta Lake combines two elements:

1. **Parquet files** — An efficient columnar storage format for analytics.
1. **Transaction log** — A record of all changes to the data that enables ACID guarantees.

This combination provides capabilities that traditional file-based storage can't offer:

- **ACID transactions**: Atomic, consistent, isolated, and durable operations ensure data integrity even when multiple processes read and write simultaneously
- **Time travel**: Query data as it existed at any point in time, roll back mistakes, or audit historical changes
- **Schema evolution**: Add, remove, or modify columns without rewriting existing data
- **Unified batch and streaming**: Process real-time and batch data using the same table format

Delta Lake is maintained as a Linux Foundation project with an open specification, which means it works across platforms—Databricks, Azure Synapse Analytics, AWS, and open-source Apache Spark environments all support Delta Lake tables.

## Why Fabric uses Delta Lake

Microsoft Fabric chose Delta Lake as its universal format to solve a fundamental challenge: enabling all workloads to share data without duplication or complex ETL processes.

### OneLake + Delta Lake = single source of truth

OneLake stores all data as Delta Parquet by default. This architectural decision means:

- **No data silos**: A lakehouse, warehouse, and KQL database can all read from the same Delta table
- **No ETL between workloads**: Data written by one engine is immediately readable by others
- **One copy of data**: Your organization maintains a single version of the truth, reducing storage costs and eliminating data synchronization issues

### Performance optimization built on Delta

Fabric extends Delta Lake with performance features designed for the platform:

- **V-Order**: Fabric-specific write optimization that reorganizes data for faster query performance across all engines
- **Automatic table maintenance**: Fabric can automatically compact small files and clean-up old data
- **Integration with Fabric services**: Delta tables work seamlessly with Power BI Direct Lake, SQL analytics endpoints, pipelines, and notebooks

This combination of open standards and Fabric optimizations gives you both portability and performance.

## Understanding your Delta Lake journey

How much you need to know about Delta Lake depends on what you're doing in Fabric:

### Delta Lake is transparent for most users

If you're working with these scenarios, Fabric handles Delta Lake automatically:

- **Querying data with SQL**: SQL analytics endpoints and data warehouses abstract Delta behind a SQL interface—you query tables using T-SQL without thinking about file formats
- **Building reports in Power BI**: Power BI Direct Lake reads Delta tables seamlessly to deliver real-time analytics
- **Loading data with pipelines**: Data Factory copy activity writes to Delta format by default when targeting lakehouse tables

For these experiences, Delta Lake is an implementation detail you don't need to manage.

### You benefit from understanding Delta when

Certain scenarios require knowledge of Delta Lake features:

- **Optimizing query performance**: Understanding V-Order, table compaction, and partitioning strategies helps you tune tables for faster queries
- **Integrating with external Delta tables**: Connecting to Delta tables in Databricks, Snowflake, Amazon S3, or other platforms requires knowledge of feature compatibility
- **Using advanced Spark features**: Deletion vectors, column mapping, type widening, and liquid clustering provide powerful capabilities but need explicit configuration
- **Troubleshooting cross-workload scenarios**: When data written by one engine doesn't behave as expected in another, understanding Delta feature support helps you diagnose issues

### Choosing your learning path

Your entry point to Delta Lake documentation depends on your role:

**Data engineers and Spark developers** should start with [Lakehouse and Delta Lake tables](../data-engineering/lakehouse-and-delta-tables.md) for comprehensive coverage of Delta in Spark contexts, including optimization patterns, table maintenance, and runtime configurations.

**SQL users and data warehouse developers** should explore [Data Warehouse architecture](../data-warehouse/data-warehousing.md) to understand how Delta powers warehouse capabilities like time travel, clones, and ACID compliance.

**Pipeline and data integration developers** should review [Lakehouse connector in Data Factory](../data-factory/connector-lakehouse-copy-activity.md) to learn how pipelines write Delta tables and handle column mapping.

**Anyone working across workloads** should reference [Delta Lake table format interoperability](delta-lake-interoperability.md) for the authoritative feature support matrix showing which Delta capabilities work in each Fabric experience.

## Table optimization and maintenance

While Fabric handles many optimization tasks automatically, you can improve performance for specific scenarios:

- **V-Order optimization**: Write data with V-Order enabled to improve read performance across all query engines
- **Table compaction**: Combine small files into larger ones using OPTIMIZE commands to reduce query overhead
- **Z-ordering**: Organize data by frequently filtered columns to speed up selective queries
- **Vacuum operations**: Remove old file versions to reduce storage costs

For detailed guidance on when and how to use these techniques across different workloads, see [Table maintenance and optimization](table-maintenance-optimization.md).

## Delta Lake and external systems

Delta Lake's open specification enables integration with systems outside Fabric:

- **OneLake shortcuts**: Reference Delta tables stored in Amazon S3, Azure Data Lake Storage, or Databricks without copying data
- **Delta sharing**: Share Delta tables across organizations using the open Delta Sharing protocol
- **Cross-platform compatibility**: Tables created in Databricks or Azure Synapse can be read in Fabric, subject to feature support constraints

When integrating external Delta tables, consult the [feature interoperability matrix](delta-lake-interoperability.md) to understand which Delta Lake features are supported by each Fabric experience.

## Related content

- [Delta Lake table format interoperability](delta-lake-interoperability.md) — Feature support matrix for Delta capabilities across Fabric workloads
- [Lakehouse and Delta Lake tables](../data-engineering/lakehouse-and-delta-tables.md) — Comprehensive guide for Spark developers
- [Table maintenance and optimization](table-maintenance-optimization.md) — Cross-workload optimization strategies
- [OneLake, the OneDrive for data](../onelake/onelake-overview.md) — Learn about Fabric's unified data lake
- [Delta Lake official documentation](https://docs.delta.io/latest/delta-intro.html) — Open-source project specifications and features
