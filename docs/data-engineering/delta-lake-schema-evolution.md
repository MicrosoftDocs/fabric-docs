---
title: Schema evolution for Delta tables
description: Learn how schema evolution works for Delta tables in Microsoft Fabric, including merge schema, overwrite schema, column mapping, type widening, and MERGE INTO behavior.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# Schema evolution for Delta tables

Schema evolution lets you change a Delta table's schema over time without rewriting all existing data. Schema evolution is leveraged when your source data adds columns, when you need to rename or drop columns, or when you need to widen a data type as your data model matures.

Schema evolution helps you keep pipelines running as data changes. At the same time, you still need to manage those changes carefully because downstream readers depend on the table schema.

## What schema enforcement means

By default, Delta Lake enforces schema on write. If the data that you write doesn't match the target table schema, Delta rejects the write instead of silently changing the table.

This behavior protects your table from accidental schema drift. For example, if your target table expects `customer_id`, `order_date`, and `amount`, and your incoming data includes unexpected columns or incompatible data types, the write fails until you explicitly allow the change.

Schema evolution is the opt-in behavior that lets the schema grow or change in controlled ways.

## Use merge schema for additive changes

Use merge schema when you want to add new columns from the source to an existing Delta table. This is the most common option for ETL pipelines that ingest evolving source data.

Merge schema supports additive changes. It adds columns that exist in the source but not in the target table. It doesn't remove existing columns, and it doesn't change existing column types.

### Use merge schema in a DataFrame write

```python
df.write \
  .format("delta") \
  .option("mergeSchema", "true") \
  .mode("append") \
  .saveAsTable("sales")
```

### Enable automatic schema merge in Spark SQL

# [Spark SQL](#tab/sparksql)

```sql
SET spark.databricks.delta.schema.autoMerge.enabled = TRUE
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set("spark.databricks.delta.schema.autoMerge.enabled", True)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.databricks.delta.schema.autoMerge.enabled", "true")
```

---

After you enable automatic schema merge for the session, writes and merge operations can add new columns from the source when Delta supports the change.

## Use overwrite schema to replace the table schema

Use overwrite schema when you want to replace the table schema with the schema of a new DataFrame.

This option rewrites the table definition to match the incoming DataFrame schema. It is more disruptive than merge schema because downstream consumers that expect the old schema can break.

```python
new_df.write \
  .format("delta") \
  .option("overwriteSchema", "true") \
  .mode("overwrite") \
  .saveAsTable("sales")
```

Use this option carefully. `overwriteSchema` is destructive to the schema contract even when it is the fastest way to realign a table definition.

## Use column mapping for rename and drop operations

Column mapping lets Delta track columns by name in table metadata instead of relying only on physical column order. In practice, this capability enables column rename and drop operations without rewriting all existing data files. For a deeper look at column mapping modes, migration, and protocol impact, see [Column mapping for Delta tables](delta-lake-column-mapping.md).

Enable column mapping on the table before you need rename or drop operations.

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales
SET TBLPROPERTIES ('delta.columnMapping.mode' = 'name')
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales SET TBLPROPERTIES ('delta.columnMapping.mode' = 'name')")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales SET TBLPROPERTIES ('delta.columnMapping.mode' = 'name')")
```

---

After column mapping is enabled, you can rename and drop columns with standard `ALTER TABLE` commands.

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales
RENAME COLUMN old_name TO new_name
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales RENAME COLUMN old_name TO new_name")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales RENAME COLUMN old_name TO new_name")
```

---

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales
DROP COLUMN obsolete_column
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales DROP COLUMN obsolete_column")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales DROP COLUMN obsolete_column")
```

---

## Use type widening for compatible type changes

Type widening, introduced in Fabric Spark Runtime 1.3 (Delta Lake 3.2) and expanded in Runtime 2.0+ (Delta Lake 4.1), lets you change a column to a wider compatible type, such as `int` to `bigint` or `float` to `double`, without redesigning the table.

Start by enabling type widening on the table.

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales
SET TBLPROPERTIES ('delta.enableTypeWidening' = 'true')
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales SET TBLPROPERTIES ('delta.enableTypeWidening' = 'true')")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales SET TBLPROPERTIES ('delta.enableTypeWidening' = 'true')")
```

---

> [!IMPORTANT]
> Enabling type widening sets a reader/writer protocol table feature that restricts which clients can access the table. On Runtime 2.0+ (Delta Lake 4.1), the `typeWidening` table feature is set — only clients that support this feature can read and write to the table. On Runtime 1.3 (Delta Lake 3.2), the `typeWidening-preview` feature is set instead. In both cases, clients on older Delta versions that don't support the feature can't read or write the table after type widening is enabled.

