---
title: Lakehouse and Delta Tables
description: Learn how Delta Lake tables work in Fabric Lakehouse and how to optimize table performance.
ms.reviewer: dacoelho
ms.topic: concept-article
ms.date: 03/01/2026
ms.search.form: lakehouse delta lake tables
---

# Lakehouse and Delta Lake tables

Microsoft Fabric Lakehouse uses Delta Lake as the default table format for reliable, high-performance data storage and processing. While other formats are supported, Delta Lake provides the best integration across Fabric services.

## What are Delta Lake tables?

When you store data in a Microsoft Fabric [Lakehouse](lakehouse-overview.md), data is stored as **Delta Lake** by default. Delta Lake adds capabilities that improve both performance and reliability:

- **Better performance**: Faster queries and data processing.
- **Data reliability**: Transactional consistency and integrity checks.
- **Flexibility**: Works with both structured data (for example, tables) and semi-structured data (for example, JSON).

## Why does this matter?

Delta Lake is the **standard table format** for all data in Fabric Lakehouse. This means:

- **Consistency**: All data uses the same table format.
- **Compatibility**: Data works across Fabric tools such as Power BI, notebooks, and pipelines.
- **No extra setup**: When you [load data into tables](load-to-tables.md) or use other [data loading methods](load-data-lakehouse.md), Delta format is applied automatically.

Fabric handles Delta formatting behind the scenes, so you can focus on modeling and analysis.

## Apache Spark engine and data formats

Fabric Lakehouse is powered by [Apache Spark Runtime](./runtime.md), which shares foundations with Azure Synapse Analytics Runtime for Apache Spark. Fabric also applies different defaults and optimizations for better out-of-the-box performance across Fabric workloads.

**Supported data formats:**
- **Delta Lake**: Preferred format with automatic optimization.
- **CSV**: Delimited text data.
- **JSON**: Semi-structured application and web data.
- **Parquet**: Compressed columnar files.
- **Other formats**: AVRO and legacy Hive table formats.

**Key benefits of Fabric Spark defaults:**
- **Optimized by default**: Performance features are automatically enabled for better speed
- **Multiple formats supported**: You can read from existing files in various formats
- **Automatic conversion**: When you load data into tables, it's automatically optimized using Delta Lake format

> [!NOTE]
> While you can work with different file formats, tables displayed in the Lakehouse explorer are optimized Delta Lake tables for the best performance and reliability.

### Differences from Azure Synapse Analytics

If you're migrating from Azure Synapse Analytics, here are the key configuration differences in Fabric's Apache Spark runtime:

For a broader comparison across Spark pools, configurations, libraries, notebooks, and Spark job definitions, see [Compare Fabric Data Engineering and Azure Synapse Spark](comparison-between-fabric-and-azure-synapse-spark.md).

|Apache Spark configuration|Microsoft Fabric value|Azure Synapse Analytics value|Notes|
|---------|---------|---------|---------|
|spark.sql.sources.default|delta|parquet|Default table format|
|spark.sql.parquet.vorder.default|true|N/A|V-Order writer|
|spark.sql.parquet.vorder.dictionaryPageSize|2 GB|N/A|Dictionary page size limit for V-Order|
|spark.databricks.delta.optimizeWrite.enabled|true|unset (false)|Optimize Write|

These optimizations are designed to provide better performance out-of-the-box in Fabric. Advanced users can modify these configurations if needed for specific scenarios.

## How Fabric finds your tables automatically

When you open your Lakehouse, Fabric automatically scans your data and displays any tables it finds in the **Tables** section of the explorer. This means:

- **No manual setup required** - Fabric automatically discovers existing tables
- **Organized view** - Tables appear in a tree structure for easy navigation  
- **Works with shortcuts** - Tables linked from other locations are also automatically discovered

This automatic discovery makes it easy to see all your available data at a glance.

### Use shortcuts with tables and files

OneLake shortcuts can point to Delta tables or file and folder paths, so you can reference external data without moving it. The following table summarizes recommended patterns based on the target data type.

|Data type at shortcut target|Where to create the shortcut|Best practice|
|---------|---------|---------|
|Delta Lake table|`Tables` section|If multiple tables are present in the destination, create one shortcut per table.|
|Folders with files|`Files` section|Use Apache Spark with relative paths to read directly from the shortcut target. Load into Lakehouse-native Delta tables for maximum performance.|
|Legacy Apache Hive tables|`Files` section|Use Apache Spark with relative paths, or create a metadata catalog reference using `CREATE EXTERNAL TABLE`. Load into Lakehouse-native Delta tables for maximum performance.|

## Load to tables

Microsoft Fabric Lakehouse provides a visual experience to load common file formats into Delta tables. To learn more, see [Load to Delta Lake tables](load-to-tables.md).

## Keeping your tables fast and efficient

Fabric automatically optimizes your Delta Lake tables for better performance, but sometimes you may want additional control:

**What Fabric does automatically:**
- Combines small files into larger, more efficient files
- Optimizes data layout for faster queries
- Manages storage to reduce costs

**When you might need manual optimization:**
- Very large datasets with specific performance requirements
- Custom data organization needs
- Advanced analytics scenarios

For detailed guidance on table optimization, see [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md).

## Related content

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Delta Lake overview](/azure/synapse-analytics/spark/apache-spark-delta-lake-overview?pivots=programming-language-python)
- [Shortcuts](lakehouse-shortcuts.md)
- [Load to Delta Lake tables](load-to-tables.md)
- [Data Engineering workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
- [Apache Spark Runtimes in Fabric](runtime.md)
