---
title: VACUUM Delta tables
description: Learn what the VACUUM command does for Delta tables in Microsoft Fabric, how retention works, and where to run VACUUM safely.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# VACUUM Delta tables

Use the Delta Lake `VACUUM` command to permanently remove data files that are no longer referenced by a Delta table and that are older than your retention threshold.

In Microsoft Fabric, `VACUUM` helps you clean up stale files in Microsoft OneLake after updates, deletes, merges, and compaction operations. It reduces storage consumption, removes obsolete files that Fabric no longer needs for the active table state, and reclaims space after maintenance operations such as `OPTIMIZE`.

`VACUUM` follows the same core Delta Lake concepts that you might know from open-source Delta Lake, but you run it in Fabric Spark experiences such as notebooks, Spark job definitions, and the Lakehouse **Maintenance** UI.

## What VACUUM removes

A Delta table keeps track of the files that make up the current table state in the Delta log. When operations such as `UPDATE`, `DELETE`, `MERGE`, overwrite writes, or compaction replace older Parquet files with newer ones, the old files can become unreferenced.

`VACUUM` removes those unreferenced files only when both of these conditions are true:

- The files are no longer referenced by the Delta log.
- The files are older than the configured retention threshold.

Because `VACUUM` permanently deletes files from OneLake, use it carefully when you still need older table versions.

## Why VACUUM matters

Run `VACUUM` when you want to:

- Reduce storage cost by deleting obsolete files from OneLake
- Reclaim space after updates, deletes, and merge operations
- Clean up pre-compaction files after `OPTIMIZE` creates replacement files
- Keep long-running production tables from accumulating unnecessary stale data files

`VACUUM` doesn't improve query performance by itself in the same way that compaction or file layout optimizations do. Its main purpose is storage cleanup.

## Where to run VACUUM

`VACUUM` is a Spark command in Fabric. Run it in places that use the Spark engine, such as:

- Fabric notebooks
- Spark job definitions
- The Lakehouse **Maintenance** UI and pipeline-based maintenance workflows

Don't run `VACUUM` in the SQL analytics endpoint or the Warehouse SQL editor. Those experiences don't support Spark Delta maintenance commands.

If you want a portal-based workflow, see [Lakehouse table maintenance](lakehouse-table-maintenance.md).

> [!NOTE]
> In notebooks, run SQL examples in a Spark SQL cell, Python examples in a PySpark cell, and Scala examples in a Scala cell.

## Syntax examples

Use the following examples when you run `VACUUM` in Fabric.

### Vacuum a table with the default retention

# [Spark SQL](#tab/sparksql)

```sql
VACUUM schema_name.table_name
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.vacuum()
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.vacuum()
```

---

### Vacuum a table with a custom retention threshold

# [Spark SQL](#tab/sparksql)

```sql
VACUUM schema_name.table_name RETAIN 168 HOURS
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.vacuum(168)
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.vacuum(168)
```

---

### Preview files with DRY RUN

Use `DRY RUN` to list the files that would be deleted without actually deleting them.

```sql
VACUUM schema_name.table_name DRY RUN
```

You can also combine `RETAIN` and `DRY RUN`.

```sql
VACUUM schema_name.table_name RETAIN 168 HOURS DRY RUN
```

### Vacuum in LITE mode

`VACUUM LITE` is a faster alternative that uses only the Delta transaction log to identify unreferenced files, rather than listing every file in the table directory. This approach is significantly faster for large tables with many files.

# [Spark SQL](#tab/sparksql)

```sql
VACUUM schema_name.table_name LITE

VACUUM schema_name.table_name LITE RETAIN 168 HOURS
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.vacuum(mode="LITE")
```

# [Scala](#tab/scala)

```scala
spark.sql("VACUUM schema_name.table_name LITE")
```

---

`VACUUM LITE` identifies files to remove by reading the Delta log rather than performing a full directory listing. It's faster, but it requires enough log history to determine which files are unreferenced. If the Delta log has been pruned beyond what `LITE` mode needs, a `DELTA_CANNOT_VACUUM_LITE` exception is raised — in that case, fall back to the standard `VACUUM` (full mode).

> [!NOTE]
> `VACUUM LITE` is supported in Fabric Spark runtime 2.0 (Delta 4.1) or later. Verify your Fabric runtime version supports this feature.

### Vacuum with an inventory table

