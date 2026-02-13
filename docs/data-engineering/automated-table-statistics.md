---

title: Configure and manage Automated Table Statistics in Fabric Spark
description: Learn how to configure Automated Table Statistics in Fabric Spark to optimize performance for analytics workloads.
ms.reviewer: saravi
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 05/01/2025
ai-usage: ai-assisted
---

# Configure and manage Automated Table Statistics in Fabric Spark

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Automated Table Statistics in Microsoft Fabric help Spark optimize query execution by automatically collecting detailed table-level metrics. These statistics include:

- Total row counts
- Null counts per column
- Minimum and maximum values per column
- Distinct value counts per column
- Average and maximum column lengths

By default, these **extended statistics** are collected for the first 32 columns (including nested columns) of every Delta table created in Fabric. The collected data helps Spark’s cost-based optimizer (CBO) improve query planning for joins, filters, aggregations, and partition pruning.

As a result, workloads can see greater performance improvements and reduced compute resource usage — all without requiring manual `ANALYZE TABLE` runs or complex configuration.

> [!TIP]
> Statistics work in conjunction with other table maintenance operations. For comprehensive cross-workload guidance on table optimization strategies, see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md).

## Key Benefits

This section summarizes why automated table statistics matter for your workloads.

- ~45% faster performance on complex queries
- Automatically enabled on new Delta tables
- Improves query planning and reduces compute costs
- Supports distinct value counts, min/max, null counts, and column length metrics
- Stored in Parquet format to avoid bloating data files

## How It Works

Here’s what happens behind the scenes when Fabric Spark collects statistics:

- Row counts
- Null counts per column
- Minimum and maximum values per column
- Distinct value counts per column
- Average and maximum column lengths

These metrics help Spark make smarter decisions about how to execute queries — improving join strategies, partition pruning, and aggregation performance.

## How to Enable or Disable

Learn how to control automated statistics collection using Spark session configurations or table properties.

### Session Configuration

You can enable or disable extended stats collection and optimizer injection at the session level.

Enable extended statistics collection:

```spark.conf.set("spark.microsoft.delta.stats.collect.extended", "true")```

Disable extended statistics collection:

 ```spark.conf.set("spark.microsoft.delta.stats.collect.extended", "false")```

Enable statistics injection into the query optimizer:

```spark.conf.set("spark.microsoft.delta.stats.injection.enabled", "true")```

Disable statistics injection:

```spark.conf.set("spark.microsoft.delta.stats.injection.enabled", "false")```


> [!NOTE]
> Delta log statistics collection (`spark.databricks.delta.stats.collect`) must also be enabled (default: true).

### Table Properties (Overrides Session Configs)

Table properties let you control statistics collection on individual tables, overriding session settings.

Enable on a table:

```ALTER TABLE tableName SET TBLPROPERTIES('delta.stats.extended.collect' = true, 'delta.stats.extended.inject' = true)```

Disable on a table:

```ALTER TABLE tableName SET TBLPROPERTIES('delta.stats.extended.collect' = false, 'delta.stats.extended.inject' = false)```

Disable auto-setting of table properties at creation:

 ```spark.conf.set("spark.microsoft.delta.stats.collect.extended.property.setAtTableCreation", "false")```

## How to Check Statistics

You can inspect the collected table and column statistics using Spark’s APIs — useful for debugging or validation.

Check row count and table size (Scala example):

```println(spark.read.table("tableName").queryExecution.optimizedPlan.stats)```

Check detailed column statistics:

```
spark.read.table("tableName").queryExecution.optimizedPlan.stats.attributeStats.foreach { case (attrName, colStat) =>
println(s"colName: $attrName distinctCount: ${colStat.distinctCount} min: ${colStat.min} max: ${colStat.max} nullCount: ${colStat.nullCount} avgLen: ${colStat.avgLen} maxLen: ${colStat.maxLen}")
    }
```

## Recomputing Statistics

Sometimes statistics can become outdated or partial — for example, after schema changes or partial updates. You can recompute statistics using these methods.

Rewrite the table (note: this resets history):

 ``` spark.read.table("targetTable").write.partitionBy("partCol").mode("overwrite").saveAsTable("targetTable") ```

Recommended approach (Fabric Spark >= 3.2.0.19):

``` StatisticsStore.recomputeStatisticsWithCompaction(spark, "testTable1") ```

If the schema changes (e.g., you add/drop columns), you need to remove old statistics before recomputing:

```
StatisticsStore.removeStatisticsData(spark, "testTable1")
StatisticsStore.recomputeStatisticsWithCompaction(spark, "testTable1")

```

## Using ANALYZE COMMAND

The `ANALYZE TABLE` command provides a manual way to collect statistics across all columns, similar to open-source Spark.

Run the command:

```
ANALYZE TABLE tableName COMPUTE STATISTICS FOR ALL COLUMNS

```

Enable catalog statistics injection:

```
spark.conf.set("spark.microsoft.delta.stats.injection.catalog.enabled", "true")
```

Disable catalog statistics injection:

 ```
spark.conf.unset("spark.microsoft.delta.stats.injection.catalog.enabled")
```

## Limitations

It’s important to understand the current limitations of Fabric’s automated statistics so you can plan accordingly. 

- Statistics collected only at **write time**
- Updates or changes from **other engines** are not aggregated
- Only first **32 columns** included (including nested columns)
- **Deletes or updates** may make statistics outdated
- **No recompute** without rewriting the table or using the API
- **No statistics injection** for nested columns
- **No performance fallback** → stats can occasionally lead to regressions
- `ANALYZE TABLE` only works with `FOR ALL COLUMNS`
- Column ordering or configuration changes require full rewrite to refresh stats

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
- [Table compaction](table-compaction.md)
- [Lakehouse table maintenance](lakehouse-table-maintenance.md)
- [Configure resource profiles based on your workload requirements](configure-resource-profile-configurations.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)


