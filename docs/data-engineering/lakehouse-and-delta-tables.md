---
title: Lakehouse and Delta tables
description: The Delta Lake table format is the central piece of the Lakehouse.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: lakehouse delta lake tables
---

# Lakehouse and Delta Lake tables

[!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](lakehouse-overview.md) is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location. In order to achieve seamless data access across all compute engines in [!INCLUDE [product-name](../includes/product-name.md)], [Delta Lake](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake) is chosen as the unified table format.

Saving data in the Lakehouse using capabilities such as [Load to Tables](load-to-tables.md) or methods described in [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md), all data is saved in Delta format.

For a more comprehensive introduction to the Delta Lake table format, follow links in the Next steps section.

## Big data, Apache Spark and legacy table formats

[!INCLUDE [product-name](../includes/product-name.md)] [Runtime for Apache Spark](./runtime.md) uses the same foundation as Azure Synapse Analytics Runtime for Apache Spark, but contain key differences to provide a more streamlined behavior across all engines in the [!INCLUDE [product-name](../includes/product-name.md)] service. In [!INCLUDE [product-name](../includes/product-name.md)], key performance features are turned on by default. Advanced Apache Spark users may revert configurations to previous values to better align with specific scenarios.

[!INCLUDE [product-name](../includes/product-name.md)] Lakehouse and the Apache Spark engine support all table types, both managed and unmanaged; this includes views and regular non-Delta Hive table formats. Tables defined using PARQUET, CSV, AVRO, JSON, and any Apache Hive compatible file format work as expected.

The Lakehouse explorer user interface experience varies depending on table type. Currently, the Lakehouse explorer only renders table objects.

### Configuration differences with Azure Synapse Analytics

The following table contains the configuration differences between Azure Synapse Analytics and [!INCLUDE [product-name](../includes/product-name.md)] Runtime for Apache Spark.

|Apache Spark configuration|Microsoft Fabric value|Azure Synapse Analytics value|Notes|
|---------|---------|---------|---------|
|spark.sql.sources.default|delta|parquet|Default table format|
|spark.sql.parquet.vorder.enabled|true|N/A|V-Order writer|
|spark.sql.parquet.vorder.dictionaryPageSize|2 GB|N/A|Dictionary page size limit for V-Order|
|spark.microsoft.delta.optimizeWrite.enabled|true|unset (false)|Optimize Write|

## Auto discovery of tables

The Lakehouse explorer provides a tree-like view of the objects in the [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse item. It has a key capability of discovering and displaying tables that are described in the metadata repository and in OneLake storage. The table references are displayed under the ```Tables``` section of the Lakehouse explorer user interface. Auto discovery also applies to tables defined over OneLake shortcuts.

### Tables over shortcuts

[!INCLUDE [product-name](../includes/product-name.md)] Lakehouse supports tables defined over OneLake shortcuts, to provide utmost compatibility and no data movement. The following table contains the scenario best-practices for each item type when using it over shortcuts.

|Shortcut destination|Where to create the shortcut|Best practice|
|---------|---------|---------|
|Delta Lake table|```Tables``` section|If multiple tables are present in the destination, create one shortcut per table.|
|Folders with files|```Files``` section|Use Apache Spark to use the destination directly using relative paths. Load the data into Lakehouse native Delta tables for maximum performance.|
|Legacy Apache Hive tables|```Files``` section|Use Apache Spark to use the destination directly using relative paths, or create a metadata catalog reference using ```CREATE EXTERNAL TABLE``` syntax. Load the data into Lakehouse native Delta tables for maximum performance.|

## Load to Tables

[!INCLUDE [product-name](../includes/product-name.md)] Lakehouse provides a convenient and productive user interface to streamline loading data into Delta tables. The Load to Tables feature allows a visual experiences to load common file formats to Delta to boost analytical productivity to all personas. To learn more about the Load to Tables feature in details, read the [Lakehouse Load to Tables](load-to-tables.md) reference documentation.

## Delta Lake table optimization

Keeping tables in shape for the broad scope of analytics scenarios is no minor feat. [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse pro-actively enables the important parameters to minimize common problems associated with big data tables, such as compaction and small file sizes, and to maximize query performance. Still, there are many scenarios where those parameters need changes. The [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md) article covers some key scenarios and provides an in-depth guide on how to efficiently maintain Delta tables for maximum performance.

## Related content

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Delta Lake overview](/azure/synapse-analytics/spark/apache-spark-delta-lake-overview?pivots=programming-language-python)
- [Shortcuts](lakehouse-shortcuts.md)
- [Load to Tables](load-to-tables.md)
- [Spark workspace administration settings](workspace-admin-settings.md)
- [What is a Runtime in Fabric?](runtime.md)
