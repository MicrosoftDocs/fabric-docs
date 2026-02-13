---
title: Cross-Workload Table Maintenance and Optimization
description: Learn how to optimize Delta tables for different consumption scenarios in Microsoft Fabric, including guidance for Spark, SQL analytics endpoint, Power BI Direct Lake, and Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dacoelho, milescole
ms.date: 02/12/2026
ms.topic: concept-article
ms.custom:
  - fabric-cat
ai-usage: ai-assisted
---

# Cross-workload table maintenance and optimization in Microsoft Fabric

Delta tables in Microsoft Fabric serve multiple consumption engines, each with different performance characteristics and optimization requirements. This guide provides a comprehensive framework for understanding how tables written by one engine are consumed by others, and how to optimize table maintenance strategies accordingly.

Understanding the relationship between write patterns and read performance across different engines is essential for building efficient data platforms. The goal is to ensure that data producers create table layouts that optimize read performance for downstream consumers, whether those consumers use Spark, SQL analytics endpoint, Power BI Direct Lake, or Warehouse.

## Write and read scenario matrix

The following table summarizes the expected performance characteristics for common write and read combinations, along with recommended optimization strategies. Use this matrix to identify your scenario and understand the relevant guidance.

| Write method | Read engine | Expected gaps | Recommended strategy |
| --- | --- | --- | --- |
| Spark batch | Spark | No gaps | [Default Spark write configurations](#spark-write-patterns) are sufficient |
| Spark batch | SQL analytics endpoint | No gaps | [Enable auto-compaction and optimize-write](#spark-write-patterns) |
| Spark streaming | Spark | Small files possible | [Auto-compaction and optimize-write](#spark-write-patterns) with [scheduled OPTIMIZE](#optimize-command) |
| Spark streaming | SQL analytics endpoint | Small files and checkpoints | [Auto-compaction, optimize-write](#spark-write-patterns), [split medallion layers](#medallion-architecture-recommendations) |
| Warehouse | Spark | No gaps | [System-managed optimization](#warehouse-write-patterns) handles layout |
| Warehouse | SQL analytics endpoint | No gaps | [System-managed optimization](#warehouse-write-patterns) handles layout |

## Optimal file layouts by engine

Different consumption engines have different optimal file layouts. Understanding these targets helps you configure write operations and maintenance jobs appropriately.

### Guidance for SQL analytics endpoint and Fabric Data Warehouse

For optimal performance with the SQL analytics endpoint and Warehouse, use the following settings:

- **Target file size**: About 400 MB per file
- **Row group size**: About 2 million rows per row group
- **V-Order**: Improves read performance by 10%

A warehouse uses these criteria to discover compaction candidates:

- Table file overhead is more than 10%
- Table logically deleted rows are more than 10%
- Table size is larger than 1,024 rows

During compaction execution, the process selects candidates based on these criteria:

- Any file is smaller than 25% of the ideal size (based on row count)
- Any file has more than 20% deleted rows

### Spark

Spark is robust when reading various file sizes. For optimal performance:

- **Target file size**: 128 MB to 1 GB depending on table size
- **Row group size**: 1 million to 2 million rows per row group
- **V-Order**: Not required for Spark read performance (can add 15-33% write overhead)

Spark reads benefit from [adaptive target file size](../data-engineering/tune-file-size.md#adaptive-target-file-size), which automatically adjusts based on table size:

- Tables under 10 GB: 128 MB target
- Tables over 10 TB: Up to 1 GB target

### Power BI Direct Lake

For optimal Direct Lake performance:

- **Target row group size**: 8 million or more rows per row group for best performance
- **V-Order**: Critical for 40-60% improvement in cold-cache queries
- **File count**: Minimize file count to reduce transcoding overhead
- **Consistent file sizes**: Important for predictable query performance

Direct Lake semantic models perform best when:

- Column data is V-Ordered for VertiPaq-compatible compression
- Row groups are large enough for efficient dictionary merging
- Deletion vectors are minimized through regular compaction

For more information, see [Understand Direct Lake query performance](direct-lake-understand-storage.md).

### Mirroring

Mirroring automatically sizes files based on table volume:

| Table size | Rows per row group | Rows per file |
| --- | --- | --- |
| Small (up to 10 GB) | 2 million | 10 million |
| Medium (10 GB to 2.56 TB) | 4 million | 60 million |
| Large (over 2.56 TB) | 8 million | 80 million |

## Write patterns and configurations

### Spark write patterns

Spark writes use the following default configurations:

| Configuration | Default value | Description |
| --- | --- | --- |
| `spark.microsoft.delta.optimizeWrite.fileSize` | 128 MB | Target file size for optimized writes |
| `spark.databricks.delta.optimizeWrite.enabled` | Varies by profile | Enables automatic file coalescing |
| `spark.databricks.delta.autoCompact.enabled` | Disabled | Enables post-write compaction |
| `spark.sql.files.maxRecordsPerFile` | Unlimited | Maximum records per file |

To configure Spark writes for downstream SQL consumption:

```python
# Enable optimize write for better file layout
spark.conf.set('spark.databricks.delta.optimizeWrite.enabled', 'true')

# Enable auto-compaction for automatic maintenance
spark.conf.set('spark.databricks.delta.autoCompact.enabled', 'true')
```

For more information on resource profiles and their defaults, see [Configure resource profile configurations](../data-engineering/configure-resource-profile-configurations.md).

### Warehouse write patterns

Warehouse automatically optimizes data layout during writes:

- V-Order is enabled by default for read optimization.
- Automatic compaction runs as a background process.
- Checkpoint management is handled automatically.

The Warehouse produces files optimized for SQL consumption without manual intervention. Tables written by the Warehouse are inherently optimized for both SQL analytics endpoint and Warehouse reads.

## Table maintenance operations

### OPTIMIZE command

The `OPTIMIZE` command consolidates small files into larger files:

```sql
-- Basic optimization
OPTIMIZE schema_name.table_name

-- Optimization with V-Order for Power BI consumption
OPTIMIZE schema_name.table_name VORDER

-- Optimization with Z-Order for specific query patterns
OPTIMIZE schema_name.table_name ZORDER BY (column1, column2)
```

> [!IMPORTANT]
> The `OPTIMIZE` command is a Spark SQL command. You must run it in Spark environments such as notebooks, Spark job definitions, or the Lakehouse Maintenance interface. The SQL analytics endpoint and Warehouse SQL query editor don't support this command.

For more information, see [Table compaction](../data-engineering/table-compaction.md).

### Auto compaction

Auto compaction automatically evaluates partition health after each write operation and triggers synchronous optimization when file fragmentation is detected:

```python
# Enable at session level
spark.conf.set('spark.databricks.delta.autoCompact.enabled', 'true')

# Enable at table level
spark.sql("""
    ALTER TABLE schema_name.table_name 
    SET TBLPROPERTIES ('delta.autoOptimize.autoCompact' = 'true')
""")
```

Use auto compaction for ingestion pipelines with frequent small writes (streaming or microbatch) to avoid manual scheduling and keep files compacted automatically.

Auto compaction and optimize write typically produce the best results when used together. Optimize write reduces the number of small files written, and auto compaction handles the remaining fragmentation.

For more information, see [Auto compaction](../data-engineering/table-compaction.md#auto-compaction).

### Optimize write

Optimize write reduces small-file overhead by performing pre-write compaction, which generates fewer, larger files:

```python
# Enable at session level
spark.conf.set('spark.databricks.delta.optimizeWrite.enabled', 'true')

# Enable at table level
spark.sql("""
    ALTER TABLE schema_name.table_name 
    SET TBLPROPERTIES ('delta.autoOptimize.optimizeWrite' = 'true')
""")
```

Optimize write is beneficial for:

- Partitioned tables
- Tables with frequent small inserts
- Operations that touch many files (`MERGE`, `UPDATE`, `DELETE`)

Pre-write compaction (optimize write) is generally less costly than post-write compaction (optimize). For more information, see [Optimize write](../data-engineering/tune-file-size.md#optimize-write).

### VACUUM command

The `VACUUM` command removes old files that a Delta table log no longer references:

```sql
-- Remove files older than the default retention period (7 days)
VACUUM schema_name.table_name

-- Remove files older than specified hours
VACUUM schema_name.table_name RETAIN 168 HOURS
```

The default retention period is seven days. Setting shorter retention periods affects Delta's time travel capabilities and can cause issues with concurrent readers or writers.

For more information, see [Lakehouse table maintenance](../data-engineering/lakehouse-table-maintenance.md#table-maintenance-operations).

## V-Order optimization

V-Order is a write-time optimization that applies VertiPaq-compatible sorting, encoding, and compression to Parquet files:

- **Power BI Direct Lake**: 40-60% improvement in cold-cache queries
- **SQL analytics endpoint and Warehouse**: Approximately 10% read performance improvement
- **Spark**: No inherent read benefit; 15-33% slower writes

### When to enable V-Order

V-Order provides the most benefit for:

- Gold-layer tables serving Power BI Direct Lake
- Tables frequently queried through SQL analytics endpoint
- Read-heavy workloads where write performance is less critical

### When to avoid V-Order

Consider disabling V-Order for:

- Bronze-layer tables focused on ingestion speed
- Spark-to-Spark pipelines where SQL and Power BI don't consume the data
- Write-heavy workloads where data latency is critical

### Configure V-Order

V-Order is disabled by default in new Fabric workspaces. To enable:

```python
# Enable at session level (default for all writes)
spark.conf.set('spark.sql.parquet.vorder.default', 'true')

# Enable at table level
spark.sql("""
    ALTER TABLE schema_name.table_name 
    SET TBLPROPERTIES ('delta.parquet.vorder.enabled' = 'true')
""")
```

To selectively apply V-Order based on Direct Lake consumption, consider automating V-Order enablement for tables used in Direct Lake semantic models. Tables not consumed by Direct Lake can remain without V-Order for better write performance.

For more information, see [Delta Lake table optimization and V-Order](../data-engineering/delta-optimization-and-v-order.md).

## Liquid Clustering and Z-Order

### Liquid Clustering

Liquid Clustering is the recommended approach for data organization. Unlike traditional partitioning, Liquid Clustering:

- Adapts to changing query patterns
- Requires `OPTIMIZE` to apply clustering
- Provides better file skipping for filtered queries

Enable Liquid Clustering at table creation:

```sql
CREATE TABLE schema_name.table_name (
    id INT,
    category STRING,
    created_date DATE
) CLUSTER BY (category)
```

### Z-Order

Z-Order colocates related data in the same files, so you get better query performance on filter predicates.

```sql
OPTIMIZE schema_name.table_name ZORDER BY (column1, column2)
```

Use Z-Order when:

- Your table is partitioned, because Liquid Clustering doesn't work with partitioned tables.
- Your queries often filter on two or more columns together.
- Your predicates are selective enough to benefit from file skipping.

## Medallion architecture recommendations

The medallion architecture (Bronze, Silver, Gold layers) provides a framework for optimizing table maintenance strategies based on the purpose of each layer.

### Bronze layer (landing zone)

Bronze tables focus on write performance and low-latency ingestion:

- **Optimization priority**: Ingestion speed over read performance
- **Partitioning**: Acceptable but discouraged for new implementations
- **Small files**: Acceptable as the focus is on ingestion speed
- **V-Order**: Not recommended (adds write overhead)
- **Auto-compaction**: Enable to reduce small files, but can be sacrificed for ingestion speed
- **Deletion vectors**: Enable for tables with merge patterns

Bronze tables should not be served directly to SQL analytics endpoint or Power BI Direct Lake consumers.

### Silver layer (curated zone)

Silver tables balance write and read performance:

- **Optimization priority**: Balance between ingestion and query performance
- **File sizes**: Moderate (128-256 MB) to support both write and read operations
- **V-Order**: Optional; enable if SQL analytics endpoint or Power BI consumption is significant
- **Liquid Clustering or Z-Order**: Recommended to enhance query performance
- **Auto-compaction and optimize-write**: Enable based on downstream requirements
- **Deletion vectors**: Enable for tables with frequent updates
- **Scheduled OPTIMIZE**: Run aggressively to maintain file layout

### Gold layer (serving zone)

Gold tables prioritize read performance for end-user consumption:

- **Optimization priority**: Read performance for analytics
- **File sizes**: Large (400 MB to 1 GB) for optimal SQL and Power BI performance
- **V-Order**: Required for Power BI Direct Lake; beneficial for SQL analytics endpoint
- **Liquid Clustering**: Required for optimal file skipping
- **Optimize-write**: Required for consistent file sizes
- **Scheduled OPTIMIZE**: Run aggressively to maintain optimal layout

Optimize gold tables differently based on the primary consumption engine:

| Consumption engine | V-Order | Target file size | Row group size |
| --- | --- | --- | --- |
| SQL analytics endpoint | Yes | 400 MB | 2 million rows |
| Power BI Direct Lake | Yes | 400 MB to 1 GB | 8+ million rows |
| Spark | Optional | 128 MB to 1 GB | 1-2 million rows |

### Multiple table copies

It's acceptable to maintain multiple copies of tables optimized for different consumption patterns:

- A Silver table optimized for Spark processing
- A Gold table optimized for SQL analytics endpoint and Power BI Direct Lake
- Data pipelines that transform and place the right structure at each layer

Storage is inexpensive relative to compute. Optimizing tables for their consumption patterns provides a better user experience than trying to serve all consumers from a single table layout.

## Identify table health

Before optimizing tables, assess current table health to understand optimization needs.

### Inspect Parquet files directly

You can browse the table folder in OneLake to inspect the sizes of individual Parquet files. Healthy tables have evenly distributed file sizes. Look for:

- **Consistent file sizes**: Files should be roughly the same size (within 2x of each other).
- **No extremely small files**: Files under 25 MB indicate fragmentation.
- **No extremely large files**: Files over 2 GB can reduce parallelism.

Uneven file size distribution often indicates missing compaction or inconsistent write patterns across different jobs.

### OPTIMIZE DRY RUN in Spark SQL

Use the `DRY RUN` option to preview which files are eligible for optimization without executing the compaction:

```sql
-- Preview files eligible for optimization
OPTIMIZE schema_name.table_name DRY RUN
```

The command returns a list of files that would be rewritten during optimization. Use this to:

- Assess the scope of optimization before running it.
- Understand file fragmentation without modifying the table.
- Estimate optimization time based on the number of files affected.

### File size distribution

Use the following approach to analyze file sizes and distribution:

```python
from delta.tables import DeltaTable

# Get table details
details = spark.sql("DESCRIBE DETAIL schema_name.table_name").collect()[0]
print(f"Table size: {details['sizeInBytes'] / (1024**3):.2f} GB")
print(f"Number of files: {details['numFiles']}")

# Average file size
avg_file_size_mb = (details['sizeInBytes'] / details['numFiles']) / (1024**2)
print(f"Average file size: {avg_file_size_mb:.2f} MB")
```

The distribution can be skewed, as files close to the head of the table or from a specific partition might not be optimized.

You can assess the distribution by running a query that groups by the partitioning or clustering keys of the table.

### Determine optimization needs

Based on the consumption engine, compare actual file sizes to target sizes:

| Engine | Target file size | If files are smaller | If files are larger |
| --- | --- | --- | --- |
| SQL analytics endpoint | 400 MB | Run `OPTIMIZE` | Files are acceptable |
| Power BI Direct Lake | 400 MB to 1 GB | Run `OPTIMIZE VORDER` | Files are acceptable |
| Spark | 128 MB to 1 GB | Enable auto-compaction | Files are acceptable |

### Table history and transaction log

Review table history to understand write patterns and maintenance frequency:

```sql
-- View table history
DESCRIBE HISTORY schema_name.table_name

-- Check for auto-compaction runs
-- Auto-compaction shows as OPTIMIZE with auto=true in operationParameters
```

## Configuration best practices

### Use table properties over session configurations

Table properties persist across sessions and ensure consistent behavior across all jobs and writers:

```python
# Recommended: Set at table level for consistency
spark.sql("""
    CREATE TABLE schema_name.optimized_table (
        id INT,
        data STRING
    )
    TBLPROPERTIES (
        'delta.autoOptimize.optimizeWrite' = 'true',
        'delta.autoOptimize.autoCompact' = 'true',
        'delta.parquet.vorder.enabled' = 'true'
    )
""")
```

Session-level configurations only apply to the current Spark session and can cause inconsistent writes if different sessions use different configurations.

### Enable adaptive target file size

Adaptive target file size automatically adjusts file size targets based on table size:

```python
spark.conf.set('spark.microsoft.delta.targetFileSize.adaptive.enabled', 'true')
```

This feature:

- Starts with smaller files (128 MB) for small tables
- Scales up to 1 GB for tables over 10 TB
- Automatically re-evaluates during `OPTIMIZE` operations

### Enable file-level compaction targets

Prevent rewriting previously compacted files when target sizes change:

```python
spark.conf.set('spark.microsoft.delta.optimize.fileLevelTarget.enabled', 'true')
```

## Summary of recommendations

| Layer | Auto-compaction | Optimize-write | V-Order | Liquid Clustering | Scheduled OPTIMIZE |
| --- | --- | --- | --- | --- | --- |
| Bronze | Enable (optional) | Enable | No | No | Optional |
| Silver | Enable | Enable | Optional | Yes | Aggressive |
| Gold | Enable | Enable | Yes | Yes | Aggressive |

For specific scenarios, use the following recommendations:

- **Spark-to-Spark**: Focus on file size optimization; V-Order optional.
- **Spark-to-SQL**: Enable optimize-write and auto-compaction; target 400 MB files with 2 million row groups.
- **Streaming ingestion**: Enable auto-compaction; schedule additional `OPTIMIZE` jobs for SQL consumers.
- **Power BI Direct Lake**: Enable V-Order; target 8+ million row groups; run `OPTIMIZE VORDER`.

## Related content

- [Delta Lake table optimization and V-Order](../data-engineering/delta-optimization-and-v-order.md)
- [Table compaction](../data-engineering/table-compaction.md)
- [Tune file size](../data-engineering/tune-file-size.md)
- [Lakehouse table maintenance](../data-engineering/lakehouse-table-maintenance.md)
- [SQL analytics endpoint performance considerations](../data-warehouse/sql-analytics-endpoint-performance.md)
- [Performance guidelines in Fabric Data Warehouse](../data-warehouse/guidelines-warehouse-performance.md)
- [Understand Direct Lake query performance](direct-lake-understand-storage.md)
