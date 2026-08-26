---
title: SQL Analytics Endpoint Performance Considerations
description: Learn more about performance considerations for the SQL analytics endpoint of a lakehouse in Microsoft Fabric.
ms.reviewer: procha, anphil, maprycem, amasingh
ms.date: 08/07/2026
ms.topic: concept-article
ms.search.form: Optimization # This article's title should not change. If so, contact engineering.
ai-usage: ai-assisted
---
# SQL analytics endpoint performance considerations

The [SQL analytics endpoint](lakehouse-sql-analytics-endpoint.md) enables you to query data in the lakehouse by using T-SQL language and TDS protocol.

> [!TIP]
> For comprehensive cross-workload guidance on optimizing Delta tables for SQL analytics endpoint consumption, including file size and row group recommendations, see [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md).

Every lakehouse has one SQL analytics endpoint. The number of SQL analytics endpoints in a workspace matches the number of [lakehouses](../data-engineering/lakehouse-overview.md) and [mirrored databases](../mirroring/overview.md) provisioned in that one workspace.

A background process is responsible for scanning the lakehouse for changes and keeping the SQL analytics endpoint up-to-date for all the changes committed to lakehouses in a workspace. The Fabric platform transparently manages the sync process. When a change is detected in a lakehouse, a background process updates metadata and the SQL analytics endpoint reflects the changes committed to lakehouse tables. Under normal operating conditions, the lag between a lakehouse and SQL analytics endpoint is less than one minute. The actual length of time can vary from a few seconds to minutes depending on many factors that this article discusses. The background process runs only when the SQL analytics endpoint is active and it halts after 15 minutes of inactivity.

## Guidance

