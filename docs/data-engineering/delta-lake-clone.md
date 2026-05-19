---
title: Clone Delta tables
description: Learn how to clone Delta Lake tables in Microsoft Fabric by using shallow clone for testing, development, experimentation, and point-in-time copy scenarios.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# Clone Delta tables

You can use the Delta Lake `CLONE` command in Microsoft Fabric to create a copy of a Delta table at a specific point in time. A clone captures the source table as it exists when you run the command, or at an earlier version that you specify with time travel syntax.

Cloning is useful when you want a safe copy of a table for development, validation, or experimentation. The source table isn't modified, and changes that you make to the clone don't affect the source table.

## What clone does

A clone creates a target Delta table from a source Delta table snapshot. You can:

- Clone the latest version of the source table.
- Clone a specific table version by using `VERSION AS OF`.
- Clone a specific point in time by using `TIMESTAMP AS OF`.

Because the clone is based on a snapshot, it doesn't track later changes in the source table automatically.

## Shallow clone

A shallow clone creates a new Delta table that references the source table's existing data files. Delta Lake copies the table metadata at clone time, but it doesn't copy the underlying data files into new storage.

Use a shallow clone when you need a fast, storage-efficient copy for short-lived work:

- Create a sandbox for development.
- Test schema or transformation changes without risk.
- Run experiments against production-like data.
- Create temporary copies for troubleshooting.
- Create point-in-time snapshots for validation.

A shallow clone is storage-efficient because the source and clone share the same OneLake data files. After the clone exists, updates that you make to the clone create new files for the clone and don't change the source table.

> [!NOTE]
> Only `SHALLOW CLONE` is supported in open-source Delta Lake and Microsoft Fabric. `DEEP CLONE` is not available.

## Syntax

Use the following syntax patterns to create Delta table clones.

### Clone the current version

# [Spark SQL](#tab/sparksql)

```sql
CREATE TABLE target_table SHALLOW CLONE source_table;
```

# [PySpark](#tab/pyspark)

```python
spark.sql("CREATE TABLE target_table SHALLOW CLONE source_table")
```

# [Scala](#tab/scala)

```scala
spark.sql("CREATE TABLE target_table SHALLOW CLONE source_table")
```

---

### Clone a specific version

# [Spark SQL](#tab/sparksql)

```sql
CREATE TABLE target_table SHALLOW CLONE source_table VERSION AS OF 125;
```

# [PySpark](#tab/pyspark)

```python
spark.sql("CREATE TABLE target_table SHALLOW CLONE source_table VERSION AS OF 125")
```

# [Scala](#tab/scala)

```scala
spark.sql("CREATE TABLE target_table SHALLOW CLONE source_table VERSION AS OF 125")
```

---

### Clone from a point in time

# [Spark SQL](#tab/sparksql)

```sql
CREATE TABLE target_table SHALLOW CLONE source_table TIMESTAMP AS OF '2026-05-18T08:30:00Z';
```

# [PySpark](#tab/pyspark)

```python
spark.sql("CREATE TABLE target_table SHALLOW CLONE source_table TIMESTAMP AS OF '2026-05-18T08:30:00Z'")
```

# [Scala](#tab/scala)

```scala
spark.sql("CREATE TABLE target_table SHALLOW CLONE source_table TIMESTAMP AS OF '2026-05-18T08:30:00Z'")
```

---

### Replace an existing clone

Use `CREATE OR REPLACE TABLE` to refresh a clone target with a newer snapshot:

# [Spark SQL](#tab/sparksql)

```sql
CREATE OR REPLACE TABLE sandbox.sales_orders_test
SHALLOW CLONE operations.sales_orders;
```

# [PySpark](#tab/pyspark)

```python
spark.sql("""CREATE OR REPLACE TABLE sandbox.sales_orders_test
SHALLOW CLONE operations.sales_orders""")
```

# [Scala](#tab/scala)

```scala
spark.sql("""CREATE OR REPLACE TABLE sandbox.sales_orders_test
SHALLOW CLONE operations.sales_orders""")
```

---

## Understand what gets cloned

| Component | Behavior |
|---|---|
| Data files | Referenced from the source table's OneLake files (not copied). |
| Partition information | Copied. |
| Schema | Copied. |
| Table properties | Copied. |
| Dependency on source after clone | Yes — the clone depends on the source's data files remaining available. |
| Source Delta log history | Not copied to the target table history. The clone starts its own Delta log. |

## Use clone for common scenarios

Use Delta table clone when you need to:

- Create sandbox environments for development.
- Test schema changes without risk to the source table.
- Validate transformations against a production snapshot.
- Create a point-in-time copy for debugging or auditing.
- Provide a read-only snapshot for a downstream team.

## OneLake considerations

Shallow clones share underlying OneLake files with the source table. This design makes shallow clone fast and storage-efficient, but it also means the clone depends on source table files remaining available.

Be careful when you run `VACUUM` on the source table. If `VACUUM` removes source files that a shallow clone still references, the clone can break because those files are no longer available in OneLake.

To create a durable independent copy that survives `VACUUM` on the source, consider copying data with a full write (`CREATE TABLE ... AS SELECT`) instead of clone.

## Related content

- [Time travel](delta-lake-time-travel.md)
- [Inspect Delta table metadata](delta-lake-describe.md)
- [Lakehouse and Delta tables](lakehouse-and-delta-tables.md)
- [Table maintenance overview](delta-lake-table-maintenance.md)
