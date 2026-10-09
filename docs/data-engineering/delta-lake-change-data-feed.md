---
title: Use change data feed with Delta tables
description: Learn what Delta Lake change data feed is, when to use it, how to enable it, and how to read row-level changes in Microsoft Fabric.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/19/2026
ai-usage: ai-assisted
---

# Use change data feed with Delta tables

Change data feed (CDF) records row-level changes for a Delta table. When data changes, CDF captures the change as an `insert`, `update`, or `delete` event that you can read later.

In Microsoft Fabric, CDF helps you build incremental data patterns on top of Delta tables in a lakehouse. Instead of reprocessing an entire table every time, you can read only the rows that changed since a version or timestamp that you track.

## What change data feed does

When CDF is enabled on a Delta table, Delta writes change information for supported write operations after the feature is turned on.

CDF records these row-level changes:

- Inserts
- Updates
- Deletes

For updates, CDF can return both the row before the update and the row after the update, which helps you understand exactly what changed between table versions.

## When to use change data feed

Use CDF when you need to work with only the changes in a Delta table instead of reading the full current state.

CDF is useful for these scenarios:

- Incremental extract, transform, and load (ETL) pipelines that process only newly inserted, updated, or deleted rows.
- Change data capture (CDC) downstream patterns that publish table changes to other systems or downstream tables.
- Audit and compliance workflows that need a record of row-level changes over time.
- Materialized view refresh patterns where you update derived tables based on the latest source-table changes.

## Enable change data feed

Enable CDF as a Delta table property.

### Enable CDF when you create a table

Use `delta.enableChangeDataFeed = true` in `TBLPROPERTIES` when you create the table.

# [Spark SQL](#tab/sparksql)

```sql
CREATE TABLE sales.orders (
    order_id BIGINT,
    customer_id BIGINT,
    order_status STRING,
    order_total DECIMAL(18,2)
)
USING DELTA
TBLPROPERTIES (delta.enableChangeDataFeed = true)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("""
CREATE TABLE sales.orders (
    order_id BIGINT,
    customer_id BIGINT,
    order_status STRING,
    order_total DECIMAL(18,2)
)
USING DELTA
TBLPROPERTIES (delta.enableChangeDataFeed = true)
""")
```

# [Scala](#tab/scala)

```scala
spark.sql("""
CREATE TABLE sales.orders (
    order_id BIGINT,
    customer_id BIGINT,
    order_status STRING,
    order_total DECIMAL(18,2)
)
USING DELTA
TBLPROPERTIES (delta.enableChangeDataFeed = true)
""")
```

---

### Enable CDF on an existing table

If the table already exists, set the table property with `ALTER TABLE`.

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales.orders
SET TBLPROPERTIES (delta.enableChangeDataFeed = true)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales.orders SET TBLPROPERTIES (delta.enableChangeDataFeed = true)")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales.orders SET TBLPROPERTIES (delta.enableChangeDataFeed = true)")
```

---

CDF captures changes only after you enable it. It doesn't backfill historical changes that happened before the property was turned on.

## Read change data

Read CDF by version range or by timestamp range, depending on how your pipeline tracks progress.

Use these examples to read changes starting at a version.

# [Spark SQL](#tab/sparksql)

```sql
SELECT * FROM table_changes('table_name', 1)
```

# [PySpark](#tab/pyspark)

```python
spark.read.format("delta").option("readChangeFeed", "true").option("startingVersion", 1).table("table_name")
```

# [Scala](#tab/scala)

```scala
val changes = spark.read.format("delta")
  .option("readChangeFeed", "true")
  .option("startingVersion", 1)
  .table("table_name")
