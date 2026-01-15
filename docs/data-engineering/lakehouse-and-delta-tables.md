---
title: Lakehouse and Delta Tables
description: The Delta Lake table format is the unified format of the Lakehouse, which is the data architecture platform for managing data in Microsoft Fabric.
ms.reviewer: dacoelho
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 06/13/2025
ms.search.form: lakehouse delta lake tables
---

# Lakehouse and Delta Lake tables

Microsoft Fabric Lakehouse uses Delta Lake as the default and preferred table format to provide reliable, high-performance data storage and processing. While other formats are supported, Delta Lake offers the best integration and performance across all Fabric services. This article explains what Delta Lake tables are, how they work in Fabric, and how to get the best performance from your data.

## What are Delta Lake tables?

When you store data in a Microsoft Fabric [Lakehouse](lakehouse-overview.md), your data is automatically saved using a special format called **Delta Lake**. Think of Delta Lake as an enhanced version of regular data files that provides:

- **Better performance** - Faster queries and data processing
- **Data reliability** - Automatic error checking and data integrity
- **Flexibility** - Works with both structured data (like database tables) and semi-structured data (like JSON files)

## Why does this matter?

Delta Lake is the **standard table format** for all data in Fabric Lakehouse. This means:

- **Consistency**: All your data uses the same format, making it easier to work with
- **Compatibility**: Your data works seamlessly across all Fabric tools (Power BI, notebooks, data pipelines, etc.)
- **No extra work**: When you [load data into tables](load-to-tables.md) or use other [data loading methods](load-data-lakehouse.md), Delta format is applied automatically

You don't need to worry about the technical details - Fabric handles the Delta Lake formatting behind the scenes. This article explains how it works and how to get the best performance from your data.

## Apache Spark engine and data formats

Fabric Lakehouse is powered by [Apache Spark Runtime](./runtime.md), which is based on the same foundation as Azure Synapse Analytics Runtime for Apache Spark. However, Fabric includes optimizations and different default settings to provide better performance across all Fabric services.

**Supported data formats:**
- **Delta Lake** - The preferred format (automatic optimization)
- **CSV files** - Spreadsheet-like data files
- **JSON files** - Web and application data
- **Parquet files** - Compressed data files
- **Other formats** - AVRO and legacy Hive table formats

**Key benefits of Fabric's Apache Spark:**
- **Optimized by default**: Performance features are automatically enabled for better speed
- **Multiple formats supported**: You can read from existing files in various formats
- **Automatic conversion**: When you load data into tables, it's automatically optimized using Delta Lake format

> [!NOTE]
> While you can work with different file formats, tables displayed in the Lakehouse explorer are optimized Delta Lake tables for the best performance and reliability.

### Differences from Azure Synapse Analytics

If you're migrating from Azure Synapse Analytics, here are the key configuration differences in Fabric's Apache Spark runtime:

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

### Tables over shortcuts

Microsoft Fabric Lakehouse supports tables defined over OneLake shortcuts to provide utmost compatibility and no data movement. The following table contains the scenario best practices for each item type when using it over shortcuts.

|Shortcut destination|Where to create the shortcut|Best practice|
|---------|---------|---------|
|Delta Lake table|```Tables``` section|If multiple tables are present in the destination, create one shortcut per table.|
|Folders with files|```Files``` section|Use Apache Spark to use the destination directly using relative paths. Load the data into Lakehouse-native Delta tables for maximum performance.|
|Legacy Apache Hive tables|```Files``` section|Use Apache Spark to use the destination directly using relative paths, or create a metadata catalog reference using ```CREATE EXTERNAL TABLE``` syntax. Load the data into Lakehouse-native Delta tables for maximum performance.|

## Load to Table

Microsoft Fabric Lakehouse provides a convenient and productive user interface to streamline loading data into Delta tables. The Load to Table feature allows a visual experience for loading common file formats to Delta to boost analytical productivity to all personas. To learn more about the Load to Table feature, read the [Load to Delta Lake tables](load-to-tables.md) reference documentation.

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
- [Load to Delta Lake table](load-to-tables.md)
- [Data Engineering workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
- [Apache Spark Runtimes in Fabric](runtime.md)
