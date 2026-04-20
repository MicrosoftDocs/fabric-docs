---
title: Optimize Delta Lake tables with V-Order in Fabric
description: Learn how to optimize Delta Lake tables in Fabric using V-Order, OPTIMIZE, and related configuration patterns.
ms.reviewer: dacoelho
ms.topic: concept-article
ms.date: 03/01/2026
ms.search.form: delta lake v-order optimization
ai-usage: ai-assisted
---

# Optimize Delta Lake tables with V-Order

The [Lakehouse](lakehouse-overview.md) and [Delta Lake](lakehouse-and-delta-tables.md) table format are central to Microsoft Fabric. Keeping Delta tables optimized is key to performance and cost efficiency for analytics workloads.

This article helps you decide when to use V-Order and shows the main configuration and maintenance patterns for Delta tables.

Use this article to:

- Understand what V-Order changes and when it helps.
- Understand how Z-Order and V-Order complement each other.
- Choose the right control level: session, table property, or write operation.
- Apply Delta table maintenance patterns in the right Spark runtime context.

For cross-workload guidance on when to apply V-Order based on consumption scenarios, see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md).

## What is V-Order?

V-Order is a write-time optimization for Parquet files that can improve downstream query performance across Fabric engines.

At a glance:

- **Where it helps most:** Read-heavy patterns such as dashboarding, interactive analytics, and repeated scans.
- **How it helps:** Reorganizes Parquet layout (for example, row-group distribution, encoding, and compression) to improve read efficiency.
- **Typical tradeoff:** Writes might take longer (often around 15% on average), while reads can improve significantly depending on workload.
- **Engine compatibility:** Files remain open-source Parquet compliant, and Delta features such as Z-Order remain compatible.
- **Scope:** V-Order is file-level. Delta operations such as compaction, vacuum, and time travel can be used with it.

## Control V-Order writes

V-Order is used to optimize Parquet file layout for faster query performance, especially in read-heavy scenarios. In Microsoft Fabric, **V-Order is _disabled by default_ for all newly created workspaces** to optimize performance for write-heavy data engineering workloads.

V-Order behavior in Apache Spark is controlled through the following configurations:

| Configuration | Default Value | Description |
|---------------|----------------|-------------|
| `spark.sql.parquet.vorder.default` | `false` | Controls session-level V-Order writing. Set to `false` by default in new Fabric workspaces. |
| `TBLPROPERTIES("delta.parquet.vorder.enabled")` | Unset | Controls default V-Order behavior at the table level. |
| DataFrame writer option: `parquet.vorder.enabled` | Unset | Used to control V-Order at the write operation level. |

Use the following commands to enable or override V-Order writes as needed for your scenario.

V-Order is disabled by default in new Fabric workspaces (`spark.sql.parquet.vorder.default=false`) to improve write performance for ingestion and transformation pipelines.

For read-heavy workloads such as interactive queries or dashboarding, enable V-Order by setting `spark.sql.parquet.vorder.default` to `true`. You can also switch to **`readHeavyforSpark`** or **`ReadHeavy`** resource profiles, which automatically enable V-Order for read-focused performance.

In Fabric runtime 1.3 and later, the `spark.sql.parquet.vorder.enable` setting is removed. Because V-Order can be applied automatically during Delta optimization with `OPTIMIZE`, you don't need this older setting. If you're migrating from earlier runtime versions, remove this setting from your code.

- [Learn more about resource profiles](configure-resource-profile-configurations.md)

### Check V-Order configuration in Apache Spark session

Use these commands to confirm the current session value before you change it.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.default 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.get('spark.sql.parquet.vorder.default')
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.get('spark.sql.parquet.vorder.default')
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.default")
```

---

### Disable V-Order writing in Apache Spark session

Use these commands when your workload is write-heavy and you want faster ingestion or transformation writes.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.default=FALSE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.sql.parquet.vorder.default', 'false')   
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.sql.parquet.vorder.default", "false") 
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.default", "false")
```

---

### Enable V-Order writing in Apache Spark session

When you enable V-Order at the session level, all Parquet writes in that session use V-Order, including non-Delta Parquet tables and Delta tables even if `parquet.vorder.enabled` is explicitly set to `false`.

# [Spark SQL](#tab/sparksql)

```sql
%%sql 
SET spark.sql.parquet.vorder.default=TRUE 
```

# [PySpark](#tab/pyspark)

```python
%%pyspark
spark.conf.set('spark.sql.parquet.vorder.default', 'true')
```

# [Scala Spark](#tab/scalaspark)

```scala
%%spark  
spark.conf.set("spark.sql.parquet.vorder.default", "true")
```

# [SparkR](#tab/sparkr)

```r
%%sparkr
library(SparkR)
sparkR.conf("spark.sql.parquet.vorder.default", "true")
```

