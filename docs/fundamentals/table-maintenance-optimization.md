---
title: Cross-Workload Table Maintenance and Optimization in Microsoft Fabric
description: Learn how to maintain and optimize Delta tables across Spark, SQL analytics endpoint, Power BI Direct Lake, Warehouse, and Mirroring workloads in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: dacoelho, milescole
ms.date: 08/25/2026
ms.topic: concept-article
ms.custom:
  - fabric-cat
ai-usage: ai-assisted
---

# Cross-workload table maintenance and optimization in Microsoft Fabric

Delta tables in Microsoft Fabric can serve Spark, SQL analytics endpoint, Power BI Direct Lake, Warehouse, and other Fabric experiences from data stored in OneLake. Optimal cross-workload performance depends on two factors:

- The workload that creates and maintains the table.
- The engines that consume the table.

Lakehouse tables are commonly managed by Spark, [Fabric pipeline Copy activity](../data-factory/copy-data-activity.md), or [Dataflow Gen2](../data-factory/dataflows-gen2-overview.md). Spark is the most common writer and provides the broadest layout and maintenance controls. Warehouse and database mirroring manage their physical layouts automatically. Mirrored catalogs retain the layout managed in the source system. Consumer requirements are generally compatible, but [Power BI Direct Lake](direct-lake-overview.md) has additional [storage requirements](direct-lake-understand-storage.md#what-affects-direct-lake-query-performance) for optimal performance.

Use one shared table whenever its requirements are compatible. For the exceptions that justify another table, see [When to create another table](#when-to-create-another-table).

## Understand layout ownership

Start by identifying which workload owns the physical table layout. The controls in the following table are the key controls relevant to cross-workload table layout and maintenance, not an exhaustive list of each engine's capabilities.

| Data store | Writer or ingestion method | Layout and maintenance ownership | Key controls |
| --- | --- | --- | --- |
| Lakehouse | Spark | User-managed | **File sizing**: [adaptive target file size](../data-engineering/tune-file-size.md#adaptive-target-file-size) and [file-level compaction targets](../data-engineering/table-compaction.md#file-level-compaction-targets). <br>**Write and maintenance**: [deletion vectors](../data-engineering/delta-lake-deletion-vectors.md), [auto compaction](../data-engineering/table-compaction.md#auto-compaction), [optimize write](../data-engineering/tune-file-size.md#optimize-write), [`OPTIMIZE`](../data-engineering/table-compaction.md#optimize-command), and [`VACUUM`](../data-engineering/delta-lake-vacuum.md). <br>**Data organization**: [liquid clustering](../data-engineering/liquid-clustering.md), [partitioning](../data-engineering/delta-lake-partitioning.md), [Z-Order](../data-engineering/table-compaction.md#optimize-with-z-order), and [V-Order](../data-engineering/delta-optimization-and-v-order.md). |
| Lakehouse | Fabric pipeline Copy activity or Dataflow Gen2 | The service writes the data; the lakehouse owner maintains the table | Destination-specific write settings. Run compatible maintenance separately by using Spark, [Lakehouse maintenance](../data-engineering/lakehouse-table-maintenance.md), or a [pipeline maintenance activity](../data-factory/lakehouse-maintenance-activity.md). |
| Warehouse | Fabric Data Warehouse, Fabric pipeline Copy activity, or Dataflow Gen2 | Warehouse-managed | [Data clustering](../data-warehouse/data-clustering.md) and the [warehouse-level V-Order setting](../data-warehouse/disable-v-order.md). |
| Mirrored item | Mirroring service | Depends on the [mirroring type](../mirroring/overview.md) | Database mirroring uses a system-managed V-Ordered Delta layout with no direct layout controls. Mirrored catalogs retain the source file layout, which you can optimize in the source system when supported. |

## Cross-workload guidance

The following table summarizes the recommended approach by producer and consumer.

| Producer | Consumer | Recommended approach |
| --- | --- | --- |
| Lakehouse: Spark writer | Spark | Use [Fabric Spark runtime 2.0](../data-engineering/runtime-2-0.md) or later defaults and enable [auto compaction](../data-engineering/table-compaction.md#auto-compaction). Consider [liquid clustering](../data-engineering/liquid-clustering.md) when measured predicates benefit from improved [file skipping](../data-engineering/delta-lake-file-skipping.md). |
| Lakehouse: Spark writer | SQL analytics endpoint | Use the same layout recommended for Spark. Don't set a static target file size, arbitrary row limit, or [V-Order](../data-engineering/delta-optimization-and-v-order.md) solely for SQL analytics endpoint performance. |
| Lakehouse: Spark writer | Power BI Direct Lake | Use the same layout recommended for Spark and additionally enable [V-Order](../data-engineering/delta-optimization-and-v-order.md), or use the [`readHeavyForPBI` resource profile](../data-engineering/configure-resource-profile-configurations.md#available-resource-profiles). |
| Lakehouse: Fabric pipeline or Dataflow Gen2 writer | Spark, SQL analytics endpoint, or Power BI Direct Lake | Monitor the resulting file layout and schedule compatible lakehouse maintenance separately. Some destination modes, such as Dataflow Gen2 incremental refresh, impose maintenance restrictions. |
| Warehouse | Fabric Data Warehouse or Spark | Use the system-managed layout. Fabric Data Warehouse [automatically manages compaction and other maintenance](../data-warehouse/guidelines-warehouse-performance.md). Use [data clustering](../data-warehouse/data-clustering.md) to improve file skipping for workloads with recurring selective predicates. |
| Warehouse | Power BI Direct Lake | Keep the [default Warehouse V-Order setting](../data-warehouse/guidelines-warehouse-performance.md#v-order-in-fabric-data-warehouse). Use [data clustering](../data-warehouse/data-clustering.md) when it benefits shared query patterns. |
| Mirroring | Spark, SQL analytics endpoint, or Power BI Direct Lake | For database mirroring, use the system-managed V-Ordered Delta layout. For mirrored catalogs, optimize the underlying files in the source system when supported. See [What is Mirroring in Fabric?](../mirroring/overview.md). |

## Optimize Lakehouse tables

Lakehouse Delta tables require an explicit maintenance strategy regardless of whether Spark, Pipeline Copy activity, or Dataflow Gen2 writes them. Spark is the primary example in this section because it provides the broadest layout and maintenance controls in Fabric.

> [!IMPORTANT]
> Table maintenance is critical for optimal write and read performance across engines. Even append-only workloads that initially perform well without maintenance can accumulate excessive small files, which affect Spark, SQL analytics endpoint, Direct Lake, and external data readers. See [Compacting Delta tables](../data-engineering/table-compaction.md) for automatic and manual compaction methods.

### Use the Spark runtime defaults

When Spark writes the table, use [Fabric Spark runtime 2.0](../data-engineering/runtime-2-0.md) or later defaults:

- Keep [adaptive target file size](../data-engineering/tune-file-size.md#adaptive-target-file-size) enabled. It automatically selects a target for each table from 128 MB to 1 GB.
- Keep [file-level compaction targets](../data-engineering/table-compaction.md#file-level-compaction-targets) enabled to avoid rewriting files that met an earlier adaptive target.
- Keep [deletion vectors](../data-engineering/delta-lake-deletion-vectors.md) enabled.
- Don't impose an arbitrary maximum row count per file. Row width varies, so a row limit can create excessive small files for narrow tables.

In Fabric Spark runtime 1.3, [adaptive target file size](../data-engineering/tune-file-size.md#adaptive-target-file-size), [file-level compaction targets](../data-engineering/table-compaction.md#file-level-compaction-targets), and [deletion vectors](../data-engineering/delta-lake-deletion-vectors.md) are available as opt-in settings.

When Pipeline Copy activity or Dataflow Gen2 writes the table, inspect the resulting file layout and schedule maintenance separately. Don't assume that these writers apply Spark runtime defaults.

- Fabric pipelines can orchestrate a [Lakehouse maintenance activity](../data-factory/lakehouse-maintenance-activity.md) after writes.

> [!IMPORTANT]
> Dataflow Gen2 lakehouse destinations that use incremental refresh don't support [`OPTIMIZE`](../data-engineering/table-compaction.md#optimize-command) or [`REORG TABLE`](../data-engineering/delta-lake-deletion-vectors.md#use-reorg-purge-to-remove-accumulated-deletion-vectors). Follow the [Dataflow Gen2 incremental refresh limitations](../data-factory/dataflow-gen2-incremental-refresh.md#lakehouse-support-comes-with-additional-caveats).

### Prevent and compact small files

For Spark-written tables, prefer [auto compaction](../data-engineering/table-compaction.md#auto-compaction). This feature evaluates table fragmentation after writes and runs compaction only when needed. It eliminates the need for a separate table-health check before maintenance runs.

Use the following guidance for exceptions and complementary features:

| Scenario | Recommended approach |
| --- | --- |
| Spark-written table | Enable [auto compaction](../data-engineering/table-compaction.md#auto-compaction) as the default maintenance strategy. |
| Streaming or microbatch writes | Enable [auto compaction](../data-engineering/table-compaction.md#auto-compaction) and [optimize write](../data-engineering/tune-file-size.md#optimize-write) to reduce small-file accumulation. |
| Workloads with strict write-latency requirements | Schedule [`OPTIMIZE`](../data-engineering/table-compaction.md#choose-between-auto-compaction-and-scheduled-optimize) separately instead of running synchronous [auto compaction](../data-engineering/table-compaction.md#auto-compaction). |
| Existing table with accumulated small files | Run a one-time [`OPTIMIZE`](../data-engineering/table-compaction.md#optimize-command), then enable [auto compaction](../data-engineering/table-compaction.md#auto-compaction) for ongoing maintenance. |
| Tables with frequent updates, deletes, or merges | Keep [deletion vectors](../data-engineering/delta-lake-deletion-vectors.md) and [auto compaction](../data-engineering/table-compaction.md#auto-compaction) enabled. |

[`OPTIMIZE`](../data-engineering/table-compaction.md#optimize-command) compacts files and automatically purges a file's deletion vectors when more than 5% of its records are referenced by deletion vectors. Use [`REORG TABLE ... APPLY (PURGE)`](../data-engineering/delta-lake-deletion-vectors.md#use-reorg-purge-to-remove-accumulated-deletion-vectors) only when you must physically purge records below that threshold or meet a specific compliance requirement.

> [!NOTE]
> [Auto compaction](../data-engineering/table-compaction.md#auto-compaction) purges [deletion vectors](../data-engineering/delta-lake-deletion-vectors.md) only when the partition also meets its small-file trigger. If a workload performs updates or deletes without generating small files, periodically run [`OPTIMIZE`](../data-engineering/table-compaction.md#optimize-command) to purge qualifying deletion vectors. Use [`REORG TABLE ... APPLY (PURGE)`](../data-engineering/delta-lake-deletion-vectors.md#use-reorg-purge-to-remove-accumulated-deletion-vectors) when you must force a physical purge.

Run [`VACUUM`](../data-engineering/delta-lake-vacuum.md) on a separate schedule to remove unreferenced files after the retention period. `VACUUM` reclaims storage but doesn't improve the active file layout.

> [!WARNING]
> Don't shorten the [`VACUUM`](../data-engineering/delta-lake-vacuum.md#default-retention-period) retention period without evaluating time-travel requirements and concurrent readers or writers. Removing files too early can make required table versions unavailable.

### Organize data for file skipping

Use [liquid clustering](../data-engineering/liquid-clustering.md) when recurring filter or processing patterns benefit from improved [file skipping](../data-engineering/delta-lake-file-skipping.md). Liquid clustered tables require [`OPTIMIZE`](../data-engineering/liquid-clustering.md#apply-clustering-with-optimize)or [auto compaction](../data-engineering/table-compaction.md#auto-compaction) to organize newly written data.

Avoid partitioning by default. Use it when a specific requirement justifies the operational tradeoffs, such as isolating concurrent writers that update, delete, or merge data across disjoint partitions. For more information, see [When to use partitioning](../data-engineering/delta-lake-partitioning.md#when-to-use-partitioning).

For existing partitioned tables, consider [Z-Order](../data-engineering/table-compaction.md#optimize-with-z-order) when selective predicates commonly filter on the same columns within a partition.

## Optimize Warehouse-managed tables

Fabric Data Warehouse manages the physical Delta table layout regardless of the ingestion method.

Use the strategic controls that Warehouse exposes to tune the data layout:

- Apply [data clustering](../data-warehouse/data-clustering.md) to large tables when queries repeatedly use selective predicates on the same columns.
- Keep [V-Order](../data-warehouse/guidelines-warehouse-performance.md#v-order-in-fabric-data-warehouse) enabled for read-oriented and mixed workloads. V-Order is enabled by default.
- Consider [disabling V-Order](../data-warehouse/disable-v-order.md) for write-intensive warehouse workloads.

> [!WARNING]
> [Disabling V-Order](../data-warehouse/disable-v-order.md) is a warehouse-level, irreversible operation. Test the complete read and write workload before disabling it.

For complete Warehouse guidance, see [Performance guidelines in Fabric Data Warehouse](../data-warehouse/guidelines-warehouse-performance.md).

## Optimize mirrored data

Your ability to improve the physical layout depends on whether Fabric replicates the data or references source files:

- **[Database mirroring](../mirroring/overview.md#how-does-database-mirroring-work)**: Fabric replicates source data into Delta tables in OneLake and manages the V-Ordered file layout and maintenance. You can't directly configure target file size, deletion-vector cleanup, liquid clustering, partitioning, or V-Order on the mirrored destination.
- **Mirrored catalogs**: Fabric synchronizes metadata and uses [OneLake shortcuts](../onelake/onelake-shortcuts.md) to reference source data in place. Fabric doesn't rewrite or maintain these files. Improve the physical layout and cleanup in the source system when its supported features allow it. Those changes are visible through the shortcuts without creating another copy in Fabric.

For database-mirrored data:

- Use selective predicates and avoid unnecessary columns in Spark and SQL queries.
- Design Power BI semantic models and DAX measures for efficient [Direct Lake consumption](direct-lake-understand-storage.md).

For mirrored catalogs:

- Use the source platform's supported table-maintenance and layout features.
- Evaluate the source file and row-group distribution for the Fabric consumers that query the shortcuts.
- For [Direct Lake](direct-lake-overview.md), evaluate creating an additional dimensionally modeled, [V-Ordered](../data-engineering/delta-optimization-and-v-order.md) serving layer when the source layout can't meet performance requirements.

For mirroring concepts, types, and supported sources, see [What is Mirroring in Fabric?](../mirroring/overview.md) and [How metadata mirroring works](../mirroring/overview.md#how-does-metadata-mirroring-work).

## Apply consumer-specific optimization

Spark and SQL analytics endpoint perform well on the same adaptive lakehouse layout. Use [adaptive target file size](../data-engineering/tune-file-size.md#adaptive-target-file-size), prevent excessive small files, and apply [liquid clustering](../data-engineering/liquid-clustering.md) when measured predicates benefit from improved [file skipping](../data-engineering/delta-lake-file-skipping.md). Don't enable [V-Order](../data-engineering/delta-optimization-and-v-order.md) solely for Spark or SQL analytics endpoint performance. For engine-specific details, see [SQL analytics endpoint performance considerations](../data-engineering/sql-analytics-endpoint-performance.md).

### Power BI Direct Lake

Direct Lake uses the same underlying Delta tables but adds recommendations related to transcoding and [incremental framing](direct-lake-understand-storage.md#incremental-framing):

- **File and row-group layout**: Avoid small [row groups](direct-lake-understand-storage.md#row-group-size) and uneven row group distribution, this creates more VertiPaq column segments and increases transcoding overhead.
- **V-Order**: Follow the producer-specific recommendation in the [cross-workload guidance](#cross-workload-guidance). For Spark-written tables primarily consumed through Direct Lake, enable [V-Order](../data-engineering/delta-optimization-and-v-order.md) or use the [`readHeavyForPBI` resource profile](../data-engineering/configure-resource-profile-configurations.md#available-resource-profiles).
- **Update patterns**: Prefer [append-friendly update patterns](direct-lake-understand-storage.md#delta-table-update-patterns) where possible to preserve existing Parquet files and support incremental framing.

> [!NOTE]
> Direct Lake generally performs best with row groups between 1 million and 16 million rows. Evaluate row-group distribution and Direct Lake performance before changing a supported producer setting.

For Spark-written tables, `spark.sql.parquet.native.writer.maxRowGroupRowCount` sets the maximum rows per row group when the [native execution engine](../data-engineering/native-execution-engine-overview.md) writes the Parquet files. The default value is `0`, which doesn't impose a maximum. If analysis shows that row-group sizing is affecting Direct Lake performance, set a tested limit before writing or rewriting the table. For example:

```python
spark.conf.set("spark.sql.parquet.native.writer.maxRowGroupRowCount", 8_000_000)
```

Don't set the limit solely to reach a specific row count. Row width, compression, file distribution, and capacity parallelism also affect performance. Use [Delta Analyzer](direct-lake-understand-storage.md#analyzing-delta-table-updates) to evaluate the resulting layout.

For detailed guidance on framing, transcoding, row groups, update patterns, and [Delta Analyzer](direct-lake-understand-storage.md#analyzing-delta-table-updates), see [Understand Direct Lake query performance](direct-lake-understand-storage.md).

## Apply the guidance to medallion layers

Bronze, Silver, and Gold describe data purpose and refinement. They don't determine whether layout is user-managed or system-managed, and they don't require separate copies for each consumer.

| Layer | Primary goal | Cross-workload guidance |
| --- | --- | --- |
| Bronze (landing) | Preserve source fidelity and ingestion throughput | Prioritize write throughput while maintaining Spark-written tables with [auto compaction](../data-engineering/table-compaction.md#auto-compaction). Avoid Power BI Direct Lake semantic models on raw Bronze tables unless the model and data shape are intentionally designed for that use. |
| Silver (curated) | Provide validated, conformed data for reuse | Reuse the table across compatible Fabric consumers. For Spark-written lakehouse tables, enable [V-Order](../data-engineering/delta-optimization-and-v-order.md) only when Direct Lake is a primary consumer. |
| Gold (serving) | Serve business-ready dimensions, facts, aggregates, and analytics models | Prefer this layer for [Direct Lake semantic models](direct-lake-overview.md). Reuse the table across compatible consumers and apply the producer-specific controls described in this article. |

## Resolve layout and maintenance issues

Use producer-aware remediation. Apply Spark maintenance commands to lakehouse tables when the destination mode supports those operations. Treat the signals as indicators rather than universal thresholds, and validate them against the table's write pattern and consumer performance.

| Condition | Signal | Lakehouse table | Warehouse table |
| --- | --- | --- | --- |
| Excessive small files | File count rises faster than active table size, and files remain below the adaptive target. | With Spark, run a one-time [`OPTIMIZE`](../data-engineering/table-compaction.md#optimize-command) for the existing backlog, then enable [auto compaction](../data-engineering/table-compaction.md#auto-compaction). For Pipeline Copy activity or Dataflow Gen2 writes, schedule supported lakehouse maintenance separately. | No action. Warehouse compaction is automatic. |
| Legacy oversized files | Files remain much higher than the current adaptive target, and too few files limit scan parallelism. | Rewrite the table by using an overwrite or `CREATE OR REPLACE TABLE AS SELECT` with [adaptive target file size](../data-engineering/tune-file-size.md#understand-evaluation-behavior) enabled. | No action. Warehouse manages file size automatically. |
| Deletion-vector accumulation | [`DESCRIBE HISTORY` metrics](../data-engineering/delta-lake-describe.md#understand-describe-history-output) show deletion vectors being added or updated faster than compaction removes them, potentially increasing [read overhead](../data-engineering/delta-lake-deletion-vectors.md#read-performance). | Keep [auto compaction](../data-engineering/table-compaction.md#auto-compaction) enabled. If deletion vectors accumulate without triggering small-file compaction, schedule [`OPTIMIZE`](../data-engineering/table-compaction.md#optimize-command). Use [`REORG TABLE ... APPLY (PURGE)`](../data-engineering/delta-lake-deletion-vectors.md#use-reorg-purge-to-remove-accumulated-deletion-vectors) only for explicit purge requirements. | No action. Cleanup is system-managed. |
| Poor file skipping | Selective predicates scan a large share of the table, or [clustering-quality evaluation](../data-engineering/liquid-clustering.md#evaluate-clustering-quality) shows poor organization. | With Spark, configure [liquid clustering](../data-engineering/liquid-clustering.md) or use [Z-Order](../data-engineering/table-compaction.md#optimize-with-z-order) for an existing partitioned table. | Configure [Warehouse data clustering](../data-warehouse/data-clustering.md). |
| Direct Lake transcoding overhead | [Delta Analyzer](direct-lake-understand-storage.md#analyzing-delta-table-updates) shows excessive files, small row groups, or broad retranscoding after updates. | Compact small files, review [row groups](direct-lake-understand-storage.md#row-group-size), and apply [V-Order](../data-engineering/delta-optimization-and-v-order.md) to Spark-written tables. Optionally, configure [liquid clustering](../data-engineering/liquid-clustering.md) to improve compression quality within Parquet files. | Keep [V-Order](../data-warehouse/guidelines-warehouse-performance.md#v-order-in-fabric-data-warehouse) enabled and evaluate [data clustering](../data-warehouse/data-clustering.md). |
| Unreferenced file storage growth | OneLake storage grows faster than active table size after data-changing operations. | Run [`VACUUM`](../data-engineering/delta-lake-vacuum.md) according to retention requirements. | No action. Cleanup is system-managed. |

For mirrored data, follow the producer-specific remediation in [Optimize mirrored data](#optimize-mirrored-data). Database mirroring is system-managed; for mirrored catalogs, apply supported maintenance in the source platform.

For lakehouse tables, Spark-supported inspection options include:

- Run [`DESCRIBE DETAIL`](../data-engineering/delta-lake-describe.md) to inspect file count, total size, and the evaluated `delta.targetFileSize.adaptive` property.
- Run [`DESCRIBE HISTORY`](../data-engineering/delta-lake-describe.md#use-describe-history) to review write patterns and maintenance history.
- Use [Delta Analyzer](direct-lake-understand-storage.md#analyzing-delta-table-updates) when you need detailed Direct Lake row group and update-pattern analysis.

### Inspect average file size

Use [`DESCRIBE DETAIL`](../data-engineering/delta-lake-describe.md) to calculate the average file size as an initial indicator of the table layout:

```python
details = spark.sql("DESCRIBE DETAIL schema_name.table_name").first()

table_size_gb = details["sizeInBytes"] / (1024**3)
num_files = details["numFiles"]
avg_file_size_mb = (
    details["sizeInBytes"] / num_files / (1024**2)
    if num_files
    else 0
)

print(f"Table size: {table_size_gb:.2f} GB")
print(f"Number of files: {num_files}")
print(f"Average file size: {avg_file_size_mb:.2f} MB")
```

An average can hide skew between partitions or recent and previously compacted files. If the average indicates a possible layout issue, inspect the individual Parquet files or use [Delta Analyzer](direct-lake-understand-storage.md#analyzing-delta-table-updates) to evaluate the distribution before changing maintenance settings.

## When to create another table

Don't create another physical table solely because multiple Fabric engines consume the data.

Create another table when it has an independent purpose, such as:

- A transformation or aggregation that changes the data's grain or business meaning.
- Different security, retention, or data-quality requirements.
- A latency or refresh requirement that the shared table can't meet.
- A consumer-specific layout whose measured benefit outweighs its storage, processing, lineage, and governance costs.

## Related content

- [Tune the size of Delta table data files](../data-engineering/tune-file-size.md)
- [Compacting Delta tables](../data-engineering/table-compaction.md)
- [Deletion vectors for Delta tables](../data-engineering/delta-lake-deletion-vectors.md)
- [Apply liquid clustering on Delta tables](../data-engineering/liquid-clustering.md)
- [Partitioning for Delta tables](../data-engineering/delta-lake-partitioning.md)
- [Optimize Delta Lake tables with V-Order](../data-engineering/delta-optimization-and-v-order.md)
- [SQL analytics endpoint performance considerations](../data-engineering/sql-analytics-endpoint-performance.md)
- [Understand Direct Lake query performance](direct-lake-understand-storage.md)
- [Performance guidelines in Fabric Data Warehouse](../data-warehouse/guidelines-warehouse-performance.md)
- [Data clustering in Fabric Data Warehouse](../data-warehouse/data-clustering.md)
- [What is Mirroring in Fabric?](../mirroring/overview.md)
