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

## What is V-Order

V-Order is a write time optimization to the parquet file format that enables lightning-fast reads under the Microsoft Fabric compute engines, such as PowerBI, SQL, Spark and others.

PowerBI and SQL engines make use of Microsoft Verti-Scan technology and V-Ordered files to achieve in-memory like data access times. Spark and other non-Verti-Scan compute engines also benefit from the V-Ordered files with an average of 10% faster read times, with some scenarios up to 50%.

V-Order works by applying special sorting and compression on parquet files, thus requiring less network, disk, and CPU resources in compute engines to read it, providing cost efficiency and additional performance.  V-Order sorting has a 15% impact on average write times but provides up to 50% more compression.

Its __100% open-source parquet format compliant__; all parquet engines can read it as a regular parquet files. Delta tables are more efficient than ever; features such as Z-Order are compatible with V-Order. Table properties and optimization commands can be used on control V-Order on its partitions.

## Write optimization considerations

## Apache Spark configurations for Delta optimization

## Delta Lake usage scenarios and best practices

## Next steps

- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Lakehouse and Delta Lake](lakehouse-and-delta-tables.md)