---

### Control V-Order using Delta table properties

This section uses Spark SQL only because table properties are defined through SQL DDL and `ALTER TABLE` statements.

Use table properties when you want a table-level default that applies across sessions.

Enable V-Order table property during table creation:
```sql
%%sql 
CREATE TABLE person (id INT, name STRING, age INT) USING parquet TBLPROPERTIES("delta.parquet.vorder.enabled" = "true");
```

When the table property is set to `true`, `INSERT`, `UPDATE`, and `MERGE` apply V-Order at write time. Session-level and write-level settings still take precedence, so writes can still use V-Order even when `TBLPROPERTIES` is set to `false`.

Enable or disable V-Order by altering the table property:

```sql
%%sql 
ALTER TABLE person SET TBLPROPERTIES("delta.parquet.vorder.enabled" = "true");

ALTER TABLE person SET TBLPROPERTIES("delta.parquet.vorder.enabled" = "false");

ALTER TABLE person UNSET TBLPROPERTIES("delta.parquet.vorder.enabled");
```

After you enable or disable V-Order using table properties, only future writes to the table are affected. Parquet files keep the ordering used when it was created. To change the current physical structure to apply or remove V-Order, see how to [Control V-Order when optimizing a table](#control-v-order-when-optimizing-a-table).

### Controlling V-Order directly on write operations

This section uses PySpark to demonstrate the DataFrame writer API. The same pattern is available in Scala DataFrame APIs with equivalent options.

Use write-level options when you need per-operation control instead of session-wide or table-wide defaults.

All Apache Spark write commands inherit the session setting when not explicitly overridden. The following examples write using V-Order by inheriting the session configuration.

```python
df_source.write\
  .format("delta")\
  .mode("append")\
  .saveAsTable("myschema.mytable")

DeltaTable.createOrReplace(spark)\
  .addColumn("id","INT")\
  .addColumn("firstName","STRING")\
  .addColumn("middleName","STRING")\
  .addColumn("lastName","STRING",comment="surname")\
  .addColumn("birthDate","TIMESTAMP")\
  .location("Files/people")\
  .execute()

df_source.write\
  .format("delta")\
  .mode("overwrite")\
  .option("replaceWhere","start_date >= '2025-01-01' AND end_date <= '2025-01-31'")\
  .saveAsTable("myschema.mytable") 
```

V-Order only applies to files affected by the predicate.

In a session where `spark.sql.parquet.vorder.default` is unset or set to `false`, the following commands write using V-Order:

```python
df_source.write\
  .format("delta")\
  .mode("overwrite")\
  .option("replaceWhere","start_date >= '2025-01-01' AND end_date <= '2025-01-31'")\
  .option("parquet.vorder.enabled","true")\
  .saveAsTable("myschema.mytable")

DeltaTable.createOrReplace(spark)\
  .addColumn("id","INT")\
  .addColumn("firstName","STRING")\
  .addColumn("middleName","STRING")\
  .addColumn("lastName","STRING",comment="surname")\
  .addColumn("birthDate","TIMESTAMP")\
  .option("parquet.vorder.enabled","true")\
  .location("Files/people")\
  .execute()
```

## What is Optimize Write?

Analytical Spark workloads usually perform better when file sizes are more consistent and file counts are lower. Ingestion pipelines often produce many small files, which leads to the common small file problem.

Optimize Write is a Delta Lake feature in Fabric and Synapse that reduces file count and increases individual file size during writes in Apache Spark. The target file size can be changed per workload requirements using configurations.

The feature is __enabled by default__ in Microsoft Fabric [Runtime for Apache Spark](./runtime.md). To learn more about Optimize Write usage scenarios, read the article [The need for optimize write on Apache Spark](/azure/synapse-analytics/spark/optimize-write-for-apache-spark).

## Merge optimization

Delta Lake `MERGE` updates a target table from a source table, view, or DataFrame. In open-source Delta Lake, `MERGE` can spend unnecessary shuffle work on unchanged rows. Fabric runtime includes Low Shuffle Merge optimization to reduce that overhead.

The implementation is controlled by `spark.microsoft.delta.merge.lowShuffle.enabled` and is enabled by default in runtime. It requires no code changes and remains compatible with open-source Delta Lake. To learn more, see [Low Shuffle Merge optimization on Delta tables](/azure/synapse-analytics/spark/low-shuffle-merge-for-apache-spark).

## Delta table maintenance

As Delta tables evolve, performance and storage efficiency can degrade for several reasons:

- New data added to the table might skew data.
- Batch and streaming data ingestion rates might bring in many small files.
- Update and delete operations add read overhead because Parquet files are immutable and Delta writes new files for changes.
- Older data and log files can accumulate in storage.

To keep tables healthy, use compaction and cleanup operations regularly:

- [OPTIMIZE](https://docs.delta.io/latest/optimizations-oss.html) performs bin compaction by consolidating changes into larger Parquet files.
- [VACUUM](https://docs.delta.io/latest/delta-utility.html#-delta-vacuum) removes dereferenced files from storage.

> [!TIP]
> Use [Delta table maintenance in Lakehouse](lakehouse-table-maintenance.md) for the portal-based maintenance workflow, run monitoring guidance, and retention-focused operational guidance.

`OPTIMIZE` and `VACUUM` are Spark SQL commands. Run them in:

- [Fabric notebooks](../data-engineering/how-to-use-notebook.md) with Spark runtime.
- [Spark job definitions](../data-engineering/spark-job-definition.md).
- Lakehouse **Maintenance** in Explorer. See [Delta Lake table maintenance](lakehouse-table-maintenance.md).

These commands aren't supported in the [SQL Analytics Endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md) or [Warehouse SQL query editor](../data-warehouse/sql-query-editor.md), which support T-SQL only. For SQL endpoint workflows, use [Delta Lake table maintenance](lakehouse-table-maintenance.md) or run the commands in a Fabric notebook.

Design the table's physical structure based on ingestion frequency and read patterns first. In many workloads, table design has more affect than optimization commands alone.

### Control V-Order when optimizing a table

Use these commands when you want compaction and V-Order rewrite to happen in a single operation.

Z-Order and V-Order optimize different aspects of read performance:

- **Z-Order** (SQL keyword `ZORDER`) clusters related values together to improve data skipping for selective filters.
- **V-Order** (SQL keyword `VORDER`) optimizes Parquet file layout to improve read efficiency across Fabric engines.

If your queries frequently filter on specific columns, Z-Order can help. If your workload is read-heavy overall, V-Order can help. In many cases, you can combine both.

Use this quick decision guide:

- Use `VORDER` when you want broad read-performance improvements across engines.
- Use `ZORDER BY (...)` with `VORDER` when queries repeatedly filter on known columns and you also want the V-Order layout benefits.

The following command forms bin-compact and rewrite all affected files using V-Order, independent of `TBLPROPERTIES` and session settings:

```sql
%%sql 
OPTIMIZE <table|fileOrFolderPath> VORDER;

OPTIMIZE <table|fileOrFolderPath> WHERE <predicate> VORDER;

OPTIMIZE <table|fileOrFolderPath> WHERE <predicate> [ZORDER BY (col_name1, col_name2, ...)] VORDER;
```

When `ZORDER` and `VORDER` are used together in SQL, Apache Spark applies bin compaction, then Z-Order, then V-Order.

The following commands bin-compact and rewrite all affected files using `TBLPROPERTIES`. If `TBLPROPERTIES` is set to enable V-Order, all affected files are written with V-Order. If `TBLPROPERTIES` is unset or set to `false`, behavior inherits the session setting. To remove V-Order from table rewrites, set the session configuration to `false`.

When you run these commands in Fabric notebooks, include a space between `%%sql` and `OPTIMIZE`.

Correct syntax:

```sql
%%sql 
OPTIMIZE table_name;
```

Incorrect syntax: `%%sqlOPTIMIZE table_name;`.

```sql
%%sql 
OPTIMIZE <table|fileOrFolderPath>;

OPTIMIZE <table|fileOrFolderPath> WHERE predicate;

OPTIMIZE <table|fileOrFolderPath> WHERE predicate [ZORDER BY (col_name1, col_name2, ...)];
```

### Use VACUUM for retention and storage cleanup

A common `VACUUM` scenario is retention-based cleanup. Use it when older, unreferenced files have accumulated and you want to reclaim storage after updates, deletes, or repeated ingestion cycles.

Run `VACUUM` only with a retention window that fits your time-travel and recovery expectations. The default pattern keeps seven days of history.

In Spark notebooks, a compact `VACUUM` pattern looks like this:

```sql
%%sql
VACUUM schema_name.table_name;

VACUUM schema_name.table_name RETAIN 168 HOURS;
```

For retention behavior and safety guidance, see [VACUUM command](../fundamentals/table-maintenance-optimization.md#vacuum-command). For programmatic maintenance runs, see [Run table maintenance on a Delta table](lakehouse-api.md#run-table-maintenance-on-a-delta-table).

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Table compaction](table-compaction.md)
- [Tune file size](tune-file-size.md)
- [Lakehouse table maintenance](lakehouse-table-maintenance.md)
- [The need for optimize write on Apache Spark](/azure/synapse-analytics/spark/optimize-write-for-apache-spark)
- [Low Shuffle Merge optimization on Delta tables](/azure/synapse-analytics/spark/low-shuffle-merge-for-apache-spark)
