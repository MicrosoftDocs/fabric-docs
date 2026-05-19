---
title: Deletion vectors for Delta tables
description: Learn what deletion vectors are, how they improve Delta Lake write performance, and when to use REORG PURGE.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# Deletion vectors for Delta tables

Deletion vectors let Delta Lake mark individual rows as deleted without rewriting the entire Parquet file that contains those rows. In Microsoft Fabric, this feature helps you handle row-level changes more efficiently, especially when working with large Delta tables.

Instead of replacing a full data file for a small delete or update, Delta Lake stores the row-level delete information separately. Query engines then use that metadata to ignore the affected rows.

## What deletion vectors do

A deletion vector is a companion file for a Delta table data file. It records which row positions in a Parquet file are no longer valid.

This design gives you a form of soft delete at the row level:

- The original Parquet file stays in place.
- Delta writes a much smaller deletion vector file.
- Readers skip the marked rows at query time.

Because the data file doesn't need an immediate rewrite, deletion vectors are especially useful when a change affects only a small number of rows in a large file.

## How deletion vectors work

When you run `DELETE`, `UPDATE`, or `MERGE`, Delta identifies the rows that need to change.

If deletion vectors are enabled, Delta can record the affected rows in a deletion vector instead of rewriting the full Parquet file right away.

The process works like this:

1. Delta finds the rows in the target Parquet file that are deleted or replaced.
1. Delta writes a deletion vector file that marks those specific rows as invalid.
1. The original Parquet file remains intact in OneLake.
1. Fabric readers consult the deletion vector and skip the marked rows during query execution.

For `UPDATE` and `MERGE`, Delta still writes new rows when needed. The key benefit is that it can avoid rewriting unchanged rows in the original file.

## Why deletion vectors help

Deletion vectors improve write efficiency for workloads with frequent small row-level changes.

They help because they:

- Speed up `DELETE`, `UPDATE`, and `MERGE` operations that touch relatively few rows.
- Reduce write amplification because Delta Lake doesn't need to rewrite an entire Parquet file for every small change.
- Lower I/O for large files when only a small subset of rows changes.

This behavior is often a good fit for slowly changing dimensions, upsert pipelines, cleanup jobs, and operational tables that receive frequent corrections.

## Enable deletion vectors

> [!NOTE]
> Deletion vectors are enabled by default starting in Fabric Spark runtime 2.0 (Delta 4.1).

You can enable deletion vectors at the table level by setting the Delta table property.

# [Spark SQL](#tab/sparksql)

```sql
CREATE TABLE sales.orders (
  order_id BIGINT,
  customer_id BIGINT,
  order_status STRING,
  order_date DATE
)
USING DELTA
TBLPROPERTIES ('delta.enableDeletionVectors' = true)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("""
CREATE TABLE sales.orders (
  order_id BIGINT,
  customer_id BIGINT,
  order_status STRING,
  order_date DATE
)
USING DELTA
TBLPROPERTIES ('delta.enableDeletionVectors' = true)
""")
```

# [Scala](#tab/scala)

```scala
spark.sql("""
CREATE TABLE sales.orders (
  order_id BIGINT,
  customer_id BIGINT,
  order_status STRING,
  order_date DATE
)
USING DELTA
TBLPROPERTIES ('delta.enableDeletionVectors' = true)
""")
```

---

