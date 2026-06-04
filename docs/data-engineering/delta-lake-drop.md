---
title: Drop Delta tables and schemas
description: Learn how to drop Delta tables and schemas in Microsoft Fabric. Understand managed vs. external behavior in OneLake and use CASCADE for schema drops.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/19/2026
ai-usage: ai-assisted
---

# Drop Delta tables and schemas

Use `DROP TABLE` to permanently remove a Delta table's metadata and schema definition from the metastore. In Microsoft Fabric, dropping a table also affects the underlying data files stored in OneLake, depending on whether the table is managed or external.

## Understanding types of tables

The behavior of `DROP TABLE` depends on how the table was created:

- **Managed tables** are created without specifying a `LOCATION`. Fabric controls both the metadata and the data files. When you drop a managed table, the lakehouse table entry and all underlying data files in storage are deleted.
- **External tables** are created with an explicit `LOCATION`. When you drop an external table, only the lakehouse table entry is removed. The data files remain in storage at the specified OneLake path.
- **Shortcut tables** are created as a virtual pointer to another lakehouse or storage location. When you drop a shortcut table, only the lakehouse table entry is removed. The underlying data files aren't affected. For more information, see [shortcuts in a lakehouse](./lakehouse-shortcuts.md).

## Drop a table

# [Spark SQL](#tab/sparksql)

```sql
DROP TABLE schema_name.table_name;
```

# [PySpark](#tab/pyspark)

```python
spark.sql("DROP TABLE schema_name.table_name")
```

# [Scala](#tab/scala)

```scala
spark.sql("DROP TABLE schema_name.table_name")
```

---

## Drop a table only if it exists

Use `IF EXISTS` to avoid errors when the table might not be present, for example in setup or teardown scripts that run across environments.

# [Spark SQL](#tab/sparksql)

```sql
DROP TABLE IF EXISTS schema_name.table_name;
```

# [PySpark](#tab/pyspark)

```python
spark.sql("DROP TABLE IF EXISTS schema_name.table_name")
```

# [Scala](#tab/scala)

```scala
spark.sql("DROP TABLE IF EXISTS schema_name.table_name")
```

---

## What happens in OneLake

When you drop a managed Delta table in Fabric:

1. The metastore removes the table entry, so the table no longer appears in the lakehouse explorer or SQL analytics endpoint.
1. The Delta log directory and all Parquet data files are deleted from OneLake.

For external tables, only step 1 occurs. The data files remain in OneLake and can be re-registered later with `CREATE TABLE ... USING DELTA LOCATION`.

## Recover from an accidental drop

If you accidentally drop a managed table, recovery options are limited because the data files are removed from OneLake. 

If the table was external, you can re-register it by pointing a new `CREATE TABLE` statement at the original `LOCATION` path.

## Drop a schema

You can also drop an entire schema (database) from the metastore. By default, `DROP SCHEMA` fails if the schema still contains tables.

# [Spark SQL](#tab/sparksql)

```sql
DROP SCHEMA IF EXISTS schema_name;
```

# [PySpark](#tab/pyspark)

```python
spark.sql("DROP SCHEMA IF EXISTS schema_name")
```

# [Scala](#tab/scala)

```scala
spark.sql("DROP SCHEMA IF EXISTS schema_name")
```

---

### Drop a schema with CASCADE

Use `CASCADE` to drop a schema and all of its tables in a single operation. For managed tables, this operation deletes both the metastore entries and the underlying data files in OneLake. For external tables, only the metastore entries are removed.

# [Spark SQL](#tab/sparksql)

```sql
-- Drop the schema and all tables it contains
DROP SCHEMA IF EXISTS schema_name CASCADE;
```

# [PySpark](#tab/pyspark)

```python
# Drop the schema and all tables it contains
spark.sql("DROP SCHEMA IF EXISTS schema_name CASCADE")
```

# [Scala](#tab/scala)

```scala
// Drop the schema and all tables it contains
spark.sql("DROP SCHEMA IF EXISTS schema_name CASCADE")
```

---

> [!CAUTION]
> `CASCADE` is irreversible for managed tables. All managed table data in the schema are permanently deleted from OneLake. Verify that you no longer need any of the tables before you run this command.

## Drop tables in automation

When you use `DROP TABLE` in pipelines or scheduled notebooks, follow these practices:

- Always use `IF EXISTS` so the job doesn't fail if the table was already removed.
- Log which tables you drop, especially when looping over dynamic table lists.
- Separate destructive operations from data-producing steps so you can rerun the pipeline safely.
- Verify downstream dependencies before you drop a table that other notebooks, reports, or semantic models reference.

## Related content

- [DESCRIBE DETAIL and HISTORY](delta-lake-describe.md)
- [RESTORE](delta-lake-restore.md)
- [Delta Lake interoperability](../fundamentals/delta-lake-interoperability.md)
