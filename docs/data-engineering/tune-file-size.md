---
title: Tune File Size
description: Learn how you can tune the size of Delta table files.
author: eric-urban
ms.author: eur
ms.reviewer: milescole
ms.date: 02/12/2026
ms.topic: how-to
ms.search.form: lakehouse table file size delta
ai-usage: ai-assisted
---

# Tune the size of Delta table data files

Appropriately sized files are important for query performance, resource utilization, and metadata management. Smaller files increase task overhead and metadata operations, while larger files can underutilize parallelism and skew I/O. Delta Lake uses file metadata for partition pruning and data skipping, so targeting the right file size ensures efficient reads, writes, and maintenance.

> [!TIP]
> For optimal file size recommendations based on consumption scenario (SQL analytics endpoint, Power BI Direct Lake, Spark), see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md#optimal-file-layouts-by-engine).

The section that follows shows how to use various different file-size tuning features to achieve performance for your Delta tables.

## Tunable data layout operations

### Optimize

The `OPTIMIZE` command rewrites small files as larger files to improve the layout of data in Delta tables. For more details including file size tuning information, review the [OPTIMIZE command](./table-compaction.md#optimize-command) documentation.

### Auto Compaction

Auto Compaction automatically evaluates partition health after each write operation. When it detects excessive file fragmentation (too many small files) within a partition, it triggers a synchronous `OPTIMIZE` operation immediately after the write is committed. This writer-driven approach to file maintenance is generally optimal because compaction only executes when programmatically determined to be beneficial. For detailed configuration options and additional information, see the [auto compaction](./table-compaction.md#auto-compaction) documentation.

### Optimize write

Optimize write reduces small-file overhead by performing pre-write compaction (bin packing), which generates fewer, larger files. This approach shuffles in-memory data into optimally sized bins before Spark writes the Parquet files, maximizing the potential for generating appropriately sized files without requiring immediate post-write cleanup operations.

Optimize write should be cautiously used as the computational cost of shuffling data can add excessive and unnecessary processing time to specific write scenarios. Optimize write is beneficial when a write operation would otherwise produce small files that would be candidates for compaction later on. 

:::image type="content" source="media/tune-file-size/optimize-write.png" alt-text="Screenshot showing how optimize writes results in fewer files being written." lightbox="media/tune-file-size/optimize-write.png":::

Optimize write is commonly beneficial for:
- Partitioned tables
- Tables with frequent small inserts
- Operations that are likely to touch many files (`MERGE`, `UPDATE`, and `DELETE`)

For selective application on specific tables, unset the session configuration and enable the table property individually. Unsetting the session-level configuration allows Spark sessions to defer to each table as to whether optimize write should be applied.

1. Unset optimize write
    ```python
    spark.conf.unset("spark.databricks.delta.optimizeWrite.enabled")
    ```

1. Enable on individual table
    ```sql
    ALTER TABLE dbo.table_name
    SET TBLPROPERTIES ('delta.autoOptimize.optimizeWrite' = 'true')
    ```

To enable on writes to all partitioned tables in the Spark session, ensure the session configuration is unset and then enable the session configuration `spark.microsoft.delta.optimizeWrite.partitioned.enabled`:

# [Spark SQL](#tab/sparksql)

```sql
SET spark.microsoft.delta.optimizeWrite.partitioned.enabled = TRUE
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set('spark.microsoft.delta.optimizeWrite.partitioned.enabled', True)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.microsoft.delta.optimizeWrite.partitioned.enabled", "true")
```

---

The target file size generated from optimize write can be adjusted via the `spark.databricks.delta.optimizeWrite.binSize` configuration.

> [!NOTE]
> See [resource profiles](./configure-resource-profile-configurations.md) for the default optimize write settings by resource profile.

## Consistently setting target file size

To avoid needing to set minimum and max target file size session configuration for optimize, auto compaction, and optimize write, Microsoft Fabric provides the `delta.targetFileSize` table property as a means of unifying all related data layout configs at the table level. The target file size value is entered as a byte string (for example, `1073741824b`, `1048576k`, `1024m`, `1g`). When specified it takes precedence over all other session configs and adaptive target file size.

```sql
ALTER TABLE dbo.table_name
SET TBLPROPERTIES ('delta.targetFileSize' = '256m')
```

## Adaptive target file size

Microsoft Fabric provides adaptive target file size to eliminate the complexity related to manually tuning the target file size of all tables in a session or individual tables via the `delta.targetFileSize` table property. Adaptive target file size uses Delta table heuristics like table size to estimate the ideal target file size and automatically updates the target as conditions change, ensuring optimal performance without manual intervention or maintenance overhead.

> [!NOTE]
> While not currently enabled by default, Microsoft recommends enabling the **adaptive target file size** session configuration.

Enable adaptive target file size on tables created or modified within a Spark session by setting the following Spark session configuration:

# [Spark SQL](#tab/sparksql)

```sql
SET spark.microsoft.delta.targetFileSize.adaptive.enabled = TRUE
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set('spark.microsoft.delta.targetFileSize.adaptive.enabled', True)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.microsoft.delta.targetFileSize.adaptive.enabled", "true")
```

---

When enabled, the adaptive target file size is evaluated and set in the following scenarios:
- `CREATE TABLE AS SELECT` and `CREATE OR REPLACE TABLE AS SELECT` operations
- Overwrite writes (for example, `DataFrame.write.mode("overwrite")` or `INSERT OVERWRITE`)
- Writes in `ErrorIfExists`, `Append`, or `Ignore` mode when creating a new table
- At the start of the `OPTIMIZE` command

Once set, the ideal size continues to re-evaluate at the start of every `OPTIMIZE` operation to ensure that current heuristics reflect the latest data distribution and table growth. This adaptive approach automatically updates the target file size over time, removing the need for manual tuning while preserving query and write performance as your data grows. When needing to lock in a specific size, such as in hyper-tuning or testing use cases, you can override the adaptive setting by explicitly setting the user defined `delta.targetFileSize` table property.

The evaluated adaptive target file size value can be audited by running `DESCRIBE DETAIL` or `DESCRIBE EXTENDED` on the table. The adaptive evaluated size is stored as a byte string in the table property `delta.targetFileSize.adaptive`. This value is used as the max or target size config for optimize, auto compaction, and optimize write. The minimum value used by related configurations is computed as half of `delta.targetFileSize.adaptive`.

Adaptive target file size can be further configured via the following Spark session configurations:

| Property | Description | Default Value | Session Config |
|----------|-------------|---------------|----------------|
| **minFileSize** | Specifies the minimum file size (lower bound) as a byte string that Adaptive Target File Size uses when evaluated. Must be between 128 MB and 1 GB. | 128m | spark.microsoft.delta.targetFileSize.adaptive.minFileSize |
| **maxFileSize** | Specifies the maximum file size (upper bound) as a byte string that Adaptive Target File Size uses when evaluated. Must be between 128 MB and 1 GB. | 1024m | spark.microsoft.delta.targetFileSize.adaptive.maxFileSize |
| **stopAtMaxSize** | When `true`, stops further size evaluations once the computed target file size reaches the `maxFileSize`, reducing any evaluation overhead on very large tables. | true | spark.microsoft.delta.targetFileSize.adaptive.stopAtMaxSize |

> [!NOTE]
> With `stopAtMaxSize` enabled (the default), the adaptive target size remains fixed at the maximum value once reached, avoiding extra computations. If your tables might shrink after growing, set this property to `false` to allow recalculation below the maximum threshold.

The following chart illustrates the relationship between table size and the optimal parquet file size. For tables below 10 GB, the Fabric Spark Runtime evaluates the target file size to be 128 MB. As the table size grows, the target file size scales linearly, reaching up to 1 GB for tables that exceed 10 TB.

:::image type="content" source="media/tune-file-size/sizing-guidance-chart.png" alt-text="Chart illustrating the relationship between table size and optimal parquet file size." lightbox="media/tune-file-size/sizing-guidance-chart.png":::

Starting out small at 128MB and then scaling the size of parquet files as a table grows in size has cascading benefits:
- **Improved Delta file skipping**: Properly sized files support optimal data clustering and skipping, allowing Delta's file skipping protocol to eliminate more irrelevant files during query execution. A small table with 128MB files instead of 1GB files enables 8x more possible file skipping.

- **Reduced update costs**: `MERGE` and `UPDATE` operations only rewrite affected files. Right-sized files minimize the number of files touched per operation, reducing the amount of data rewritten. With Deletion Vectors enabled, proper file sizing becomes critical: row-level tombstones in oversized files result in significant cleanup costs during compaction or purge operations.

- **Optimized parallelism**: Right-sized files enable Spark to achieve ideal task parallelism. Too many small files overwhelm the scheduler; too few large files underutilize your Spark pool. Optimal sizing maximizes both read and write throughput.

Adaptive target file size can improve compaction performance by 30-60% and deliver faster queries and writes when it selects a more optimal file size than the default. If the adaptive evaluation yields the same size as the default Spark session configuration, there's no expected performance improvement.

> [!IMPORTANT]
> Try to avoid write amplification. Write amplification happens when already-compacted files are rewritten when the adaptive target file size increases as your table grows. To avoid write amplification, enable **file-level compaction targets**. This feature prevents files compacted under prior adaptive target sizes from being re-compacted unnecessarily. For more information, see the documentation on [file-level compaction targets](./table-compaction.md#file-level-compaction-targets).

## Summary of best practices

- **Enable Auto Compaction** for ingestion pipelines with frequent small writes (streaming or micro-batch) to avoid manual scheduling and to keep files compacted automatically.
    - _For other write patterns, it can be beneficial to enable as insurance against accumulating small files, but weigh whether your data processing service level objectives tolerate periodic spikes in processing time._
- **Enable adaptive target file size** to remove the guesswork around optimal target file sizes.
- **Use Optimize Write in controlled ingestion paths** (batch jobs that can tolerate a shuffle, partitioning scenarios, or frequent small writes) to reduce the creation of small files and downstream maintenance costs. _Pre-write compaction (optimize write) tends to be less costly than post-write compaction (optimize)._
- Schedule **full-table `OPTIMIZE` operations during quiet windows** when you must rewrite many partitions or run Z-Order.
- Enable **fast optimize** to minimize write amplification and make `OPTIMIZE` more idempotent (see [fast optimize](./table-compaction.md#fast-optimize)).
- Use `delta.targetFileSize` or preferably **adaptive target file size** to keep target file size values consistent across data layout features and Spark sessions.
- Enable **file-level compaction targets** to prevent write amplification as tables grow in size and use larger target file sizes.

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Delta Lake table optimization and V-Order](delta-optimization-and-v-order.md)
- [Table compaction](./table-compaction.md)
- [Lakehouse table maintenance](lakehouse-table-maintenance.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
