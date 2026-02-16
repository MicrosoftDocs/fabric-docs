---
title: Table Compaction
description: Learn about how and why to optimize data files in Delta tables.
ms.reviewer: milescole
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 09/15/2025
ms.search.form: lakehouse table maintenance optimize compaction
ai-usage: ai-assisted
---

# Compacting Delta tables

Like file systems and relational databases, data becomes fragmented over time unless closely managed, leading to excessive compute costs to read the data. Delta Lake isn't an exception. Data files should be periodically rewritten into an optimal layout to reduce individual file operation costs, improve data compression, and optimize reader parallelism. The `OPTIMIZE` command addresses this challenge: it groups small files within a partition into bins targeting an _ideal_ file size and rewrites them to storage. The result is the same data compacted into fewer files.

> [!TIP]
> For comprehensive cross-workload guidance on compaction strategies for different consumption scenarios (SQL Analytics Endpoint, Power BI Direct Lake, Spark), see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md).

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
| **minFileSize** | Files that are smaller than this threshold are grouped together and rewritten as larger files. | 1073741824 (1 g) | spark.databricks.delta.optimize.minFileSize |
| **maxFileSize** | Target file size produced by the `OPTIMIZE` command. | 1073741824 (1g) | spark.databricks.delta.optimize.maxFileSize |

> [!IMPORTANT] 
> While `OPTIMIZE` is an idempotent operation (meaning that running it twice in a row doesn't rewrite any data), using a `minFileSize` that is too large relative to the Delta table size might cause write amplification, making the operation more computationally expensive than necessary. For example, if your `minFileSize` is set to 1-GB and you have a 900-MB file in your table, the reasonably sized 900-MB file is rewritten when `OPTIMIZE` is run following writing a small 1-KB file to your table. For guidance on how to automatically manage file size, see [adaptive target file size](./tune-file-size.md#adaptive-target-file-size) documentation.

#### `OPTIMIZE` with Z-Order

When the `ZORDER BY` clause is specified, `OPTIMIZE` rewrites all active files so that rows with similar values for the z-order columns are colocated in the same files, improving the effectiveness of file skipping for queries that filter on those columns. Use Z-Order when:
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


Fast optimize can result in less data being rewritten over a Delta tables lifecycle. As illustrated in the following diagram, fast optimize skips compacting suboptimal bins. The net result is faster and more idempotent `OPTIMIZE` jobs and less write-amplification.

:::image type="content" source="media\table-compaction\fast-optimize-impact.png" alt-text="Screenshot showing how fast optimize results in less data rewrite over time." lightbox="media\table-compaction\fast-optimize-impact.png":::
> [!NOTE]
> For illustration purposes only, the above diagrams assume that the size of file written from compaction is the sum of size of small files. It also implies a `parquetCoefficient` of 1.

##### Limitations

- Not applicable to liquid clustering and Z-Order operations
- Fast optimize doesn't modify the behavior of auto compaction

#### File-level compaction targets

To avoid rewrite of data that was previously considered compacted (large enough) based on changing compaction min and max file size targets, `spark.microsoft.delta.optimize.fileLevelTarget.enabled` can be enabled to prevent recompaction of already compacted files. When enabled, files aren't recompacted if they previously met at least half the target file size at the time of compaction. Maintaining file level targets minimizes write amplification as the compaction target size changes over time (for exmaple, from adaptive target file size evaluating and setting a larger target). If enabled, the `OPTIMIZE_TARGET_SIZE` tag is added to new files when OPTIMIZE is run or for any write operation if the `delta.targetFileSize` or `delta.targetFileSize.adaptive` table property is set.

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

Set at the session level to enable auto compaction on new tables:

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

Set at the table level to only enable for select tables:

```sql
CREATE TABLE dbo.table_name
TBLPROPERTIES ('delta.autoOptimize.autoCompact' = 'true')
```

Use the DataFrameWriter option to enable on new tables:
```python
df.write.option('delta.autoOptimize.autoCompact', 'true').saveAsTable('dbo.table_name')
```

Enable on existing tables:

```sql
ALTER TABLE dbo.table_name
SET TBLPROPERTIES ('delta.autoOptimize.autoCompact' = 'true')
```

The behavior of auto compaction can be tuned via the following Spark session configurations:

| Property | Description | Default value | Session config |
|----------|-------------|---------------|----------------|
| **maxFileSize** | The target maximum file size in bytes for compacted files. | 134217728b (128 MB)  | spark.databricks.delta.autoCompact.maxFileSize |
| **minFileSize** | The minimum file size in bytes for a file to be considered compacted. Anything below this threshold is considered for compaction and counted towards the `minNumFiles` threshold. | _Unset_ by default, calculated as 1/2 of the `maxFileSize` unless you explicitly set a value. | spark.databricks.delta.autoCompact.minFileSize |
| **minNumFiles** | The minimum number of files that must exist under the `minFileSize` threshold for auto compaction to be triggered. | 50 | spark.databricks.delta.autoCompact.minNumFiles |

> [!NOTE]
> Microsoft recommends using **auto compaction** instead of scheduling `OPTIMIZE` jobs. Auto compaction generally outperforms scheduled compaction jobs at maximizing read/write performance and often eliminates the maintenance overhead of coding, scheduling, and optimizing the frequency of running scheduled jobs. Auto compaction is recommended when data processing service level objectives tolerate the added latency from auto compaction being triggered when compaction is needed. If data latency requirements are strict, it might be more effective to schedule optimize to run on a separate Spark pool so that write operations don't see periodic spikes due to the synchronous compaction operations being triggered.

> [!IMPORTANT]
> While compaction is a critical strategy to employ, it should also be appropriately paired with _avoidance of writing small files_ via features like optimize write. For more information, see the guidance on [optimize write](./tune-file-size.md#optimize-write).

### Lakehouse table maintenance

Users can run ad-hoc maintenance operations like `OPTIMIZE` from the Lakehouse UI. For more information, see [lakehouse table maintenance](./lakehouse-table-maintenance.md).

## Summary of best practices

- **Enable Auto Compaction** for ingestion pipelines with frequent small writes (streaming or microbatch) to avoid manual scheduling and keep files compacted automatically.
    - _For other write patterns, it might be beneficial to enable as insurance against accumulating small files, but weigh whether your data processing service level objectives tolerate periodic spikes in processing time._
- Schedule **full-table `OPTIMIZE` operations during quiet windows** when you need to rewrite many partitions or run Z‑Order.
- Enable **fast optimize** to reduce write amplification and make `OPTIMIZE` more idempotent.
- Enable **file-level compaction targets** to prevent write amplification as tables grow in size and use larger target file sizes.
- Remember that prewrite compaction (optimize write) is less costly than post-write compaction (optimize). See [optimize write](./tune-file-size.md#optimize-write) documentation for best practices.

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
- [Tune file size](./tune-file-size.md)
- [Lakehouse table maintenance](./lakehouse-table-maintenance.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
