---

title: Configure and manage Automated Table Statistics in Fabric Spark
description: Learn how to configure Automated Table Statistics in Fabric Spark to optimize performance for analytics workloads.
ms.reviewer: saravi
ms.topic: how-to
ms.date: 08/24/2026
ai-usage: ai-assisted
---

# Configure and manage Automated Table Statistics in Fabric Spark

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Automated Table Statistics in Microsoft Fabric help Spark optimize query execution by automatically collecting table and column metrics for Delta tables.

- Row counts.
- Null counts per column.
- Minimum and maximum values per column.
- Distinct value counts per column.
- Average and maximum column lengths.

By default, these extended statistics are collected for the first 32 columns (including nested columns) of Delta tables in Fabric. This data helps Spark’s cost-based optimizer (CBO) improve planning for joins, filters, aggregations, and partition pruning.

As a result, many workloads can reduce query latency and compute usage with less manual statistics maintenance.

For cross-workload guidance on table optimization strategies, see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md).

## Key benefits

Automated statistics provide the following benefits:

- Enabled automatically for Delta tables in Fabric.
- Improves query planning quality for common analytics patterns.
- Reduces the need for repeated manual stats collection.
- Stores statistics outside table data files to avoid data-file bloat.

## How it works

Fabric Spark collects extended statistics at write time and uses them during planning.

Collection scope and behavior:

- Statistics are collected at write time.
- Collection targets the first 32 columns (including nested columns).
- Table properties can override session-level behavior.
- Configuration controls whether Spark injects statistics into the optimizer.

These metrics help Spark choose better join strategies, improve partition pruning, and optimize aggregation plans.

## Enable or disable statistics collection

Use either session configuration (workspace or notebook scope) or table properties (per-table scope).

### Session configuration

You can enable or disable extended stats collection and optimizer injection at the session level.

These settings can be applied through Spark SQL, PySpark, or Scala Spark.

# [Spark SQL](#tab/sparksql)

Run the following Spark SQL statements to enable collection and optimizer injection:

```sql
SET spark.microsoft.delta.stats.collect.extended=true;
SET spark.microsoft.delta.stats.injection.enabled=true;
```

# [PySpark](#tab/pyspark)

Run the following commands in PySpark to enable collection and optimizer injection:

```python
spark.conf.set("spark.microsoft.delta.stats.collect.extended", "true")
spark.conf.set("spark.microsoft.delta.stats.injection.enabled", "true")
```

# [Scala Spark](#tab/scalaspark)

To enable collection and optimizer injection, run the following commands in Scala Spark:

```scala
spark.conf.set("spark.microsoft.delta.stats.collect.extended", "true")
spark.conf.set("spark.microsoft.delta.stats.injection.enabled", "true")
```

---

To disable either setting, use the same command with the value set to `false`.

> [!NOTE]
> Delta log statistics collection (`spark.databricks.delta.stats.collect`) must also be enabled (default: true).

> [!IMPORTANT]
> If you enable [deletion vectors](delta-lake-deletion-vectors.md) on a table, disable statistics injection for that table. On tables that use deletion vectors with frequent updates or deletes, the extended statistics can become inaccurate and cause Spark to underestimate the table size. When this happens, the optimizer might choose a broadcast join that isn't appropriate, which can cause queries to fail. To prevent this behavior, disable statistics injection so the optimizer doesn't use the injected statistics:
>
> - Session scope: set `spark.microsoft.delta.stats.injection.enabled` to `false`.
> - Table scope: set the `delta.stats.extended.inject` table property to `false`.
>
> You can keep statistics collection enabled. For tables that use deletion vectors, only disable injection into the optimizer.
>
> A regular table maintenance strategy reduces this risk. `OPTIMIZE` automatically purges files where more than 5% of rows are referenced by deletion vectors, and `REORG TABLE ... APPLY (PURGE)` can force a rewrite below that threshold. Because extended statistics are collected at write time, the rewrite refreshes statistics for the affected files. For tables with frequent updates or deletes, keep injection disabled between maintenance cycles.

### Table properties (override session config)

Table properties let you control statistics collection on individual tables, overriding session settings.

Enable on a table:

```sql
ALTER TABLE tableName
SET TBLPROPERTIES(
    'delta.stats.extended.collect' = 'true',
    'delta.stats.extended.inject' = 'true'
)
```

To disable either table property, set its value to `false`.

### Table-creation default behavior

Use this session-level setting to disable automatic stamping of extended-statistics table properties when new tables are created.

# [Spark SQL](#tab/sparksql)

Use this Spark SQL statement to disable auto-setting at table creation:

```sql
SET spark.microsoft.delta.stats.collect.extended.property.setAtTableCreation=false;
```

# [PySpark](#tab/pyspark)

