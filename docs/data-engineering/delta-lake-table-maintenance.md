---
title: Delta table maintenance in Microsoft Fabric
description: Learn which Delta table maintenance operations to use in Microsoft Fabric, when to use them, and where to run them.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# Delta table maintenance in Microsoft Fabric

Delta table maintenance helps you keep tables fast and storage-efficient as they grow. Over time, Delta tables can accumulate many small files, deleted data can continue to consume storage space, and stale statistics can reduce query efficiency. Regular maintenance helps you improve read performance, reclaim storage, and keep table metadata aligned with the way your workloads access data. Use this article as a quick guide to the main maintenance operations available for Delta tables.

## Why maintenance matters

As Delta tables grow, write activity changes the physical layout of the table. Repeated ingestion jobs can create many small files, update and delete operations can leave behind unreferenced files or soft-deleted rows, and older statistics can make it harder for Spark to skip unnecessary data. If you maintain tables regularly, you reduce overhead for scans, help Fabric optimize queries more effectively, and avoid paying to keep storage that active table versions no longer need.

## Use OPTIMIZE for bin compaction

Use `OPTIMIZE` when your Delta table has accumulated many small files and you want to consolidate them into fewer, larger files. This operation improves read performance by reducing file-management overhead and making scans more efficient. `OPTIMIZE` also supports additional arguments and features such as `VORDER`. For full syntax, options, and examples, see [Table compaction](table-compaction.md) and [V-Order](delta-optimization-and-v-order.md).

# [Spark SQL](#tab/sparksql)

```sql
OPTIMIZE table_name
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

deltaTable = DeltaTable.forName(spark, "table_name")
deltaTable.optimize().executeCompaction()
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "table_name")
deltaTable.optimize().executeCompaction()
```

---

## Use VACUUM for storage cleanup

Use `VACUUM` when you want to remove unreferenced data files that are older than the configured retention window. In Fabric, this operation helps you reclaim OneLake storage after updates, deletes, merges, overwrite operations, and compaction. `VACUUM` focuses on storage cleanup rather than query tuning, so it usually complements other maintenance tasks instead of replacing them. For retention guidance and execution details, see [VACUUM](delta-lake-vacuum.md).

# [Spark SQL](#tab/sparksql)

```sql
VACUUM table_name
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

deltaTable = DeltaTable.forName(spark, "table_name")
deltaTable.vacuum()
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "table_name")
deltaTable.vacuum()
```

---

## Use REORG for targeted reorganization

Use `REORG` when you need to rewrite table state for a specific maintenance goal instead of general file compaction. In Delta Lake, `REORG TABLE ... APPLY (PURGE)` physically removes rows that deletion vectors marked as deleted. For the supported options and when to use them, see [Reorganize Delta tables with REORG](delta-lake-reorg.md).

> [!NOTE]
> `REORG` generally does not need to be run as `OPTIMIZE` will automatically purge files where greater than 5% of records are referenced by deletion vectors. 

# [Spark SQL](#tab/sparksql)

```sql
REORG TABLE table_name APPLY (PURGE)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("REORG TABLE table_name APPLY (PURGE)")
```

# [Scala](#tab/scala)

```scala
spark.sql("REORG TABLE table_name APPLY (PURGE)")
```

---

## Keep statistics current

The Fabric Spark Runtime supports two types of statistics on Delta tables: file statistics and table statistics.

- **File statistics** — Delta Lake records per-file min, max, and null-count values for indexed columns every time a data file is written. The Spark engine uses these statistics to skip files that can't contain rows matching a query predicate, which reduces the amount of data scanned. By default, statistics are collected for the first 32 columns. For details on how file skipping works and how to customize which columns statistics are collected for, see [File skipping](delta-lake-file-skipping.md).
- **Table statistics** — Column-level statistics aggregated across the all files in the table are maintained automatically so Spark has better metadata for query planning. These statistics improve performance through better optimization decisions for filters, joins, and aggregations. To learn how automated statistics work and how to configure, see [Automated statistics for Delta tables](automated-table-statistics.md).

## Use auto-compaction for continuous file management

Delta Lake also supports automatic compaction after writes so tables can stay healthier without requiring a separate manual job every time. You can control this behavior through table properties or workspace settings, depending on how you manage your Spark workloads. See [Auto compaction](table-compaction.md#auto-compaction) for details on how to enable.

## Run maintenance from the lakehouse UI

If you prefer a UI-based workflow, you can run maintenance actions directly from the lakehouse explorer, see [Lakehouse table maintenance](lakehouse-table-maintenance.md).

## Follow a practical maintenance cadence

Run `OPTIMIZE` after large batch ingestion or whenever small files begin to accumulate and slow down reads. Run `VACUUM` on a regular cadence, such as weekly or after major compaction cycles, to reclaim storage from files the table no longer references. `REORG TABLE ... APPLY (PURGE)` is generally not needed as routine maintenance because `OPTIMIZE` automatically purges files where greater than 5% of records are referenced by deletion vectors. Reserve `PURGE` for scenarios that require explicit control, such as compliance or GDPR obligations. Monitor table condition with `DESCRIBE DETAIL` and `DESCRIBE HISTORY` so you can track file counts, size, and maintenance history before and after each operation.

# [Spark SQL](#tab/sparksql)

```sql
-- View current table state
DESCRIBE DETAIL table_name;

-- View history of transactions
DESCRIBE HISTORY table_name;
```

# [PySpark](#tab/pyspark)

```python
# View current table state
display(spark.sql("DESCRIBE DETAIL table_name"))

# View history of transactions
display(spark.sql("DESCRIBE HISTORY table_name"))
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "table_name")

// View current table state
display(deltaTable.detail())

// View history of transactions
display(deltaTable.history())
```

---

## Related content

- [Table compaction](table-compaction.md)
- [VACUUM Delta tables](delta-lake-vacuum.md)
- [Reorganize Delta tables with REORG](delta-lake-reorg.md)
- [File skipping](delta-lake-file-skipping.md)
- [Automated statistics for Delta tables](automated-table-statistics.md)
- [Lakehouse table maintenance](lakehouse-table-maintenance.md)
- [V-Order](delta-optimization-and-v-order.md)
- [Delta Lake interoperability](../fundamentals/delta-lake-interoperability.md)
