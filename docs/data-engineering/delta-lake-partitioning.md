---
title: Partitioning for Delta tables
description: Learn how Hive-style partitioning works for Delta tables in Microsoft Fabric, when to use it for concurrent writer isolation, and how it compares to liquid clustering.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 05/19/2026
ai-usage: ai-assisted
---

# Partitioning for Delta tables

Hive-style partitioning divides a Delta table into physical subdirectories based on the values of one or more partition columns. Each unique combination of partition column values creates a separate directory. This layout enables partition pruning: the engine skips entire directories when a query filters on the partition column.

> [!TIP]
> For most workloads starting in Fabric Runtime 2.0, **liquid clustering is the recommended data layout strategy** for read performance. The primary reason to use partitioning is to **enable concurrent write operations that don't conflict**.
>
> For full liquid clustering guidance, see [Liquid clustering](liquid-clustering.md).

## When to use partitioning

The primary use case for partitioning in Delta Lake is **enabling concurrent write operations that don't conflict**. Delta Lake uses [optimistic concurrency control](delta-lake-concurrency-control.md), and two operations that touch the same files can conflict. Partitioning makes it possible for concurrent operations to target disjoint sets of files by operating on separate partitions.

Use partitioning when:

- You have **concurrent writers** that need to update, delete, or merge into the same table without conflicting — for example, multiple pipelines processing different business units or regions simultaneously.
- Your partition column has **low to moderate cardinality** (tens to hundreds of distinct values, not thousands). _Note: larger tables can accomodate more partitions, generally you should target for each partition to have at least 1GB of data._
- Partition values align with your **write patterns** — each writer naturally targets a specific partition.

> [!IMPORTANT]
> For file skipping and read performance alone, liquid clustering is generally more effective than partitioning because it eliminates the risk of small-file issues from choosing partitioning columns with suboptimal cardinality and enables changing clustering strategy over the tables lifecycle. Choose partitioning primarily when you need to isolate concurrent writers.

## Create a partitioned table

# [Spark SQL](#tab/sparksql)

```sql
CREATE TABLE sales.orders (
    order_id BIGINT,
    order_date DATE,
    region STRING,
    amount DECIMAL(10,2)
)
USING DELTA
PARTITIONED BY (region)
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

DeltaTable.create(spark) \
    .tableName("sales.orders") \
    .addColumn("order_id", "BIGINT") \
    .addColumn("order_date", "DATE") \
    .addColumn("region", "STRING") \
    .addColumn("amount", "DECIMAL(10,2)") \
    .partitionedBy("region") \
    .execute()
```

# [Scala](#tab/scala)

```scala
import io.delta.tables.DeltaTable

DeltaTable.create(spark)
    .tableName("sales.orders")
    .addColumn("order_id", "BIGINT")
    .addColumn("order_date", "DATE")
    .addColumn("region", "STRING")
    .addColumn("amount", "DECIMAL(10,2)")
    .partitionedBy("region")
    .execute()
```

---

## Partitioning and concurrent writes

Partitioning is the primary mechanism in Delta Lake for avoiding conflicts between concurrent write operations. When a table is partitioned, operations that target different partitions operate on disjoint sets of files and don't conflict with each other.

For example, two concurrent `MERGE INTO` operations on a table partitioned by `region` don't conflict as long as each targets a different region — provided the partition column is **explicitly included** in the merge condition:

# [Spark SQL](#tab/sparksql)

```sql
-- Pipeline A: processes North America only
MERGE INTO sales.orders AS target
USING staged_orders AS source
ON target.order_id = source.order_id
    AND target.region = 'NA'
    AND source.region = 'NA'
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

# [PySpark](#tab/pyspark)

```python
spark.sql("""
MERGE INTO sales.orders AS target
USING staged_orders AS source
ON target.order_id = source.order_id
    AND target.region = 'NA'
    AND source.region = 'NA'
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
""")
```

# [Scala](#tab/scala)

```scala
spark.sql("""
MERGE INTO sales.orders AS target
USING staged_orders AS source
ON target.order_id = source.order_id
    AND target.region = 'NA'
    AND source.region = 'NA'
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
""")
```

---

Without partitioning — or without including the partition column in the operation condition — these same operations could conflict even if they logically modify different rows. The partition column must appear in the merge condition itself, not just in the source data. Without it, Delta Lake can't determine at validation time that the two operations touched disjoint file sets.

For a complete guide to conflict types and resolution strategies, see [Concurrency control](delta-lake-concurrency-control.md).

## Common pitfalls

- **High cardinality** partition columns (for example, `user_id` with millions of values) create thousands of tiny directories and files, which degrades both write and read performance.
    - Date columns should be choosen with caution. For many tables, partitioning by a date column will result in too many small partitions. Target to have ~ 1GB of data in each partition.
- **Partition columns can't be changed** after table creation without rewriting the entire table.
- **Small file problem** is common with streaming or frequent appends into many partitions, because each write creates at least one file per partition.
- **Partitioning and liquid clustering are incompatible** on the same table. You must choose one strategy.

## Compare partitioning and liquid clustering

| Aspect | Hive-style partitioning | Liquid clustering |
|---|---|---|
| **Best for** | Concurrent writer isolation | General-purpose file skipping and read optimization |
| **Granularity** | One directory per distinct value (or combination) | File-level value ranges, no directories |
| **High cardinality** | Creates thousands of small files/directories | Handles naturally; bins data into right-sized files |
| **Column changes** | Requires full table rewrite | `ALTER TABLE CLUSTER BY` applies on next `OPTIMIZE` |
| **Write path** | Partition column must be known at write time | Any column can be clustered after the fact |
| **Concurrent writes** | Disjoint partitions avoid conflicts | Append-only without conflicts; updates/deletes/merges can conflict on unpartitioned tables |
| **Small file problem** | Common with streaming or frequent inserts | Managed by `OPTIMIZE` compaction |

## Related content

- [Concurrency control](delta-lake-concurrency-control.md)
- [Liquid clustering](liquid-clustering.md)
- [Z-Order](delta-lake-zorder.md)
- [Table compaction](table-compaction.md)
- [File skipping](delta-lake-file-skipping.md)
- [V-Order](delta-optimization-and-v-order.md)
- [Delta table maintenance](delta-lake-table-maintenance.md)
