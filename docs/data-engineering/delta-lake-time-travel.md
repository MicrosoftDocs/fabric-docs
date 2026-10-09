---
title: Query Delta tables with time travel
description: Learn how to query Delta tables at an earlier version or timestamp in Microsoft Fabric by using Delta Lake time travel in SQL and PySpark.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# Query Delta tables with time travel

In Microsoft Fabric, Delta Lake time travel lets you query a Delta table as it existed at a specific table version or timestamp. You can use time travel when you need to inspect historical data without changing the current table state.

Time travel is read-only. It doesn't roll back the table or create a new current version. If you want an earlier version to become the active table state, use [RESTORE](delta-lake-restore.md) instead.

## What time travel helps you do

Use time travel when you need to:

- Audit what data looked like at a previous point in time
- Debug a pipeline issue by checking the table before or after a write
- Run reproducible analytics against a known table snapshot
- Compare the current table state with an older state
- Recover data that was accidentally deleted by reading an older version before you decide whether to restore it

## Use SQL syntax

You can query historical data with Spark SQL or PySpark.

Query a specific table version:

# [Spark SQL](#tab/sparksql)

```sql
SELECT * FROM table_name VERSION AS OF 5
```

# [PySpark](#tab/pyspark)

```python
df = spark.read.format("delta").option("versionAsOf", 5).table("table_name")
```

# [Scala](#tab/scala)

```scala
val df = s  park.read.format("delta").option("versionAsOf", 5).table("table_name")
```

---

Query the table as it existed at a specific timestamp:

# [Spark SQL](#tab/sparksql)

```sql
SELECT * FROM table_name TIMESTAMP AS OF '2024-01-01'
```

# [PySpark](#tab/pyspark)

```python
df = spark.read.format("delta").option("timestampAsOf", "2024-01-01").table("table_name")
```

# [Scala](#tab/scala)

```scala
val df = spark.read.format("delta").option("timestampAsOf", "2024-01-01").table("table_name")
```

---

Use [DESCRIBE HISTORY](delta-lake-describe.md) to find the versions and timestamps that are available:

# [Spark SQL](#tab/sparksql)

```sql
DESCRIBE HISTORY table_name
```

# [PySpark](#tab/pyspark)

```python
df = spark.sql("DESCRIBE HISTORY table_name")
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "table_name")
display(deltaTable.history())
```

---

These reads return the table snapshot for that point in time. They don't change the current Delta table version.

## Understand how time travel works

A Delta table stores transaction metadata in the `_delta_log` folder. Every committed change creates a new table version in the Delta log.

Each version points to the set of data files that make up the table at that moment. When you query a previous version or timestamp, Delta Lake reconstructs that historical snapshot by reading the files referenced by that version.

Because of this design, time travel is efficient and doesn't require keeping a separate full copy of the table for every change.

## Understand retention and availability

Time travel depends on both transaction log retention and physical data file retention.

- `delta.logRetentionDuration` controls how long Delta log entries are kept. The default is 30 days.
- Actual data file retention depends on `VACUUM`. By default, `VACUUM` keeps unreferenced files for seven days before removing them.
- You can query any table version only when the required historical data files still exist on disk.

In practice, the oldest version you can query depends on whether Fabric still has both the metadata and the data files needed to reconstruct that snapshot.

## Understand the relationship to VACUUM

`VACUUM` removes unreferenced files from storage. That cleanup is useful for storage management, but it also limits time travel.

If `VACUUM` removes the files that an older version needs, that older version becomes unqueryable even if the version still appears in table history. Before you shorten retention or run aggressive cleanup, decide how much historical access your team needs.

For more information, see [VACUUM](delta-lake-vacuum.md).

## Understand the relationship to RESTORE

Time travel and `RESTORE` use the same Delta history, but they solve different problems.

- Time travel runs a read-only query against an older snapshot.
- `RESTORE` makes an older version the new current state of the table.

A common pattern is to use time travel first to inspect or validate the earlier data, and then use `RESTORE` only if you want to roll the table back.

For more information, see [RESTORE](delta-lake-restore.md).

## Where time travel works

Time travel works in these Fabric experiences:

- Fabric notebooks by using Spark SQL or PySpark
- Spark job definitions that use Spark SQL or PySpark
- The SQL analytics endpoint, see [Time Travel in Fabric Warehouse](../data-warehouse/time-travel.md)

Use Spark experiences when you need full Delta Lake APIs. The SQL analytics endpoint is best for supported query scenarios, not for Spark-only maintenance operations.

## Follow best practices

Use these practices when you rely on time travel in Fabric:

- Don't reduce `VACUUM` retention below your actual time-travel and recovery requirements.
- Run `DESCRIBE HISTORY` before you choose a version or timestamp.
- Use time travel for investigation and validation, and use `RESTORE` only when you need to change the current table state.
- For long-term point-in-time requirements, create a full copy of the data (for example, `CREATE TABLE ... AS SELECT`) instead of depending on time travel alone.
- Align `delta.logRetentionDuration` and file retention settings with your audit, debugging, and reproducibility needs.

## Related content

- [RESTORE](delta-lake-restore.md)
- [VACUUM](delta-lake-vacuum.md)
- [Inspect Delta table metadata](delta-lake-describe.md)
- [CLONE](delta-lake-clone.md)
