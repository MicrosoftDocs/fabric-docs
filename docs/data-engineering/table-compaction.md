---
title: Table Compaction
description: Learn about how and why to optimize data files in Delta tables.
ms.reviewer: milescole
ms.topic: how-to
ms.date: 03/01/2026
ms.search.form: lakehouse table maintenance optimize compaction
ai-usage: ai-assisted
---

# Compacting Delta tables

Delta table files become fragmented over time. Fragmentation increases file-operation overhead, reduces compression efficiency, and can limit reader parallelism. Compaction rewrites many small files into fewer right-sized files so Spark can read and process data more efficiently.

The `OPTIMIZE` command is the primary compaction operation. It groups small files into bins targeting an ideal file size, then rewrites them to storage.

For cross-workload guidance on compaction strategies across SQL Analytics Endpoint, Power BI Direct Lake, and Spark, see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md).

## Compaction methods

Microsoft Fabric offers several approaches to maintain optimal file sizes in Delta tables:

### `OPTIMIZE` command

The `OPTIMIZE` command is the foundational operation to compact Delta tables. It rewrites small files into larger files to improve the data layout in Delta tables.

# [Spark SQL](#tab/sparksql)

```sql
OPTIMIZE dbo.table_name
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import *
deltaTable = DeltaTable.forName(spark, "dbo.table_name")
deltaTable.optimize().executeCompaction()
```

# [Scala](#tab/scala)

```scala
import io.delta.tables._
val deltaTable = DeltaTable.forName(spark, "dbo.table_name")
deltaTable.optimize().executeCompaction() 
```

---

| Property | Description | Default value | Session config |
|----------|-------------|---------------|----------------|
| **minFileSize** | Files that are smaller than this threshold are grouped together and rewritten as larger files. | 1073741824 (1g) | spark.databricks.delta.optimize.minFileSize |
| **maxFileSize** | Target file size produced by the `OPTIMIZE` command. | 1073741824 (1g) | spark.databricks.delta.optimize.maxFileSize |