For very large tables where even the default `VACUUM` full directory listing is slow, you can provide a precomputed inventory of files. Instead of listing the table directory at runtime, `VACUUM` reads file paths from the inventory you supply.

# [Spark SQL](#tab/sparksql)

```sql
VACUUM schema_name.table_name USING INVENTORY inventory_table_name

VACUUM schema_name.table_name USING INVENTORY (SELECT * FROM inventory_table_name WHERE path LIKE 'abfss://%')
```

# [PySpark](#tab/pyspark)

```python
spark.sql("VACUUM schema_name.table_name USING INVENTORY inventory_table_name")
```

# [Scala](#tab/scala)

```scala
spark.sql("VACUUM schema_name.table_name USING INVENTORY inventory_table_name")
```

---

The inventory table (or query) must have the following schema:

| Column | Type | Description |
|--------|------|-------------|
| `path` | string | Fully qualified file URI. |
| `length` | integer | File size in bytes. |
| `isDir` | boolean | Whether the entry is a directory. |
| `modificationTime` | integer | File last-modified time in milliseconds since epoch. |

You can populate an inventory table from OneLake file metadata, storage account inventory reports, or a custom Spark job that lists the table directory on a schedule. This decouples the expensive file-listing step from the `VACUUM` operation itself.

## Default retention period

If you don't specify a retention interval, `VACUUM` uses the default retention period of seven days, which is `168` hours.

That default gives active readers, writers, and time-travel queries a safer window before older files are removed.

## Safety check for short retention periods

Delta Lake includes a retention safety check controlled by `spark.databricks.delta.retentionDurationCheck.enabled`.

If you try to use a retention period shorter than seven days, this safety check warns you unless you explicitly disable the check in your Spark configuration.

Use extra caution before you disable this safeguard. A short retention window can remove files that concurrent workloads or recovery scenarios still need.

For example, these commands request a one-day retention period:

# [Spark SQL](#tab/sparksql)

```sql
VACUUM schema_name.table_name RETAIN 24 HOURS
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import *

deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.vacuum(24)
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.vacuum(24)
```

---

If your environment keeps the safety check enabled, the runtime warns you about retention settings below seven days.

## Understand the impact on time travel

Delta Lake time travel lets you query older table versions as long as the required historical files still exist.

`VACUUM` removes files that are older than the retention window, so it also removes the data files needed for time travel beyond that window. After those files are vacuumed, you can't query those older versions anymore.

Before you reduce retention, decide how much historical access your workloads, audits, debugging steps, and recovery processes require. For more information, see [Time travel](delta-lake-time-travel.md).

## Understand the impact on deletion vectors

Deletion vectors can mark rows as deleted without immediately rewriting every affected data file. Because of that behavior, files that look old might still be part of the active table state.

`VACUUM` doesn't remove files that are still referenced, including files that remain valid because deletion vector metadata still points to them. If you use deletion vectors and later reorganize or optimize the table, more obsolete files might become eligible for `VACUUM` after those changes complete.

To physically rewrite data affected by deletion vectors, see [REORG Delta tables](delta-lake-reorg.md).


## Follow best practices

Use these practices when you run `VACUUM` in Fabric:

- Run `VACUUM` after `OPTIMIZE` to remove pre-compaction files that are no longer needed.
- Don't set retention below seven days unless you clearly understand the effect on time travel, readers, writers, and recovery.
- Schedule regular `VACUUM` operations in production pipelines so stale files don't accumulate in OneLake.
- Decide on your time-travel requirements before you shorten retention.
- Use `DRY RUN` first when you want to verify which files are about to be removed.

For Fabric-wide maintenance guidance, see [Table maintenance overview](delta-lake-table-maintenance.md) and [Lakehouse table maintenance](lakehouse-table-maintenance.md).

## Understand what VACUUM doesn't remove

`VACUUM` removes obsolete data files, but it doesn't delete Delta log files in the `_delta_log` folder.

Delta log cleanup follows checkpoint and log retention behavior, which is separate from `VACUUM`.

## Related content

- [Time travel](delta-lake-time-travel.md)
- [Table compaction](table-compaction.md)
- [Table maintenance overview](delta-lake-table-maintenance.md)
- [Lakehouse table maintenance](lakehouse-table-maintenance.md)
- [REORG Delta tables](delta-lake-reorg.md)
