---
title: Column mapping for Delta tables
description: Learn how column mapping decouples logical column names from physical storage in Delta tables, how to enable it, and the downstream considerations in Microsoft Fabric.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 07/16/2026
ms.search.form: delta lake column mapping rename drop
ai-usage: ai-assisted
---

# Column mapping for Delta tables

Column mapping decouples the logical column names you use in queries from the physical column identifiers stored in the underlying Parquet files. Without column mapping, a column's identity is tied to its ordinal position and physical name, so renaming or dropping a column requires rewriting all data files.

When you enable column mapping, Delta tracks each column by a stable identifier in table metadata. This feature lets you rename and drop columns as metadata-only operations, without rewriting existing data.

By default, Delta stores column values in Parquet by physical name and position. This tight coupling creates several problems:

- Renaming a column requires rewriting every data file so the physical names match the new logical name.
- Dropping a column becomes difficult or impossible without a rewrite.
- Column names are limited to characters that Parquet allows in physical column names, so characters such as spaces, commas, semicolons, curly braces, parentheses, newlines, tabs, and equals signs aren't permitted.

Column mapping solves these problems by inserting a stable mapping between logical names and physical storage. After you enable it, `RENAME COLUMN` and `DROP COLUMN` become fast metadata operations.

## Column mapping modes

Delta supports three column mapping modes, set through the `delta.columnMapping.mode` table property.

| Mode | Description | When to set |
|------|-------------|-------------|
| `none` | No column mapping. Columns are tracked by physical name and position. This mode is the default. | Default behavior. |
| `id` | Columns are tracked by a numeric field ID stored in the Parquet metadata. | Must be set at table creation. |
| `name` | Columns are tracked by a stable physical name that's independent of the logical name. | Can be enabled after table creation. |

Use either `id` or `name` mode to enable `RENAME COLUMN` and `DROP COLUMN` without rewriting data. Because you can enable `name` mode on an existing table, it's the typical choice when you retrofit column mapping onto tables that already hold data.

## Enable column mapping

Enable `name` mode on an existing table with a metadata-only `ALTER TABLE` operation. Delta doesn't rewrite any data files.

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales.orders
SET TBLPROPERTIES ('delta.columnMapping.mode' = 'name')
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales.orders SET TBLPROPERTIES ('delta.columnMapping.mode' = 'name')")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales.orders SET TBLPROPERTIES ('delta.columnMapping.mode' = 'name')")
```

---

To use `id` mode, set the property when you create the table, because you can't enable `id` mode on an existing table.

## Rename and drop columns

After you enable column mapping, use standard `ALTER TABLE` commands to rename and drop columns. Both operations update only the table metadata.

```sql
ALTER TABLE sales.orders
RENAME COLUMN order_ts TO order_timestamp
```

```sql
ALTER TABLE sales.orders
DROP COLUMN obsolete_flag
```

## Understand the protocol impact

When you enable column mapping, you upgrade the table's writer protocol to version 5 and the reader protocol to version 2. You can't downgrade this upgrade.

> [!IMPORTANT]
> After you enable column mapping, older readers that don't support the required Delta protocol version can't read the table. Verify that every engine and runtime that reads the table supports column mapping before you enable it on shared tables.

You can inspect protocol-related metadata by using `DESCRIBE DETAIL` and by reviewing the table properties in the Delta log.

## Downstream considerations

Not all Delta readers and writers support column mapping, and support varies by mode. Keep these points in mind:

- `name` mode generally has broader support across Fabric engines than `id` mode.
- Renaming a column can break queries, notebooks, semantic models, and reports that still reference the old name.
- Dropping a column can break any consumer that still expects the column to exist.
- Before you change production schemas, review downstream dependencies, especially the SQL analytics endpoint, Power BI Direct Lake models, and shared notebook workloads.

## Best practices

- Enable column mapping early if you expect future column renames or drops, so you avoid costly data rewrites later.
- Prefer `name` mode when you retrofit column mapping onto existing tables, because it can be enabled without recreating the table.
- Confirm that all readers support the required Delta protocol version before you enable column mapping on shared tables.
- Communicate rename and drop operations to downstream consumers before you apply them.

## Related content

- [Schema evolution for Delta tables](delta-lake-schema-evolution.md)
- [Generated columns for Delta tables](delta-lake-generated-columns.md)
- [Delta Lake interoperability](../fundamentals/delta-lake-interoperability.md)
- [Delta Lake in Microsoft Fabric overview](../fundamentals/delta-lake-overview.md)
