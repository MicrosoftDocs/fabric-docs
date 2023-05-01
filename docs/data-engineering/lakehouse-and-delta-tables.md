---
title: Lakehouse and Delta tables
description: The Delta Lake table format is the central piece of the Lakehouse.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: lakehouse delta lake tables
---

# Lakehouse and Delta Lake tables

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] [Lakehouse](lakehouse-overview.md) is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location. In order to achieve seamless data access across all compute engines in [!INCLUDE [product-name](../includes/product-name.md)], [Delta Lake](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake) is chosen as the unified table format.

Saving data in the Lakehouse using capabilities such as [Load to Delta](load-to-delta.md) or methods described in [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md), all data is saved in Delta format. Delta is also used as the default Spark table format mode in code-first experiences such as Notebooks and Spark Job Definitions.

For a more comprehensive introduction to the Delta Lake table format, follow links in the Next steps section.

## Big data, Apache Spark and legacy table formats

[!INCLUDE [product-name](../includes/product-name.md)] Runtime for Apache Spark leverages the same foundation as Azure Synapse Analytics Runtime for Apache Spark, but contain key differences to provide a more streamlined behavior across all engines in the [!INCLUDE [product-name](../includes/product-name.md)] service. In [!INCLUDE [product-name](../includes/product-name.md)], key performance features are turned on by default. Advanced Apache Spark users may revert configurations to previous values to better align with specific scenarios.

All table types, managed and un-managed, are supported by [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse and the Apache Spark engine; this include views and regular non-Delta Hive table formats. Tables defined using PARQUET, CSV, AVRO, JSON, and any Apache Spark / Hive compatible file format will work as expected.

The Lakehouse explorer user interface experience will vary depending on table type. Currently, the Lakehouse explorer only renders table objects.

### Differences with Azure Synapse Analytics

The following table contains the configuration differences between Azure Synapse Analytics and [!INCLUDE [product-name](../includes/product-name.md)] Runtime for Apache Spark.

-> big table here

## Auto discovery of tables

The Lakehouse explorer provides a tree-like view of the objects in the [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse artifact. It has a key capability of discovering and displaying tables that are described in the metadata repository and in disk under the ```Tables``` section of the Lakehouse. Auto-discovery also applies to tables defined over OneLake shortcuts.

-> image of Lakehouse with all table types

### Tables over Shortcuts

[!INCLUDE [product-name](../includes/product-name.md)] Lakehouse supports tables defined over OneLake shortcuts, to provide utmost compatibility and no data movement. The following table contains the scenario best-practices for each data artifact type when using it over shortcuts.

* Delta table.
* non-Delta table such as legacy Hive tables.
* Remote storage path with files and folders.

## Load to Delta

[!INCLUDE [product-name](../includes/product-name.md)] Lakehouse provides a convenient and productive user interface to streamline loading data into Delta tables. The Load to Delta feature allows a visual experiences to load common file formats and folders to Delta to boost analytical productivity to all personas. To learn more about the Load to Delta feature in details, read the [Lakehouse Load to Delta Lake tables](load-to-delta.md) reference documentation.

## Delta Lake table optimization

Keeping tables in shape for the broad scope of analytics scenarios is no minor feat. [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse pro-actively enables the important parameters to minimize common problems associated with big data tables, such as compaction and small file sizes, and to maximize query performance. Still, there are many scenarios where those parameters will need additional changes. The [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md) article covers the most important scenarios and provides an in-depth guide on how to efficiently maintain Delta tables for maximum performance.

## Next steps

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Delta Lake overview](/azure/synapse-analytics/spark/apache-spark-delta-lake-overview?pivots=programming-language-python)
- Shortcuts
- Runtime link
- load to delta
- link to how to change configurations