- Automatic metadata discovery tracks changes committed to lakehouses, and is a single instance per Fabric workspace. If you observe increased latency for changes to sync between lakehouses and the SQL analytics endpoint, it could be due to a large number of lakehouses in one workspace. In such a scenario, consider migrating each lakehouse to a separate workspace as this approach allows automatic metadata discovery to scale.
- Parquet files are immutable by design. When there's an update or a delete operation, a Delta table adds new Parquet files with the changeset, which increases the number of files over time, depending on the frequency of updates and deletes. If you don't schedule maintenance, this pattern eventually creates a read overhead and this condition impacts the time it takes to sync changes to SQL analytics endpoint. To address this issue, schedule regular [lakehouse table maintenance operations](../data-engineering/lakehouse-table-maintenance.md#run-table-maintenance-from-lakehouse).
- In some scenarios, you might observe that changes committed to a lakehouse aren't visible in the associated SQL analytics endpoint. For example, you might create a new table in lakehouse, but it's not yet listed in the SQL analytics endpoint. Or, you might commit a large number of rows to a table in a lakehouse but this data isn't yet visible in the SQL analytics endpoint. You do have the option to [start on-demand metadata sync](sql-analytics-endpoint-metadata-sync.md#manual-refresh).
- The automatic sync process doesn't support all Delta features. For more information on the functionality supported by each engine in Fabric, see [Delta Lake table format interoperability](../fundamentals/delta-lake-interoperability.md).
- If there's an extremely large volume of table changes during the Extract Transform and Load (ETL) processing, an expected delay occurs until all the changes are processed.

## Optimizing lakehouse tables for querying the SQL analytics endpoint

When the SQL analytics endpoint reads tables stored in a lakehouse, query performance depends heavily on the physical layout of the underlying Parquet files. The engine parallelizes scans at the Parquet file level. Too many small files increase file and metadata overhead, while too few large files can limit scan parallelism.

For tables written by Spark, use the default settings in Fabric Spark runtime 2.0 or later. These runtimes enable [adaptive target file size](tune-file-size.md#adaptive-target-file-size) by default to select the most optimal target file size by table, from 128 MB for smaller tables up to 1 GB for the largest tables. Avoid setting static targets or arbitrary row-count limit on top of the default configurations. A row limit doesn't account for row width and can create small files for narrow tables.

If you're using Fabric Spark runtime 1.3, enable [adaptive target file size](tune-file-size.md#adaptive-target-file-size) and [file level compaction targets](table-compaction.md#file-level-compaction-targets), which are available as opt-in features.

You don't need V-Order for improved SQL analytics endpoint performance as Spark writes parquet files that are Snappy compressed to reduce both read and write I/O.

Default write settings don't replace table maintenance. Use the following practices to preserve a healthy layout as tables change:

- Enable [auto compaction](table-compaction.md#auto-compaction) for workloads where the periodic added synchronous write latency is acceptable. Auto compaction is a Spark feature that only runs when there are too many small files in a table.
- Schedule periodic `OPTIMIZE` jobs for workloads where the periodic added latency from auto compaction doesn't meet data update SLAs. 
- Run `VACUUM` according to your retention and time-travel requirements to remove files that the Delta log no longer references. `VACUUM` reduces retained storage but doesn't improve the active file layout.
- Avoid high-cardinality partitioning and customized writer configurations that create many small files.

If you don't use auto compaction, to identify tables that need maintenance, use a data pipeline and the `sys.sp_get_table_health_metrics` T-SQL stored procedure before running `OPTIMIZE`. For a tutorial, see [Optimize Lakehouse tables based on health checks](../data-warehouse/tutorial-conditional-lakehouse-optimization.md).

> [!NOTE]
> For guidance on general maintenance of lakehouse tables, see [Run table maintenance from Lakehouse](../data-engineering/lakehouse-table-maintenance.md#run-table-maintenance-from-lakehouse).

## Partition size considerations

The choice of partition column for a Delta table in a lakehouse also affects the time it takes to sync changes to SQL analytics endpoint. The number and size of partitions of the partition column are important for performance:

- A column with high cardinality (mostly or entirely made of unique values) results in a large number of partitions. A large number of partitions negatively impacts performance of the metadata discovery scan for changes. If the cardinality of a column is high, choose another column for partitioning.
- The size of each partition can also affect performance. Use a column that results in a partition of at least (or close to) 1 GB. Follow best practices for [Delta tables maintenance](../data-engineering/lakehouse-table-maintenance.md) and [partitioning](../data-engineering/delta-lake-partitioning.md). For a Python script to evaluate partitions, see [Sample script for partition details](#sample-script-for-partition-details).

A large volume of small-sized parquet files increases the time it takes to sync changes between a lakehouse and its associated SQL analytics endpoint. You might end up with large number of parquet files in a Delta table for one or more reasons:

- If you choose a partition for a Delta table with high number of unique values, the table is partitioned by each unique value and might be over-partitioned. Choose a partition column that doesn't have a high cardinality, and results in individual partitions at least 1 GB each.
- Batch and streaming data ingestion rates might also result in small files depending on frequency and size of changes being written to a lakehouse. For example, there might be a small volume of changes coming through to the lakehouse, resulting in small parquet files. To address this issue, implement regular [lakehouse table maintenance](../data-engineering/lakehouse-table-maintenance.md).
    
### Sample script for partition details

Use the following notebook to print a report detailing size and details of partitions underpinning a Delta table.

1. First, provide the ABFSS path for your Delta table in the variable `delta_table_path`.
    - You can get ABFSS path of a delta table from the Fabric portal **Explorer**. Right-click on table name, then select `COPY PATH` from the list of options.
1. The script outputs all partitions for the Delta table.
1. The script iterates through each partition to calculate the total size and number of files.
1. The script outputs the details of partitions, files per partitions, and size per partition in GB.

You can copy the complete script from the following code block:

  ```python
  # Purpose: Print out details of partitions, files per partitions, and size per partition in GB.
  from notebookutils import mssparkutils
  
  # Define ABFSS path for your delta table. You can get ABFSS path of a delta table by simply right-clicking on table name and selecting COPY PATH from the list of options.
  delta_table_path = "abfss://<workspace id>@<onelake>.dfs.fabric.microsoft.com/<lakehouse id>/Tables/<tablename>"
  
  # List all partitions for given delta table
  partitions = mssparkutils.fs.ls(delta_table_path)
  
  # Initialize a dictionary to store partition details
  partition_details = {}

  # Iterate through each partition
  for partition in partitions:
    if partition.isDir:
        partition_name = partition.name
        partition_path = partition.path
        files = mssparkutils.fs.ls(partition_path)
        
        # Calculate the total size of the partition

        total_size = sum(file.size for file in files if not file.isDir)
        
        # Count the number of files

        file_count = sum(1 for file in files if not file.isDir)
        
        # Write partition details

        partition_details[partition_name] = {
            "size_bytes": total_size,
            "file_count": file_count
        }
        
  # Print the partition details
  for partition_name, details in partition_details.items():
    print(f"{partition_name}, Size: {details['size_bytes']:.2f} bytes, Number of files: {details['file_count']}")

  ```

### Automatically generated schema in the SQL analytics endpoint of the Lakehouse

For every Delta table in your [Lakehouse](../data-engineering/lakehouse-overview.md), the SQL analytics endpoint automatically generates a table in the appropriate schema. The SQL analytics endpoint engine is based on the Fabric Data Warehouse engine.

For more information, see [SQL analytics endpoint metadata sync](sql-analytics-endpoint-metadata-sync.md). You can also programmatically force a refresh of the automatic metadata scanning by using the [Refresh SQL endpoint metadata REST API](/rest/api/fabric/sqlendpoint/items/refresh-sql-endpoint-metadata). 

## Related content

- [Cross-workload table maintenance and optimization](../fundamentals/table-maintenance-optimization.md)
- [Delta Lake table optimization and V-order](../data-engineering/delta-optimization-and-v-order.md)
- [Table compaction](../data-engineering/table-compaction.md)
- [Tune file size](../data-engineering/tune-file-size.md)
- [Lakehouse SQL analytics endpoint use cases](../data-engineering/lakehouse-sql-analytics-endpoint-use-cases.md)
