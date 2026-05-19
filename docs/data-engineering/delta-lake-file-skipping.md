---
title: File skipping for Delta tables
description: Learn how Delta Lake uses per-file statistics to skip irrelevant data files during query execution and how to configure column coverage for maximum benefit.
ms.reviewer: milescole
ms.topic: concept-article
ms.date: 05/18/2026
ai-usage: ai-assisted
---

# File skipping for Delta tables

File skipping is a Delta Lake read optimization that lets the Spark engine avoid scanning data files that can't contain matching rows. By reading less data, queries run faster and consume fewer I/O resources.

## How file skipping works

Every time a data file is written to a Delta table, Delta Lake records per-file column statistics in the transaction log. These statistics include the **minimum value**, **maximum value**, and **null count** for each indexed column in that file.

When a query includes a filter predicate, the engine compares the predicate value against the min/max range stored for each file. If the predicate value falls outside the range for a file, that file is skipped entirely — there's no need to open or scan it.

For example, consider a `sales` table partitioned into five data files by date ranges:

| File | Min/max stats | Result for `WHERE date = '2024-03-15'` |
|------|--------------|----------------------------------------|
| File 1 | `date [2024-01-01 .. 2024-02-28]` | Skipped |
| File 2 | `date [2024-03-01 .. 2024-03-31]` | Read ✓ |
| File 3 | `date [2024-04-01 .. 2024-05-31]` | Skipped |
| File 4 | `date [2024-06-01 .. 2024-07-31]` | Skipped |
| File 5 | `date [2024-08-01 .. 2024-09-30]` | Skipped |

In this case, 4 of 5 files are skipped — 80% less data scanned — because their min/max ranges don't overlap with the filter value.

> [!IMPORTANT]
> The data type of the predicate value must match the column type. A type mismatch can prevent the engine from using file-level statistics for skipping.

## Default behavior

Delta Lake collects file statistics automatically with the following defaults:

- Only the **first 32 columns** (by ordinal position) have statistics collected.
- Statistics tracked per column per file: **min**, **max**, and **null count**
- Collecting statistics on long string columns is costly and adds write overhead, so positioning matters.

The column limit is controlled by the `delta.dataSkippingNumIndexedCols` table property. Columns beyond that threshold don't get file-level statistics and can't participate in file skipping.

## Eligible data types

Not all column types support file-level statistics and therefore file skipping. The engine evaluates each column's data type to determine whether min/max stats can be collected.

### Always eligible (atomic types)

- `NumericType` (`ByteType`, `ShortType`, `IntegerType`, `LongType`, `FloatType`, `DoubleType`, `DecimalType`)
- `DateType`
- `TimestampType`
- `TimestampNTZType`
- `StringType`

### Conditionally eligible

> [!NOTE]
> The following types can be enabled in starting in Fabric Spark runtime 2.0 (Delta 4.1)

- `VariantType` — when `spark.databricks.delta.variantShredding.collectVariantDataSkippingStats` is enabled.
- `ArrayType` — when `spark.microsoft.delta.skipping.complexTypes.enabled` is enabled and the element type is itself eligible.
- `MapType` — when `spark.microsoft.delta.skipping.complexTypes.enabled` is enabled and both the key and value types are eligible.

### Not eligible

- `BinaryType`
- `BooleanType`
- `StructType` (as a whole — leaf fields inside structs are evaluated individually)
- `NullType`

## Maximize column coverage

To get the most benefit from file skipping, make sure the columns you filter on most frequently are covered by file statistics.

### Position frequently filtered columns first

Place columns that appear most often in `WHERE` clauses, join keys, and filter predicates in the first 32 ordinal positions of the table schema. Move long string columns or low-selectivity columns beyond position 32 to avoid wasting write overhead on statistics that rarely help.

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE table_name ALTER COLUMN long_str_col AFTER last_indexed_col
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE table_name ALTER COLUMN long_str_col AFTER last_indexed_col")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE table_name ALTER COLUMN long_str_col AFTER last_indexed_col")
```

---

### Increase the indexed column count

If your table has more than 32 columns that benefit from statistics, increase the default limit:

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE table_name SET TBLPROPERTIES ('delta.dataSkippingNumIndexedCols' = '40')
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE table_name SET TBLPROPERTIES ('delta.dataSkippingNumIndexedCols' = '40')")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE table_name SET TBLPROPERTIES ('delta.dataSkippingNumIndexedCols' = '40')")
```

---

> [!NOTE]
> Increasing the indexed column count adds write overhead for every data file. Only increase this value when the extra columns are frequently used in filter predicates.

### Specify exact columns for statistics

Use `delta.dataSkippingStatsColumns` to explicitly control which columns get file statistics, regardless of ordinal position:

# [Spark SQL](#tab/sparksql)

```sql
ALTER TABLE table_name SET TBLPROPERTIES ('delta.dataSkippingStatsColumns' = 'col1,col2')
```

# [PySpark](#tab/pyspark)

```python
spark.sql("ALTER TABLE table_name SET TBLPROPERTIES ('delta.dataSkippingStatsColumns' = 'col1,col2')")
```

# [Scala](#tab/scala)

```scala
spark.sql("ALTER TABLE table_name SET TBLPROPERTIES ('delta.dataSkippingStatsColumns' = 'col1,col2')")
```

---

When `delta.dataSkippingStatsColumns` is set, only the specified columns get statistics collected. This gives you fine-grained control over the trade-off between write cost and read benefit.

## Combine file skipping with data layout

File skipping works best when related values are co-located in the same files. Techniques such as `ZORDER BY` and liquid clustering physically reorganize data so that rows with similar column values end up in the same files. This tightens the min/max ranges per file, which increases the percentage of files that the engine can skip for a given filter.

For more on data layout optimization, see [Table compaction](table-compaction.md), [Liquid clustering](liquid-clustering.md), and [Z-Order](delta-lake-zorder.md).

## Related content

- [Table compaction](table-compaction.md)
- [Automated statistics for Delta tables](automated-table-statistics.md)
- [V-Order](delta-optimization-and-v-order.md)
- [Liquid clustering](liquid-clustering.md)
- [Z-Order](delta-lake-zorder.md)
- [Delta table maintenance](delta-lake-table-maintenance.md)