Then alter the column type or simply insert into the table with a larger than allowed value when `spark.databricks.delta.schema.autoMerge.enabled` is enabled.

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales
ALTER COLUMN order_id TYPE BIGINT
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales ALTER COLUMN order_id TYPE BIGINT")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales ALTER COLUMN order_id TYPE BIGINT")
```

---

### Supported type changes

Type widening was introduced in Fabric Spark Runtime 1.3 (Delta Lake 3.2) with a limited set of changes and expanded in Runtime 2.0+ (Delta Lake 4.1).

| Source type | Runtime 1.3 (Delta 3.2) | Runtime 2.0+ (Delta 4.1) |
|---|---|---|
| `byte` | `short`, `int` | `short`, `int`, `long`, `decimal`, `double` |
| `short` | `int` | `int`, `long`, `decimal`, `double` |
| `int` | — | `long`, `decimal`, `double` |
| `long` | — | `decimal` |
| `float` | `double` | `double` |
| `decimal` | `decimal` with greater precision and scale | `decimal` with greater precision and scale |
| `date` | — | `timestampNTZ` |

> [!NOTE]
> To avoid accidentally promoting integer values to decimals, type changes from `byte`, `short`, `int`, or `long` to `decimal` or `double` must be applied manually with `ALTER TABLE ALTER COLUMN`. These changes aren't applied automatically through schema evolution.

Type changes are supported for top-level columns as well as fields nested inside structs, maps, and arrays.

Use widening only for compatible changes. A wider type preserves the intent of existing data, while an incompatible type change can still require a table rewrite or a new target table.

## Add and modify columns with ALTER TABLE

Use `ALTER TABLE` when you want to make explicit schema changes instead of relying on write-time evolution.

Add a new column:

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales
ADD COLUMNS (channel STRING)
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales ADD COLUMNS (channel STRING)")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales ADD COLUMNS (channel STRING)")
```

---

Change a column type:

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales
ALTER COLUMN amount TYPE DOUBLE
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales ALTER COLUMN amount TYPE DOUBLE")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales ALTER COLUMN amount TYPE DOUBLE")
```

---

Add or update a column comment:

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE sales
ALTER COLUMN amount COMMENT 'Total order amount in local currency'
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE sales ALTER COLUMN amount COMMENT 'Total order amount in local currency'")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE sales ALTER COLUMN amount COMMENT 'Total order amount in local currency'")
```

---

These commands make schema changes visible and intentional, which is often useful in controlled production workflows.

## Use schema evolution with MERGE INTO

`MERGE INTO` can also evolve the target schema when the source includes new columns. Use the `WITH SCHEMA EVOLUTION` clause when you want the merge operation to add those columns as part of the upsert.

# [Spark SQL](#tab/sparksql)

```sql
MERGE WITH SCHEMA EVOLUTION INTO sales AS target
USING staged_sales AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN
  UPDATE SET *
WHEN NOT MATCHED THEN
  INSERT *
```

# [PySpark](#tab/pyspark)

```python
spark.sql("""
MERGE WITH SCHEMA EVOLUTION INTO sales AS target
USING staged_sales AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN
  UPDATE SET *
WHEN NOT MATCHED THEN
  INSERT *
""")
```

# [Scala](#tab/scala)

```scala
spark.sql("""
MERGE WITH SCHEMA EVOLUTION INTO sales AS target
USING staged_sales AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN
  UPDATE SET *
WHEN NOT MATCHED THEN
  INSERT *
""")
```

---

You can also enable the session setting shown earlier:

# [Spark SQL](#tab/sparksql)

```sql
SET spark.databricks.delta.schema.autoMerge.enabled = true
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set("spark.databricks.delta.schema.autoMerge.enabled", "true")
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.databricks.delta.schema.autoMerge.enabled", "true")
```

---

With either approach, new columns from the source are automatically added to the target when the operation supports schema evolution.

## Understand downstream impact

Schema changes don't stop at the Delta table. They affect every downstream consumer that reads the table, including the SQL analytics endpoint, Microsoft Power BI in Direct Lake mode, notebooks, Spark jobs, and other readers.

Keep these effects in mind:

- New columns usually appear as new fields for downstream tools, but reports and semantic models don't automatically start using them.
- Renamed columns can break queries, notebooks, semantic models, and reports that still reference the old name.
- Dropped columns can break any consumer that still expects the column to exist.
- Type changes can affect query results, model refresh behavior, casts, and validations in downstream systems.

If a table supports business-critical reporting or shared data products, communicate schema changes before you apply them.

## Best practices

Use these practices when you manage Delta schema evolution in Fabric:

- Use `mergeSchema` for additive changes in ETL pipelines.
- Enable column mapping early if you expect future column renames or drops.
- Test schema changes in a development environment before you apply them to production tables.
- Treat `overwriteSchema` as a high-impact operation because it replaces the schema contract.
- Review downstream dependencies, especially the SQL analytics endpoint, Power BI models, and shared notebook workloads, before you change production schemas.

## Related content

- [Lakehouse and Delta tables](lakehouse-and-delta-tables.md)
- [Change data feed](delta-lake-change-data-feed.md)
- [Low-Shuffle Merge](low-shuffle-merge.md)
- [Inspect Delta table metadata](delta-lake-describe.md)
- [Delta Lake type widening](https://docs.delta.io/delta-type-widening/)
- [Delta Lake interoperability](../fundamentals/delta-lake-interoperability.md)