```

---

You can also read a bounded version range.

# [Spark SQL](#tab/sparksql)

```sql
SELECT *
FROM table_changes('sales.orders', 120, 125)
```

# [PySpark](#tab/pyspark)

```python
changes_df = (
    spark.read.format("delta")
    .option("readChangeFeed", "true")
    .option("startingVersion", 120)
    .option("endingVersion", 125)
    .table("sales.orders")
)
```

# [Scala](#tab/scala)

```scala
val changes = spark.read.format("delta")
  .option("readChangeFeed", "true")
  .option("startingVersion", 120)
  .option("endingVersion", 125)
  .table("sales.orders")
```

---

If your pipeline tracks time instead of commit versions, use timestamps.

# [Spark SQL](#tab/sparksql)

```sql
SELECT *
FROM table_changes(
    'sales.orders',
    TIMESTAMP '2026-05-01T00:00:00Z',
    TIMESTAMP '2026-05-01T23:59:59Z'
)
```

# [PySpark](#tab/pyspark)

```python
changes_df = (
    spark.read.format("delta")
    .option("readChangeFeed", "true")
    .option("startingTimestamp", "2026-05-01T00:00:00Z")
    .option("endingTimestamp", "2026-05-01T23:59:59Z")
    .table("sales.orders")
)
```

# [Scala](#tab/scala)

```scala
val changes = spark.read.format("delta")
  .option("readChangeFeed", "true")
  .option("startingTimestamp", "2026-05-01T00:00:00Z")
  .option("endingTimestamp", "2026-05-01T23:59:59Z")
  .table("sales.orders")
```

---

## How batch CDF reads resolve the ending version

When you read CDF changes in batch mode, a [Native execution engine](native-execution-engine-overview.md) optimized implementation is used that can improve performance by 2-3x. The optimization is enabled by default when both the start and end version are provided and the [Native execution engine](native-execution-engine-overview.md) is enabled.

### Open-ended reads (start version only)

When you specify only a starting version and omit the ending version, the behavior depends on configuration:

- **Default behavior**: The ending version is resolved at execution time. Each time the query runs, it reads up to the latest table version at that moment. If you hold a reference to the DataFrame and reevaluate it after the table changes, the results include the newer changes.

- **With `startOnly` optimization**: When the Spark configuration `spark.microsoft.delta.changeDataFeed.batch.staticReader.startOnly.enabled` is set to `true`, the ending version is resolved at query planning time instead of execution time. The query plan captures the table version at that moment. The [Native execution engine](native-execution-engine-overview.md) can then apply the same reader optimizations that improve performance by 2–3x.

  > [!IMPORTANT]
  > With the `startOnly` optimization, the query plan captures the table version at the time Spark analyzes the query. If new commits arrive between analysis and execution, those changes aren't included in the results. For periodic ETL pipelines, the gap is typically fine because the next run picks up any missed versions. However, for one-shot queries or workflows that assume every change up to the moment of execution is included, this behavior can cause changes arriving in the short time between query planning and execution to be silently missed. The optimization is disabled by default.

## Read change data with Structured Streaming

You can also consume CDF as a streaming source using the Spark `readStream` API.

On the first stream read, Spark processes the full initial snapshot of the table (all existing rows as `insert` change types) and then incrementally picks up only new changes on subsequent reads. You don't need to seed the downstream target separately—the first micro-batch delivers the baseline.

### Start a stream from the current table version

# [Spark SQL](#tab/sparksql)

Structured Streaming uses the DataFrame API. Use PySpark or Scala for streaming reads.

# [PySpark](#tab/pyspark)

```python
df = (
    spark.readStream.format("delta")
    .option("readChangeFeed", "true")
    .table("sales.orders")
)

display(df)
```

# [Scala](#tab/scala)

```scala
val df = spark.readStream.format("delta")
  .option("readChangeFeed", "true")
  .table("sales.orders")

display(df)
```

---

### Start a stream from a specific version

# [Spark SQL](#tab/sparksql)

Structured Streaming uses the DataFrame API. Use PySpark or Scala for streaming reads.

# [PySpark](#tab/pyspark)

```python
df = (
    spark.readStream.format("delta")
    .option("readChangeFeed", "true")
    .option("startingVersion", 120)
    .table("sales.orders")
)

