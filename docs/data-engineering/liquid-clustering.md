---
title: Liquid clustering
description: Learn how liquid clustering organizes Delta table data for efficient data skipping and how to configure incremental clustering in Microsoft Fabric.
ms.reviewer: milescole
ms.date: 05/15/2026
ms.topic: how-to
ms.search.form: lakehouse liquid clustering delta optimize
ai-usage: ai-assisted
---

# Apply liquid clustering on Delta tables

Liquid clustering is a flexible data layout strategy for Delta tables in Microsoft Fabric. It replaces static Hive-style partitioning and manual Z-Order maintenance with declarative, change-friendly clustering. You define which columns to cluster on, and the Fabric Spark Runtime handles the physical data layout automatically.

Use this article to:

- Understand how liquid clustering works and when to use it.
- Compare liquid clustering to partitioning and Z-Order.
- Configure clustering on your tables.
- Understand incremental liquid clustering (Runtime 2.0+).
- Tune clustering behavior with session configurations.

## What is liquid clustering?

Liquid clustering organizes data in Delta table files so that rows with similar values in the clustering columns are colocated. The layout enables enhanced [file skipping](./delta-lake-file-skipping.md) during query execution: when a query filters on clustering columns, the engine reads only the files whose value ranges match the predicate, skipping the rest.

Unlike partitioning, liquid clustering:

- Doesn't create physical directory structures per column value.
- Doesn't require you to choose clustering columns at table creation time (they can be changed later).
- Handles high-cardinality columns without creating potential small file issues from thousands of tiny partitions.
- Applies layout optimization during `OPTIMIZE`, not at write time.

## Benefits over partitioning and Z-Order

Liquid clustering offers significant advantages over both Hive-style partitioning and Z-Order in terms of flexibility, maintenance, and handling of evolving data patterns.

### Compared to Hive-style partitioning

| Aspect | Hive-style partitioning | Liquid clustering |
|---|---|---|
| **Granularity** | One directory per distinct value (or combination) | File-level value ranges, no directories |
| **High cardinality** | Creates thousands of small files/directories | Handles naturally; bins data into right-sized files |
| **Column changes** | Requires full table rewrite | `ALTER TABLE ... CLUSTER BY` applies on next `OPTIMIZE` |
| **Write path** | Partition column must be known at write time | Any column can be clustered after the fact |
| **Small file problem** | Common with streaming or frequent inserts | Managed by `OPTIMIZE` compaction |

### Compared to Z-Order

| Aspect | Z-Order | Liquid clustering |
|---|---|---|
| **Column changes** | Must rerun `OPTIMIZE ZORDER BY (...)` with new columns | `ALTER TABLE ... CLUSTER BY` persists the definition |
| **Incremental support** | No incremental mode; use `WHERE` to limit scope manually | Incremental mode (Runtime 2.0+) processes only new, changed, or unhealthy files automatically |
| **Metadata** | No persistent column definition | Clustering columns stored in table metadata |
| **Multi-column layout** | Z-Order curve applied at optimize time | Z-Order for one clustering column; Hilbert curve for 2+ columns, providing optimized data locality |

Liquid clustering uses Z-Order for single-column layouts and the Hilbert curve for 2+ columns—an improvement over Z-Order, which applies only the Z-Order curve for multi-dimensional clustering. Liquid clustering wraps both algorithms in an incremental, metadata-aware framework that reduces ongoing maintenance cost.

## Create a liquid clustered table

Define clustering columns using the `CLUSTER BY` clause at table creation:

# [Spark SQL](#tab/sparksql)

```sql
-- Create a new clustered table
CREATE TABLE dbo.sales (
    order_id BIGINT,
    order_date DATE,
    region STRING,
    amount DECIMAL(10,2)
) CLUSTER BY (order_date, region);

-- Create from query results
CREATE TABLE dbo.sales_clustered
CLUSTER BY (order_date, region)
AS SELECT * FROM raw_sales;

-- Enable on existing table
ALTER TABLE dbo.sales_txn CLUSTER BY (order_date, region);
```

# [PySpark](#tab/pyspark)

