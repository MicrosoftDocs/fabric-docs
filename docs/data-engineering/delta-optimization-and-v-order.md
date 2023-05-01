---
title: Delta Lake table optimization and V-Order
description: Learn how to keep your Delta Lake tables optimized across multiple scenarios
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: how-to
ms.date: 05/23/2023
ms.search.form: delta lake v-order optimization
---

# Delta Lake table optimization and V-Order

[!INCLUDE [preview-note](../includes/preview-note.md)]

The [Lakehouse](lakehouse-overview.md) and the [Delta Lake](lakehouse-and-delta-tables.md) table format are central to [!INCLUDE [product-name](../includes/product-name.md)], assuring that tables are optimized for analytics at all times is a key requirement. This guide covers Delta Lake table optimization concepts, configurations and how to apply it to most common Big Data usage patterns.

## What is V-Order?

V-Order is a write time optimization to the parquet file format that enables lightning-fast reads under the Microsoft Fabric compute engines, such as PowerBI, SQL, Spark and others.

PowerBI and SQL engines make use of Microsoft Verti-Scan technology and V-Ordered parquet files to achieve in-memory like data access times. Spark and other non-Verti-Scan compute engines also benefit from the V-Ordered files with an average of 10% faster read times, with some scenarios up to 50%.

V-Order works by applying special sorting, row group distribution, dictionary encoding and compression on parquet files, thus requiring less network, disk, and CPU resources in compute engines to read it, providing cost efficiency and additional performance.  V-Order sorting has a 15% impact on average write times but provides up to 50% more compression.

Its __100% open-source parquet format compliant__; all parquet engines can read it as a regular parquet files. Delta tables are more efficient than ever; features such as Z-Order are compatible with V-Order. Table properties and optimization commands can be used on control V-Order on its partitions.

V-Order is applied at the parquet file level. Delta tables and its features, such as Z-Order, compaction, vacuum, time travel, etc are orthogonal to V-Order, as such, are compatible and may be used in conjuction for additional benefits.

## Controlling V-Order writes

V-Order is __enabled by default__ in [!INCLUDE [product-name](../includes/product-name.md)] and in Apache Spark it is controlled by two configurations:

-> table with V-Order stuff

Use the following commands to control usage of V-Order writes.

### Check V-Order configuration in Apache Spark session

### Disable V-Order writing in Apache Spark session

### Enable V-Order writing in Apache Spark session

### Control V-Order using Delta table properties

## Delta table maintenance

As Delta tables change, performance adn storage cost efficiency tends to degrade for the following reasons:

1. New data added to the table may skew data
1. Batch and streaming data ingestion rate might bring in many small files
1. Update and delete operations will eventually create additional read overhead; parquet files are immutable by design, so Delta tables adds new parquet files which the change set, exarcebating the issues imposed by the first two items.
1. No longer needed data files and log files available in the storage.

In order to keep the tables at the best state for best performance, perform bin-compaction and vacuuming operations in the Delta tables. Bin-compaction is achieved by the [OPTIMIZE](https://docs.delta.io/latest/optimizations-oss.html) command; it merges all changes into bigger, consolidated parquet files. De-referenced storage clean-up is achieved by the [VACUUM](https://docs.delta.io/latest/delta-utility.html#-delta-vacuum) command.

> [!IMPORTANT]
> Properly designing the table physical structure based on the ingestion frequency and expected read patterns is likely more important than running the optimization commands described in this section. Please refer to the next section for Delta Lake scenario-based best practices.

### Run OPTIMIZE using Apache Spark

### Run VACUUM using Apache Spark

### Control V-Order when optimizing a table

## Delta Lake performance considerations and best practices

This section contains a non-exhausting reference of common usage patterns and the best practices for Delta Lake tables configuration and maintenance actions.

--> big table with scenarios/best practices

## Next steps

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Lakehouse and Delta Lake](lakehouse-and-delta-tables.md)
