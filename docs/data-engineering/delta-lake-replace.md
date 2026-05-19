---
title: Replace Delta tables
description: Learn how to use CREATE OR REPLACE TABLE and INSERT OVERWRITE to replace Delta table content in Microsoft Fabric while preserving table identity and downstream references.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/19/2026
ai-usage: ai-assisted
---

# Replace Delta tables

Use `CREATE OR REPLACE TABLE` (CORT) or `INSERT OVERWRITE` to replace the contents of a Delta table in Microsoft Fabric without dropping and recreating it. Both approaches preserve the table's metastore identity, which means downstream notebooks, pipelines, and semantic models that reference the table continue to be able to access the same table object without changes.

## Choose the right approach

| Approach | What it replaces | Schema change | Table identity |
|---|---|---|---|
| `CREATE OR REPLACE TABLE ... AS SELECT` | Data and schema | Yes—new schema from the query | Preserved |
| `INSERT OVERWRITE` | Data only | No—must match existing schema | Preserved |

Use `CREATE OR REPLACE TABLE` when you need to redefine the schema along with the data. Use `INSERT OVERWRITE` when the schema stays the same and you only need to refresh the data.

## Replace a table with CREATE OR REPLACE

`CREATE OR REPLACE TABLE ... AS SELECT` (CRAS) atomically replaces both the schema and data. The previous version becomes part of the Delta history, so you can still time travel to it or restore it if needed.

# [Spark SQL](#tab/sparksql)

```sql
CREATE OR REPLACE TABLE schema_name.target_table
AS SELECT * FROM schema_name.source_table
WHERE region = 'US';
```

# [PySpark](#tab/pyspark)

```python
df = spark.table("schema_name.source_table").filter("region = 'US'")
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").saveAsTable("schema_name.target_table")
```

# [Scala](#tab/scala)

```scala
val df = spark.table("schema_name.source_table").filter("region = 'US'")
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").saveAsTable("schema_name.target_table")
```

---

## Replace data with INSERT OVERWRITE

`INSERT OVERWRITE` replaces the data in a table while keeping the existing schema. The write fails if the incoming data doesn't match the table's current schema, unless you enable schema evolution.

### Overwrite the entire table

# [Spark SQL](#tab/sparksql)

```sql
INSERT OVERWRITE schema_name.target_table
SELECT * FROM schema_name.source_table;
```

# [PySpark](#tab/pyspark)

```python
df = spark.table("schema_name.source_table")
df.write.format("delta").mode("overwrite").insertInto("schema_name.target_table")
```

# [Scala](#tab/scala)

```scala
val df = spark.table("schema_name.source_table")
df.write.format("delta").mode("overwrite").insertInto("schema_name.target_table")
```

---

### Overwrite specific partitions

If the table is partitioned, you can overwrite individual partitions while leaving the rest of the table intact. This approach is useful for daily refresh patterns where you replace a single day's data.

# [Spark SQL](#tab/sparksql)

```sql
INSERT OVERWRITE schema_name.target_table
PARTITION (date = '2026-05-19')
SELECT col1, col2 FROM schema_name.source_table
WHERE date = '2026-05-19';
```

# [PySpark](#tab/pyspark)

```python
# Enable dynamic partition overwrite so only matching partitions are replaced
spark.conf.set("spark.sql.sources.partitionOverwriteMode", "dynamic")

df = spark.table("schema_name.source_table").filter("date = '2026-05-19'")
df.write.format("delta").mode("overwrite").insertInto("schema_name.target_table")
```

# [Scala](#tab/scala)

```scala
// Enable dynamic partition overwrite so only matching partitions are replaced
spark.conf.set("spark.sql.sources.partitionOverwriteMode", "dynamic")

val df = spark.table("schema_name.source_table").filter("date = '2026-05-19'")
df.write.format("delta").mode("overwrite").insertInto("schema_name.target_table")
```

---

### Overwrite with a new schema

By default, `INSERT OVERWRITE` fails if the incoming DataFrame has a different schema than the target table. When you use the DataFrame API, you can set the `overwriteSchema` option to `true` to replace both the data and the schema in one operation.

# [PySpark](#tab/pyspark)

```python
df = spark.table("schema_name.source_table")
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").insertInto("schema_name.target_table")
```

# [Scala](#tab/scala)

```scala
val df = spark.table("schema_name.source_table")
df.write.format("delta").mode("overwrite").option("overwriteSchema", "true").insertInto("schema_name.target_table")
```

---

> [!NOTE]
> The `overwriteSchema` option is available only through the DataFrame API. Spark SQL `INSERT OVERWRITE` doesn't support schema replacement—use `CREATE OR REPLACE TABLE` instead when you need to change the schema with SQL.

## Compare REPLACE with DROP and recreate

Dropping a table and creating a new one with the same name achieves a similar data result, but it breaks the table's identity:

- **DROP + CREATE** removes the metastore entry and creates a fresh one. Downstream references that cache the table identifier can break. Delta history from the previous table is lost.
- **REPLACE** keeps the same metastore entry, preserves Delta history, and supports time travel to previous versions. Downstream references remain valid.

Prefer `CREATE OR REPLACE` or `INSERT OVERWRITE` in production pipelines. Reserve `DROP` + `CREATE` for cases where you intentionally need a clean table identity, such as major schema redesigns.

## Understand versioning behavior

Both `CREATE OR REPLACE` and `INSERT OVERWRITE` create a new version in the Delta log. The replaced data isn't deleted immediately—it remains as unreferenced files until `VACUUM` removes them after the retention threshold.

This behavior means you can:

- Use time travel to query the pre-replacement data
- Use `RESTORE` to roll back to the version before the replacement
- Run `VACUUM` later to reclaim storage from the old files

For more information, see [Time travel](delta-lake-time-travel.md) and [VACUUM](delta-lake-vacuum.md).

## Follow best practices

- Use `CREATE OR REPLACE TABLE` when you need to change the schema and data together in one atomic operation.
- Use `INSERT OVERWRITE` for regular data refreshes where the schema is stable.
- Set `spark.sql.sources.partitionOverwriteMode` to `dynamic` when you want to overwrite only the partitions present in the incoming data.
- Don't use `INSERT OVERWRITE` as a substitute for `MERGE` when you need row-level upserts. `INSERT OVERWRITE` replaces entire tables or partitions.
- Run `VACUUM` on a schedule after repeated overwrites to reclaim storage from replaced files.

## Related content

- [Drop Delta tables](delta-lake-drop.md)
- [RESTORE](delta-lake-restore.md)
- [Time travel](delta-lake-time-travel.md)
- [VACUUM Delta tables](delta-lake-vacuum.md)
- [Schema evolution](delta-lake-schema-evolution.md)
- [Delta Lake interoperability](../fundamentals/delta-lake-interoperability.md)