```python
from delta.tables import DeltaTable

DeltaTable.create(spark) \
    .tableName("dbo.sales") \
    .addColumn("order_id", "BIGINT") \
    .addColumn("order_date", "DATE") \
    .addColumn("region", "STRING") \
    .addColumn("amount", "DECIMAL(10,2)") \
    .clusterBy("order_date", "region") \
    .execute()
```

# [Scala](#tab/scala)

```scala
import io.delta.tables.DeltaTable

DeltaTable.create(spark)
    .tableName("dbo.sales")
    .addColumn("order_id", "BIGINT")
    .addColumn("order_date", "DATE")
    .addColumn("region", "STRING")
    .addColumn("amount", "DECIMAL(10,2)")
    .clusterBy("order_date", "region")
    .execute()
```

---

## Change clustering columns

Unlike partitioning, you can change clustering columns at any time without rewriting data:

```sql
-- Change clustering columns
ALTER TABLE sales CLUSTER BY (region, product_category);

-- Remove clustering (table becomes unclustered)
ALTER TABLE sales CLUSTER BY NONE;
```

After changing clustering columns, the new layout applies on the next `OPTIMIZE` run. Existing files retain their prior layout until they're reclustered.

## Apply clustering with OPTIMIZE

Clustering is applied during the `OPTIMIZE` command. There's no need to specify columns in the `OPTIMIZE` statement since the clustering definition is stored in table metadata:

```sql
-- Cluster the table using the defined clustering columns
OPTIMIZE sales;

-- Recluster partial Z-Cubes and Z-Cubes with different clustering keys or clustering providers
OPTIMIZE sales FULL;
```

Use `OPTIMIZE FULL` when you change clustering keys and want to rebuild Z-Cubes that don't adhere to the current clustering strategy. A **Z-Cube** is the logical unit liquid clustering uses to group files that share the same clustering columns. Data is clustered into a single Z-Cube until cluster keys change or the amount of data exceeds 100 GB.

> [!TIP]
> Starting in Fabric Runtime 2.0, the [Native execution engine](native-execution-engine-overview.md) supports performing `OPTIMIZE` on liquid clustered tables, delivering 30–50% faster multi-dimensional clustering performance. Prior runtimes fall back to regular nonaccelerated Spark execution.

## How liquid clustering works

When you run `OPTIMIZE` on a liquid clustered table, the following happens:

1. **File selection**: The engine selects files that need clustering.
    - In **Runtime 2.0+** (incremental clustering strategy), only unclustered, unhealthy, small, or deletion-vector files are selected.
    - In **Runtime 1.3**, all files within every Z-Cube smaller than 100 GB are selected, regardless of whether they're already well-clustered.
1. **Bin packing**: Selected files are grouped into bins targeting an optimal output file size.
1. **Repartitioning**: Data within each bin is repartitioned using a space-filling curve (Hilbert curve for multi-column, Z-Order for single-column).
1. **File writing**: Repartitioned data is written as new files with tight value ranges on clustering columns.
1. **Metadata update**: The Delta log records the file replacement, tagging new files with clustering metadata.

The result is files with nonoverlapping (or minimally overlapping) value ranges on clustering columns, enabling the engine to skip files that don't match query predicates.

> [!CAUTION]
> **Fabric Runtime 1.3 (Delta 3.2): use liquid clustering with caution.** In this runtime, liquid clustering uses a full Z-Cube rewrite strategy—every file within a Z-Cube is rewritten on every run. A Z-Cube is preserved (skipped) only when its size exceeds 100 GB. For tables smaller than 100 GB, the full rewrite means every `OPTIMIZE` run rewrites all table data, even when the data is already well-clustered. This causes severe write amplification.
>
> - **Do not use auto compaction** with liquid clustering in Runtime 1.3. Every auto compaction trigger can cause a full table rewrite instead of just clustering the new/changed data.
> - **Avoid running `OPTIMIZE` after every write operation.** In Runtime 1.3, limit clustering to strategic, intentional runs, and accept lower clustering freshness between them.
>
> Incremental liquid clustering, which eliminates this write amplification, is only available starting in Fabric Runtime 2.0.

## Incremental liquid clustering

Starting with **Fabric Runtime 2.0** (Delta 4.1), liquid clustering uses an **incremental** clustering strategy by default. The incremental strategy is a significant improvement over the standard clustering behavior.