display(df)
```

# [Scala](#tab/scala)

```scala
val df = spark.readStream.format("delta")
  .option("readChangeFeed", "true")
  .option("startingVersion", 120)
  .table("sales.orders")

display(df)
```

---

### Start a stream from a timestamp

# [Spark SQL](#tab/sparksql)

Structured Streaming uses the DataFrame API. Use PySpark or Scala for streaming reads.

# [PySpark](#tab/pyspark)

```python
df = (
    spark.readStream.format("delta")
    .option("readChangeFeed", "true")
    .option("startingTimestamp", "2026-05-01T00:00:00Z")
    .table("sales.orders")
)

display(df)
```

# [Scala](#tab/scala)

```scala
val df = spark.readStream.format("delta")
  .option("readChangeFeed", "true")
  .option("startingTimestamp", "2026-05-01T00:00:00Z")
  .table("sales.orders")

display(df)
```

---

### Write the stream to a downstream Delta table

Use `writeStream` with a checkpoint location to maintain exactly once processing state across restarts.

# [Spark SQL](#tab/sparksql)

Structured Streaming uses the DataFrame API. Use PySpark or Scala for streaming writes.

# [PySpark](#tab/pyspark)

```python
# Read changes as a stream
changes_stream = (
    spark.readStream.format("delta")
    .option("readChangeFeed", "true")
    .table("sales.orders")
)

# Write changes to a downstream Delta table
(
    changes_stream.writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "Files/checkpoints/orders_changes")
    .toTable("sales.orders_changes")
)
```

# [Scala](#tab/scala)

```scala
// Read changes as a stream
val changesStream = spark.readStream.format("delta")
  .option("readChangeFeed", "true")
  .table("sales.orders")

// Write changes to a downstream Delta table
changesStream.writeStream
  .format("delta")
  .outputMode("append")
  .option("checkpointLocation", "Files/checkpoints/orders_changes")
  .toTable("sales.orders_changes")
```

---

## Review CDF output columns

When you read from CDF, the result includes your table columns plus metadata columns that describe the change event.

| Column | Description |
|---|---|
| `_change_type` | The kind of row change: `insert`, `update_preimage`, `update_postimage`, or `delete`. |
| `_commit_version` | The Delta table version where the change was committed. |
| `_commit_timestamp` | The commit timestamp for that table version. |


## Understand storage impact

CDF adds storage overhead because Delta writes extra files under the `_change_data` folder for tracked changes.

Those extra files are part of the table's change history, not part of the current active table snapshot. They're also subject to `VACUUM`, so your retention strategy affects how long you can read older change records.

If you run `VACUUM`, older CDF files outside the retention window can be removed along with other obsolete table files.

## See how operations affect change data feed

Different Delta operations produce different CDF records.

- `INSERT` produces `insert` records.
- `UPDATE` and `MERGE` produce both `update_preimage` and `update_postimage` records.
- `DELETE` produces `delete` records.
- `OPTIMIZE` and `REORG` don't produce row-level change records because they reorganize files without changing logical data (`dataChange = false`).

This behavior helps you separate logical data changes from maintenance operations.

## Follow best practices

Use these practices when you design CDF-based pipelines in Fabric:

- Enable CDF early because it doesn't backfill changes from before the feature was enabled.
- Use version ranges for batch incremental processing so each pipeline run reads a well-defined slice of changes.
- Monitor `_change_data` folder growth and plan retention carefully because `VACUUM` cleans up older CDF files according to your retention window.
- Combine CDF with watermarking in streaming or near-real-time pipelines so you can track the last processed version or timestamp reliably.

## Related content

- [Time travel](delta-lake-time-travel.md)
- [Schema evolution](delta-lake-schema-evolution.md)
- [Low-Shuffle Merge](low-shuffle-merge.md)
- [Table maintenance overview](delta-lake-table-maintenance.md)