Use this PySpark command to disable auto-setting at table creation:

```python
spark.conf.set("spark.microsoft.delta.stats.collect.extended.property.setAtTableCreation", "false")
```

# [Scala Spark](#tab/scalaspark)

Use this Scala Spark command to disable auto-setting at table creation:

```scala
spark.conf.set("spark.microsoft.delta.stats.collect.extended.property.setAtTableCreation", "false")
```

---

## Check statistics

You can inspect the statistics available to an optimized query plan by using Spark APIs. These APIs return generic plan statistics from any available source, including Spark catalog statistics. A result doesn't confirm that Fabric extended statistics were collected for the table.

Check row count and table size (Scala example):

```scala
println(spark.read.table("tableName").queryExecution.optimizedPlan.stats)
```

Check detailed column statistics:

```scala
val stats = spark.read.table("tableName").queryExecution.optimizedPlan.stats

stats.attributeStats.foreach { case (attrName, colStat) =>
    println(s"colName: $attrName distinctCount: ${colStat.distinctCount} min: ${colStat.min} max: ${colStat.max} nullCount: ${colStat.nullCount} avgLen: ${colStat.avgLen} maxLen: ${colStat.maxLen}")
}
```

## Recompute statistics

Statistics can become outdated after schema changes or partial updates. Use one of the following approaches to recompute.

Rewrite the table (note: this resets history):

```python
spark.read.table("targetTable").write.partitionBy("partCol").mode("overwrite").saveAsTable("targetTable")
```

Recommended approach (Fabric Spark >= 3.2.0.19):

```python
from pyspark.sql.delta import StatisticsStore

StatisticsStore.recomputeStatisticsWithCompaction(spark, "testTable1")
```

If the schema changes (for example, you add or drop columns), remove old statistics before recomputing:

```python
from pyspark.sql.delta import StatisticsStore

StatisticsStore.removeStatisticsData(spark, "testTable1")
StatisticsStore.recomputeStatisticsWithCompaction(spark, "testTable1")
```

## Use ANALYZE TABLE

Use `ANALYZE TABLE` to compute Spark catalog statistics across all columns. This command doesn't recompute the extended statistics stored by Automated Table Statistics. To recompute those statistics, use `StatisticsStore.recomputeStatisticsWithCompaction`.

Run the command:

# [Spark SQL](#tab/sparksql)

Run the following Spark SQL statement:

```sql
ANALYZE TABLE tableName COMPUTE STATISTICS FOR ALL COLUMNS
```

# [PySpark](#tab/pyspark)

Run the same operation through PySpark:

```python
spark.sql("ANALYZE TABLE tableName COMPUTE STATISTICS FOR ALL COLUMNS")
```

# [Scala Spark](#tab/scalaspark)

Run the same operation through Scala Spark:

```scala
spark.sql("ANALYZE TABLE tableName COMPUTE STATISTICS FOR ALL COLUMNS")
```

---

Enable catalog statistics injection:

# [Spark SQL](#tab/sparksql)

Use this Spark SQL statement to enable catalog statistics injection:

```sql
SET spark.microsoft.delta.stats.injection.catalog.enabled=true;
```

# [PySpark](#tab/pyspark)

Use this PySpark setting to enable catalog statistics injection:

```python
spark.conf.set("spark.microsoft.delta.stats.injection.catalog.enabled", "true")
```

# [Scala Spark](#tab/scalaspark)

Use this Scala Spark setting to enable catalog statistics injection:

```scala
spark.conf.set("spark.microsoft.delta.stats.injection.catalog.enabled", "true")
```

---

To disable catalog statistics injection, use the same setting with the value set to `false`.

## Limitations

It’s important to understand the current limitations of Fabric’s automated statistics so you can plan accordingly.

- Statistics are collected only at write time.
- Updates from other engines aren't aggregated automatically.
- Only the first 32 columns are included (including nested columns).
- Deletes and updates can make statistics stale. For tables that use deletion vectors, regular `OPTIMIZE` or `REORG TABLE ... APPLY (PURGE)` maintenance rewrites affected files and refreshes their statistics. Disable statistics injection between maintenance cycles on tables with frequent updates or deletes.
- Recompute requires a rewrite or statistics API operation.
- Statistics injection doesn't apply to nested columns.
- In some workloads, stale or incomplete stats can lead to regressions.
- `ANALYZE TABLE` support is limited to `FOR ALL COLUMNS`.
- Column ordering or configuration changes can require full refresh.

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Delta Lake table optimization and V-order](delta-optimization-and-v-order.md)
- [Table compaction](table-compaction.md)
- [Lakehouse table maintenance](lakehouse-table-maintenance.md)
- [Configure resource profiles based on your workload requirements](configure-resource-profile-configurations.md)