> [!IMPORTANT]
> Incremental liquid clustering is only available in Fabric Runtime 2.0 and later. In earlier runtimes, `OPTIMIZE` uses the standard (full rewrite) behavior where all files within a Z-Cube are rewritten on every run.

### Why the incremental clustering strategy matters

The standard clustering algorithm rewrites **all** files within a Z-Cube (up to 100 GB) on every `OPTIMIZE` run, regardless of whether they're already well-clustered. For a table receiving small appends, clustering cost grows linearly with table size, not with the amount of new data.

Incremental mode solves the full-rewrite problem by selecting only files that actually need clustering:

- **Unclustered files**: Newly written data without clustering metadata
- **Small files**: Files below the target file size threshold
- **Files with deletion vectors**: Files with accumulated deletes exceeding the cleanup threshold

Already well-clustered, appropriately sized files are skipped entirely.

### Auto reclustering

Incremental liquid clustering includes automatic overlap detection, known as **auto reclustering**, to maintain clustering quality over time. As new data arrives, it can create overlap between file value ranges, degrading data skipping effectiveness. Auto reclustering detects overlapping value ranges across files and selectively reclusters only the affected files.

Auto reclustering runs automatically as part of `OPTIMIZE` whenever there's new or changed data to cluster. No manual intervention or scheduled full reclusters are required. The incremental clustering strategy maintains near-optimal clustering quality as data evolves.

### Revert to full rewrite behavior

If you need to disable the incremental clustering strategy and use the full-rewrite behavior, set the following configuration:

# [Spark SQL](#tab/sparksql)

```sql
SET spark.microsoft.delta.optimize.clustering.strategy.incremental = FALSE;

OPTIMIZE sales;
```

# [PySpark](#tab/pyspark)

```python
spark.conf.set('spark.microsoft.delta.optimize.clustering.strategy.incremental', False)
```

# [Scala](#tab/scala)

```scala
spark.conf.set("spark.microsoft.delta.optimize.clustering.strategy.incremental", "false")
```

---

Alternatively, use `OPTIMIZE FULL` for a one-time full recluster without changing session settings:

```sql
OPTIMIZE sales FULL;
```

> [!NOTE]
> The incremental clustering strategy intentionally allows minor deviation from the theoretically optimal layout to achieve significant reductions in write amplification. Running `OPTIMIZE FULL` closes that gap by fully rebuilding Z-Cubes to the theoretical optimum, but at a higher write cost.

## Configuration reference

The following session configurations control liquid clustering behavior in Fabric Runtime 2.0+.

### Incremental clustering

| Configuration | Type | Default | Description |
|---|---|---|---|
| `spark.microsoft.delta.optimize.clustering.strategy.incremental` | Boolean | `true` | Master switch for incremental clustering. When `true`, `OPTIMIZE` only processes unclustered, unhealthy, small, and deletion-vector files. When `false`, all files for Z-Cubes under 100 GB in size are rewritten (standard behavior). |
| `spark.microsoft.delta.optimize.clustering.strategy.incremental.autoRecluster` | Boolean | `true` | Enables automatic detection and reclustering of files with overlapping data ranges. Only applies when incremental clustering is enabled. |

### Auto recluster tuning

These configurations control the sensitivity and scope of auto reclustering. The defaults are suitable for most workloads. Adjust them only when you need to change the trade-off between clustering quality and write amplification.

| Configuration | Type | Default | Description |
|---|---|---|---|
| `spark.microsoft.delta.optimize.clustering.strategy.incremental.autoRecluster.minOffendingFiles` | Int | `4` | Minimum number of overlapping files required to trigger reclustering. Lower values recluster sooner (better query performance, higher write cost). Must be ≥ 2. |
| `spark.microsoft.delta.optimize.clustering.strategy.incremental.autoRecluster.minOverlapThreshold` | Double | `0.75` | Clustering dimension overlap score threshold. File pairs scoring above this value are considered overlapping. Must be in the range (0.25, 1.0]. Lower values are more aggressive. |

## Choosing clustering columns

For best results, choose clustering columns based on your most common query filter patterns:

