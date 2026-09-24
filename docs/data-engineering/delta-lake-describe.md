---
title: Inspect Delta table metadata
description: Learn how to inspect Delta table metadata and history in Microsoft Fabric by using DESCRIBE DETAIL and DESCRIBE HISTORY.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# Inspect Delta table metadata

Use `DESCRIBE DETAIL` and `DESCRIBE HISTORY` when you need to inspect a Delta table without changing it. These commands help you understand how a table is stored, what changed over time, and which table version you might want to investigate or restore.

Both commands are read-only inspection commands. They don't modify table data, metadata, or transaction history.

## Use DESCRIBE DETAIL

`DESCRIBE DETAIL` returns table-level metadata for a Delta table. Use it when you want a quick snapshot of the table definition and storage details.

Typical metadata includes:

- Table format
- Table identifier and name
- OneLake location
- Creation time and last modified time
- Partition columns
- File count and total size in bytes
- Table properties
- Minimum reader and writer protocol versions

### Run DESCRIBE DETAIL

Run `DESCRIBE DETAIL` against a Delta table by using Spark SQL or the Delta Lake API in PySpark or Scala.

# [Spark SQL](#tab/sparksql)

```sql
DESCRIBE DETAIL schema_name.table_name
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import *

deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
display(deltaTable.detail())
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
display(deltaTable.detail())
```

---

### Understand DESCRIBE DETAIL output

The exact schema can vary by runtime and table features, but you commonly see the following columns.

| Column | What it means |
|---|---|
| `format` | The table format. For Delta tables in Fabric, this value is `delta`. |
| `id` | The unique identifier for the Delta table. |
| `name` | The registered table name. |
| `location` | The storage path for the table in OneLake. |
| `createdAt` | The timestamp when the table was created. |
| `lastModified` | The timestamp when the table metadata or files were last updated. |
| `partitionColumns` | The list of partition columns defined for the table. |
| `numFiles` | The current number of data files tracked by the table. |
| `sizeInBytes` | The total size of the tracked table data in bytes. |
| `properties` | The table properties stored with the Delta table definition. |
| `minReaderVersion` | The minimum Delta protocol reader version required to read the table. |
| `minWriterVersion` | The minimum Delta protocol writer version required to write to the table. |

Use these values to confirm where a table lives, estimate storage footprint, verify partitioning, and check whether table properties or protocol versions changed.

## Use DESCRIBE HISTORY

`DESCRIBE HISTORY` returns the operation-level history for a Delta table. Use it when you need an audit trail of writes and maintenance activity such as `WRITE`, `MERGE`, `OPTIMIZE`, `VACUUM`, `DELETE`, or `UPDATE`.

This history helps you answer questions such as:

- Who changed the table?
- What operation ran?
- When did the change happen?
- Which version should you inspect with time travel or restore?

### Run DESCRIBE HISTORY

Run `DESCRIBE HISTORY` to return the full available history.

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

Limit the output when you only need the most recent entries.

# [Spark SQL](#tab/sparksql)

```sql
DESCRIBE HISTORY schema_name.table_name LIMIT n
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import *

deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
display(deltaTable.history(n))
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "schema_name.table_name")
display(deltaTable.history(10))
```

---

### Understand DESCRIBE HISTORY output

The history output is an audit log of Delta transactions. The following columns are especially useful.

| Column | What it means |
|---|---|
| `version` | The Delta table version created by the operation. |
| `timestamp` | The time when the operation committed. |
| `operation` | The operation type, such as `WRITE`, `MERGE`, `OPTIMIZE`, or `VACUUM`. |
| `operationParameters` | Parameters that were supplied for the operation. |
| `operationMetrics` | Metrics captured for the operation, such as files added, files removed, rows written, or data volume processed. |
| `userName` | The user or principal associated with the operation, when available. |
| notebook info | Notebook-related context, such as notebook path or notebook ID, when the operation came from a notebook run. |

Use `operationParameters` and `operationMetrics` together when you need more than the operation name. For example, `OPTIMIZE` and `VACUUM` entries often include metrics that help you understand how much data Fabric rewrote or cleaned up.

## When to use DESCRIBE HISTORY

`DESCRIBE HISTORY` is especially useful in these scenarios:

- **Audit trail**: Review who changed a table and what operation they ran.
- **Debugging**: Identify the write, merge, optimize, or delete operation that introduced a problem.
- **Version discovery**: Find the table version to use with time travel or `RESTORE`.
- **Maintenance monitoring**: Inspect `OPTIMIZE` and `VACUUM` metrics to confirm that maintenance ran and to see what it changed.

## Where to run these commands

Run these commands in Fabric notebooks and Spark job definitions when you work with Delta tables through Apache Spark.

`DESCRIBE DETAIL` also works in the SQL analytics endpoint for basic table metadata scenarios. Use Spark when you need full Delta Lake APIs such as `DeltaTable.forName(...).detail()` or `DeltaTable.forName(...).history()` in PySpark or Scala.

## History retention

Delta history retention is governed by the `delta.logRetentionDuration` table property. The default retention period is 30 days.

If you need to inspect older history, confirm that your table retention settings preserve the transaction log long enough for your operational and audit requirements.

## Related content

- [Time travel](delta-lake-time-travel.md)
- [RESTORE Delta tables](delta-lake-restore.md)
- [VACUUM Delta tables](delta-lake-vacuum.md)
- [Table compaction](table-compaction.md)
