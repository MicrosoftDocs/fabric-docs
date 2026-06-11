---
title: Restore Delta tables
description: Learn how to use the RESTORE command to roll back a Delta table to an earlier version or timestamp in Microsoft Fabric.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# Restore Delta tables

With Delta Lake, you can use the `RESTORE` command to make an older table state current again. `RESTORE` reverts a Delta table to a previous table version or to the table state at a specific timestamp.

Use `RESTORE` when you need to recover quickly from a bad change without manually rebuilding the table. Because Delta tables keep transaction history, you can often roll back to a known-good state in a single command.

## What RESTORE does

`RESTORE` changes the current state of a Delta table so it matches an earlier committed version.

You can restore a table when you need to:

- Recover from accidental deletes or updates
- Undo a bad `MERGE`, overwrite, or append operation
- Roll back a schema change that breaks downstream workloads
- Recover from corruption introduced by a faulty write or pipeline step

Unlike a read-only historical query, `RESTORE` changes the live table state that new readers see.

## Syntax

Use either of these forms to restore a Delta table.

Restore to a specific Delta table version:

# [Spark SQL](#tab/sparksql)

```sql
RESTORE TABLE schema_name.table_name TO VERSION AS OF 5
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import *
deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.restoreToVersion(5)
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.restoreToVersion(5)
```

---

Restore to the table state at a specific timestamp:

# [Spark SQL](#tab/sparksql)

```sql
RESTORE TABLE schema_name.table_name TO TIMESTAMP AS OF '2026-05-01 12:00:00'
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import *
deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.restoreToTimestamp("2026-05-01 12:00:00")
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
deltaTable.restoreToTimestamp("2026-05-01 12:00:00")
```

---

Before you restore, inspect table history so you can choose the correct version:

# [Spark SQL](#tab/sparksql)

```sql
DESCRIBE HISTORY schema_name.table_name
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable
deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
display(deltaTable.history())
```

# [Scala](#tab/scala)

```scala
import io.delta.tables.DeltaTable
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
display(deltaTable.history())
```

---

A common restore workflow looks like this:

# [Spark SQL](#tab/sparksql)

```sql
DESCRIBE HISTORY dbo.orders;
RESTORE TABLE dbo.orders TO VERSION AS OF 42
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import *
deltaTable = DeltaTable.forName(spark, "dbo.orders")

# Review history to find target version
display(deltaTable.history())

# Restore to the target version
deltaTable.restoreToVersion(42)
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "dbo.orders")

// Review history to find target version
display(deltaTable.history())

// Restore to the target version
deltaTable.restoreToVersion(42)
```

---

The PySpark `DeltaTable` methods perform the same logical operation as the SQL `RESTORE TABLE` command.

## What happens during restore

When you run `RESTORE`, Delta Lake doesn't rewrite the target version in place. Instead, it creates a new version in the Delta log that points back to the data files associated with the version or timestamp you selected.

That behavior has a few important consequences:

- `RESTORE` creates a new current version of the table.
- The files from the restored point become active again.
- The files from the pre-restore current state aren't deleted immediately.
- Those now-unreferenced files can be cleaned up later with `VACUUM`.
- The restore itself is recorded as a versioned table change.

Because `RESTORE` is versioned, you can inspect it in table history:

# [Spark SQL](#tab/sparksql)

```sql
DESCRIBE HISTORY schema_name.table_name
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import *
deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
display(deltaTable.history())
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
display(deltaTable.history())
```

---

## RESTORE, time travel, and VACUUM

`RESTORE` and time travel use the same Delta history, but they solve different problems.

- Use [time travel](delta-lake-time-travel.md) when you only need to read older data without changing the current table state.
- Use `RESTORE` when you want the older state to become the current state for all new reads and writes.

`VACUUM` affects recovery because it removes unreferenced files from storage. After a restore, the files from the previously current state usually become unreferenced. If you no longer need them, you can clean them up with `VACUUM`.

The reverse is also important: `VACUUM` can prevent a future restore. If `VACUUM` already removed the files required for the version you want to recover, `RESTORE` fails because the table history no longer has access to those physical files.

## Limitations

`RESTORE` only works when the target version still has all required data files available.

Keep these limits in mind:

- You can restore only to versions whose data files still exist.
- If `VACUUM` removed those files, the restore operation fails.
- Restore history is governed by Delta retention settings, including `delta.logRetentionDuration`, and by the actual retention of data files in storage.
- In practice, both transaction log retention and file retention affect how far back you can restore.

## Best practices

Use these practices to reduce risk:

- Run `DESCRIBE HISTORY` before you restore so you can confirm the right version or timestamp.
- Use time-travel queries first if you only need to inspect older data and don't want to change the current table state.
- Run `VACUUM` after a restore when you want to clean up unreferenced files from the pre-restore state.
- Test the restore path on a cloned table first when you're working with critical production data.

## Related content

- [Time travel](delta-lake-time-travel.md)
- [Inspect Delta table metadata](delta-lake-describe.md)
- [VACUUM Delta tables](delta-lake-vacuum.md)
- [Clone Delta tables](delta-lake-clone.md)