- **Pick 1 to 4 columns** that appear frequently in `WHERE` clauses. More columns dilute the per-column file skipping effectiveness of the space-filling curve and increase the time to cluster data.
- **Consider column cardinality**. Low-cardinality columns produce fewer distinct value ranges, which reduces file skipping benefit when combined with high-cardinality clustering keys.
- **Column order has no impact on clustering**. The order of the columns specified after `CLUSTER BY` has no impact on the resulting multi-dimensional clustering.

### Supported column types

Not all column types can be used as clustering keys. The engine evaluates each column's data type to determine eligibility.

**Always eligible (atomic types):**

- `NumericType` (`ByteType`, `ShortType`, `IntegerType`, `LongType`, `FloatType`, `DoubleType`, `DecimalType`)
- `DateType`
- `TimestampType`
- `TimestampNTZType`
- `StringType`

**Conditionally eligible:**

> [!NOTE]
> The following types can be enabled starting in Fabric Spark Runtime 2.0 (Delta 4.1)

- `StructType`: when `spark.microsoft.delta.clusteredTable.complexTypes.enabled` is enabled, and all leaf fields are themselves eligible types.
- `ArrayType`: when `spark.microsoft.delta.clusteredTable.complexTypes.enabled` is enabled, and the element type is eligible.
- `MapType`: when `spark.microsoft.delta.clusteredTable.complexTypes.enabled` is enabled, and both the key and value types are orderable and eligible.

**Not eligible:**

- `BinaryType`
- `BooleanType`
- `NullType`

For the equivalent eligible types used in file-level statistics, see [File skipping—Eligible data types](delta-lake-file-skipping.md#eligible-data-types).

## Interaction with other features

| Feature | Behavior |
|---|---|
| **Partitioning** | **Incompatible**. For file skipping purposes, liquid clustering is recommended over partitioning. |
| **Z-Order** | **Incompatible**. For file skipping purposes, liquid clustering is recommended over Z-Order. |
| **Fast optimize** | Compatible starting in Runtime 2.0. In earlier runtimes, fast optimize has no effect on liquid clustered tables. During `OPTIMIZE`, skips clustering when there aren't enough small files or insufficient data to produce a healthy-sized output file. |
| **Adaptive target file size** | Compatible. The target file size set by adaptive evaluation is used as the target size for clustering. |
| **Optimize write** | Compatible. Produces consolidated files on write that are then clustered during `OPTIMIZE`. |
| **Auto compaction** | **Do not use with liquid clustering in Runtime 1.3 or earlier.** In those runtimes, every auto compaction trigger rewrites all data in Z-Cubes smaller than 100 GB, causing severe write amplification. In Runtime 2.0+, auto compaction is compatible: incremental clustering ensures only new or unhealthy files are rewritten. Auto compaction handles small-file consolidation; `OPTIMIZE` handles clustering layout. |
| **Deletion vectors** | Files exceeding the deleted-rows threshold are selected for clustering, independent of their clustering status. |
| **V-Order** | Compatible. V-Order and liquid clustering operate on different axes (file-internal layout vs. cross-file value ranges). Both can be applied together. |

## Best practices

- **Run `OPTIMIZE` regularly** after batch writes or on a schedule for streaming tables—but only in **Runtime 2.0+**, where the incremental clustering strategy makes frequent runs inexpensive. In Runtime 1.3 and earlier, every `OPTIMIZE` run rewrites all data in Z-Cubes under 100 GB, so runs should be intentional and infrequent.
- **Use `OPTIMIZE FULL` sparingly**. Reserve it for after you change clustering columns or need a one-time quality reset.
- **Monitor clustering quality** by checking query scan metrics (files scanned vs. total files) in Spark UI or query plans.
- **Combine with optimize write** for streaming workloads to ensure each micro-batch produces a manageable number of files for clustering.

## Related content

- [Table compaction](./table-compaction.md)
- [Tune file size](./tune-file-size.md)
- [Z-Order](delta-lake-zorder.md)
- [Partitioning](delta-lake-partitioning.md)
- [File skipping](delta-lake-file-skipping.md)
- [Concurrency control](delta-lake-concurrency-control.md)
- [V-Order](delta-optimization-and-v-order.md)
- [Apache Spark Runtimes in Fabric](runtime.md)