You can also enable deletion vectors on an existing table.

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales.orders
SET TBLPROPERTIES ('delta.enableDeletionVectors' = true)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales.orders SET TBLPROPERTIES ('delta.enableDeletionVectors' = true)")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales.orders SET TBLPROPERTIES ('delta.enableDeletionVectors' = true)")
```

---

### Enable deletion vectors for all new tables in a session

To enable deletion vectors by default for every new table created during a Spark session, set the session-level configuration:

# [Spark SQL](#tab/sparksql)

```sql
SET spark.databricks.delta.properties.defaults.enableDeletionVectors = TRUE
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set("spark.databricks.delta.properties.defaults.enableDeletionVectors", True)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.databricks.delta.properties.defaults.enableDeletionVectors", "true")
```

---

Any table created after this setting is applied has deletion vectors enabled without needing to specify the table property individually.


## Understand the performance tradeoffs

Deletion vectors usually make writes faster, but they introduce a read-time tradeoff.

### Write performance

Writes are often faster because Delta Lake can avoid a full file rewrite when only a few rows change.

### Read performance

Reads can have minor overhead because the engine must check the deletion vector metadata and skip invalid rows while scanning data files.

For many workloads, that overhead is small compared to the write savings. However, if deletion vectors accumulate over time, the extra metadata checks can slow down reads.

## Use REORG PURGE to remove accumulated deletion vectors

`OPTIMIZE` automatically purges files where greater than 5% of records are referenced by deletion vectors, so routine compaction typically handles deletion vector cleanup without a separate step.

Use `REORG TABLE ... APPLY (PURGE)` when you need explicit control over when soft-deleted rows are physically removed — for example, to meet compliance or GDPR requirements, or to force-purge files that fall below the 5% threshold that `OPTIMIZE` uses.

`PURGE` rewrites the affected data files, removes the soft-deleted rows from the active Parquet files, and eliminates the deletion vector files for those rewritten files.

# [Spark SQL](#tab/sparksql)

```sql
REORG TABLE sales.orders APPLY (PURGE)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("REORG TABLE sales.orders APPLY (PURGE)")
```

# [Scala](#tab/scala)

```scala
spark.sql("REORG TABLE sales.orders APPLY (PURGE)")
```

---

Run `PURGE` when you have a specific need to force-remove soft-deleted rows below the 5% threshold, or when compliance requirements demand physical removal on a defined schedule. For most workloads, `OPTIMIZE` handles deletion vector cleanup automatically.

## Compare REORG, OPTIMIZE, and VACUUM

These commands work together, but they do different jobs.

### REORG TABLE ... APPLY (PURGE)

`REORG TABLE ... APPLY (PURGE)` rewrites affected files and physically removes rows that were only soft-deleted before.

### OPTIMIZE

`OPTIMIZE` compacts small files to improve scan efficiency. It also automatically purges files where greater than 5% of records are referenced by deletion vectors, so it serves as the primary maintenance command for most deletion vector cleanup.

### VACUUM

`VACUUM` removes unreferenced files that are older than the retention threshold. That cleanup can include deletion vector files after other operations make them obsolete.

A common pattern is:

1. Use deletion vectors to make row-level writes efficient.
1. Run `OPTIMIZE` regularly to compact files and automatically purge deletion vectors above the 5% threshold.
1. Run `REORG TABLE ... APPLY (PURGE)` only when you need to force-remove soft deletes below that threshold or for compliance.
1. Run `VACUUM` later to remove unreferenced files that are past retention.

## Check protocol compatibility

Deletion vectors require Delta reader version 3 and writer version 7.

Once you enable deletion vectors on a table, older readers that don't support deletion vectors can't read that table correctly. Before you enable the feature broadly, verify that every engine and runtime that reads the table supports the required Delta protocol.

You can inspect protocol-related metadata by using commands such as `DESCRIBE DETAIL` and by reviewing the table properties in the Delta log.

## Follow best practices

- Enable deletion vectors for tables that have frequent small deletes, updates, or merges.
- `OPTIMIZE` automatically purges files with greater than 5% of records referenced by deletion vectors, so a separate `PURGE` step is usually unnecessary.
- Use `REORG TABLE ... APPLY (PURGE)` only when you need explicit control, such as compliance requirements or force-purging below the 5% threshold.
- Use `VACUUM` to clean up obsolete deletion vector files only after they become unreferenced and older than the retention threshold.
- Confirm that all readers support reader version 3 and writer version 7, or the v2 checkpoint protocol, before you enable deletion vectors on shared tables.

## Related content

- [Reorganize Delta tables with REORG](delta-lake-reorg.md)
- [Table compaction](table-compaction.md)
- [VACUUM Delta tables](delta-lake-vacuum.md)
- [Delta Lake interoperability](../fundamentals/delta-lake-interoperability.md)