`OPTIMIZE` is idempotent, but an oversized `minFileSize` can increase write amplification. For example, with `minFileSize` set to 1 GB, a 900 MB file might be rewritten after a small additional write. For automatic file-size management guidance, see [adaptive target file size](./tune-file-size.md#adaptive-target-file-size).

#### `OPTIMIZE` with Z-Order

When you use the `ZORDER BY` clause, `OPTIMIZE` rewrites active files so rows with similar values are colocated in the same files. This improves file skipping for selective filters. Use Z-Order when:
- Your queries frequently filter on two or more columns together (for example, date + customer_id), and
- Those predicates are selective enough that file-level skipping reduces the number of files scanned.

```sql
OPTIMIZE dbo.table_name ZORDER BY (column1, column2)
```

#### `OPTIMIZE` with V-Order

The `VORDER` clause results in the files scoped for compaction having the V-Order optimization applied. For more information on V-Order, see the detailed [documentation](./delta-optimization-and-v-order.md).

```sql
OPTIMIZE dbo.table_name VORDER
```

#### `OPTIMIZE` with liquid clustering

Liquid clustering is specified as a table option; see [enable liquid clustering](https://docs.delta.io/delta-clustering/#enable-liquid-clustering) for details. When liquid clustering is enabled, `OPTIMIZE` performs the physical rewrite that applies the clustering policy.

> [!IMPORTANT] 
> Data is only clustered when `OPTIMIZE` is run on liquid clustered enabled tables. Regular write operations do NOT cluster the data. Having a compaction strategy such as using auto compaction or manually scheduling optimize jobs is critical to ensure that the benefits of clustered data (that is, improved Delta file skipping) can be realized.

#### Fast optimize

Fast optimize intelligently analyzes Delta table files and skips compaction operations that aren't likely to improve performance meaningfully. 

Instead of blindly compacting files whenever small files exist, fast optimize evaluates whether each candidate bin (group of small files) meets configurable best practice compaction goals. Fast Optimize only runs compaction on a bin of files if merging them is likely to reach your minimum target size or if there's too many small files. Otherwise, it skips that group or reduces how many files it compacts.

# [Spark SQL](#tab/sparksql)

```sql
SET spark.microsoft.delta.optimize.fast.enabled = TRUE
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set('spark.microsoft.delta.optimize.fast.enabled', True)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.microsoft.delta.optimize.fast.enabled", "true")
```

---

Fast optimize can be fine tuned based on your compaction expectations:

| Property | Description | Default value | Session config |
|----------|-------------|---------------|----------------|
| **minNumFiles** | The number of small files that need to exist in a bin for optimize to be performed if the bin doesn't contain enough data estimated to produce a _compacted_ file. | 50 | spark.microsoft.delta.optimize.fast.minNumFiles |
| **parquetCoefficient** | Multiplied by the optimize context minimum file size to determine the minimum amount of small file data that must exist in a bin for the bin to be included in the scope of compaction. | 1.3 | spark.microsoft.delta.optimize.fast.parquetCoefficient |

> [!NOTE]
> The `parquetCoefficient` results in the target size of a bin being larger than the minimum target file size of the optimize context. This coefficient accounts for the reality that combining multiple small parquet files result in better compression, and thus less data than the sum of small files. This value can be increased to be more conservative in how often fast optimize will skip bins, or decreased to allow more permissive bin skipping.

##### How it works

Fast optimize introduces extra checks before bins are compacted. For each candidate bin, fast optimize evaluates:
- The estimated amount of raw data in the bin (sum of small file sizes)
- Whether combining the small files is estimated to produce a file meeting the configured minimum target size
- Whether the bin contains at least the configured minimum number of small files

Fast optimize evaluates each bin of small files and only compacts the small files that are likely to reach the minimum target size or exceed the minimum file count. Bins that don't meet these thresholds are skipped or partially compacted. Skipping suboptimal bins reduces unnecessary rewrites, lowers write amplification, and makes OPTIMIZE jobs more idempotent.

:::image type="content" source="media\table-compaction\fast-optimize-logic.png" alt-text="Screenshot showing how fast optimize evaluates if a bin is compacted." lightbox="media\table-compaction\fast-optimize-logic.png":::
> [!NOTE]
> _The exact implementation is subject to evolve over time._


Fast optimize can reduce rewritten data over a Delta table lifecycle. As shown in the following diagram, fast optimize skips suboptimal bins, resulting in faster and more idempotent `OPTIMIZE` jobs with less write amplification.

:::image type="content" source="media\table-compaction\fast-optimize-impact.png" alt-text="Screenshot showing how fast optimize results in less data rewrite over time." lightbox="media\table-compaction\fast-optimize-impact.png":::
> [!NOTE]
> For illustration purposes only, the above diagrams assume that the size of file written from compaction is the sum of size of small files. It also implies a `parquetCoefficient` of 1.

##### Limitations

- Not applicable to liquid clustering and Z-Order operations
- Fast optimize doesn't modify the behavior of auto compaction

#### File-level compaction targets

To avoid rewrite of data that was previously considered compacted (large enough) based on changing compaction min and max file size targets, `spark.microsoft.delta.optimize.fileLevelTarget.enabled` can be enabled to prevent recompaction of already compacted files. When enabled, files aren't recompacted if they previously met at least half the target file size at the time of compaction. Maintaining file level targets minimizes write amplification as the compaction target size changes over time (for example, from adaptive target file size evaluating and setting a larger target). If enabled, the `OPTIMIZE_TARGET_SIZE` tag is added to new files when OPTIMIZE is run or for any write operation if the `delta.targetFileSize` or `delta.targetFileSize.adaptive` table property is set.

> [!NOTE]
> While not enabled by default, Microsoft recommends enabling **file-level compaction targets** to limit potential write-amplification.

# [Spark SQL](#tab/sparksql)

```sql
SET spark.microsoft.delta.optimize.fileLevelTarget.enabled = TRUE
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set('spark.microsoft.delta.optimize.fileLevelTarget.enabled', True)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.microsoft.delta.optimize.fileLevelTarget.enabled", "true")
```

---

### Auto compaction

Auto compaction evaluates partition health after each write operation. When it detects excessive file fragmentation (too many small files) within a partition, it triggers a synchronous `OPTIMIZE` operation immediately after the write is committed. This writer-driven approach to file maintenance is optimal because compaction only executes when programmatically determined to be beneficial.

#### Enable at session level

Set `spark.databricks.delta.autoCompact.enabled` at the session level to enable auto compaction for new tables created in that Spark session:

# [Spark SQL](#tab/sparksql)

```sql
SET spark.databricks.delta.autoCompact.enabled = TRUE
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set('spark.databricks.delta.autoCompact.enabled', True)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.databricks.delta.autoCompact.enabled", "true")
```

---

#### Enable at table level

Set table property `delta.autoOptimize.autoCompact` to enable auto compaction for specific tables:

```sql
CREATE TABLE dbo.table_name
TBLPROPERTIES ('delta.autoOptimize.autoCompact' = 'true')
```

Use DataFrameWriter option `delta.autoOptimize.autoCompact` to enable auto compaction when creating a table:
```python
df.write.option('delta.autoOptimize.autoCompact', 'true').saveAsTable('dbo.table_name')
```

Enable the same table property on an existing table:

```sql
ALTER TABLE dbo.table_name
SET TBLPROPERTIES ('delta.autoOptimize.autoCompact' = 'true')
```

#### Tune auto compaction thresholds

Tune auto compaction behavior by setting these Spark session configurations:

| Property | Description | Default value | Session config |
|----------|-------------|---------------|----------------|
| **maxFileSize** | The target maximum file size in bytes for compacted files. | 134217728b (128 MB)  | spark.databricks.delta.autoCompact.maxFileSize |
| **minFileSize** | The minimum file size in bytes for a file to be considered compacted. Anything below this threshold is considered for compaction and counted towards the `minNumFiles` threshold. | _Unset_ by default, calculated as 1/2 of the `maxFileSize` unless you explicitly set a value. | spark.databricks.delta.autoCompact.minFileSize |
| **minNumFiles** | The minimum number of files that must exist under the `minFileSize` threshold for auto compaction to be triggered. | 50 | spark.databricks.delta.autoCompact.minNumFiles |

#### Choose between auto compaction and scheduled OPTIMIZE

Microsoft recommends auto compaction as the default strategy for most ingestion workloads. It usually outperforms fixed schedules and reduces the operational overhead of maintaining `OPTIMIZE` jobs.

If your latency objectives are strict, scheduled `OPTIMIZE` on a separate Spark pool can be a better fit because auto compaction runs synchronously after writes.

Use compaction together with small-file prevention features such as optimize write. For guidance, see [Optimize write](./tune-file-size.md#optimize-write).

### Lakehouse table maintenance

You can run ad hoc maintenance operations such as `OPTIMIZE` from Lakehouse Explorer. For more information, see [Lakehouse table maintenance](./lakehouse-table-maintenance.md).

## Summary of best practices

Use these recommendations to balance write cost, read performance, and maintenance overhead for Delta table compaction.

- **Enable Auto compaction** for ingestion pipelines with frequent small writes (streaming or microbatch) to reduce manual scheduling.
- **Use Auto compaction selectively for other write patterns** when your service-level objectives can tolerate occasional write-latency spikes.
- **Schedule full-table `OPTIMIZE` during quiet windows** when you need to rewrite many partitions or apply Z-Order.
- **Enable fast optimize** to reduce write amplification and make `OPTIMIZE` more idempotent.
- **Enable file-level compaction targets** to reduce unnecessary recompaction as target file sizes increase over time.
- **Use optimize write in suitable ingestion paths** because pre-write compaction is often less costly than post-write compaction. For guidance, see [Optimize write](./tune-file-size.md#optimize-write).

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
- [Tune file size](./tune-file-size.md)
- [Lakehouse table maintenance](./lakehouse-table-maintenance.md)
