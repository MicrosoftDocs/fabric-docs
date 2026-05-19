---
title: Reorganize Delta tables with REORG
description: Learn how to use the REORG command in Microsoft Fabric to physically remove soft-deleted Delta Lake rows or add UniForm compatibility for Iceberg readers.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# Reorganize Delta tables with REORG

Use the `REORG` command when you need to rewrite part of a Delta table for a specific maintenance goal. In Fabric, `REORG` reorganizes the physical layout of a table by rewriting data files or updating table metadata, depending on the option you choose.

`REORG` is different from routine file compaction. It targets scenarios such as physically removing rows that deletion vectors marked as deleted.

## What REORG does

`REORG TABLE` rewrites table state for a defined maintenance operation.

- `APPLY (PURGE)` rewrites affected data files so rows that were soft-deleted through deletion vectors are physically removed from the underlying Parquet files.

Use `REORG` when you need a specific rewrite outcome, not just smaller or fewer files.

## Use PURGE to physically remove soft-deleted rows

Deletion vectors let Delta Lake mark rows as deleted without rewriting the original Parquet files right away. That behavior keeps delete operations efficient, but the deleted row data still exists in the physical files until you rewrite them.

When you run `REORG TABLE ... APPLY (PURGE)`, Fabric rewrites the affected files and removes the soft-deleted rows from the active Parquet files. After `PURGE` finishes, those deleted rows are actually gone from the rewritten files.

> [!NOTE]
> `PURGE` is not typically required as a separate maintenance step. `OPTIMIZE` automatically purges files where greater than 5% of records are referenced by deletion vectors during compaction. Reserve `PURGE` for scenarios where you need explicit control over when soft-deleted rows are physically removed.

This option is useful when:

- You have compliance or GDPR requirements and need deleted data to be physically removed on a specific schedule.
- You want to force-purge files that fall below the 5% threshold that `OPTIMIZE` uses.

## Review the syntax

Use the following examples in a Fabric notebook.

### Purge soft-deleted rows from a table

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

### Purge soft-deleted rows for matching data only

# [Spark SQL](#tab/sparksql)

```sql
REORG TABLE table_name WHERE predicate APPLY (PURGE)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("REORG TABLE table_name WHERE predicate APPLY (PURGE)")
```

# [Scala](#tab/scala)

```scala
spark.sql("REORG TABLE table_name WHERE date = '2024-01-01' APPLY (PURGE)")
```

---

Use a `WHERE` clause when you want to target specific partitions or a smaller slice of data.

# [Spark SQL](#tab/sparksql)

```sql
REORG TABLE sales.orders
WHERE order_date = DATE '2026-05-01'
APPLY (PURGE)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("""
REORG TABLE sales.orders
WHERE order_date = DATE '2026-05-01'
APPLY (PURGE)
""")
```

# [Scala](#tab/scala)

```scala
spark.sql("""
REORG TABLE sales.orders
WHERE order_date = DATE '2026-05-01'
APPLY (PURGE)
""")
```

---

## Choose REORG or OPTIMIZE

`REORG` and `OPTIMIZE` solve different problems.

- `OPTIMIZE` performs bin compaction. It consolidates small files into larger files to improve scan efficiency.
- `REORG ... APPLY (PURGE)` physically removes rows that deletion vectors marked as deleted.

You can use both commands together. For example, you might run `REORG ... APPLY (PURGE)` to physically remove deleted data, then run `OPTIMIZE` to improve file layout.

## Understand deletion vectors

Deletion vectors are metadata structures that mark rows as deleted without immediately rewriting the Parquet files that contain those rows. Readers honor the deletion vectors, so the deleted rows don't appear in query results, but the bytes still remain in storage until a rewrite happens.

`REORG ... APPLY (PURGE)` is the step that physically removes those rows from the rewritten Parquet files.

## Run REORG in Fabric

Run `REORG` from Spark-based experiences in Fabric, such as:

- Fabric notebooks.
- Spark job definitions.

Don't run `REORG` from the SQL analytics endpoint. `REORG` is a Spark SQL maintenance command for Delta tables.

## Follow best practices

- Run `PURGE` only when you have a specific need, such as compliance requirements. `OPTIMIZE` automatically purges files where greater than 5% of records are referenced by deletion vectors, so routine maintenance usually doesn't require a separate `PURGE` step.
- Run `PURGE` before `VACUUM` when you need deleted data to be physically removed for compliance or GDPR requirements.
- Use `WHERE` predicates to target specific partitions when you don't need to rewrite the full table.
- Use `UPGRADE UNIFORM` when you need Iceberg readers, but plan for the extra metadata that UniForm maintains.
- Treat `REORG` and `OPTIMIZE` as complementary maintenance operations, not interchangeable ones.

## Related content

- [Deletion vectors](delta-lake-deletion-vectors.md)
- [Table compaction](table-compaction.md)
- [VACUUM Delta tables](delta-lake-vacuum.md)
- [Table maintenance overview](delta-lake-table-maintenance.md)
