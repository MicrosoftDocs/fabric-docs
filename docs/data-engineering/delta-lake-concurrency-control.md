---
title: Concurrency control for Delta tables
description: Learn how Delta Lake uses optimistic concurrency control for transactions, which operations can conflict, and how to avoid conflicts in Microsoft Fabric.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 05/19/2026
ai-usage: ai-assisted
---

# Concurrency control for Delta tables

When multiple Fabric notebooks, pipelines, or Spark jobs write to the same Delta table at the same time, Delta Lake uses optimistic concurrency control (OCC) to keep the table consistent. Each transaction reads a snapshot, writes new files, then validates that no conflicting commit happened in between. If a conflict is detected, the transaction fails with an exception rather than corrupting data.

This article covers practical patterns for managing concurrent writes in Fabric. For a full specification of the OCC protocol, see [Delta Lake concurrency control (OSS documentation)](https://docs.delta.io/concurrency-control/).

## Isolation levels

All Delta tables use the **Serializable** isolation level. This is the strictest level and the only one supported. It ensures that the result of concurrent transactions is identical to some sequential execution order.

Delta Lake also uses an internal **SnapshotIsolation** level for operations that don't change logical data (such as `OPTIMIZE`). This level skips the concurrent-append check, allowing compaction to proceed without conflicting with concurrent inserts. You don't configure this level directly — Delta Lake applies it automatically when appropriate.

With `Serializable` isolation, a concurrent blind append (`INSERT INTO`) **can** conflict with a `MERGE` or `UPDATE` that reads the same partition.

## Which operations conflict

Not all concurrent writes conflict. The key factor is whether two operations touch the same underlying files.

| Concurrent pair | Conflict? | Why |
|---|---|---|
| Two `INSERT` (append) operations | No | Each adds new files without reading existing ones (blind append). |
| `INSERT` + `OPTIMIZE` | No | `OPTIMIZE` commits at `SnapshotIsolation` because it doesn't change logical data, so it skips the concurrent-append check entirely. Appends add new files that don't overlap with files being compacted. |
| Two `UPDATE`, `DELETE`, or `MERGE` operations | Yes, if they read or modify overlapping files | Each rewrites files, so the second writer's snapshot is stale. |
| `OPTIMIZE` + `UPDATE`/`DELETE`/`MERGE` | Yes, if they touch the same files | `OPTIMIZE` removes and re-adds files (with `dataChange=false`). If a DML operation also read those same files, a `ConcurrentDeleteReadException` is raised. |
| Two `OPTIMIZE` runs | Yes, if they select the same files | Both attempt to remove and rewrite the same set of files, triggering a `ConcurrentDeleteDeleteException`. |
| `INSERT` + `MERGE`/`UPDATE`/`DELETE` | Yes, if the DML read the same partition | Under `Serializable`, a blind append can conflict with concurrent DML if the DML operation read a partition that the append wrote to. |

> [!TIP]
> Append-only pipelines (`INSERT INTO`, `df.write.mode("append")`) are the simplest way to avoid conflicts entirely. If your workload can append first and reconcile later, you eliminate write-write contention.

## Isolate writers with partitioning

The most common way to run concurrent DML against the same table without conflicts is to [partition the table](delta-lake-partitioning.md) by the column that separates your writers, then include that column in every operation condition. When each writer targets a different partition, the operations touch disjoint file sets and don't conflict.

A typical scenario: multiple pipelines each process data for a different business unit or tenant. Partition by that dimension and pin each pipeline's `MERGE` to its partition.

# [Spark SQL](#tab/sparksql)

```sql
-- Each pipeline targets its own partition, so concurrent runs don't conflict
MERGE INTO events AS target
USING staged AS source
ON target.event_id = source.event_id
    AND target.business_unit = 'EMEA'
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

# [PySpark](#tab/pyspark)

```python
# Pin the merge to a single partition to avoid conflicts with other pipelines
spark.sql("""
MERGE INTO events AS target
USING staged AS source
ON target.event_id = source.event_id
    AND target.business_unit = 'EMEA'
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
""")
```

# [Scala](#tab/scala)

```scala
// Pin the merge to a single partition to avoid conflicts with other pipelines
spark.sql("""
MERGE INTO events AS target
USING staged AS source
ON target.event_id = source.event_id
    AND target.business_unit = 'EMEA'
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
""")
```

---

> [!IMPORTANT]
> The partition column must appear in the merge condition itself — not just in the source data. Without it, Delta Lake can't determine at validation time that the two operations touched disjoint file sets, and the conflict checker treats the operation as a full-table read.

For more detail on partitioning strategies, see [Partitioning for Delta tables](delta-lake-partitioning.md).

## Built-in commit retry

Delta Lake automatically retries a commit when it detects that another transaction committed first. On each retry, it reads the winning commit, runs the conflict checker, and — if no logical conflict exists — reattempts the commit at the next available version. This process repeats transparently without any action from your code.

A logical conflict (for example, two operations rewriting the same file) can't be resolved by retry and raises one of the exceptions listed in [Common conflict exceptions](#common-conflict-exceptions). However, many transient version collisions — such as two blind appends racing for the same version slot — are resolved automatically and never surface to your application.

## Common conflict exceptions

When a conflict is detected, Delta Lake raises a specific exception. Understanding which exception you see helps identify the root cause.

| Exception | What happened |
|---|---|
| `ConcurrentAppendException` | Another writer appended files in a partition (or file set) your operation was reading. Common when a `MERGE` runs against a partition that's also receiving inserts from another pipeline. Under `Serializable` isolation, even blind appends (plain `INSERT` operations) can trigger this exception. |
| `ConcurrentDeleteReadException` | Another writer deleted or rewrote a file your operation read. Typical when `OPTIMIZE` compacts files that a concurrent `UPDATE` or `MERGE` was also reading, or when two DML operations overlap on the same rows. |
| `ConcurrentDeleteDeleteException` | Both operations tried to delete or rewrite the same file. Often caused by overlapping `OPTIMIZE` runs or two pipelines rewriting the same partition simultaneously. |
| `ConcurrentWriteException` | A generic conflict raised when another transaction committed to the same table version before conflict resolution could run — for example, during a filesystem-to-managed-commits upgrade. |
| `MetadataChangedException` | The table schema or properties changed mid-transaction — for example, a concurrent `ALTER TABLE` or schema evolution write. |
| `ConcurrentTransactionException` | Two Structured Streaming queries with the same checkpoint location wrote to the table at the same time. Deduplicate your streaming jobs or use distinct checkpoint paths. |
| `ProtocolChangedException` | The table protocol was upgraded (or downgraded) by a concurrent transaction while the current transaction was also attempting a protocol change, or a table feature was dropped concurrently. |

## Common strategies to avoid write conflicts

### Enable auto compaction
[Auto compaction](./table-compaction.md#auto-compaction) runs syncronously as part of write operations. This prevents separately scheduled compaction jobs from overlapping with DML operations and therefore causing concurrent writer exceptions.

### Schedule maintenance outside write windows

`OPTIMIZE` and `VACUUM` can conflict with concurrent DML. In Fabric, schedule notebook jobs or pipeline activities for [table compaction](table-compaction.md) and [VACUUM](delta-lake-vacuum.md) during low-activity windows — for example, after nightly ingestion completes rather than during it.

### Use append + merge patterns

For high-concurrency ingestion, land raw data with append-only writes into a staging table (no conflicts possible), then run a single `MERGE` job to reconcile into the target table. This serializes the conflict-prone operation while keeping ingestion fully parallel.

### Add retry logic for logical conflicts

The built-in commit retry handles transient version collisions automatically, but logical conflicts — where two operations genuinely overlap — raise an exception. Because Delta Lake never produces partial writes, a failed transaction is safe to retry at the application level. For pipelines where occasional logical conflicts are expected, wrap the write in retry logic:

```python
from delta.exceptions import ConcurrentAppendException
import time

# Retry with backoff on transient concurrent write conflicts
max_retries = 3
for attempt in range(max_retries):
    try:
        spark.sql("MERGE INTO target USING source ON ...")
        break
    except ConcurrentAppendException:
        if attempt < max_retries - 1:
            time.sleep(2 ** attempt)
        else:
            raise
```

### Choose the right layout strategy

[Liquid clustering](liquid-clustering.md) and [partitioning](delta-lake-partitioning.md) solve different problems. Liquid clustering optimizes file layout for read performance. Partitioning creates physical boundaries that prevent concurrent writer conflicts. If your workload needs both, partition by the writer-isolation column and use [Z-Order](delta-lake-zorder.md) within each partition for read performance.

## Related content

- [Partitioning](delta-lake-partitioning.md)
- [Liquid clustering](liquid-clustering.md)
- [Low-Shuffle Merge](low-shuffle-merge.md)
- [Table compaction](table-compaction.md)
- [Z-Order](delta-lake-zorder.md)
- [Delta table maintenance](delta-lake-table-maintenance.md)
- [Delta Lake interoperability](../fundamentals/delta-lake-interoperability.md)
- [Delta Lake concurrency control (OSS documentation)](https://docs.delta.io/concurrency-control/)
